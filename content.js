// Function to modify the URL
function modifyUrl(url) {
  return url.replace("https://x.com/", "https://fixvx.com/");
}

// Function to get the tweet URL from the button's context
function getTweetUrlFromButton(button) {
  const tweetElement = button.closest('article'); // Assuming each tweet is contained in an <article> element
  if (tweetElement) {
    const anchorTag = tweetElement.querySelector('a[href*="/status/"]');
    if (anchorTag) {
      console.log('Found tweet URL:', anchorTag.href);
      return anchorTag.href;
    }
  }
  // Fallback to current page URL
  console.log('Fallback to current page URL:', window.location.href);
  return window.location.href;
}

// Function to update the existing copy button
function updateCopyButton(button) {
  button.addEventListener('click', (event) => {
    event.stopPropagation();
    event.preventDefault();

    const tweetUrl = getTweetUrlFromButton(button);
    const modifiedUrl = modifyUrl(tweetUrl);

    navigator.clipboard.writeText(modifiedUrl)
      .then(() => {
        console.log('Modified URL copied to clipboard:', modifiedUrl);
        // Optionally, show a custom notification here
      })
      .catch(err => console.error('Failed to copy modified URL:', err));
  });
  button.dataset.modified = 'true';  // Mark the button as modified
  console.log('Copy link button updated');
}

// MutationObserver callback to find and update the copy link button
function observeMutations(mutationsList) {
  for (const mutation of mutationsList) {
    if (mutation.type === 'childList' && mutation.addedNodes.length > 0) {
      mutation.addedNodes.forEach(node => {
        if (node.nodeType === Node.ELEMENT_NODE) {
          const copyLinkButton = node.querySelector('div[role="menuitem"] span:contains("Copy link")');
          if (copyLinkButton && !copyLinkButton.dataset.modified) {
            updateCopyButton(copyLinkButton);
          }
        }
      });
    }
  }
}

// Set up the MutationObserver
const observer = new MutationObserver(observeMutations);
observer.observe(document.body, { childList: true, subtree: true });

// Initial log to confirm the script is running
console.log('Script running and MutationObserver set up.');

// Keyboard shortcut functionality (unchanged)
document.addEventListener('keydown', function(event) {
  if ((event.ctrlKey || event.metaKey) && (event.key === 'c' || event.key === 'C')) {
    let selectedText = window.getSelection().toString();
    if (selectedText.length === 0) {
      let currentUrl = getTweetUrlFromButton(document.activeElement);
      let modifiedUrl = modifyUrl(currentUrl);
      navigator.clipboard.writeText(modifiedUrl).catch(err => {
        console.error('Failed to copy:', err);
      });
      event.preventDefault();
    }
  }
});
