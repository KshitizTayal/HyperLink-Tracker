const hyperlinks = [];
document.querySelectorAll('a').forEach(link => {
  hyperlinks.push(link.href);
});

const uniqueHyperlinks = [...new Set(hyperlinks)];
const url = window.location.hostname;

chrome.runtime.sendMessage({
  action: 'logHyperlinks',
  data: {
    url,
    hyperlinks: uniqueHyperlinks
  }
});
