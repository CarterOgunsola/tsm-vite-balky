import { gsap } from "gsap";
import { CustomEase } from "gsap/CustomEase";

gsap.registerPlugin(CustomEase);

export function pageLoader() {
  if (localStorage.getItem("visited") !== "true") {
    localStorage.setItem("visited", "true");
    document.querySelector(".page-loader_main").style.display = "block";
    document.querySelector(".page-transition").style.display = "none";

    let loaderCustomEase = CustomEase.create(
      "loaderEase",
      "M0,0,C0.104,0.204,0.492,1,1,1",
    );

    let loaderDuration = 8;

    let tl = gsap.timeline({
      onComplete: () => {
        console.log("Loading complete!");
        exitAnimation(() => {
          // Simulate click on .page-loader_main after the exit animation
          document.querySelector(".page-loader_btn").click();
        });
      },
    });

    tl.fromTo(
      ".loader-svg-front",
      { strokeDashoffset: 110 },
      { strokeDashoffset: 0, duration: loaderDuration, ease: loaderCustomEase },
    );

    const loaderWords = ["TOPSPHERE", "DYNAMIC", "GLOBAL"];
    const scrambleDuration = (loaderDuration / loaderWords.length) * 0.8;
    const pauseDuration = (loaderDuration / loaderWords.length) * 0.2;

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
  } else {
    gsap.set(".page-loader_main", { display: "none" });
    gsap.set(".page-loader_main", { display: "none" });

    gsap.set(".page-transition", {
      height: "100%",
      position: "fixed",
      left: "0%",
      top: "auto",
      right: "0%",
      bottom: "0%",
    });

    gsap.to(".page-transition", {
      height: 0,
      duration: 1,
      ease: "expo.inOut",
      onComplete: () => {
        // Simulate click on .page-loader_transition after the transition animation
        document.querySelector(".page-transition_btn").click();
      },
    });
  }
}

function exitAnimation(callback) {
  let tlExit = gsap.timeline({
    onComplete: callback, // Call the callback function once the exit animation is complete
  });

  tlExit.to("[loader-text='dynamic'], [loader-text='static']", {
    y: -100,
    duration: 1,
    ease: "power3.inOut",
  });

  tlExit.to(
    ".page_loader-signal-wrap",
    {
      opacity: 0,
      y: 100,
      duration: 1,
      ease: "power3.inOut",
    },
    "-=1",
  );

  tlExit.to(
    ".page-loader_main",
    {
      height: 0,
      duration: 1.2,
      ease: "expo.inOut",
    },
    "-=0.8",
  );

  tlExit.to(".page-loader_main", {
    display: "none",
    duration: 0,
  });
}
