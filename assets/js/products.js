/* =====================================================================
   PRODUCTS — your shop items
   ---------------------------------------------------------------------
   Each item between { } is one product card on the Shop page.
   Cards show in the same order as this list (grouped by the headings
   below), so keep similar items together.

   There are three kinds of items:
     • READY TO BUY (buyable: true): shows "Add to Cart" plus a
       "Customize This Design" button
         - add designOnly: true for designs that only come as shown
           (no customize button; shows "This design is available as shown")
     • CUSTOM ONLY (buyable: false): shows a "Request Custom" button
       that opens the Custom Orders form with the item filled in.
       The price shows as "Starting at $__".
     • TEAM & BULK (bulk: true): no price, "Request a Quote" button

   To ADD a product: copy one whole { ... }, block (including the comma),
   paste it where it belongs in the list, and change the details.
   To REMOVE a product: delete its whole { ... }, block.

   Fields:
     id          – unique short code, no spaces (used by the cart)
     name        – product name
     price       – number only, no $ sign (e.g. 24.00). For custom-only
                   items this is the "Starting at" price.
                   Use null to show "Price coming soon" (the item can't be
                   added to the cart until it has a price).
     buyable     – true = can be added to the cart, false = custom only
     designOnly  – optional: true = sold only as shown, no customizing
     ships       – ready-to-buy items: how long until it ships, "apparel" or
                   "handmade" (the times are in config.js → turnaround)
     bulk        – optional: true = a Team & Bulk item. It never shows a price;
                   its button says "Request a Quote" and opens the Team & Bulk
                   Orders form.
     category    – what kind of item it is (apparel, shoes, kids, beaded,
                   drink, bags, home, wedding). Apparel opens the t-shirts &
                   hoodies option on the Custom Orders form.
     tags        – which Shop filters it shows under: "gifts", "kids",
                   "sports", "wedding", "holiday" (any number, or [] for none;
                   everything shows under "All")
     desc        – short description (one sentence is best)
     image       – path to a real photo, e.g. "assets/photos/booked-tote-bag.jpg".
                   Leave as "" to show a "Coming soon" placeholder.
     label       – what the placeholder box says (describes the photo to take)
     color       – placeholder box color: blush, blue, lime, navy, orange
     featured    – a number (1, 2, 3, 4) = show on the Home page "Best Sellers"
                   section in that order. false = don't show it there.
     badge       – optional little tag like "Best Seller" or "New" ("" for none)
     sizes       – optional: true = shows a size dropdown (XS–4X).
                   "kids" = shows the kids size dropdown instead.
                   The size lists and the extended-size upcharge are in config.js → shop.
     styles      – optional: a list of garment styles, each with its own
                   price, e.g. [{ name: "T-shirt", price: 40 }, { name: "Hoodie", price: 55 }].
                   "price" above should match the cheapest style.
     customLabel – optional: different text for the custom button
     customItem  – optional: what gets filled into the Custom Orders form
                   (defaults to the product name)
     formType    – optional: which Custom Orders form option to pick
                   (e.g. "shoes", "tees", "beaded", "baby-box")
     priceNote   – optional: small line under the price (e.g. "plus the cost of the shoes")
     morePhotos  – optional: extra photos, turning the card photo into a
                   swipeable slideshow, e.g.
                   [{ image: "assets/photos/two.jpg", label: "back of the shirt" }]
   ===================================================================== */

/* ---------- Shop filter buttons ----------
   "order" (optional) = which items show first under that filter, in that
   order. Anything not listed follows, in the order of the product list. */
window.SHOP_FILTERS = [
  { id: "all",     label: "All" },
  { id: "gifts",   label: "Gifts",
    order: ["tote-custom", "tote-bookish",                       // totes first
            "shoes-custom", "kids-sneakers", "bridal-shoes",       // then shoes
            "kids-sweater-lions", "kids-sweater-letter", "name-sweater", // kids sweaters
            "beaded-detroit", "beaded-custom",                     // beaded embroidery
            "kids-jacket", "adult-jacket", "baby-box", "makeup-bag", "bag-tag", "book-tee", "stocking",
            "tumbler-ready", "tumbler-custom", "blanket"] },        // tumblers & blankets last
  { id: "kids",    label: "Kids" },      // shows the "Any design can also be made in kids' sizes" note
  { id: "sports",  label: "Sports" },
  { id: "wedding", label: "Wedding",
    order: ["bridal-shoes", "bridal-party", "wedding-favors", "makeup-bag"] },
  { id: "holiday", label: "Holiday" }
];

