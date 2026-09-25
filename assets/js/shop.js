/* =====================================================================
   SHOP — product cards on the Shop page and the Home "Best Sellers"
   ---------------------------------------------------------------------
   Ready-to-buy items are paid for through Square payment links:
   each one's "Buy Now" button opens its link (products.js → squareLink),
   where the customer picks a style and size, pays, and comes back to
   thank-you.html. There's no cart or checkout on this site.

   An item without a Square link shows "Coming soon" instead of "Buy Now".
   Made-to-order items show "Request Custom", Team & Bulk items show
   "Request a Quote".

   Product details (names, prices, photos, links) live in assets/js/products.js.
   Sizes, shipping, and turnaround times live in assets/js/config.js.
   ===================================================================== */

(function () {
  "use strict";

  var Site = window.Site;
  var CONFIG = window.SITE_CONFIG || {};
  var SHOP = CONFIG.shop || {};
  var PRODUCTS = window.PRODUCTS || [];

  // price: null in products.js = "Price coming soon"
  function priceSoon(p) { return p.price === null || p.price === undefined; }

  // A real Square payment link (anything else, like "" or a placeholder, counts as no link)
  var SQUARE_LINK = /^https:\/\/(square\.link|checkout\.square\.site|[a-z0-9-]+\.square\.site)\//i;
  var PLACEHOLDER = /placeholder|your-?link|example|xxxx|todo|paste/i;
  function squareLink(p) {
    var url = String(p.squareLink || "").trim();
    return p.buyable && !priceSoon(p) && SQUARE_LINK.test(url) && !PLACEHOLDER.test(url) ? url : "";
  }

  // Two products sharing one link would sell the wrong item, so flag it in the browser console
  (function warnDuplicateLinks() {
    var seen = {};
    PRODUCTS.forEach(function (p) {
      var url = squareLink(p);
      if (!url) return;
      if (seen[url]) console.warn("Two products share the same Square link: " + seen[url] + " and " + p.name + " (" + url + ")");
      else seen[url] = p.name;
    });
  })();

  /* ---------- Sizes & ship times (config.js → shop, turnaround) ---------- */
  var SIZES = SHOP.sizes || [];
  var KIDS_SIZES = SHOP.kidsSizes || [];
  var UPCHARGE = Number(SHOP.extendedSizeUpcharge || 0);
  var EXTENDED = SHOP.extendedSizes || [];
  var TURNAROUND = CONFIG.turnaround || {};
  function shipTime(p) { return TURNAROUND[p.ships || "apparel"] || ""; }
  var SHIPPING_NOTE = "Flat $" + Number(SHOP.shippingFlatRate || 8) + " shipping. Sales tax calculated at checkout.";

  // e.g. "Sizes XS–4X (2X–4X +$3)" or "Kids sizes 12M–Youth XL"
  function sizeText(p) {
    if (p.sizes === "kids") return KIDS_SIZES.length ? "Kids sizes " + KIDS_SIZES[0] + "–" + KIDS_SIZES[KIDS_SIZES.length - 1] : "";
    if (!p.sizes || !SIZES.length) return "";
    return "Sizes " + SIZES[0] + "–" + SIZES[SIZES.length - 1] +
      (EXTENDED.length && UPCHARGE ? " (" + EXTENDED[0] + "–" + EXTENDED[EXTENDED.length - 1] + " +" + Site.money(UPCHARGE) + ")" : "");
  }

  // Which Custom Orders form option a product should pre-select.
  // Apparel defaults to the t-shirts/hoodies option; products can override with formType.
  function formType(p) {
    return p.formType || (p.category === "apparel" ? "tees" : "");
  }

  // One photo, or a swipeable slideshow when the product has morePhotos
  // (the slideshow buttons are added by assets/js/slideshow.js)
  function mediaHTML(p) {
    var first = Site.media({ image: p.image, label: p.label, alt: p.name, color: p.color, shape: "square", thumb: true });
    if (!p.image || !p.morePhotos || !p.morePhotos.length) return first;
    return '<div class="slideshow" data-slideshow aria-label="' + Site.escape(p.name) + ' photos">' + first +
      p.morePhotos.map(function (ph) {
        return Site.media({ image: ph.image, label: ph.label, alt: p.name + ": " + ph.label, color: p.color, shape: "square", thumb: true });
      }).join("") + "</div>";
  }

  // Style prices, e.g. "T-shirt $25 · Crewneck $40 · Hoodie $45"
  function styleList(p) {
    return p.styles && p.styles.length > 1
      ? '<p class="product-card__note">' + p.styles.map(function (st) { return Site.escape(st.name) + " " + Site.money(st.price); }).join(" · ") + "</p>" : "";
  }

  function productCardHTML(p) {
    // The custom button sends shoppers to the Custom Orders form with this product pre-filled
    // (ready-made items add &mode=customize so the form asks what to change about the design)
    var customUrl = "custom-orders.html?item=" + encodeURIComponent(p.customItem || p.name) +
      (p.buyable && !p.customItem ? "&mode=customize" : "") +
      (formType(p) ? "&type=" + encodeURIComponent(formType(p)) : "") + "#request-form";
    var noPriceYet = priceSoon(p) && !p.bulk;
    var link = squareLink(p);
    var ready = p.buyable && !noPriceYet;
    var cheapest = p.styles && p.styles.length > 1
      ? Math.min.apply(null, p.styles.map(function (st) { return st.price; })) : p.price;

    var buyBtn = link
      // BUY NOW: opens this item's Square payment link (same tab, so Square can send them back to thank-you.html)
      ? '<a class="btn btn--primary btn--small" href="' + Site.escape(link) + '" data-buy-now="' + Site.escape(p.id) + '">Buy Now</a>'
      // No Square link yet
      : '<span class="btn btn--primary btn--small btn--soon" aria-disabled="true">Coming soon</span>';
    var actions = p.bulk
      // TEAM & BULK: never a price, always a quote
      // (wedding items open the form with the wedding option picked)
      ? '<a class="btn btn--primary btn--small" href="team-orders.html' + ((p.tags || []).indexOf("wedding") !== -1 ? "?group=wedding" : "") + '#team-form">Request a Quote</a>'
      : p.buyable && noPriceYet
      ? '<a class="btn btn--primary btn--small" href="' + customUrl + '">Ask About This Design</a>'
      : p.buyable && p.designOnly
      // AS SHOWN: the design can't be changed
      ? buyBtn
      : p.buyable
      // READY-MADE: Buy Now + customize the same design
      ? buyBtn + '<a class="btn btn--outline btn--small" href="' + customUrl + '">' + Site.escape(p.customLabel || "Customize This Design") + "</a>"
      // MADE TO ORDER
      : '<a class="btn btn--primary btn--small" href="' + customUrl + '">' + Site.escape(p.customLabel || "Request Custom") + "</a>";

    var price = p.bulk ? ""
      : noPriceYet ? '<span class="product-card__from">Price coming soon</span>'
      : ready && p.styles && p.styles.length > 1 ? '<span class="product-card__from">From</span> ' + Site.money(cheapest)
      : ready ? Site.money(p.price)
      : '<span class="product-card__from">Starting at</span> ' + Site.money(p.price);

    var sizes = ready ? sizeText(p) : "";
    var sizeNote = sizes
      ? '<p class="product-card__hint">' + Site.escape(sizes) + ". " +
        (p.sizes === "kids"
          ? 'Need a different size? <a href="custom-orders.html?item=' + encodeURIComponent(p.name + " (different size)") +
            (formType(p) ? "&type=" + encodeURIComponent(formType(p)) : "") + '#request-form">Submit a custom request</a>.'
          : 'Unisex sizing. <a href="faq.html#sizing">Size help</a>') +
        "</p>" : "";

    return (
      '<article class="product-card" data-product="' + Site.escape(p.id) + '" data-tags="' + Site.escape((p.tags || []).join(" ")) +
        '" data-type="' + (p.buyable ? "ready" : "custom") + '">' +
        '<div class="product-card__media">' +
          mediaHTML(p) +
          (p.badge ? '<span class="product-card__badge">' + Site.escape(p.badge) + "</span>" : "") +
        "</div>" +
        '<div class="product-card__body">' +
          // Label only the made-to-order items (ready-made items have no label)
          (p.bulk ? '<p class="product-card__type product-card__type--custom">Team &amp; Bulk</p>'
            : p.buyable ? "" : '<p class="product-card__type product-card__type--custom">Made to order</p>') +
          '<h3 class="product-card__name">' + Site.escape(p.name) + "</h3>" +
          '<p class="product-card__desc">' + Site.escape(p.desc) + "</p>" +
          (price ? '<p class="product-card__price">' + price + "</p>" : "") +
          (p.priceNote ? '<p class="product-card__note">' + Site.escape(p.priceNote) + "</p>" : "") +
          styleList(p) +
          (p.bulk ? '<p class="product-card__note" style="margin-top:auto">Every group order gets its own quote.</p>'
            : p.buyable && noPriceYet
            ? '<p class="product-card__note">Ask us about pricing and sizes.</p>'
            : p.buyable && p.designOnly
            ? '<p class="product-card__note">This design is available as shown; style options may vary. <a href="custom-orders.html?item=' +
              encodeURIComponent(p.name + " (different style)") + '&type=tees#request-form">Ask about another style</a></p>'
            : p.buyable
            ? '<p class="product-card__note">Want it customized? Same price.</p>'
            : '<p class="product-card__note">Made just for you after you approve a mockup.</p>') +
          // Ready-to-buy: when it ships, plus shipping & tax before they buy
          (ready && shipTime(p) ? '<p class="product-card__note">Made when you order. Ships in about ' + Site.escape(shipTime(p)) + ".</p>" : "") +
          (ready ? '<p class="product-card__note"><strong>' + Site.escape(SHIPPING_NOTE) + "</strong>" +
            (link && (p.sizes || (p.styles && p.styles.length > 1)) ? " You'll choose your " + (p.styles && p.styles.length > 1 ? "style and size" : "size") + " on the next page." : "") +
            "</p>" : "") +
          sizeNote +
          '<div class="product-card__actions">' + actions + "</div>" +
        "</div>" +
      "</article>"
    );
  }

  // Shop page grid (with filter chips)
  var shopGrid = document.querySelector("[data-product-grid]");
  if (shopGrid) {
    shopGrid.innerHTML = PRODUCTS.map(productCardHTML).join("");

    // Two sets of filters: the Shop filters (products.js → SHOP_FILTERS) and
    // how you get it (signature designs / made to order).
    // A link like shop.html?cat=kids opens with that filter already chosen.
    var FILTERS = window.SHOP_FILTERS || [{ id: "all", label: "All" }];
    var ALIASES = { birthday: "gifts" }; // older links
    var wanted = new URLSearchParams(location.search).get("cat");
    wanted = ALIASES[wanted] || wanted;
    var state = { cat: "all", type: "all" };
    var TYPES = [
      { id: "all", label: "Everything" },
      { id: "ready", label: "Signature Designs" },
      { id: "custom", label: "Made to order" }
    ];
    var cats = FILTERS;
    var cards = Array.prototype.slice.call(shopGrid.querySelectorAll(".product-card")); // in products.js order
    function chips(list, group, active) {
      return list.map(function (c) {
        return '<button class="chip" type="button" data-group="' + group + '" data-filter="' + c.id + '" aria-pressed="' + (c.id === active) + '">' + Site.escape(c.label) + "</button>";
      }).join("");
    }
    // Put cards in the chosen filter's order (items in its "order" list first)
    function sortCards() {
      var filter = FILTERS.filter(function (f) { return f.id === state.cat; })[0] || {};
      var order = filter.order || [];
      cards.slice().sort(function (x, y) {
        var a = order.indexOf(x.getAttribute("data-product")), b = order.indexOf(y.getAttribute("data-product"));
        a = a === -1 ? order.length + cards.indexOf(x) : a;
        b = b === -1 ? order.length + cards.indexOf(y) : b;
        return a - b;
      }).forEach(function (card) { shopGrid.appendChild(card); });
    }
    function applyFilters() {
      sortCards();
      cards.forEach(function (card) {
        card.hidden = (state.cat !== "all" && card.getAttribute("data-tags").split(" ").indexOf(state.cat) === -1) ||
                      (state.type !== "all" && card.getAttribute("data-type") !== state.type);
      });
      var kidsNote = document.querySelector("[data-kids-note]");
      if (kidsNote) kidsNote.hidden = state.cat !== "kids";
      var empty = document.querySelector("[data-product-empty]");
      if (empty) empty.hidden = !!shopGrid.querySelector(".product-card:not([hidden])");
    }
    var catBox = document.querySelector("[data-product-filters]");
    var typeBox = document.querySelector("[data-type-filters]");
    if (cats.some(function (c) { return c.id === wanted; })) state.cat = wanted;
    if (catBox) catBox.innerHTML = chips(cats, "cat", state.cat);
    if (typeBox) typeBox.innerHTML = chips(TYPES, "type", "all");
    [catBox, typeBox].forEach(function (box) {
      if (!box) return;
      box.addEventListener("click", function (e) {
        var btn = e.target.closest("[data-filter]");
        if (!btn) return;
        state[btn.getAttribute("data-group")] = btn.getAttribute("data-filter");
        box.querySelectorAll("[data-filter]").forEach(function (b) { b.setAttribute("aria-pressed", String(b === btn)); });
        applyFilters();
      });
    });
    applyFilters();
  }

  // Home page "Best Sellers" (products with featured: 1, 2, 3, 4, shown in that order)
  var featuredGrid = document.querySelector("[data-featured-grid]");
  if (featuredGrid) {
    featuredGrid.innerHTML = PRODUCTS
      .filter(function (p) { return p.featured; })
      .sort(function (a, b) { return (a.featured === true ? 99 : a.featured) - (b.featured === true ? 99 : b.featured); })
      .slice(0, 4).map(productCardHTML).join("");
  }
})();
