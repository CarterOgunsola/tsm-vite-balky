import gsap from "gsap";

function initializeVideoPreviews() {
  const videoWrappers = document.querySelectorAll(".work-cms_thumb-vid-wrap");

  const updateTimelineWidth = (video, timeLine) => {
    const progress = (video.currentTime / video.duration) * 100;
    gsap.to(timeLine, { width: `${progress}%`, ease: "none", duration: 0.5 });
  };

  // Throttled version of updateTimelineWidth to ensure smooth updates
  const throttledUpdate = (video, timeLine) => {
    let lastCall = 0;
    const throttleInterval = 100; // milliseconds

    return () => {
      const now = new Date().getTime();
      if (now - lastCall < throttleInterval) return;
      lastCall = now;
      updateTimelineWidth(video, timeLine);
    };
  };

  videoWrappers.forEach((wrapper) => {
    const video = wrapper.querySelector("video");
    const cmsItem = wrapper.closest(".work-cms-item");
    const timeLine = cmsItem.querySelector(".work-cms_time-line");
    const itemLink = cmsItem.querySelector(".work-cms-item-link");

    video.muted = true;
    video.setAttribute("playsinline", "");
    video.loop = true;

    video.addEventListener("loadedmetadata", () => {
      if (video.duration > 1) {
        video.currentTime = 1;
      }
      video.pause();
    });

    const throttled = throttledUpdate(video, timeLine);

    video.addEventListener("timeupdate", throttled);

    itemLink.addEventListener("mouseenter", () => {
      video
        .play()
        .catch((e) => console.error("Error trying to play the video:", e));
      gsap.to(timeLine, { opacity: 1, duration: 0.8 });
    });
    itemLink.addEventListener("mouseleave", () => {
      video.pause();
      gsap.to(timeLine, { opacity: 0, duration: 0.8 });
    });
  });
}

export { initializeVideoPreviews };
