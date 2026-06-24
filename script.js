document.addEventListener("DOMContentLoaded", () => {
  if (window.lucide) {
    window.lucide.createIcons();
  }

  const heroVideo = document.querySelector(".hero-video");
  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  if (heroVideo && !prefersReducedMotion) {
    heroVideo.playbackRate = 0.5;
    heroVideo.defaultPlaybackRate = 0.5;
    heroVideo.play().catch(() => {
      heroVideo.controls = true;
    });
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
  const emailAppLink = document.querySelector("#email-app-link");
  const recipient = "mrs.jennasisk@gmail.com";

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

    const encodedSubject = encodeURIComponent(subject);
    const encodedBody = encodeURIComponent(body);
    const mailtoUrl = `mailto:${recipient}?subject=${encodedSubject}&body=${encodedBody}`;
    const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(recipient)}&su=${encodedSubject}&body=${encodedBody}`;

    emailAppLink.href = mailtoUrl;
    status.firstChild.textContent = "Gmail opened in a new tab. Review the message there and click Send. ";

    const composeWindow = window.open(gmailUrl, "_blank");

    if (!composeWindow) {
      status.firstChild.textContent = "Your browser blocked the Gmail window. Allow pop-ups, or ";
      emailAppLink.textContent = "open the inquiry in your email app";
      emailAppLink.focus();
    } else {
      composeWindow.opener = null;
    }
  });

  document.querySelector("#year").textContent = new Date().getFullYear();
});
