# Elitlux — section inventory (source: `Elitlux Storefront.dc.html`, read in full 28 Oct 2026)

Checklist for the Shopify port. Values are copied from the prototype's inline styles and logic.
Appendices A–F (bottom) were extracted from the prototype logic by script: per-collection copy, reviews, best-seller picks, topper steps, bundle, strip.

## Conventions
- **R** = `clamp(24px,3vw,40px)`, the rounded-top radius and the overlap distance. Overlap = `margin-top:calc(-1 * R)` + `position:relative` + higher z-index + `border-radius:R R 0 0`. The section above gets `+ R` on its bottom padding.
- **PX** = `clamp(20px,4vw,80px)` side padding. Content max-width 1920px, centred.
- **Eyebrow** = 12px / 600 / letter-spacing .14em / uppercase / Stone `#5F6878` (variants: Mist `#E3E9F2`, Linen `#EFE7DA`, Gold `#AD8E69`, 11px).
- **H2 large** = Lora 500, `clamp(34px,4.2vw,58px)`, line-height 1.05, letter-spacing -0.015em, `text-wrap:balance`. Italic `<em>` in Navy `#1F2D4D` (on dark: Gold or Mist).
- **Pill button** = min-height 56px, padding 0 30px, radius 999px, 16px/600, gap 10px, arrow icon 18px, `transition: background-color .25s, color .25s, transform .25s`, hover `translateY(-2px)`.
- **Arrow link** ("Shop all") = 15px/600 Navy, padding-bottom 4px, border-bottom 1px Navy, gap 8px → hover gap 12px.
- **Photo hover** = `transform:scale(1.04)`, `transition: transform 1.2s cubic-bezier(.2,.7,.2,1)`.
- **Breakpoints (from JS)**: desk ≥1000 · wide ≥1080 (header, gallery sticky, cart cols) · mobile <768 (quick sheet as bottom sheet, sticky add bar) · ≥900 (range panels in a row, hero chip, why/faq cols) · ≥640 (best sellers 3 cols) · ≥560 (bundle card cols) · ≥760 (About photos 3 cols) · grid cols 4/3/2 at ≥1200/≥820.
- **Palette**: White `#FFFFFF` (site bg) · Ink `#141B2D` (text) · Navy `#1F2D4D` · Gold `#AD8E69` · Linen `#EFE7DA` (footer, product "why", bundle panel, size guide/guide panel only) · Cloud `#FBF8F3` (text on dark) · Mist `#E3E9F2` (reviews bg, cards) · Stone `#5F6878` · Clay `#B5624C` (save %, errors). Borders `rgba(31,45,77,0.14)`.

## Global
- body: bg `#FFFFFF`, color `#141B2D`, Inter 16px / 1.55, antialiased. Fonts: Inter 300/400/500/600; Lora 400/500 + italic 400/500 (Google Fonts).
- `a` `#1F2D4D`, underline 1px, offset 3px; hover `#141B2D`. `:focus-visible` 2px solid Navy, offset 3px. `::selection` Mist / Ink.
- Reduced motion: every transition and animation off; marquees still; topper auto-advance off.
- Reveal: `[data-reveal]` elements below 92% of the viewport fade up (opacity 0→1, translateY 28px→0, .8s cubic-bezier(.2,.7,.2,1)) via IntersectionObserver (rootMargin 0 0 -6% 0). Not under reduced motion.
- Keyframes: `elo-marquee-left` translateX(0→-50%), `elo-marquee-right` (-50%→0), `elx-pulse` 0% scale(.8) opacity .75 → 100% scale(1.7) opacity 0.
- Skip link "Skip to content" (Navy pill, appears at left:16px on focus), live region for "X added to your bag".
- Images that fail to load: try `data-fallback`, else hide.

### SVG paths (verbatim)
- Arrow → `M5 12h14M13 6l6 6-6 6` (stroke 1.6, round; 18px. Reviews link: 16px stroke 1.5)
- Chevron ↓ `M6 9l6 6 6-6` · prev `M15 6l-6 6 6 6` · next `M9 6l6 6-6 6`
- Search `<circle cx="11" cy="11" r="6.5">` + `M20 20l-4.2-4.2`
- Bag (header) `M5 8h14l-1 12H6L5 8z` + `M9 8V6.5a3 3 0 0 1 6 0V8` · Bag (bundle button 20px) `M5 8h14l-1 12H6L5 8z` + `M9 8V6a3 3 0 0 1 6 0v2`
- Menu `M4 7h16M4 12h16M4 17h16` · Close `M6 6l12 12M18 6L6 18`
- Four-point star (strip) `M12 1C12.9 7.6 16.4 11.1 23 12C16.4 12.9 12.9 16.4 12 23C11.1 16.4 7.6 12.9 1 12C7.6 11.1 11.1 7.6 12 1Z` fill Navy, 18px
- Rating star `M12 3.5l2.6 5.3 5.9.9-4.2 4.1 1 5.8-5.3-2.8-5.3 2.8 1-5.8-4.2-4.1 5.9-.9z` ×5 at translate(0|24|48|72|96 0), viewBox 0 0 120 24. Partial rating = base row + gold row clipped to N% width.
- Truck `M3 7h11v9H3z` + `M14 10h4l3 3v3h-7` + circles (7,17.5,r1.5) (17,17.5,r1.5) · Chat `M5 5h14v10H9l-4 4V5z` · Tag `M3.5 12.5V4h8.5l8.5 8.5-8 8z` + circle (8,8.5,r1.4) · Returns `M9 7L5 11l4 4` + `M5 11h9a5 5 0 0 1 0 10h-2` · Check `M5 12.5l4.5 4.5L19 7.5` · Minus `M6 12h12` · Plus `M12 6v12M6 12h12` · Accordion plus `M5 12h14` + `M12 5v14` (vertical line scaleY 1→0 when open) · FAQ plus `M12 5v14M5 12h14`
- No wave/shape dividers: all section joins are the rounded-top overlaps above. Arch shape = `border-radius:999px 999px 28px 28px`.

