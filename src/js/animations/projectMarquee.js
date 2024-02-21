import { gsap } from "gsap";

import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// projectMarquee.js
export function initializeMarquee() {
  // MARQUEE POWER-UP
  window.addEventListener("DOMContentLoaded", (event) => {
    // attribute value checker
    function attr(defaultVal, attrVal) {
      const defaultValType = typeof defaultVal;
      if (typeof attrVal !== "string" || attrVal.trim() === "")
        return defaultVal;
      if (attrVal === "true" && defaultValType === "boolean") return true;
      if (attrVal === "false" && defaultValType === "boolean") return false;
      if (isNaN(attrVal) && defaultValType === "string") return attrVal;
      if (!isNaN(attrVal) && defaultValType === "number") return +attrVal;
      return defaultVal;
    }
    // marquee component
    $("[tr-marquee-element='component']").each(function (index) {
      let componentEl = $(this),
        panelEl = componentEl.find("[tr-marquee-element='panel']"),
        triggerHoverEl = componentEl.find(
          "[tr-marquee-element='triggerhover']",
        ),
        triggerClickEl = componentEl.find(
          "[tr-marquee-element='triggerclick']",
        );
      let speedSetting = attr(100, componentEl.attr("tr-marquee-speed")),
        verticalSetting = attr(false, componentEl.attr("tr-marquee-vertical")),
        reverseSetting = attr(false, componentEl.attr("tr-marquee-reverse")),
        scrollDirectionSetting = attr(
          false,
          componentEl.attr("tr-marquee-scrolldirection"),
        ),
        scrollScrubSetting = attr(
          false,
          componentEl.attr("tr-marquee-scrollscrub"),
        ),
        moveDistanceSetting = -100,
        timeScaleSetting = 1,
        pausedStateSetting = false;
      if (reverseSetting) moveDistanceSetting = 100;
      let marqueeTimeline = gsap.timeline({
        repeat: -1,
        onReverseComplete: () => marqueeTimeline.progress(1),
      });
      if (verticalSetting) {
        speedSetting = panelEl.first().height() / speedSetting;
        marqueeTimeline.fromTo(
          panelEl,
          { yPercent: 0 },
          {
            yPercent: moveDistanceSetting,
            ease: "none",
            duration: speedSetting,
          },
        );
      } else {
        speedSetting = panelEl.first().width() / speedSetting;
        marqueeTimeline.fromTo(
          panelEl,
          { xPercent: 0 },
          {
            xPercent: moveDistanceSetting,
            ease: "none",
            duration: speedSetting,
          },
        );
      }
      let scrubObject = { value: 1 };
      ScrollTrigger.create({
        trigger: "body",
        start: "top top",
        end: "bottom bottom",
        onUpdate: (self) => {
          if (!pausedStateSetting) {
            if (scrollDirectionSetting && timeScaleSetting !== self.direction) {
              timeScaleSetting = self.direction;
              marqueeTimeline.timeScale(self.direction);
            }
            if (scrollScrubSetting) {
              let v = self.getVelocity() * 0.006;
              v = gsap.utils.clamp(-60, 60, v);
              let scrubTimeline = gsap.timeline({
                onUpdate: () => marqueeTimeline.timeScale(scrubObject.value),
              });
              scrubTimeline.fromTo(
                scrubObject,
                { value: v },
                { value: timeScaleSetting, duration: 0.5 },
              );
            }
          }
        },
      });
      function pauseMarquee(isPausing) {
        pausedStateSetting = isPausing;
        let pauseObject = { value: 1 };
        let pauseTimeline = gsap.timeline({
          onUpdate: () => marqueeTimeline.timeScale(pauseObject.value),
        });
        if (isPausing) {
          pauseTimeline.fromTo(
            pauseObject,
            { value: timeScaleSetting },
            { value: 0, duration: 0.5 },
          );
          triggerClickEl.addClass("is-paused");
        } else {
          pauseTimeline.fromTo(
            pauseObject,
            { value: 0 },
            { value: timeScaleSetting, duration: 0.5 },
          );
          triggerClickEl.removeClass("is-paused");
        }
      }
      if (window.matchMedia("(pointer: fine)").matches) {
        triggerHoverEl.on("mouseenter", () => pauseMarquee(true));
        triggerHoverEl.on("mouseleave", () => pauseMarquee(false));
      }
      triggerClickEl.on("click", function () {
        !$(this).hasClass("is-paused")
          ? pauseMarquee(true)
          : pauseMarquee(false);
      });
    });
  });
  console.log("marquee initialized");
}
