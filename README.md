# To Dye For and More: Website

A multi-page website for custom apparel, shoes, team gear, and gifts. It's built with plain HTML, CSS, and JavaScript, so there's nothing to install and no build step. Upload the folder to any web host and it works.

## Pages

| File | Page |
|---|---|
| `index.html` | Home: hero, shop-by-category, best sellers, "how custom orders work" |
| `shop.html` | Shop: ready-made items (Add to Cart, with style/size options) and made-to-order items (Request Custom) |
| `cart.html` | Cart → checkout → confirmation (payment is in demo mode) |
| `custom-orders.html` | Shoes, apparel, baby sweaters & baby boxes + custom request form |
| `team-orders.html` | Team/bulk use cases + team quote form |
| `gallery.html` | Filterable gallery of past work with "See more" slideshows |
| `about.html` | Brand story, mission, meet the maker |
| `contact.html` | Contact form, contact info, social links |
| `faq.html` | FAQ & Policies (linked in the footer, checkout, and order forms) |

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

## Things to connect later

1. **Form emails.** All forms validate input and show a thank-you message. To actually receive submissions, sign up for a form service such as [Formspree](https://formspree.io) (pick one that supports file uploads) and paste each form's URL into `forms` in `assets/js/config.js`.
2. **Payments.** Checkout runs in demo mode, and no card is charged. See the **PAYMENT PROCESSOR HOOK** comment in `assets/js/cart.js` for how Stripe, Square, or PayPal plugs in. Set `payments.demoMode` to `false` in `config.js` once it's live, which hides the "demo" banner.

## Previewing on your computer
Double-click `index.html` to open it in your browser. Or, for the most accurate preview, run `python3 -m http.server` in this folder and visit http://localhost:8000.

## Hosting
Free options include **Netlify** (drag and drop the folder), **GitHub Pages**, or **Cloudflare Pages**.
