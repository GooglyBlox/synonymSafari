// background.js
chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    if (request.contentScriptQuery == "querySynonyms") {
      let url = "https://api.datamuse.com/words?rel_syn=" + encodeURIComponent(request.word);
      fetch(url)
        .then(response => response.json())
        .then(words => sendResponse(words))
        .catch(error => console.error(error));
      return true;
    }
  });
