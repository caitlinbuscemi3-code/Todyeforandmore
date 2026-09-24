/* =====================================================================
   GALLERY — past work shown on gallery.html
   ---------------------------------------------------------------------
   Each { ... } block is one gallery tile. A tile can hold ONE photo or
   SEVERAL. When it has more than one, a "See more" button appears that
   opens a slideshow of all of them.

   To ADD a tile: copy one whole { ... }, block, paste it, and edit it.
   To ADD a photo to a tile: copy one { image: ..., label: ... }, line
   inside its "photos" list.

   Fields:
     category – shoes, apparel, team, wedding, baby, pets, or gifts
                (must match a filter id in GALLERY_FILTERS)
     caption  – title shown under the photo
     color    – placeholder color: blush, blue, lime, navy, orange
     photos   – list of photos. For each one:
                  image – path to your photo, e.g. "assets/images/gallery/jacket-1.jpg"
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
    category: "shoes", caption: "Hand-Painted Floral Sneakers", color: "blush",
    photos: [
      { image: "", label: "hand-painted floral sneakers, side view" },
      { image: "", label: "hand-painted floral sneakers, close-up of details" },
      { image: "", label: "hand-painted floral sneakers, top view" }
    ]
  },
  {
    category: "apparel", caption: "Hand-Painted Jean Jacket", color: "blue",
    photos: [
      { image: "", label: "custom painted jean jacket, back view" },
      { image: "", label: "custom painted jean jacket, front view" }
    ]
  },
  {
    category: "team", caption: "Team Crewnecks", color: "lime",
    photos: [
      { image: "", label: "team crewneck sweatshirts, front" },
      { image: "", label: "team wearing matching crewnecks" },
      { image: "", label: "team crewneck, close-up of lettering" }
    ]
  },
  {
    category: "shoes", caption: "Hand-Painted Team Sneakers", color: "navy",
    photos: [
      { image: "", label: "hand-painted sneakers in team colors" },
      { image: "", label: "team sneakers with player number on heel" },
      { image: "", label: "full team's set of painted sneakers" }
    ]
  },
  {
    category: "baby", caption: "Baby Boxes", color: "blush",
    photos: [
      { image: "", label: "personalized baby gift box, open" },
      { image: "", label: "baby box contents laid out" },
      { image: "", label: "baby box with name on the lid" }
    ]
  },
  {
    category: "apparel", caption: "Beaded Embroidery", color: "orange",
    photos: [
      { image: "", label: "beaded embroidery on a sweatshirt" },
      { image: "", label: "beaded embroidery, close-up of beadwork" },
      { image: "", label: "beaded embroidery on a denim jacket" }
    ]
  },
  {
    category: "wedding", caption: "Bridal Party Apparel", color: "blush",
    photos: [
      { image: "", label: "bridal party in matching apparel" },
      { image: "", label: "bridesmaid robes laid out" },
      { image: "", label: "bride and bridal party shirts" }
    ]
  },
  {
    category: "apparel", caption: "Sports Jean Jacket", color: "navy",
    photos: [
      { image: "", label: "sports-themed painted jean jacket, back view" },
      { image: "", label: "sports jean jacket, close-up of painted details" }
    ]
  },
  {
    category: "shoes", caption: "Hand-Painted Kids Shoes", color: "lime",
    photos: [
      { image: "", label: "hand-painted kids sneakers" },
      { image: "", label: "child wearing painted shoes" }
    ]
  },
  {
    category: "baby", caption: "Hand-Knit Baby Sweaters", color: "blue",
    photos: [
      { image: "", label: "hand-knit baby sweater, front" },
      { image: "", label: "baby wearing a hand-knit sweater" },
      { image: "", label: "stack of hand-knit baby sweaters" }
    ]
  },
  {
    category: "apparel", caption: "Teacher Jean Jacket", color: "orange",
    photos: [
      { image: "", label: "teacher-themed painted jean jacket, back view" },
      { image: "", label: "teacher jean jacket, close-up of details" }
    ]
  },
  {
    category: "team", caption: "Company Quarter Zips", color: "blue",
    photos: [
      { image: "", label: "embroidered company quarter-zip pullovers" },
      { image: "", label: "quarter zip, close-up of embroidered logo" }
    ]
  },
  {
    category: "pets", caption: "Pet Portrait Sweatshirt", color: "navy",
    photos: [
      { image: "", label: "sweatshirt with pet portrait" },
      { image: "", label: "pet portrait sweatshirt next to the pet" }
    ]
  },
  {
    category: "shoes", caption: "Hand-Painted Bridal Shoes", color: "blush",
    photos: [
      { image: "", label: "hand-painted bridal sneakers" },
      { image: "", label: "bridal shoes, close-up of painted details" }
    ]
  },
  {
    category: "wedding", caption: "\"Mrs.\" Jean Jacket", color: "blue",
    photos: [
      { image: "", label: "bride jean jacket with painted back" },
      { image: "", label: "bride wearing her Mrs. jacket" }
    ]
  },
  {
    category: "apparel", caption: "Graphic Tees", color: "lime",
    photos: [
      { image: "", label: "graphic t-shirts" },
      { image: "", label: "graphic tee, close-up of design" },
      { image: "", label: "stack of graphic tees" }
    ]
  },
  {
    category: "gifts", caption: "Personalized Tumbler Set", color: "orange",
    photos: [
      { image: "", label: "set of personalized tumblers" }
    ]
  },
  {
    category: "gifts", caption: "Holiday Stockings", color: "navy",
    photos: [
      { image: "", label: "row of personalized holiday stockings" },
      { image: "", label: "personalized stocking, close-up of name" }
    ]
  },
  {
    category: "gifts", caption: "Personalized Blanket", color: "lime",
    photos: [
      { image: "", label: "personalized blanket" }
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
    return Site.media({ image: photo.image, label: photo.label, alt: item.caption, color: item.color, shape: shape });
  }

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
  filters.addEventListener("click", function (e) {
    var btn = e.target.closest("[data-filter]");
    if (!btn) return;
    var cat = btn.getAttribute("data-filter");
    filters.querySelectorAll("[data-filter]").forEach(function (b) { b.setAttribute("aria-pressed", String(b === btn)); });
    grid.querySelectorAll(".gallery-item").forEach(function (tile) {
      tile.hidden = cat !== "all" && tile.getAttribute("data-category") !== cat;
    });
  });

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
