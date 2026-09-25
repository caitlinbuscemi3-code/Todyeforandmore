/* =====================================================================
   CUSTOMER REVIEWS — the approved reviews shown on the Home page
   ---------------------------------------------------------------------
   How it works:
     1. A customer fills out the "Leave a Review" form (reviews.html).
     2. The review arrives in your email (once the form service is
        connected in config.js → forms.review).
     3. If you'd like to show it, copy the example block below, paste
        it inside the [ ] list, and fill in their details.
     4. Save. The review now rotates on the Home page.

   The Home page section stays hidden until at least one review is
   listed here, so the site never shows an empty section.

   Fields:
     name  – how their name should appear, e.g. "Sarah M."
     item  – what they ordered, e.g. "Custom hand-painted sneakers"
     text  – their review, in their own words
     photo – optional: "assets/photos/your-photo.jpg" (leave "" for none)

   Example block to copy (remove the // at the start of each line):
   // {
   //   name: "Sarah M.",
   //   item: "Hand-stitched name sweater",
   //   text: "Paste their review here, word for word.",
   //   photo: ""
   // },
   ===================================================================== */

window.REVIEWS = [
  // Paste approved reviews here (see the example above)
];

(function () {
  "use strict";
  var Site = window.Site;
  var box = document.querySelector("[data-reviews]");
  var reviews = (window.REVIEWS || []).filter(function (r) { return r && r.text; });
  if (!box || !reviews.length) return; // nothing approved yet: keep the section hidden

  var section = box.closest("[data-reviews-section]");
  if (section) section.hidden = false;

  box.innerHTML =
    '<div class="reviews__stage" aria-live="polite">' +
      reviews.map(function (r, i) {
        return (
          '<figure class="review' + (i === 0 ? " is-active" : "") + '"' + (i === 0 ? "" : ' aria-hidden="true"') + ">" +
            (r.photo ? '<img class="review__photo" src="' + Site.escape(r.photo) + '" alt="" loading="lazy">' : "") +
            '<blockquote class="review__text">“' + Site.escape(r.text) + "”</blockquote>" +
            '<figcaption class="review__by"><strong>' + Site.escape(r.name || "A happy customer") + "</strong>" +
              (r.item ? '<span class="review__item">' + Site.escape(r.item) + "</span>" : "") +
            "</figcaption>" +
          "</figure>"
        );
      }).join("") +
    "</div>" +
    (reviews.length > 1
      ? '<div class="reviews__dots" role="group" aria-label="Choose a review">' + reviews.map(function (r, i) {
          return '<button type="button" class="reviews__dot" aria-label="Show review ' + (i + 1) + '" aria-pressed="' + (i === 0) + '" data-review="' + i + '"></button>';
        }).join("") + "</div>"
      : "");

  if (reviews.length < 2) return;

  // Fade from one review to the next every few seconds (pauses while hovering or focused)
  var slides = box.querySelectorAll(".review");
  var dots = box.querySelectorAll(".reviews__dot");
  var current = 0, timer = null, paused = false;
  function show(n) {
    current = (n + slides.length) % slides.length;
    slides.forEach(function (s, i) {
      s.classList.toggle("is-active", i === current);
      if (i === current) s.removeAttribute("aria-hidden"); else s.setAttribute("aria-hidden", "true");
    });
    dots.forEach(function (d, i) { d.setAttribute("aria-pressed", String(i === current)); });
  }
  function start() { stop(); timer = setInterval(function () { if (!paused) show(current + 1); }, 6500); }
  function stop() { if (timer) clearInterval(timer); }
  box.addEventListener("click", function (e) {
    var dot = e.target.closest("[data-review]");
    if (!dot) return;
    show(Number(dot.getAttribute("data-review")));
    start();
  });
  box.addEventListener("mouseenter", function () { paused = true; });
  box.addEventListener("mouseleave", function () { paused = false; });
  box.addEventListener("focusin", function () { paused = true; });
  box.addEventListener("focusout", function () { paused = false; });
  if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) start();
})();
