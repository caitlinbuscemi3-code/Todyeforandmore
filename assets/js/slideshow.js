/* =====================================================================
   SLIDESHOW — swipeable photo slideshows placed right on a page
   ---------------------------------------------------------------------
   Same look and feel as the gallery slideshow: round arrow buttons,
   a photo counter, swipe on phones, and arrow keys.

   To use one, put photos inside a box with data-slideshow:

     <div class="slideshow" data-slideshow aria-label="Custom shoes">
       <img src="assets/photos/one.jpg" alt="Describe photo one">
       <img src="assets/photos/two.jpg" alt="Describe photo two">
     </div>

   To add a photo, add another <img> line. The first photo shows first.
   ===================================================================== */

(function () {
  "use strict";
  var Site = window.Site;

  document.querySelectorAll("[data-slideshow]").forEach(function (box) {
    var slides = Array.prototype.slice.call(box.querySelectorAll("img"));
    if (!slides.length) return;
    box.setAttribute("role", "group");
    box.setAttribute("aria-roledescription", "slideshow");
    box.tabIndex = 0;
    slides.forEach(function (img, i) {
      img.classList.add("slideshow__slide");
      if (i > 0) img.loading = "lazy";
      // Hold back photos further along so the page doesn't download them all at once.
      // Each one loads just before it's shown (see loadNear below).
      if (i > 1 && img.getAttribute("src")) {
        img.setAttribute("data-src", img.getAttribute("src"));
        img.removeAttribute("src");
      }
    });
    if (slides.length < 2) { slides[0].classList.add("is-active"); return; }

    box.insertAdjacentHTML("beforeend",
      '<button class="lightbox__nav lightbox__nav--prev" type="button" aria-label="Previous photo">' + Site.icon("prev") + "</button>" +
      '<button class="lightbox__nav lightbox__nav--next" type="button" aria-label="Next photo">' + Site.icon("next") + "</button>" +
      '<span class="slideshow__count" aria-live="polite"></span>');
    var count = box.querySelector(".slideshow__count");
    var current = 0;

    // Load the photo being shown plus the ones on either side of it
    function loadNear(n) {
      [n - 1, n, n + 1].forEach(function (k) {
        var img = slides[(k + slides.length) % slides.length];
        var src = img.getAttribute("data-src");
        if (src) { img.setAttribute("src", src); img.removeAttribute("data-src"); }
      });
    }

    function show(n) {
      current = (n + slides.length) % slides.length;
      loadNear(current);
      slides.forEach(function (img, i) {
        img.classList.toggle("is-active", i === current);
        img.setAttribute("aria-hidden", String(i !== current));
      });
      count.textContent = (current + 1) + " of " + slides.length;
    }
    box.querySelector(".lightbox__nav--prev").addEventListener("click", function () { show(current - 1); });
    box.querySelector(".lightbox__nav--next").addEventListener("click", function () { show(current + 1); });
    box.addEventListener("keydown", function (e) {
      if (e.key === "ArrowLeft") show(current - 1);
      if (e.key === "ArrowRight") show(current + 1);
    });
    // Swipe left/right on phones and tablets
    var touchX = null;
    box.addEventListener("touchstart", function (e) { touchX = e.touches[0].clientX; }, { passive: true });
    box.addEventListener("touchend", function (e) {
      if (touchX === null) return;
      var dx = e.changedTouches[0].clientX - touchX;
      if (Math.abs(dx) > 40) show(current + (dx < 0 ? 1 : -1));
      touchX = null;
    });
    show(0);
  });
})();
