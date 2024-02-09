import "../styles/index.css";
//import Canvas from "./animations/canvas";
import setupCurtains from "./animations/canvas";
import { showBody } from "./animations/starter";
import { SScroll, handleActiveStateOnLinks } from "./animations/smoothScroll";
import initGallerySlider from "./animations/workSlider";
import tsmPlyr from "./utils/plyr";
import { startClock } from "./utils/clock";
import { initializeVideoPreviews } from "./animations/workPageVid";
import { toggleView } from "./animations/workGrid";

showBody();

// Initialize curtains setup once the window is fully loaded
window.addEventListener("load", setupCurtains);

// Consolidated DOMContentLoaded listener
document.addEventListener("DOMContentLoaded", () => {
  // Initialize smooth scrolling
  if (SScroll && typeof SScroll.start === "function") {
    SScroll.start();
  }

  // Handle active state on anchor links
  handleActiveStateOnLinks();

  // Initialize the gallery slider
  initGallerySlider();

  // Initialize the custom Plyr setup
  tsmPlyr();

  // Start the clock
  startClock();

  // Initialize video previews
  initializeVideoPreviews();

  // Initialize work grid view
  toggleView();
});
