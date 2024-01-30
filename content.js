// Function to modify the URL
function modifyUrl() {
  let currentUrl = window.location.href;
  let modifiedUrl = currentUrl.replace("https://twitter.com/", "https://vxtwitter.com/");
  return modifiedUrl;
}

// Function to get selected text
function getSelectedText() {
  let text = "";
  if (window.getSelection) {
    text = window.getSelection().toString();
  } else if (document.selection && document.selection.type != "Control") {
    text = document.selection.createRange().text;
  }
  return text;
}

// Event listener for the Ctrl+C and Ctrl+Shift+C commands
document.addEventListener('keydown', function(event) {
  if (event.ctrlKey && (event.key === 'c' || event.key === 'C')) {
    let selectedText = getSelectedText();
    if (selectedText.length === 0) {
      // No text is selected, copy the modified URL
      let modifiedUrl = modifyUrl();
      navigator.clipboard.writeText(modifiedUrl);
    }
    // If text is selected, the default copy action will handle it
  }
});

// Optionally, modify the URL in the address bar (requires more permissions)
window.history.pushState({}, '', modifyUrl());
