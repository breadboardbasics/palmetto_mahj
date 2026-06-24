document.addEventListener("DOMContentLoaded", () => {
  if (window.lucide) {
    window.lucide.createIcons();
  }

  const navToggle = document.querySelector(".nav-toggle");
  const nav = document.querySelector(".site-nav");

  navToggle.addEventListener("click", () => {
    const isOpen = nav.classList.toggle("open");
    navToggle.setAttribute("aria-expanded", String(isOpen));
    navToggle.setAttribute("aria-label", isOpen ? "Close navigation" : "Open navigation");
    navToggle.innerHTML = `<i data-lucide="${isOpen ? "x" : "menu"}"></i>`;
    if (window.lucide) window.lucide.createIcons();
  });

  nav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      nav.classList.remove("open");
      navToggle.setAttribute("aria-expanded", "false");
    });
  });

  const form = document.querySelector("#contact-form");
  const status = document.querySelector("#form-status");

  form.addEventListener("submit", (event) => {
    event.preventDefault();

    if (!form.reportValidity()) return;

    const data = new FormData(form);
    const subject = `Palmetto Mahjong inquiry: ${data.get("service")}`;
    const body = [
      `Name: ${data.get("name")}`,
      `Email: ${data.get("email")}`,
      `Service: ${data.get("service")}`,
      `Preferred date: ${data.get("date") || "Flexible"}`,
      `Number of guests: ${data.get("guests") || "Not sure yet"}`,
      "",
      "Details:",
      data.get("message")
    ].join("\n");

    status.textContent = "Opening your email app...";
    window.location.href = `mailto:hello@palmettomahjong.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  });

  document.querySelector("#year").textContent = new Date().getFullYear();
});
