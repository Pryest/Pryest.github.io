document.querySelectorAll(".citation").forEach(function (citation) {
  const button = citation.querySelector(".citation__copy");
  const content = citation.querySelector(".citation__text");
  const status = citation.querySelector(".citation__status");

  button.hidden = false;
  button.addEventListener("click", async function () {
    button.disabled = true;
    status.textContent = "";

    try {
      await navigator.clipboard.writeText(content.textContent.trim());
      status.textContent = "Copied!";
    } catch (error) {
      // Leave the citation selected for manual copying if clipboard access is blocked.
      const selection = window.getSelection();
      const range = document.createRange();
      range.selectNodeContents(content);
      selection.removeAllRanges();
      selection.addRange(range);
      status.textContent = "Could not copy automatically. Select and copy the citation manually.";
    } finally {
      button.disabled = false;
    }
  });
});
