// Add the context menu creation logic
function createCustomSearchEngineMenu() {
  browser.contextMenus.removeAll();  // Remove old items first

  browser.storage.local.get("customSearchEngines").then((data) => {
    const customSearchEngines = data.customSearchEngines || [];

    customSearchEngines.forEach((engine, index) => {
      browser.contextMenus.create({
        id: `search-on-custom-${index}`,
        title: engine.name,
        contexts: ["selection"],
        icons: {
          "16": engine.iconUrl,
          "32": engine.iconUrl,
        }
      });

      // Add listener for custom search engine clicks
      browser.contextMenus.onClicked.addListener((info) => {
        if (info.menuItemId === `search-on-custom-${index}`) {
          const query = encodeURIComponent(info.selectionText);
          const searchUrl = engine.urlTemplate.replace("{query}", query);
          browser.tabs.create({ url: searchUrl });
        }
      });
    });
  });
}

// Initialize context menus on