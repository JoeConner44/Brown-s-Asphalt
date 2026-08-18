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

  /* ---- GIF service icons: play once on scroll-in & on hover, hold last frame ----
     GIFs loop forever by default. We strip each GIF's looping flag so it plays
     exactly once (the browser then holds the final frame), start it when the card
     scrolls into view, and replay it whenever the cursor enters the card. */
  (function () {
    var gifs = document.querySelectorAll(".card__icon--media img");
    if (!gifs.length) return;
    var reduce = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // Remove the NETSCAPE/ANIMEXTS looping application-extension block from a GIF
    // so it animates a single time and stops on its last frame.
    function stripLoop(u8) {
      if (u8.length < 14 || u8[0] !== 0x47 || u8[1] !== 0x49 || u8[2] !== 0x46) return u8; // not "GIF"
      var packed = u8[10];
      var i = 13;
      if (packed & 0x80) i += 3 * (1 << ((packed & 7) + 1)); // skip global color table
      function endOfSubBlocks(j) { while (u8[j] !== 0x00) { j += u8[j] + 1; } return j + 1; }
      var chunks = [u8.subarray(0, i)];
      while (i < u8.length) {
        var b = u8[i];
        if (b === 0x3B) { chunks.push(u8.subarray(i)); break; }       // trailer
        if (b === 0x2C) {                                             // image descriptor
          var ip = u8[i + 9], p = i + 10;
          if (ip & 0x80) p += 3 * (1 << ((ip & 7) + 1));              // local color table
          p += 1;                                                     // LZW min code size
          p = endOfSubBlocks(p);
          chunks.push(u8.subarray(i, p)); i = p; continue;
        }
        if (b === 0x21) {                                            // extension
          var label = u8[i + 1], drop = false;
          if (label === 0xFF && u8[i + 2] === 0x0B) {
            var id = "";
            for (var k = 0; k < 11; k++) id += String.fromCharCode(u8[i + 3 + k]);
            if (id === "NETSCAPE2.0" || id === "ANIMEXTS1.0") drop = true;
          }
          var p2 = endOfSubBlocks(i + 2);
          if (!drop) chunks.push(u8.subarray(i, p2));
          i = p2; continue;
        }
        chunks.push(u8.subarray(i)); break;                          // unknown — copy rest
      }
      var total = 0, off = 0;
      chunks.forEach(function (c) { total += c.length; });
      var out = new Uint8Array(total);
      chunks.forEach(function (c) { out.set(c, off); off += c.length; });
      return out;
    }

    gifs.forEach(function (img) {
      var card = img.closest(".card") || img;
      var gifSrc = img.getAttribute("src");

      fetch(gifSrc)
        .then(function (r) { return r.arrayBuffer(); })
        .then(function (buf) {
          var bytes = stripLoop(new Uint8Array(buf));
          var lastUrl = null, started = false;
          function makeUrl() { return URL.createObjectURL(new Blob([bytes], { type: "image/gif" })); }
          function play() {
            started = true;
            if (lastUrl) URL.revokeObjectURL(lastUrl);
            lastUrl = makeUrl();
            img.src = lastUrl; // fresh object URL restarts the single-play animation
          }

          // Hold the first frame until the icon is scrolled into view.
          var cap = new Image();
          cap.onload = function () {
            if (started) return; // already playing — don't stomp on it
            try {
              var c = document.createElement("canvas");
              c.width = cap.naturalWidth; c.height = cap.naturalHeight;
              c.getContext("2d").drawImage(cap, 0, 0);
              img.src = c.toDataURL("image/png");
            } catch (e) { /* keep current frame if capture fails */ }
          };
          cap.src = makeUrl();

          if (reduce) return; // reduced motion: leave it on the first frame, no animation

          // Play once each time the card scrolls into view.
          if ("IntersectionObserver" in window) {
            var io = new IntersectionObserver(function (entries) {
              entries.forEach(function (e) { if (e.isIntersecting) play(); });
            }, { threshold: 0.6 });
            io.observe(card);
          } else {
            play();
          }

          // Replay on hover / keyboard focus.
          card.addEventListener("mouseenter", play);
          card.addEventListener("focusin", play);
        })
        .catch(function () { /* fetch/parse failed — leave the native GIF as-is */ });
    });
  })();

  /* ---- Current year in footer ---- */
  var yr = document.querySelectorAll("[data-year]");
  yr.forEach(function (el) { el.textContent = new Date().getFullYear(); });
})();
