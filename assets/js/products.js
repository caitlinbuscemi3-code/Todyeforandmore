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
     image       – path to a real photo, e.g. "assets/photos/booked-tote-bag.jpg".
                   Leave as "" to show a "Coming soon" placeholder.
     label       – what the placeholder box says (describes the photo to take)
     color       – placeholder box color: blush, blue, lime, navy, orange
     featured    – a number (1, 2, 3, 4) = show on the Home page "Best Sellers"
                   section in that order. false = don't show it there.
     badge       – optional little tag like "Best Seller" or "New" ("" for none)
     customLabel – optional: different text for the custom button
     customItem  – optional: what gets filled into the Custom Orders form
                   (defaults to the product name)
     sizes       – optional: true = shows a size dropdown (XS–4X).
                   The size list and the extended-size upcharge are in config.js → shop.
     formType    – optional: which Custom Orders form option to pick
                   (e.g. "shoes", "tees", "beaded", "baby-box")
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
  /* ================= APPAREL (ready-made) ================= */
  {
    id: "lions-applique",
    name: "Lions Appliqué Crewneck",
    price: 45.00,
    buyable: true,
    category: "apparel",
    desc: "Our Lions appliqué crewneck. Want the same design for a different team? Customize it!",
    image: "assets/photos/lions-applique-crew-custom-team.jpg",
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
    buyable: true,
    category: "apparel",
    desc: "Our blue Lions tee, ready for game day. Want it for a different team? Customize it!",
    image: "assets/photos/lions-tee-blue-2.jpg",
    label: "blue Lions t-shirt",
    color: "navy",
    featured: false,
    badge: "Game Day",
    sizes: true
  },
  {
    id: "lions-graphic-tee",
    name: "Vintage Detroit Graphic Tee",
    price: 25.00,
    buyable: true,
    category: "apparel",
    desc: "Vintage-style Detroit football graphic tee.",
    image: "assets/photos/lions-graphic-tee-vintage.jpg",
    label: "vintage Detroit graphic tee",
    color: "navy",
    featured: false,
    badge: "",
    sizes: true
  },
  {
    id: "detroit-football-tee",
    name: "Detroit Embroidered Football Tee",
    price: 30.00,
    buyable: true,
    category: "apparel",
    desc: "Embroidered Detroit football design on a soft black tee.",
    image: "assets/photos/detroit-embroidered-football-tee.jpg",
    label: "Detroit embroidered football tee",
    color: "blue",
    featured: false,
    badge: "",
    sizes: true
  },
  {
    id: "lions-tie-dye-crew",
    name: "Detroit Tie-Dye Crewneck",
    price: 40.00,
    buyable: true,
    category: "apparel",
    desc: "Hand-dyed blue and white Detroit crewneck. Every one is a little different!",
    image: "assets/photos/detroit-lions-tie-dye-crewnecks.jpg",
    label: "Detroit tie-dye crewneck",
    color: "blue",
    featured: false,
    badge: "Hand-Dyed",
    sizes: true
  },
  {
    id: "happy-camper-crew",
    name: "Happy Camper Embroidered Crewneck",
    price: 45.00,
    buyable: true,
    category: "apparel",
    desc: "Embroidered mountain scene crewneck for your coziest camping days.",
    image: "assets/photos/happy-camper-embroidered-crewnecks.jpg",
    label: "Happy Camper embroidered crewneck",
    color: "lime",
    featured: false,
    badge: "",
    sizes: true
  },
  {
    id: "sunflower-hoodie",
    name: "Sunflower Embroidered Hoodie",
    price: 50.00,
    buyable: true,
    category: "apparel",
    desc: "A tiny embroidered sunflower on a soft pastel hoodie.",
    image: "assets/photos/sunflower-embroidered-hoodie.jpg",
    label: "sunflower embroidered hoodie",
    color: "lime",
    featured: false,
    badge: "",
    sizes: true
  },
  {
    id: "lucky-crew",
    name: "Lucky Crewneck",
    price: 40.00,
    buyable: true,
    category: "apparel",
    desc: "Green “Lucky” printed crewneck with a shamrock, made for St. Patrick’s Day and beyond.",
    image: "assets/photos/lucky-sweatshirt.jpg",
    label: "Lucky crewneck",
    color: "lime",
    featured: false,
    badge: "Seasonal",
    sizes: true
  },
  {
    id: "book-tee",
    name: "Book Lover Tee",
    price: 25.00,
    buyable: true,
    category: "apparel",
    desc: "Flowers blooming from an open book, for every reader you know.",
    image: "assets/photos/book-t-shirt.jpg",
    label: "book lover t-shirt",
    color: "blush",
    featured: false,
    badge: "",
    sizes: true
  },

  {
    id: "group-tees",
    name: "Custom Family & Group Tees",
    price: 25.00,
    buyable: false,                      // MADE TO ORDER
    category: "apparel",
    desc: "Matching tees for family reunions, birthdays, trips, and teams, with your names, dates, or design.",
    image: "assets/photos/custom-bulk-t-shirt-event-tee.jpg",
    label: "group in matching custom tees",
    color: "navy",
    featured: 4,
    badge: "Group Favorite",
    formType: "tees"
  },

  /* ================= SHOES ================= */
  {
    id: "shoes-custom",
    name: "Custom Hand-Painted Sneakers",
    price: 75.00,
    buyable: false,                      // MADE TO ORDER
    category: "shoes",
    desc: "Fully custom, hand-painted sneakers designed around your idea: team colors, florals, characters, weddings, and more.",
    image: "assets/photos/custom-chicago-nikes.jpg",
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
    desc: "Our Detroit design in hand-sewn beaded embroidery. Love it but want a different city, team, or image? Customize it!",
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
    image: "assets/photos/beaded-embroidery-custom.jpg",
    label: "custom beaded embroidery piece",
    color: "orange",
    featured: false,
    badge: ""
  },

  /* ================= TUMBLERS ================= */
  {
    id: "tumbler-ready",
    name: "Engraved Tumbler",
    price: 25.00,
    buyable: true,                       // READY TO BUY
    category: "drink",
    desc: "Insulated tumbler engraved with one of our signature designs, like this Red Wings favorite.",
    image: "assets/photos/engraved-mug-red-wings-or-team.jpg",
    label: "Red Wings engraved tumbler",
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
    image: "assets/photos/custom-team-engraved-bulk-tumblers.jpg",
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
    image: "assets/photos/booked-tote-bag.jpg",
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
    image: "assets/photos/embroidered-blanket-name.jpg",
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
