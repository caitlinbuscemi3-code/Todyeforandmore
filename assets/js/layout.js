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
    { label: "Team & Bulk Orders", href: "team-orders.html" },
    { label: "Gallery",       href: "gallery.html" },
    { label: "About",         href: "about.html" },
    { label: "Contact",       href: "contact.html" }
  ];

  /* ---------- Extra links shown only in the footer ---------- */
  var FOOTER_EXTRA_LINKS = [
    { label: "FAQ & Policies", href: "faq.html" },
    { label: "Leave a Review", href: "reviews.html" }
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

  // Returns HTML for a photo. If there's a real image path it shows the
  // photo; otherwise it shows a colored "Coming soon" placeholder box.
  //   shape: "square", "portrait" or "wide" (keeps crops consistent)
  //   pos:   optional focus point for the crop, e.g. "center top"
  //   thumb: true = use the small copy in assets/photos/thumbs/ (for cards and tiles)
  Site.media = function (opts) {
    if (opts.image) {
      var src = opts.thumb ? opts.image.replace("assets/photos/", "assets/photos/thumbs/") : opts.image;
      return '<img class="media-img' + (opts.shape ? " media-img--" + opts.shape : "") + '" src="' + Site.escape(src) +
        '" alt="' + Site.escape(opts.alt || opts.label) + '" loading="lazy"' +
        (opts.pos ? ' style="object-position:' + Site.escape(opts.pos) + '"' : "") + ">";
    }
    var cls = "ph ph--soon ph--" + (opts.color || "blush") + (opts.shape ? " ph--" + opts.shape : "");
    return '<div class="' + cls + '" role="img" aria-label="Photo coming soon: ' + Site.escape(opts.label) + '">' +
      '<span class="ph__soon">Coming soon</span><span class="ph__label">' + Site.escape(opts.label) + "</span></div>";
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

  /* ---------- Outlined brand icons ----------
     Simple line drawings used wherever the site needs a small graphic
     (steps, contact info, form boxes, etc.). They take the color of
     the text around them, which is navy by default (see .icon in styles.css).
     Use one in a page with:  <span class="icon-wrap" data-icon="gift"></span> */
  var LINE_ICONS = {
    idea:      '<path d="M9 18h6M10 21h4"/><path d="M12 3a6 6 0 0 0-3.5 10.9c.6.5 1 1.2 1 2v.1h5v-.1c0-.8.4-1.5 1-2A6 6 0 0 0 12 3z"/>',
    palette:   '<path d="M12 3a9 9 0 1 0 0 18c1.1 0 1.8-.8 1.8-1.8 0-.5-.2-.9-.5-1.2-.3-.3-.5-.7-.5-1.2 0-1 .8-1.8 1.8-1.8H16a5 5 0 0 0 5-5c0-3.9-4-7-9-7z"/><circle cx="7.5" cy="11.5" r="1"/><circle cx="10" cy="7.5" r="1"/><circle cx="14.5" cy="7.5" r="1"/>',
    check:     '<circle cx="12" cy="12" r="9"/><path d="M8 12.5l2.7 2.7 5.8-5.7"/>',
    clipboard: '<rect x="5" y="4.5" width="14" height="16.5" rx="2"/><rect x="9" y="2.5" width="6" height="4" rx="1"/><path d="M8.5 11.5h7M8.5 15.5h5"/>',
    camera:    '<path d="M4 8h3l1.5-2.5h7L17 8h3a1 1 0 0 1 1 1v10a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V9a1 1 0 0 1 1-1z"/><circle cx="12" cy="13.5" r="3.5"/>',
    trophy:    '<path d="M8 4h8v5a4 4 0 0 1-8 0V4z"/><path d="M8 6H5v1.5a3 3 0 0 0 3 3M16 6h3v1.5a3 3 0 0 1-3 3"/><path d="M12 13v4M8.5 20.5h7M10 17h4v3.5h-4z"/>',
    chat:      '<path d="M20 15a2 2 0 0 1-2 2H8l-4 4V6a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2z"/><path d="M8 9h8M8 12.5h5"/>',
    mail:      '<rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3.5 6.5l8.5 6.5 8.5-6.5"/>',
    phone:     '<path d="M5 4h3.5l1.5 4-2 1.5a11 11 0 0 0 6.5 6.5l1.5-2 4 1.5V19a1 1 0 0 1-1 1A16 16 0 0 1 4 5a1 1 0 0 1 1-1z"/>',
    pin:       '<path d="M12 21s-7-6.2-7-11.5a7 7 0 0 1 14 0C19 14.8 12 21 12 21z"/><circle cx="12" cy="9.5" r="2.5"/>',
    bag:       '<path d="M5 8h14l-1 12H6L5 8z"/><path d="M9 10V6a3 3 0 0 1 6 0v4"/>',
    card:      '<rect x="3" y="5.5" width="18" height="13" rx="2"/><path d="M3 10h18M7 15h4"/>',
    sparkle:   '<path d="M12 3l1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8z"/><path d="M19 15.5v5M16.5 18h5"/>',
    heart:     '<path d="M12 20s-7.5-4.5-7.5-10A4.3 4.3 0 0 1 12 7.5 4.3 4.3 0 0 1 19.5 10c0 5.5-7.5 10-7.5 10z"/>',
    smile:     '<circle cx="12" cy="12" r="9"/><path d="M8.5 14.5a4.5 4.5 0 0 0 7 0M9 9.5h.01M15 9.5h.01"/>',
    scissors:  '<circle cx="6" cy="7" r="2.5"/><circle cx="6" cy="17" r="2.5"/><path d="M8 8.5L20 17M8 15.5L20 7"/>',
    community: '<path d="M4 10.5L12 4l8 6.5V20a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1z"/><path d="M12 17.5s-3-1.8-3-3.8a1.6 1.6 0 0 1 3-.8 1.6 1.6 0 0 1 3 .8c0 2-3 3.8-3 3.8z"/>',
    people:    '<circle cx="9" cy="8" r="3"/><path d="M3.5 19a5.5 5.5 0 0 1 11 0"/><circle cx="17" cy="9" r="2.5"/><path d="M15.5 14.2A4.5 4.5 0 0 1 21 18.5"/>',
    gift:      '<rect x="3.5" y="8" width="17" height="4" rx="1"/><path d="M5 12v8h14v-8M12 8v12"/><path d="M12 8s-1.5-4-3.5-4a2 2 0 0 0 0 4M12 8s1.5-4 3.5-4a2 2 0 0 1 0 4"/>',
    paperclip: '<path d="M20 11.5l-7.8 7.8a5 5 0 0 1-7-7L13 4.5a3.3 3.3 0 0 1 4.7 4.7l-7.8 7.8a1.6 1.6 0 0 1-2.3-2.3l7-7"/>',
    send:      '<path d="M21 3L10 14"/><path d="M21 3l-7 18-4-7-7-4z"/>',
    truck:     '<path d="M3 6h11v10H3z"/><path d="M14 9h4l3 3.5V16h-7"/><circle cx="7" cy="17.5" r="1.8"/><circle cx="17" cy="17.5" r="1.8"/>',
    clock:     '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
    prev:      '<path d="M15 5l-7 7 7 7"/>',
    next:      '<path d="M9 5l7 7-7 7"/>'
  };
  // Returns the SVG for an outlined icon, e.g. Site.icon("gift")
  Site.icon = function (name) {
    return '<svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" ' +
      'stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false">' + (LINE_ICONS[name] || "") + "</svg>";
  };

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
  function brandHTML(showTagline, inFooter) {
    var logo = CONFIG.logo || {};
    var name = CONFIG.businessName || "To Dye For and More";
    // =================================================================
    // LOGO: the image files come from config.js → logo.src (header)
    //    and logo.footerSrc (footer, on the navy background)
    // =================================================================
    var src = inFooter && logo.footerSrc ? logo.footerSrc : logo.src;
    var img = '<img class="brand__logo" src="' + Site.escape(src) +
      '" alt="' + Site.escape(logo.alt || name + " logo") + '" width="' + (logo.width || 150) + '" height="' + (logo.height || 48) + '">';
    // Header tagline comes from config.js → tagline
    var tagline = showTagline && CONFIG.tagline ? '<span class="brand__tagline">' + Site.escape(CONFIG.tagline) + "</span>" : "";
    var text = logo.showNameNextToLogo === false ? tagline :
      '<span class="brand__text"><span class="brand__name">' + Site.escape(name) + "</span>" + tagline + "</span>";
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
        brandHTML(true) +
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
    var tel = String(c.phone || "").replace(/[^\d+]/g, "");

    footer.className = "site-footer";
    footer.innerHTML =
      '<div class="container">' +
        '<div class="footer-grid">' +
          '<div class="footer-brand">' + brandHTML(false, true) +
            "<p>" + Site.escape(CONFIG.tagline || "") + "</p>" + Site.socialHTML() +
          "</div>" +
          "<div><h4>Explore</h4><ul class=\"footer-links\">" +
            NAV_LINKS.concat(FOOTER_EXTRA_LINKS).map(function (l) { return '<li><a href="' + l.href + '">' + l.label + "</a></li>"; }).join("") +
          "</ul></div>" +
          "<div><h4>Get in touch</h4><ul class=\"footer-contact\">" +
            (c.email ? "<li>" + Site.icon("mail") + '<a href="mailto:' + Site.escape(c.email) + '">' + Site.escape(c.email) + "</a></li>" : "") +
            (c.phone ? "<li>" + Site.icon("phone") + '<a href="tel:' + Site.escape(tel) + '">' + Site.escape(c.phone) + "</a></li>" : "") +
            (c.location ? "<li>" + Site.icon("pin") + "<span>" + Site.escape(c.location) + "</span></li>" : "") +
          "</ul></div>" +
        "</div>" +
        '<div class="footer-bottom">' +
          // Copyright years: config.js → foundedYear through the current year
          "<span>© " + (CONFIG.foundedYear || 2020) + "–" + new Date().getFullYear() + " " + Site.escape(CONFIG.businessName || "") + ". All rights reserved.</span>" +
          "<span>Handmade to order in " + Site.escape(c.location || "Metro Detroit") + "</span>" +
        "</div>" +
      "</div>";
  }

  /* ---------- Fill in config values anywhere on a page ----------
     Any element with data-config="contact.email" gets that value as its text.
     Add data-config-link="mailto" or "tel" to also make it a clickable link. */
  function configValue(path) {
    return path.split(".").reduce(function (obj, key) { return obj ? obj[key] : undefined; }, CONFIG);
  }
  function fillConfigValues() {
    // Hide things like the phone row when that setting is left empty
    document.querySelectorAll("[data-hide-if-empty]").forEach(function (el) {
      if (!configValue(el.getAttribute("data-hide-if-empty"))) el.hidden = true;
    });
    document.querySelectorAll("[data-config]").forEach(function (el) {
      var value = configValue(el.getAttribute("data-config"));
      if (value == null) return;
      el.textContent = value;
      var linkType = el.getAttribute("data-config-link");
      if (linkType === "mailto") el.setAttribute("href", "mailto:" + value);
      if (linkType === "tel") el.setAttribute("href", "tel:" + String(value).replace(/[^\d+]/g, ""));
    });
    document.querySelectorAll("[data-social]").forEach(function (el) { el.innerHTML = Site.socialHTML(); });
    // "Message us on Instagram" buttons: <a data-ig-message>…</a>
    var dm = (CONFIG.social || {}).instagramMessage;
    document.querySelectorAll("[data-ig-message]").forEach(function (el) {
      if (!dm) { el.hidden = true; return; }
      el.setAttribute("href", dm);
      el.setAttribute("target", "_blank");
      el.setAttribute("rel", "noopener");
      el.insertAdjacentHTML("afterbegin", ICONS.instagram);
    });
    // Draw outlined icons: <span data-icon="gift"></span>
    document.querySelectorAll("[data-icon]").forEach(function (el) {
      el.innerHTML = Site.icon(el.getAttribute("data-icon"));
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
