import "../styles/index.css";
import { Core } from "@unseenco/taxi";
import { pageLoader } from "./transitions/pageLoader";
//import Canvas from "./animations/canvas";
import setupCurtains from "./animations/canvas";
import gsap from "gsap";

// import { showBody } from "./animations/starter";
import {
  // lenis,
  handleActiveStateOnLinks,
} from "./animations/smoothScroll";
import initGallerySlider from "./animations/workSlider";
import tsmPlyr from "./utils/plyr";
import { startClock } from "./utils/clock";
import {
  initializeVideoPreviews,
  workCmsVidPlay,
} from "./animations/workPageVid";
import { toggleView } from "./animations/workGrid";
import { initializeFilterAnimation } from "./animations/workFilter";
import { setupFiltering } from "./animations/workFilterList";
import { initializeMarquee } from "./animations/projectMarquee";
import { generalAnimation } from "./animations/generalAnimation";
import DefaultRenderer from "./renderer/DefaultRenderer";
import {
  enterTransition,
  leaveTransition,
} from "./transitions/DefaultTransition";
import { calculator } from "./utils/price-calc";
import { resetWebflow } from "./utils/resetWefblow";
import {
  animatePageTransition,
  endPageTransition,
} from "./transitions/internalTransition";
import { loadVideos } from "./utils/videoLoader";
import { createScroll01 } from "./animations/aboutSticky";

// showBody();

// Initialize curtains setup once the window is fully loaded
window.addEventListener("load", () => {
  // setupCurtains();
  endPageTransition();
  loadVideos();
});
// Consolidated DOMContentLoaded listener
document.addEventListener("DOMContentLoaded", () => {
  //animatePageTransition
  animatePageTransition();

  //initialize page loader
  pageLoader();

  //setupCurtains
  setupCurtains();

  // Handle active state on anchor links
  handleActiveStateOnLinks();

  //generalAnimation
  generalAnimation();

  // Initialize the gallery slider if the element exists
  if (document.querySelector(".home-page")) {
    initGallerySlider();
  }

  // Initialize the custom Plyr setup if the element exists
  if (document.querySelector(".plyr_component")) {
    tsmPlyr();
  }

  // Start the clock if the element exists
  if (document.querySelector(".page-wrapper")) {
    startClock();
  }

  // Initialize the marquee if the element exists
  if (document.querySelector(".work-cms-page, .about-page")) {
    initializeMarquee();
  }

  //intiatize sticky if the element exists
  if (document.querySelector(".about-page")) {
    createScroll01();
  }

  // Initialize work grid view if the element exists
  if (document.querySelector(".work-page")) {
    toggleView();
  }

  // Initialize filter if the element exists
  if (document.querySelector(".work-page")) {
    initializeFilterAnimation();
  }

  // Initialize filtering if the element exists
  if (document.querySelector(".work-page")) {
    setupFiltering();
  }

  // Initialize video previews if the element exists
  if (document.querySelector(".work-page")) {
    initializeVideoPreviews();
    workCmsVidPlay();
  }

  // Initialize price calculator if the element exists
  if (document.querySelector(".contact-page")) {
    calculator();
  }
});
