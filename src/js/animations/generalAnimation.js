import { TextAnimation } from "./general/staggerText";
import { lineAnimation } from "./general/links";
import { initNavLinkHover } from "./general/navLinks";

export function generalAnimation() {
  // Select elements with the data-a-split attribute
  const elements = document.querySelectorAll("[data-a-split]");

  // Initialize TextAnimation for each selected element
  elements.forEach((element) => {
    new TextAnimation(element);
  });
  // Initialize lineAnimation for each selected element
  lineAnimation();
  // Initialize navLinkHover for each selected element
  initNavLinkHover();
}
