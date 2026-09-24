/* =====================================================================
   CART & SHOP
   ---------------------------------------------------------------------
   This file handles:
     1. The shopping cart (saved in the visitor's browser, so it's still
        there if they leave and come back)
     2. Drawing product cards on the Shop page + Home "Best Sellers"
     3. The Cart / Checkout page (cart.html)

   Product details (names, prices, photos) live in assets/js/products.js.
   Shipping/tax settings live in assets/js/config.js.
   ===================================================================== */

(function () {
  "use strict";

  var Site = window.Site;
  var CONFIG = window.SITE_CONFIG || {};
  var SHOP = CONFIG.shop || {};
  var PRODUCTS = window.PRODUCTS || [];
  var STORAGE_KEY = "tdfm-cart-v1";

  function findProduct(id) {
    for (var i = 0; i < PRODUCTS.length; i++) if (PRODUCTS[i].id === id) return PRODUCTS[i];
    return null;
  }

  /* =================================================================
     1. CART STORAGE
     ================================================================= */
  var memoryCart = []; // backup if the browser blocks saving
  var Cart = (window.Cart = {
    // Read the saved cart: a list like [{ id: "mug-classic", qty: 2 }]
    items: function () {
      try {
        var saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
        // Drop anything that's no longer in products.js
        return Array.isArray(saved) ? saved.filter(function (i) { return findProduct(i.id) && i.qty > 0; }) : [];
      } catch (e) { return memoryCart; }
    },
    save: function (items) {
      memoryCart = items;
      try { localStorage.setItem(STORAGE_KEY, JSON.stringify(items)); } catch (e) { /* private browsing: keep in memory */ }
      document.dispatchEvent(new CustomEvent("cart:updated"));
    },
    add: function (id, qty) {
      var items = Cart.items();
      var line = items.filter(function (i) { return i.id === id; })[0];
      if (line) line.qty = Math.min(line.qty + (qty || 1), 99);
      else items.push({ id: id, qty: qty || 1 });
      Cart.save(items);
    },
    setQty: function (id, qty) {
      var items = Cart.items().map(function (i) { if (i.id === id) i.qty = Math.max(0, Math.min(qty, 99)); return i; })
        .filter(function (i) { return i.qty > 0; });
      Cart.save(items);
    },
    remove: function (id) { Cart.setQty(id, 0); },
    clear: function () { Cart.save([]); },
    count: function () { return Cart.items().reduce(function (n, i) { return n + i.qty; }, 0); },
    subtotal: function () {
      return Cart.items().reduce(function (sum, i) { return sum + findProduct(i.id).price * i.qty; }, 0);
    },
    // Works out shipping, tax and total. fulfillment = "ship" or "pickup"
    totals: function (fulfillment) {
      var subtotal = Cart.subtotal();
      var shipping = 0;
      if (fulfillment !== "pickup" && subtotal > 0) {
        var freeOver = Number(SHOP.freeShippingOver || 0);
        shipping = freeOver && subtotal >= freeOver ? 0 : Number(SHOP.shippingFlatRate || 0);
      }
      var tax = subtotal * Number(SHOP.salesTaxRate || 0);
      return { subtotal: subtotal, shipping: shipping, tax: tax, total: subtotal + shipping + tax };
    }
  });

  // Keep the little number on the header cart icon up to date
  function updateBadge() {
    var count = Cart.count();
    document.querySelectorAll("[data-cart-count]").forEach(function (el) {
      el.textContent = count;
      el.hidden = count === 0;
    });
  }
  document.addEventListener("cart:updated", updateBadge);
  window.addEventListener("storage", updateBadge); // sync across open tabs
  updateBadge();

  /* =================================================================
     2. PRODUCT CARDS (Shop page + Home "Best Sellers")
     ================================================================= */
  function productCardHTML(p) {
    // "Make This Custom" sends shoppers to the Custom Orders form with this product pre-filled
    var customUrl = "custom-orders.html?item=" + encodeURIComponent(p.name) + "#request-form";
    return (
      '<article class="product-card" data-category="' + Site.escape(p.category) + '">' +
        '<div class="product-card__media">' +
          Site.media({ image: p.image, label: p.label, alt: p.name, color: p.color, shape: "square" }) +
          (p.badge ? '<span class="product-card__badge">' + Site.escape(p.badge) + "</span>" : "") +
        "</div>" +
        '<div class="product-card__body">' +
          '<h3 class="product-card__name">' + Site.escape(p.name) + "</h3>" +
          '<p class="product-card__desc">' + Site.escape(p.desc) + "</p>" +
          '<p class="product-card__price">' + Site.money(p.price) + "</p>" +
          '<div class="product-card__actions">' +
            '<button class="btn btn--primary btn--small" type="button" data-add-to-cart="' + Site.escape(p.id) + '">Add to Cart</button>' +
            '<a class="btn btn--outline btn--small" href="' + customUrl + '">✨ Make This Custom</a>' +
          "</div>" +
        "</div>" +
      "</article>"
    );
  }

  // Shop page grid (with category filter chips)
  var shopGrid = document.querySelector("[data-product-grid]");
  if (shopGrid) {
    shopGrid.innerHTML = PRODUCTS.map(productCardHTML).join("");

    var filterBox = document.querySelector("[data-product-filters]");
    if (filterBox) {
      filterBox.innerHTML = (window.SHOP_CATEGORIES || []).map(function (c, i) {
        return '<button class="chip" type="button" data-filter="' + c.id + '" aria-pressed="' + (i === 0) + '">' + Site.escape(c.label) + "</button>";
      }).join("");
      filterBox.addEventListener("click", function (e) {
        var btn = e.target.closest("[data-filter]");
        if (!btn) return;
        var cat = btn.getAttribute("data-filter");
        filterBox.querySelectorAll("[data-filter]").forEach(function (b) { b.setAttribute("aria-pressed", String(b === btn)); });
        shopGrid.querySelectorAll(".product-card").forEach(function (card) {
          card.hidden = cat !== "all" && card.getAttribute("data-category") !== cat;
        });
      });
    }
  }

  // Home page "Best Sellers" (products with featured: true)
  var featuredGrid = document.querySelector("[data-featured-grid]");
  if (featuredGrid) {
    featuredGrid.innerHTML = PRODUCTS.filter(function (p) { return p.featured; }).slice(0, 4).map(productCardHTML).join("");
  }

  // Any "Add to Cart" button on any page
  document.addEventListener("click", function (e) {
    var btn = e.target.closest("[data-add-to-cart]");
    if (!btn) return;
    var product = findProduct(btn.getAttribute("data-add-to-cart"));
    if (!product) return;
    Cart.add(product.id, 1);
    Site.toast("🎉 " + Site.escape(product.name) + ' added! <a href="cart.html">View cart →</a>');
  });

  /* =================================================================
     3. CART & CHECKOUT PAGE (cart.html)
     ================================================================= */
  var cartPage = document.querySelector("[data-cart-page]");
  if (!cartPage) return;

  var views = {
    cart: cartPage.querySelector("#cart-view"),
    checkout: cartPage.querySelector("#checkout-view"),
    done: cartPage.querySelector("#confirm-view")
  };
  var checkoutForm = cartPage.querySelector("#checkout-form");
  var shipFields = cartPage.querySelector("#shipping-fields");
  var pickupNote = cartPage.querySelector("#pickup-note");

  function show(name) {
    Object.keys(views).forEach(function (k) { views[k].hidden = k !== name; });
    window.scrollTo({ top: 0 });
  }

  function fulfillment() {
    var checked = checkoutForm.querySelector('input[name="fulfillment"]:checked');
    return checked ? checked.value : "ship";
  }

  function summaryHTML(mode) {
    var t = Cart.totals(mode);
    var freeOver = Number(SHOP.freeShippingOver || 0);
    var shipLabel = mode === "pickup" ? "Local pickup" : "Shipping";
    var nudge = mode !== "pickup" && freeOver && t.subtotal < freeOver
      ? '<p class="muted" style="font-size:.88rem;margin:6px 0 0">Add ' + Site.money(freeOver - t.subtotal) + " more for free shipping!</p>" : "";
    return (
      '<div class="summary__row"><span>Subtotal</span><span>' + Site.money(t.subtotal) + "</span></div>" +
      '<div class="summary__row"><span>' + shipLabel + "</span><span>" + (t.shipping ? Site.money(t.shipping) : "FREE") + "</span></div>" +
      (t.tax ? '<div class="summary__row"><span>Estimated tax</span><span>' + Site.money(t.tax) + "</span></div>" : "") +
      '<div class="summary__row summary__row--total"><span>Total</span><span>' + Site.money(t.total) + "</span></div>" + nudge
    );
  }

  function renderCart() {
    var items = Cart.items();
    var list = views.cart.querySelector("[data-cart-items]");
    var layout = views.cart.querySelector(".cart-layout");
    var empty = views.cart.querySelector("[data-cart-empty]");

    layout.hidden = items.length === 0;
    empty.hidden = items.length > 0;

    list.innerHTML = items.map(function (line) {
      var p = findProduct(line.id);
      return (
        '<li class="cart-item">' +
          Site.media({ image: p.image, label: p.label, alt: p.name, color: p.color, shape: "square" }) +
          "<div>" +
            '<p class="cart-item__name">' + Site.escape(p.name) + "</p>" +
            '<p class="cart-item__price">' + Site.money(p.price) + " each</p>" +
          "</div>" +
          '<div class="cart-item__right">' +
            '<div class="qty" role="group" aria-label="Quantity for ' + Site.escape(p.name) + '">' +
              '<button type="button" data-qty="-1" data-id="' + p.id + '" aria-label="Decrease quantity">−</button>' +
              '<span aria-live="polite">' + line.qty + "</span>" +
              '<button type="button" data-qty="1" data-id="' + p.id + '" aria-label="Increase quantity">+</button>' +
            "</div>" +
            "<strong>" + Site.money(p.price * line.qty) + "</strong>" +
            '<button class="link-btn" type="button" data-remove="' + p.id + '">Remove</button>' +
          "</div>" +
        "</li>"
      );
    }).join("");

    views.cart.querySelector("[data-cart-summary]").innerHTML = summaryHTML("ship");
    renderCheckoutSummary();
  }

  function renderCheckoutSummary() {
    var box = views.checkout.querySelector("[data-checkout-summary]");
    if (!box) return;
    var lines = Cart.items().map(function (line) {
      var p = findProduct(line.id);
      return '<div class="summary__row"><span>' + Site.escape(p.name) + " × " + line.qty + "</span><span>" + Site.money(p.price * line.qty) + "</span></div>";
    }).join("");
    box.innerHTML = lines + '<hr style="border:none;border-top:1px solid var(--color-border);margin:8px 0">' + summaryHTML(fulfillment());
  }

  // Quantity +/- and Remove buttons
  views.cart.addEventListener("click", function (e) {
    var qtyBtn = e.target.closest("[data-qty]");
    var removeBtn = e.target.closest("[data-remove]");
    if (qtyBtn) {
      var id = qtyBtn.getAttribute("data-id");
      var line = Cart.items().filter(function (i) { return i.id === id; })[0];
      if (line) Cart.setQty(id, line.qty + Number(qtyBtn.getAttribute("data-qty")));
    }
    if (removeBtn) Cart.remove(removeBtn.getAttribute("data-remove"));
  });
  document.addEventListener("cart:updated", renderCart);

  // Buttons that switch between cart → checkout
  cartPage.addEventListener("click", function (e) {
    if (e.target.closest("[data-go-checkout]")) { renderCheckoutSummary(); show("checkout"); }
    if (e.target.closest("[data-go-cart]")) show("cart");
  });

  // Shipping vs. local pickup toggle
  if (!SHOP.allowLocalPickup) {
    var pickupOption = checkoutForm.querySelector("[data-pickup-option]");
    if (pickupOption) pickupOption.remove();
  }
  function syncFulfillment() {
    var isPickup = fulfillment() === "pickup";
    shipFields.hidden = isPickup;
    pickupNote.hidden = !isPickup;
    // Address fields are only required when shipping
    shipFields.querySelectorAll("[data-ship-required]").forEach(function (f) { f.required = !isPickup; });
    renderCheckoutSummary();
  }
  checkoutForm.addEventListener("change", function (e) {
    if (e.target.name === "fulfillment") syncFulfillment();
  });
  syncFulfillment();

  // Demo-mode note
  var demoBanner = cartPage.querySelector("[data-demo-banner]");
  if (demoBanner) demoBanner.hidden = !(CONFIG.payments && CONFIG.payments.demoMode);

  /* ---------- Place order ---------- */
  checkoutForm.addEventListener("submit", function (e) {
    e.preventDefault();
    if (!Site.Forms.validateForm(checkoutForm)) return;
    if (Cart.count() === 0) { show("cart"); return; }

    var order = {
      items: Cart.items().map(function (l) { var p = findProduct(l.id); return { id: p.id, name: p.name, price: p.price, qty: l.qty }; }),
      totals: Cart.totals(fulfillment()),
      customer: Object.fromEntries(new FormData(checkoutForm).entries())
    };

    /* ============================================================
       💳 PAYMENT PROCESSOR HOOK
       ------------------------------------------------------------
       This is where a real payment happens. Right now it's DEMO MODE:
       no card is charged, the order just shows a confirmation.

       When you pick a processor, the easiest options for a small shop:

       • STRIPE CHECKOUT (recommended): Stripe hosts the secure card
         page for you. You'd add a tiny server function (Netlify
         Function / Vercel Function / Stripe's no-code "Payment Links")
         that creates a Checkout Session from `order.items`, then:
             window.location = session.url;

       • SQUARE / PAYPAL: similar — they provide a hosted checkout
         page or a pay button you'd drop in here.

       • SIMPLEST NO-CODE OPTION: create a Stripe "Payment Link" or
         Square "Checkout Link" for each product and use those links
         instead of this cart.

       ⚠️ Never put secret API keys in these website files — they're
       visible to anyone. Secret keys go only in server functions.
       ============================================================ */
    var btn = checkoutForm.querySelector('[type="submit"]');
    btn.disabled = true;
    btn.textContent = "Placing order…";

    setTimeout(function () { // simulates talking to the payment processor
      console.info("[DEMO] Order that would be sent to the payment processor:", order);
      var orderNo = "TDF-" + Date.now().toString().slice(-6);
      views.done.querySelector("[data-order-number]").textContent = orderNo;
      views.done.querySelector("[data-order-email]").textContent = order.customer.email || "";
      Cart.clear();
      checkoutForm.reset();
      btn.disabled = false;
      btn.textContent = "Place Order";
      syncFulfillment();
      show("done");
    }, 900);
  });

  renderCart();
  show("cart");
})();
