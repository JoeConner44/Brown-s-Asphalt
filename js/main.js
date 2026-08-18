/* Brown's Asphalt Maintenance — site interactions */
(function () {
  "use strict";

  /* ---- Mobile nav toggle ---- */
  var toggle = document.querySelector(".nav__toggle");
  var menu = document.querySelector(".nav__menu");
  if (toggle && menu) {
    toggle.addEventListener("click", function () {
      var open = menu.classList.toggle("is-open");
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
    });
    menu.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", function () {
        menu.classList.remove("is-open");
        toggle.setAttribute("aria-expanded", "false");
      });
    });
  }

  /* ---- Header shadow on scroll ---- */
  var header = document.querySelector(".site-header");
  if (header) {
    var onScroll = function () {
      header.classList.toggle("is-scrolled", window.scrollY > 8);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
  }

  /* ---- Reveal on scroll ---- */
  var reveals = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window && reveals.length) {
    var io = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );
    reveals.forEach(function (el, i) {
      el.style.transitionDelay = (i % 4) * 80 + "ms";
      io.observe(el);
    });
  } else {
    reveals.forEach(function (el) { el.classList.add("is-visible"); });
  }

  /* ---- Auto-updating "years in business" (recomputes every Jan 1) ---- */
  document.querySelectorAll("[data-since-year]").forEach(function (el) {
    var since = parseInt(el.getAttribute("data-since-year"), 10);
    if (!since) return;
    var years = new Date().getFullYear() - since;
    var suffix = el.getAttribute("data-suffix") || "";
    el.setAttribute("data-count", years);
    el.textContent = years + suffix;
  });

  /* ---- Animated stat counters ---- */
  var counters = document.querySelectorAll("[data-count]");
  if ("IntersectionObserver" in window && counters.length) {
    var countObs = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (!entry.isIntersecting) return;
          var el = entry.target;
          var target = parseFloat(el.getAttribute("data-count"));
          var suffix = el.getAttribute("data-suffix") || "";
          var decimals = (target % 1 !== 0) ? 1 : 0;
          var start = null;
          var dur = 1400;
          function tick(ts) {
            if (start === null) start = ts;
            var p = Math.min((ts - start) / dur, 1);
            var eased = 1 - Math.pow(1 - p, 3);
            el.textContent = (target * eased).toFixed(decimals) + suffix;
            if (p < 1) requestAnimationFrame(tick);
            else el.textContent = target.toFixed(decimals) + suffix;
          }
          requestAnimationFrame(tick);
          countObs.unobserve(el);
        });
      },
      { threshold: 0.5 }
    );
    counters.forEach(function (el) { countObs.observe(el); });
  }

  /* ---- FAQ: keep only one open (progressive enhancement) ---- */
  var faqItems = document.querySelectorAll(".faq__item");
  faqItems.forEach(function (item) {
    item.addEventListener("toggle", function () {
      if (item.open) {
        faqItems.forEach(function (other) {
          if (other !== item) other.open = false;
        });
      }
    });
  });

  /* ---- Contact form (front-end demo handling) ---- */
  var form = document.querySelector("[data-quote-form]");
  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      if (!form.checkValidity()) {
        form.reportValidity();
        return;
      }
      var success = form.querySelector(".form__success");
      var btn = form.querySelector('button[type="submit"]');
      if (btn) { btn.disabled = true; btn.textContent = "Sending…"; }
      // Simulated submission — replace with real endpoint (Formspree, Netlify, etc.)
      setTimeout(function () {
        if (success) {
          success.classList.add("is-visible");
          success.setAttribute("role", "status");
        }
        form.reset();
        if (btn) { btn.disabled = false; btn.textContent = "Request My Free Estimate"; }
        if (success) success.scrollIntoView({ behavior: "smooth", block: "center" });
      }, 900);
    });
  }

  /* ---- GIF service icons: hold on first frame, play on card hover ---- */
  (function () {
    // Only freeze where hovering is possible; touch devices just let them play.
    var canHover = !window.matchMedia || window.matchMedia("(hover: hover)").matches;
    var gifs = document.querySelectorAll(".card__icon--media img");
    if (!gifs.length || !canHover) return;

    gifs.forEach(function (img) {
      var card = img.closest(".card");
      if (!card) return;
      var gifSrc = img.getAttribute("src");
      var staticSrc = null;

      // Capture the first frame to a canvas so the icon sits still at rest.
      function freeze() {
        if (staticSrc) { img.src = staticSrc; return; }
        try {
          var w = img.naturalWidth, h = img.naturalHeight;
          if (!w || !h) return;
          var canvas = document.createElement("canvas");
          canvas.width = w;
          canvas.height = h;
          canvas.getContext("2d").drawImage(img, 0, 0, w, h);
          staticSrc = canvas.toDataURL("image/png");
          img.src = staticSrc;
        } catch (e) {
          /* capture failed (e.g. tainted canvas) — leave the GIF playing */
        }
      }

      function play() { if (staticSrc) img.src = gifSrc; }   // reload = restart from frame 1
      function stop() { if (staticSrc) img.src = staticSrc; }

      // Freeze as early as the first frame is decodable.
      if (img.complete && img.naturalWidth) {
        freeze();
      } else if (img.decode) {
        img.decode().then(freeze).catch(function () {
          img.addEventListener("load", freeze, { once: true });
        });
      } else {
        img.addEventListener("load", freeze, { once: true });
      }

      card.addEventListener("mouseenter", play);
      card.addEventListener("mouseleave", stop);
      // Keyboard users get it too when the card's link is focused.
      card.addEventListener("focusin", play);
      card.addEventListener("focusout", stop);
    });
  })();

  /* ---- Current year in footer ---- */
  var yr = document.querySelectorAll("[data-year]");
  yr.forEach(function (el) { el.textContent = new Date().getFullYear(); });
})();
