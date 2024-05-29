document.getElementById('start').addEventListener('click', () => {
    const interval = document.getElementById('interval').value;
    chrome.storage.local.set({ refreshInterval: interval }, () => {
      chrome.runtime.sendMessage({ action: "start" });
    });
  });
  
  document.getElementById('stop').addEventListener('click', () => {
    chrome.runtime.sendMessage({ action: "stop" });
  });