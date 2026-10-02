// Wait until the page has loaded
document.addEventListener("DOMContentLoaded", function () {

  // ===== 1. MOBILE MENU TOGGLE =====
  var navToggle = document.getElementById("navToggle");
  var navLinks = document.getElementById("navLinks");

  navToggle.addEventListener("click", function () {
    var isOpen = navLinks.classList.toggle("open");
    navToggle.setAttribute("aria-expanded", isOpen);
  });

  // Close the menu after clicking a link (on mobile)
  navLinks.querySelectorAll("a").forEach(function (link) {
    link.addEventListener("click", function () {
      navLinks.classList.remove("open");
      navToggle.setAttribute("aria-expanded", "false");
    });
  });

  // ===== 2. HIGHLIGHT ACTIVE NAV LINK WHILE SCROLLING =====
  var sections = document.querySelectorAll("main section[id]");
  var links = navLinks.querySelectorAll("a");

  function highlightLink() {
    var scrollPos = window.scrollY + 120;
    sections.forEach(function (section) {
      if (scrollPos >= section.offsetTop && scrollPos < section.offsetTop + section.offsetHeight) {
        links.forEach(function (l) {
          l.classList.toggle("active", l.getAttribute("href") === "#" + section.id);
        });
      }
    });
  }
  window.addEventListener("scroll", highlightLink);
  highlightLink();

  // ===== 3. FOOTER YEAR =====
  document.getElementById("year").textContent = new Date().getFullYear();

  // ===== 4. CONTACT FORM VALIDATION =====
  var form = document.getElementById("contactForm");
  var status = document.getElementById("formStatus");

  // Show or clear an error for one field
  function setError(input, message) {
    document.getElementById(input.id + "Error").textContent = message;
    input.classList.toggle("invalid", message !== "");
  }

  // Check one field; returns true if valid
  function validateField(input) {
    var value = input.value.trim();
    var message = "";

    if (value === "") {
      message = "This field is required.";
    } else if (input.id === "name" && value.length < 2) {
      message = "Name must be at least 2 characters.";
    } else if (input.id === "email" && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
      message = "Please enter a valid email address.";
    } else if (input.id === "subject" && value.length < 3) {
      message = "Subject must be at least 3 characters.";
    } else if (input.id === "message" && value.length < 10) {
      message = "Message must be at least 10 characters.";
    }

    setError(input, message);
    return message === "";
  }

  var fields = form.querySelectorAll("input, textarea");

  // Re-check a field when the user leaves it
  fields.forEach(function (field) {
    field.addEventListener("blur", function () { validateField(field); });
  });

  form.addEventListener("submit", function (event) {
    event.preventDefault(); // stop the page from reloading
    status.textContent = "";
    status.className = "form-status";

    var allValid = true;
    fields.forEach(function (field) {
      if (!validateField(field)) { allValid = false; }
    });

    if (allValid) {
      // NOTE: This is a front-end-only form. Nothing is sent anywhere.
      status.textContent =
        "Thank you! Your message passed validation. Note: this demo form does not send " +
        "emails. Please contact me directly at keerthanaraolopelly@gmail.com.";
      status.classList.add("success");
      form.reset();
    } else {
      status.textContent = "Please fix the errors above and try again.";
    }
  });
});