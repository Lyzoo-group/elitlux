# Elovela → Shopify rebuild: handover (15 Oct 2026)

Store: r1czks-tb.myshopify.com (GBP, Basic). Store was wiped by the client on 15 Oct; only Horizon (live) remains.
Online Store publication id: gid://shopify/Publication/223831982300

## Already done after the wipe
- Metafield definitions recreated: product custom.spec_line, custom.badges (single line), custom.benefits, custom.faqs, custom.compare (json); collection custom.page (json), custom.chips (single line).

## To do, in order (connector blocks: themeFilesUpsert on live theme, themePublish, themeDelete)
1. Images → Shopify Files: fileCreate from fresh get_public_file_url links for every file in img/ (links expire ~1h; regenerate). shopify/_urls.json has an expired set + the filename list.
2. Products: productSet ×13 from elovela-products.js (shopify/_inputs.json = ready inputs, image URLs expired → rebuild). Tag map: toppers→cloud-toppers, pillows→pillows, bump-and-baby→support-pillows, protectors→guard-protectors, duvets→duvets, cushions→nest-cushions. Publish each to the Online Store publication.
3. Collections (smart, by tag): Cloud Toppers, Pillows, Support Pillows (handle support-pillows), Guard Protectors, Duvets, Nest Cushions. Set image + custom.page + custom.chips from the CATS object in Elovela Storefront v4.dc.html (renderVals → const CATS). Publish.
4. Product metafields: benefits from elovela-products.js; faqs/compare generated (logic in v4 renderVals: faqs(), cmp()).
5. Menus: main-menu = Toppers, Pillows, Support Pillows, Protectors, Duvets; footer = Contact us, About Elovela, Search. Pages: About (template page.about), Contact (page.contact).
6. Theme: port Elovela Storefront v4.dc.html 1:1 (client wants identical sections, images, shape dividers). Existing Liquid in shopify/theme/ is a simplified version; homepage spotlight (arched photo + inset), story (two photos), promise-bar spacing, header/menu names need redoing. Upload via stagedUploadsCreate(FILE) → POST zip from run_script → themeCreate; client publishes manually.
