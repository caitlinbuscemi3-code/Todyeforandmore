/* =====================================================================
   GALLERY — past work shown on gallery.html
   ---------------------------------------------------------------------
   Each { ... } block is one gallery tile. A tile can hold ONE photo or
   SEVERAL. When it has more than one, a "See more" button appears that
   opens a slideshow of all of them.

   Tiles are in order: the first ones show first, so keep your
   best work at the top. The gallery shows the first 16 tiles, then a
   "See all work" button reveals the rest.

   To ADD a tile: copy one whole { ... }, block, paste it, and edit it.
   To ADD a photo to a tile: copy one { image: ..., label: ... }, line
   inside its "photos" list.

   Fields:
     category – shoes, apparel, team, wedding, baby, pets, or gifts
                (must match a filter id in GALLERY_FILTERS)
     caption  – title shown under the photo
     color    – placeholder color: blush, blue, lime, navy, orange
     photos   – list of photos. For each one:
                  image – path to your photo, e.g. "assets/photos/teacher-hand-painted-jean-jacket-custom.jpg"
                          (leave "" to show a placeholder box)
                  label – what the placeholder says (the photo you need to add)
   ===================================================================== */

window.GALLERY_FILTERS = [
  { id: "all",     label: "All Work" },
  { id: "shoes",   label: "Shoes" },
  { id: "apparel", label: "Apparel" },
  { id: "team",    label: "Team & Groups" },
  { id: "wedding", label: "Wedding" },
  { id: "baby",    label: "Baby" },
  { id: "pets",    label: "Pets" },
  { id: "gifts",   label: "Gifts" }
];

