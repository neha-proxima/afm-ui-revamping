// Tab Navigation
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

// Main sidebar navigation
function setActiveNav(title) {
  // Remove active class from all nav items
  document.querySelectorAll(".nav-item").forEach((item) => {
    item.classList.remove("active");
  });

  // Add active class to the clicked nav item
  const requestedNav = document.querySelector(`.nav-item[title="${title}"]`);
  if (requestedNav) requestedNav.classList.add("active");

  // Update page title (if exists)
  const pageTitle = document.getElementById("pageTitle");
  if (pageTitle) pageTitle.textContent = title;

  // Define all possible content sections
  const sections = [
    document.getElementById("dashboard"),
    document.getElementById("settings"),
    document.getElementById("diagrams"),
    document.getElementById("diagram_canvas"),
    document.getElementById("default"),
  ];

  // Hide all sections first
  sections.forEach((section) => {
    if (section) section.style.display = "none";
  });

  // Then show the selected one
  if (title === "Settings") {
    document.getElementById("settings").style.display = "block";
  } else if (title === "Dashboard") {
    document.getElementById("dashboard").style.display = "block";
  } else if (title === "Diagrams") {
    document.getElementById("diagrams").style.display = "block";
  } else if (title === "Diagram_Canvas") {
    document.getElementById("diagram_canvas").style.display = "block";
  } else {
    document.getElementById("default").style.display = "block";
  }
}

// Diagram
function createNewDiagram() {
  setActiveNav("Diagram_Canvas");

  setDiagramCanvasThings();
}

// Tab switching
function setDiagramsTab() {
  const tabs = document.querySelectorAll(".tab");
  const activeDiagrams = document.getElementById("active-diagrams");
  const archivedDiagrams = document.getElementById("archived-diagrams");

  tabs.forEach((tab) => {
    tab.addEventListener("click", function () {
      tabs.forEach((t) => t.classList.remove("active"));
      this.classList.add("active");

      const tabName = this.getAttribute("data-tab");
      if (tabName === "active") {
        activeDiagrams.style.display = "block";
        archivedDiagrams.style.display = "none";
      } else {
        activeDiagrams.style.display = "none";
        archivedDiagrams.style.display = "block";
      }
    });
  });

  // Create diagram button
  document
    .getElementById("create-diagram")
    .addEventListener("click", function () {
      console.log("Creating new diagram...");
      alert("Create New Diagram clicked!");
    });

  // Search functionality
  const searchInput = document.getElementById("diagram-search");
  searchInput.addEventListener("input", function (e) {
    const searchTerm = e.target.value.toLowerCase();
    const diagramCards = document.querySelectorAll(".diagram-card");

    diagramCards.forEach((card) => {
      const name = card
        .querySelector(".diagram-name")
        .textContent.toLowerCase();
      if (name.includes(searchTerm)) {
        card.style.display = "flex";
      } else {
        card.style.display = "none";
      }
    });
  });

  // Filter by plan
  document
    .getElementById("filter-plan")
    .addEventListener("change", function (e) {
      const selectedPlan = e.target.value.toLowerCase();
      const diagramCards = document.querySelectorAll(".diagram-card");

      diagramCards.forEach((card) => {
        const badge = card.querySelector(".plan-badge");
        const plan = badge.textContent.toLowerCase();

        if (selectedPlan === "" || plan === selectedPlan) {
          card.style.display = "flex";
        } else {
          card.style.display = "none";
        }
      });
    });

  // Sort functionality
  document
    .getElementById("filter-sort")
    .addEventListener("change", function (e) {
      const sortBy = e.target.value;
      console.log("Sorting by:", sortBy);
      // Implement sorting logic here
    });

  // Action buttons
  document.querySelectorAll(".action-btn").forEach((btn) => {
    btn.addEventListener("click", function (e) {
      e.stopPropagation();
      const action = this.getAttribute("title");
      const diagramName =
        this.closest(".diagram-card").querySelector(
          ".diagram-name"
        ).textContent;
      console.log(`${action} - ${diagramName}`);

      if (action === "Delete" || action === "Delete Permanently") {
        if (confirm(`Are you sure you want to delete "${diagramName}"?`)) {
          this.closest(".diagram-card").remove();
        }
      } else if (action === "Restore") {
        alert(`Restoring "${diagramName}" to active diagrams`);
        this.closest(".diagram-card").remove();
      }
    });
  });
}

