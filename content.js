// content.js
let textNodes = [];

function findTextNodes(node) {
  if (node.nodeType === Node.TEXT_NODE && /\S/.test(node.data)) {
    textNodes.push(node);
  } else {
    for (let i = 0; i < node.childNodes.length; i++) {
      findTextNodes(node.childNodes[i]);
    }
  }
}

findTextNodes(document.body);

chrome.storage.sync.get(['chance', 'highlight'], function(data) {
  let chance = data.chance / 100 || 0.05;  // default to 5% if not set
  let highlight = data.highlight !== undefined ? data.highlight : true;  // default to true if not set

  textNodes.forEach(node => {
    let words = node.data.split(/\s+/);
    for (let i = 0; i < words.length; i++) {
      if (Math.random() < chance && words[i].length > 5) {  // words longer than 5 letters
        chrome.runtime.sendMessage(
          {contentScriptQuery: "querySynonyms", word: words[i]},
          synonyms => {
            if (synonyms && synonyms.length > 0) {
              let synonym = synonyms[0].word;
              let regex = new RegExp("\\b" + words[i] + "\\b");
              let replacement = highlight ? '<span style="background-color: yellow;">' + synonym + '</span>' : synonym;
              node.parentNode.innerHTML = node.parentNode.innerHTML.replace(regex, replacement);
            }
          });
      }
    }
  });
});
