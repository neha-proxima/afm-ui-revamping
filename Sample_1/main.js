// Profile dropdown functionality
function toggleProfileDropdown() {
  const dropdown = document.getElementById("profileDropdown");
  dropdown.classList.toggle("active");
}

// Close dropdown when clicking outside
document.addEventListener("click", function (event) {
  const dropdown = document.getElementById("profileDropdown");
  const profileButton = document.querySelector(".profile-button");

  if (
    !dropdown.contains(event.target) &&
    !profileButton.contains(event.target)
  ) {
    dropdown.classList.remove("active");
  }
});

// Navigation functionality
function setActiveNav(element, title, description) {
  // Remove active class from all nav items
  document.querySelectorAll(".nav-item").forEach((item) => {
    item.classList.remove("active");
  });

  // Add active class to clicked item
  element.classList.add("active");

  // Update page title and description
  document.getElementById("pageTitle").textContent = title;
  document.getElementById("pageDescription").textContent = description;

  // Show/hide content based on selection
  const settingsContent = document.getElementById("settingsContent");
  const defaultContent = document.getElementById("defaultContent");
  const diagramContent = document.getElementById("diagramContent");
  const dashboardContent = document.getElementById("dashboardContent");

  if (title === "Settings") {
    dashboardContent.style.display = "none";
    defaultContent.style.display = "none";
    diagramContent.style.display = "none";
    settingsContent.style.display = "block";
  } else if (title === "Dashboard") {
    defaultContent.style.display = "none";
    settingsContent.style.display = "none";
    diagramContent.style.display = "none";
    dashboardContent.style.display = "block";
  } else if (title === "Diagrams") {
    settingsContent.style.display = "none";
    dashboardContent.style.display = "none";
    defaultContent.style.display = "none";
    diagramContent.style.display = "block";
  } else if (title === "Samples") {
    window.location.href = "/"; // Replace with actual URL
  } else {
    settingsContent.style.display = "none";
    dashboardContent.style.display = "none";
    defaultContent.style.display = "block";
  }

  // Close profile dropdown if open
  document.getElementById("profileDropdown").classList.remove("active");
}

// Toggle switch functionality
function toggleSwitch(element) {
  element.classList.toggle("active");
}

// Submenu toggle functionality
function toggleSubmenu(submenuId, element) {
  const submenu = document.getElementById(submenuId + "-submenu");
  const isOpen = submenu.classList.contains("open");

  if (isOpen) {
    submenu.classList.remove("open");
    element.classList.remove("open");
  } else {
    submenu.classList.add("open");
    element.classList.add("open");
  }
}

// Initialize submenu visibility
function toggleProfileDropdown() {
  const dropdown = document.getElementById("profileDropdown");
  dropdown.classList.toggle("active");
}

document.addEventListener("click", function (event) {
  const dropdown = document.getElementById("profileDropdown");
  const profileButton = document.querySelector(".profile-button");

  if (
    !dropdown.contains(event.target) &&
    !profileButton.contains(event.target)
  ) {
    dropdown.classList.remove("active");
  }
});

function switchTab(tabName) {
  document
    .querySelectorAll(".tab-button")
    .forEach((btn) => btn.classList.remove("active"));
  document
    .querySelectorAll(".tab-content")
    .forEach((content) => content.classList.remove("active"));

  event.target.classList.add("active");
  document.getElementById(tabName + "-tab").classList.add("active");
}