function setDiagramCanvasThings() {
  // Edit Info Drawer
  const editInfoBtn = document.getElementById("edit-info-btn");
  const drawer = document.getElementById("edit-drawer");
  const drawerOverlay = document.getElementById("drawer-overlay");
  const closeDrawer = document.getElementById("close-drawer");
  const cancelBtn = document.getElementById("cancel-btn");

  editInfoBtn.addEventListener("click", () => {
    drawer.classList.add("active");
    drawerOverlay.classList.add("active");
  });

  closeDrawer.addEventListener("click", () => {
    drawer.classList.remove("active");
    drawerOverlay.classList.remove("active");
  });

  cancelBtn.addEventListener("click", () => {
    drawer.classList.remove("active");
    drawerOverlay.classList.remove("active");
  });

  drawerOverlay.addEventListener("click", () => {
    drawer.classList.remove("active");
    drawerOverlay.classList.remove("active");
    versionsPanel.classList.remove("active");
  });

  // Drawer Tabs
  const tabs = document.querySelectorAll(".tab");
  const tabContents = document.querySelectorAll(".tab-content");

  tabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      tabs.forEach((t) => t.classList.remove("active"));
      tabContents.forEach((tc) => tc.classList.remove("active"));

      tab.classList.add("active");
      const tabId = tab.getAttribute("data-tab") + "-tab";
      document.getElementById(tabId).classList.add("active");
    });
  });

  // Versions Panel
  const versionsBtn = document.getElementById("versions-btn");
  const versionsPanel = document.getElementById("versions-panel");
  const closeVersions = document.getElementById("close-versions");

  versionsBtn.addEventListener("click", () => {
    versionsPanel.classList.add("active");
    drawerOverlay.classList.add("active");
  });

  closeVersions.addEventListener("click", () => {
    versionsPanel.classList.remove("active");
    drawerOverlay.classList.remove("active");
  });

  // Export Dropdown
  const exportBtn = document.getElementById("export-btn");
  const exportMenu = document.getElementById("export-menu");

  exportBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    exportMenu.classList.toggle("active");
  });

  document.addEventListener("click", () => {
    exportMenu.classList.remove("active");
  });

  document.getElementById("export-pdf").addEventListener("click", () => {
    console.log("Exporting as PDF...");
    alert("Exporting diagram as PDF");
  });

  document.getElementById("export-image").addEventListener("click", () => {
    console.log("Exporting as Image...");
    alert("Exporting diagram as Image");
  });

  // Export JSON
  document.getElementById("export-json-btn").addEventListener("click", () => {
    console.log("Exporting as JSON...");
    alert("Exporting diagram as JSON");
  });

  // Share
  document.getElementById("share-btn").addEventListener("click", () => {
    console.log("Sharing diagram...");
    alert("Share diagram functionality");
  });

  // Save
  document.getElementById("save-btn").addEventListener("click", () => {
    console.log("Saving diagram...");
    const unsavedBadge = document.querySelector(".unsaved-badge");
    unsavedBadge.style.display = "none";

    // Simulate save success
    setTimeout(() => {
      alert("Diagram saved successfully!");
    }, 500);
  });

  // Sidebar navigation
  const navItems = document.querySelectorAll(".nav-item");
  navItems.forEach((item) => {
    item.addEventListener("click", function () {
      navItems.forEach((nav) => nav.classList.remove("active"));
      this.classList.add("active");
      console.log("Navigating to:", this.getAttribute("title"));
    });
  });
}

let currentStep = 1;
const totalSteps = 5;

function nextStep() {
  if (currentStep < totalSteps) {
    currentStep++;
    updateSteps();
  }
}

function prevStep() {
  if (currentStep > 1) {
    currentStep--;
    updateSteps();
  }
}

function updateSteps() {
  // Update step indicators
  const steps = document.querySelectorAll(".step");
  steps.forEach((step, index) => {
    const stepNumber = index + 1;
    step.classList.remove("active", "completed");

    if (stepNumber < currentStep) {
      step.classList.add("completed");
    } else if (stepNumber === currentStep) {
      step.classList.add("active");
    }
  });

  // Update progress line
  const progressPercentage = ((currentStep - 1) / (totalSteps - 1)) * 100;
  document.getElementById("progress-line").style.width =
    progressPercentage + "%";

  // Update step content
  document.querySelectorAll(".step-content").forEach((content, index) => {
    content.classList.remove("active");
    if (index + 1 === currentStep) {
      content.classList.add("active");
    }
  });
}

function completePayment() {
  alert(
    "Processing payment...\n\nThank you for upgrading to Pro Plan!\nYour account will be activated immediately."
  );
  console.log("Payment completed successfully!");
}

function openPlanUpgradeModal() {
  document.getElementById("planUpgrade").classList.add("active");

  // User count change handler
  document
    .getElementById("users-count")
    .addEventListener("change", function (e) {
      const value = e.target.value;
      console.log("Users changed to:", value);
      // Update pricing calculations here
    });

  // Apply coupon handler
  document
    .getElementById("apply-coupon")
    .addEventListener("click", function () {
      const couponCode = document.getElementById("coupon-code").value;
      if (couponCode) {
        alert('Coupon "' + couponCode + '" applied!');
        console.log("Coupon applied:", couponCode);
      } else {
        alert("Please enter a coupon code");
      }
    });
  // Initialize
  updateSteps();
}

function closeUpgradePlanModal() {
    document.getElementById("planUpgrade").classList.remove("active");
}

function openDropDownMenu() {
  const profileDropdown = document.getElementById('profile-dropdown');
  profileDropdown.classList.toggle('active');
}
