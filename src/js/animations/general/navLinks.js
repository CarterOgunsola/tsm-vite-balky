// Function to create a flickering animation for the navigation link dot
function flickerDot(dot, duration = 100, times = 4) {
  let flickerCount = 0;
  const interval = setInterval(() => {
    dot.style.opacity = dot.style.opacity === "1" ? "0" : "1";
    flickerCount++;
    if (flickerCount >= times * 2) {
      clearInterval(interval);
      // Ensure the dot stays visible after flickering if the link has 'w--current' or the dot has 'is-active'
      if (
        dot.closest("[nav-link]").classList.contains("w--current") ||
        dot.classList.contains("is-active")
      ) {
        dot.style.opacity = "1";
      }
    }
  }, duration);
}

// Function to initialize the navigation link hover interactions and observe class changes
export const initNavLinkHover = () => {
  const navLinks = document.querySelectorAll("[nav-link]");

  navLinks.forEach((link) => {
    const dot = link.querySelector("[nav-link-dot]");

    // Observe changes to the 'is-active' and 'w--current' classes
    const observer = new MutationObserver(() => {
      // Update the dot's opacity based on the 'is-active' and 'w--current' classes
      if (
        link.classList.contains("w--current") ||
        dot.classList.contains("is-active")
      ) {
        dot.style.opacity = "1";
      } else {
        dot.style.opacity = "0";
      }
    });

    observer.observe(link, { attributes: true, attributeFilter: ["class"] });
    observer.observe(dot, { attributes: true, attributeFilter: ["class"] });

    link.addEventListener("mouseenter", () => {
      // Flicker the dot on hover
      flickerDot(dot);
    });

    link.addEventListener("mouseleave", () => {
      // Hide the dot on hover out, unless the link has 'w--current' or the dot has 'is-active'
      if (
        !link.classList.contains("w--current") &&
        !dot.classList.contains("is-active")
      ) {
        dot.style.opacity = "0";
      }
    });
  });
};
