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

  if (title === "Settings") {
    settingsContent.style.display = "block";
    defaultContent.style.display = "none";
  } else {
    settingsContent.style.display = "none";
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
document.addEventListener("DOMContentLoaded", function () {
  const financesSubmenu = document.getElementById("finances-submenu");
  const financesButton = document.querySelector(".nav-item.has-submenu");
  financesSubmenu.classList.add("open");
  financesButton.classList.add("open");
});
