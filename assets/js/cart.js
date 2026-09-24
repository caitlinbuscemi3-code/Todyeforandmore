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

  // Only "buyable" products can go in the cart (custom-only items can't)
  function findBuyable(id) {
    var p = findProduct(id);
    return p && p.buyable ? p : null;
  }

  function findProduct(id) {
    for (var i = 0; i < PRODUCTS.length; i++) if (PRODUCTS[i].id === id) return PRODUCTS[i];
    return null;
  }

  /* ---------- Sizes & styles ----------
     Size list and the extended-size upcharge live in config.js → shop.
     Styles (e.g. T-shirt / Crewneck / Hoodie) are set per product in products.js. */
  var SIZES = SHOP.sizes || [];
  var EXTENDED = SHOP.extendedSizes || [];
  var UPCHARGE = Number(SHOP.extendedSizeUpcharge || 0);

  function isExtended(size) { return EXTENDED.indexOf(size) !== -1; }

  function styleFor(p, styleName) {
    var styles = p.styles || [];
    for (var i = 0; i < styles.length; i++) if (styles[i].name === styleName) return styles[i];
    return styles[0] || null;
  }

  // Price of one item with the chosen style and size
  function unitPrice(p, styleName, size) {
    var style = styleFor(p, styleName);
    return (style ? style.price : p.price) + (size && isExtended(size) ? UPCHARGE : 0);
  }

  // "Crewneck · Size 2X" (or "" when the product has no options)
  function optionText(line) {
    var bits = [];
    if (line.style) bits.push(line.style);
    if (line.size) bits.push("Size " + line.size);
    return bits.join(" · ");
  }

  // Each different style/size combo is its own cart line
  function lineKey(line) { return [line.id, line.style || "", line.size || ""].join("|"); }

  // A saved line is still valid only if its product, style and size still exist
  function validLine(line) {
    var p = findBuyable(line.id);
    if (!p || !(line.qty > 0)) return false;
    if (p.styles && p.styles.length && !styleFor(p, line.style)) return false;
    if (p.sizes && SIZES.indexOf(line.size) === -1) return false;
    return true;
  }

  /* =================================================================
     1. CART STORAGE
     ================================================================= */
  var memoryCart = []; // backup if the browser blocks saving
  var Cart = (window.Cart = {
    // Read the saved cart: a list like [{ id: "beaded-detroit", style: "Hoodie", size: "M", qty: 1 }]
    items: function () {
      try {
        var saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
        // Drop anything that's no longer in products.js
        return Array.isArray(saved) ? saved.filter(validLine) : [];
      } catch (e) { return memoryCart; }
    },
    save: function (items) {
      memoryCart = items;
      try { localStorage.setItem(STORAGE_KEY, JSON.stringify(items)); } catch (e) { /* private browsing: keep in memory */ }
      document.dispatchEvent(new CustomEvent("cart:updated"));
    },
    add: function (newLine) {
      var items = Cart.items();
      var key = lineKey(newLine);
      var line = items.filter(function (i) { return lineKey(i) === key; })[0];
      if (line) line.qty = Math.min(line.qty + (newLine.qty || 1), 99);
      else items.push({ id: newLine.id, style: newLine.style || "", size: newLine.size || "", qty: newLine.qty || 1 });
      Cart.save(items);
    },
    setQty: function (key, qty) {
      var items = Cart.items().map(function (i) { if (lineKey(i) === key) i.qty = Math.max(0, Math.min(qty, 99)); return i; })
        .filter(function (i) { return i.qty > 0; });
      Cart.save(items);
    },
    remove: function (key) { Cart.setQty(key, 0); },
    clear: function () { Cart.save([]); },
    count: function () { return Cart.items().reduce(function (n, i) { return n + i.qty; }, 0); },
    linePrice: function (line) { return unitPrice(findProduct(line.id), line.style, line.size); },
    subtotal: function () {
      return Cart.items().reduce(function (sum, i) { return sum + Cart.linePrice(i) * i.qty; }, 0);
    },
    // Works out shipping, tax and total
    totals: function () {
      var subtotal = Cart.subtotal();
      var shipping = 0;
      if (subtotal > 0) {
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
  var cardCount = 0; // gives each card's dropdowns a unique id

  // Style & size dropdowns for ready-to-buy apparel
  function optionsHTML(p) {
    if (!p.buyable) return "";
    var n = ++cardCount, html = "";
    if (p.styles && p.styles.length) {
      html += '<div class="field"><label for="opt-style-' + n + '">Style</label>' +
        '<select id="opt-style-' + n + '" data-opt="style">' + p.styles.map(function (st) {
          return '<option value="' + Site.escape(st.name) + '">' + Site.escape(st.name) + " (" + Site.money(st.price) + ")</option>";
        }).join("") + "</select></div>";
    }
    if (p.sizes) {
      html += '<div class="field"><label for="opt-size-' + n + '">Size</label>' +
        '<select id="opt-size-' + n + '" data-opt="size"><option value="">Choose a size</option>' + SIZES.map(function (sz) {
          return '<option value="' + sz + '">' + sz + (isExtended(sz) && UPCHARGE ? " (+" + Site.money(UPCHARGE) + ")" : "") + "</option>";
        }).join("") + "</select>" +
        '<p class="field-error" aria-live="polite"></p></div>';
      if (EXTENDED.length) html += '<p class="product-card__hint">' + Site.escape(SHOP.extendedSizeNote || "") + "</p>";
    }
    return html ? '<div class="product-card__options">' + html + "</div>" : "";
  }

  function productCardHTML(p) {
    // The custom button sends shoppers to the Custom Orders form with this product pre-filled
    // (ready-made items add &mode=customize so the form asks what to change about the design)
    var customUrl = "custom-orders.html?item=" + encodeURIComponent(p.customItem || p.name) +
      (p.buyable && !p.customItem ? "&mode=customize" : "") +
      (p.formType ? "&type=" + encodeURIComponent(p.formType) : "") + "#request-form";
    var actions = p.buyable
      // READY-MADE: Add to Cart + customize the same design
      ? '<button class="btn btn--primary btn--small" type="button" data-add-to-cart="' + Site.escape(p.id) + '">Add to Cart</button>' +
        '<a class="btn btn--outline btn--small" href="' + customUrl + '">' + Site.escape(p.customLabel || "Customize This Design") + "</a>"
      // MADE TO ORDER: request button instead of Add to Cart
      : '<a class="btn btn--primary btn--small" href="' + customUrl + '">' + Site.escape(p.customLabel || "Request Custom") + "</a>";
    var price = p.buyable
      ? '<span data-price>' + Site.money(unitPrice(p)) + "</span>"
      : '<span class="product-card__from">Starting at</span> ' + Site.money(p.price);
    // e.g. "T-shirt $40 · Crewneck $50 · Hoodie $55" on made-to-order items with styles
    var styleList = !p.buyable && p.styles && p.styles.length
      ? '<p class="product-card__note">' + p.styles.map(function (st) { return Site.escape(st.name) + " " + Site.money(st.price); }).join(" · ") + "</p>" : "";
    return (
      '<article class="product-card" data-product="' + Site.escape(p.id) + '" data-category="' + Site.escape(p.category) +
        '" data-type="' + (p.buyable ? "ready" : "custom") + '">' +
        '<div class="product-card__media">' +
          Site.media({ image: p.image, label: p.label, alt: p.name, color: p.color, shape: "square" }) +
          (p.badge ? '<span class="product-card__badge">' + Site.escape(p.badge) + "</span>" : "") +
        "</div>" +
        '<div class="product-card__body">' +
          // Label only the made-to-order items (ready-made items have no label)
          (p.buyable ? "" : '<p class="product-card__type product-card__type--custom">Made to order</p>') +
          '<h3 class="product-card__name">' + Site.escape(p.name) + "</h3>" +
          '<p class="product-card__desc">' + Site.escape(p.desc) + "</p>" +
          '<p class="product-card__price">' + price + "</p>" +
          (p.priceNote ? '<p class="product-card__note">' + Site.escape(p.priceNote) + "</p>" : "") +
          styleList +
          (p.buyable
            ? '<p class="product-card__note">Want it customized? Same price.</p>'
            : '<p class="product-card__note">Made just for you after you approve a mockup.</p>') +
          optionsHTML(p) +
          '<div class="product-card__actions">' + actions + "</div>" +
        "</div>" +
      "</article>"
    );
  }

  // Read the chosen style/size on a card
  function cardChoice(card) {
    var style = card.querySelector('[data-opt="style"]');
    var size = card.querySelector('[data-opt="size"]');
    return { style: style ? style.value : "", size: size ? size.value : "", sizeEl: size };
  }

  // Update the shown price when style or size changes
  document.addEventListener("change", function (e) {
    var sel = e.target.closest("[data-opt]");
    if (!sel) return;
    var card = sel.closest("[data-product]");
    var p = findProduct(card.getAttribute("data-product"));
    var c = cardChoice(card);
    card.querySelector("[data-price]").textContent = Site.money(unitPrice(p, c.style, c.size));
    if (c.sizeEl && c.size) {
      c.sizeEl.removeAttribute("aria-invalid");
      c.sizeEl.parentNode.querySelector(".field-error").textContent = "";
    }
  });

  // Shop page grid (with filter chips)
  var shopGrid = document.querySelector("[data-product-grid]");
  if (shopGrid) {
    shopGrid.innerHTML = PRODUCTS.map(productCardHTML).join("");

    // Two sets of filters: what it is (category) and how you get it (ready-made / made to order)
    var state = { cat: "all", type: "all" };
    var TYPES = [
      { id: "all", label: "Everything" },
      { id: "ready", label: "Ready-made" },
      { id: "custom", label: "Made to order" }
    ];
    // Only show categories that actually have products
    var cats = (window.SHOP_CATEGORIES || []).filter(function (c) {
      return c.id === "all" || PRODUCTS.some(function (p) { return p.category === c.id; });
    });
    function chips(list, group, active) {
      return list.map(function (c) {
        return '<button class="chip" type="button" data-group="' + group + '" data-filter="' + c.id + '" aria-pressed="' + (c.id === active) + '">' + Site.escape(c.label) + "</button>";
      }).join("");
    }
    function applyFilters() {
      shopGrid.querySelectorAll(".product-card").forEach(function (card) {
        card.hidden = (state.cat !== "all" && card.getAttribute("data-category") !== state.cat) ||
                      (state.type !== "all" && card.getAttribute("data-type") !== state.type);
      });
      var empty = document.querySelector("[data-product-empty]");
      if (empty) empty.hidden = !!shopGrid.querySelector(".product-card:not([hidden])");
    }
    var catBox = document.querySelector("[data-product-filters]");
    var typeBox = document.querySelector("[data-type-filters]");
    if (catBox) catBox.innerHTML = chips(cats, "cat", "all");
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
  }

  // Home page "Best Sellers" (products with featured: 1, 2, 3, 4, shown in that order)
  var featuredGrid = document.querySelector("[data-featured-grid]");
  if (featuredGrid) {
    featuredGrid.innerHTML = PRODUCTS
      .filter(function (p) { return p.featured; })
      .sort(function (a, b) { return (a.featured === true ? 99 : a.featured) - (b.featured === true ? 99 : b.featured); })
      .slice(0, 4).map(productCardHTML).join("");
  }

  // Any "Add to Cart" button on any page
  document.addEventListener("click", function (e) {
    var btn = e.target.closest("[data-add-to-cart]");
    if (!btn) return;
    var product = findBuyable(btn.getAttribute("data-add-to-cart"));
    if (!product) return;
    var card = btn.closest("[data-product]");
    var c = card ? cardChoice(card) : { style: "", size: "" };
    // Apparel needs a size before it can go in the cart
    if (product.sizes && !c.size) {
      if (c.sizeEl) {
        c.sizeEl.setAttribute("aria-invalid", "true");
        c.sizeEl.parentNode.querySelector(".field-error").textContent = "Please choose a size.";
        c.sizeEl.focus();
      }
      return;
    }
    if (product.styles && product.styles.length && !c.style) c.style = product.styles[0].name;
    var line = { id: product.id, style: c.style, size: c.size, qty: 1 };
    Cart.add(line);
    var extra = optionText(line);
    Site.toast(Site.escape(product.name) + (extra ? " (" + Site.escape(extra) + ")" : "") + ' added to your cart. <a href="cart.html">View cart</a>');
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

  function show(name) {
    Object.keys(views).forEach(function (k) { views[k].hidden = k !== name; });
    window.scrollTo({ top: 0 });
  }

  function summaryHTML() {
    var t = Cart.totals();
    var freeOver = Number(SHOP.freeShippingOver || 0);
    var nudge = freeOver && t.subtotal < freeOver
      ? '<p class="muted" style="font-size:.88rem;margin:6px 0 0">Add ' + Site.money(freeOver - t.subtotal) + " more for free shipping!</p>" : "";
    return (
      '<div class="summary__row"><span>Subtotal</span><span>' + Site.money(t.subtotal) + "</span></div>" +
      '<div class="summary__row"><span>Shipping</span><span>' + (t.shipping ? Site.money(t.shipping) : "FREE") + "</span></div>" +
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
      var key = Site.escape(lineKey(line));
      var each = Cart.linePrice(line);
      var extra = optionText(line);
      return (
        '<li class="cart-item">' +
          Site.media({ image: p.image, label: p.label, alt: p.name, color: p.color, shape: "square" }) +
          "<div>" +
            '<p class="cart-item__name">' + Site.escape(p.name) + "</p>" +
            (extra ? '<p class="cart-item__opts">' + Site.escape(extra) + "</p>" : "") +
            '<p class="cart-item__price">' + Site.money(each) + " each</p>" +
          "</div>" +
          '<div class="cart-item__right">' +
            '<div class="qty" role="group" aria-label="Quantity for ' + Site.escape(p.name) + '">' +
              '<button type="button" data-qty="-1" data-key="' + key + '" aria-label="Decrease quantity">−</button>' +
              '<span aria-live="polite">' + line.qty + "</span>" +
              '<button type="button" data-qty="1" data-key="' + key + '" aria-label="Increase quantity">+</button>' +
            "</div>" +
            "<strong>" + Site.money(each * line.qty) + "</strong>" +
            '<button class="link-btn" type="button" data-remove="' + key + '">Remove</button>' +
          "</div>" +
        "</li>"
      );
    }).join("");

    views.cart.querySelector("[data-cart-summary]").innerHTML = summaryHTML();
    renderCheckoutSummary();
  }

  function renderCheckoutSummary() {
    var box = views.checkout.querySelector("[data-checkout-summary]");
    if (!box) return;
    var lines = Cart.items().map(function (line) {
      var p = findProduct(line.id);
      var extra = optionText(line);
      return '<div class="summary__row"><span>' + Site.escape(p.name) + (extra ? " (" + Site.escape(extra) + ")" : "") + " × " + line.qty +
        "</span><span>" + Site.money(Cart.linePrice(line) * line.qty) + "</span></div>";
    }).join("");
    box.innerHTML = lines + '<hr style="border:none;border-top:1px solid var(--color-border);margin:8px 0">' + summaryHTML();
  }

  // Quantity +/- and Remove buttons
  views.cart.addEventListener("click", function (e) {
    var qtyBtn = e.target.closest("[data-qty]");
    var removeBtn = e.target.closest("[data-remove]");
    if (qtyBtn) {
      var key = qtyBtn.getAttribute("data-key");
      var line = Cart.items().filter(function (i) { return lineKey(i) === key; })[0];
      if (line) Cart.setQty(key, line.qty + Number(qtyBtn.getAttribute("data-qty")));
    }
    if (removeBtn) Cart.remove(removeBtn.getAttribute("data-remove"));
  });
  document.addEventListener("cart:updated", renderCart);

  // Buttons that switch between cart and checkout
  cartPage.addEventListener("click", function (e) {
    if (e.target.closest("[data-go-checkout]")) { renderCheckoutSummary(); show("checkout"); }
    if (e.target.closest("[data-go-cart]")) show("cart");
  });

  // Demo-mode note
  var demoBanner = cartPage.querySelector("[data-demo-banner]");
  if (demoBanner) demoBanner.hidden = !(CONFIG.payments && CONFIG.payments.demoMode);

  /* ---------- Place order ---------- */
  checkoutForm.addEventListener("submit", function (e) {
    e.preventDefault();
    if (!Site.Forms.validateForm(checkoutForm)) return;
    if (Cart.count() === 0) { show("cart"); return; }

    var order = {
      items: Cart.items().map(function (l) {
        var p = findProduct(l.id);
        return { id: p.id, name: p.name, style: l.style, size: l.size, price: Cart.linePrice(l), qty: l.qty };
      }),
      totals: Cart.totals(),
      customer: Object.fromEntries(new FormData(checkoutForm).entries())
    };

    /* ============================================================
       PAYMENT PROCESSOR HOOK
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

       IMPORTANT: Never put secret API keys in these website files — they're
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
      show("done");
    }, 900);
  });

  renderCart();
  show("cart");
})();
