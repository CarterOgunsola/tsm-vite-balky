import { gsap } from "gsap";

export const lineAnimation = () => {
  // Select all elements with the attribute 'a-line'
  const lineElements = document.querySelectorAll("[a-line]");

  // Create the underline element and append it to each 'a-line' element
  lineElements.forEach((element) => {
    const underline = document.createElement("span");
    underline.setAttribute("a-underline", "");
    element.appendChild(underline);
  });

  // Add hover effect for 'a-line'
  lineElements.forEach((element) => {
    const underline = element.querySelector("[a-underline]");

    element.addEventListener("mouseenter", () => {
      gsap.to(underline, {
        scaleX: 1,
        duration: 0.25,
        ease: "power1.out",
        transformOrigin: "left",
      });
    });

    element.addEventListener("mouseleave", () => {
      gsap.to(underline, {
        scaleX: 0,
        duration: 0.25,
        ease: "power1.out",
        transformOrigin: "right",
      });
    });
  });
};
