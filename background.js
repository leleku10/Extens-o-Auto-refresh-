let refreshIntervalId;

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === "start") {
    chrome.storage.local.get("refreshInterval", ({ refreshInterval }) => {
      const intervalInMinutes = parseInt(refreshInterval, 10);
      console.log(intervalInMinutes);
      if (intervalInMinutes > 0) {
        const intervalInMilliseconds = intervalInMinutes * 1000;
        startAutoRefresh(intervalInMilliseconds);
      }
    });
  } else if (message.action === "stop") {
    stopAutoRefresh();
  }
});

function startAutoRefresh(interval) {
  stopAutoRefresh(); // Limpa qualquer intervalo anterior
  refreshIntervalId = setInterval(() => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      if (tabs[0]) {
        chrome.tabs.reload(tabs[0].id);
      }
    });
  }, interval);
}

function stopAutoRefresh() {
  if (refreshIntervalId) {
    clearInterval(refreshIntervalId);
    refreshIntervalId = undefined; // Limpa a variável de intervalo
  }
}
