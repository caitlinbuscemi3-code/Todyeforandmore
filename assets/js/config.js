/* =====================================================================
   SITE CONFIG — "To Dye For and More"
   ---------------------------------------------------------------------
   START HERE. This is the one file for your business details.
   Change a value between the quotes, save, and refresh the browser.
   Every page reads from this file (header, footer, contact info,
   social links, forms, shop settings).

   COLORS & FONTS live at the very top of: assets/css/styles.css
      (look for the "BRAND SETTINGS" block).
   ===================================================================== */

window.SITE_CONFIG = {

  /* ---------- Business basics ---------- */
  businessName: "To Dye For and More",
  tagline: "Made uniquely yours.",   // shown under the name in the header & footer
  foundedYear: 2020,                 // copyright line reads "© 2020–(this year)"

  /* ---------- Web address ----------
     Once you have your own domain, put the full address here, e.g.
     "https://www.todyeforandmore.com" (no slash at the end).
     Google uses it as each page's main address. Also update the same
     address in sitemap.xml and robots.txt (both in the main folder). */
  siteUrl: "",

  /* ---------- Logo ----------
     Logo files live in assets/photos/. These are transparent PNGs made
     from your "TDF Primary" logos (white background removed).
     The small "tdf" logo is the browser tab icon (set in each page's <head>). */
  logo: {
    src:       "assets/photos/tdf-primary-navy.png",       // header (light background)
    footerSrc: "assets/photos/tdf-primary-chartreuse.png", // footer (navy background)
    alt: "To Dye For and More logo",
    width: 150, height: 48,
    showNameNextToLogo: false // the logo already includes the name
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
    pinterest: "",  // no Pinterest yet: paste a link here to show the icon

    // "Message us on Instagram" buttons open a direct message with this account
    // (leave "" to hide the buttons)
    instagramMessage: "https://ig.me/m/_shoptodyefor"
  },

  /* ---------- Form delivery (BACKEND HOOK) ----------
     Each form sends to its Formspree form (formspree.io), which emails
     the submission to you. A form left as "" isn't sent anywhere yet
     (it still shows the thank-you message). See SETUP.md for steps.
     Our Formspree plan doesn't accept file uploads, so the order forms
     don't have upload boxes; we email customers to collect photos. */
  forms: {
    customOrder: "https://formspree.io/f/xljdwokl", // Custom Orders page form
    teamOrder:   "https://formspree.io/f/xeaolpwp", // Team & Bulk Orders page form (also used for weddings)
    contact:     "https://formspree.io/f/xppwjoen", // Contact page form
    review:      "https://formspree.io/f/xjykepng", // Leave a Review page form
    newsletter:  "https://formspree.io/f/mdeklpqe"  // footer "Get new designs first" email sign-up
                     // (if this is ever set to "", signing up opens an email to you instead)
  },

  /* ---------- Announcement bar (top of every page) ----------
     A thin banner above the menu, e.g. a holiday order deadline.
     It shows from showFrom through showUntil (YYYY-MM-DD, leave showFrom ""
     to start right away). To turn it off, set text: "". */
  announcement: {
    text: "Holiday orders: place your order by December 5 for Christmas delivery.",
    linkText: "Details",
    link: "faq.html#holiday",
    showFrom: "",
    showUntil: "2026-12-05"
  },

  /* ---------- Custom order policy text ---------- */
  depositPercent: 50, // shown on the Custom & Team order pages and the FAQ

  /* ---------- Turnaround times (shown on the Shop, order pages & FAQ) ---------- */
  turnaround: {
    apparel:  "1–2 weeks",   // apparel items
    handmade: "2–4 weeks"    // shoes, embroidery & hand-painted items
  },

  /* ---------- Shop settings ----------
     Payments happen on Square: each ready-to-buy item's "Buy Now" button
     opens its Square payment link (set in assets/js/products.js → squareLink).
     Square charges the shipping and calculates sales tax; these settings
     only control what the site SAYS, so keep them matching Square. */
  shop: {
    currencySymbol: "$",
    shippingFlatRate: 8.00,      // shown as "Flat $8 shipping" (set the same amount in Square)

    // Apparel sizes shown on product cards (for products with sizes: true)
    sizes: ["XS", "S", "M", "L", "XL", "2X", "3X", "4X"],
    extendedSizes: ["2X", "3X", "4X"],   // these sizes cost a little more…
    extendedSizeUpcharge: 3.00,          // …this much more (shown as "2X–4X +$3.00")

    // Kids sizes (for products with sizes: "kids"). Change this list to the sizes you offer.
    kidsSizes: ["12M", "18M", "24M", "2T", "3T", "4T", "5T", "Youth XS", "Youth S", "Youth M", "Youth L", "Youth XL"]
  }
};
