document.addEventListener("DOMContentLoaded", loadSearchEngines);

document.getElementById("addSearchEngineForm").addEventListener("submit", (e) => {
  e.preventDefault();

  const name = document.getElementById("name").value;
  const urlTemplate = document.getElementById("urlTemplate").value;
  const iconUrl = document.getElementById("iconUrl").value || "icons/default_icon.png"; // Default icon if none provided

  // Send message to background.js to add the search engine
  browser.runtime.sendMessage({
    action: "addCustomSearchEngine",
    name,
    urlTemplate,
    iconUrl,
  });

  // Clear the form fields
  document.getElementById("name").value = "";
  document.getElementById("urlTemplate").value = "";
  document.getElementById("iconUrl").value = "";
});

function loadSearchEngines() {
  // Fetch the search engines from local storage and display them
  browser.storage.local.get("customSearchEngines").then((data) => {
    const customSearchEngines = data.customSearchEngines || [];
    const listContainer = document.getElementById("searchEnginesList");

    listContainer.innerHTML = ""; // Clear existing list

    customSearchEngines.forEach((engine, index) => {
      const engineDiv = document.createElement("div");
      engineDiv.classList.add("search-engine");

      engineDiv.innerHTML = `
        <strong>${engine.name}</strong><br>
        <em>${engine.urlTemplate}</em><br>
        <div class="button-container">
          <button class="editButton" data-index="${index}">Edit</button>
          <button class="deleteButton" data-index="${index}">Delete</button>
        </div>
      `;

      listContainer.appendChild(engineDiv);
    });

    // Add event listeners for edit and delete buttons
    document.querySelectorAll(".editButton").forEach(button => {
      button.addEventListener("click", handleEdit);
    });

    document.querySelectorAll(".deleteButton").forEach(button => {
      button.addEventListener("click", handleDelete);
    });
  });
}

function handleEdit(event) {
  const index = event.target.getAttribute("data-index");

  browser.storage.local.get("customSearchEngines").then((data) => {
    const customSearchEngines = data.customSearchEngines || [];
    const engine = customSearchEngines[index];

    // Fill the form with the current search engine details
    document.getElementById("name").value = engine.name;
    document.getElementById("urlTemplate").value = engine.urlTemplate;
    document.getElementById("iconUrl").value = engine.iconUrl;

    // Change the form submission to update instead of add
    document.getElementById("addSearchEngineForm").addEventListener("submit", function update(e) {
      e.preventDefault();

      customSearchEngines[index] = {
        name: document.getElementById("name").value,
        urlTemplate: document.getElementById("urlTemplate").value,
        iconUrl: document.getElementById("iconUrl").value || "icons/default_icon.png",
      };

      // Save the updated list back to storage
      browser.storage.local.set({ customSearchEngines }).then(() => {
        loadSearchEngines(); // Reload the list to show the updated version
        document.getElementById("addSearchEngineForm").removeEventListener("submit", update); // Remove the event listener
        clearForm(); // Clear the form after submission
      });
    });
  });
}

function handleDelete(event) {
  const index = event.target.getAttribute("data-index");

  browser.storage.local.get("customSearchEngines").then((data) => {
    const customSearchEngines = data.customSearchEngines || [];
    customSearchEngines.splice(index, 1); // Remove the selected search engine

    // Save the updated list back to storage
    browser.storage.local.set({ customSearchEngines }).then(() => {
      loadSearchEngines(); // Reload the list
    });
  });
}

function clearForm() {
  document.getElementById("name").value = "";
  document.getElementById("urlTemplate").value = "";
  document.getElementById("iconUrl").value = "";
}