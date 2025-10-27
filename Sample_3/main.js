function toggleSidebar() {
  const sidebar = document.getElementById("sidebar");
  const toggleBtn = document.querySelector(".toggle-btn");
  const toggleText = toggleBtn.querySelector(".nav-text");
  const mainContent = document.querySelector(".main-content");
  const header = document.querySelector(".header");

  sidebar.classList.toggle("expanded");

  // Update tooltip and text
  if (sidebar.classList.contains("expanded")) {
    toggleBtn.setAttribute("data-tooltip", "Collapse Menu");
    toggleText.textContent = "Collapse";
    mainContent.style.marginLeft = "280px";
    header.style.padding = "0 16px 0 238px";
    header.style.transition = "padding 300ms cubic-bezier(0.4, 0, 0.2, 1)";
  } else {
    toggleBtn.setAttribute("data-tooltip", "Expand Menu");
    toggleText.textContent = "Expand";
    mainContent.style.marginLeft = "80px";
    header.style.padding = "0 16px 0 38px";
  }
}

function toggleMobileSidebar() {
  const sidebar = document.getElementById("sidebar");
  const overlay = document.querySelector(".overlay");

  sidebar.classList.toggle("expanded");
  overlay.classList.toggle("active");
}

function toggleProfileDropdown() {
  const dropdown = document.getElementById("profileDropdown");
  dropdown.classList.toggle("active");
}

function setTheme(event, theme) {
  event.stopPropagation();

  // Remove active class from all theme options
  document.querySelectorAll(".theme-option").forEach((option) => {
    option.classList.remove("active");
  });

  // Add active class to selected theme
  event.currentTarget.classList.add("active");

  // Here you would typically save the theme preference and apply it
  console.log("Theme changed to:", theme);
}

function handleLogout() {
  // Handle logout logic here
  console.log("Logging out...");
  alert("Logout functionality would be implemented here");
}

function showDiagramsPage(event) {
  event.preventDefault();

  // Hide dashboard, show diagrams
  document.getElementById("dashboardPage").classList.remove("active");
  document.getElementById("diagramsPage").classList.add("active");

  // Update active nav item
  document.querySelectorAll(".nav-item").forEach((item) => {
    item.classList.remove("active");
    const indicator = item.querySelector(".active-indicator");
    if (indicator) indicator.remove();
  });

  event.currentTarget.classList.add("active");

  // Add active indicator
  const indicator = document.createElement("div");
  indicator.className = "active-indicator";
  event.currentTarget.insertBefore(indicator, event.currentTarget.firstChild);
}

function switchTab(event, tabType) {
  // Update active tab
  document.querySelectorAll(".tab").forEach((tab) => {
    tab.classList.remove("active");
  });
  event.currentTarget.classList.add("active");

  // Show/hide diagram grids
  const activeDiagrams = document.getElementById("activeDiagrams");
  const archivedDiagrams = document.getElementById("archivedDiagrams");

  if (tabType === "active") {
    activeDiagrams.style.display = "grid";
    archivedDiagrams.style.display = "none";
  } else {
    activeDiagrams.style.display = "none";
    archivedDiagrams.style.display = "grid";
  }
}

function showCanvasPage() {
  // Hide all pages
  document.getElementById("dashboardPage").classList.remove("active");
  document.getElementById("diagramsPage").classList.remove("active");

  // Show canvas page
  document.getElementById("canvasPage").classList.add("active");
}

function toggleEditInfo() {
  const modal = document.getElementById("editInfoModal");
  const overlay = document.getElementById("modalOverlay");
  const versionSidebar = document.getElementById("versionSidebar");

  // Close version sidebar if open
  versionSidebar.classList.remove("active");

  modal.classList.toggle("active");
  overlay.classList.toggle("active");
}

function toggleVersions() {
  const sidebar = document.getElementById("versionSidebar");
  const overlay = document.getElementById("modalOverlay");
  const editModal = document.getElementById("editInfoModal");

  // Close edit modal if open
  editModal.classList.remove("active");

  sidebar.classList.toggle("active");
  overlay.classList.toggle("active");
}

