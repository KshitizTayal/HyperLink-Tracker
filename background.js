chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === "logHyperlinks") {
    chrome.runtime.sendNativeMessage('com.example.hyperlink_tracker', message.data, response => {
      if (chrome.runtime.lastError) {
        console.error(chrome.runtime.lastError);
        sendResponse({ success: false, error: chrome.runtime.lastError });
      } else {
        sendResponse({ success: true, response });
      }
    });
    return true; // Will respond asynchronously
  }
});
