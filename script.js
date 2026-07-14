(function () {
  "use strict";

  const flipImages = document.querySelectorAll('.project-card-flip img');

  flipImages.forEach(image => {
    image.addEventListener('click', (event) => {
      // Find the closest parent with the flip class and remove it
      event.currentTarget.closest('.project-card-flip').classList.remove('is-flipped');
    });
  });

  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------- Footer year ---------- */
  var yearEl = document.getElementById("year");
  if (yearEl) {
    yearEl.textContent = String(new Date().getFullYear());
  }

  /* ---------- Mobile nav toggle ---------- */
  var nav = document.getElementById("nav");
  var navToggle = document.getElementById("navToggle");
  var navLinks = document.getElementById("navLinks");

  function closeMobileNav() {
    if (!navLinks || !navToggle) return;
    navLinks.classList.remove("is-open");
    navToggle.classList.remove("is-open");
    navToggle.setAttribute("aria-expanded", "false");
  }

  if (navToggle && navLinks) {
    navToggle.addEventListener("click", function () {
      var isOpen = navLinks.classList.toggle("is-open");
      navToggle.classList.toggle("is-open", isOpen);
      navToggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
    });

    navLinks.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", closeMobileNav);
    });

    document.addEventListener("click", function (event) {
      if (!navLinks.classList.contains("is-open")) return;
      var clickedInsideNav = nav && nav.contains(event.target);
      if (!clickedInsideNav) closeMobileNav();
    });
  }

  /* ---------- Nav background on scroll ---------- */
  function handleScrollState() {
    if (!nav) return;
    nav.classList.toggle("is-scrolled", window.scrollY > 10);
  }
  handleScrollState();
  window.addEventListener("scroll", handleScrollState, { passive: true });

  /* ---------- Scroll-spy active link ---------- */
  var navLinkEls = document.querySelectorAll(".nav__link[data-nav]");
  var spySections = [];
  navLinkEls.forEach(function (link) {
    var id = link.getAttribute("href");
    if (!id || id.charAt(0) !== "#") return;
    var section = document.querySelector(id);
    if (section) spySections.push({ link: link, section: section });
  });

  if (spySections.length && "IntersectionObserver" in window) {
    var spyObserver = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (!entry.isIntersecting) return;
          spySections.forEach(function (pair) {
            pair.link.classList.toggle("is-active", pair.section === entry.target);
          });
        });
      },
      { rootMargin: "-45% 0px -50% 0px", threshold: 0 }
    );
    spySections.forEach(function (pair) {
      spyObserver.observe(pair.section);
    });
  }

  /* ---------- Reveal on scroll ---------- */
  var revealEls = document.querySelectorAll("[data-reveal]");

  if (reduceMotion || !("IntersectionObserver" in window)) {
    revealEls.forEach(function (el) {
      el.classList.add("is-visible");
    });
  } else {
    var revealObserver = new IntersectionObserver(
      function (entries, observer) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -40px 0px" }
    );
    revealEls.forEach(function (el) {
      revealObserver.observe(el);
    });
  }

  /* ---------- Copy email to clipboard ---------- */
  var copyBtn = document.getElementById("copyEmailBtn");
  if (copyBtn) {
    copyBtn.addEventListener("click", function () {
      var text = copyBtn.getAttribute("data-copy") || "";
      var originalLabel = "Copy";

      function showCopied() {
        copyBtn.textContent = "Copied";
        copyBtn.classList.add("is-copied");
        setTimeout(function () {
          copyBtn.textContent = originalLabel;
          copyBtn.classList.remove("is-copied");
        }, 1800);
      }

      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(text).then(showCopied).catch(function () {
          /* clipboard write failed silently; user can still select the email text */
        });
      }
    });
  }
})();