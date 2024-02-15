import gsap from "gsap";
import { Flip } from "gsap/Flip";

// Register the GSAP Flip and ScrambleText plugins
gsap.registerPlugin(Flip, ScrambleTextPlugin);

const setupFiltering = () => {
  const filterLinks = document.querySelectorAll(".filter-list-item");
  const items = gsap.utils.toArray(".work-cms-item");
  const container = document.querySelector(".section.cc-work-hero");
  const categoryElement = document.querySelector(
    '[data-element="category-name"]',
  );
  const workListNumberElement = document.querySelector(
    '[data-element="work-list-number"]',
  );

  // Function to update the work list number
  const updateWorkListNumber = (visibleItemsCount) => {
    gsap.to(workListNumberElement, {
      duration: 1,
      scrambleText: {
        text: String(visibleItemsCount).padStart(2, "0"),
        chars: "{01234567890!@#$%^&*()}",
        speed: 0.5,
      },
    });
  };

  // Initial update on page load
  updateWorkListNumber(items.length);

  filterLinks.forEach((filterLink) => {
    filterLink.addEventListener("click", function (event) {
      event.preventDefault();
      const filterValue = this.getAttribute("data-filter").trim().toLowerCase();
      const startHeight = gsap.getProperty(container, "height");
      // console.log("startHeight", startHeight);
      // Capture the state before filtering
      const state = Flip.getState(items);

      // Filter and display adjustment
      let visibleItemsCount = 0;
      items.forEach((item) => {
        const itemCategory = item
          .getAttribute("data-category")
          .trim()
          .toLowerCase();
        const isVisible =
          filterValue === "all works" || itemCategory === filterValue;
        item.style.display = isVisible ? "flex" : "none";
        if (isVisible) visibleItemsCount++;
      });
      // Update work list number with filtered count
      updateWorkListNumber(visibleItemsCount);

      // ScrambleText to update categoryElement text
      gsap.to(categoryElement, {
        duration: 1,
        scrambleText: {
          text: filterValue === "all works" ? "All Works" : filterValue,
          chars: "upperCase",
          speed: 0.5,
          delimiter: "",
        },
      });

      const endHeight = gsap.getProperty(container, "height");
      // console.log("endHeight", endHeight);

      // Animate layout changes
      const flip = Flip.from(state, {
        duration: 0.8,
        ease: "power2.inOut",
        stagger: 0.08,
        absolute: true,
        // absoluteOnLeave: true,
        scale: true,
        onEnter: (elements) =>
          gsap.fromTo(
            elements,
            { opacity: 0, scale: 0 },
            { opacity: 1, scale: 1, duration: 1 },
          ),
        onLeave: (elements) =>
          gsap.to(elements, { opacity: 0, scale: 0, duration: 1 }),
      });

      flip.fromTo(
        container,
        {
          height: startHeight,
        },
        {
          height: endHeight,
          clearProps: "height",
          duration: flip.duration(),
        },
        0,
      );
    });
  });
};

export { setupFiltering };