## Header (every page)
- Sticky top 0, z 40, height 72px, inner max 1920 + PX, flex space-between, gap 24.
- Background: transparent on photo-hero pages (home, collections) until scrolled past `hero height − 140px`, or while mega/nav open → Navy `#1F2D4D`. Border-bottom 1px transparent → `rgba(251,248,243,0.12)` when scrolled / non-photo pages. Shadow `0 10px 30px rgba(20,27,45,0.16)` when scrolled or on non-photo pages. Transition .4s. Heroes slide under it (`margin-top:-72px`); no gap above the hero.
- ≥1080: linen logo 34px (links home, aria "Elitlux, home"); nav gap 32px: **Shop** (button, chevron rotates 180° when open, 2px bottom line), Toppers, Pillows, Support Pillows, Protectors, Duvets (15px/500 Cloud, 72px tall, hover 2px bottom border Linen). Right group gap 4px: About, Help (→ contact) 44px tall, padding 0 12px, hover underline; search icon 44px round (hover bg `rgba(251,248,243,0.14)`); bag icon 44px with count badge (white, Navy text, 18px, 11px/600, top 4 right 2).
- <1080: menu button (−10px left), linen logo 26px centred, search + bag (−10px right).
- **Mega menu** (≥1080): opens on Shop hover/click, closes on leaving the header, hovering another nav item, or Esc. White, border-bottom, shadow `0 24px 48px rgba(31,45,77,0.10)`; grid `repeat(4,minmax(0,1fr)) minmax(0,1.4fr)`, gap 32, padding 40px PX 48px. Columns (heading eyebrow, list gap 12, 15px):
  - Toppers & protection: Quilted Mattress Topper · Quilted Waterproof Mattress Protector · Terry Towel Waterproof Protector · **All protectors**
  - Pillows: Duck Feather & Down Pillows · U-Shape Pregnancy & Body Pillow · V-Shape Support Pillow · Hollowfibre Bolster Pillow · **All pillows**
  - Duvets: 4.5 tog · Summer · 10.5 tog · All season · 13.5 tog · Winter · 13.5 tog microfibre · Essential winter duvet · **All duvets**
  - Living room: Hollowfibre Cushion Pads · **All cushions** · **Shop everything** (margin-top 12px)
  - Bold links = Navy 600; product links Ink, hover Navy underline.
  - Promo card → topper: Mist bg, radius 12, padding 16, gap 20; `topper-sleeping.jpg` 112px wide, aspect 430/491, radius 12; eyebrow "Hero range"; Lora 22px "Your bed, *made new.*"; "Mattress Topper · from £20.64" 15px Stone; hover shadow `0 8px 24px rgba(31,45,77,0.10)`.
- **Mobile menu** (dialog): overlay `rgba(31,45,77,0.45)` z 60; left panel `min(400px,88vw)`, white, shadow `0 24px 64px rgba(31,45,77,0.18)`, z 61. 72px top bar: navy logo 28px + close. Nav padding 8px 24px 32px: eyebrow "Shop" (padding 20px 0 8px), Lora 22px links with bottom border (padding 12px 0): Shop all, Mattress Toppers, Pillows, Support Pillows, Mattress Protectors, Duvets, Cushions. Eyebrow "Elitlux" (padding 28px 0 8px), 16px links: About Elitlux, Help & contact, Elitlux on Amazon UK (new tab). Bottom Mist box (padding 24, 15px): "Free UK delivery on every order" / "Help, 24/7" (Stone). Body scroll locked while open.

## Moving strip (built once; items = blocks)
- White, border-bottom 1px `rgba(31,45,77,0.08)`; inner `overflow:hidden; padding:clamp(18px,2vw,26px) 0`, edge mask `linear-gradient(90deg, transparent 0, #000 8%, #000 92%, transparent 100%)`.
- Track `display:flex; width:max-content; animation: elo-marquee-left 60s (≥1000) / 40s linear infinite`, paused on hover, still for reduced motion. List rendered twice (second copy aria-hidden, not focusable) so the loop has no jump.
- Item: `gap` and `padding-right` `clamp(28px,3vw,44px)`; text `clamp(16px,1.3vw,19px)` / 500 Ink nowrap; four-point star after each item.
- Items: Free UK delivery on every order · Help, 24/7 on sizing and care · Machine washable for a fresh bed · **10% off your first order** (button, underlined `rgba(31,45,77,0.3)` → Navy on hover, offset 4px; scrolls to the offer, going to home first on pages without one).
- Placement: home + collection = directly under the hero, overlapping it (radius R top, `margin-top:-R`, z 2). Other pages = first thing under the header, square corners, z 2.

## Home (order)
1. **Hero** `#home-hero` — Ink bg, `margin-top:-72px`, `padding-bottom:R`, `min-height:clamp(640px,100svh,1000px)`, flex, align centre (≥1000) / flex-end. Photo `elt-hero.jpg` cover, position `62% 38%` (≥1000) / `58% 30%`, eager. Shade ≥1000: `linear-gradient(180deg, rgba(20,27,45,0.45) 0%, rgba(20,27,45,0.2) 110px, rgba(20,27,45,0) 220px), linear-gradient(90deg, rgba(20,27,45,0.84) 0%, rgba(31,45,77,0.58) 42%, rgba(31,45,77,0.08) 78%)`; <1000: `linear-gradient(180deg, rgba(20,27,45,0.62) 0%, rgba(20,27,45,0.25) 34%, rgba(20,27,45,0.88) 100%)`. Content padding `calc(72px + clamp(48px,8vw,120px)) PX clamp(112px,12vw,180px)`, column gap 26, max 680.
   - Eyebrow Linen "Hotel-quality bedding"; H1 Lora 500 `clamp(56px,7.6vw,124px)`/0.95, -0.025em: "Sleep better. *Live better.*" (em Gold); sub `clamp(18px,1.5vw,21px)`/1.6 Cloud, 42ch: "Hotel-quality duvets, pillows and protectors — made for every home."; buttons (padding-top 6): white "Shop the collection →" (/collections/all), outline `rgba(251,248,243,0.65)` "Find your topper" (/collections/toppers; hover bg `rgba(251,248,243,0.14)`).
   - Rating line (96×19.2 stars, 92% fill, "Rated [Rating] out of 5 by Mattress Protector customers on Amazon UK") — **hidden until the rating is supplied**.
   - Chip (≥900 only) → topper: absolute right PX, bottom `calc(clamp(128px,13vw,200px) + R)`, white 94%, radius 22, padding 10px 20px 10px 10px, shadow `0 18px 40px rgba(20,27,45,0.3)`, hover up 3px; `topper-floor.jpg` 60×60 radius 14; eyebrow 11px "Hero range"; Lora 18px "Quilted Mattress Topper"; "From **£20.64**".
2. **Strip** (overlapping the hero).
3. **Shop by range** — white. Padding `clamp(64px,8vw,112px) PX clamp(64px,8vw,104px)`. Head row: eyebrow "Shop by range", H2 "Six ways to *a better night*", arrow link "Shop all" (/collections/all), margin-bottom `clamp(32px,4vw,56px)`.
   - Panels (`data-reveal`), gap `clamp(8px,1vw,14px)`. ≥900: row, height `clamp(460px,42vw,680px)`, active panel flex-grow 5, others 1 (`transition: flex-grow .7s cubic-bezier(.2,.7,.2,1)`). <900: column, active height `clamp(360px,96vw,480px)`, others 88px (height transition .6s).
   - Panel: radius 24, Ink bg; photo cover (scale 1 active / 1.08 idle, 1.2s); gradient `linear-gradient(180deg, rgba(20,27,45,0.1) 0%, rgba(20,27,45,0) 35%, rgba(20,27,45,0.82) 100%)`; dim layer `rgba(20,27,45,0.5)` opacity 1 idle / 0 active (.6s).
   - Idle label (bottom-left `clamp(16px,1.6vw,24px)` / `clamp(20px,2vw,28px)`): number (12px/600 Mist) + Lora `clamp(20px,1.6vw,26px)` title; vertical (`writing-mode:vertical-rl; rotate(180deg)`) in row mode; fades out when active.
   - Active detail (width = active panel width, min 280px; padding `clamp(22px,2.6vw,36px)`, gap 8): "0N · Label" eyebrow Mist; Lora `clamp(28px,2.8vw,44px)`/1.08 title; need line 15px Linen 38ch; white pill 42px "From £X →" (14px/600 Navy). Fade/slide in after .25–.3s.
   - Desktop (hover devices): hover or focus opens a panel; click goes to the range. Touch: first tap opens, second tap goes. First panel open by default.
   - Ranges (photo · title · label · need): see Appendix E.
