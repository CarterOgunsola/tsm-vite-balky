// Import GSAP for use
import { gsap } from "gsap";

// Function to animate the page transition when an internal link is clicked
function animatePageTransition() {
  // Select all internal links
  const internalLinks = document.querySelectorAll('a[href^="/"]');

  internalLinks.forEach(function (link) {
    link.addEventListener("click", function (e) {
      // Check if the link is not an external link or has a specific attribute to exclude
      if (
        !this.classList.contains("external") &&
        !this.hasAttribute("data-exclude")
      ) {
        e.preventDefault(); // Prevent default anchor behavior
        const goTo = this.getAttribute("href"); // Store anchor href

        // Prepare the .page-transition element's styles for animation
        const pageTransition = document.querySelector(".page-transition");
        pageTransition.style.display = "flex";
        pageTransition.style.position = "fixed";
        pageTransition.style.top = "0";
        pageTransition.style.left = "0";
        pageTransition.style.right = "0";
        pageTransition.style.width = "100%";
        pageTransition.style.height = "0%";
        pageTransition.style.zIndex = "100"; // Ensure it's above other content

        // Animate the height from 0% to 100%
        gsap.to(".page-transition", {
          duration: 1,
          height: "100%",
          ease: "expo.inOut",
          onComplete: function () {
            // Set a flag in sessionStorage to indicate transition has started
            sessionStorage.setItem("isTransitioning", "true");
            // Redirect to the new URL with a short delay to ensure the animation is visually complete
            setTimeout(function () {
              window.location = goTo;
            }, 100);
          },
        });
      }
    });
  });
}

// Export the function
export { animatePageTransition };

// Call this function when the new page loads
function endPageTransition() {
  // Check if the isTransitioning flag is set in sessionStorage
  if (sessionStorage.getItem("isTransitioning") === "true") {
    // Clear the flag
    sessionStorage.removeItem("isTransitioning");

    // Set the initial styles of .page-transition to cover the page
    const pageTransition = document.querySelector(".page-transition");
    // pageTransition.style.display = "flex";
    // pageTransition.style.height = "100%";
    pageTransition.style.zIndex = "100"; // Ensure it's above other content

    // Animate the height from 100% to 0%
    gsap.to(".page-transition", {
      duration: 1,
      delay: 0.5,
      height: "0%",
      ease: "expo.inOut",
      onComplete: function () {
        // Hide the transition element after animation completes
        pageTransition.style.display = "none";
      },
    });
  }
}

// Export the function
export { endPageTransition };
