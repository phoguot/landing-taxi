const yearNode = document.querySelector("#year");

if (yearNode) {
  yearNode.textContent = String(new Date().getFullYear());
}

document.querySelectorAll('a[href^="#"]').forEach((link) => {
  link.addEventListener("click", (event) => {
    const target = document.querySelector(link.getAttribute("href"));
    if (!target) return;
    event.preventDefault();
    target.scrollIntoView({
      behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth",
      block: "start"
    });
  });
});

// Mark the menu item for the section currently in view.
const navLinks = [...document.querySelectorAll(".site-nav a")];
const sections = navLinks.map((link) => document.querySelector(link.getAttribute("href"))).filter(Boolean);

if (sections.length && "IntersectionObserver" in window) {
  const visible = new Map();
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => visible.set(entry.target.id, entry.isIntersecting));
    const current = sections.find((section) => visible.get(section.id));
    navLinks.forEach((link) => {
      if (current && link.getAttribute("href") === `#${current.id}`) {
        link.setAttribute("aria-current", "true");
      } else {
        link.removeAttribute("aria-current");
      }
    });
  }, { rootMargin: "-45% 0px -50% 0px" });
  sections.forEach((section) => observer.observe(section));
}
