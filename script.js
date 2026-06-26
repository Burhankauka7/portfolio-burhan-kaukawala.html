/* ── LOADING SCREEN ── */
window.addEventListener("load", () => {
  setTimeout(() => {
    document.getElementById("loading-screen").classList.add("hidden");
  }, 1400);
});

/* ── THEME ── */
const html = document.documentElement;
const themeBtn = document.getElementById("theme-toggle");
const savedTheme = localStorage.getItem("theme") || "light";
html.setAttribute("data-theme", savedTheme);
themeBtn.textContent = savedTheme === "dark" ? "☀️" : "🌙";

themeBtn.addEventListener("click", () => {
  const current = html.getAttribute("data-theme");
  const next = current === "dark" ? "light" : "dark";
  html.setAttribute("data-theme", next);
  localStorage.setItem("theme", next);
  themeBtn.textContent = next === "dark" ? "☀️" : "🌙";
});

/* ── SCROLL PROGRESS ── */
const progressBar = document.getElementById("scroll-progress");
window.addEventListener(
  "scroll",
  () => {
    const scrolled =
      (window.scrollY /
        (document.documentElement.scrollHeight - window.innerHeight)) *
      100;
    progressBar.style.width = scrolled + "%";
  },
  { passive: true },
);

/* ── NAVBAR SCROLL ── */
const navbar = document.getElementById("navbar");
window.addEventListener(
  "scroll",
  () => {
    navbar.classList.toggle("scrolled", window.scrollY > 20);
  },
  { passive: true },
);

/* ── ACTIVE NAV LINK ── */
const sections = document.querySelectorAll("section[id]");
const navLinks = document.querySelectorAll(".nav-links a[data-section]");
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        navLinks.forEach((a) => a.classList.remove("active"));
        const active = document.querySelector(
          `.nav-links a[data-section="${entry.target.id}"]`,
        );
        if (active) active.classList.add("active");
      }
    });
  },
  { threshold: 0.4 },
);
sections.forEach((s) => observer.observe(s));

/* ── HAMBURGER ── */
const hamburger = document.getElementById("hamburger");
const mobileNav = document.getElementById("mobile-nav");
hamburger.addEventListener("click", () => {
  hamburger.classList.toggle("open");
  mobileNav.classList.toggle("open");
});
mobileNav.querySelectorAll("a").forEach((a) =>
  a.addEventListener("click", () => {
    hamburger.classList.remove("open");
    mobileNav.classList.remove("open");
  }),
);

/* ── CUSTOM CURSOR ── */
const dot = document.getElementById("cursor-dot");
const ring = document.getElementById("cursor-ring");
let mx = 0,
  my = 0,
  rx = 0,
  ry = 0;
document.addEventListener("mousemove", (e) => {
  mx = e.clientX;
  my = e.clientY;
  dot.style.left = mx + "px";
  dot.style.top = my + "px";
});
function animateRing() {
  rx += (mx - rx) * 0.12;
  ry += (my - ry) * 0.12;
  ring.style.left = rx + "px";
  ring.style.top = ry + "px";
  requestAnimationFrame(animateRing);
}
animateRing();

/* ── SPOTLIGHT ── */
const spotlight = document.getElementById("spotlight");
const hero = document.getElementById("hero");
hero.addEventListener("mousemove", (e) => {
  const rect = hero.getBoundingClientRect();
  spotlight.style.left = e.clientX - rect.left + "px";
  spotlight.style.top = e.clientY - rect.top + "px";
});

/* ── SCROLL REVEAL ── */
const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
      }
    });
  },
  { threshold: 0.12, rootMargin: "0px 0px -40px 0px" },
);
document
  .querySelectorAll(".reveal")
  .forEach((el) => revealObserver.observe(el));

/* ── SKILL BARS ── */
const skillObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.querySelectorAll(".skill-bar-fill").forEach((bar) => {
          bar.classList.add("animated");
        });
      }
    });
  },
  { threshold: 0.3 },
);
document
  .querySelectorAll(".skill-category")
  .forEach((c) => skillObserver.observe(c));

/* ── TILT EFFECT ── */
document.querySelectorAll("[data-tilt]").forEach((card) => {
  card.addEventListener("mousemove", (e) => {
    const rect = card.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 12;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * -12;
    card.style.transform = `translateY(-8px) rotateX(${y}deg) rotateY(${x}deg)`;
  });
  card.addEventListener("mouseleave", () => {
    card.style.transform = "";
  });
});

/* ── BACK TO TOP ── */
const btt = document.getElementById("back-to-top");
window.addEventListener(
  "scroll",
  () => {
    btt.classList.toggle("visible", window.scrollY > 400);
  },
  { passive: true },
);
btt.addEventListener("click", () =>
  window.scrollTo({ top: 0, behavior: "smooth" }),
);

/* ── STAT COUNTER ANIMATION ── */
function animateCounter(el, target) {
  let start = 0;
  const duration = 1500;
  const startTime = performance.now();
  function update(now) {
    const progress = Math.min((now - startTime) / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    el.textContent =
      typeof target === "number"
        ? Math.round(eased * target) + (el.dataset.suffix || "")
        : target;
    if (progress < 1) requestAnimationFrame(update);
  }
  requestAnimationFrame(update);
}
const counterObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        counterObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.5 },
);
document
  .querySelectorAll(".stat-number")
  .forEach((el) => counterObserver.observe(el));
