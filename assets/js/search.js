/* =====================================================================
   SEARCH — the search bar in the header, and the Search Results page
   ---------------------------------------------------------------------
   Searching from any page opens search.html?q=your+words, which shows
   EVERY matching item as a product tile (same tiles and buttons as the
   Shop page).

   It searches every product in assets/js/products.js (signature designs,
   made-to-order items, and Team & Bulk items) plus the custom and team
   services in SEARCH_SERVICES below, which aren't Shop products.

   Matching looks at each item's name, description, and hidden "keywords"
   (products.js → keywords). Keywords are never shown to customers, so add
   team nicknames, colors, occasions, and common misspellings there.
   Best matches come first: items whose name matches, then description
   matches, then keyword-only matches.
   ===================================================================== */

(function () {
  "use strict";

  var Site = window.Site || {};

  /* ---------- Custom & team services that aren't Shop products ----------
     They show as tiles on the results page, just like products:
       bulk: true      → "Request a Quote" (Team & Bulk Orders form)
       price + formType → "Request Custom" (Custom Orders form, with that option picked)
     keywords: search only (never shown) */
  var SEARCH_SERVICES = [
    { id: "svc-apparel", name: "Custom T-shirts, Hoodies & Crewnecks", price: 25, formType: "tees", category: "apparel",
      image: "assets/photos/custom-team-apparel.jpg", label: "custom printed and embroidered apparel",
      desc: "Custom printed designs and classic embroidery with names, monograms, logos, or sayings.",
      keywords: "custom apparel printed embroidered embroidery t-shirt tshirt tee hoodie hoody crewneck sweatshirt names monogram logo sayings personalized family birthday group" },
    { id: "svc-pets", name: "Embroidered Pet Sweatshirt", price: 55, formType: "pet", category: "apparel",
      image: "assets/photos/custom-embroidered-dog-crewnecks.jpg", label: "crewneck embroidered with a customer's dogs",
      desc: "Send us a photo of your furry (or scaly!) best friend and we'll embroider it onto a cozy sweatshirt.",
      keywords: "pet dog cat puppy kitten animal photo portrait embroidered embroidery sweatshirt crewneck hoodie dog mom cat mom pet lover gift" },
    { id: "svc-company-hoodies", name: "Company Hoodies", bulk: true,
      image: "assets/photos/custom-team-company-hoodies-2.jpg", label: "company hoodie",
      desc: "Cozy branded hoodies with your company logo or design, made to match across your whole team.",
      keywords: "company business corporate logo branded hoodie hoody sweatshirt staff employees work team bulk" },
    { id: "svc-company-tees", name: "Company T-shirts", bulk: true,
      image: "assets/photos/company-team-t-shirt.jpg", label: "company t-shirts",
      desc: "Matching logo tees for your staff, events, and company outings.",
      keywords: "company business corporate logo branded t-shirt tshirt tee staff employees work outing event team bulk" },
    { id: "svc-team-shoes", name: "Team Shoes", bulk: true,
      image: "assets/photos/custom-tigers-shoes-bulk-order.jpg", label: "a bulk order of custom sneakers",
      desc: "Matching hand-painted sneakers for your whole team or staff, in your colors with logos, mascots, or numbers.",
      keywords: "team matching shoes sneakers kicks cleats hand-painted hand painted custom painted staff game day player numbers mascot logo coach bulk" },
    { id: "svc-quarter-zips", name: "Quarter Zips", bulk: true,
      image: "assets/photos/custom-team-gear.jpg", label: "embroidered coaches' quarter zips",
      desc: "Polished embroidered quarter zips for coaches, staff, and company teams.",
      keywords: "quarter zip 1/4 zip pullover jacket embroidered embroidery coach coaches staff sideline company team bulk" },
    { id: "svc-team-gifts", name: "Team Gifts & Accessories", bulk: true,
      image: "assets/photos/dscf6664.jpg", label: "custom favors and gifts",
      desc: "Custom koozies, engraved tumblers, bag tags, and totes for events and end-of-season gifts.",
      keywords: "team gifts coach gift end of season senior night koozies tumblers bag tags totes favors bulk" },
    { id: "svc-events", name: "Events & Reunions", bulk: true,
      image: "assets/photos/halloween-shirts-disney-inside-out-photo.jpg", label: "group in matching shirts",
      desc: "Matching shirts for family reunions, fundraisers, 5Ks, church groups, and trips.",
      keywords: "family reunion event fundraiser 5k run walk church group trip vacation halloween costume matching shirts bachelorette birthday party bulk" },
    { id: "svc-staff-uniforms", name: "Staff Uniforms", bulk: true,
      image: "assets/photos/custom-bulk-apparel-company-custom-order.jpg", label: "restaurant staff shirts",
      desc: "Logo shirts and outerwear for restaurants, shops, and service teams.",
      keywords: "staff uniforms work shirts restaurant shop salon service business logo trade show swag employees bulk" }
  ];

  /* ---------- Popular categories (shown when nothing matches) ---------- */
  var POPULAR = [
    { label: "Gifts", href: "shop.html?cat=gifts" },
    { label: "Kids & Baby", href: "shop.html?cat=kids" },
    { label: "Sports", href: "shop.html?cat=sports" },
    { label: "Weddings", href: "wedding.html" },
    { label: "Holiday", href: "shop.html?cat=holiday" },
    { label: "Custom Shoes", href: "custom-orders.html#shoes" },
    { label: "Team & Bulk Orders", href: "team-orders.html" },
    { label: "Shop Everything", href: "shop.html" }
  ];

  var STOP_WORDS = { a: 1, an: 1, the: 1, and: 1, or: 1, "for": 1, of: 1, with: 1, to: 1, my: 1, in: 1, on: 1, me: 1, i: 1 };

  /* ---------- Text helpers ---------- */
  // lowercase, no accents or apostrophes, punctuation -> spaces
  function norm(text) {
    return String(text || "").toLowerCase()
      .normalize("NFD").replace(/[̀-ͯ]/g, "")
      .replace(/[’'`]/g, "").replace(/&/g, " and ")
      .replace(/[^a-z0-9]+/g, " ").trim();
  }
  // Allows one typo (a letter added, missing, swapped, or wrong) in longer words
  function oneEditApart(a, b) {
    if (Math.abs(a.length - b.length) > 1) return false;
    var i = 0, j = 0, edits = 0;
    while (i < a.length && j < b.length) {
      if (a[i] === b[j]) { i++; j++; continue; }
      if (++edits > 1) return false;
      if (a[i + 1] === b[j] && a[i] === b[j + 1]) { i += 2; j += 2; continue; } // swapped letters
      if (a.length > b.length) i++;
      else if (a.length < b.length) j++;
      else { i++; j++; }
    }
    return edits + (a.length - i) + (b.length - j) <= 1;
  }

  /* ---------- Build the list of things to search ---------- */
  var index = null;
  function buildIndex() {
    index = (window.PRODUCTS || []).concat(SEARCH_SERVICES).map(function (p, order) {
      // fields: 0 = name, 1 = description, 2 = hidden keywords
      var fields = [norm(p.name), norm([p.desc, p.label].join(" ")), norm([p.keywords, p.category, (p.tags || []).join(" ")].join(" "))];
      var all = fields.join(" ");
      return { product: p, order: order, fields: fields, all: " " + all + " ", squashed: all.replace(/ /g, ""), words: all.split(" ") };
    });
  }

  // How well one search word matches one field: 3 whole word, 2 start of a word, 1 inside a word, 0 no match
  function fieldMatch(field, word) {
    if (!field) return 0;
    var padded = " " + field + " ";
    return padded.indexOf(" " + word + " ") !== -1 ? 3
      : padded.indexOf(" " + word) !== -1 ? 2
      : word.length >= 3 && field.indexOf(word) !== -1 ? 1
      : 0;
  }
  // Looser matches for longer words: "redwings" (no space), plurals, and one-letter typos.
  // Returns which field matched (0 name, 1 description, 2 keywords) or -1.
  function looseMatch(entry, word) {
    if (word.length < 4) return -1;
    var stem = word.replace(/(es|s)$/, "");
    for (var n = 0; n < entry.fields.length; n++) {
      var field = entry.fields[n];
      if (!field) continue;
      if (field.replace(/ /g, "").indexOf(word) !== -1) return n;
      if (stem !== word && stem.length >= 3 && (" " + field).indexOf(" " + stem) !== -1) return n;
      if (word.length >= 5 && field.split(" ").some(function (w) { return w.length >= 4 && oneEditApart(w, word); })) return n;
    }
    return -1;
  }

  // Every search word has to match somewhere (or the whole search with the spaces removed).
  // Returns the matching products, best first.
  function search(query) {
    if (!index) buildIndex();
    var q = norm(query);
    if (!q) return [];
    var words = q.split(" ").filter(function (w) { return !STOP_WORDS[w]; });
    if (!words.length) words = q.split(" ");
    var squashedQuery = q.replace(/ /g, "");

    return index.map(function (entry) {
      var r = { entry: entry, name: 0, desc: 0, score: 0 };
      var allMatch = words.every(function (word) {
        var m = entry.fields.map(function (f) { return fieldMatch(f, word); });
        if (m[0]) r.name++;
        else if (m[1]) r.desc++;
        r.score += m[0] * 3 + m[1] * 1.5 + m[2];
        if (m[0] || m[1] || m[2]) return true;
        var loose = looseMatch(entry, word);
        if (loose === -1) return false;
        if (loose === 0) r.name++;
        else if (loose === 1) r.desc++;
        r.score += 0.5;
        return true;
      });
      if (!allMatch) {
        if (squashedQuery.length >= 5 && entry.squashed.indexOf(squashedQuery) !== -1) { r.name = r.desc = 0; r.score = 1; return r; }
        return null;
      }
      return r;
    }).filter(Boolean).sort(function (a, b) {
      // names that match first, then descriptions, then keyword-only matches
      return (b.name - a.name) || (b.desc - a.desc) || (b.score - a.score) || (a.entry.order - b.entry.order);
    }).map(function (r) { return r.entry.product; });
  }
  Site.search = search;

  /* ---------- Search box in the header (every page) ---------- */
  var ICON_SEARCH = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" aria-hidden="true"><circle cx="11" cy="11" r="6.5"/><path d="M16 16l4.5 4.5"/></svg>';
  var ICON_CLOSE = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" aria-hidden="true"><path d="M6 6l12 12M18 6L6 18"/></svg>';
  var currentQuery = new URLSearchParams(location.search).get("q") || "";
  var onResultsPage = !!document.querySelector("[data-search-page]");

  // A search form that opens search.html?q=… (used in the header and on the results page)
  function formHTML(id, cls) {
    return '<form class="' + cls + '" role="search" action="search.html" method="get">' +
        '<label class="visually-hidden" for="' + id + '">Search products and custom orders</label>' +
        '<input id="' + id + '" name="q" type="search" placeholder="Search" enterkeyhint="search" autocomplete="off"' +
          (onResultsPage ? ' value="' + Site.escape(currentQuery) + '"' : "") + ">" +
        '<button class="search-submit" type="submit" aria-label="Search">' + ICON_SEARCH + "</button>" +
      "</form>";
  }

  function setupHeader() {
    var header = document.getElementById("site-header");
    var actions = header && header.querySelector(".header-actions");
    if (!actions) return;

    var box = document.createElement("div");
    box.className = "header-search";
    box.id = "site-search";
    box.innerHTML = formHTML("site-search-input", "header-search__form");
    actions.insertBefore(box, actions.firstChild);

    // An empty search does nothing
    box.querySelector("form").addEventListener("submit", function (e) {
      var input = box.querySelector("input");
      if (!input.value.trim()) { e.preventDefault(); input.focus(); }
    });

    // Phones: a search icon that opens the box below the header
    var toggle = document.createElement("button");
    toggle.type = "button";
    toggle.className = "search-toggle";
    toggle.setAttribute("aria-label", "Search");
    toggle.setAttribute("aria-expanded", "false");
    toggle.setAttribute("aria-controls", "site-search");
    toggle.innerHTML = ICON_SEARCH;
    actions.insertBefore(toggle, box.nextSibling);

    function setOpen(open) {
      box.classList.toggle("is-open", open);
      toggle.setAttribute("aria-expanded", String(open));
      toggle.setAttribute("aria-label", open ? "Close search" : "Search");
      toggle.innerHTML = open ? ICON_CLOSE : ICON_SEARCH;
      if (open) {
        var nav = header.querySelector(".nav.is-open");
        if (nav) header.querySelector(".nav-toggle").click(); // close the menu
        box.querySelector("input").focus();
      }
    }
    toggle.addEventListener("click", function () { setOpen(!box.classList.contains("is-open")); });
    var navToggle = header.querySelector(".nav-toggle");
    if (navToggle) navToggle.addEventListener("click", function () { if (box.classList.contains("is-open")) setOpen(false); });
    document.addEventListener("keydown", function (e) { if (e.key === "Escape" && box.classList.contains("is-open")) setOpen(false); });
    // Tap anywhere else to close it (checks the tap's path, since the icon gets swapped when it opens)
    document.addEventListener("click", function (e) {
      var path = e.composedPath ? e.composedPath() : [e.target];
      if (box.classList.contains("is-open") && path.indexOf(box) === -1 && path.indexOf(toggle) === -1) setOpen(false);
    });
  }

  /* ---------- Search Results page (search.html) ---------- */
  function renderResultsPage() {
    var page = document.querySelector("[data-search-page]");
    if (!page) return;
    var q = currentQuery.trim();
    var heading = page.querySelector("[data-search-heading]");
    var formBox = page.querySelector("[data-search-form]");
    var grid = page.querySelector("[data-search-grid]");
    var empty = page.querySelector("[data-search-empty]");

    formBox.innerHTML = formHTML("search-page-input", "search-page__form");
    formBox.querySelector("form").addEventListener("submit", function (e) {
      var input = formBox.querySelector("input");
      if (!input.value.trim()) { e.preventDefault(); input.focus(); }
    });

    var popular = '<p class="search-popular__title">Popular categories</p><div class="filters search-popular">' +
      POPULAR.map(function (c) { return '<a class="chip" href="' + c.href + '">' + Site.escape(c.label) + "</a>"; }).join("") + "</div>";

    if (!q) {
      heading.textContent = "Search our shop";
      document.title = "Search | To Dye For and More";
      empty.innerHTML = popular;
      return;
    }

    var results = search(q);
    heading.textContent = "Results for “" + q + "” (" + results.length + (results.length === 1 ? " item)" : " items)");
    document.title = "Results for “" + q + "” | To Dye For and More";

    if (!results.length) {
      grid.hidden = true;
      empty.innerHTML =
        '<div class="search-empty card">' +
          "<h2>Don't see what you're looking for? We can make it!</h2>" +
          "<p>Tell us your idea and we'll send a mockup with pricing.</p>" +
          '<a class="btn btn--primary" href="custom-orders.html#request-form">Start a Custom Order</a>' +
        "</div>" + popular;
      return;
    }

    // Same tiles and buttons as the Shop page (assets/js/shop.js)
    grid.innerHTML = results.map(Site.productCardHTML).join("");
    empty.innerHTML =
      '<p class="search-more">Don\'t see exactly what you want? <a href="custom-orders.html#request-form">Start a custom order</a> and we\'ll make it.</p>';
  }

  setupHeader();
  renderResultsPage();
})();
