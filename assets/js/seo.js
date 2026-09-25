/* =====================================================================
   SEO — behind-the-scenes info that helps Google understand the site
   ---------------------------------------------------------------------
   You normally don't need to edit this file. It reads your business
   details from assets/js/config.js and adds, on every page:

     1. A "main address" tag (canonical link), so Google treats
        shop.html and shop.html?cat=gifts as the same page.
     2. Business details Google can read (name, area served, email,
        social accounts), added on the Home and About pages.
     3. On the FAQ page, the questions and answers in a format search
        engines and AI assistants can read, built from the page itself,
        so adding a question to faq.html is all you need to do.

   Your web address comes from config.js → siteUrl. Until you set it,
   the address the page was opened from is used.
   ===================================================================== */

(function () {
  "use strict";
  var CONFIG = window.SITE_CONFIG || {};
  var contact = CONFIG.contact || {};
  var social = CONFIG.social || {};

  // The site's home address, without a trailing slash
  var base = (CONFIG.siteUrl || "").replace(/\/+$/, "");
  if (!base) {
    if (!/^https?:$/.test(location.protocol)) return; // opened as a file on a computer: nothing to do
    base = location.origin + location.pathname.replace(/[^/]*$/, "").replace(/\/+$/, "");
  }
  var page = location.pathname.split("/").pop() || "index.html";
  var pageUrl = base + "/" + (page === "index.html" ? "" : page); // no ?item= or #section

  function addToHead(tag, attrs, text) {
    var el = document.createElement(tag);
    Object.keys(attrs).forEach(function (k) { el.setAttribute(k, attrs[k]); });
    if (text) el.textContent = text;
    document.head.appendChild(el);
    return el;
  }
  function absolute(path) { return base + "/" + String(path).replace(/^\/+/, ""); }
  function addData(data) {
    addToHead("script", { type: "application/ld+json" }, JSON.stringify(data));
  }

  /* ---------- 1. Main address for this page ---------- */
  if (!document.querySelector('link[rel="canonical"]')) addToHead("link", { rel: "canonical", href: pageUrl });
  if (!document.querySelector('meta[property="og:url"]')) addToHead("meta", { property: "og:url", content: pageUrl });

  /* ---------- 2. Business details (Home & About) ---------- */
  if (page === "index.html" || page === "about.html") {
    var business = {
      "@context": "https://schema.org",
      "@type": "LocalBusiness",
      "@id": base + "/#business",
      name: CONFIG.businessName,
      slogan: CONFIG.tagline,
      description: "Custom hand-painted shoes, printed and embroidered apparel, team and bulk orders, and personalized gifts, handmade in Metro Detroit.",
      url: base + "/",
      logo: absolute((CONFIG.logo || {}).src || ""),
      image: absolute("assets/photos/og-preview.jpg"),
      email: contact.email || undefined,
      telephone: contact.phone || undefined,
      foundingDate: CONFIG.foundedYear ? String(CONFIG.foundedYear) : undefined,
      founder: { "@type": "Person", name: "Caitlin" },
      areaServed: { "@type": "Place", name: contact.location || "Metro Detroit, MI" },
      address: { "@type": "PostalAddress", addressRegion: "MI", addressCountry: "US" },
      sameAs: ["instagram", "facebook", "tiktok", "pinterest"]
        .map(function (k) { return social[k]; })
        .filter(Boolean)
    };
    addData(business);
  }

  /* ---------- 3. FAQ questions & answers (FAQ page) ---------- */
  if (page === "faq.html") {
    // Runs after layout.js, so config values (deposit %, shipping price) are already filled in
    var questions = Array.prototype.map.call(document.querySelectorAll("details.faq"), function (item) {
      var q = item.querySelector("summary");
      var a = item.querySelector(".faq__answer");
      if (!q || !a) return null;
      return {
        "@type": "Question",
        name: q.textContent.replace(/\s+/g, " ").trim(),
        acceptedAnswer: { "@type": "Answer", text: a.textContent.replace(/\s+/g, " ").trim() }
      };
    }).filter(Boolean);
    if (questions.length) {
      addData({ "@context": "https://schema.org", "@type": "FAQPage", mainEntity: questions });
    }
  }
})();
