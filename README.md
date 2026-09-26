# To Dye For and More: Website

A multi-page website for custom apparel, shoes, team gear, and gifts. It's built with plain HTML, CSS, and JavaScript, so there's nothing to install and no build step. Upload the folder to any web host and it works.

## Pages

| File | Page |
|---|---|
| `index.html` | Home: hero, shop-by-category, best sellers, "how custom orders work" |
| `shop.html` | Shop: ready-made items (Buy Now → Square payment link) and made-to-order items (Request Custom) |
| `thank-you.html` | Where customers land after paying on Square |
| `custom-orders.html` | Shoes, apparel, baby sweaters & baby boxes + custom request form |
| `team-orders.html` | Team/bulk use cases + team quote form |
| `gallery.html` | Filterable gallery of past work with "See more" slideshows |
| `about.html` | Brand story, mission, meet the maker |
| `contact.html` | Contact form, contact info, social links |
| `faq.html` | FAQ & Policies (linked in the footer, Shop, and order forms) |
| `reviews.html` | Leave a Review form (approved reviews show on the Home page) |
| `wedding.html` | Weddings: bridal shoes, bridal party apparel, favors, gifts, and when to order |
| `privacy.html` | Privacy Policy & Terms of Sale (linked in the footer) |

## Where to change things

| I want to change… | Edit this file |
|---|---|
| **Colors & fonts** | `assets/css/styles.css`, the **BRAND SETTINGS** block at the top |
| **Logo** | Logo files are in `assets/photos/` (`tdf-primary-*.png`, `tdf-favicon.png`). Choose which ones are used in `logo` in `assets/js/config.js` |
| **Business name, tagline, email, phone, social links** | `assets/js/config.js` |
| **Shop products & prices** (and whether each item is ready to buy or custom only) | `assets/js/products.js` |
| **Gallery photos** | `assets/js/gallery.js` |
| **Shipping cost, tax, deposit %, turnaround times** | `assets/js/config.js` |
| **Apparel sizes & the 2X–4X upcharge** | `assets/js/config.js` (under `shop`) |
| **Page wording** | The page's `.html` file |
| **Browser-tab title / Google description** | `<title>` and `<meta name="description">` at the top of each `.html` file |

### Photos
All photos and logos live in `assets/photos/`. They're already resized, compressed and rotated upright for the web. Items without a photo yet show a **"Coming soon"** box.

To add a new photo, resize it to about 1200px on the long side first (phones take huge photos that slow the site down).

Cards and gallery tiles load a smaller copy of each photo from `assets/photos/thumbs/` (same file name, about 640px) so pages load fast. When you add a photo that appears in a card or gallery tile, save a small copy there too. The link-preview image for sharing is `assets/photos/og-preview.jpg`.

- **Shop products**: set the `image` field to your photo path, e.g. `image: "assets/photos/booked-tote-bag.jpg"`.
- **Gallery**: each tile has a `photos` list. Set each photo's `image` field, and add more lines to a tile's list to grow its "See more" slideshow.
- **Photos written directly in a page**: replace the placeholder
  ```html
  <div class="ph ph--teal ph--square" role="img" aria-label="[Photo: custom painted jean jacket]">[Photo: custom painted jean jacket]</div>
  ```
  with
  ```html
  <img class="media-img" src="assets/photos/jean-jacket.jpg" alt="Hand-painted floral jean jacket">
  ```

## Customer reviews

1. Customers submit reviews on the **Leave a Review** page (`reviews.html`, linked in the footer and on the order confirmation).
2. Reviews arrive in your email through Formspree (`forms.review` in `assets/js/config.js`).
3. To show a review, add it to `assets/js/reviews.js` (there's a copy-and-paste example at the top of that file).
4. Approved reviews rotate on the Home page. The section stays hidden until the first review is added.

## Things to connect later

**Step-by-step instructions are in [SETUP.md](SETUP.md)**: forms (Formspree), payments (Square), shipping (Shippo), and a launch checklist.

1. **Form emails.** All five forms are connected to [Formspree](https://formspree.io) (the addresses are in `forms` in `assets/js/config.js`). They validate input and show a thank-you message.
2. **Payments.** Ready-to-buy items are paid through **Square payment links**. Paste each item's link into `squareLink` in `assets/js/products.js`; items without a link show "Coming soon." See SETUP.md.

## Search engines (SEO)

Already built in: page titles and descriptions written with the words people search for, business details Google can read (from `config.js`, added by `assets/js/seo.js`), FAQ questions in a search-readable format, a "main address" tag on every page, and the thank-you page kept out of search results.

Once the site is live on your own domain:

1. Put your address in `siteUrl` in `assets/js/config.js`, e.g. `"https://www.todyeforandmore.com"`.
2. In `sitemap.xml`, find and replace `https://www.YOUR-DOMAIN.com` with the same address.
3. In `robots.txt`, do the same on the `Sitemap:` line and remove the `#` in front of it.
4. Add the site to [Google Search Console](https://search.google.com/search-console) and submit `sitemap.xml`.
5. Create a free [Google Business Profile](https://www.google.com/business/) (you can list Metro Detroit as a service area without showing an address) and link it to the site.

If you add a new page, add it to `sitemap.xml` and include `<script src="assets/js/seo.js"></script>` after `layout.js`, like the other pages.

## Previewing on your computer
Double-click `index.html` to open it in your browser. Or, for the most accurate preview, run `python3 -m http.server` in this folder and visit http://localhost:8000.

## Hosting
Free options include **Netlify** (drag and drop the folder), **GitHub Pages**, or **Cloudflare Pages**.
