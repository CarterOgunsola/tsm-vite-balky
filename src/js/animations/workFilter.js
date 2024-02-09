import gsap from "gsap";
import { Flip } from "gsap/Flip";

gsap.registerPlugin(Flip);

function initializeFilterAnimation() {
  const filterLinks = document.querySelectorAll(".filter-list-item");
  const filterArrow = document.querySelector(".filter-list-item-arrow");
  const filterMenuParent = document.querySelector(".filter-menu-parent");
  const filterListParent = document.querySelector(".filter-list-parent");
  const filterIconV = document.querySelector(".filter-menu-icon-v");

  const moveArrowToElement = (element) => {
    const state = Flip.getState(filterArrow, {
      props: "color, backgroundColor, opacity",
    });
    element.appendChild(filterArrow);
    Flip.from(state, {
      duration: 0.4,
      ease: "power1.inOut",
      props: "color, backgroundColor, opacity", // Specifying which properties to animate
    });
  };

  filterLinks.forEach((link) => {
    link.addEventListener("click", function () {
      filterLinks.forEach((otherLink) => {
        otherLink.classList.remove("is--active");
      });
      link.classList.add("is--active");
      moveArrowToElement(link);
    });

    link.addEventListener("mouseenter", () => {
      moveArrowToElement(link);
    });

    link.addEventListener("mouseleave", () => {
      const activeLink = document.querySelector(".filter-list-item.is--active");
      if (activeLink) {
        moveArrowToElement(activeLink);
      }
    });
  });

  const toggleMenu = () => {
    const isOpening = !filterMenuParent.classList.contains("is--open");
    filterMenuParent.classList.toggle("is--open");
    filterListParent.classList.toggle("is--open");

    // Rotate the filter menu icon
    gsap.to(filterIconV, {
      duration: 0.4,
      rotate: isOpening ? 90 : 0,
      ease: "power3.inOut",
    });

    if (isOpening) {
      // Ensure elements are visible before animation starts
      //gsap.set(filterLinks, { display: "flex", opacity: 0, y: 100 });
      gsap.set(filterLinks, { display: "flex", opacity: 0 });
      // Animate appearance
      gsap.to(filterLinks, {
        opacity: 1,
        //y: 0,
        stagger: 0.1,
        duration: 0.4,
        ease: "power1.out",
        clearProps: "opacity, y",
      });
    } else {
      // Animate disappearance
      gsap.to(filterLinks, {
        opacity: 0,
        //y: 100,
        stagger: 0.05,
        duration: 0.4,
        ease: "power1.in",
        onComplete: () => gsap.set(filterLinks, { display: "flex" }),
      });
    }
  };

  // Event listener for opening/closing the filter menu
  filterMenuParent.addEventListener("click", toggleMenu);
}

export { initializeFilterAnimation };
