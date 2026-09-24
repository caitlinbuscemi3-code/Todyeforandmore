# To Dye For and More: Website

A multi-page website for custom apparel, shoes, team gear, and gifts. It's built with plain HTML, CSS, and JavaScript, so there's nothing to install and no build step. Upload the folder to any web host and it works.

## Pages

| File | Page |
|---|---|
| `index.html` | Home: hero, shop-by-category, best sellers, "how custom orders work" |
| `shop.html` | Ready-made gifts with Add to Cart + "Make This Custom" |
| `cart.html` | Cart → checkout → confirmation (payment is in demo mode) |
| `custom-orders.html` | Shoes & apparel info + custom request form |
| `team-orders.html` | Team/bulk use cases + team quote form |
| `gallery.html` | Filterable gallery of past work + "Start a Custom Request" |
| `about.html` | Brand story, mission, meet the maker |
| `contact.html` | Contact form, hours, social links |

## ✏️ Where to change things

| I want to change… | Edit this file |
|---|---|
| **Colors & fonts** | `assets/css/styles.css`, the **BRAND SETTINGS** block at the top |
| **Logo** | Put your file in `assets/images/`, then set `logo.src` in `assets/js/config.js` |
| **Business name, email, phone, hours, social links** | `assets/js/config.js` |
| **Shop products & prices** | `assets/js/products.js` |
| **Gallery photos** | `assets/js/gallery.js` |
| **Shipping cost, tax, deposit %** | `assets/js/config.js` |
| **Page wording** | The page's `.html` file. Text marked `[Placeholder]` is waiting for your real content |
| **Browser-tab title / Google description** | `<title>` and `<meta name="description">` at the top of each `.html` file |

### Swapping placeholder photos
Every photo spot shows a label like **[Photo: custom painted jean jacket]** that tells you what to put there.

- **Shop products & gallery**: set the `image` field to your photo path, e.g. `image: "assets/images/tumbler.jpg"`.
- **Photos written directly in a page**: replace the placeholder
  ```html
  <div class="ph ph--teal ph--square" role="img" aria-label="[Photo: custom painted jean jacket]">[Photo: custom painted jean jacket]</div>
  ```
  with
  ```html
  <img class="media-img" src="assets/images/jean-jacket.jpg" alt="Hand-painted floral jean jacket">
  ```

## 🔌 Things to connect later

1. **Form emails.** All forms validate input and show a thank-you message. To actually receive submissions, sign up for a form service such as [Formspree](https://formspree.io) (pick one that supports file uploads) and paste each form's URL into `forms` in `assets/js/config.js`.
2. **Payments.** Checkout runs in demo mode, and no card is charged. See the **PAYMENT PROCESSOR HOOK** comment in `assets/js/cart.js` for how Stripe, Square, or PayPal plugs in. Set `payments.demoMode` to `false` in `config.js` once it's live, which hides the "demo" banner.

## Previewing on your computer
Double-click `index.html` to open it in your browser. Or, for the most accurate preview, run `python3 -m http.server` in this folder and visit http://localhost:8000.

## Hosting
Free options include **Netlify** (drag and drop the folder), **GitHub Pages**, or **Cloudflare Pages**.
