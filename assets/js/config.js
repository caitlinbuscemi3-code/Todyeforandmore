/* =====================================================================
   SITE CONFIG — "To Dye For and More"
   ---------------------------------------------------------------------
   START HERE. This is the one file for your business details.
   Change a value between the quotes, save, and refresh the browser.
   Every page reads from this file (header, footer, contact info,
   social links, forms, cart settings).

   COLORS & FONTS live at the very top of: assets/css/styles.css
      (look for the "BRAND SETTINGS" block).
   ===================================================================== */

window.SITE_CONFIG = {

  /* ---------- Business basics ---------- */
  businessName: "To Dye For and More",
  tagline: "Made uniquely yours.",   // shown under the name in the header & footer
  foundedYear: 2020,                 // copyright line reads "© 2020–(this year)"

  /* ---------- Logo ----------
     Put your logo file in assets/images/ and change "src" to its name.
     Example: "assets/images/my-logo.png"
     Until then, a labeled placeholder logo is shown. */
  logo: {
    src: "assets/images/logo-placeholder.svg", // <-- LOGO FILE GOES HERE
    alt: "To Dye For and More logo",
    showNameNextToLogo: true // set to false if your logo already includes the name
  },

  /* ---------- Contact info (shown in footer + Contact page) ---------- */
  contact: {
    email: "todyeformi@gmail.com",
    phone: "",                            // add a phone number here to show it on the site (leave "" to hide)
    location: "Metro Detroit, MI"
  },

  /* ---------- Social links ----------
     Paste your full profile URLs. Leave a link empty ("") to hide that icon. */
  social: {
    instagram: "https://www.instagram.com/_shoptodyefor",
    facebook:  "https://www.facebook.com/SH0Ptodyefor",
    tiktok:    "https://www.tiktok.com/@_shoptodyefor",
    pinterest: ""   // no Pinterest yet: paste a link here to show the icon
  },

  /* ---------- Form delivery (BACKEND HOOK) ----------
     Right now the forms validate and show a "thank you" message, but the
     info isn't sent anywhere yet.

     To receive submissions by email, create a free form on a service like
     Formspree (formspree.io), Basin, or Getform, then paste the URL it
     gives you below (looks like "https://formspree.io/f/abcd1234").
     That's it — the forms will start sending to your inbox.
     Tip: pick a service that supports FILE UPLOADS for the order forms. */
  forms: {
    customOrder: "", // Custom Orders page form
    teamOrder:   "", // Team / Bulk Orders page form
    contact:     ""  // Contact page form
  },

  /* ---------- Custom order policy text ---------- */
  depositPercent: 50, // shown on the Custom & Team order pages and the FAQ

  /* ---------- Turnaround times (shown on the Shop, order pages & FAQ) ---------- */
  turnaround: {
    apparel:  "1–2 weeks",   // apparel items
    handmade: "2–4 weeks"    // shoes, embroidery & hand-painted items
  },

  /* ---------- Shop / cart settings ---------- */
  shop: {
    currencySymbol: "$",
    shippingFlatRate: 8.00,      // shipping cost per order
    freeShippingOver: 75.00,     // free shipping at/above this subtotal (set 0 to turn off)
    salesTaxRate: 0.00,          // e.g. 0.07 for 7%. Most payment processors can calculate this for you.

    // Apparel sizes shown in the size dropdown (for products with sizes: true)
    sizes: ["XS", "S", "M", "L", "XL", "2X", "3X", "4X"],
    extendedSizes: ["2X", "3X", "4X"],   // these sizes cost a little more…
    extendedSizeUpcharge: 3.00,          // …this much more
    extendedSizeNote: "Sizes 2X–4X add $3 and may take a little longer."
  },

  /* ---------- Payments (BACKEND HOOK) ----------
     You haven't picked a payment processor yet, so checkout runs in
     DEMO MODE (no card is charged). See assets/js/cart.js → search for
     "PAYMENT PROCESSOR HOOK" for exactly where Stripe / Square / PayPal
     plugs in. */
  payments: {
    demoMode: true
  }
};
