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
                   Use null to show "Price coming soon" (the item can't be
                   added to the cart until it has a price).
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
                   "kids" = shows the kids size dropdown instead.
                   The size lists and the extended-size upcharge are in config.js → shop.
     formType    – optional: which Custom Orders form option to pick
                   (e.g. "shoes", "tees", "beaded", "baby-box")
     priceNote   – optional: small line under the price (e.g. "plus the cost of the shoes")
     bulk        – optional: true = a Team & Bulk item. It never shows a price;
                   its button says "Request a Quote" and opens the Team & Bulk
                   Orders form.
     alsoIn      – optional: extra filters an item shows up under, e.g. ["birthday"]
     morePhotos  – optional: extra photos, turning the card photo into a
                   swipeable slideshow, e.g.
                   [{ image: "assets/photos/two.jpg", label: "back of the shirt" }]
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
  { id: "kids",    label: "Kids" },
  { id: "birthday", label: "Birthday Gifts" },   // items join this with alsoIn: ["birthday"]
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
    image: "assets/photos/lions-tee-blue-original.jpg",
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
    id: "vintage-detroit-basketball-tee",
    name: "Vintage Detroit Basketball Tee",
    price: 25.00,
    buyable: true,
    category: "apparel",
    desc: "A throwback Detroit basketball design on a hand-dyed teal tie-dye tee.",
    image: "assets/photos/detroit-lions-tie-dye-vintage-tee.jpg",
    label: "vintage Detroit basketball tie-dye tee",
    color: "blue",
    featured: false,
    badge: "Vintage",
    sizes: true
  },
  {
    id: "detroit-hockey-crew",
    name: "Detroit Hockey Tie-Dye Crewneck",
    price: 40.00,
    buyable: true,
    category: "apparel",
    desc: "A bold red hand-dyed crewneck with a classic Detroit hockey design.",
    image: "assets/photos/red-wings-team-apparel.jpg",
    label: "Detroit hockey tie-dye crewneck",
    color: "orange",
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
    id: "grit-lion",
    name: "Grit",
    price: 25.00,
    buyable: true,
    category: "apparel",
    desc: "A fierce lion head in shades and a “Grit” cap, for Detroit fans with heart.",
    image: "assets/photos/grit-lion-tee.jpg",
    label: "Grit lion head design",
    color: "navy",
    featured: false,
    badge: "New",
    sizes: true,
    styles: [
      { name: "T-shirt",  price: 25.00 },
      { name: "Crewneck", price: 40.00 },
      { name: "Hoodie",   price: 45.00 }
    ]
  },
  {
    id: "detroit-octopus",
    name: "Detroit Octopus",
    price: 25.00,
    buyable: true,
    category: "apparel",
    desc: "A playful purple octopus over stacked “Detroit” lettering, a nod to a classic Detroit hockey tradition.",
    image: "assets/photos/detroit-octopus-tee.jpg",
    label: "Detroit octopus design",
    color: "blush",
    featured: false,
    badge: "New",
    sizes: true,
    styles: [
      { name: "T-shirt",  price: 25.00 },
      { name: "Crewneck", price: 40.00 },
      { name: "Hoodie",   price: 45.00 }
    ]
  },
  {
    id: "vintage-cream-detroit-football",
    name: "Vintage Cream Detroit Football",
    price: 25.00,
    buyable: true,
    category: "apparel",
    desc: "A throwback Detroit football player charging across a cream design.",
    image: "assets/photos/vintage-cream-detroit-football-crew.jpg",
    label: "vintage cream Detroit football design",
    color: "blue",
    featured: false,
    badge: "New",
    sizes: true,
    styles: [
      { name: "T-shirt",  price: 25.00 },
      { name: "Crewneck", price: 40.00 },
      { name: "Hoodie",   price: 45.00 }
    ]
  },
  {
    id: "vintage-detroit-baseball",
    name: "Vintage Detroit Baseball",
    price: 25.00,
    buyable: true,
    category: "apparel",
    desc: "A leaping tiger with classic Detroit baseball lettering, made to feel like a vintage find.",
    image: "assets/photos/vintage-detroit-baseball-tee.jpg",
    label: "vintage Detroit baseball design",
    color: "orange",
    featured: false,
    badge: "New",
    sizes: true,
    styles: [
      { name: "T-shirt",  price: 25.00 },
      { name: "Crewneck", price: 40.00 },
      { name: "Hoodie",   price: 45.00 }
    ]
  },
  {
    id: "sunday-social-tee",
    name: "Sunday Social Tee",
    price: 25.00,
    buyable: true,
    category: "apparel",
    desc: "A clean “Sunday Social Club” design with a lion crest, made for game day brunch and beyond.",
    image: "assets/photos/sunday-social-tee-lions.jpg",
    label: "Sunday Social tee",
    color: "blue",
    featured: false,
    badge: "",
    sizes: true
  },
  {
    id: "tis-the-season-tee",
    name: "’Tis the Season Tee",
    price: 30.00,
    buyable: true,
    category: "apparel",
    desc: "An embroidered football and “’tis the season” script on a warm brown tee, made for football season.",
    image: "assets/photos/tis-the-season-tee-embroidered.jpg",
    label: "brown ’Tis the Season tee",
    color: "orange",
    featured: false,
    badge: "",
    sizes: true
  },
  {
    id: "vintage-detroit-football-tee",
    name: "Vintage Detroit Football Tee",
    price: 25.00,
    buyable: true,
    category: "apparel",
    desc: "Big block “Detroit” lettering over a vintage football badge.",
    image: "assets/photos/vintage-lions-tee.jpg",
    label: "vintage Detroit football tee",
    color: "blue",
    featured: false,
    badge: "",
    sizes: true
  },
  {
    id: "embroidered-team-tee",
    name: "Embroidered Team Tee",
    price: 30.00,
    buyable: true,
    category: "apparel",
    desc: "A team name embroidered in script on a soft tee. Shown in Detroit football, and we can make it for any team!",
    image: "assets/photos/detroit-lions-embroidered-tee.jpg",
    label: "embroidered Detroit football tee",
    color: "navy",
    featured: false,
    badge: "",
    sizes: true,
    customLabel: "Request a Different Team",
    customItem: "Embroidered Team Tee (different team)",
    morePhotos: [
      { image: "assets/photos/lions-embroidered-tee.jpg", label: "the Detroit football version" },
      { image: "assets/photos/custom-embroidered-crewnecks-team-specific.jpg", label: "the same design made for another team, on a crewneck" }
    ]
  },

  {
    id: "group-tees",
    name: "Team & Bulk Orders",
    price: 0,
    buyable: false,
    bulk: true,                          // TEAM & BULK: no price, "Request a Quote"
    category: "apparel",
    desc: "Matching tees and gear for teams, families, reunions, trips, and events. Tell us about your group and we’ll send a custom quote.",
    image: "assets/photos/custom-bulk-t-shirt-event-tee.jpg",
    label: "group in matching custom tees",
    color: "navy",
    featured: 4,
    badge: ""
  },

  /* ================= KIDS ================= */
  {
    id: "superhero-tees",
    name: "Embroidered Superhero Tees",
    price: 30.00,
    buyable: true,
    category: "kids",
    desc: "Kids’ tees with an embroidered superhero design. Want a different hero or colors? Customize it!",
    image: "assets/photos/embroidered-superhero-tee-gray.jpg",
    label: "gray embroidered superhero tee",
    color: "blue",
    featured: false,
    badge: "",
    sizes: "kids",
    styles: [
      { name: "Gray tee",  price: 30.00 },
      { name: "White tee", price: 30.00 }
    ],
    morePhotos: [
      { image: "assets/photos/embroidered-superhero-tee-white.jpg", label: "white embroidered superhero tee" }
    ],
    alsoIn: ["apparel", "birthday"]
  },
  {
    id: "kids-sweater-lion",
    name: "Hand-Stitched Kids Sweater – Lion",
    price: 45.00,
    buyable: true,
    category: "kids",
    desc: "A cozy knit sweater hand-stitched with “Lions” in chunky script, ready for game day.",
    image: "assets/photos/hand-stitched-kids-lions-sweater.jpg",
    label: "hand-stitched kids Lion sweater",
    color: "navy",
    featured: false,
    badge: "",
    sizes: "kids",
    alsoIn: ["birthday"]
  },
  {
    id: "kids-sweater-letter",
    name: "Hand-Stitched Kids Sweater – Letter",
    price: 45.00,
    buyable: true,
    category: "kids",
    desc: "A big hand-stitched initial trimmed with little flowers. Add the letter and colors in the order notes at checkout.",
    image: "assets/photos/custom-hand-stitched-kids-sweater-letter-flower.jpg",
    label: "hand-stitched kids letter sweater",
    color: "blush",
    featured: false,
    badge: "",
    sizes: "kids",
    alsoIn: ["birthday"]
  },
  {
    id: "name-sweater",
    name: "Hand-Stitched Name Sweater",
    price: 45.00,
    buyable: false,                      // MADE TO ORDER
    category: "kids",
    desc: "A cozy knit sweater hand-stitched with your little one’s name, in the colors of your choice.",
    image: "assets/photos/hand-stitched-baby-sweater-custom-name.jpg",
    label: "hand-stitched name sweater",
    color: "blush",
    featured: false,
    badge: "",
    formType: "sweater",
    alsoIn: ["birthday"]
  },
  {
    id: "baby-box",
    name: "Custom Baby Box",
    price: 60.00,
    buyable: false,                      // MADE TO ORDER
    category: "kids",
    desc: "4 personalized onesies, a baby blanket, a hat or bow, socks, and a bib, with the option to add shoes.",
    image: "assets/photos/baby-box-custom-example.jpg",
    label: "personalized baby box",
    color: "blush",
    featured: false,
    badge: "Baby Shower Favorite",
    formType: "baby-box"
  },
  {
    id: "kids-jacket",
    name: "Hand-Painted Jean Jacket",
    price: 55.00,
    buyable: false,                      // MADE TO ORDER
    category: "apparel",
    desc: "A one-of-a-kind denim jacket hand-painted with a name, favorite colors, and the things they love. Made for kids and grown-ups.",
    image: "assets/photos/hand-painted-jean-jacket-teacher.jpg",
    label: "hand-painted Ms. Buscemi teacher jean jacket",
    color: "blue",
    featured: false,
    badge: "",
    formType: "jacket",
    alsoIn: ["birthday", "kids"]
  },

  /* ================= SHOES ================= */
  {
    id: "shoes-custom",
    name: "Custom Hand-Painted Sneakers",
    price: 75.00,
    buyable: false,                      // MADE TO ORDER
    category: "shoes",
    desc: "Fully custom, hand-painted sneakers designed around your idea: team colors, florals, characters, weddings, and more.",
    image: "assets/photos/lions-custom-shoes-2.jpg",
    label: "custom hand-painted Lions sneakers",
    color: "orange",
    featured: 2,
    badge: "Fan Favorite",
    priceNote: "Customization price, plus the cost of the shoes.",
    customLabel: "Design My Shoes",
    formType: "shoes",
    alsoIn: ["birthday"]
  },

  {
    id: "kids-sneakers",
    name: "Custom Kids Sneakers",
    price: null,                         // PRICE COMING SOON
    buyable: false,                      // MADE TO ORDER
    category: "shoes",
    desc: "Little kicks, big personality: hand-painted with their favorite characters, colors, or name.",
    image: "assets/photos/toy-story-custom-kids-shoes-nike-disney.jpg",
    label: "custom hand-painted kids sneakers",
    color: "blue",
    featured: false,
    badge: "",
    priceNote: "Plus the cost of the shoes.",
    customLabel: "Design Their Shoes",
    formType: "shoes",
    morePhotos: [
      { image: "assets/photos/custom-baby-shoes.jpg", label: "rainbow baby sneakers" },
      { image: "assets/photos/custom-kids-vans.jpg", label: "checkered kids slip-ons with a name and number" },
      { image: "assets/photos/kids-custom-shoes-disney-minnie-mouse.jpg", label: "pink polka dot kids sneakers with a name" }
    ],
    alsoIn: ["kids", "birthday"]
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
    desc: "Your name, team, city, or design in hand-sewn beaded embroidery.",
    styles: [
      { name: "T-shirt",  price: 40.00 },
      { name: "Crewneck", price: 50.00 },
      { name: "Hoodie",   price: 55.00 }
    ],
    image: "assets/photos/beaded-embroidery-custom.jpg",
    label: "custom beaded embroidery piece",
    color: "orange",
    featured: false,
    badge: "",
    alsoIn: ["birthday"]
  },

  /* ================= TUMBLERS ================= */
  {
    id: "tumbler-ready",
    name: "Engraved Tumbler",
    price: 25.00,
    buyable: true,                       // READY TO BUY
    category: "drink",
    desc: "Insulated tumbler engraved with one of our signature designs, like this Detroit hockey favorite.",
    image: "assets/photos/engraved-mug-red-wings-or-team.jpg",
    label: "Detroit hockey engraved tumbler",
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
    badge: "",
    alsoIn: ["birthday"]
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
    customItem: "Name or Initial Tote",
    alsoIn: ["birthday"]
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
    badge: "Best Seller",
    alsoIn: ["birthday"]
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