4. **Mattress Topper** `[data-topper-story]` — Mist `#E3E9F2`, rounded top R (no overlap; section above is white), z 1. Padding `clamp(56px,6vw,96px) PX calc(clamp(56px,6vw,96px) + R)`. Grid ≥1000: 2 cols, areas `"img head" "img steps"`, rows `auto 1fr`; <1000: `"head" "img" "steps"`. Column gap `clamp(40px,6vw,104px)`, row gap `clamp(24px,2.6vw,32px)`.
   - Head: eyebrow "Mattress Topper · Hero range"; Lora `clamp(34px,3.6vw,52px)` "Your bed, *made new.*"
   - Photo stack: radius 28, Ink bg, min-height `clamp(540px,44vw,640px)` (≥1000) / aspect 4/3; 4 photos cross-fade (opacity .7s; scale 1.06→1, 1.6s).
   - Accordion (4 steps, Appendix D): top border `rgba(31,45,77,0.16)`; progress line 2px Navy fills 0→100% over 6s while running; button min-height 64, number 13px/600 (Navy active / Stone), Lora `clamp(20px,1.7vw,26px)` title (Ink / Stone), 36px round icon (active Navy filled, white plus→minus). Panel `grid-template-rows 0fr→1fr` (.5s); body 16px/1.65 Stone 60ch, padding `0 clamp(0px,3vw,52px) 22px calc(28px + clamp(14px,1.6vw,20px))`.
   - Auto-advance every 6s while the section crosses mid-viewport; stops when a step is clicked; off for reduced motion.
   - Footer row: Navy pill "Shop the topper →" (/products/cloud-topper; hover Ink, up 2px) + "Single to Super King, from **£20.64**" (strong 20px/600 Ink).
5. **Best sellers** — Navy `#1F2D4D`, white text, overlaps the topper section (R, z 2). Padding `clamp(56px,7vw,96px) PX calc(clamp(56px,7vw,96px) + R)`. Grid ≥1000 `minmax(240px,4fr) minmax(0,8fr)`, gap `clamp(28px,4vw,72px)`.
   - Left: eyebrow Mist "Most loved", H2 white "Best sellers"; tablist (vertical ≥1000, horizontal scroll row below, full-bleed with PX padding): pill tabs 60px tall / 44px, padding 0 24px / 18px, Lora `clamp(20px,1.6vw,24px)` / 17px; active = white bg Navy text with arrow; idle = transparent, white text, border `rgba(255,255,255,0.28)` (hover white). Arrow keys/Home/End move. Arrow link white "Shop all products" / "Shop all {tab}".
   - Panel: cards grid 3 cols (≥640) / 2, gap `clamp(12px,1.4vw,20px)`. Card: white, radius 24; photo aspect 4/5 Linen bg, hover zoom; tag pill top-left Navy 30px "No. 1 best seller" / "No. 1 in {tab}" then "02", "03"; body padding 16px 18px 18px: range 11px eyebrow, Lora 19px title link, price 16px/600, Navy button min-height 44 "Choose size"/"Add to bed" (opens quick sheet / adds).
   - "Shop all" tile fills the gap (3-col: when 1–2 cards; 2-col: when odd count): border `rgba(255,255,255,0.28)`, radius 24, 52px white circle arrow, Lora `clamp(22px,2vw,28px)` label.
   - Tabs and picks: Appendix C.
6. **Build your bed** `#bundle` — white, overlaps best sellers (R, z 3). Padding `clamp(56px,7vw,96px) PX clamp(64px,8vw,104px)`. Linen panel radius 40, padding `clamp(14px,2vw,24px)`, grid ≥1000 `minmax(0,6fr) minmax(0,5fr)`, gap `clamp(20px,4vw,64px)`.
   - Photo `elt-duvet-floor.jpg` square, radius 28; hotspots 1–3 (Appendix B): 48px button, pulsing white ring (`elx-pulse 2.4s`), 36px dot (white/Navy, active Navy/Cloud), shadow `0 6px 18px rgba(20,27,45,0.28)`; tooltip (white, radius 16, `clamp(200px,20vw,260px)`, shadow `0 18px 40px rgba(20,27,45,0.22)`): layer eyebrow, Lora 18px title link, price. Hover (desktop) or tap toggles; hovering a row highlights its dot.
   - Copy: eyebrow "Build your bed"; H2 `clamp(32px,3.6vw,52px)` "The whole bed, *10% off*"; "Pick a size for the topper, pillows and duvet. Add all three to your bag and we take 10% off." (16px Stone 46ch).
   - Rows (gap 10): grid `28px 88px 1fr` (≥560) / `24px 64px 1fr`, padding 14, radius 20; ticked = white bg, border `rgba(31,45,77,0.12)`; unticked = transparent, border `rgba(31,45,77,0.28)`; active = Navy border. Checkbox 22px (accent Navy), thumbnail square radius 14 with number badge, layer eyebrow, title 16px/600, price 16px/600 Navy; duvet tog buttons (4.5 / 10.5 / 13.5 tog); size buttons (min-height 44, 13px/500, chip on = Navy/Cloud, off = white/Navy border `rgba(31,45,77,0.22)`).
   - Total: label "Bundle price" (all 3 ticked) / "Total"; Lora 32px amount; struck full price when all 3; note "You save £X" / "Add all three to save 10%". Button "Add all 3 to bag" / "Add N items to bag" / "Choose at least one" (disabled), bag icon. One add call for all ticked items.
   - Discount: the theme must not calculate the 10%. Bag/checkout show only Shopify's real discount (needs a bundle app or Functions discount). "10% off" wording behind a setting until the owner confirms.
7. **Photo band** "Hotel nights, every night" — rounded top R (no overlap), Ink bg, height `calc(clamp(440px,58vw,760px) + R)`. `elt-pillow-coffee.jpg` cover centre, hover zoom. Shade ≥1000 `linear-gradient(90deg, rgba(20,27,45,0.82) 0%, rgba(20,27,45,0.5) 42%, rgba(20,27,45,0.05) 75%)`, else `linear-gradient(0deg, rgba(20,27,45,0.9) 0%, rgba(20,27,45,0.5) 55%, rgba(20,27,45,0.1) 100%)`; content align centre / bottom, padding `clamp(32px,5vw,80px) PX calc(clamp(32px,5vw,80px) + R)`, max 560, gap 18: eyebrow Gold "Duck Feather Pillows"; Lora `clamp(36px,4.6vw,68px)`/1.02 "Hotel nights, *every night.*" (em Mist); 17px Linen 40ch "Natural duck feather and down in a double-stitched cotton cover, sold in pairs."; white pill "Shop pillows →" (/collections/pillows).
8. **Reviews** `#reviews` — Mist, overlaps the band (R, z 2). Padding `clamp(48px,6vw,80px) PX calc(clamp(64px,8vw,104px) + R)`, gap `clamp(32px,4vw,48px)`. Head grid `repeat(auto-fit, minmax(min(100%,420px),1fr))`: eyebrow "Mattress Protector reviews · Amazon UK", H2 Lora `clamp(34px,4vw,52px)`/1.08 "“Stays where *it should!*”"; right: big rating "[Rating]" Lora 64px + 120×24 stars + "out of 5 on Amazon UK" — **hidden until supplied**.
   - Two marquee rows (full bleed `margin:0 −PX`, mask 6%/94%), gap 16: row 1 left, row 2 right, 70s (≥1000) / 48s, pause on hover. Card: `clamp(240px,24vw,320px)` wide, padding 22px 24px, radius 20, white; 80×16 gold stars; Lora 17px title; 14px/1.55 quote; footer 13px: name (600 Ink) + "Verified purchase · Size". Reviews: Appendix A.
   - Link "All reviews on Amazon →" (Amazon store, new tab).