function toggleExportDropdown() {
  const dropdown = document.getElementById("exportDropdown");
  dropdown.classList.toggle("active");

  // Close dropdown when clicking outside
  if (dropdown.classList.contains("active")) {
    setTimeout(() => {
      document.addEventListener("click", closeExportDropdown);
    }, 0);
  }
}

function closeExportDropdown(event) {
  const dropdown = document.getElementById("exportDropdown");
  const exportBtn = event.target.closest(".toolbar-btn");

  if (!exportBtn || !exportBtn.onclick) {
    dropdown.classList.remove("active");
    document.removeEventListener("click", closeExportDropdown);
  }
}

function closeAllModals() {
  const editModal = document.getElementById("editInfoModal");
  const versionSidebar = document.getElementById("versionSidebar");
  const overlay = document.getElementById("modalOverlay");

  editModal.classList.remove("active");
  versionSidebar.classList.remove("active");
  overlay.classList.remove("active");
}

function switchModalTab(event, tabType) {
  // Update active tab
  document.querySelectorAll(".modal-tab").forEach((tab) => {
    tab.classList.remove("active");
  });
  event.currentTarget.classList.add("active");

  // Show/hide tab content
  const dataDrivenTab = document.getElementById("dataDrivenTab");
  const jsonImportTab = document.getElementById("jsonImportTab");

  if (tabType === "dataDriven") {
    dataDrivenTab.style.display = "block";
    jsonImportTab.style.display = "none";
  } else {
    dataDrivenTab.style.display = "none";
    jsonImportTab.style.display = "block";
  }
}

function saveDiagram() {
  const saveStatus = document.getElementById("saveStatus");
  if (saveStatus) {
    saveStatus.classList.add("saved");
    saveStatus.innerHTML = `
                    <svg fill="currentColor" viewBox="0 0 20 20">
                        <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/>
                    </svg>
                    All changes saved
                `;
  }
}

function markAsUnsaved() {
  const saveStatus = document.getElementById("saveStatus");
  if (saveStatus) {
    saveStatus.classList.remove("saved");
    saveStatus.innerHTML = `
                    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
                    </svg>
                    Unsaved changes
                `;
  }
}

function applyChanges() {
  // Apply the changes from the modal
  saveDiagram();
  toggleEditInfo();
}

function showSettingsPage(event) {
  event.preventDefault();

  // Hide all pages
  document.getElementById("dashboardPage").classList.remove("active");
  document.getElementById("diagramsPage").classList.remove("active");
  document.getElementById("canvasPage").classList.remove("active");

  console.log(document.getElementById("settingsPage"));
  // Show settings page
  document.getElementById("settingsPage").classList.add("active");

  // Update active nav item
  document.querySelectorAll(".nav-item").forEach((item) => {
    item.classList.remove("active");
    const indicator = item.querySelector(".active-indicator");
    if (indicator) indicator.remove();
  });

  event.currentTarget.classList.add("active");

  // Add active indicator
  const indicator = document.createElement("div");
  indicator.className = "active-indicator";
  event.currentTarget.insertBefore(indicator, event.currentTarget.firstChild);
}

function switchSettingsTab(event, tabName) {
  event.preventDefault();

  // Update active menu item
  document.querySelectorAll(".settings-menu-item").forEach((item) => {
    item.classList.remove("active");
  });
  event.currentTarget.classList.add("active");

  // Hide all tabs
  document.querySelectorAll(".settings-tab").forEach((tab) => {
    tab.style.display = "none";
  });

  // Show selected tab
  const tabs = {
    general: "generalTab",
    authentication: "authenticationTab",
    billing: "billingTab",
    invoices: "invoicesTab",
    preferences: "preferencesTab",
  };

  const tabId = tabs[tabName];
  if (tabId) {
    document.getElementById(tabId).style.display = "block";
  }
}

function showSettingsPageFromDropdown() {
  // Close the dropdown
  const dropdown = document.getElementById("profileDropdown");
  if (dropdown) {
    dropdown.classList.remove("active");
  }

  // Hide all pages
  document.getElementById("dashboardPage").classList.remove("active");
  document.getElementById("diagramsPage").classList.remove("active");
  document.getElementById("canvasPage").classList.remove("active");

  // Show settings page
  document.getElementById("settingsPage").classList.add("active");

  // Update active nav item
  document.querySelectorAll(".nav-item").forEach((item) => {
    item.classList.remove("active");
    const indicator = item.querySelector(".active-indicator");
    if (indicator) indicator.remove();
  });

  // Find and activate settings nav item
  const settingsNavItem = document.querySelector(
    '.nav-item[data-tooltip="Settings"]'
  );
  if (settingsNavItem) {
    settingsNavItem.classList.add("active");
    const indicator = document.createElement("div");
    indicator.className = "active-indicator";
    settingsNavItem.insertBefore(indicator, settingsNavItem.firstChild);
  }
}

