// clock.js

function updateClock() {
  const element = document.querySelector('[data-element="clock"]');
  if (!element) return;

  const options = {
    timeZone: "America/Indiana/Indianapolis",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  };
  const timeString = new Intl.DateTimeFormat("en-US", options).format(
    new Date(),
  );

  element.innerHTML = timeString.replace(":", '<span class="blink">:</span>');
}

function startClock() {
  updateClock();
  setInterval(updateClock, 1000);
}

// Beep animation for the colon
const style = document.createElement("style");
style.innerHTML = `
    .blink {
      animation: blink-animation 1s steps(5, start) infinite;
      -webkit-animation: blink-animation 1s steps(5, start) infinite;
    }
    @keyframes blink-animation {
      to {
        visibility: hidden;
      }
    }
    @-webkit-keyframes blink-animation {
      to {
        visibility: hidden;
      }
    }
  `;
document.head.appendChild(style);

export { startClock };
