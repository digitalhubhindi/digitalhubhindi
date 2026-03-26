const menuToggle = document.querySelector(".menu-toggle");
const siteNav = document.querySelector(".site-nav");
const dropdownToggles = document.querySelectorAll(".nav-dropdown-toggle");
const searchForms = document.querySelectorAll(".search-form");
const yearTargets = document.querySelectorAll("[data-year]");

if (menuToggle && siteNav) {
  menuToggle.addEventListener("click", () => {
    const isOpen = siteNav.classList.toggle("is-open");
    menuToggle.setAttribute("aria-expanded", String(isOpen));
  });
}

dropdownToggles.forEach((toggle) => {
  toggle.addEventListener("click", () => {
    const parent = toggle.closest(".nav-dropdown");

    if (!parent) {
      return;
    }

    const isOpen = parent.classList.toggle("is-open");
    toggle.setAttribute("aria-expanded", String(isOpen));
  });
});

searchForms.forEach((form) => {
  form.addEventListener("submit", (event) => {
    event.preventDefault();

    const existingFeedback = form.querySelector(".search-feedback");

    if (existingFeedback) {
      existingFeedback.remove();
    }

    const feedback = document.createElement("p");
    feedback.className = "search-feedback";
    feedback.textContent =
      "Search functionality baad mein add hogi. Abhi yeh UI preview hai.";

    form.appendChild(feedback);
  });
});

yearTargets.forEach((target) => {
  target.textContent = new Date().getFullYear();
});