// Close dropdown when clicking outside
document.addEventListener("click", function (event) {
  const dropdown = document.getElementById("profileDropdown");
  const avatar = document.querySelector(".user-avatar");

  if (
    dropdown &&
    !dropdown.contains(event.target) &&
    avatar &&
    !avatar.contains(event.target)
  ) {
    dropdown.classList.remove("active");
  }

  // Close mobile sidebar when clicking outside
  if (window.innerWidth <= 768) {
    const sidebar = document.getElementById("sidebar");
    const menuBtn = document.querySelector(".mobile-menu-btn");

    if (
      sidebar &&
      menuBtn &&
      !sidebar.contains(event.target) &&
      !menuBtn.contains(event.target) &&
      sidebar.classList.contains("expanded")
    ) {
      toggleMobileSidebar();
    }
  }
});

// Handle window resize
window.addEventListener("resize", function () {
  const sidebar = document.getElementById("sidebar");
  const overlay = document.querySelector(".overlay");

  if (window.innerWidth > 768 && overlay) {
    overlay.classList.remove("active");
  }
});

// Initialize tooltip text
document.addEventListener("DOMContentLoaded", function () {
  const sidebar = document.getElementById("sidebar");
  const toggleBtn = document.querySelector(".toggle-btn");
  const toggleText = toggleBtn ? toggleBtn.querySelector(".nav-text") : null;

  if (
    sidebar &&
    toggleBtn &&
    toggleText &&
    !sidebar.classList.contains("expanded")
  ) {
    toggleBtn.setAttribute("data-tooltip", "Expand Menu");
    toggleText.textContent = "Expand";
  }
});

// Main sidebar navigation
function setActiveNav(title) {
  document.querySelectorAll(".nav-item").forEach((item) => {
    item.classList.remove("active");
    const indicator = item.querySelector(".active-indicator");
    if (indicator) indicator.remove();
  });

  // Add active class to the clicked nav item
  const requestedNav = document.querySelector(
    `.nav-item[data-tooltip="${title}"]`
  );
  if (requestedNav) requestedNav.classList.add("active");

  // Update page title (if exists)
  const pageTitle = document.getElementById("pageTitle");
  if (pageTitle) pageTitle.textContent = title;

  // Define all possible content sections
  const sections = [
    document.getElementById("app_dashboard"),
    document.getElementById("app_settings"),
    document.getElementById("app_diagrams"),
    document.getElementById("app_diagram_canvas"),
    document.getElementById("default"),
  ];

  // Hide all sections first
  sections.forEach((section) => {
    if (section) section.style.display = "none";
  });

  // Then show the selected one
  if (title === "Settings") {
    document.getElementById("app_settings").style.display = "block";
  } else if (title === "Dashboard") {
    document.getElementById("app_dashboard").style.display = "block";
  } else if (title === "Diagrams") {
    document.getElementById("app_diagrams").style.display = "block";
  } else if (title === "DiagramCanvas") {
    document.getElementById("app_diagram_canvas").style.display = "block";
  } else {
    document.getElementById("default").style.display = "block";
  }
}

function setActiveSettingsItem() {
  const menuItems = document.querySelectorAll(".settings-menu-item");
  const tabContents = document.querySelectorAll(".tab-content");

  menuItems.forEach((item) => {
    item.addEventListener("click", function () {
      const tabName = this.getAttribute("data-tab");

      // Remove active class from all menu items
      menuItems.forEach((mi) => mi.classList.remove("active"));

      // Hide all tab contents
      tabContents.forEach((tc) => (tc.style.display = "none"));

      // Add active class to clicked item
      this.classList.add("active");

      // Show corresponding tab content
      document.getElementById(`${tabName}-tab`).style.display = "block";
    });
  });
}
