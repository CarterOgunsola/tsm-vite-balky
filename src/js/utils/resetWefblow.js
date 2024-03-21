// resetWebflow.js

function resetWebflow() {
  window.Webflow && Webflow.destroy && Webflow.destroy(),
    window.Webflow && Webflow.ready && Webflow.ready(),
    window.Webflow && Webflow.require && Webflow.require("ix2").init(),
    document.dispatchEvent(new Event("readystatechange"));
}

export { resetWebflow };
