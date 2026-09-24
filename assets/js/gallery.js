/* =====================================================================
   GALLERY — past work shown on gallery.html
   ---------------------------------------------------------------------
   To ADD a photo: copy one { ... }, line, paste it, and edit it.
   Newest work at the top is a nice touch!

   Fields:
     category – shoes, apparel, gifts, team, wedding, or pets
                (must match a filter id in GALLERY_FILTERS)
     caption  – short description shown under the photo
     image    – path to your photo, e.g. "assets/images/gallery/jacket-1.jpg"
                Leave "" to show a placeholder box.
     label    – what the placeholder says (the photo you need to add)
     color    – placeholder color: pink, teal, yellow, purple, orange
   ===================================================================== */

window.GALLERY_FILTERS = [
  { id: "all",     label: "All Work" },
  { id: "shoes",   label: "Shoes" },
  { id: "apparel", label: "Apparel" },
  { id: "team",    label: "Team & Groups" },
  { id: "wedding", label: "Wedding" },
  { id: "pets",    label: "Pets" },
  { id: "gifts",   label: "Gifts" }
];

window.GALLERY_ITEMS = [
  { category: "shoes",   caption: "Hand-painted floral sneakers",         image: "", label: "hand-painted floral sneakers",        color: "pink" },
  { category: "apparel", caption: "Hand-painted jean jacket",             image: "", label: "custom painted jean jacket",          color: "teal" },
  { category: "team",    caption: "Appliqué team crewnecks",              image: "", label: "appliqué team crewneck sweatshirts",  color: "yellow" },
  { category: "pets",    caption: "Pet portrait sweatshirt",              image: "", label: "sweatshirt with embroidered pet portrait", color: "purple" },
  { category: "wedding", caption: "Bridal party robes & tees",            image: "", label: "bridal party robes",                  color: "pink" },
  { category: "gifts",   caption: "Personalized tumbler set",             image: "", label: "set of personalized tumblers",        color: "orange" },
  { category: "shoes",   caption: "Team colors custom high-tops",         image: "", label: "custom team color high-top sneakers", color: "teal" },
  { category: "apparel", caption: "Embroidered monogram hoodie",          image: "", label: "embroidered monogram hoodie",         color: "yellow" },
  { category: "team",    caption: "Company quarter-zips",                 image: "", label: "embroidered company quarter-zip pullovers", color: "purple" },
  { category: "wedding", caption: "\"Mrs.\" jean jacket",                 image: "", label: "bride jean jacket with painted back",  color: "teal" },
  { category: "gifts",   caption: "Holiday stockings for the whole family", image: "", label: "row of personalized holiday stockings", color: "orange" },
  { category: "pets",    caption: "Matching pet & owner sweatshirts",     image: "", label: "matching pet and owner sweatshirts",  color: "pink" },
  { category: "team",    caption: "Softball team bag tags",               image: "", label: "softball team bag tags",              color: "teal" },
  { category: "apparel", caption: "HTV graphic tees",                     image: "", label: "HTV vinyl graphic t-shirts",          color: "orange" },
  { category: "shoes",   caption: "Wedding sneakers for the bride",       image: "", label: "white bridal sneakers with pearls",   color: "purple" },
  { category: "gifts",   caption: "Custom sherpa blanket",                image: "", label: "personalized sherpa blanket",         color: "yellow" }
];

(function () {
  "use strict";
  var Site = window.Site;
  var grid = document.querySelector("[data-gallery-grid]");
  if (!grid) return;

  var filterNames = {};
  window.GALLERY_FILTERS.forEach(function (f) { filterNames[f.id] = f.label; });

  // Draw the gallery tiles
  grid.innerHTML = window.GALLERY_ITEMS.map(function (item, i) {
    return (
      '<button class="gallery-item" type="button" data-index="' + i + '" data-category="' + Site.escape(item.category) + '" aria-label="View larger: ' + Site.escape(item.caption) + '">' +
        Site.media({ image: item.image, label: item.label, alt: item.caption, color: item.color, shape: "square" }) +
        '<p class="gallery-item__caption">' + Site.escape(item.caption) + "</p>" +
        '<p class="gallery-item__cat">' + Site.escape(filterNames[item.category] || item.category) + "</p>" +
      "</button>"
    );
  }).join("");

  // Filter chips
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

  // Click a tile → open a bigger view (the "lightbox")
  var box = document.querySelector("[data-lightbox]");
  if (!box || typeof box.showModal !== "function") return;
  var media = box.querySelector("[data-lightbox-media]");
  var caption = box.querySelector("[data-lightbox-caption]");

  grid.addEventListener("click", function (e) {
    var tile = e.target.closest(".gallery-item");
    if (!tile) return;
    var item = window.GALLERY_ITEMS[Number(tile.getAttribute("data-index"))];
    media.innerHTML = Site.media({ image: item.image, label: item.label, alt: item.caption, color: item.color });
    caption.textContent = item.caption;
    box.showModal();
  });
  box.querySelector("[data-lightbox-close]").addEventListener("click", function () { box.close(); });
  box.addEventListener("click", function (e) { if (e.target === box) box.close(); }); // click outside to close
})();