9. **Our story** — white, overlaps reviews (R, z 3). Padding `clamp(72px,9vw,128px) PX`, grid 2 cols ≥1000, gap `clamp(40px,6vw,104px)`.
   - Photos (`data-reveal`): grid `7fr 5fr`, gap `clamp(12px,1.6vw,24px)`: `elx-quilted-pillows.png` aspect 3/4 radius 24; right column padding-top `clamp(32px,5vw,80px)`: `pillow-fabric-detail.jpg` square radius 24 caption "Honest quality"; `elt-duvet-folds.jpg` 4/3 radius 24 caption "Considered comfort" (11px eyebrow captions). Linen placeholder bg.
   - Text (max 560, gap 28): 40px gold rule + eyebrow "Our story"; H2 "Rest, *elevated.*"; Lora italic `clamp(20px,1.8vw,24px)` Navy: "Elitlux is a UK bedding brand founded on a simple belief: everyone deserves to sleep the way they do in a good hotel — without paying hotel prices for it."; 16px Stone: "We design duvets, pillows, protectors, toppers and cushions that bring that feeling home."
   - Values list (top border, rows `48px 1fr`, padding 18px 0, bottom borders except last): 01 Considered comfort — It starts with how it feels. · 02 Honest quality — Fill, fabric and size, stated plainly. · 03 Care in the detail — Made to be washed and kept fresh at home. · 04 Restorative calm — A bed that feels like a good hotel’s. (numbers Lora italic 15px Gold; titles Lora 20px; text 15px Stone).
   - Outline pill 52px "About Elitlux →" (hover Navy fill, Cloud text).
10. **Offer** `#offer` — Navy, rounded top R (no overlap), z 5, overflow hidden. Padding `clamp(72px,9vw,120px) PX calc(clamp(72px,9vw,120px) + R)`, 2 cols ≥1000, gap `clamp(40px,6vw,96px)`.
   - Eyebrow Gold "Welcome to Elitlux"; H2 Cloud "10% off *your first order.*" (em Gold); 18px Linen "Join our list and we’ll email your code straight away, plus new ranges and care tips now and then."; form: email input (flex 1 1 240px, 56px, padding 0 22px, white, border `rgba(251,248,243,0.3)`, radius 999) + white pill "Get 10% off"; error "Please enter a valid email address."; small 14px Mist "One code per customer, for your first order. Unsubscribe any time."; success (Lora 24px) "Thank you. Your code is on its way to {email}."
   - Arch photo `elx-comfort-room.png` aspect 5/4, radius `999px 999px 28px 28px`, Ink bg.
11. **Footer** overlaps the offer (home and collection pages only).

## Collection pages (order) — copy per collection in Appendix F
1. **Hero** `#col-hero` — like the home hero: Ink, `margin-top:-72px`, `padding-bottom:R`, min-height `clamp(620px,88vh,860px)` (≥1000) / `clamp(560px,92vh,760px)`. Background photo (cover, focus per collection). Scrim ≥1000 `linear-gradient(90deg, rgba(20,27,45,0.9) 0%, rgba(20,27,45,0.7) 38%, rgba(20,27,45,0.25) 70%, rgba(20,27,45,0.15) 100%), linear-gradient(0deg, rgba(20,27,45,0.75) 0%, rgba(20,27,45,0) 40%)`; else `linear-gradient(180deg, rgba(20,27,45,0.8) 0%, rgba(20,27,45,0.35) 30%, rgba(20,27,45,0) 45%), linear-gradient(0deg, rgba(20,27,45,0.96) 0%, rgba(20,27,45,0.78) 50%, rgba(20,27,45,0.3) 100%)`.
   - Breadcrumb (absolute, padding-top 96px, 15px Mist): Home / {collection title}.
   - Content padding `160px PX clamp(120px,14vw,200px)`, grid ≥1000 `5fr 7fr`, align end, gap `clamp(32px,5vw,88px)`. Eyebrow Mist; H1 `clamp(48px,6.4vw,96px)`/0.98 "{title} *{titleEm}*" (em Gold); intro `clamp(18px,1.5vw,21px)` Linen 46ch; chips (padding 9px 14px, border `rgba(251,248,243,0.35)`, bg `rgba(20,27,45,0.35)`, blur 6px, 14px/500); buttons: white "{shopCta} →" (scrolls to grid; hover Linen) + outline `rgba(251,248,243,0.5)` "{guideTitle}" (scrolls to guide); trust row 15px Linen with gold icons: truck "Free UK delivery", chat "Help, 24/7", tag "10% off your first order".
   - Lead card (right ≥1000, left below): white 96%, radius 24, padding 12px 20px 12px 12px, shadow `0 18px 40px rgba(20,27,45,0.28)`; 64px image radius 16; label eyebrow 11px; Lora 18px title; price 14px Stone; arrow.
2. **Strip** (overlapping the hero).
3. **Grid** `#grid` — padding `clamp(48px,6vw,80px) PX clamp(64px,8vw,104px)`. Head: count eyebrow ("N products", live), Lora `clamp(30px,3.2vw,44px)` grid title; Sort select (only when >2 products): Featured / Price, low to high / Price, high to low / A–Z (44px pill).
   - >2 products: grid 4/3/2 cols, gap `clamp(36px,4vw,56px) clamp(16px,2vw,28px)`. Card: photo aspect 430/491 radius 28, ring `0 0 0 1px #EFE7DA`, badge pill; range eyebrow; Lora 20px title; spec 15px Stone; price 17px/600 + struck compare; outline button 48px "Choose {option}" / "Add to bed" (hover Navy fill).
   - ≤2 products: feature rows (white, radius 36, padding `clamp(14px,2vw,24px)`, shadow `0 22px 50px rgba(31,45,77,0.08)`, grid ≥1000 `5fr 7fr`): photo aspect 430/491 max 640 radius 26 + badge; range; Lora `clamp(28px,2.8vw,42px)` title; spec; lead 17px; price 20px; "Choose a {option} to add it to your bag"; option buttons grid `minmax(132px,1fr)` (58px, radius 14, label + price; hover Navy border, Mist bg; click adds); "View full details →".
