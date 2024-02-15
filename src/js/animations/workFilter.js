import gsap from "gsap";
import { Flip } from "gsap/Flip";

gsap.registerPlugin(Flip);

function initializeFilterAnimation() {
  const filterLinks = document.querySelectorAll(".filter-list-item");
  const filterArrow = document.querySelector(".filter-list-item-arrow");
  const filterMenuParent = document.querySelector(".filter-menu-parent");
  const filterListParent = document.querySelector(".filter-list-parent");
  const filterIconV = document.querySelector(".filter-menu-icon-v");
  const filterMenu = document.querySelector(".filter-menu"); // Assuming .filter-menu is the correct selector for the menu container
  let mouseLeaveTimeout; // Declare a variable for the timeout

  const moveArrowToElement = (element) => {
    const state = Flip.getState(filterArrow, {
      props: "color, backgroundColor, opacity",
    });
    element.appendChild(filterArrow);
    Flip.from(state, {
      duration: 0.4,
      ease: "power1.inOut",
      props: "color, backgroundColor, opacity",
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

  const toggleMenu = (forceClose = false) => {
    const shouldOpen = forceClose
      ? false
      : !filterMenuParent.classList.contains("is--open");
    filterMenuParent.classList.toggle("is--open", shouldOpen);
    filterListParent.classList.toggle("is--open", shouldOpen);

    // Rotate the filter menu icon
    gsap.to(filterIconV, {
      duration: 0.4,
      rotate: shouldOpen ? 90 : 0,
      ease: "power3.inOut",
    });

    if (shouldOpen) {
      gsap.set(filterLinks, { display: "flex", opacity: 0 });
      gsap.to(filterLinks, {
        opacity: 1,
        stagger: 0.1,
        duration: 0.4,
        ease: "power1.out",
        clearProps: "opacity",
      });
    } else {
      gsap.to(filterLinks, {
        opacity: 0,
        stagger: 0.05,
        duration: 0.4,
        ease: "power1.in",
        onComplete: () => gsap.set(filterLinks, { display: "none" }),
      });
    }
  };

  // Event listener for opening/closing the filter menu on click
  filterMenuParent.addEventListener("click", () => toggleMenu());

  // Mouse leave event with delay before closing the menu if it's open
  filterMenu.addEventListener("mouseleave", () => {
    // Clear any previously set timeout to prevent multiple triggers
    clearTimeout(mouseLeaveTimeout);
    mouseLeaveTimeout = setTimeout(() => {
      if (filterMenuParent.classList.contains("is--open")) {
        toggleMenu(true); // Force the menu to close
      }
    }, 200); // Delay in milliseconds before the menu closes
  });
}

export { initializeFilterAnimation };
