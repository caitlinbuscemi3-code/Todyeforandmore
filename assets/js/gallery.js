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

/* ---------- FEATURED WORK (top of the gallery) ----------
   Standout projects shown above the regular gallery. Same fields as
   below, plus:
     name  – who it was for (small label on the card)
     story – one or two sentences about the project
   A photo with image: "" shows as a "Coming soon" slide until you add it. */
window.FEATURED_WORK = [
  {
    name: "Mateen Cleaves",
    caption: "A Championship Tribute",
    story: "Hand-painted sneakers inspired by the pair he wore leading his team to the 2000 national championship, finished with his signature and his words: “Get your mind right, keep your grind tight” and “If you’re trying to win, tap in.”",
    color: "lime",
    photos: [
      { image: "assets/photos/mateen-with-shoes.jpg", label: "Mateen Cleaves with his custom sneakers" },
      { image: "assets/photos/custom-championship-shoes-mateen-cleaves.jpg", label: "championship-inspired sneakers with his signature and quotes" },
      { image: "assets/photos/custom-shoes-mateen.jpg", label: "heel details with his sayings" }
    ]
  },
  {
    name: "Detroit Tigers Game Day Staff",
    caption: "Game Day Kicks",
    story: "Custom pairs for the Tigers game day staff, bringing city vibes with the Detroit skyline, 313, and tiger stripes.",
    color: "orange",
    photos: [
      { image: "assets/photos/cassidy-tigers.jpg", label: "Tigers staff member wearing her custom sneakers on the field" },
      { image: "assets/photos/custom-tigers-shoes-bulk-order.jpg", label: "the full staff order, ready to go" },
      { image: "assets/photos/tigers-featured-shoe.jpg", label: "close-up of the Detroit skyline and 313 details" }
    ]
  },
  {
    name: "Flo Rida",
    caption: "Stage-Ready Sneakers",
    story: "A gift for one of his performances: Phoenix basketball colors, a textured basketball detail, and his Flo Rida logo on the back of each shoe.",
    color: "blue",
    photos: [
      { image: "assets/photos/flo-rida-shoe-1.jpg", label: "Flo Rida with his custom sneakers" },
      { image: "assets/photos/custom-phoenix-suns-nikes.jpg", label: "custom Phoenix basketball sneakers" },
      { image: "assets/photos/custom-phoenix-suns-shoes.jpg", label: "Flo Rida logo on the heels" }
    ]
  }
];

