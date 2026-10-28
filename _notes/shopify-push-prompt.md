# Brief: push this project's approved design to Shopify, exactly as designed

You are a senior Shopify theme developer. This project contains an approved storefront prototype (a `.dc.html` Design Component) and its product data. Your job is to put it live on the connected Shopify store so that every page looks and behaves the same as the prototype. Do not redesign, simplify, "improve" or rebuild anything from memory. If something in the prototype cannot be reproduced in a Shopify theme, say so before uploading.

- Store: [store address, e.g. elitlux.myshopify.com]
- Prototype file: `Elitlux Storefront.dc.html`
- Product data file: `elitlux-products.js`
- Also needed: the `img/` folder and the `_brand/` logos. Ignore `Elitlux Storefront (cream).dc.html` and `_scratch/` (old versions).

## 0. Before anything
- Check the Shopify connection. Query and report what's already in the store: products, collections, pages, menus, files, themes, metafield definitions. If old data exists, ask whether to delete it first (stale collections keep their old names and break the design).
- Read the whole prototype. Write `_notes/section-inventory.md`: for every page (home, each category, product, About, Contact, bag, footer, header) list its sections in order, and for each one the background colour, shapes and dividers (copy SVG paths verbatim), every image with its filename, focus point and shape, every piece of copy, and its interactive behaviour. This inventory is the checklist for everything below.

## 1. Store data first (via the Shopify connection)
- Metafield definitions the theme reads (for example product `custom.spec_line`, `custom.badges`, `custom.benefits` (json), `custom.faqs` (json), `custom.compare` (json); collection `custom.page` (json), `custom.chips`).
- Collections: smart collections by tag, with titles and handles exactly as in the prototype, image, description, and a `custom.page` JSON holding every per-category field the prototype uses (hero copy, inset image, promise cards, guide, banner, related ranges). Publish each to the Online Store publication.
- Pages (About, Contact) with the right template suffixes. Main and footer menus with the prototype's labels.
- Products: generate a Shopify product CSV from the data file, including metafield columns. Image links come from public file URLs that expire in about an hour, so regenerate the CSV right before handing it over. The owner imports it in Products → Import. Then publish products to the Online Store.
- Photos: package them as zip packs of at most 15 files each (larger zips time out). The owner uploads them to Content → Files with filenames unchanged. Don't put photos in the theme zip.

## 2. Port the design into a Liquid theme
- One Liquid section per prototype section, built by copying the prototype's markup and turning its inline styles into classes in one stylesheet. Keep exact values: colours, font sizes, clamp() values, radii, aspect ratios, gradients, shadows, spacing, SVG divider paths.
- Every section's copy and image filenames become schema settings, and the JSON templates are filled with the prototype's exact copy, so the draft matches with zero editing.
- Images load by filename through one snippet: use `images[filename]` (Content → Files) and fall back to `filename | asset_url`. Never put Liquid tags inside `render` string arguments; compute a variable first.
- Header: transparent over photo heroes with a long soft top fade (about 240px, on the hero's ::before, not on the header bar), solid on scroll, logo always visible and linking home. Category pages get the same treatment if their heroes are photos.
- Reuse working parts where they exist: bag drawer, product form, size picker, quick add, sticky add-to-bag, variant price updates, recommendations.

## 3. Validate before every upload
Automated check, fix everything it reports:
- All JSON parses. Every section has a valid schema. Resource settings (product, collection, image_picker, page) have no defaults. URL setting defaults only `/collections` or `/collections/all`.
- Every setting and block used in templates and section groups exists in that section's schema. `block_order` and `order` match their keys.
- Liquid tags balance (if/unless/for/case/capture/form/paginate).

## 4. Upload as a draft theme
- Zip text files plus small brand assets (logo, favicon) only.
- `stagedUploadsCreate` (resource FILE, mimeType application/zip) → POST the zip as multipart form data to the staged URL with every returned parameter → `themeCreate(source: resourceUrl, name: "Elitlux vN by Claude")`. Check processing finished without errors.
- You can't publish, delete or edit the live theme from the connection. The owner previews and publishes in Online Store → Themes, and deletes old drafts.

## 5. Audit, then report
- Go through the section inventory one section at a time and compare against the theme files. List every difference in plain language, grouped by page. Fix them all, re-validate and upload as the next version number.
- Check responsiveness at 360, 768, 1024, 1440 and 1920px: no overflow, no clipped text, tap targets of at least 44px, readable header over photos, 4.5:1 text contrast.
- Report briefly: what's live, what the owner must do (import CSV, upload photos, publish theme, set up discount code and welcome email if there's an offer, shipping rates matching the delivery promise, real contact details), and anything that differs from the prototype and why.

## Elitlux parts that need special care
These were added after the first store push and have no ready-made equivalent in a Shopify theme.
- **Colours:** the site background is white. Reviews sections are Mist `#E3E9F2`. Linen `#EFE7DA` is only used for the footer, the product "why" section, the bundle panel and the size guide. Don't bring back cream.
- **Rounded tops:** wherever the background changes, the lower section has top corners of `clamp(24px,3vw,40px)` and overlaps the section above by the same amount (negative top margin, `position:relative`, higher z-index). The section above gets the same amount of extra bottom padding. Make "Overlap the section above with a rounded top" a checkbox on each section, because sections can be reordered in the theme editor. The footer only overlaps on home and collection pages.
- **Moving strip:** a white strip of four items with four-point star separators. The list is duplicated so it loops with no jump, pauses on hover and stays still for reduced motion. The "10% off" item opens the offer. It sits under the hero on home and collection pages (sliding over the hero) and under the header on every other page. Build it once and give each item its own block.
- **Shop by range:** expanding photo panels. On desktop, hovering opens a panel. On mobile the panels stack, the first tap opens a panel and the second tap goes to the range.
- **Mattress Topper section:** a photo on the left and a four-point accordion on the right. It moves to the next point every 6 seconds while in view, with a progress line. It stops when a customer clicks and stays still for reduced motion.
- **Best sellers (navy):** category tabs (All, Pillows, Duvets, Protectors, Support pillows) and the top 3 products as cards, with a "Shop all" tile filling any gap. Make each tab a block with a label, a collection for the "Shop all" link, and a product list, filled in the JSON template with the prototype's picks. The owner will replace them with real best sellers.
- **Build your bed:** shown on home and on the Toppers, Pillows and Duvets pages. It has a photo with three numbered hotspots and three product rows with tick boxes and size buttons (the duvet also has tog buttons). One button adds the ticked items in a single `/cart/add.js` call. Shopify's built-in automatic discounts can't require one topper, pillows and a duvet together, so the 10% needs a bundle discount app or a Shopify Functions discount. The bag must show the discount Shopify actually applies, never a price worked out in theme JavaScript, so the bag and checkout always agree. Until that discount exists, ask the owner whether to hide the "10% off" wording.
- **Still to be supplied:** the protector's star rating and review count, a real topper review, and the phone, email and customer care hours. Keep them hidden until real values are supplied.

## Pitfalls already hit once (don't repeat)
- Building the theme from memory produced 13 visual differences. Port, then audit.
- Photos hotlinked from another website got blocked. Host everything in Shopify.
- Uploading theme assets by URL through the API didn't work; use Content → Files plus the filename snippet.
- Large zips and long scripts time out at 30 seconds; work in batches.
- A white line above the menu came from a gap between the header and the hero; heroes must start at the very top under a transparent header.
- Hidden contact details must stay hidden until real values are supplied.
- In the prototype, some overlaps switch on and off in JavaScript depending on the page or on which product sections exist. In the theme they must become settings or Liquid conditions, not fixed values.
