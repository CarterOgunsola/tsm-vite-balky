import { gsap } from "gsap";
import { CustomEase } from "gsap/CustomEase";

gsap.registerPlugin(CustomEase, ScrambleTextPlugin);

export function pageLoader() {
  // Define custom ease for the loader animation
  let loaderCustomEase = CustomEase.create(
    "loaderEase",
    "M0,0,C0.104,0.204,0.492,1,1,1",
  );

  // Define the loader duration and initial stroke offset
  let loaderDuration = sessionStorage.getItem("visited") !== null ? 7 : 10;
  sessionStorage.setItem("visited", "true");

  // Define the animation timeline for the SVG stroke offset and text scramble
  let tl = gsap.timeline({
    onComplete: () => {
      console.log("Loading complete!");
      // Start the exit animation once the loader is complete
      exitAnimation();
    },
  });

  // Animate the stroke offset of the front circle
  tl.fromTo(
    ".loader-svg-front",
    { strokeDashoffset: 110 },
    { strokeDashoffset: 0, duration: loaderDuration, ease: loaderCustomEase },
  );

  // Words to scramble through
  const loaderWords = ["TOPSPHERE", "DYNAMIC", "GLOBAL", "TOPSPHERE"];

  // Calculate the duration for each word
  const scrambleDuration = (loaderDuration / loaderWords.length) * 0.8; // 80% of the time for scrambling
  const pauseDuration = (loaderDuration / loaderWords.length) * 0.2; // 20% of the time for pausing

  // Animate the text scramble for each word
  loaderWords.forEach((word, index) => {
    tl.to(
      "[loader-text='dynamic']",
      {
        scrambleText: {
          text: word,
          chars: "upperCase",
          speed: 0.75,
          revealDelay: 0.1,
          tweenLength: false,
          newClass: "scrambled",
        },
        duration: scrambleDuration,
        ease: "none",
      },
      index * (scrambleDuration + pauseDuration),
    );
  });
}

function exitAnimation() {
  let tlExit = gsap.timeline();

  // Animate loader text attributes to move up with Y
  tlExit.to("[loader-text='dynamic'], [loader-text='static']", {
    y: -100,
    duration: 1,
    ease: "power3.inOut",
  });

  // Fade out the opacity of .page_loader-signal-wrap
  tlExit.to(
    ".page_loader-signal-wrap",
    {
      opacity: 0,
      y: 100,
      duration: 1,
      ease: "power3.inOut",
    },
    "-=1",
  ); // Overlap with the previous animation

  // Animate the height of .page-loader_main to 0
  tlExit.to(
    ".page-loader_main",
    {
      height: 0,
      duration: 1.2,
      ease: "expo.inOut",
    },
    "-=0.8",
  ); // Overlap with the previous animation

  //hide loader
  tlExit.to(
    ".page-loader_main",
    {
      display: "none",
      duration: 0,
    },
    "-=0",
  );
}
