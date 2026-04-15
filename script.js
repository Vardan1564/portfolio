const menuToggle = document.getElementById("menu-toggle");
const navMenu = document.getElementById("nav-menu");
const navLinks = document.querySelectorAll(".nav a");
const revealItems = document.querySelectorAll(".reveal");
const contactForm = document.getElementById("contact-form");
const formStatus = document.getElementById("form-status");
const yearEl = document.getElementById("year");
const avatarImage = document.getElementById("avatar-image");
const avatarFallback = document.getElementById("avatar-fallback");

if (menuToggle && navMenu) {
  menuToggle.addEventListener("click", () => {
    navMenu.classList.toggle("open");
  });
}

navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    navMenu.classList.remove("open");
  });
});

const observer = new IntersectionObserver(
  (entries, obs) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        obs.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.18 }
);

revealItems.forEach((item) => observer.observe(item));

if (contactForm) {
  contactForm.addEventListener("submit", (event) => {
    event.preventDefault();
    formStatus.textContent =
      "Thanks for reaching out. I will get back to you soon.";
    contactForm.reset();
  });
}

if (yearEl) {
  yearEl.textContent = new Date().getFullYear();
}

if (avatarImage) {
  const avatarCandidates = [
    "assets/me.jpeg",
    "assets/me.jpg",
    "assets/me.png",
    "assets/vardan-photo.png",
    "assets/vardan-photo.jpg",
    "assets/vardan-photo.jpeg",
    "assets/profile.jpg",
    "assets/profile.jpeg",
    "assets/profile.png",
    "assets/photo.jpg",
    "assets/photo.jpeg",
    "assets/photo.png",
  ];

  let avatarIndex = 0;

  avatarImage.onerror = () => {
    avatarIndex += 1;
    if (avatarIndex < avatarCandidates.length) {
      avatarImage.src = avatarCandidates[avatarIndex];
    } else {
      avatarImage.style.display = "none";
      if (avatarFallback) {
        avatarFallback.style.display = "grid";
      }
    }
  };

  avatarImage.onload = () => {
    avatarImage.style.display = "block";
    if (avatarFallback) {
      avatarFallback.style.display = "none";
    }
  };

  avatarImage.src = avatarCandidates[avatarIndex];
}

const hasFontAwesome = () => {
  const probe = document.createElement("i");
  probe.className = "fa-solid fa-circle-check";
  probe.style.position = "absolute";
  probe.style.left = "-9999px";
  document.body.appendChild(probe);

  const styles = window.getComputedStyle(probe, "::before");
  const content = styles.getPropertyValue("content");
  const fontFamily = styles.getPropertyValue("font-family");

  probe.remove();

  return (
    content &&
    content !== "none" &&
    content !== "normal" &&
    fontFamily &&
    fontFamily.toLowerCase().includes("font awesome")
  );
};

const applyIconFallbacks = () => {
  const fallbackMap = [
    { selector: ".fa-linkedin-in, .fa-linkedin", text: "in" },
    { selector: ".fa-github", text: "GH" },
    { selector: ".fa-envelope", text: "@" },
    { selector: ".fa-phone", text: "+" },
    { selector: ".fa-python", text: "Py" },
    { selector: ".fa-leaf", text: "Dj" },
    { selector: ".fa-laravel", text: "Lv" },
    { selector: ".fa-database", text: "DB" },
    { selector: ".fa-code-branch", text: "DS" },
    { selector: ".fa-git-alt", text: "Git" },
    { selector: ".fa-html5", text: "H5" },
    { selector: ".fa-chart-line", text: "ML" },
  ];

  fallbackMap.forEach(({ selector, text }) => {
    document.querySelectorAll(selector).forEach((icon) => {
      icon.textContent = text;
      icon.classList.add("icon-fallback");
    });
  });
};

if (!hasFontAwesome()) {
  applyIconFallbacks();
}