window.PRODUCTS = [
  /* ================= LIONS ================= */
  {
    id: "lions-applique",
    name: "Lions Appliqué Crewneck",
    price: 45.00,
    buyable: true,                         // READY TO BUY
    ships: "handmade",                    // ship time: config.js → turnaround.handmade
    category: "apparel",
    tags: ["sports"],
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
    buyable: true,                         // READY TO BUY
    ships: "apparel",                     // ship time: config.js → turnaround.apparel
    designOnly: true,                      // AS SHOWN: no customize button
    category: "apparel",
    tags: ["sports"],
    desc: "Our blue Lions tee, ready for game day.",
    image: "assets/photos/lions-tee-blue-original.jpg",
    label: "blue Lions t-shirt",
    color: "navy",
    featured: false,
    badge: "Game Day",
    sizes: true
  },
  {
    id: "lions-graphic-tee",
    name: "Vintage Detroit Lions Graphic Tee",
    price: 25.00,
    buyable: true,                         // READY TO BUY
    ships: "apparel",                     // ship time: config.js → turnaround.apparel
    designOnly: true,                      // AS SHOWN: no customize button
    category: "apparel",
    tags: ["sports"],
    desc: "A vintage-style Detroit Lions football graphic on a black tee.",
    image: "assets/photos/lions-graphic-tee-vintage.jpg",
    label: "vintage Detroit Lions graphic tee",
    color: "navy",
    featured: false,
    badge: "",
    sizes: true
  },
  {
    id: "vintage-detroit-football-tee",
    name: "Vintage Detroit Football Tee",
    price: 25.00,
    buyable: true,                         // READY TO BUY
    ships: "apparel",                     // ship time: config.js → turnaround.apparel
    designOnly: true,                      // AS SHOWN: no customize button
    category: "apparel",
    tags: ["sports"],
    desc: "Big block “Detroit” lettering over a vintage football badge.",
    image: "assets/photos/vintage-lions-tee.jpg",
    label: "vintage Detroit football tee",
    color: "blue",
    featured: false,
    badge: "",
    sizes: true
  },
  {
    id: "grit-lion",
    name: "Lions Grit",
    price: 25.00,
    buyable: true,                         // READY TO BUY
    ships: "apparel",                     // ship time: config.js → turnaround.apparel
    designOnly: true,                      // AS SHOWN: no customize button
    category: "apparel",
    tags: ["sports"],
    desc: "A fierce lion head in shades and a “Grit” cap, for Detroit fans with heart.",
    image: "assets/photos/grit-lion-tee.jpg",
    label: "Lions Grit lion head design",
    color: "navy",
    featured: false,
    badge: "New",
    sizes: true,
    styles: [
      { name: "T-shirt", price: 25.00 },
      { name: "Crewneck", price: 40.00 },
      { name: "Hoodie", price: 45.00 }
    ]
  },
  {
    id: "vintage-cream-detroit-football",
    name: "Vintage Cream Detroit Football",
    price: 25.00,
    buyable: true,                         // READY TO BUY
    ships: "apparel",                     // ship time: config.js → turnaround.apparel
    designOnly: true,                      // AS SHOWN: no customize button
    category: "apparel",
    tags: ["sports"],
    desc: "A throwback Detroit football player charging across a cream design.",
    image: "assets/photos/vintage-cream-detroit-football-crew.jpg",
    label: "vintage cream Detroit football design",
    color: "blue",
    featured: false,
    badge: "New",
    sizes: true,
    styles: [
      { name: "T-shirt", price: 25.00 },
      { name: "Crewneck", price: 40.00 },
      { name: "Hoodie", price: 45.00 }
    ]
  },
  {
    id: "detroit-football-tee",
    name: "Detroit Embroidered Football Tee",
    price: 30.00,
    buyable: true,                         // READY TO BUY
    ships: "handmade",                    // ship time: config.js → turnaround.handmade
    category: "apparel",
    tags: ["sports"],
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
    buyable: true,                         // READY TO BUY
    ships: "apparel",                     // ship time: config.js → turnaround.apparel
    category: "apparel",
    tags: ["sports"],
    desc: "Hand-dyed blue and white Detroit crewneck. Every one is a little different!",
    image: "assets/photos/detroit-lions-tie-dye-crewnecks.jpg",
    label: "Detroit tie-dye crewneck",
    color: "blue",
    featured: false,
    badge: "Hand-Dyed",
    sizes: true
  },
  {
    id: "embroidered-team-tee",
    name: "Embroidered Team Tee",
    price: 30.00,
    buyable: true,                         // READY TO BUY
    ships: "handmade",                    // ship time: config.js → turnaround.handmade
    category: "apparel",
    tags: ["sports"],
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
    id: "sunday-social-tee",
    name: "Sunday Social Tee",
    price: 25.00,
    buyable: true,                         // READY TO BUY
    ships: "apparel",                     // ship time: config.js → turnaround.apparel
    category: "apparel",
    tags: ["sports"],
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
    buyable: true,                         // READY TO BUY
    ships: "handmade",                    // ship time: config.js → turnaround.handmade
    designOnly: true,                      // AS SHOWN: no customize button
    category: "apparel",
    tags: ["sports"],
    desc: "An embroidered football and “’tis the season” script on a warm brown tee, made for football season.",
    image: "assets/photos/tis-the-season-tee-embroidered.jpg",
    label: "brown ’Tis the Season tee",
    color: "orange",
    featured: false,
    badge: "",
    sizes: true
  },
  {
    id: "kids-sweater-lions",
    name: "Hand-Stitched Kids Sweater – Lions",
    price: 45.00,
    buyable: true,                         // READY TO BUY
    ships: "handmade",                    // ship time: config.js → turnaround.handmade
    category: "kids",
    tags: ["kids", "gifts", "sports"],
    desc: "A cozy knit sweater hand-stitched with “Lions” in chunky script, ready for game day.",
    image: "assets/photos/hand-stitched-kids-lions-sweater.jpg",
    label: "hand-stitched kids Lions sweater",
    color: "navy",
    featured: false,
    badge: "",
    sizes: "kids"
  },

  /* ================= DETROIT HOCKEY ================= */
  {
    id: "detroit-octopus",
    name: "Detroit Octopus",
    price: 25.00,
    buyable: true,                         // READY TO BUY
    ships: "apparel",                     // ship time: config.js → turnaround.apparel
    designOnly: true,                      // AS SHOWN: no customize button
    category: "apparel",
    tags: ["sports"],
    desc: "A playful purple octopus over stacked “Detroit” lettering, a nod to a classic Detroit hockey tradition.",
    image: "assets/photos/detroit-octopus-tee.jpg",
    label: "Detroit octopus design",
    color: "blush",
    featured: false,
    badge: "New",
    sizes: true,
    styles: [
      { name: "T-shirt", price: 25.00 },
      { name: "Crewneck", price: 40.00 },
      { name: "Hoodie", price: 45.00 }
    ]
  },
  {
    id: "detroit-hockey-crew",
    name: "Detroit Hockey Tie-Dye Crewneck",
    price: 40.00,
    buyable: true,                         // READY TO BUY
    ships: "apparel",                     // ship time: config.js → turnaround.apparel
    category: "apparel",
    tags: ["sports"],
    desc: "A bold red hand-dyed crewneck with a classic Detroit hockey design.",
    image: "assets/photos/red-wings-team-apparel.jpg",
    label: "Detroit hockey tie-dye crewneck",
    color: "orange",
    featured: false,
    badge: "Hand-Dyed",
    sizes: true
  },

  /* ================= DETROIT BASKETBALL ================= */
  {
    id: "vintage-detroit-basketball-tee",
    name: "Vintage Detroit Basketball Tee",
    price: 25.00,
    buyable: true,                         // READY TO BUY
    ships: "apparel",                     // ship time: config.js → turnaround.apparel
    designOnly: true,                      // AS SHOWN: no customize button
    category: "apparel",
    tags: ["sports"],
    desc: "A throwback Detroit basketball design on a hand-dyed teal tie-dye tee.",
    image: "assets/photos/detroit-lions-tie-dye-vintage-tee.jpg",
    label: "vintage Detroit basketball tie-dye tee",
    color: "blue",
    featured: false,
    badge: "Vintage",
    sizes: true
  },

  /* ================= DETROIT BASEBALL ================= */
  {
    id: "vintage-detroit-baseball",
    name: "Vintage Detroit Baseball",
    price: 25.00,
    buyable: true,                         // READY TO BUY
    ships: "apparel",                     // ship time: config.js → turnaround.apparel
    designOnly: true,                      // AS SHOWN: no customize button
    category: "apparel",
    tags: ["sports"],
    desc: "A leaping tiger with classic Detroit baseball lettering, made to feel like a vintage find.",
    image: "assets/photos/vintage-detroit-baseball-tee.jpg",
    label: "vintage Detroit baseball design",
    color: "orange",
    featured: false,
    badge: "",
    sizes: true,
    styles: [
      { name: "T-shirt", price: 25.00 },
      { name: "Crewneck", price: 40.00 },
      { name: "Hoodie", price: 45.00 }
    ]
  },

  /* ================= EVERYDAY & SEASONAL APPAREL ================= */
  {
    id: "happy-camper-crew",
    name: "Happy Camper Embroidered Crewneck",
    price: 45.00,
    buyable: true,                         // READY TO BUY
    ships: "handmade",                    // ship time: config.js → turnaround.handmade
    category: "apparel",
    tags: [],
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
    buyable: true,                         // READY TO BUY
    ships: "handmade",                    // ship time: config.js → turnaround.handmade
    category: "apparel",
    tags: [],
    desc: "A tiny embroidered sunflower on a soft pastel hoodie.",
    image: "assets/photos/sunflower-embroidered-hoodie.jpg",
    label: "sunflower embroidered hoodie",
    color: "lime",
    featured: false,
    badge: "",
    sizes: true
  },
  {
    id: "book-tee",
    name: "Book Lover Tee",
    price: 25.00,
    buyable: true,                         // READY TO BUY
    ships: "apparel",                     // ship time: config.js → turnaround.apparel
    category: "apparel",
    tags: ["gifts"],
    desc: "Flowers blooming from an open book, for every reader you know.",
    image: "assets/photos/book-t-shirt.jpg",
    label: "book lover t-shirt",
    color: "blush",
    featured: false,
    badge: "",
    sizes: true
  },
  {
    id: "lucky-crew",
    name: "Lucky Crewneck",
    price: 40.00,
    buyable: true,                         // READY TO BUY
    ships: "apparel",                     // ship time: config.js → turnaround.apparel
    category: "apparel",
    tags: ["holiday"],
    desc: "Green “Lucky” printed crewneck with a shamrock, made for St. Patrick’s Day and beyond.",
    image: "assets/photos/lucky-sweatshirt.jpg",
    label: "Lucky crewneck",
    color: "lime",
    featured: false,
    badge: "Seasonal",
    sizes: true
  },

  /* ================= BEADED EMBROIDERY ================= */
  {
    id: "beaded-detroit",
    name: "Detroit Beaded Embroidery",
    price: 40.00,
    buyable: true,                         // READY TO BUY
    ships: "handmade",                    // ship time: config.js → turnaround.handmade
    category: "beaded",
    tags: ["gifts"],
    desc: "Our Detroit design in hand-sewn beaded embroidery. Love it but want a different city, team, or image? Customize it!",
    image: "",
    label: "Detroit beaded embroidery t-shirt",
    color: "navy",
    featured: 3,
    badge: "Detroit Made",
    sizes: true,
    styles: [
      { name: "T-shirt", price: 40.00 },
      { name: "Crewneck", price: 50.00 },
      { name: "Hoodie", price: 55.00 }
    ]
  },
  {
    id: "beaded-custom",
    name: "Custom Beaded Embroidery",
    price: 40.00,
    buyable: false,                        // MADE TO ORDER
    category: "beaded",
    tags: ["gifts"],
    desc: "Your name, team, city, or design in hand-sewn beaded embroidery.",
    image: "assets/photos/beaded-embroidery-custom.jpg",
    label: "custom beaded embroidery piece",
    color: "orange",
    featured: false,
    badge: "",
    styles: [
      { name: "T-shirt", price: 40.00 },
      { name: "Crewneck", price: 50.00 },
      { name: "Hoodie", price: 55.00 }
    ]
  },

  /* ================= KIDS SWEATERS ================= */
  {
    id: "kids-sweater-letter",
    name: "Hand-Stitched Kids Sweater – Letter",
    price: 45.00,
    buyable: true,                         // READY TO BUY
    ships: "handmade",                    // ship time: config.js → turnaround.handmade
    category: "kids",
    tags: ["kids", "gifts"],
    desc: "A big hand-stitched initial trimmed with little flowers. Add the letter and colors in the order notes at checkout.",
    image: "assets/photos/custom-hand-stitched-kids-sweater-letter-flower.jpg",
    label: "hand-stitched kids letter sweater",
    color: "blush",
    featured: false,
    badge: "",
    sizes: "kids"
  },
  {
    id: "name-sweater",
    name: "Hand-Stitched Name Sweater",
    price: 45.00,
    buyable: false,                        // MADE TO ORDER
    category: "kids",
    tags: ["kids", "gifts"],
    desc: "A cozy knit sweater hand-stitched with your little one’s name, in the colors of your choice.",
    image: "assets/photos/hand-stitched-baby-sweater-custom-name.jpg",
    label: "hand-stitched name sweater",
    color: "blush",
    featured: false,
    badge: "",
    formType: "sweater"
  },

  /* ================= SHOES ================= */
  {
    id: "shoes-custom",
    name: "Custom Hand-Painted Sneakers",
    price: 75.00,
    buyable: false,                        // MADE TO ORDER
    category: "shoes",
    tags: ["gifts", "sports"],
    desc: "Fully custom, hand-painted sneakers designed around your idea: team colors, company logos, weddings, characters, and more.",
    image: "assets/photos/lions-custom-shoes-2.jpg",
    label: "custom hand-painted Lions sneakers",
    color: "orange",
    featured: 2,
    badge: "Fan Favorite",
    customLabel: "Design My Shoes",
    formType: "shoes",
    priceNote: "Customization price, plus the cost of the shoes.",
    morePhotos: [
      { image: "assets/photos/company-shoes-custom-logo.jpg", label: "orange and blue company logo sneakers" },
      { image: "assets/photos/custom-phoenix-suns-nikes.jpg", label: "sneakers in Phoenix basketball colors" },
      { image: "assets/photos/custom-nikes-company-logo.jpg", label: "green and gold company logo sneakers" },
      { image: "assets/photos/custom-vegas-shoes.jpg", label: "black and gold sneakers" },
      { image: "assets/photos/custom-red-wings-high-top-shoes.jpg", label: "Detroit hockey high-tops" },
      { image: "assets/photos/custom-bridal-shoes.jpg", label: "white bridal sneakers with lace details" },
      { image: "assets/photos/custom-chicago-shoes-nike.jpg", label: "red and white sneakers with splatter detail" },
      { image: "assets/photos/custom-ferris-state-shoes.jpg", label: "red and gold college sneakers" },
      { image: "assets/photos/custom-cleats-2.jpg", label: "custom football cleats" },
      { image: "assets/photos/tigers-featured-shoe.jpg", label: "Detroit skyline and 313 details" }
    ]
  },
  {
    id: "kids-sneakers",
    name: "Custom Kids Sneakers",
    price: 50.00,
    buyable: false,                        // MADE TO ORDER
    category: "shoes",
    tags: ["kids", "gifts"],
    desc: "Little kicks, big personality: hand-painted with their favorite characters, colors, or name.",
    image: "assets/photos/toy-story-custom-kids-shoes-nike-disney.jpg",
    label: "custom hand-painted kids sneakers",
    color: "blue",
    featured: false,
    badge: "",
    customLabel: "Design Their Shoes",
    formType: "shoes",
    priceNote: "Plus the cost of the shoes.",
    morePhotos: [
      { image: "assets/photos/custom-baby-shoes.jpg", label: "rainbow baby sneakers" },
      { image: "assets/photos/custom-kids-vans.jpg", label: "checkered kids slip-ons with a name and number" },
      { image: "assets/photos/kids-custom-shoes-disney-minnie-mouse.jpg", label: "pink polka dot kids sneakers with a name" }
    ]
  },
  {
    id: "bridal-shoes",
    name: "Hand-Painted Bridal Shoes",
    price: 75.00,
    buyable: false,                        // MADE TO ORDER
    category: "shoes",
    tags: ["wedding", "gifts"],
    desc: "Sneakers or slip-ons for the bride, painted with lace, pearls, her new name, or your wedding date.",
    image: "assets/photos/custom-bridal-shoes.jpg",
    label: "hand-painted bridal sneakers",
    color: "blush",
    featured: false,
    badge: "",
    customLabel: "Design Her Shoes",
    formType: "shoes",
    priceNote: "Customization price, plus the cost of the shoes.",
    morePhotos: [
      { image: "assets/photos/custom-bridal-shoes-toms-2.jpg", label: "pearl bridal slip-ons with her new name" },
      { image: "assets/photos/custom-bridal-shoes-toms.jpg", label: "hand-painted bridal slip-ons" }
    ]
  },

  /* ================= JEAN JACKETS ================= */
  {
    id: "kids-jacket",
    name: "Kids Hand-Painted Jean Jacket",
    price: 50.00,
    buyable: false,                        // MADE TO ORDER
    category: "kids",
    tags: ["kids", "gifts"],
    desc: "A one-of-a-kind denim jacket hand-painted with their name, favorite colors, and the things they love.",
    image: "assets/photos/jean-jacket-kids-hand-painted.jpg",
    label: "hand-painted ENZO kids jean jacket",
    color: "blue",
    featured: false,
    badge: "",
    formType: "jacket",
    morePhotos: [
      { image: "assets/photos/custom-jean-jacket-kids-hand-painted.jpg", label: "the ENZO jacket out for a walk" }
    ]
  },
  {
    id: "adult-jacket",
    name: "Hand-Painted Jean Jacket",
    price: 60.00,
    buyable: false,                        // MADE TO ORDER
    category: "apparel",
    tags: ["gifts"],
    desc: "A one-of-a-kind denim jacket hand-painted with a name, a message, or the things you love, like this teacher favorite.",
    image: "assets/photos/hand-painted-jean-jacket-teacher.jpg",
    label: "hand-painted Ms. Buscemi teacher jean jacket",
    color: "blue",
    featured: false,
    badge: "",
    formType: "jacket"
  },

  /* ================= BABY ================= */
  {
    id: "baby-box",
    name: "Custom Baby Box",
    price: 60.00,
    buyable: false,                        // MADE TO ORDER
    category: "kids",
    tags: ["kids", "gifts"],
    desc: "4 personalized onesies, a baby blanket, a hat or bow, socks, and a bib, with the option to add shoes.",
    image: "assets/photos/baby-box-custom-example.jpg",
    label: "personalized baby box",
    color: "blush",
    featured: false,
    badge: "Baby Shower Favorite",
    formType: "baby-box"
  },

  /* ================= TOTES, BAGS & TAGS ================= */
  {
    id: "tote-custom",
    name: "Personalized Tote Bag",
    price: 30.00,
    buyable: false,                        // MADE TO ORDER
    category: "bags",
    tags: ["gifts"],
    desc: "A sturdy canvas tote embroidered with a name, initials, or a design of your choice.",
    image: "assets/photos/custom-embroidered-name-tote-bag.jpg",
    label: "embroidered name tote bag",
    color: "lime",
    featured: false,
    badge: "",
    morePhotos: [
      { image: "assets/photos/initial-tote-bag-custom-embroidery.jpg", label: "initial tote bag" },
      { image: "assets/photos/custom-tote-bag-name.jpg", label: "embroidered name tote bag" }
    ]
  },
  {
    id: "tote-bookish",
    name: "Bookish Tote",
    price: 30.00,
    buyable: true,                         // READY TO BUY
    ships: "handmade",                    // ship time: config.js → turnaround.handmade
    category: "bags",
    tags: ["gifts"],
    desc: "Our embroidered bookish design on a sturdy canvas tote.",
    image: "assets/photos/booked-tote-bag.jpg",
    label: "bookish design canvas tote bag",
    color: "lime",
    featured: false,
    badge: ""
  },
  {
    id: "makeup-bag",
    name: "Custom Makeup Bag",
    price: 20.00,
    buyable: false,                        // MADE TO ORDER
    category: "bags",
    tags: ["gifts", "wedding"],
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
    buyable: false,                        // MADE TO ORDER
    category: "bags",
    tags: ["gifts", "sports"],
    desc: "Custom tags for sports bags, backpacks, and luggage.",
    image: "",
    label: "personalized bag tag",
    color: "orange",
    featured: false,
    badge: "Team Favorite"
  },

  /* ================= TUMBLERS ================= */
  {
    id: "tumbler-ready",
    name: "Engraved Tumbler",
    price: 25.00,
    buyable: true,                         // READY TO BUY
    ships: "apparel",                     // ship time: config.js → turnaround.apparel
    category: "drink",
    tags: ["gifts", "sports"],
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
    buyable: false,                        // MADE TO ORDER
    category: "drink",
    tags: ["gifts", "sports"],
    desc: "Personalized with a name, team, or design of your choice.",
    image: "assets/photos/custom-team-engraved-bulk-tumblers.jpg",
    label: "personalized tumbler",
    color: "lime",
    featured: false,
    badge: ""
  },

  /* ================= BLANKETS & STOCKINGS ================= */
  {
    id: "blanket",
    name: "Personalized Blanket",
    price: 45.00,
    buyable: false,                        // MADE TO ORDER
    category: "home",
    tags: ["gifts"],
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
    buyable: false,                        // MADE TO ORDER
    category: "home",
    tags: ["holiday", "gifts"],
    desc: "Plush stocking personalized with a name or design. Hang it with care!",
    image: "",
    label: "personalized holiday stocking",
    color: "navy",
    featured: false,
    badge: "Seasonal"
  },

  /* ================= WEDDING (Team & Bulk: "Request a Quote", no price) ================= */
  {
    id: "bridal-party",
    name: "Bridal Party Apparel",
    price: 0,
    buyable: false,                        // MADE TO ORDER
    bulk: true,                            // TEAM & BULK: no price, "Request a Quote"
    category: "wedding",
    tags: ["wedding"],
    desc: "Matching embroidered shirts, bachelorette tees, and “just married” crewnecks for the whole bridal party.",
    image: "assets/photos/bridal-party-embroidered-shirts.jpg",
    label: "embroidered bridal party shirts",
    color: "blush",
    featured: false,
    badge: "",
    morePhotos: [
      { image: "assets/photos/custom-embroidered-bridal-shirt.jpg", label: "embroidered bride shirt" },
      { image: "assets/photos/bachelorette-custom-t-shirts-bulk.jpg", label: "bachelorette party tees" }
    ]
  },
  {
    id: "wedding-favors",
    name: "Wedding & Party Favors",
    price: 0,
    buyable: false,                        // MADE TO ORDER
    bulk: true,                            // TEAM & BULK: no price, "Request a Quote"
    category: "wedding",
    tags: ["wedding"],
    desc: "Custom koozies and favors for your guests, plus gifts and accessories for the bridal party.",
    image: "assets/photos/custom-wedding-coozies-bulk.jpg",
    label: "custom koozie wedding favors",
    color: "navy",
    featured: false,
    badge: "",
    morePhotos: [
      { image: "assets/photos/dscf6664.jpg", label: "koozie favors set out for guests" }
    ]
  },

  /* ================= TEAM & BULK ================= */
  {
    id: "group-tees",
    name: "Team & Bulk Orders",
    price: 0,
    buyable: false,                        // MADE TO ORDER
    bulk: true,                            // TEAM & BULK: no price, "Request a Quote"
    category: "apparel",
    tags: ["sports"],
    desc: "Matching tees and gear for teams, families, reunions, trips, and events. Tell us about your group and we’ll send a custom quote.",
    image: "assets/photos/custom-bulk-t-shirt-event-tee.jpg",
    label: "group in matching custom tees",
    color: "navy",
    featured: 4,
    badge: ""
  }
];
