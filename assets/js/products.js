/* =====================================================================
   PRODUCTS — your shop items
   ---------------------------------------------------------------------
   Each item between { } is one product card on the Shop page.

   There are two kinds of items:
     • READY TO BUY (buyable: true): shows "Add to Cart" plus a
       "Make This Custom" button
     • CUSTOM ONLY (buyable: false): shows a "Request Custom" button
       that opens the Custom Orders form with the item filled in.
       The price shows as "Starting at $__".

   To ADD a product: copy one whole { ... }, block (including the comma),
   paste it below the last one, and change the details.
   To REMOVE a product: delete its whole { ... }, block.

   Fields:
     id          – unique short code, no spaces (used by the cart)
     name        – product name
     price       – number only, no $ sign (e.g. 24.00). For custom-only
                   items this is the "Starting at" price.
     buyable     – true = can be added to the cart, false = custom only
     category    – must match one of SHOP_CATEGORIES below
     desc        – short description (one sentence is best)
     image       – path to a real photo, e.g. "assets/images/mug.jpg".
                   Leave as "" to show a placeholder box.
     label       – what the placeholder box says (describes the photo to take)
     color       – placeholder box color: blush, blue, lime, navy, orange
     featured    – true = also show on the Home page "Best Sellers" section
     badge       – optional little tag like "Best Seller" or "New" ("" for none)
     customLabel – optional: different text for the custom button
     customItem  – optional: what gets filled into the Custom Orders form
                   (defaults to the product name)
   ===================================================================== */

window.SHOP_CATEGORIES = [
  { id: "all",     label: "All Gifts" },
  { id: "drink",   label: "Mugs" },
  { id: "bags",    label: "Totes, Bags & Tags" },
  { id: "home",    label: "Blankets, Towels & Napkins" },
  { id: "holiday", label: "Holiday" }
];

window.PRODUCTS = [
  /* ---------------- READY TO BUY ---------------- */
  {
    id: "mug-engraved",
    name: "Engraved Mug",
    price: 18.00,
    buyable: true,
    category: "drink",
    desc: "Ceramic mug with a crisp engraved design.",
    image: "",
    label: "engraved coffee mug",
    color: "blush",
    featured: true,
    badge: "Best Seller"
  },
  {
    id: "tote-bookish",
    name: "Bookish Tote",
    price: 30.00,
    buyable: true,
    category: "bags",
    desc: "Our standard embroidered bookish design on a sturdy canvas tote. Want an embroidered name or initial tote instead? Same price!",
    image: "",
    label: "bookish design canvas tote bag",
    color: "lime",
    featured: true,
    badge: "",
    customLabel: "Personalize It",
    customItem: "Name or Initial Tote"
  },

  /* ---------------- CUSTOM ONLY ---------------- */
  {
    id: "blanket-sherpa",
    name: "Personalized Sherpa Blanket",
    price: 55.00,
    buyable: false,
    category: "home",
    desc: "Super-soft throw personalized with a name, photo, or design. The ultimate snuggly gift.",
    image: "",
    label: "personalized sherpa throw blanket",
    color: "blue",
    featured: true,
    badge: "Best Seller"
  },
  {
    id: "towel-beach",
    name: "Custom Beach Towel",
    price: 34.00,
    buyable: false,
    category: "home",
    desc: "Oversized, colorful towel with a name or design for pool days and beach trips.",
    image: "",
    label: "personalized beach towel",
    color: "blush",
    featured: false,
    badge: ""
  },
  {
    id: "towel-hand",
    name: "Custom Hand Towel Set",
    price: 20.00,
    buyable: false,
    category: "home",
    desc: "Set of 2 decorative hand towels designed for your kitchen or bath. A great hostess gift.",
    image: "",
    label: "custom hand towel set",
    color: "navy",
    featured: false,
    badge: ""
  },
  {
    id: "napkins-cocktail",
    name: "Custom Cocktail Napkins",
    price: 24.00,
    buyable: false,
    category: "home",
    desc: "Personalized cocktail napkins for weddings, showers, parties, and hosting.",
    image: "",
    label: "stack of personalized cocktail napkins",
    color: "orange",
    featured: false,
    badge: "New"
  },
  {
    id: "makeup-bag",
    name: "Custom Makeup Bag",
    price: 20.00,
    buyable: false,
    category: "bags",
    desc: "Personalized zip pouch, perfect for bridesmaids, travel, and gifting.",
    image: "",
    label: "personalized makeup bag",
    color: "blush",
    featured: true,
    badge: "New"
  },
  {
    id: "bag-tag",
    name: "Personalized Bag Tag",
    price: 12.00,
    buyable: false,
    category: "bags",
    desc: "Custom tags for sports bags, backpacks, and luggage.",
    image: "",
    label: "personalized bag tag",
    color: "orange",
    featured: false,
    badge: "Team Favorite"
  },
  {
    id: "stocking",
    name: "Personalized Holiday Stocking",
    price: 28.00,
    buyable: false,
    category: "holiday",
    desc: "Plush stocking personalized with a name or design. Hang it with care!",
    image: "",
    label: "personalized holiday stocking",
    color: "navy",
    featured: false,
    badge: "Seasonal"
  }
];