window.GALLERY_ITEMS = [
  {
    category: "baby", caption: "Gia’s First Birthday Jacket", color: "blush",
    photos: [
      { image: "assets/photos/baby-jean-jacket-photo.jpg", label: "hand-painted baby jean jacket" },
      { image: "assets/photos/baby-jean-jacket.jpg", label: "hand-painted baby jean jacket" },
      { image: "assets/photos/custom-hand-painted-jean-jacket-kids.jpg", label: "hand-painted baby jean jacket" },
      { image: "assets/photos/custom-jean-jacket-and-shoes-kids.jpg", label: "hand-painted baby jean jacket" },
      { image: "assets/photos/jean-jacket-kids-custom-hand-painted.jpg", label: "hand-painted baby jean jacket" }
    ]
  },
  {
    category: "shoes", caption: "Hand-Painted Lions Sneakers", color: "blue",
    photos: [
      { image: "assets/photos/lions-custom-shoes-123.jpg", label: "hand-painted Lions sneakers" },
      { image: "assets/photos/lions-custom-shoes-14.jpg", label: "hand-painted Lions sneakers" },
      { image: "assets/photos/lions-custom-shoes-2.jpg", label: "hand-painted Lions sneakers" },
      { image: "assets/photos/lions-custom-shoes.jpg", label: "hand-painted Lions sneakers" },
      { image: "assets/photos/custom-lions-shoes-12.jpg", label: "hand-painted Lions sneakers" },
      { image: "assets/photos/custom-lions-shoes-2.jpg", label: "hand-painted Lions sneakers" },
      { image: "assets/photos/custom-lions-shoes.jpg", label: "hand-painted Lions sneakers" },
      { image: "assets/photos/custom-lions-jordans.jpg", label: "hand-painted Lions sneakers" }
    ]
  },
  {
    category: "apparel", caption: "Kids Hand-Painted Jean Jackets", color: "blue",
    photos: [
      { image: "assets/photos/custom-jean-jacket-kids-hand-painted.jpg", label: "kids hand-painted jean jacket" },
      { image: "assets/photos/custom-kids-hand-painted-jean-jacket-design.jpg", label: "kids hand-painted jean jacket" },
      { image: "assets/photos/kids-custom-jean-jacket.jpg", label: "kids hand-painted jean jacket" },
      { image: "assets/photos/custom-jean-jacket-kids-2.jpg", label: "kids hand-painted jean jacket" },
      { image: "assets/photos/custom-jean-jacket-kids.jpg", label: "kids hand-painted jean jacket" },
      { image: "assets/photos/jean-jacket-kids-hand-painted.jpg", label: "kids hand-painted jean jacket" },
      { image: "assets/photos/custom-kids-hand-painted-jean-jacket-eras-tour.jpg", label: "kids hand-painted jean jacket" }
    ]
  },
  {
    category: "team", caption: "Team Jerseys", color: "navy",
    photos: [
      { image: "assets/photos/team-jerseys-custom.jpg", label: "custom team jerseys" },
      { image: "assets/photos/team-custom-jersey-bulk.jpg", label: "custom team jerseys" }
    ]
  },
  {
    category: "apparel", caption: "Taylor Swift Eras Tour Jacket", color: "blush",
    photos: [
      { image: "assets/photos/hand-painted-jean-jacket-taylor-swift-eras.jpg", label: "hand-painted Eras Tour jean jacket" },
      { image: "assets/photos/hand-painted-jean-jacket-eras-tour-taylor-swift-2.jpg", label: "hand-painted Eras Tour jean jacket" }
    ]
  },
  {
    category: "baby", caption: "Hand-Stitched Name Sweaters", color: "lime",
    photos: [
      { image: "assets/photos/baby-sweaters-hand-embroidered.jpg", label: "hand-stitched kids name sweater" },
      { image: "assets/photos/hand-stitched-baby-sweater-custom-name.jpg", label: "hand-stitched kids name sweater" },
      { image: "assets/photos/hand-stitched-baby-sweater-custom.jpg", label: "hand-stitched kids name sweater" },
      { image: "assets/photos/custom-baby-hand-stitched-sweater.jpg", label: "hand-stitched kids name sweater" },
      { image: "assets/photos/custom-kids-hand-stitched-sweater.jpg", label: "hand-stitched kids name sweater" },
      { image: "assets/photos/custom-hand-stitched-kids-sweater-letter-flower.jpg", label: "hand-stitched kids name sweater" },
      { image: "assets/photos/hand-stitched-kids-lions-sweater.jpg", label: "hand-stitched kids name sweater" },
      { image: "assets/photos/hand-stitched-kids-sweater-st-patricks-day.jpg", label: "hand-stitched kids name sweater" }
    ]
  },
  {
    category: "team", caption: "Legacy Team Shirts & Hoodies", color: "lime",
    photos: [
      { image: "assets/photos/company-team-t-shirt.jpg", label: "green Legacy team shirts and hoodies" },
      { image: "assets/photos/company-team-t-shirts.jpg", label: "green Legacy team shirts and hoodies" },
      { image: "assets/photos/team-company-bulk-apparel-t-shirt.jpg", label: "green Legacy team shirts and hoodies" },
      { image: "assets/photos/custom-team-company-hoodies-2.jpg", label: "green Legacy team shirts and hoodies" },
      { image: "assets/photos/custom-team-company-hoodies.jpg", label: "green Legacy team shirts and hoodies" },
      { image: "assets/photos/custom-company-hoodies.jpg", label: "green Legacy team shirts and hoodies" },
      { image: "assets/photos/custom-company-hoodies-2.jpg", label: "green Legacy team shirts and hoodies" }
    ]
  },
  {
    category: "shoes", caption: "Chicago Sneakers & Apparel", color: "orange",
    photos: [
      { image: "assets/photos/custom-chicago-shoes-nike.jpg", label: "custom Chicago sneakers" },
      { image: "assets/photos/custom-chicago-nikes.jpg", label: "custom Chicago sneakers" },
      { image: "assets/photos/custom-chicago-shoes-close-up.jpg", label: "custom Chicago sneakers" },
      { image: "assets/photos/custom-chicago-shoes-and-apparel.jpg", label: "custom Chicago sneakers" },
      { image: "assets/photos/custom-order-shoes-and-apparel-2.jpg", label: "custom Chicago sneakers" }
    ]
  },
  {
    category: "baby", caption: "Baby Boxes", color: "blush",
    photos: [
      { image: "assets/photos/baby-box-custom-with-shoes.jpg", label: "custom baby box" },
      { image: "assets/photos/baby-box-2.jpg", label: "custom baby box" },
      { image: "assets/photos/baby-box-3.jpg", label: "custom baby box" },
      { image: "assets/photos/baby-box-with-shoes.jpg", label: "custom baby box" },
      { image: "assets/photos/baby-box-custom-example.jpg", label: "custom baby box" },
      { image: "assets/photos/baby-box-custom.jpg", label: "custom baby box" },
      { image: "assets/photos/baby-box-example-custom.jpg", label: "custom baby box" },
      { image: "assets/photos/baby-box.jpg", label: "custom baby box" }
    ]
  },
  {
    category: "team", caption: "Bachelor Party Jerseys", color: "navy",
    photos: [
      { image: "assets/photos/custom-bulk-jerseys-bachelor.jpg", label: "custom bachelor party jerseys" },
      { image: "assets/photos/bulk-jerseys-bachelor-party.jpg", label: "custom bachelor party jerseys" },
      { image: "assets/photos/custom-bachelor-party-jerseys-bulk-birthday.jpg", label: "custom bachelor party jerseys" }
    ]
  },
  {
    category: "apparel", caption: "Teacher Jean Jacket", color: "blue",
    photos: [
      { image: "assets/photos/teacher-hand-painted-jean-jacket-custom.jpg", label: "hand-painted teacher jean jacket" },
      { image: "assets/photos/hand-painted-jean-jacket-teacher.jpg", label: "hand-painted teacher jean jacket" }
    ]
  },
  {
    category: "wedding", caption: "Bach Club Bachelorette Tees", color: "blush",
    photos: [
      { image: "assets/photos/bachelorette-custom-t-shirts-bulk.jpg", label: "Bach Club bachelorette tees" },
      { image: "assets/photos/bachelorette-custom-bridal-tee-bulk.jpg", label: "Bach Club bachelorette tees" },
      { image: "assets/photos/bachelorette-custom-tee-bulk.jpg", label: "Bach Club bachelorette tees" },
      { image: "assets/photos/bridal-bachelorette-tee-custom-bulk.jpg", label: "Bach Club bachelorette tees" }
    ]
  },
  {
    category: "shoes", caption: "Mateen Cleaves MSU Sneakers", color: "lime",
    photos: [
      { image: "assets/photos/mateen-with-shoes.jpg", label: "custom Michigan State sneakers" },
      { image: "assets/photos/custom-msu-shoes-mateen-cleaves.jpg", label: "custom Michigan State sneakers" },
      { image: "assets/photos/custom-shoes-mateen.jpg", label: "custom Michigan State sneakers" }
    ]
  },
  {
    category: "apparel", caption: "Superhero Kids Tee", color: "blue",
    photos: [
      { image: "assets/photos/custom-embroidered-nike-tee-kids-super-hero.jpg", label: "embroidered superhero kids tee" },
      { image: "assets/photos/custom-embroidered-nike-tee-super-hero-kids.jpg", label: "embroidered superhero kids tee" }
    ]
  },
  {
    category: "team", caption: "Event Tees", color: "navy",
    photos: [
      { image: "assets/photos/custom-bulk-t-shirt-event-tee.jpg", label: "custom event t-shirts" },
      { image: "assets/photos/bulk-event-t-shirts.jpg", label: "custom event t-shirts" }
    ]
  },
  {
    category: "shoes", caption: "Minnie Mouse Kids Sneakers", color: "blush",
    photos: [
      { image: "assets/photos/kids-custom-disney-shoes-minnie-mouse.jpg", label: "Minnie Mouse kids sneakers" },
      { image: "assets/photos/kids-custom-shoes-disney-minnie-mouse.jpg", label: "Minnie Mouse kids sneakers" },
      { image: "assets/photos/minnie-mouse-disney-shoe-kids-custom.jpg", label: "Minnie Mouse kids sneakers" },
      { image: "assets/photos/minnie-mouse-kids-disney-shoe.jpg", label: "Minnie Mouse kids sneakers" }
    ]
  },
  {
    category: "apparel", caption: "Detroit Game Day Collection", color: "navy",
    photos: [
      { image: "assets/photos/lions-graphic-tee-vintage.jpg", label: "Detroit game day apparel" },
      { image: "assets/photos/lions-graphic-tee.jpg", label: "Detroit game day apparel" },
      { image: "assets/photos/detroit-embroidered-football-tee.jpg", label: "Detroit game day apparel" },
      { image: "assets/photos/eb1ba2f3-4c30-4912-a48d-3989e41b9429.jpg", label: "Detroit game day apparel" },
      { image: "assets/photos/detroit-lions-embroidered-tee.jpg", label: "Detroit game day apparel" },
      { image: "assets/photos/lions-embroidered-tee.jpg", label: "Detroit game day apparel" },
      { image: "assets/photos/detroit-lions-tie-dye-vintage-tee.jpg", label: "Detroit game day apparel" },
      { image: "assets/photos/detroit-lions-tie-dye-crewnecks.jpg", label: "Detroit game day apparel" },
      { image: "assets/photos/vintage-lions-tee.jpg", label: "Detroit game day apparel" },
      { image: "assets/photos/sunday-social-tee-lions.jpg", label: "Detroit game day apparel" },
      { image: "assets/photos/lions-tee-blue-2.jpg", label: "Detroit game day apparel" },
      { image: "assets/photos/lions-tee-blue.jpg", label: "Detroit game day apparel" },
      { image: "assets/photos/lions-applique-crew-custom-team.jpg", label: "Detroit game day apparel" }
    ]
  },
  {
    category: "apparel", caption: "Sports Jean Jacket", color: "navy",
    photos: [
      { image: "assets/photos/hand-painted-jean-jacket-custom-sports.jpg", label: "hand-painted sports jean jacket" },
      { image: "assets/photos/c9afc51f-3d44-4cd9-8879-dffa2dc9ced3.jpg", label: "hand-painted sports jean jacket" }
    ]
  },
  {
    category: "shoes", caption: "Hockeytown High-Tops", color: "orange",
    photos: [
      { image: "assets/photos/custom-red-wings-high-top-shoes.jpg", label: "custom Red Wings high-top sneakers" },
      { image: "assets/photos/custom-red-wings-shoes-high-top.jpg", label: "custom Red Wings high-top sneakers" },
      { image: "assets/photos/custom-redwing-shoes.jpg", label: "custom Red Wings high-top sneakers" }
    ]
  },
  {
    category: "wedding", caption: "Bridal Party Embroidered Shirts", color: "blush",
    photos: [
      { image: "assets/photos/bridal-party-embroidered-shirts.jpg", label: "embroidered bridal party shirts" },
      { image: "assets/photos/custom-embroidered-bridal-shirt.jpg", label: "embroidered bridal party shirts" }
    ]
  },
  {
    category: "shoes", caption: "Hand-Painted Bridal Shoes", color: "blush",
    photos: [
      { image: "assets/photos/custom-bridal-shoes.jpg", label: "hand-painted bridal shoes" },
      { image: "assets/photos/custom-bridal-shoes-toms.jpg", label: "hand-painted bridal shoes" },
      { image: "assets/photos/custom-bridal-shoes-toms-2.jpg", label: "hand-painted bridal shoes" }
    ]
  },
  {
    category: "team", caption: "Coaches’ Quarter Zips", color: "navy",
    photos: [
      { image: "assets/photos/custom-team-gear.jpg", label: "embroidered coaches quarter zips" },
      { image: "assets/photos/coaches-bulk-team-apparel.jpg", label: "embroidered coaches quarter zips" },
      { image: "assets/photos/custom-team-bulk-gear.jpg", label: "embroidered coaches quarter zips" }
    ]
  },
  {
    category: "apparel", caption: "Beaded Embroidery", color: "orange",
    photos: [
      { image: "assets/photos/beaded-embroidery-custom.jpg", label: "beaded embroidery tee" }
    ]
  },
  {
    category: "pets", caption: "Embroidered Pet Crewnecks", color: "blush",
    photos: [
      { image: "assets/photos/custom-embroidered-dog-crewnecks.jpg", label: "embroidered pet crewneck" }
    ]
  },
  {
    category: "team", caption: "Inside Out Halloween Shirts", color: "lime",
    photos: [
      { image: "assets/photos/halloween-shirts-disney-inside-out-photo.jpg", label: "Inside Out group Halloween shirts" },
      { image: "assets/photos/custom-bulk-halloween-costumes-disney-inside-out.jpg", label: "Inside Out group Halloween shirts" }
    ]
  },
  {
    category: "shoes", caption: "Kids Disney Sneakers", color: "blue",
    photos: [
      { image: "assets/photos/toy-story-custom-kids-shoes-nike-disney.jpg", label: "custom kids Disney sneakers" },
      { image: "assets/photos/disney-custom-kids-shoes-nike-toy-story.jpg", label: "custom kids Disney sneakers" },
      { image: "assets/photos/custom-kids-shoes-disney-cars.jpg", label: "custom kids Disney sneakers" },
      { image: "assets/photos/custom-baby-nike-shoes.jpg", label: "custom kids Disney sneakers" },
      { image: "assets/photos/custom-baby-shoes.jpg", label: "custom kids Disney sneakers" }
    ]
  },
  {
    category: "team", caption: "River Village Restaurant Apparel", color: "navy",
    photos: [
      { image: "assets/photos/restaurant-company-apparel-custom.jpg", label: "restaurant staff apparel" },
      { image: "assets/photos/restaurant-company-custom-bulk-apparel.jpg", label: "restaurant staff apparel" },
      { image: "assets/photos/custom-bulk-apparel-company-custom-order.jpg", label: "restaurant staff apparel" },
      { image: "assets/photos/custom-bulk-apparel-restaurant.jpg", label: "restaurant staff apparel" }
    ]
  },
  {
    category: "shoes", caption: "Michigan Sneakers & Crewnecks", color: "lime",
    photos: [
      { image: "assets/photos/custom-michigan-shoes-and-crewnecks.jpg", label: "custom Michigan sneakers and crewnecks" },
      { image: "assets/photos/custom-michigan-shoes-nike.jpg", label: "custom Michigan sneakers and crewnecks" }
    ]
  },
  {
    category: "team", caption: "UWM Company Apparel", color: "navy",
    photos: [
      { image: "assets/photos/custom-company-bulk-shirts.jpg", label: "UWM company apparel" },
      { image: "assets/photos/custom-company-shirts.jpg", label: "UWM company apparel" },
      { image: "assets/photos/custom-team-jersey.jpg", label: "UWM company apparel" }
    ]
  },
  {
    category: "apparel", caption: "Embroidered Flower Hoodies", color: "lime",
    photos: [
      { image: "assets/photos/sunflower-embroidered-hoodie.jpg", label: "embroidered flower hoodie" },
      { image: "assets/photos/sunshine-embroidered-hoodie.jpg", label: "embroidered flower hoodie" },
      { image: "assets/photos/custom-embroidered-hoodie.jpg", label: "embroidered flower hoodie" }
    ]
  },
  {
    category: "shoes", caption: "Company Logo Sneakers", color: "orange",
    photos: [
      { image: "assets/photos/company-shoes-custom-logo.jpg", label: "sneakers with a company logo" },
      { image: "assets/photos/company-logo-shoes-custom.jpg", label: "sneakers with a company logo" },
      { image: "assets/photos/custom-company-logo-shoes.jpg", label: "sneakers with a company logo" },
      { image: "assets/photos/custom-nikes-company-logo.jpg", label: "sneakers with a company logo" }
    ]
  },
  {
    category: "wedding", caption: "Wedding & Groomsmen Koozies", color: "navy",
    photos: [
      { image: "assets/photos/custom-wedding-coozies-bulk.jpg", label: "custom wedding koozies" },
      { image: "assets/photos/dscf6663.jpg", label: "custom wedding koozies" },
      { image: "assets/photos/dscf6664.jpg", label: "custom wedding koozies" },
      { image: "assets/photos/custom-coozies-bulk-2.jpg", label: "custom wedding koozies" },
      { image: "assets/photos/custom-coozies-bulk-3.jpg", label: "custom wedding koozies" },
      { image: "assets/photos/groomsmen-coozies.jpg", label: "custom wedding koozies" }
    ]
  },
  {
    category: "gifts", caption: "Engraved Tumblers", color: "orange",
    photos: [
      { image: "assets/photos/custom-bulk-order-engraved-tumblers.jpg", label: "engraved tumblers" },
      { image: "assets/photos/custom-bulk-order-tumblers-team-crewnecks-team.jpg", label: "engraved tumblers" },
      { image: "assets/photos/custom-team-engraved-bulk-tumblers.jpg", label: "engraved tumblers" },
      { image: "assets/photos/custom-tumbler-team-bulk.jpg", label: "engraved tumblers" },
      { image: "assets/photos/engraved-mug-red-wings-or-team.jpg", label: "engraved tumblers" },
      { image: "assets/photos/custom-engraved-company-logo.jpg", label: "engraved tumblers" },
      { image: "assets/photos/happy-camper-engraved-mug.jpg", label: "engraved tumblers" }
    ]
  },
  {
    category: "team", caption: "Golf Trip Shirts", color: "lime",
    photos: [
      { image: "assets/photos/bulk-order-custom-golf-trip-event.jpg", label: "custom golf trip shirts" },
      { image: "assets/photos/custom-golf-trip-bulk-order-event-shirts.jpg", label: "custom golf trip shirts" },
      { image: "assets/photos/custom-golf-trip-shirts-bulk-order.jpg", label: "custom golf trip shirts" },
      { image: "assets/photos/custom-jerseys.jpg", label: "custom golf trip shirts" }
    ]
  },
  {
    category: "gifts", caption: "Embroidered Name & Initial Totes", color: "blush",
    photos: [
      { image: "assets/photos/custom-embroidered-name-tote-bag.jpg", label: "embroidered name tote bag" },
      { image: "assets/photos/custom-embroidered-name-tote-2.jpg", label: "embroidered name tote bag" },
      { image: "assets/photos/custom-tote-bag-name.jpg", label: "embroidered name tote bag" },
      { image: "assets/photos/embroidered-initial-tote-bag.jpg", label: "embroidered name tote bag" },
      { image: "assets/photos/custom-initial-tote-bag.jpg", label: "embroidered name tote bag" },
      { image: "assets/photos/initial-tote-bag-custom-embroidery.jpg", label: "embroidered name tote bag" }
    ]
  },
  {
    category: "shoes", caption: "Custom Cleats", color: "blue",
    photos: [
      { image: "assets/photos/custom-cleats.jpg", label: "custom football cleats" },
      { image: "assets/photos/custom-cleats-3.jpg", label: "custom football cleats" },
      { image: "assets/photos/custom-cleats-2.jpg", label: "custom football cleats" }
    ]
  },
  {
    category: "team", caption: "Team Crewnecks", color: "navy",
    photos: [
      { image: "assets/photos/custom-embroidered-crewnecks-team-specific.jpg", label: "custom team crewnecks" },
      { image: "assets/photos/custom-team-crewnecks-team-specific.jpg", label: "custom team crewnecks" },
      { image: "assets/photos/custom-embroidered-team-hoodie-michigan-state.jpg", label: "custom team crewnecks" },
      { image: "assets/photos/custom-team-crewnecks.jpg", label: "custom team crewnecks" },
      { image: "assets/photos/custom-team-apparel.jpg", label: "custom team crewnecks" }
    ]
  },
  {
    category: "apparel", caption: "Seasonal & Everyday Favorites", color: "lime",
    photos: [
      { image: "assets/photos/happy-camper-embroidered-crewnecks.jpg", label: "embroidered crewnecks and tees" },
      { image: "assets/photos/tis-the-season-tee-embroidered.jpg", label: "embroidered crewnecks and tees" },
      { image: "assets/photos/lucky-sweatshirt.jpg", label: "embroidered crewnecks and tees" },
      { image: "assets/photos/embroidered-harry-potter-shirt.jpg", label: "embroidered crewnecks and tees" },
      { image: "assets/photos/custom-t-shirt-example.jpg", label: "embroidered crewnecks and tees" },
      { image: "assets/photos/book-t-shirt.jpg", label: "embroidered crewnecks and tees" }
    ]
  },
  {
    category: "team", caption: "Red Wings Shoes & Crewnecks", color: "orange",
    photos: [
      { image: "assets/photos/custom-detroit-red-wings-shoes-and-crewnecks.jpg", label: "Red Wings sneakers and crewnecks" },
      { image: "assets/photos/custom-detroit-red-wings-shoes-and-crew.jpg", label: "Red Wings sneakers and crewnecks" },
      { image: "assets/photos/red-wings-team-apparel.jpg", label: "Red Wings sneakers and crewnecks" }
    ]
  },
  {
    category: "gifts", caption: "Bookish Tote & Sweatshirt", color: "blush",
    photos: [
      { image: "assets/photos/booked-tote-bag.jpg", label: "bookish tote bag and sweatshirt" },
      { image: "assets/photos/custom-book-tote-and-sweatshirt.jpg", label: "bookish tote bag and sweatshirt" }
    ]
  },
  {
    category: "team", caption: "Electrical Company Apparel", color: "navy",
    photos: [
      { image: "assets/photos/custom-bulk-company-order.jpg", label: "company hoodies and tees" },
      { image: "assets/photos/bulk-company-order-custom.jpg", label: "company hoodies and tees" },
      { image: "assets/photos/custom-electrical-company-apparel-bulk.jpg", label: "company hoodies and tees" },
      { image: "assets/photos/custom-company-hoodie.jpg", label: "company hoodies and tees" },
      { image: "assets/photos/custom-hoodie-for-company.jpg", label: "company hoodies and tees" }
    ]
  },
  {
    category: "gifts", caption: "Personalized Blankets", color: "blue",
    photos: [
      { image: "assets/photos/embroidered-blanket-name.jpg", label: "embroidered personalized blanket" },
      { image: "assets/photos/custom-embroidered-blanket-company-gift.jpg", label: "embroidered personalized blanket" }
    ]
  },
  {
    category: "team", caption: "LMT Design Crewnecks", color: "blue",
    photos: [
      { image: "assets/photos/company-logo-embroidered-crewnecks-custom.jpg", label: "embroidered company logo crewnecks" },
      { image: "assets/photos/custom-company-embroidered-crew-neck-company-logo.jpg", label: "embroidered company logo crewnecks" }
    ]
  },
  {
    category: "gifts", caption: "Birthday Fanny Packs & Totes", color: "lime",
    photos: [
      { image: "assets/photos/custom-fanny-pack-birthday-event-bulk.jpg", label: "custom birthday fanny packs and totes" },
      { image: "assets/photos/custom-bags-birthday-event-1.jpg", label: "custom birthday fanny packs and totes" },
      { image: "assets/photos/custom-bags-bulk-birthday-event.jpg", label: "custom birthday fanny packs and totes" }
    ]
  },
  {
    category: "shoes", caption: "More Custom Kicks", color: "blue",
    photos: [
      { image: "assets/photos/custom-vegas-shoes.jpg", label: "custom painted sneakers" },
      { image: "assets/photos/custom-phoenix-suns-nikes.jpg", label: "custom painted sneakers" },
      { image: "assets/photos/custom-ferris-state-shoes-close-up.jpg", label: "custom painted sneakers" },
      { image: "assets/photos/custom-adidas-shoes-2.jpg", label: "custom painted sneakers" },
      { image: "assets/photos/custom-tigers-shoes.jpg", label: "custom painted sneakers" },
      { image: "assets/photos/custom-ferris-state-shoes.jpg", label: "custom painted sneakers" },
      { image: "assets/photos/custom-phoenix-suns-shoes.jpg", label: "custom painted sneakers" },
      { image: "assets/photos/custom-adidas-shoes.jpg", label: "custom painted sneakers" }
    ]
  }
];

