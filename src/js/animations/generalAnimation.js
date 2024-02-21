import { TextAnimation } from "./general/staggerText";

export function generalAnimation() {
  // Select elements with the data-a-split attribute
  const elements = document.querySelectorAll("[data-a-split]");

  // Initialize TextAnimation for each selected element
  elements.forEach((element) => {
    new TextAnimation(element);
  });
}
