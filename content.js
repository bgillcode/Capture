let intervalID;

chrome.runtime.onMessage.addListener((request, sender, response) => {
  if (request.type === 'getCurrentPage') {
    let body = document.body,
      html = document.documentElement;

    let height = Math.max(
      body.scrollHeight,
      body.offsetHeight,
      html.clientHeight,
      html.scrollHeight,
      html.offsetHeight,
    );

    window.scroll(0, 0);

    if (height > window.pageYOffset + window.innerHeight) {
      intervalID = setInterval(() => {
        if (height <= window.pageYOffset + window.innerHeight) {
          clearInterval(intervalID);
        }
        window.scroll(0, window.pageYOffset + window.innerHeight);

        chrome.runtime.sendMessage({ type: 'captureScreenshot' });
      }, 1000);
    } else {
      console.log('Done');
    }
  }

  return true;
});
