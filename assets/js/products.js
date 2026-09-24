/* =====================================================================
   PRODUCTS — your ready-made shop items
   ---------------------------------------------------------------------
   Each item between { } is one product card on the Shop page.

   To ADD a product: copy one whole { ... }, block (including the comma),
   paste it below the last one, and change the details.
   To REMOVE a product: delete its whole { ... }, block.

   Fields:
     id        – unique short code, no spaces (used by the cart)
     name      – product name
     price     – number only, no $ sign (e.g. 24.00)
     category  – must match one of CATEGORIES below
     desc      – short description (one sentence is best)
     image     – path to a real photo, e.g. "assets/images/mug.jpg".
                 Leave as "" to show a placeholder box.
     label     – what the placeholder box says (describes the photo to take)
     color     – placeholder box color: pink, teal, yellow, purple, orange
     featured  – true = also show on the Home page "Best Sellers" section
     badge     – optional little tag like "Best Seller" or "New" ("" for none)
   ===================================================================== */

window.SHOP_CATEGORIES = [
  { id: "all",     label: "All Gifts" },
  { id: "drink",   label: "Mugs & Tumblers" },
  { id: "bags",    label: "Totes & Bag Tags" },
  { id: "cozy",    label: "Blankets & Towels" },
  { id: "holiday", label: "Holiday" }
];

window.PRODUCTS = [
  {
    id: "mug-classic",
    name: "Name & Monogram Mug",
    price: 18.00,
    category: "drink",
    desc: "11 oz ceramic mug with a bright, dishwasher-safe design.",
    image: "",
    label: "monogram coffee mug",
    color: "pink",
    featured: true,
    badge: "Best Seller"
  },
  {
    id: "tumbler-20",
    name: "Glitter Tumbler (20 oz)",
    price: 32.00,
    category: "drink",
    desc: "Insulated tumbler with lid & straw. Keeps drinks cold for hours.",
    image: "",
    label: "glitter tumbler with straw",
    color: "purple",
    featured: true,
    badge: ""
  },
  {
    id: "tumbler-team",
    name: "Team Spirit Tumbler",
    price: 30.00,
    category: "drink",
    desc: "Game-day tumbler in your team's colors.",
    image: "",
    label: "team colors tumbler",
    color: "teal",
    featured: false,
    badge: ""
  },
  {
    id: "tote-canvas",
    name: "Canvas Tote Bag",
    price: 22.00,
    category: "bags",
    desc: "Sturdy everyday tote with a fun printed design.",
    image: "",
    label: "canvas tote bag",
    color: "yellow",
    featured: true,
    badge: ""
  },
  {
    id: "bag-tag",
    name: "Personalized Bag Tag",
    price: 12.00,
    category: "bags",
    desc: "Perfect for sports bags, backpacks & luggage.",
    image: "",
    label: "personalized bag tag",
    color: "orange",
    featured: false,
    badge: "Team Favorite"
  },
  {
    id: "blanket-sherpa",
    name: "Cozy Sherpa Blanket",
    price: 55.00,
    category: "cozy",
    desc: "Super-soft 50\" × 60\" throw — the ultimate snuggly gift.",
    image: "",
    label: "sherpa throw blanket",
    color: "teal",
    featured: true,
    badge: "Best Seller"
  },
  {
    id: "towel-beach",
    name: "Beach Towel",
    price: 34.00,
    category: "cozy",
    desc: "Oversized, colorful towel for pool days & beach trips.",
    image: "",
    label: "colorful beach towel",
    color: "pink",
    featured: false,
    badge: ""
  },
  {
    id: "towel-hand",
    name: "Kitchen Hand Towel Set",
    price: 20.00,
    category: "cozy",
    desc: "Set of 2 decorative hand towels — great hostess gift.",
    image: "",
    label: "hand towel set",
    color: "purple",
    featured: false,
    badge: ""
  },
  {
    id: "stocking",
    name: "Holiday Stocking",
    price: 28.00,
    category: "holiday",
    desc: "Plush stocking with a festive design — hang it with care!",
    image: "",
    label: "holiday stocking",
    color: "orange",
    featured: false,
    badge: "Seasonal"
  },
  {
    id: "mug-holiday",
    name: "Holiday Cocoa Mug",
    price: 18.00,
    category: "holiday",
    desc: "Festive mug made for hot cocoa season.",
    image: "",
    label: "holiday cocoa mug",
    color: "yellow",
    featured: false,
    badge: ""
  }
];