window.GALLERY_ITEMS = [
  {
    category: "shoes", caption: "More Custom Kicks", color: "blue",
    photos: [
      { image: "assets/photos/company-shoes-custom-logo.jpg", label: "orange and blue company logo sneakers" },
      { image: "assets/photos/company-logo-shoes-custom.jpg", label: "orange and blue company logo sneakers, back view" },
      { image: "assets/photos/custom-company-logo-shoes.jpg", label: "orange and blue company logo sneakers, side view" },
      { image: "assets/photos/custom-nikes-company-logo.jpg", label: "green and gold company logo sneakers" },
      { image: "assets/photos/custom-vegas-shoes.jpg", label: "black and gold hand-painted sneakers" },
      { image: "assets/photos/custom-ferris-state-shoes.jpg", label: "red and gold college sneakers" },
      { image: "assets/photos/custom-ferris-state-shoes-close-up.jpg", label: "red and gold college sneakers, close-up" },
      { image: "assets/photos/custom-adidas-shoes.jpg", label: "blue striped sneakers with a paint splatter sole" },
      { image: "assets/photos/custom-adidas-shoes-2.jpg", label: "blue striped sneakers with a name on the heel" },
      { image: "assets/photos/custom-detroit-shoes.jpg", label: "Detroit high-tops in two colorways" },
      { image: "assets/photos/custom-tigers-shoes.jpg", label: "Detroit baseball sneakers" },
      { image: "assets/photos/custom-nikes.jpg", label: "lime and blue hand-painted sneakers" }
    ]
  },
  {
    category: "baby", caption: "Gia’s First Birthday Jacket", color: "blush",
    photos: [
      { image: "assets/photos/baby-jean-jacket-photo.jpg", label: "hand-painted baby jean jacket" },
      { image: "assets/photos/baby-jean-jacket.jpg", label: "hand-painted baby jean jacket" },
      { image: "assets/photos/custom-jean-jacket-and-shoes-kids.jpg", label: "hand-painted baby jean jacket with matching sneakers" }
    ]
  },
  {
    category: "shoes", caption: "Hand-Painted Lions Sneakers", color: "blue",
    photos: [
      { image: "assets/photos/lions-custom-shoes-123.jpg", label: "hand-painted Lions sneakers" },
      { image: "assets/photos/lions-custom-shoes-2.jpg", label: "hand-painted Lions sneakers" },
      { image: "assets/photos/custom-lions-shoes-2.jpg", label: "hand-painted Lions sneakers" },
      { image: "assets/photos/custom-lions-shoes-12.jpg", label: "hand-painted Lions sneakers with a splatter sole" },
      { image: "assets/photos/lions-custom-shoes-22.jpg", label: "hand-painted Lions sneakers, heel view" },
      { image: "assets/photos/lions-custom-shoes-14.jpg", label: "hand-painted Lions sneakers" },
      { image: "assets/photos/custom-lions-jordans.jpg", label: "hand-painted Lions sneakers" },
      { image: "assets/photos/custom-lions-nikes.jpg", label: "hand-painted Lions sneakers" }
    ]
  },
  {
    category: "apparel", caption: "Kids Hand-Painted Jean Jackets", color: "blue",
    photos: [
      { image: "assets/photos/custom-jean-jacket-kids-hand-painted.jpg", label: "kids hand-painted jean jacket" },
      { image: "assets/photos/custom-kids-hand-painted-jean-jacket-design.jpg", label: "kids hand-painted jean jacket" },
      { image: "assets/photos/kids-custom-jean-jacket.jpg", label: "kids hand-painted jean jacket" },
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
    category: "apparel", caption: "Concert Tour Jean Jacket", color: "blush",
    photos: [
      { image: "assets/photos/hand-painted-jean-jacket-taylor-swift-eras.jpg", label: "hand-painted concert tour jean jacket" },
      { image: "assets/photos/hand-painted-jean-jacket-eras-tour-taylor-swift-2.jpg", label: "hand-painted concert tour jean jacket" }
    ]
  },
  {
    category: "baby", caption: "Hand-Stitched Name Sweaters", color: "lime",
    photos: [
      { image: "assets/photos/baby-sweaters-hand-embroidered.jpg", label: "hand-stitched kids name sweater" },
      { image: "assets/photos/hand-stitched-baby-sweater-custom-name.jpg", label: "hand-stitched kids name sweater" },
      { image: "assets/photos/custom-baby-hand-stitched-sweater.jpg", label: "hand-stitched kids name sweater" },
      { image: "assets/photos/custom-kids-hand-stitched-sweater.jpg", label: "hand-stitched kids name sweater" },
      { image: "assets/photos/custom-hand-stitched-kids-sweater-letter-flower.jpg", label: "hand-stitched kids name sweater" },
      { image: "assets/photos/hand-stitched-kids-lions-sweater.jpg", label: "hand-stitched kids name sweater" }
    ]
  },
  {
    category: "team", caption: "Company Apparel", color: "navy",
    photos: [
      { image: "assets/photos/company-team-t-shirt.jpg", label: "Legacy company tees" },
      { image: "assets/photos/custom-bulk-apparel-company-custom-order.jpg", label: "River Village restaurant staff shirts" },
      { image: "assets/photos/custom-bulk-company-order.jpg", label: "electrical company hoodie and crewneck" },
      { image: "assets/photos/company-logo-embroidered-crewnecks-custom.jpg", label: "LMT Design embroidered crewnecks" }
    ]
  },
  {
    category: "shoes", caption: "Chicago Sneakers & Apparel", color: "orange",
    photos: [
      { image: "assets/photos/custom-chicago-shoes-nike.jpg", label: "custom Chicago sneakers" },
      { image: "assets/photos/custom-chicago-shoes-close-up.jpg", label: "custom Chicago sneakers" },
      { image: "assets/photos/custom-chicago-shoes-and-apparel.jpg", label: "custom Chicago sneakers" },
      { image: "assets/photos/custom-chicago-nikes.jpg", label: "custom Chicago hockey and basketball sneakers" },
      { image: "assets/photos/custom-order-shoes-and-apparel-2.jpg", label: "custom sneakers with matching apparel" }
    ]
  },
  {
    category: "baby", caption: "Baby Boxes", color: "blush",
    photos: [
      { image: "assets/photos/baby-box-custom-with-shoes.jpg", label: "custom baby box" },
      { image: "assets/photos/baby-box-2.jpg", label: "custom baby box" },
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
      { image: "assets/photos/bridal-bachelorette-tee-custom-bulk.jpg", label: "Bach Club bachelorette tees" }
    ]
  },
  {
    category: "apparel", caption: "Embroidered Superhero Tees", color: "blue",
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
    category: "apparel", caption: "Detroit Game Day Collection", color: "navy",
    photos: [
      { image: "assets/photos/lions-graphic-tee-vintage.jpg", label: "Detroit game day apparel" },
      { image: "assets/photos/detroit-embroidered-football-tee.jpg", label: "Detroit game day apparel" },
      { image: "assets/photos/eb1ba2f3-4c30-4912-a48d-3989e41b9429.jpg", label: "Detroit game day apparel" },
      { image: "assets/photos/detroit-lions-embroidered-tee.jpg", label: "Detroit game day apparel" },
      { image: "assets/photos/detroit-lions-tie-dye-vintage-tee.jpg", label: "Detroit game day apparel" },
      { image: "assets/photos/detroit-lions-tie-dye-crewnecks.jpg", label: "Detroit game day apparel" },
      { image: "assets/photos/lions-tee-blue-original.jpg", label: "Detroit game day apparel" },
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
    category: "shoes", caption: "Detroit Hockey High-Tops", color: "orange",
    photos: [
      { image: "assets/photos/custom-red-wings-high-top-shoes.jpg", label: "custom Detroit hockey high-top sneakers" },
      { image: "assets/photos/custom-red-wings-shoes-high-top.jpg", label: "custom Detroit hockey high-top sneakers" },
      { image: "assets/photos/custom-redwing-shoes.jpg", label: "custom Detroit hockey high-top sneakers" },
      { image: "assets/photos/custom-red-wings-high-tops.jpg", label: "custom Detroit hockey high-top sneakers" }
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
      { image: "assets/photos/custom-bridal-shoes-toms-2.jpg", label: "pearl bridal slip-ons with her new name" }
    ]
  },
  {
    category: "team", caption: "Coaches’ Quarter Zips", color: "navy",
    photos: [
      { image: "assets/photos/custom-team-gear.jpg", label: "embroidered coaches quarter zips" },
      { image: "assets/photos/coaches-bulk-team-apparel.jpg", label: "embroidered coaches quarter zips" }
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
    category: "team", caption: "Group Halloween Costume Shirts", color: "lime",
    photos: [
      { image: "assets/photos/halloween-shirts-disney-inside-out-photo.jpg", label: "matching group Halloween costume shirts" },
      { image: "assets/photos/custom-bulk-halloween-costumes-disney-inside-out.jpg", label: "matching group Halloween costume shirts" }
    ]
  },
  {
    category: "shoes", caption: "Kids Custom Sneakers", color: "blue",
    photos: [
      { image: "assets/photos/toy-story-custom-kids-shoes-nike-disney.jpg", label: "custom kids character sneakers" },
      { image: "assets/photos/custom-kids-shoes-disney-cars.jpg", label: "custom kids race car sneakers" },
      { image: "assets/photos/custom-baby-nike-shoes.jpg", label: "custom baby character sneakers" },
      { image: "assets/photos/custom-baby-shoes.jpg", label: "rainbow baby sneakers" },
      { image: "assets/photos/custom-kids-vans.jpg", label: "checkered kids slip-ons with a name and number" },
      { image: "assets/photos/minnie-mouse-disney-shoe-kids-custom.jpg", label: "pink polka dot kids sneakers" },
      { image: "assets/photos/minnie-mouse-kids-disney-shoe.jpg", label: "pink polka dot kids sneakers" },
      { image: "assets/photos/kids-custom-shoes-disney-minnie-mouse.jpg", label: "pink polka dot kids sneakers with a name" }
    ]
  },
  {
    category: "shoes", caption: "Team Sneakers & Crewnecks", color: "lime",
    photos: [
      { image: "assets/photos/custom-team-shoes-and-crewnecks.jpg", label: "custom team sneakers and crewnecks" },
      { image: "assets/photos/custom-team-shoes-nike.jpg", label: "custom team sneakers and crewnecks" }
    ]
  },
  {
    category: "apparel", caption: "Embroidered Hoodies", color: "lime",
    photos: [
      { image: "assets/photos/embroidered-hoodies.jpg", label: "embroidered sun and sunflower hoodies" },
      { image: "assets/photos/sunflower-embroidered-hoodie.jpg", label: "embroidered sunflower hoodie" },
      { image: "assets/photos/sunshine-embroidered-hoodie.jpg", label: "embroidered sunshine hoodie" }
    ]
  },
  {
    category: "wedding", caption: "Wedding & Party Favors", color: "navy",
    photos: [
      { image: "assets/photos/custom-wedding-coozies-bulk.jpg", label: "custom wedding koozie favors" },
      { image: "assets/photos/dscf6663.jpg", label: "custom wedding koozie favors" },
      { image: "assets/photos/groomsmen-coozies.jpg", label: "custom party koozie favors" }
    ]
  },
  {
    category: "gifts", caption: "Engraved Tumblers", color: "orange",
    photos: [
      { image: "assets/photos/custom-bulk-order-tumblers-team-crewnecks-team.jpg", label: "engraved tumblers" },
      { image: "assets/photos/custom-team-engraved-bulk-tumblers.jpg", label: "engraved tumblers" },
      { image: "assets/photos/engraved-mug-red-wings-or-team.jpg", label: "engraved tumblers" },
      { image: "assets/photos/custom-engraved-company-logo.jpg", label: "engraved tumblers" }
    ]
  },
  {
    category: "team", caption: "Golf Trip Shirts", color: "lime",
    photos: [
      { image: "assets/photos/bulk-order-custom-golf-trip-event.jpg", label: "custom golf trip shirts" },
      { image: "assets/photos/custom-jerseys.jpg", label: "custom golf trip shirts" }
    ]
  },
  {
    category: "gifts", caption: "Embroidered Name & Initial Totes", color: "blush",
    photos: [
      { image: "assets/photos/custom-embroidered-name-tote-bag.jpg", label: "embroidered name tote bag" },
      { image: "assets/photos/custom-tote-bag-name.jpg", label: "embroidered name tote bag" },
      { image: "assets/photos/embroidered-initial-tote-bag.jpg", label: "embroidered name tote bag" },
      { image: "assets/photos/initial-tote-bag-custom-embroidery.jpg", label: "embroidered name tote bag" }
    ]
  },
  {
    category: "shoes", caption: "Custom Cleats", color: "blue",
    photos: [
      { image: "assets/photos/custom-cleats.jpg", label: "custom football cleats" },
      { image: "assets/photos/custom-cleats-3.jpg", label: "custom football cleats" },
      { image: "assets/photos/custom-cleats-2.jpg", label: "custom blue football cleats with a number" }
    ]
  },
  {
    category: "team", caption: "Team Crewnecks", color: "navy",
    photos: [
      { image: "assets/photos/custom-team-crewnecks-team-specific.jpg", label: "custom team crewnecks" },
      { image: "assets/photos/custom-embroidered-crewnecks-team-specific.jpg", label: "custom team crewnecks" },
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
      { image: "assets/photos/custom-t-shirt-example.jpg", label: "embroidered crewnecks and tees" },
      { image: "assets/photos/book-t-shirt.jpg", label: "embroidered crewnecks and tees" }
    ]
  },
  {
    category: "team", caption: "Detroit Hockey Shoes & Crewnecks", color: "orange",
    photos: [
      { image: "assets/photos/custom-detroit-red-wings-shoes-and-crewnecks.jpg", label: "Detroit hockey sneakers and crewnecks" },
      { image: "assets/photos/red-wings-team-apparel.jpg", label: "Detroit hockey sneakers and crewnecks" },
      { image: "assets/photos/custom-detroit-red-wings-shoes-and-crew.jpg", label: "Detroit hockey sneakers and crewnecks" }
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
    category: "gifts", caption: "Personalized Blankets", color: "blue",
    photos: [
      { image: "assets/photos/embroidered-blanket-name.jpg", label: "embroidered personalized blanket" },
      { image: "assets/photos/custom-embroidered-blanket-company-gift.jpg", label: "embroidered personalized blanket" }
    ]
  },
  {
    category: "gifts", caption: "Birthday Fanny Packs & Totes", color: "lime",
    photos: [
      { image: "assets/photos/custom-fanny-pack-birthday-event-bulk.jpg", label: "custom birthday fanny packs and totes" },
      { image: "assets/photos/custom-bags-bulk-birthday-event.jpg", label: "custom birthday fanny packs and totes" }
    ]
  }
];

(function () {
  "use strict";
  var Site = window.Site;
  var grid = document.querySelector("[data-gallery-grid]");
  if (!grid) return;

  var FEATURED = window.FEATURED_WORK || [];
  var ITEMS = window.GALLERY_ITEMS;
  var ALL = FEATURED.concat(ITEMS); // the slideshow can open either kind
  var filterNames = {};
  window.GALLERY_FILTERS.forEach(function (f) { filterNames[f.id] = f.label; });

  function photoHTML(item, photo, shape, thumb) {
    return Site.media({ image: photo.image, label: photo.label, alt: item.caption + ": " + photo.label, color: item.color, shape: shape, thumb: thumb });
  }
  var FIRST_SHOWN = 16; // how many tiles show before "See all work"
  var showAll = false;

  /* ---------- Featured Work cards ---------- */
  var featuredBox = document.querySelector("[data-featured-work]");
  if (featuredBox) {
    featuredBox.innerHTML = FEATURED.map(function (item, i) {
      return (
        '<article class="featured-card">' +
          '<button class="gallery-item__open" type="button" data-open="' + i + '" aria-label="View photos: ' + Site.escape(item.caption) + '">' +
            photoHTML(item, item.photos[0], "portrait", true) +
            '<span class="featured-card__name">' + Site.escape(item.name) + "</span>" +
          "</button>" +
          '<div class="featured-card__body">' +
            "<h3>" + Site.escape(item.caption) + "</h3>" +
            "<p>" + Site.escape(item.story) + "</p>" +
            '<button class="btn btn--primary btn--small" type="button" data-open="' + i + '">See the project</button>' +
          "</div>" +
        "</article>"
      );
    }).join("");
  }

  /* ---------- Draw the gallery tiles ---------- */
  grid.innerHTML = ITEMS.map(function (item, i) {
    var count = item.photos.length;
    return (
      '<article class="gallery-item" data-category="' + Site.escape(item.category) + '">' +
        '<button class="gallery-item__open" type="button" data-open="' + (i + FEATURED.length) + '" aria-label="View larger: ' + Site.escape(item.caption) + '">' +
          photoHTML(item, item.photos[0], "square", true) +
          (count > 1 ? '<span class="gallery-item__count">' + count + " photos</span>" : "") +
        "</button>" +
        '<p class="gallery-item__caption">' + Site.escape(item.caption) + "</p>" +
        '<p class="gallery-item__cat">' + Site.escape(filterNames[item.category] || item.category) + "</p>" +
        // "See more" only appears when there's more than one photo
        (count > 1 ? '<button class="btn btn--outline btn--small gallery-item__more" type="button" data-open="' + (i + FEATURED.length) + '">See more</button>' : "") +
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

  function openSlideshow(e) {
    var opener = e.target.closest("[data-open]");
    if (!opener) return;
    current = ALL[Number(opener.getAttribute("data-open"))];
    index = 0;
    render();
    box.showModal();
  }
  grid.addEventListener("click", openSlideshow);
  if (featuredBox) featuredBox.addEventListener("click", openSlideshow);
  // Swipe left/right on phones and tablets to change photos
  var touchX = null;
  media.addEventListener("touchstart", function (e) { touchX = e.touches[0].clientX; }, { passive: true });
  media.addEventListener("touchend", function (e) {
    if (touchX === null) return;
    var dx = e.changedTouches[0].clientX - touchX;
    if (Math.abs(dx) > 40) step(dx < 0 ? 1 : -1);
    touchX = null;
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
