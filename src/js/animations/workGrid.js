// workGrid.js
import { gsap } from "gsap";
import { Flip } from "gsap/Flip";

gsap.registerPlugin(Flip);

function toggleView(defaultView = "grid") {
  let currentView = defaultView; // Store the current view state

  const updateButtonState = () => {
    document.querySelectorAll("[data-view]").forEach((btn) => {
      const isActive = btn.getAttribute("data-view") === currentView;
      btn
        .querySelector(".work-view_link-circle-wrap")
        .classList.toggle("is-active", isActive);
    });
  };

  const applyViewChange = (newView) => {
    const elements = document.querySelectorAll(
      ".work-cms-list, .work-cms-item, .work-cms-num, .work-cms_thumb-main, .work-cms_content, .work-cms-year, .work-cms-line.top, .work-cms-line.btm, .section.cc-work-hero, .work-view_link, .navigation-main, .work-cms_content-btm-list, .work-cms_content-btm-grid",
    );
    const heroSection = document.querySelector(".section.cc-work-hero"); // Targeting the parent section

    // Maintain minimum height before starting the transition
    heroSection.style.minHeight = heroSection.offsetHeight + "px";

    // Capture the state with additional properties
    const change = Flip.getState(elements, {
      props: "backgroundColor, color, width, height, margin, padding, opacity",
    });

    elements.forEach((el) => {
      el.classList.toggle("list-view", newView === "list");
    });

    // Animate back to the captured state including the specified CSS properties
    Flip.from(change, {
      duration: 1.4,
      ease: "power3.inOut",
      //stagger: 0.0001,
      nested: true,
      absolute: true, // Consider setting absolute to true if elements move out of flow.
      props: "backgroundColor, color, width, height, margin, padding, opacity", // Include the additional properties to animate
      onComplete: () => {
        // Gradually adjust the height after the transition
        heroSection.style.minHeight = "auto";
      },
    });

    currentView = newView;
    updateButtonState();
  };

  // Initialize view and button state on load
  document.addEventListener("DOMContentLoaded", () => {
    if (defaultView === "list") {
      applyViewChange("list");
    } else {
      applyViewChange("grid");
    }
    updateButtonState();
  });

  // Setup click handlers for buttons
  document.querySelectorAll("[data-view]").forEach((btn) => {
    btn.addEventListener("click", function () {
      const targetView = this.getAttribute("data-view");
      if (targetView !== currentView) {
        applyViewChange(targetView);
      }
    });
  });
}

export { toggleView };
