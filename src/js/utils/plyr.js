//import Plyr and Import Plyr Css
import Plyr from "plyr";
import "plyr/dist/plyr.css";

function tsmPlyr() {
  // Find all .plyr_component elements and initialize Plyr for each
  document.querySelectorAll(".plyr_component").forEach((component) => {
    const videoElement = component.querySelector(".plyr_video");
    const coverElement = component.querySelector(".plyr_cover");
    const pauseTriggerElements = component.querySelectorAll(
      ".plyr_pause-trigger",
    );

    // Initialize Plyr
    const player = new Plyr(videoElement, {
      controls: ["play", "progress", "current-time", "mute", "fullscreen"],
      iconUrl:
        "https://uploads-ssl.webflow.com/65bc102e4eb171a82bde792a/65c2c64da488020102534d56_plyrSprite.svg",
      resetOnEnd: true,
      autopause: true,
    });

    // Custom video cover play functionality
    coverElement.addEventListener("click", () => {
      player.play();
    });

    // Handle video end to show cover
    player.on("ended", () => {
      component.classList.remove("hide-cover");
    });

    // Pause other videos when this one plays
    player.on("play", () => {
      document.querySelectorAll(".plyr_component").forEach((otherComponent) => {
        otherComponent.classList.remove("hide-cover");
      });
      component.classList.add("hide-cover");

      const prevPlaying = document.querySelector(".plyr--playing");
      if (prevPlaying && prevPlaying !== component) {
        prevPlaying.querySelector(".plyr_pause-trigger").click();
      }
    });

    // Custom pause functionality
    pauseTriggerElements.forEach((pauseTrigger) => {
      pauseTrigger.addEventListener("click", () => {
        player.pause();
      });
    });

    // Exit fullscreen on video end
    player.on("ended", () => {
      if (player.fullscreen.active) {
        player.fullscreen.exit();
      }
    });

    // Adjust video view mode on fullscreen changes
    player.on("enterfullscreen", () => {
      component.classList.add("contain-video");
    });
    player.on("exitfullscreen", () => {
      component.classList.remove("contain-video");
    });
  });
}

export default tsmPlyr;