4. **Guide** `#guide` — Linen panel radius 40, padding `clamp(18px,3vw,40px)`, 2 cols ≥1000. Photo aspect 4/5 max 680 radius 24. Eyebrow, H2 large, intro 17px Stone; rows (2 columns when >6 rows and ≥700px): Lora 19px name + price (15px/600 Navy) + detail 14px Stone + link "View product" / "Shop {range}" (14px/600). "Not sure? **Ask us**, we’re here 24/7."
5. **Banner** — radius 40, height `clamp(420px,52vw,680px)`, Ink; photo (focus per collection), hover zoom; gradient ≥1000 `linear-gradient(90deg, rgba(31,45,77,0.84) 0%, rgba(31,45,77,0.5) 45%, rgba(31,45,77,0) 78%)`, else `linear-gradient(0deg, rgba(31,45,77,0.9) 0%, rgba(31,45,77,0.55) 60%, rgba(31,45,77,0.15) 100%)`; text centre / bottom, padding `clamp(28px,5vw,80px)`, max 680: optional rating (toppers; **hidden until supplied**), Lora `clamp(30px,3.8vw,56px)` line, 15px Linen attribution.
6. **Build your bed** (Toppers, Pillows, Duvets only) — same as home, white, no overlap, padding `0 PX clamp(64px,8vw,104px)`.
7. **Complete your bed** — eyebrow "Pairs well with", H2 "Complete your bed", "Shop all" link; 3 cards `repeat(auto-fit, minmax(min(100%,280px),1fr))`: Mist, radius 28, padding 14, grid `2fr 3fr`; photo 3/4 radius 24; label eyebrow; Lora 24px title; tagline; "From £X →". Hover lift 3px + shadow `0 20px 44px rgba(31,45,77,0.12)`.
8. **Reviews** — as home (same copy), rounded top R without overlap.
9. **Offer** — as home but overlaps reviews (R, z 2); paragraph: "Join our list and we’ll email your code straight away. Use it on anything in this range, or across the whole collection."
10. Footer overlaps.

## Product page (order)
1. Strip (top). Breadcrumb (padding 24px PX 0, 15px Stone): Home / {collection} / {title}.
2. **Main** — padding `24px PX clamp(64px,8vw,96px)`, grid `repeat(auto-fit, minmax(min(100%,460px),1fr))`, gap `40px clamp(40px,5vw,80px)`.
   - Gallery (sticky top 96px at ≥1080): main image square, radius 24, white, `object-fit:contain`; counter pill "1 / N" + prev/next 44px buttons (shadow `0 4px 16px rgba(31,45,77,0.12)`); thumbs 80×80 radius 12, border 1.5px Navy (current) / Mist.
   - Info (max 580, gap 24): range eyebrow + badge pills; H1 Lora `clamp(30px,3.2vw,38px)`; spec 15px Stone; topper rating link — **hidden until supplied**; price 26px/600 (selected variant, else range "£a – £b"); compare struck + "Save N%" Clay; lead 17px; features with Navy ticks; option fieldset "{Option}: {selected / Choose one}", buttons grid `minmax(124px,1fr)` (56px, radius 12, selected Linen bg + Navy ring; label + dims); "Choose a {option} to continue." (Clay) when adding without a choice.
   - Qty stepper 52px + "Add to bed · £total" (Navy, flex 1 1 220px) + outline "Buy it now" (adds and goes to checkout). Assurances (top border): truck **Free UK delivery** on every order · chat **Help, 24/7** with sizing, washing or returns. Contact us · returns **Returns** on unused items in their original packaging. How returns work.
   - "Pairs well with" card (64×72 image). Accordions (Lora 20px, chevron): Description (open), Specifications (dl), Size guide (only if variants have dimensions; note "Measurements shown where confirmed. Not sure which size you need? Ask us — we’re here 24/7."), Care, Delivery & returns (copy in prototype + "Read the full returns policy").
3. **Why choose it** (if benefits) — Linen, rounded top R (no overlap), padding `clamp(56px,7vw,96px) PX calc(clamp(56px,7vw,96px) + R)`, 2 cols ≥900 `5fr 6fr`. Photo = 2nd product image, 4/5 max 640 radius 24. Eyebrow "Why choose it"; H2 Lora `clamp(30px,3.4vw,44px)` = title with "&" → "and"; benefits 01–03 (Lora 28px gold numbers, Lora 21px titles, 15px text).
4. **Compare** (if the collection has other products) — white, overlaps "why" when shown (R, z 3). Padding `clamp(56px,7vw,96px) max(PX, calc((100% - 1920px)/2 + PX))`. Eyebrow "Choosing between them"; H2 "Which {collection singular} is right for you?"; table (min-width 640, scrolls): product columns (88px image with 2px Navy ring on current, Lora 17px title, "You’re viewing" / "From £X"), rows with differing specs, options, price; current column Linen.
5. **FAQ** — white, z 3. Overlaps "why" only when "why" shows and compare doesn't; otherwise a 1px top border. Grid ≥900 `4fr 7fr`. Eyebrow "Good to know"; H2 "Questions about the {short name}"; "Anything else? Ask us, we’re here 24/7."; `<details>` rows (Lora 19px, plus icon).
6. **Reviews** — Mist, rounded top R (no overlap); heading "What customers *say*" (eyebrow as home).
7. **You may also like** — white, overlaps reviews (R, z 3); Lora `clamp(28px,3vw,36px)`; 4 cards (≥1000) / 2: photo 3/2 radius 18, ring Linen, badge, range 11px, Lora 18px title, price.
8. Footer (no overlap on product pages).
- Mobile (<768): sticky add bar (white, top border, shadow `0 -8px 24px rgba(31,45,77,0.08)`, title ellipsis + price + "Add to bed" 48px) with an 84px spacer.

## About page (order)
1. Strip (top).
2. Intro — padding `clamp(48px,7vw,96px) PX 48px`, grid `repeat(auto-fit, minmax(min(100%,420px),1fr))`, align end: eyebrow "About Elitlux"; H1 Lora `clamp(42px,5.4vw,60px)` "Comfort is *not a luxury.*"; 18px text "Elitlux is a UK bedding brand founded on a simple belief: everyone deserves to sleep the way they do in a good hotel — without paying hotel prices for it. We design duvets, pillows, protectors, toppers and cushions that bring that feeling home."
3. Photos — 3 cols ≥760: `u-reading-sage.jpg` arch 4/5; `bed-morning-light.jpg` 3/4 radius 32, margin-bottom `clamp(24px,4vw,64px)`; `v-shape-sleeping-sage.jpg` arch 4/5. Linen placeholder bg, hover zoom.
4. Values — padding `clamp(64px,8vw,96px) PX`; eyebrow "Our values"; H2 Lora `clamp(30px,3.4vw,40px)` "What we stand for"; 4 items (top border 1px Navy, Lora 24px): Considered comfort — Every product starts with how it feels: plump fills, smooth covers and quilting that keeps its shape. · Honest quality — We tell you exactly what’s in it — the fill, the fabric, the size — and never promise more than a pillow can do. · Care in the detail — Machine-washable fills and covers, so keeping your bed fresh is easy. · Restorative calm — Hotel-quality comfort for every home, without the big spend.
5. Who we make it for — eyebrow; H2 "Made for the way *you sleep*"; rows (Lora 24px / Stone / Navy 600 link): Refreshing a tired bed — A Mattress Topper adds 10cm of even softness — no new mattress needed. — Shop toppers → · Back, neck, bump or nursing — U and V-shape pillows that hold you, from bump to baby. — Shop Support Pillows → · Sleeping with allergies — Hypoallergenic fills and 100% waterproof protectors, with every material stated plainly. — Shop protectors →
6. Reviews — Mist, rounded top (no overlap); eyebrow "What customers say · Amazon UK"; heading "“Stays where *it should!*”".
7. Find us — white, overlaps reviews (R, z 3): eyebrow "Find us"; H2 "Shop us *your way*"; elitlux.co.uk — Free UK delivery on every order, and help at any hour. — Shop all · Amazon.co.uk — The full range is also available through the Elitlux store on Amazon UK. — Visit the Elitlux store.
8. Footer (no overlap).

