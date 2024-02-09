// resetWebflow.js

/**
 * Resets Webflow scripts and initializes the page scripts based on the new content.
 * This function parses the new HTML content, updates the Webflow page ID, and reinitializes Webflow scripts.
 *
 * @param {Object} data - Object containing information about the new page. Expected to have a 'next.html' property containing the new page HTML as a string.
 */
function resetWebflow(data) {
  const parser = new DOMParser();
  const dom = parser.parseFromString(data.next.html, "text/html");
  const webflowPageId = dom.querySelector("html").getAttribute("data-wf-page");

  // Update the Webflow page ID on the current document
  document.querySelector("html").setAttribute("data-wf-page", webflowPageId);

  // Safely check if Webflow is defined and reinitialize if necessary
  if (window.Webflow) {
    window.Webflow.destroy();
    window.Webflow.ready();
    window.Webflow.require("ix2").init();
  }
}

// Export the resetWebflow function to make it available for import in other modules
export { resetWebflow };
