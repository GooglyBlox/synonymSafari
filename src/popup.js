// popup.js
document.getElementById('save').onclick = function() {
    let chance = document.getElementById('chance').value;
    let highlight = document.getElementById('highlight').checked;
    chrome.storage.sync.set({chance: chance, highlight: highlight}, function() {
      console.log('Settings saved');
    });
  };
  
  // Load current settings when popup is opened
  chrome.storage.sync.get(['chance', 'highlight'], function(data) {
    document.getElementById('chance').value = data.chance || 5; // default to 5% if not set
    document.getElementById('highlight').checked = data.highlight !== undefined ? data.highlight : true; // default to true if not set
  });
  
