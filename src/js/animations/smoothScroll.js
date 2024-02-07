import { SScroll } from "/js/utils/lenis";

// Translate the data attributes into a configuration object
const lenisConfig = {
  autoinit: true,
  // data-autoinit
  duration: 1,
  // data-duration
  orientation: "vertical",
  // data-orientation
  smoothWheel: true,
  // data-smoothWheel
  smoothTouch: false,
  // data-smoothTouch
  touchMultiplier: 1.5,
  // data-touchMultiplier
  easing: (t) => (t === 1 ? 1 : 1 - Math.pow(2, -10 * t)),
  // data-easing
  useOverscroll: true,
  // data-useOverscroll
  useControls: true,
  // data-useControls
  useAnchor: true,
  // data-useAnchor
  useRaf: true,
  // data-useRaf
  infinite: false,
  // data-infinite
};

//Apply the configuration to the SScroll instance
// Assuming SScroll has methods or properties to set these configurations
if (SScroll && typeof SScroll.setOptions === "function") {
  SScroll.setOptions(lenisConfig);
}

// Function to handle the active state of anchor links
function handleActiveStateOnLinks() {
  const observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
      if (mutation.attributeName === "class") {
        const element = mutation.target;
        // Ensure the element matches your criteria
        if (
          element.getAttribute("data-linktarget") &&
          element.classList.contains("w--current")
        ) {
          const scrollLink = element.closest("[data-scrolllink]");
          if (scrollLink) {
            scrollLink.classList.add("active");
          }
        } else {
          const scrollLink = element.closest("[data-scrolllink]");
          if (scrollLink) {
            scrollLink.classList.remove("active");
          }
        }
      }
    });
  });

  const config = {
    attributes: true,
    subtree: true,
  };
  observer.observe(document.body, config);
}

// Export the SScroll instance for use elsewhere
export { SScroll, handleActiveStateOnLinks };
