document.getElementById('show-details').addEventListener('click', () => {
  chrome.tabs.create({ url: 'details.html' });
});

// Add code to update stats (optional, based on your implementation)
