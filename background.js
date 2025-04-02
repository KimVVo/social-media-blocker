// Define the blocked social media websites
const blockedSites = [
    "*://*.facebook.com/*",
    "*://*.twitter.com/*",
    "*://*.instagram.com/*",
    "*://*.tiktok.com/*",
    "*://*.linkedin.com/*"
  ];
  
  // Add declarativeNetRequest rules to block the sites
  chrome.runtime.onInstalled.addListener(() => {
    chrome.declarativeNetRequest.updateDynamicRules(
      {
        addRules: blockedSites.map((url, id) => ({
          id: id + 1,
          priority: 1,
          action: { type: "redirect", redirect: { url: chrome.runtime.getURL("error.html") } },
          condition: { urlFilter: url, resourceTypes: ["main_frame"] }
        })),
        removeRuleIds: Array.from({ length: blockedSites.length }, (_, i) => i + 1)
      },
      () => {
        if (chrome.runtime.lastError) {
          console.error("Failed to update rules:", chrome.runtime.lastError.message);
        } else {
          console.log("Rules updated successfully.");
        }
      }
    );
  });