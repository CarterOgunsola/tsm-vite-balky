import SplitType from "split-type";
import { gsap } from "gsap";

// Initialize text splitting
let typeSplit = new SplitType("[data-split]", {
  types: "lines, words, chars",
  tagName: "span",
  html: true,
});

// GSAP animation settings with default values and a different stagger for the second data-split
const animationSettings = {
  yPercent: 90,
  duration: 0.6,
  ease: "power3.out",
  stagger: 0.02, // Default stagger value for the first data-split
  staggerSecondSplit: 0.08, // Different stagger value for the second data-split
};

// Animate text out with customized stagger based on whether it's the second data-split
function animateTextOut(chars, isSecondSplit = false) {
  gsap.to(chars, {
    yPercent: animationSettings.yPercent,
    opacity: 0.4,
    duration: animationSettings.duration,
    ease: animationSettings.ease,
    stagger: isSecondSplit
      ? animationSettings.staggerSecondSplit
      : animationSettings.stagger,
  });
}

// Animate text in with customized stagger based on whether it's the second data-split
function animateTextIn(chars, isSecondSplit = false) {
  gsap.to(chars, {
    yPercent: 0, // Reset to visible state
    duration: animationSettings.duration,
    opacity: 1,
    ease: animationSettings.ease,
    stagger: isSecondSplit
      ? animationSettings.staggerSecondSplit
      : animationSettings.stagger,
  });
}

// Function to initialize and return the Swiper gallery slider
function initGallerySlider() {
  const gallerySlider = new Swiper(".swiper.is-gallery", {
    loop: true,
    slidesPerView: 1.55,
    centeredSlides: true,
    speed: 600,
    grabCursor: false,
    breakpoints: {
      320: {
        slidesPerView: 1.2,
      },
      480: {
        slidesPerView: 1.2,
      },
      640: {
        slidesPerView: 1.2,
      },
      768: {
        slidesPerView: 1.2,
      },
      1024: {
        slidesPerView: 1.5,
      },
    },
    parallax: true,
    on: {
      init: function () {
        // Pause and initialize all videos
        const videos = document.querySelectorAll(".swiper.is-gallery video");
        videos.forEach((video) => {
          video.pause();
          video.setAttribute("data-current-time", "0");
        });

        // Play video in the initial active slide, if present
        const initialActiveSlideVideo =
          this.slides[this.activeIndex].querySelector("video");
        if (initialActiveSlideVideo) {
          initialActiveSlideVideo.play();
        }

        // Animate out text in all slides
        this.slides.forEach((slide) => {
          const dataSplits = slide.querySelectorAll("[data-split]");
          dataSplits.forEach((split, splitIndex) => {
            const chars = split.querySelectorAll(".char");
            animateTextOut(chars, splitIndex === 1); // Use true for the second data-split
          });
        });

        // Animate in text for the active slide
        const activeSlide = this.slides[this.activeIndex];
        const dataSplits = activeSlide.querySelectorAll("[data-split]");
        dataSplits.forEach((split, splitIndex) => {
          const chars = split.querySelectorAll(".char");
          animateTextIn(chars, splitIndex === 1); // Use true for the second data-split
        });
      },
      slideChange: function () {
        // Handle video play/pause
        const videos = document.querySelectorAll(".swiper.is-gallery video");
        videos.forEach((video) => {
          video.setAttribute("data-current-time", video.currentTime.toString());
          video.pause();
        });

        const activeSlide = this.slides[this.activeIndex];
        const video = activeSlide.querySelector("video");
        if (video) {
          const currentTime = video.getAttribute("data-current-time");
          video.currentTime = currentTime ? parseFloat(currentTime) : 0;
          video.play();
        }

        // Animate text for all slides
        this.slides.forEach((slide) => {
          const dataSplits = slide.querySelectorAll("[data-split]");
          dataSplits.forEach((split, splitIndex) => {
            const chars = split.querySelectorAll(".char");
            animateTextOut(chars, splitIndex === 1); // Use true for the second data-split
          });
        });

        // Animate in text for the active slide
        const activeChars = activeSlide.querySelectorAll("[data-split]");
        activeChars.forEach((split, splitIndex) => {
          const chars = split.querySelectorAll(".char");
          animateTextIn(chars, splitIndex === 1); // Use true for the second data-split
        });
      },
    },
  });

  return gallerySlider;
}

export default initGallerySlider;