(function () {
  "use strict";
  var Site = window.Site;
  var grid = document.querySelector("[data-gallery-grid]");
  if (!grid) return;

  var ITEMS = window.GALLERY_ITEMS;
  var filterNames = {};
  window.GALLERY_FILTERS.forEach(function (f) { filterNames[f.id] = f.label; });

  function photoHTML(item, photo, shape) {
    return Site.media({ image: photo.image, label: photo.label, alt: item.caption + ": " + photo.label, color: item.color, shape: shape });
  }
  var FIRST_SHOWN = 16; // how many tiles show before "See all work"
  var showAll = false;

  /* ---------- Draw the gallery tiles ---------- */
  grid.innerHTML = ITEMS.map(function (item, i) {
    var count = item.photos.length;
    return (
      '<article class="gallery-item" data-category="' + Site.escape(item.category) + '">' +
        '<button class="gallery-item__open" type="button" data-open="' + i + '" aria-label="View larger: ' + Site.escape(item.caption) + '">' +
          photoHTML(item, item.photos[0], "square") +
          (count > 1 ? '<span class="gallery-item__count">' + count + " photos</span>" : "") +
        "</button>" +
        '<p class="gallery-item__caption">' + Site.escape(item.caption) + "</p>" +
        '<p class="gallery-item__cat">' + Site.escape(filterNames[item.category] || item.category) + "</p>" +
        // "See more" only appears when there's more than one photo
        (count > 1 ? '<button class="btn btn--outline btn--small gallery-item__more" type="button" data-open="' + i + '">See more</button>' : "") +
      "</article>"
    );
  }).join("");

  /* ---------- Filter chips ---------- */
  var filters = document.querySelector("[data-gallery-filters]");
  filters.innerHTML = window.GALLERY_FILTERS.map(function (f, i) {
    return '<button class="chip" type="button" data-filter="' + f.id + '" aria-pressed="' + (i === 0) + '">' + Site.escape(f.label) + "</button>";
  }).join("");
  // "See all work" button under the grid (only needed on the "All Work" view)
  var moreBtn = document.querySelector("[data-gallery-more]");
  var currentCat = "all";
  function applyFilter() {
    var shown = 0;
    grid.querySelectorAll(".gallery-item").forEach(function (tile) {
      var match = currentCat === "all" || tile.getAttribute("data-category") === currentCat;
      // on "All Work", only the first 16 show until "See all work" is clicked
      var withinLimit = currentCat !== "all" || showAll || shown < FIRST_SHOWN;
      tile.hidden = !(match && withinLimit);
      if (match) shown++;
    });
    if (moreBtn) {
      moreBtn.hidden = currentCat !== "all" || showAll || ITEMS.length <= FIRST_SHOWN;
      moreBtn.textContent = "See all work (" + ITEMS.length + " projects)";
    }
  }
  filters.addEventListener("click", function (e) {
    var btn = e.target.closest("[data-filter]");
    if (!btn) return;
    currentCat = btn.getAttribute("data-filter");
    filters.querySelectorAll("[data-filter]").forEach(function (b) { b.setAttribute("aria-pressed", String(b === btn)); });
    applyFilter();
  });
  if (moreBtn) moreBtn.addEventListener("click", function () { showAll = true; applyFilter(); });
  applyFilter();

  /* ---------- Slideshow (opens from a photo or "See more") ---------- */
  var box = document.querySelector("[data-lightbox]");
  if (!box || typeof box.showModal !== "function") return;
  var media = box.querySelector("[data-lightbox-media]");
  var caption = box.querySelector("[data-lightbox-caption]");
  var counter = box.querySelector("[data-lightbox-counter]");
  var prevBtn = box.querySelector("[data-lightbox-prev]");
  var nextBtn = box.querySelector("[data-lightbox-next]");
  prevBtn.innerHTML = Site.icon("prev");
  nextBtn.innerHTML = Site.icon("next");

  var current = null; // the gallery item being shown
  var index = 0;      // which of its photos is showing

  function render() {
    var total = current.photos.length;
    media.innerHTML = photoHTML(current, current.photos[index]);
    caption.textContent = current.caption;
    counter.textContent = total > 1 ? "Photo " + (index + 1) + " of " + total : "";
    prevBtn.hidden = nextBtn.hidden = total < 2;
  }
  function step(dir) {
    if (!current || current.photos.length < 2) return;
    index = (index + dir + current.photos.length) % current.photos.length;
    render();
  }

  grid.addEventListener("click", function (e) {
    var opener = e.target.closest("[data-open]");
    if (!opener) return;
    current = ITEMS[Number(opener.getAttribute("data-open"))];
    index = 0;
    render();
    box.showModal();
  });
  prevBtn.addEventListener("click", function () { step(-1); });
  nextBtn.addEventListener("click", function () { step(1); });
  box.addEventListener("keydown", function (e) {
    if (e.key === "ArrowLeft") step(-1);
    if (e.key === "ArrowRight") step(1);
  });
  box.querySelector("[data-lightbox-close]").addEventListener("click", function () { box.close(); });
  box.addEventListener("click", function (e) { if (e.target === box) box.close(); }); // click outside to close
})();
