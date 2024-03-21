import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export const createScroll01 = () => {
  const panels = Array.from(document.querySelectorAll("[sticky-panel]"));

  panels.forEach((panel, index) => {
    const isLast = index === panels.length - 1;

    gsap
      .timeline({
        scrollTrigger: {
          trigger: panel,
          start: "top top",
          scrub: 1,
        },
      })
      .to(
        panel,
        {
          ease: "none",
          startAt: { filter: "brightness(100%) blur(0px)" },
          filter: isLast ? "none" : "brightness(50%) blur(4px)",
          scale: 0.9,
          borderRadius: 0,
        },
        "<",
      );
  });
};
