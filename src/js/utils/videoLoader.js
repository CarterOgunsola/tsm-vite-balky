// Export the function loadVideos
export function loadVideos() {
  // Get all the video elements
  const videos = document.querySelectorAll("video");

  // Callback function for Intersection Observer
  const observerCallback = (entries, observer) => {
    entries.forEach((entry) => {
      // Check if the video is in the viewport
      if (entry.isIntersecting) {
        // Start loading the video
        loadVideo(entry.target);
        // Once the video is loaded, unobserve it
        observer.unobserve(entry.target);
      }
    });
  };

  // Create an Intersection Observer instance
  const observerOptions = {
    root: null, // Use the viewport as the root
    rootMargin: "0px",
    threshold: 0.5, // Trigger when 50% of the video is visible
  };
  const observer = new IntersectionObserver(observerCallback, observerOptions);

  // Observe each video
  videos.forEach((video) => {
    observer.observe(video);
  });

  // Function to load a video
  function loadVideo(video) {
    if (video.getAttribute("data-src")) {
      video.src = video.getAttribute("data-src");
      video.load();
      video.removeAttribute("data-src"); // Remove the attribute to avoid re-loading
    }
  }
}