// diagram creation modal
// Sample data - in real app, this would come from API
let diagrams = [
  {
    id: 1,
    name: "Project Roadmap Q4",
    plan: "pro",
    createdDate: "2025-09-28",
    status: "active",
    views: 124,
    edits: 47,
  },
  {
    id: 2,
    name: "Team Workflow Diagram",
    plan: "pro",
    createdDate: "2025-09-27",
    status: "active",
    views: 89,
    edits: 23,
  },
  {
    id: 3,
    name: "API Architecture",
    plan: "enterprise",
    createdDate: "2025-09-25",
    status: "active",
    views: 256,
    edits: 67,
  },
  {
    id: 4,
    name: "Database Schema v2",
    plan: "pro",
    createdDate: "2025-09-24",
    status: "active",
    views: 178,
    edits: 34,
  },
  {
    id: 5,
    name: "User Flow Chart",
    plan: "free",
    createdDate: "2025-09-20",
    status: "active",
    views: 45,
    edits: 12,
  },
  {
    id: 6,
    name: "Old System Design",
    plan: "free",
    createdDate: "2025-08-15",
    status: "archived",
    views: 234,
    edits: 89,
  },
  {
    id: 7,
    name: "Legacy API Docs",
    plan: "pro",
    createdDate: "2025-07-10",
    status: "archived",
    views: 156,
    edits: 45,
  },
];

let currentTab = "active";

function init() {
  updateCounts();
  renderDiagrams();
}

function updateCounts() {
  const activeCount = diagrams.filter((d) => d.status === "active").length;
  const archivedCount = diagrams.filter((d) => d.status === "archived").length;
  document.getElementById("activeCount").textContent = activeCount;
  document.getElementById("archivedCount").textContent = archivedCount;
}

function switchDiagramTab(tab) {
  currentTab = tab;
  document
    .querySelectorAll(".tab")
    .forEach((t) => t.classList.remove("active"));
  event.target.classList.add("active");
  renderDiagrams();
}

function renderDiagrams() {
  const container = document.getElementById("diagramsContainer");
  const filteredDiagrams = getFilteredDiagrams();

  if (filteredDiagrams.length === 0) {
    container.innerHTML = renderEmptyState();
    return;
  }

  const html = `
                <div class="diagrams-list-grid">
                    ${filteredDiagrams
                      .map((diagram) => renderDiagramCard(diagram))
                      .join("")}
                </div>
            `;
  container.innerHTML = html;
}

function getFilteredDiagrams() {
  let filtered = diagrams.filter((d) => d.status === currentTab);

  const searchTerm = document.getElementById("searchInput").value.toLowerCase();
  if (searchTerm) {
    filtered = filtered.filter((d) =>
      d.name.toLowerCase().includes(searchTerm)
    );
  }

  const planFilter = document.getElementById("planFilter").value;
  if (planFilter !== "all") {
    filtered = filtered.filter((d) => d.plan === planFilter);
  }

  return filtered;
}

function sortDiagrams() {
  const sortType = document.getElementById("sortFilter").value;

  if (sortType === "newest") {
    diagrams.sort((a, b) => new Date(b.createdDate) - new Date(a.createdDate));
  } else if (sortType === "oldest") {
    diagrams.sort((a, b) => new Date(a.createdDate) - new Date(b.createdDate));
  } else if (sortType === "name") {
    diagrams.sort((a, b) => a.name.localeCompare(b.name));
  }

  renderDiagrams();
}

function filterDiagrams() {
  renderDiagrams();
}

