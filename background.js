const screenshots = [];

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.type == 'captureScreenshot') {
    chrome.tabs.captureVisibleTab(null, {}, (dataURL) => {
      console.log(dataURL, 'dataURL');
      screenshots.push(dataURL);
      // Note: Need to stitch these together afterwards
      console.log(screenshots, 'screenshots');
    });

    console.log(screenshots, 'screenshots');
  }

  // sendResponse();
  return true;
});

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (changeInfo.status === 'complete') {
    chrome.tabs.sendMessage(tabId, { type: 'getCurrentPage' }, (res) => {
      console.log('Done');
    });
  }
});
