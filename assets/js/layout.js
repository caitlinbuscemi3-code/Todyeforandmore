/* =====================================================================
   LAYOUT — builds the header, navigation & footer on EVERY page
   ---------------------------------------------------------------------
   Why? So the header/footer only exist in one place. Change a link here
   (or a detail in config.js) and every page updates.

   You normally don't need to edit this file — business info comes from
   assets/js/config.js. To add/rename a page in the menu, edit NAV_LINKS.
   ===================================================================== */

(function () {
  "use strict";

  var CONFIG = window.SITE_CONFIG || {};

  /* ---------- Menu links (order = order shown in the nav) ---------- */
  var NAV_LINKS = [
    { label: "Home",          href: "index.html" },
    { label: "Shop",          href: "shop.html" },
    { label: "Custom Orders", href: "custom-orders.html" },
    { label: "Team & Bulk",   href: "team-orders.html" },
    { label: "Gallery",       href: "gallery.html" },
    { label: "About",         href: "about.html" },
    { label: "Contact",       href: "contact.html" }
  ];

  /* ---------- Small shared helpers (used by other scripts too) ---------- */
  var Site = (window.Site = window.Site || {});

  // Makes text safe to put inside HTML
  Site.escape = function (str) {
    return String(str == null ? "" : str)
      .replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;").replace(/'/g, "&#39;");
  };

  // Formats a number as money, e.g. 12 -> "$12.00"
  Site.money = function (n) {
    var symbol = (CONFIG.shop && CONFIG.shop.currencySymbol) || "$";
    return symbol + Number(n || 0).toFixed(2);
  };

  // Returns HTML for a photo. If you've added a real image path it shows
  // the photo; otherwise it shows a labeled colored placeholder box.
  Site.media = function (opts) {
    var label = "[Photo: " + opts.label + "]";
    if (opts.image) {
      return '<img class="media-img" src="' + Site.escape(opts.image) + '" alt="' + Site.escape(opts.alt || opts.label) + '" loading="lazy">';
    }
    var cls = "ph ph--" + (opts.color || "pink") + (opts.shape ? " ph--" + opts.shape : "");
    return '<div class="' + cls + '" role="img" aria-label="' + Site.escape(label) + '">' + Site.escape(label) + "</div>";
  };

  /* ---------- Icons (simple inline SVGs) ---------- */
  var ICONS = {
    instagram: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="1" fill="currentColor"/></svg>',
    facebook:  '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M14 8h3V4h-3c-2.8 0-4.5 1.8-4.5 4.6V11H7v4h2.5v7h4v-7H17l.5-4h-4V8.8c0-.5.3-.8.5-.8z"/></svg>',
    tiktok:    '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M16.5 3c.3 2.2 1.6 3.7 3.8 3.9v3.3c-1.4.1-2.7-.3-3.8-1v6.1c0 3.6-2.6 5.7-5.6 5.7A5.4 5.4 0 0 1 5.5 15.6c0-3.3 2.8-5.9 6.3-5.4v3.4c-1.6-.4-3 .5-3 2 0 1.3 1 2.2 2.2 2.2 1.4 0 2.3-.9 2.3-2.6V3h3.2z"/></svg>',
    pinterest: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><circle cx="12" cy="12" r="9.5"/><path d="M10.5 21l2.2-9.5"/><path d="M9 14.5c-1-1-1.3-2.2-1.1-3.4.4-2.3 2.4-3.8 4.6-3.6 2.3.2 3.8 1.9 3.6 4.1-.2 2.4-1.7 4.1-3.4 4-1.1 0-1.9-.9-1.6-2l.8-2.8"/></svg>',
    cart:      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M6 6h15l-1.5 9h-12z"/><path d="M6 6L5 3H2"/><circle cx="9" cy="20" r="1.5"/><circle cx="18" cy="20" r="1.5"/></svg>',
    menu:      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" aria-hidden="true"><path d="M4 7h16M4 12h16M4 17h16"/></svg>',
    close:     '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" aria-hidden="true"><path d="M6 6l12 12M18 6L6 18"/></svg>'
  };
  Site.icons = ICONS;

  var SOCIAL_NAMES = { instagram: "Instagram", facebook: "Facebook", tiktok: "TikTok", pinterest: "Pinterest" };

  // Builds the list of social icons from config.js (empty links are skipped)
  Site.socialHTML = function () {
    var social = CONFIG.social || {};
    var items = Object.keys(SOCIAL_NAMES)
      .filter(function (key) { return social[key]; })
      .map(function (key) {
        return '<li><a href="' + Site.escape(social[key]) + '" target="_blank" rel="noopener" aria-label="' +
          SOCIAL_NAMES[key] + ' (opens in new tab)">' + ICONS[key] + "</a></li>";
      });
    return '<ul class="social">' + items.join("") + "</ul>";
  };

  /* ---------- Figure out which page we're on (to highlight it in the nav) ---------- */
  var currentFile = (location.pathname.split("/").pop() || "index.html").toLowerCase();
  if (currentFile === "") currentFile = "index.html";

  /* ---------- Brand (logo + name) ---------- */
  function brandHTML() {
    var logo = CONFIG.logo || {};
    var name = CONFIG.businessName || "To Dye For and More";
    // =================================================================
    // 🖼️ LOGO: the image file comes from config.js → logo.src
    //    (default placeholder: assets/images/logo-placeholder.svg)
    // =================================================================
    var img = '<img class="brand__logo" src="' + Site.escape(logo.src || "assets/images/logo-placeholder.svg") +
      '" alt="' + Site.escape(logo.alt || name + " logo") + '" width="52" height="52">';
    var text = logo.showNameNextToLogo === false ? "" : '<span class="brand__name">' + Site.escape(name) + "</span>";
    return '<a class="brand" href="index.html" aria-label="' + Site.escape(name) + ' home">' + img + text + "</a>";
  }

  /* ---------- HEADER ---------- */
  function renderHeader() {
    var header = document.getElementById("site-header");
    if (!header) return;

    var links = NAV_LINKS.map(function (link) {
      var active = link.href.toLowerCase() === currentFile ? ' aria-current="page"' : "";
      return '<li><a class="nav__link" href="' + link.href + '"' + active + ">" + link.label + "</a></li>";
    }).join("");

    header.className = "site-header";
    header.innerHTML =
      '<div class="container site-header__inner">' +
        brandHTML() +
        '<nav class="nav" id="main-nav" aria-label="Main">' +
          '<ul class="nav__list">' + links + "</ul>" +
        "</nav>" +
        '<div class="header-actions">' +
          '<a class="cart-link" href="cart.html" aria-label="View cart">' + ICONS.cart +
            '<span class="cart-count" data-cart-count hidden>0</span></a>' +
          '<button class="nav-toggle" type="button" aria-expanded="false" aria-controls="main-nav" aria-label="Open menu">' + ICONS.menu + "</button>" +
        "</div>" +
      "</div>";

    // Mobile menu open/close
    var toggle = header.querySelector(".nav-toggle");
    var nav = header.querySelector(".nav");
    function setOpen(open) {
      nav.classList.toggle("is-open", open);
      toggle.setAttribute("aria-expanded", String(open));
      toggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
      toggle.innerHTML = open ? ICONS.close : ICONS.menu;
    }
    toggle.addEventListener("click", function () { setOpen(!nav.classList.contains("is-open")); });
    document.addEventListener("keydown", function (e) { if (e.key === "Escape") setOpen(false); });
    nav.addEventListener("click", function (e) { if (e.target.closest("a")) setOpen(false); });

    // Adds a subtle shadow once you scroll down
    function onScroll() { header.classList.toggle("is-scrolled", window.scrollY > 8); }
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
  }

  /* ---------- FOOTER ---------- */
  function renderFooter() {
    var footer = document.getElementById("site-footer");
    if (!footer) return;
    var c = CONFIG.contact || {};
    var hours = (CONFIG.hours || []).map(function (h) {
      return "<div><span>" + Site.escape(h.days) + "</span><span>" + Site.escape(h.time) + "</span></div>";
    }).join("");
    var tel = String(c.phone || "").replace(/[^\d+]/g, "");

    footer.className = "site-footer";
    footer.innerHTML =
      '<div class="container">' +
        '<div class="footer-grid">' +
          '<div class="footer-brand">' + brandHTML() +
            "<p>" + Site.escape(CONFIG.tagline || "") + "</p>" + Site.socialHTML() +
          "</div>" +
          "<div><h4>Explore</h4><ul class=\"footer-links\">" +
            NAV_LINKS.map(function (l) { return '<li><a href="' + l.href + '">' + l.label + "</a></li>"; }).join("") +
          "</ul></div>" +
          "<div><h4>Get in touch</h4><ul class=\"footer-contact\">" +
            (c.email ? '<li>✉️ <a href="mailto:' + Site.escape(c.email) + '">' + Site.escape(c.email) + "</a></li>" : "") +
            (c.phone ? '<li>📞 <a href="tel:' + Site.escape(tel) + '">' + Site.escape(c.phone) + "</a></li>" : "") +
            (c.location ? "<li>📍 " + Site.escape(c.location) + "</li>" : "") +
            (c.pickupNote ? "<li>🛍️ " + Site.escape(c.pickupNote) + "</li>" : "") +
          "</ul></div>" +
          '<div><h4>Hours</h4><div class="footer-hours">' + hours + "</div></div>" +
        "</div>" +
        '<div class="footer-bottom">' +
          "<span>© " + new Date().getFullYear() + " " + Site.escape(CONFIG.businessName || "") + ". All rights reserved.</span>" +
          "<span>Made to order with 💖</span>" +
        "</div>" +
      "</div>";
  }

  /* ---------- Fill in config values anywhere on a page ----------
     Any element with data-config="contact.email" gets that value as its text.
     Add data-config-link="mailto" or "tel" to also make it a clickable link. */
  function fillConfigValues() {
    document.querySelectorAll("[data-config]").forEach(function (el) {
      var value = el.getAttribute("data-config").split(".").reduce(function (obj, key) {
        return obj ? obj[key] : undefined;
      }, CONFIG);
      if (value == null) return;
      el.textContent = value;
      var linkType = el.getAttribute("data-config-link");
      if (linkType === "mailto") el.setAttribute("href", "mailto:" + value);
      if (linkType === "tel") el.setAttribute("href", "tel:" + String(value).replace(/[^\d+]/g, ""));
    });
    document.querySelectorAll("[data-social]").forEach(function (el) { el.innerHTML = Site.socialHTML(); });
    document.querySelectorAll("[data-hours]").forEach(function (el) {
      el.innerHTML = '<table class="hours-table"><tbody>' + (CONFIG.hours || []).map(function (h) {
        return "<tr><td>" + Site.escape(h.days) + "</td><td>" + Site.escape(h.time) + "</td></tr>";
      }).join("") + "</tbody></table>";
    });
  }

  /* ---------- Toast pop-up message ---------- */
  var toastEl, toastTimer;
  Site.toast = function (html) {
    if (!toastEl) {
      toastEl = document.createElement("div");
      toastEl.className = "toast";
      toastEl.setAttribute("role", "status");
      toastEl.setAttribute("aria-live", "polite");
      document.body.appendChild(toastEl);
    }
    toastEl.innerHTML = html;
    toastEl.classList.add("is-visible");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(function () { toastEl.classList.remove("is-visible"); }, 3500);
  };

  /* ---------- Run ---------- */
  renderHeader();
  renderFooter();
  fillConfigValues();
})();
