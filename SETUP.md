# Setup guide: forms, payments, and shipping

Step-by-step instructions for connecting the parts of the site that need an
outside service. Do them in this order: **forms first** (quick and free to
start), then **payments**, then **shipping**.

Everything you'll paste goes into **one file: `assets/js/config.js`**.

---

## 1. Forms (so requests reach your inbox)

The site has five forms. [Formspree](https://formspree.io) delivers each one
to your email.

**All five forms are connected.** Your Formspree plan doesn't accept file
uploads, so the forms have no upload boxes. The order forms say "After you
submit, we'll email you to collect photos, logos or inspiration," and the
review form asks customers to reply by email with a photo.

| Form | Page | Setting in `config.js` → `forms` |
|---|---|---|
| Custom order request | Custom Orders | `customOrder` |
| Team & bulk quote (also used for weddings) | Team & Bulk Orders | `teamOrder` |
| Contact message | Contact | `contact` |
| Leave a review | Leave a Review | `review` |
| Email sign-up | Footer of every page | `newsletter` |

### Steps

1. Go to **formspree.io** and click **Sign up**. Use the email where you want
   requests to arrive (for example `todyeformi@gmail.com`).
2. Open the confirmation email from Formspree and click the link to verify
   your address.
3. In Formspree, click **+ New Form** (or **Create form**).
   - **Name:** `Custom Orders`
   - **Send emails to:** your email
   - Click **Create Form**.
4. Formspree shows the form's **endpoint**, a web address that looks like
   `https://formspree.io/f/abcd1234`. Click **Copy**.
5. Open `assets/js/config.js`, find the `forms:` section, and paste it
   between the quotes:
   ```js
   customOrder: "https://formspree.io/f/abcd1234",
   ```
6. Repeat steps 3–5 for the other four forms: **Team & Bulk**, **Contact**,
   **Reviews**, and **Email Sign-ups**. Each one gets its own endpoint.
7. Save `config.js`, publish the site, and **send a test** from each form.
   The first submission may ask you to confirm in your email. After that,
   every submission lands in your inbox and in your Formspree dashboard.

### Good to know

- **Photo uploads:** the Custom Order, Team & Bulk, and Review forms let
  people attach photos. Formspree needs a **paid plan for file uploads**, so
  check their current pricing page. Without it, the text still sends but
  the photos don't.
- **Free plan limits:** Formspree's free plan has a monthly submission limit.
  If you get close, upgrade or move the busiest form (usually Custom Orders)
  to a paid plan.
- **Spam:** the forms already include a hidden spam trap that Formspree
  recognizes. You can also turn on Formspree's spam filtering in each form's
  settings.
- **Email subject lines** are already set (for example "New customer review"),
  so you can create Gmail filters or labels for each type.
- **Email sign-ups** arrive in your inbox like the other forms. If `newsletter`
  is ever cleared, clicking **Sign Up** opens an email to you instead, so no
  sign-up is lost. Later you can switch to an email
  marketing tool (Square Marketing, Mailchimp, or Flodesk) to send newsletters.

---

## 2. Payments with Square

### Option A (what we're using now): Square payment links

1. In the Square Dashboard, create a payment link for each ready-to-buy item.
   The list of items, prices, styles, and sizes is in the pull request that
   added `thank-you.html`.
2. In each link's checkout settings, turn on **collect shipping address**
   and set shipping to a flat **$8**. Let Square **calculate sales tax**.
3. Set the link to **send customers back to your website after paying**
   (Square calls this a redirect or "after checkout" URL) and use the
   thank-you page address: your site's address + `/thank-you.html`.
4. Send me the links and I'll connect each item's button to its link.

Payment links charge shipping on each link, so the site now says
"Flat $8 shipping. Sales tax calculated at checkout." and free shipping over
$75 is turned off (`config.js → shop.freeShippingOver`).

### Option B (later, optional): one checkout for the whole cart

> **Square or Squarespace?** **Square** is the payment company (card readers,
> invoices, online checkout). **Squarespace** is a different company that
> builds websites. This site is its own website, so Squarespace can't be
> "connected" to it. If you meant Square, follow the steps below. If you
> were thinking of moving the whole shop to Squarespace, let's talk first,
> because that would replace this site rather than connect to it.

The site has a full cart and checkout page. To take real payments, the cart
sends the order to **Square's secure checkout page**, where the customer pays.
Square then emails them a receipt. Card numbers never touch this site.

### What you do

1. **Create a Square account** at **squareup.com** (free, and you can use the
   same account for craft fairs with a Square card reader).
   - Add your bank account so payouts reach you.
   - Under **Settings → Business**, confirm your business name and address.
2. **Turn on sales tax:** in the Square Dashboard, go to **Items & orders →
   Taxes** (or **Settings → Sales taxes**) and add **Michigan 6%**.
3. **Create the developer app:**
   1. Go to **developer.squareup.com** and sign in with your Square account.
   2. Click **+** / **Create an application** and name it `To Dye For website`.
   3. Open the app and switch the toggle at the top from **Sandbox** to
      **Production**.
   4. Copy the **Production Access token** (keep this private, like a
      password; never paste it into `config.js` or any file on the site).
   5. Click **Locations** in the left menu and copy your **Location ID**.
4. **Host the site on Netlify** (free plan). The secret access token needs a
   safe place to live, and Netlify's settings are that place.
   1. Sign up at **netlify.com** with your GitHub account.
   2. Click **Add new site → Import an existing project → GitHub**, then pick
      the `Todyeforandmore` repository and click **Deploy**.
   3. Go to **Site configuration → Environment variables** and add:
      - `SQUARE_ACCESS_TOKEN`: the Production Access token from step 3
      - `SQUARE_LOCATION_ID`: the Location ID from step 3
   4. Later, connect your domain under **Domain management**.

### What I do (once you've finished the steps above)

- Add a small secure function that turns the cart into a Square checkout
  (including sizes, styles, shipping, and Michigan sales tax) and sends the
  customer to Square's payment page.
- Switch `payments.demoMode` to `false` in `config.js`, which removes the
  "Demo checkout" note.
- Test it with Square's sandbox (fake cards) before any real sale.

### Deposits for custom and team orders

Custom and team orders are quoted one by one, so collect those with
**Square Invoices** (in the Square Dashboard or the Square app):

1. Go to **Invoices → Create invoice**.
2. Add the customer, the items, and the total from their approved mockup.
3. Turn on **Request a deposit**, set it to **50%**, and send.
4. Square emails the customer a secure payment link, and you send the
   balance as a second payment request when their order is ready.

---

## 3. Shipping with Shippo

The site tells customers they'll get **tracking by email once their order
ships**, and that orders ship with **USPS, UPS, or FedEx** within the US.
Customers don't need to know you use Shippo.

- **Tracking emails:** when you buy a label in Shippo, enter the customer's
  email and turn on customer tracking notifications (in Shippo's settings).
  Shippo then emails them the tracking number and delivery updates
  automatically.
- **Importing orders:** Shippo lists Square among its store integrations.
  Once payments run through Square, connect Square in Shippo under
  **Settings → Integrations**, and paid website orders appear in Shippo ready
  for a label. Until then, you can create labels by hand or import a
  spreadsheet of orders.
- **Custom and team orders** paid by invoice can be shipped from Shippo the
  same way. Just enter the address and email.

---

## 4. Optional: a live Instagram feed

The Home page shows six favorite photos that link to your Instagram. For a
feed that updates by itself, sign up for an Instagram feed widget (for
example Behold, SnapWidget, or Elfsight), connect your Instagram, and send
me the embed code. I'll put it in that section.

---

## 5. Before launch checklist

- [x] All five forms connected (Custom Orders, Team & Bulk, Contact, Leave a Review, email sign-up)
- [ ] Send a real test from each form and confirm it arrives
- [ ] Square connected and a test order placed (section 2)
- [ ] Shippo tracking emails turned on (section 3)
- [ ] Domain connected, then `siteUrl` in `config.js`, `sitemap.xml`, and
      `robots.txt` updated (see README → Search engines)
- [ ] Holiday banner dates checked in `config.js` → `announcement`
- [ ] "Coming soon" photos replaced (Detroit Beaded Embroidery, makeup bag,
      bag tag, stocking, and your About photo)
