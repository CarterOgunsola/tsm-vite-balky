import gsap from "gsap";
import { Flip } from "gsap/Flip";

gsap.registerPlugin(Flip);

const setupFiltering = () => {
  const filterLinks = document.querySelectorAll(".filter-list-item");
  const items = gsap.utils.toArray(".work-cms-item");
  const container = document.querySelector(".section.cc-work-hero"); // The container whose height needs to be dynamic

  filterLinks.forEach((filterLink) => {
    filterLink.addEventListener("click", function (event) {
      event.preventDefault();
      const filterValue = this.getAttribute("data-filter").trim().toLowerCase();

      // Capture the initial height of the container
      const startHeight = gsap.getProperty(container, "height");
      const state = Flip.getState(items.concat(container)); // Include the container in the state capture

      // Filter items based on `data-category` attribute and adjust visibility
      items.forEach((item) => {
        const itemCategory = item
          .getAttribute("data-category")
          .trim()
          .toLowerCase();
        item.style.display =
          filterValue === "all works" || itemCategory === filterValue
            ? "flex"
            : "none";
      });

      // Perform the layout animation
      const flip = Flip.from(state, {
        duration: 0.6,
        ease: "power3.inOut",
        stagger: 0.08,
        absolute: true,
        scale: true, // Enable scaling for dynamic effects
        onEnter: (elements) =>
          gsap.fromTo(
            elements,
            { opacity: 0, scale: 0 },
            { opacity: 1, scale: 1, duration: 0.6 },
          ),
        onLeave: (elements) =>
          gsap.fromTo(
            elements,
            { opacity: 1, scale: 1 },
            { opacity: 0, scale: 0, duration: 0.6 },
          ),
      });

      // After filtering, adjust the container's height dynamically
      const endHeight = gsap.getProperty(container, "height");
      flip.fromTo(
        container,
        { height: startHeight },
        {
          height: endHeight,
          clearProps: "height", // Remove the explicit height after animation to allow for responsive adjustments
          duration: flip.duration(),
        },
        0,
      );
    });
  });
};

export { setupFiltering };

// import gsap from "gsap";
// import { Flip } from "gsap/Flip";

// gsap.registerPlugin(Flip);

// const setupFiltering = () => {
//   const filterLinks = document.querySelectorAll(".filter-list-item");
//   const items = gsap.utils.toArray(".work-cms-item");
//   const section = document.querySelector(".section.cc-work-hero");

//   filterLinks.forEach((filterLink) => {
//     filterLink.addEventListener("click", function (event) {
//       event.preventDefault();
//       const filterValue = this.getAttribute("data-filter").trim().toLowerCase();

//       items.forEach((item) => {
//         const itemCategory = item
//           .getAttribute("data-category")
//           .trim()
//           .toLowerCase();
//         item.style.display =
//           filterValue === "all works" || itemCategory === filterValue
//             ? ""
//             : "none";
//       });

//       section.style.height = "auto";
//       const newHeight = section.offsetHeight + "px";

//       const state = Flip.getState(section);
//       if (state && state.bounds) {
//         // Check if state and state.bounds are defined
//         section.style.height = state.bounds.height + "px";

//         requestAnimationFrame(() => {
//           Flip.from(state, {
//             duration: 0.7,
//             ease: "power1.inOut",
//             absolute: true,
//             onEnter: (elements) =>
//               gsap.fromTo(
//                 elements,
//                 { opacity: 0, scale: 0 },
//                 { opacity: 1, scale: 1, duration: 0.5 },
//               ),
//             onLeave: (elements) =>
//               gsap.to(elements, { opacity: 0, scale: 0, duration: 0.5 }),
//             onComplete: () => (section.style.height = newHeight),
//           });
//         });
//       } else {
//         console.error("Failed to capture section state with Flip.");
//         // Consider a fallback or ensure the section is ready before capturing its state.
//       }
//     });
//   });
// };

// export { setupFiltering };
