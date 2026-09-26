/* =====================================================================
   SEARCH — the search bar in the header on every page
   ---------------------------------------------------------------------
   Searches every product in assets/js/products.js (signature designs,
   made-to-order items, and Team & Bulk items) plus the custom and team
   services listed in SEARCH_PAGES below. Each result links to that item
   on the site.

   Matching looks at the name, description, and each item's hidden
   "keywords" (products.js → keywords). Keywords are never shown to
   customers, so add team nicknames, colors, occasions, and common
   misspellings there to help people find things.

   On pages that don't already load products.js, it's loaded the first
   time someone opens the search.
   ===================================================================== */

(function () {
  "use strict";

  var Site = window.Site || {};

  /* ---------- Custom & team services that aren't Shop products ----------
     name: shown in results · href: where the result goes · type: small label
     image: photo (optional) · keywords: search only (never shown) */
  var SEARCH_PAGES = [
    { name: "Custom T-shirts, Hoodies & Crewnecks", type: "Made to order", href: "custom-orders.html#custom-apparel",
      image: "assets/photos/custom-team-apparel.jpg",
      keywords: "custom apparel printed embroidered embroidery t-shirt tshirt tee hoodie hoody crewneck sweatshirt names monogram logo sayings personalized family birthday group" },
    { name: "Embroidered Pet Sweatshirts", type: "Made to order", href: "custom-orders.html#custom-pets",
      image: "assets/photos/custom-embroidered-dog-crewnecks.jpg",
      keywords: "pet dog cat puppy kitten animal photo portrait embroidered embroidery sweatshirt crewneck hoodie dog mom cat mom pet lover gift" },
    { name: "Company Hoodies", type: "Team & Bulk", href: "team-orders.html#company-hoodies",
      image: "assets/photos/custom-team-company-hoodies-2.jpg",
      keywords: "company business corporate logo branded hoodie hoody sweatshirt staff employees work team bulk" },
    { name: "Company T-shirts", type: "Team & Bulk", href: "team-orders.html#company-tees",
      image: "assets/photos/company-team-t-shirt.jpg",
      keywords: "company business corporate logo branded t-shirt tshirt tee staff employees work outing event team bulk" },
    { name: "Team Shoes", type: "Team & Bulk", href: "team-orders.html#team-shoes",
      image: "assets/photos/custom-tigers-shoes-bulk-order.jpg",
      keywords: "team matching shoes sneakers kicks cleats hand-painted hand painted custom painted staff game day player numbers mascot logo coach bulk" },
    { name: "Quarter Zips", type: "Team & Bulk", href: "team-orders.html#quarter-zips",
      image: "assets/photos/custom-team-gear.jpg",
      keywords: "quarter zip 1/4 zip pullover jacket embroidered embroidery coach coaches staff sideline company team bulk" },
    { name: "Team Gifts & Accessories", type: "Team & Bulk", href: "team-orders.html#team-gifts",
      image: "assets/photos/dscf6664.jpg",
      keywords: "team gifts coach gift end of season senior night koozies tumblers bag tags totes favors bulk" },
    { name: "Events & Reunions", type: "Team & Bulk", href: "team-orders.html#events",
      image: "assets/photos/halloween-shirts-disney-inside-out-photo.jpg",
      keywords: "family reunion event fundraiser 5k run walk church group trip vacation halloween costume matching shirts bachelorette birthday party bulk" },
    { name: "Staff Uniforms", type: "Team & Bulk", href: "team-orders.html#staff-uniforms",
      image: "assets/photos/custom-bulk-apparel-company-custom-order.jpg",
      keywords: "staff uniforms work shirts restaurant shop salon service business logo trade show swag employees bulk" },
    { name: "Weddings", type: "Weddings", href: "wedding.html",
      image: "assets/photos/custom-bridal-shoes.jpg",
      keywords: "wedding bride bridal bridesmaid bridal party bachelorette bachelor groom groomsmen shower engagement reception mrs favors" }
  ];

  var STOP_WORDS = { a: 1, an: 1, the: 1, and: 1, or: 1, "for": 1, of: 1, with: 1, to: 1, my: 1, in: 1, on: 1, me: 1, i: 1 };
  var MAX_RESULTS = 12;

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
    var products = (window.PRODUCTS || []).map(function (p) {
      return {
        name: p.name,
        type: p.bulk ? "Team & Bulk" : p.buyable ? "Signature Design" : "Made to order",
        href: "shop.html#item-" + encodeURIComponent(p.id),
        image: p.image,
        fields: [norm(p.name), norm([p.label, p.desc, p.category, (p.tags || []).join(" ")].join(" ")), norm(p.keywords)]
      };
    });
    var pages = SEARCH_PAGES.map(function (s) {
      return { name: s.name, type: s.type, href: s.href, image: s.image, fields: [norm(s.name), "", norm(s.keywords)] };
    });
    index = products.concat(pages).map(function (item) {
      var all = item.fields.join(" ");
      item.all = " " + all + " ";
      item.squashed = all.replace(/ /g, "");            // "red wings" also matches "redwings"
      item.words = all.split(" ");
      return item;
    });
  }

  // Score one item for one search word (0 = no match). Name matches count most.
  var FIELD_WEIGHT = [6, 2, 1];
  function wordScore(item, word) {
    var best = 0;
    item.fields.forEach(function (field, n) {
      if (!field) return;
      var padded = " " + field + " ";
      var s = padded.indexOf(" " + word + " ") !== -1 ? 3      // whole word
            : padded.indexOf(" " + word) !== -1 ? 2            // start of a word
            : word.length >= 3 && field.indexOf(word) !== -1 ? 1 // inside a word
            : 0;
      best = Math.max(best, s * FIELD_WEIGHT[n]);
    });
    if (!best && word.length >= 4 && item.squashed.indexOf(word) !== -1) best = 1;
    if (!best && word.length >= 4) {
      // simple plurals and one-letter typos ("sweaters", "hodie", "tumbler")
      var stem = word.replace(/(es|s)$/, "");
      if (stem !== word && stem.length >= 3 && item.all.indexOf(" " + stem) !== -1) best = 1;
      else if (word.length >= 5 && item.words.some(function (w) { return w.length >= 4 && oneEditApart(w, word); })) best = 0.5;
    }
    return best;
  }

  function search(query) {
    if (!index) buildIndex();
    var q = norm(query);
    if (!q) return [];
    var words = q.split(" ").filter(function (w) { return !STOP_WORDS[w]; });
    if (!words.length) words = q.split(" ");
    var squashedQuery = q.replace(/ /g, "");
    return index.map(function (item) {
      var total = 0;
      for (var i = 0; i < words.length; i++) {
        var s = wordScore(item, words[i]);
        if (!s) {
          // every word has to match, unless the whole search matches with the spaces removed
          if (squashedQuery.length >= 5 && item.squashed.indexOf(squashedQuery) !== -1) return { item: item, score: 2 };
          return null;
        }
        total += s;
      }
      return { item: item, score: total };
    }).filter(Boolean).sort(function (a, b) { return b.score - a.score; })
      .map(function (r) { return r.item; });
  }

  /* ---------- Load products.js on pages that don't have it ---------- */
  var loading = null;
  function ready(fn) {
    if (window.PRODUCTS) { fn(); return; }
    if (!loading) {
      loading = [];
      var script = document.createElement("script");
      script.src = "assets/js/products.js";
      script.onload = script.onerror = function () { index = null; loading.forEach(function (f) { f(); }); };
      document.body.appendChild(script);
    }
    loading.push(fn);
  }

  /* ---------- Search box in the header ---------- */
  var ICON_SEARCH = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" aria-hidden="true"><circle cx="11" cy="11" r="6.5"/><path d="M16 16l4.5 4.5"/></svg>';
  var ICON_CLOSE = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" aria-hidden="true"><path d="M6 6l12 12M18 6L6 18"/></svg>';

  function resultHTML(item, i) {
    var thumb = item.image
      ? '<img src="' + Site.escape(item.image.replace("assets/photos/", "assets/photos/thumbs/")) + '" alt="" loading="lazy">'
      : '<span class="search-result__ph" aria-hidden="true"></span>';
    return '<li><a class="search-result" id="search-opt-' + i + '" role="option" href="' + Site.escape(item.href) + '">' + thumb +
      '<span class="search-result__text"><span class="search-result__name">' + Site.escape(item.name) + "</span>" +
      '<span class="search-result__type">' + Site.escape(item.type) + "</span></span></a></li>";
  }

  var NO_MATCH_HTML =
    '<div class="search-empty">' +
      "<p>Don't see what you're looking for? We can make it!</p>" +
      '<a class="btn btn--primary btn--small" href="custom-orders.html#request-form">Start a Custom Order</a>' +
    "</div>";

  function setup() {
    var header = document.getElementById("site-header");
    var actions = header && header.querySelector(".header-actions");
    if (!actions) return;

    var box = document.createElement("div");
    box.className = "header-search";
    box.id = "site-search";
    box.innerHTML =
      '<form class="header-search__form" role="search" action="#" autocomplete="off">' +
        '<label class="visually-hidden" for="site-search-input">Search products and custom orders</label>' +
        ICON_SEARCH +
        '<input id="site-search-input" type="search" placeholder="Search" enterkeyhint="search" ' +
          'role="combobox" aria-autocomplete="list" aria-expanded="false" aria-controls="site-search-results">' +
      "</form>" +
      '<div class="search-panel" hidden>' +
        '<p class="visually-hidden" aria-live="polite" data-search-status></p>' +
        '<ul class="search-results" id="site-search-results" role="listbox" aria-label="Search results"></ul>' +
        '<div data-search-empty></div>' +
      "</div>";
    actions.insertBefore(box, actions.firstChild);

    // Phones: a search icon that opens the box
    var toggle = document.createElement("button");
    toggle.type = "button";
    toggle.className = "search-toggle";
    toggle.setAttribute("aria-label", "Search");
    toggle.setAttribute("aria-expanded", "false");
    toggle.setAttribute("aria-controls", "site-search");
    toggle.innerHTML = ICON_SEARCH;
    actions.insertBefore(toggle, box.nextSibling);

    var form = box.querySelector("form");
    var input = box.querySelector("input");
    var panel = box.querySelector(".search-panel");
    var list = box.querySelector(".search-results");
    var empty = box.querySelector("[data-search-empty]");
    var status = box.querySelector("[data-search-status]");
    var active = -1;

    function links() { return list.querySelectorAll(".search-result"); }
    function setActive(n) {
      var all = links();
      active = all.length ? (n + all.length) % all.length : -1;
      all.forEach(function (a, i) { a.classList.toggle("is-active", i === active); a.setAttribute("aria-selected", String(i === active)); });
      if (active >= 0) { input.setAttribute("aria-activedescendant", all[active].id); all[active].scrollIntoView({ block: "nearest" }); }
      else input.removeAttribute("aria-activedescendant");
    }
    function showPanel(show) {
      panel.hidden = !show;
      input.setAttribute("aria-expanded", String(show));
    }
    function render() {
      var q = input.value.trim();
      if (!q) { list.innerHTML = ""; empty.innerHTML = ""; status.textContent = ""; showPanel(false); return; }
      ready(function () {
        if (input.value.trim() !== q) return; // they kept typing
        var results = search(q);
        list.innerHTML = results.slice(0, MAX_RESULTS).map(resultHTML).join("");
        empty.innerHTML = results.length ? "" : NO_MATCH_HTML;
        status.textContent = results.length ? results.length + (results.length === 1 ? " result" : " results") : "No matches";
        active = -1;
        input.removeAttribute("aria-activedescendant");
        showPanel(true);
      });
    }

    input.addEventListener("focus", function () { ready(function () {}); if (input.value.trim()) render(); });
    input.addEventListener("input", render);
    input.addEventListener("keydown", function (e) {
      if (e.key === "ArrowDown") { e.preventDefault(); setActive(active + 1); }
      else if (e.key === "ArrowUp") { e.preventDefault(); setActive(active - 1); }
      else if (e.key === "Escape") { if (!panel.hidden) showPanel(false); else close(); }
    });
    // Enter opens the highlighted result (or the first one)
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var all = links();
      var pick = all[active >= 0 ? active : 0];
      if (pick) go(pick.getAttribute("href"));
    });
    list.addEventListener("click", function (e) {
      var a = e.target.closest(".search-result");
      if (!a) return;
      e.preventDefault();
      go(a.getAttribute("href"));
    });

    // Going to a result closes the search. (A result on the same page just scrolls to it.)
    function go(href) {
      showPanel(false);
      close();
      input.blur();
      location.href = href;
    }

    function open() {
      box.classList.add("is-open");
      toggle.setAttribute("aria-expanded", "true");
      toggle.setAttribute("aria-label", "Close search");
      toggle.innerHTML = ICON_CLOSE;
      // close the menu if it's open
      var nav = header.querySelector(".nav.is-open");
      if (nav) header.querySelector(".nav-toggle").click();
      input.focus();
    }
    function close() {
      box.classList.remove("is-open");
      toggle.setAttribute("aria-expanded", "false");
      toggle.setAttribute("aria-label", "Search");
      toggle.innerHTML = ICON_SEARCH;
    }
    toggle.addEventListener("click", function () {
      if (box.classList.contains("is-open")) { close(); showPanel(false); } else open();
    });
    // Opening the menu closes the phone search
    var navToggle = header.querySelector(".nav-toggle");
    if (navToggle) navToggle.addEventListener("click", function () { if (box.classList.contains("is-open")) { close(); showPanel(false); } });

    // Click or tap anywhere else to close the results
    // (checks the click's path, since the icon inside the button gets swapped when it opens)
    document.addEventListener("click", function (e) {
      var path = e.composedPath ? e.composedPath() : [e.target];
      if (path.indexOf(box) === -1 && path.indexOf(toggle) === -1) {
        showPanel(false);
        if (box.classList.contains("is-open")) close();
      }
    });
  }

  Site.search = search; // handy for testing: Site.search("red wings")
  setup();
})();
