# Brief: build a second sleep-and-comfort store for a new brand

You are a senior Shopify designer, premium e-commerce UX strategist and front-end developer. This project is a duplicate of the finished Elovela store. The new brand sells the same 13 products in the same niche (toppers, pillows, support pillows, protectors, duvets, cushion pads) but is a different company with a different owner, name, brand kit and voice. The two websites must not look like siblings: someone who knows Elovela should not recognise its layout, shapes, type or rhythm here.

## What is in this project and how to treat it

- `_brand/` and the attached brand kit PDF: the NEW brand. Read every page before designing. Use the exact colour codes, fonts, logo files, tone-of-voice rules and imagery guidance it gives. Do not reuse Elovela's Forest green, Brushed Brass, Lora or Inter unless the new kit happens to specify them.
- `elovela-products.js`: the product catalogue. Keep the products, sizes, prices, specs, care, benefits, FAQs and comparison data; they are verified facts. Rename the file and the brand references in it (vendor, range names, SKUs if the new brand has its own). Prices marked `est: true` are estimates and must stay flagged until the owner confirms them.
- `img/`: Elovela's photos. Do not use them. The new brand will supply its own; until then use clearly labelled image placeholders and give the owner a precise shot list.
- `Elovela Storefront v4.dc.html`: reference for functionality only (routing, bag drawer, size picker, quick add, sticky add-to-bag, variant pricing, category and product page logic). Copy the behaviour, not the look. Do not copy its section order, shape dividers, arched photos, bento tiles, promise card or marquee reviews.
- `shopify/theme/`: Elovela's Liquid theme. Reuse the engineering (layout.liquid, cart drawer JS, product form JS, metafield wiring, `pic` snippet, templates structure) and rebuild every section's markup and CSS for the new design.
- `_notes/shopify-handover.md` and `Shopify Launch Guide.dc.html`: the proven Shopify rebuild sequence and its constraints. Follow them.

## Step 1: questions before any design

Ask in one form: brand owner's goals and audience; which of the 13 products are hero products for this brand; whether real reviews exist (only real, attributed quotes may be shown); any launch offer; preferred mood from the kit (give 3 contrasting directions as sketches, not words); photo availability; Shopify store connected or not; which collection names the owner wants.

## Step 2: a different design, deliberately

Choose a direction that is distinct from Elovela on every axis and write it down before building:
- Layout rhythm: Elovela is full-bleed photo hero + curved dividers + alternating dark/light bands. Pick something else (e.g. editorial grid with generous margins, split-screen hero, type-led hero with product cut-outs, horizontal scroll ranges, sticky side navigation).
- Shapes: no arched or pill photos, no wave dividers. Choose one geometric language from the kit (sharp, soft-radius, circles, offset frames) and keep it consistent.
- Typography: use the kit's typefaces; set a scale and stick to it. Different heading treatment from Elovela's italic-accent style.
- Colour: apply the kit's primary and secondary as the kit instructs. Every text colour must meet 4.5:1 contrast on its background.
- Imagery: follow the kit's photo direction (lighting, props, people) and leave placeholders with filenames the owner can match.
- Voice: write all copy in the kit's tone. Keep every product claim traceable to the catalogue data; invent nothing.
- Motion: subtle, respects reduced-motion, no marquee if Elovela-like.

Build the prototype as one Design Component (`<Brand> Storefront.dc.html`): homepage, 6 category pages that work as stand-alone landing pages, 13 product pages, About, Contact, bag. Full-width layout, responsive from 360px to 1920px. Present 2 homepage directions first and let the owner pick before completing the rest.

## Step 3: review gates

After each page type, pause for the owner's approval. Keep a running list of their change requests. When a request is unclear, make the smallest targeted change and ask.

## Step 4: Shopify, only after approval

1. Connect the new store. Confirm it is blank. Create metafield definitions (product: spec_line, badges, benefits, faqs, compare; collection: page, chips).
2. Create collections with the owner's names, with images, descriptions, `custom.page` and `custom.chips` metafields. Publish them.
3. Products: generate the CSV import (with metafield columns) and give it to the owner; photo links in it expire within an hour, so regenerate just before they import.
4. Photos: give the owner zip packs to upload to Content → Files with filenames unchanged; the theme loads images by filename via the `pic` snippet.
5. Theme: port the approved prototype into Liquid section by section, copying the prototype's markup and CSS rather than rebuilding from memory, then audit the theme against the prototype section by section and list every difference before uploading. Upload via staged upload + themeCreate as a draft. You cannot publish, delete or edit the live theme through the connection; the owner publishes.
6. Audit responsiveness, header behaviour over photos, link contrast, console errors. Fix, re-upload, repeat.

## Known pitfalls from the Elovela build (avoid repeating)

- Rebuilding the theme from memory produced 13 differences from the prototype. Port, then audit.
- Hotlinked photos from an external site were blocked. Always host images in Shopify.
- A renamed collection kept its old name because the old record still existed. Delete before recreating.
- Placeholders for support email, phone and address must stay hidden until real values are supplied.
- Say "Free UK delivery" only if the owner's shipping rates match.
- The 10% welcome offer needs a real discount code and welcome email set up in Shopify; the site only collects the email.
- Transparent header over a photo needs a soft, long fade (about 240px) so the menu is readable without a hard edge.
- Keep the logo visible when the header turns solid on scroll, and make it link home.

## Deliverables

Prototype DC, launch guide DC with checkboxes, product CSV, photo shot list, Liquid theme zip, and a short written audit of prototype vs theme.
