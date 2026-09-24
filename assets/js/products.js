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
     image       – path to a real photo, e.g. "assets/images/tumbler.jpg".
                   Leave as "" to show a placeholder box.
     label       – what the placeholder box says (describes the photo to take)
     color       – placeholder box color: blush, blue, lime, navy, orange
     featured    – a number (1, 2, 3, 4) = show on the Home page "Best Sellers"
                   section in that order. false = don't show it there.
     badge       – optional little tag like "Best Seller" or "New" ("" for none)
     customLabel – optional: different text for the custom button
     customItem  – optional: what gets filled into the Custom Orders form
                   (defaults to the product name)
     sizes       – optional: true = shows a size dropdown (XS–4X).
                   The size list and the 2X–4X upcharge are in config.js → shop.
     formType    – optional: which Custom Orders form option to pick
                   ("shoes" or "baby-box")
     priceNote   – optional: small line under the price (e.g. "plus the cost of the shoes")
     styles      – optional: a list of garment styles, each with its own
                   price, e.g. [{ name: "T-shirt", price: 40 }, { name: "Hoodie", price: 55 }].
                   "price" above should match the cheapest style.

   ADDING A READY-MADE SHIRT (like a Lions shirt): copy the
   "Detroit Beaded Embroidery" block, change the id, name, desc, label,
   price and styles, and set category: "apparel". Customers can still
   tap "Customize This Design" to get it for a different team.
   ===================================================================== */

window.SHOP_CATEGORIES = [
  { id: "all",     label: "All" },
  { id: "apparel", label: "Apparel" },
  { id: "shoes",   label: "Shoes" },
  { id: "beaded",  label: "Beaded Embroidery" },
  { id: "drink",   label: "Tumblers" },
  { id: "bags",    label: "Totes, Bags & Tags" },
  { id: "home",    label: "Blankets & Stockings" }
];

window.PRODUCTS = [
  /* ================= APPAREL ================= */
  {
    id: "lions-applique",
    name: "Lions Appliqué Crewneck",
    price: 45.00,
    buyable: true,                       // READY-MADE
    category: "apparel",
    desc: "Our Lions appliqué crewneck. Want the same design for a different team? Customize it!",
    image: "",
    label: "Lions appliqué crewneck",
    color: "blue",
    featured: 1,
    badge: "Best Seller",
    sizes: true
  },
  {
    id: "lions-tee-blue",
    name: "Blue Lions Tee",
    price: 25.00,
    buyable: true,                       // READY-MADE
    category: "apparel",
    desc: "Our blue Lions tee, ready for game day. Want it for a different team? Customize it!",
    image: "",
    label: "blue Lions t-shirt",
    color: "navy",
    featured: 4,
    badge: "Game Day",
    sizes: true
  },

  /* ================= SHOES ================= */
  {
    id: "shoes-custom",
    name: "Custom Hand-Painted Sneakers",
    price: 75.00,
    buyable: false,                      // MADE TO ORDER
    category: "shoes",
    desc: "Fully custom, hand-painted sneakers designed around your idea: team colors, florals, characters, weddings, and more.",
    image: "",
    label: "custom hand-painted sneakers",
    color: "orange",
    featured: 2,
    badge: "Fan Favorite",
    priceNote: "Customization price, plus the cost of the shoes.",
    customLabel: "Design My Shoes",
    formType: "shoes"
  },

  /* ================= BEADED EMBROIDERY ================= */
  {
    id: "beaded-detroit",
    name: "Detroit Beaded Embroidery",
    price: 40.00,
    buyable: true,                       // READY TO BUY
    category: "beaded",
    desc: "Our Detroit design in hand-sewn beaded embroidery. Love it but want a different city, team, or word? Customize it!",
    image: "",
    label: "Detroit beaded embroidery t-shirt",
    color: "navy",
    featured: 3,
    badge: "Detroit Made",
    sizes: true,
    styles: [
      { name: "T-shirt",  price: 40.00 },
      { name: "Crewneck", price: 50.00 },
      { name: "Hoodie",   price: 55.00 }
    ]
  },
  {
    id: "beaded-custom",
    name: "Custom Beaded Embroidery",
    price: 40.00,
    buyable: false,                      // CUSTOM ONLY
    category: "beaded",
    desc: "Your name, team, city, or design in sparkly hand-sewn beaded embroidery.",
    styles: [
      { name: "T-shirt",  price: 40.00 },
      { name: "Crewneck", price: 50.00 },
      { name: "Hoodie",   price: 55.00 }
    ],
    image: "",
    label: "custom beaded embroidery piece",
    color: "orange",
    featured: false,
    badge: ""
  },

  /* ================= TUMBLERS ================= */
  {
    id: "tumbler-ready",
    name: "Tumbler",
    price: 25.00,
    buyable: true,                       // READY TO BUY
    category: "drink",
    desc: "Insulated tumbler with one of our ready-made designs.",
    image: "",
    label: "ready-made design tumbler",
    color: "blue",
    featured: false,
    badge: ""
  },
  {
    id: "tumbler-custom",
    name: "Custom Tumbler",
    price: 25.00,
    buyable: false,                      // CUSTOM ONLY
    category: "drink",
    desc: "Personalized with a name, team, or design of your choice.",
    image: "",
    label: "personalized tumbler",
    color: "lime",
    featured: false,
    badge: ""
  },

  /* ================= TOTES, BAGS & TAGS ================= */
  {
    id: "tote-bookish",
    name: "Bookish Tote",
    price: 30.00,
    buyable: true,                       // READY TO BUY
    category: "bags",
    desc: "Our standard embroidered bookish design on a sturdy canvas tote. Want an embroidered name or initial tote instead? Same price!",
    image: "",
    label: "bookish design canvas tote bag",
    color: "lime",
    featured: false,
    badge: "",
    customLabel: "Personalize It",
    customItem: "Name or Initial Tote"
  },
  {
    id: "makeup-bag",
    name: "Custom Makeup Bag",
    price: 20.00,
    buyable: false,                      // CUSTOM ONLY
    category: "bags",
    desc: "Personalized zip pouch, perfect for bridesmaids, travel, and gifting.",
    image: "",
    label: "personalized makeup bag",
    color: "blush",
    featured: false,
    badge: ""
  },
  {
    id: "bag-tag",
    name: "Personalized Bag Tag",
    price: 12.00,
    buyable: false,                      // CUSTOM ONLY
    category: "bags",
    desc: "Custom tags for sports bags, backpacks, and luggage.",
    image: "",
    label: "personalized bag tag",
    color: "orange",
    featured: false,
    badge: "Team Favorite"
  },

  /* ================= BLANKETS & STOCKINGS ================= */
  {
    id: "blanket",
    name: "Personalized Blanket",
    price: 45.00,
    buyable: false,                      // CUSTOM ONLY
    category: "home",
    desc: "A super-soft throw personalized with a name, photo, or design. The ultimate snuggly gift.",
    image: "",
    label: "personalized blanket",
    color: "blue",
    featured: false,
    badge: "Best Seller"
  },
  {
    id: "stocking",
    name: "Personalized Holiday Stocking",
    price: 25.00,
    buyable: false,                      // CUSTOM ONLY
    category: "home",
    desc: "Plush stocking personalized with a name or design. Hang it with care!",
    image: "",
    label: "personalized holiday stocking",
    color: "navy",
    featured: false,
    badge: "Seasonal"
  }
];