function renderDiagramCard(diagram) {
  const planClass = `diagram-list-plan-${diagram.plan}`;
  const planIcon =
    diagram.plan === "pro"
      ? '<i class="fas fa-star"></i>'
      : diagram.plan === "enterprise"
      ? '<i class="fas fa-crown"></i>'
      : "";
  const formattedDate = formatDate(diagram.createdDate);

  return `
                <div class="diagram-list-card" onclick="openDiagram(${
                  diagram.id
                })">
                    <div class="diagram-list-header">
                        <div class="diagram-list-icon">
                            <i class="fas fa-project-diagram"></i>
                        </div>
                        <button class="diagram-list-menu" onclick="toggleMenu(event, ${
                          diagram.id
                        })">
                            <i class="fas fa-ellipsis-v"></i>
                        </button>
                        <div class="diagram-list-dropdown-menu" id="menu-${
                          diagram.id
                        }">
                            <button class="diagram-list-dropdown-item" onclick="editDiagram(event, ${
                              diagram.id
                            })">
                                <i class="fas fa-edit"></i> Edit
                            </button>
                            <button class="diagram-list-dropdown-item danger" onclick="deleteDiagram(event, ${
                              diagram.id
                            })">
                                <i class="fas fa-trash-alt"></i> Delete
                            </button>
                        </div>
                    </div>
                    
                    <div class="diagram-list-title">${diagram.name}</div>
                    
                    <div class="diagram-list-meta">
                        <span class="diagram-list-plan-badge ${planClass}">
                            ${planIcon} ${diagram.plan.toUpperCase()}
                        </span>
                        <span class="diagram-list-date">
                            <i class="far fa-calendar"></i> ${formattedDate}
                        </span>
                    </div>
                    
                    <div class="diagram-list-footer">
                        <div class="diagram-list-stats">
                            <span class="diagram-list-stat-item">
                                <i class="far fa-eye"></i> ${diagram.views}
                            </span>
                            <span class="diagram-list-stat-item">
                                <i class="fas fa-edit"></i> ${diagram.edits}
                            </span>
                        </div>
                    </div>
                </div>
            `;
}

function renderEmptyState() {
  const isArchived = currentTab === "archived";
  return `
                <div class="diagram-list-empty-state">
                    <div class="diagram-list-empty-icon">
                        <i class="far fa-folder-open"></i>
                    </div>
                    <div class="diagram-list-empty-title">
                        ${
                          isArchived
                            ? "No Archived Diagrams"
                            : "No Diagrams Yet"
                        }
                    </div>
                    <div class="diagram-list-empty-text">
                        ${
                          isArchived
                            ? "You haven't archived any diagrams yet. Archived diagrams will appear here."
                            : "Get started by creating your first diagram. It's quick and easy!"
                        }
                    </div>
                    ${
                      !isArchived
                        ? '<button class="btn-primary" onclick="createNewDiagram()"><i class="fas fa-plus"></i> Create Your First Diagram</button>'
                        : ""
                    }
                </div>
            `;
}

function formatDate(dateString) {
  const date = new Date(dateString);
  const now = new Date();
  const diffTime = Math.abs(now - date);
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  if (diffDays === 0) return "Today";
  if (diffDays === 1) return "Yesterday";
  if (diffDays < 7) return `${diffDays} days ago`;

  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

function toggleMenu(event, diagramId) {
  event.stopPropagation();

  // Close all other menus
  document.querySelectorAll(".diagram-list-dropdown-menu").forEach((menu) => {
    if (menu.id !== `menu-${diagramId}`) {
      menu.classList.remove("active");
    }
  });

  // Toggle current menu
  const menu = document.getElementById(`menu-${diagramId}`);
  menu.classList.toggle("active");
}

function editDiagram(event, diagramId) {
  event.stopPropagation();
  const diagram = diagrams.find((d) => d.id === diagramId);
  alert(`Editing diagram: ${diagram.name}`);
  closeAllMenus();
}

function deleteDiagram(event, diagramId) {
  event.stopPropagation();
  const diagram = diagrams.find((d) => d.id === diagramId);

  if (
    confirm(
      `Are you sure you want to delete "${diagram.name}"? This action cannot be undone.`
    )
  ) {
    diagrams = diagrams.filter((d) => d.id !== diagramId);
    updateCounts();
    renderDiagrams();
    alert(`Diagram "${diagram.name}" has been deleted.`);
  }
  closeAllMenus();
}

function closeAllMenus() {
  document.querySelectorAll(".diagram-list-dropdown-menu").forEach((menu) => {
    menu.classList.remove("active");
  });
}

// Close menus when clicking outside
document.addEventListener("click", function (event) {
  if (!event.target.closest(".diagram-list-menu")) {
    closeAllMenus();
  }
});

function openDiagram(diagramId) {
  alert(`Opening diagram ${diagramId}`);
}

function createNewDiagram() {
  alert("Create new diagram functionality");
}

// Initialize on page load
// init();

// To test empty state, uncomment this:
// diagrams = [];