## Contact page
1. Strip (top). Intro: eyebrow "Help, 24/7"; H1 "Real answers, *any hour.*"; "Sizing, washing, returns or a replacement — send us a message and we’ll come back to you."
2. Form card (white, border, radius 12, padding `clamp(24px,4vw,40px)`): "Send us a message"; Name, Email (52px inputs, radius 12); Order number (optional), What’s it about? (Choose a topic / Sizing / Washing and care / A return or exchange / Damaged or faulty item / Something else); Message (5 rows). Errors (Clay): "Please tell us your name." / "Please enter a valid email address." / "Please add a little more detail so we can help." Button "Send message" ("Sending…"); "We’ll only use your details to reply to you." Success: "Thank you, {name}." / "We’ve got your message and will reply to {email}." / "Send another message".
3. Get in touch (dl): Email / Phone / Hours — **hidden until supplied**; Address: Elitlux Ltd, 55 Newton Grove, Newton Mearns, Glasgow G77 5QJ, "Registered in Scotland, SC855958".
4. Delivery & returns: "Free UK delivery on every order, anywhere in the UK." + 4 steps + policy paragraph + "Read the full returns policy".

## Cart page
- Strip (top). Padding `clamp(40px,6vw,72px) PX clamp(64px,8vw,96px)`. H1 "Your bag".
- Empty: Mist box radius 24 "Your bag is empty." / "Let’s find something lovely for your bed." / Shop the collection · See the Mattress Topper.
- Lines (≥1080 `1.7fr minmax(320px,1fr)`): image `clamp(88px,12vw,120px)` aspect 430/491, Lora 20px title, line total, variant "Size: King", unit "£X each", qty stepper 44px, Remove.
- Summary aside (white, border, radius 12): "Order summary"; Subtotal; discount rows (Shopify's real discounts only); UK delivery Free; Total; "Discount codes can be added at checkout."; Checkout; "Help, 24/7 with sizing, washing or returns — contact us." / "Returns on unused items in their original packaging."
- "Complete your bed": up to 3 suggestions (pairs of items in the bag, then topper, protector, pillows, U-shape), cards 3/2.

## Search
- Strip (top). H1 "Search"; 60px pill input with icon, placeholder "Search toppers, pillows, protectors…"; "Try" + suggestion links (Mattress topper, U-shape pillow, Waterproof protector, 13.5 tog duvet, Cushion pad); "N results for “q”"; no results Mist box: "Nothing matches “q”." / "Try a simpler word like topper, pillow, protector or duvet, or ask us. We’re here 24/7." / Contact us; results grid of 3/2 cards.

## Footer (every page)
- Linen `#EFE7DA`, rounded top R, overflow hidden, z 6; overlaps the section above (`margin-top:-R`) on home and collection pages only.
- Emblem watermark `elitlux-emblem-navy.png` (multiply, opacity .12, right −4%, bottom −12%, width `clamp(320px,44vw,620px)`).
- Top row (auto-fit 340px, gap 40/64, padding-bottom 48, bottom border): navy logo 40px (multiply), brand line, "Follow us on Instagram · Facebook · X **@elitlux**"; Welcome offer column (Gold eyebrow, Lora 24px "10% off *your first order.*", "Join our list on the homepage and we’ll email your code straight away.", "Get 10% off →" scrolls to the offer).
- Link columns (auto-fit 170px, padding 48px 0), Gold eyebrows: Shop (Shop all, Mattress Toppers, Pillows, Support Pillows, Mattress Protectors, Duvets, Cushions) · Help (Contact us, Delivery & returns, Search, Your bag) · Elitlux (About us, Elitlux on Amazon UK) · Help, 24/7 (email, phone, hours — **hidden until supplied**) · Company (Elitlux Ltd · Registered in Scotland, company no. SC855958 · 55 Newton Grove, Newton Mearns / Glasgow G77 5QJ).
- Bottom bar: "© 2026 Elitlux. All rights reserved." + Privacy policy, Refund & returns policy (15px Stone).

## Overlays
- **Bag drawer**: overlay z 70; right panel `min(440px,100vw)` z 71, shadow `0 24px 64px rgba(31,45,77,0.18)`; head 72px "Your bag (N)"; empty state (Shop the collection + links Mattress Toppers / Pillows / Mattress Protectors / Duvets); lines (80px image, Lora 17px, total, variant, qty, Remove); foot: discount rows, Subtotal, "Free UK delivery. Discount codes can be added at checkout.", Checkout, View bag. Opens on every add. Focus moves to close; Esc closes.
- **Quick add sheet**: overlay z 80; dialog z 81 `min(520px,100vw)`, max-height 86vh, padding 24; centred radius 24 (≥768) / bottom sheet `24px 24px 0 0`. 72×82 image, range, Lora 22px title, "Choose a {option} to add it to your bag.", option buttons (60px, label + price), "See full details". Choosing adds 1 and opens the bag.

## Behaviour that must become settings / Liquid conditions
- Header transparent only when the template starts with a photo hero (home, collection).
- Strip under the hero on home/collection (overlapping) vs under the header elsewhere.
- Footer overlap only on home and collection templates.
- Product compare and FAQ overlap depend on whether "why" (benefits) and compare render.
- Build your bed on collections only for Toppers, Pillows, Duvets.
- Rating, review count, topper quote, contact email/phone/hours hidden until filled in.


## Appendix A — Reviews (same on every page; 5 per row, each row shown twice for the loop)
Row 1 (scrolls left):
- **Very good buy** — “If you want an extra layer of the mattress, this is the protector you need to get. It came in the right size as I wanted and also thick as well. Its winter now and you need all the heat protection as possible, this did it for me. I highly recommend it.” — Ade, Verified purchase · Double
- **Excellent Mattress Protector** — “Excellent. Great quality and deep sides/corners so it doesn't slip off.” — JD, Verified purchase · King
- **Great for protecting mattress** — “Excellent for keeping stains off of your mattress. Been using for about 6 months, washes well, need to hang it out as it drips. Overall great for protecting mattress” — Amazon Customer, Verified purchase · Small Double
- **Good product** — “Great product, fits well and more importantly....stays where it should!” — harrygilfillan, Verified purchase · King
- **Quilted mattress cover** — “Very good value and so comfortable. One happy customer.” — Amazon Customer, Verified purchase · Double
Row 2 (scrolls right):
- **Mattress protector** — “Great item. Very good quality. Great fit.” — Coffee lover, Verified purchase · King
- **Good quality** — “Good quality, does the job and looks nice.” — J.Harris, Verified purchase · Double
- **Well delivered** — “Good quality easy to fit” — scottie, Verified purchase · King
- **Order the correct size.** — “I found this item perfect and delivery was excellent.” — Charles Wood, Verified purchase · Double
- **Fits well.** — “As described.” — Barbara Boscott, Verified purchase · Double

## Appendix B — Build your bed
Photo `elt-duvet-floor.jpg` (alt "White duvet and duck feather pillows on a bed with a quilted topper"). Default: all three ticked, sizes [Double(index 2), Pack of 2, Single(index 1)… index per row: [2,0,1]], duvet tog 10.5.
- 1 Topper: cloud-topper — hotspot left 11%, top 46%
- 2 Pillows: duck-feather-pillows — hotspot left 17%, top 33%
- 3 Duvet: luxury-hollowfibre-4-5-tog / luxury-hollowfibre-10-5-tog / luxury-hollowfibre-13-5-tog (tog buttons 4.5 tog, 10.5 tog, 13.5 tog) — hotspot left 72%, top 62%

## Appendix C — Best sellers tabs and picks (top 3 shown)
- All (all): guard-mattress-protector, v-shape-pillow, duck-feather-pillows → link "Shop all products" /collections/all
- Pillows (pillows): duck-feather-pillows, v-shape-pillow, u-shape-pillow → link "Shop all pillows" /collections/pillows
- Duvets (duvets): luxury-hollowfibre-10-5-tog, luxury-hollowfibre-13-5-tog, luxury-microfibre-13-5-tog → link "Shop all duvets" /collections/duvets
- Protectors (protectors): guard-mattress-protector, terry-waterproof-protector → link "Shop all protectors" /collections/protectors
- Support pillows (bump-and-baby): v-shape-pillow, u-shape-pillow → link "Shop all support pillows" /collections/bump-and-baby
Card photo = product image index {"guard-mattress-protector":2,"terry-waterproof-protector":1,"duck-feather-pillows":3,"u-shape-pillow":1,"v-shape-pillow":1,"luxury-hollowfibre-10-5-tog":1,"luxury-microfibre-13-5-tog":1} (else card image).

## Appendix D — Mattress Topper steps
- 01 **10cm deep** — 10cm of plump, even softness on top of the mattress you already have. — photo `topper-bed-marble.jpg` (focus center; alt "Quilted Mattress Topper on a bed in warm evening light")
- 02 **Quilted to stay even** — Box quilting keeps the 1100–1200 GSM microfibre fill even across the whole bed. — photo `topper-hand-press.jpg` (focus center 70%; alt "Hand pressing into the quilted microfibre fill")
- 03 **Stays put** — Elastic corner straps give it a secure, non-slip fit. — photo `topper-strap-fit.png` (focus center; alt "Fitting the topper’s elastic strap under the mattress")
- 04 **Breathable and washable** — Breathable and hypoallergenic, so heat doesn’t build up while you sleep. Machine washable when it needs a refresh. — photo `topper-sleeping.jpg` (focus center; alt "Woman asleep on the Mattress Topper")

## Appendix E — Shop by range panels (order: toppers, pillows, bump-and-baby, protectors, duvets, cushions)
- 01 Toppers · **Mattress Toppers** — need: “Mattress too firm, or tired? Add 10cm of softness.” — photo `topper-sleeping.jpg` (focus center; alt "Woman asleep on the quilted Mattress Topper") → /collections/toppers
- 02 Pillows · **Pillows** — need: “Hotel nights, every night. Duck feather and down, in pairs.” — photo `elt-pillows-press.jpg` (focus center; alt "Hands plumping white pillows on a bed") → /collections/pillows
- 03 Support · **Support Pillows** — need: “Back, neck, bump or nursing? U and V-shape pillows that hold you.” — photo `elt-support-u-phone.jpg` (focus center; alt "Woman relaxing in bed against a U-shape pillow") → /collections/bump-and-baby
- 04 Protection · **Mattress Protectors** — need: “Spills, sweat or allergies? 100% waterproof, still breathable.” — photo `elt-protector-room.jpg` (focus center; alt "Quilted mattress protector on a bed in a bright bedroom") → /collections/protectors
- 05 Duvets · **Duvets** — need: “Too warm, or too cold? Light as a cloud, warm as you need.” — photo `elt-duvet-throw.jpg` (focus center; alt "Made bed with a plump white duvet and grey throw") → /collections/duvets
- 06 Living room · **Cushions** — need: “Sofa cushions gone flat? The plump they’re missing.” — photo `elt-cushions-rug.jpg` (focus center; alt "Two white cushion pads on a soft rug") → /collections/cushions

## Appendix F — Collection pages (custom.page JSON per collection)

### all
- Hero: eyebrow "Shop all" · title "Everything for *a better night.*" · intro "Pillows, toppers, duvets, protectors and cushion pads that bring the feeling of a hotel bed home, delivered free across the UK." · photo `elt-room-wide.jpg` (focus center; alt "Bright bedroom with a freshly made white bed")
- Chips: 13 products · Free UK delivery · Help, 24/7 · Lead card: cloud-topper ("Hero range") · Shop button "Shop everything" · Grid title "Every product"
- Guide: "Where to start" / "Find your range" / "Start with what’s keeping you up, and we’ll point you to the right range." · photo `bed-morning-light.jpg` ("Unmade white bed in soft morning light") · rows: Mattress too firm or tired — Mattress Topper, 10cm deep → collection toppers | Back, neck, bump or nursing — U and V-shape support pillows → collection bump-and-baby | Spills or allergies — Waterproof, breathable protectors → collection protectors | Too warm or too cold — Duvets from 4.5 to 13.5 tog → collection duvets | Flat sofa cushions — Hollowfibre pads in 11 sizes → collection cushions
- Banner: `elx-hero-sleep.png` (focus center; alt "Woman sleeping peacefully on a white pillow") "Softness you can feel. Warmth you can trust." — Elitlux
- Complete your bed: toppers, bump-and-baby, protectors
### toppers
- Hero: eyebrow "Mattress Toppers" · title "Your bed, *made new.*" · intro "10cm of plump, even softness that adds comfort and support without replacing your mattress, quilted so the fill stays even." · photo `topper-sleeping.jpg` (focus 60% center; alt "Woman asleep on the quilted Mattress Topper")
- Chips: 10cm deep · 1100–1200 GSM · Single to Super King · Machine washable · Lead card: cloud-topper ("Hero range") · Shop button "Shop the topper" · Grid title "The Quilted Mattress Topper"
- Guide: "Size guide" / "Find your size" / "Measure your mattress, then pick the matching size. Prices shown per size." · photo `topper-strap.jpg` ("Hands fitting the Mattress Topper to a mattress") · rows: variants of cloud-topper (size, dims, price)
- Banner: `topper-bed-marble.jpg` (focus 40% center; alt "Mattress Topper on a bed in warm evening light") "Rest, elevated." — Mattress Toppers (rating line, hidden until supplied)
- Complete your bed: protectors, pillows, duvets
- Build your bed: shown
### pillows
- Hero: eyebrow "Pillows" · title "Hotel nights, *every night.*" · intro "Natural duck feather and down for everyday softness, plus hollowfibre bolsters and support shapes for bump, back and neck." · photo `elt-pillows-press.jpg` (focus center; alt "Hands plumping white pillows on a bed")
- Chips: Duck feather & down · Bolsters, 3ft to 6ft · U and V shapes · Lead card: duck-feather-pillows ("Duck Feather Pillows") · Shop button "Shop pillows" · Grid title "All pillows"
- Guide: "Pillow guide" / "Which pillow?" / "Four ways to rest, side by side." · photo `elt-bolster-hug.jpg` ("Woman hugging a long bolster pillow") · rows: Duck Feather & Down — Everyday sleeping · 48 × 74cm · pack of 2 or 4 → duck-feather-pillows | Hollowfibre Bolster — Hug it or lean on it · 3ft to 6ft → bolster-pillow | U-Shape Body Pillow — Head-to-toe support · 3.7m → u-shape-pillow | V-Shape Support Pillow — Neck and back · 73 × 34cm → v-shape-pillow
- Banner: `elt-pillows-bed.jpg` (focus center; alt "Two white pillows on a made bed") "Hotel nights, every night." — Duck Feather Pillows
- Complete your bed: bump-and-baby, duvets, protectors
- Build your bed: shown
### bump-and-baby
- Hero: eyebrow "Support Pillows" · title "Comfort in *every curve.*" · intro "U and V-shape pillows for back, neck, pregnancy, nursing, reading and rest, with soft hollowfibre fill and a cover included." · photo `elt-support-u-phone.jpg` (focus 45% center; alt "Woman relaxing in bed against a U-shape pillow")
- Chips: U-shape, 3.7m · V-shape, 73 × 34cm · Cover included · Hypoallergenic fill · Lead card: u-shape-pillow ("Support") · Shop button "Shop support pillows" · Grid title "U and V-shape pillows"
- Guide: "Shape guide" / "U or V?" / "Two shapes, two kinds of support." · photo `elt-u-reading.jpg` ("Woman reading in bed, supported by a U-shape pillow") · rows: U-Shape Pregnancy & Body Pillow — Whole-body support, head to toe · removable cover → u-shape-pillow | V-Shape Support Pillow — Neck and back support · pillowcase included → v-shape-pillow
- Banner: `elt-v-side.jpg` (focus center; alt "Woman resting on her side against a V-shape pillow") "Support for back, neck, bump and beyond." — Support Pillows
- Complete your bed: pillows, protectors, duvets
### protectors
- Hero: eyebrow "Mattress Protectors" · title "Keep it fresh. *Keep it yours.*" · intro "A breathable, 100% waterproof layer that guards your mattress against everyday spills, dust and stains, in quilted or terry towel." · photo `elt-protector-room.jpg` (focus center; alt "Quilted mattress protector on a bed in a bright bedroom")
- Chips: 100% waterproof · Breathable · Quilted or terry · Machine washable · Lead card: guard-mattress-protector ("Protect") · Shop button "Shop protectors" · Grid title "Choose your protector"
- Guide: "Compare" / "Quilted or terry?" / "Both are 100% waterproof and machine washable. Choose the feel you prefer." · photo `protector-corner.jpg` ("Fitting a quilted protector over a mattress corner") · rows: Quilted Protector — Soft, breathable quilted surface · 30cm fitted skirt → guard-mattress-protector | Terry Towel Protector — Absorbent terry towel surface · aloe vera treated · deep fitted skirt → terry-waterproof-protector
- Banner: `protector-droplets.jpg` (focus center; alt "Water beading on a waterproof protector") "100% waterproof. Still breathable." — Mattress Protectors
- Complete your bed: toppers, pillows, duvets
### duvets
- Hero: eyebrow "Duvets" · title "Light as a cloud, *warm as you need.*" · intro "Hollowfibre and microfibre duvets, from a light 4.5 tog for summer nights to a warm 13.5 tog for cold British winters." · photo `elt-duvet-throw.jpg` (focus center; alt "Made bed with a plump white duvet and grey throw")
- Chips: 4.5 to 13.5 tog · Hollowfibre or microfibre · Single to Super King · Lead card: luxury-hollowfibre-10-5-tog ("All-season") · Shop button "Shop duvets" · Grid title "All duvets"
- Guide: "Tog guide" / "Choose your tog" / "The higher the tog, the warmer the duvet." · photo `elt-duvet-warm.jpg` ("Plump white duvet on a bed in warm light") · rows: 4.5 tog · Hollowfibre — Light, for summer nights → luxury-hollowfibre-4-5-tog | 10.5 tog · Hollowfibre — All-season, especially good on cooler spring nights → luxury-hollowfibre-10-5-tog | 13.5 tog · Hollowfibre — Our warmest weight, for cold winters → luxury-hollowfibre-13-5-tog | 13.5 tog · Microfibre — Winter warmth with a soft microfibre fill → luxury-microfibre-13-5-tog | Essential Winter Duvet — Hollowfibre, multi-pocket construction → essential-hollowfibre-duvet
- Banner: `elt-duvet-floor.jpg` (focus center; alt "White duvet and pillows on a low bed") "Curl up, and sleep soundly." — Duvets
- Complete your bed: pillows, toppers, protectors
- Build your bed: shown
### cushions
- Hero: eyebrow "Cushions" · title "The plump *your sofa’s missing.*" · intro "Soft yet supportive cushion pads filled with virgin hollowfibre that keeps its shape, in eleven sizes from 12in to 30in." · photo `elt-cushions-rug.jpg` (focus center; alt "Two white cushion pads on a soft rug")
- Chips: Virgin hollowfibre · Sewn seam · 11 sizes · From £4.64 · Lead card: nest-cushion-pad ("Living room") · Shop button "Shop cushion pads" · Grid title "Hollowfibre Cushion Pad"
- Guide: "Size guide" / "Find your size" / "Choose the pad that matches your cushion cover. Prices shown per size." · photo `cushions-bed-sage.jpg` ("Two plump white cushions on a linen bed") · rows: variants of nest-cushion-pad (size, dims, price)
- Banner: `duvet-sofa-cushions.png` (focus center; alt "Cushions on a sofa with a throw") "Sofa, bed or reading corner." — Cushions
- Complete your bed: pillows, duvets, bump-and-baby

Range cards used by "Complete your bed" (photo · title · label · tagline): toppers: `topper-bed-marble.jpg` (focus 60% center) · Mattress Toppers · Toppers · Your bed, made new. | pillows: `elt-pillows-press.jpg` (focus center) · Pillows · Pillows · Hotel nights, every night. | bump-and-baby: `bump-reading.jpg` (focus 45% center) · Support Pillows · Support · Comfort in every curve. | protectors: `elt-protector-room.jpg` (focus 65% center) · Mattress Protectors · Protection · Keep it fresh. Keep it yours. | duvets: `elt-duvet-throw.jpg` (focus 68% center) · Duvets · Duvets · Light as a cloud, warm as you need. | cushions: `cushions-sofa.jpg` (focus center) · Cushions · Living room · The plump your sofa’s missing.

Not rendered in this prototype (data present in logic but unused): bento tiles, arches, needs, inset images, collection benefits/"promise" cards, "feel" block.
