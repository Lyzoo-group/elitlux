# Redesign brief (user, Oct 15) — homepage + all category pages
Deliver: concise audit + mapped user flows, design strategy, implemented homepage, all 6 category landing pages (+ Shop all), list of image placeholders with search phrases. Verified info only (no invented claims/testimonials). Refs: khome.co.uk, homecrayons.com, kneepillow.co.uk U-shape page (inspiration only). Prototype first (v4 copy of v3), Shopify later. Premium 2026 feel: layered compositions, arches/organic shapes, curved section transitions, image overlays, varied aspect ratios, subtle scroll reveals (respect reduced motion), hover states. Not PDP.

# v3 facts
Palette: bg #EAF2EC sage, panel #DCE8DF, line #C5D6CB, stone #59665F, ink #1E2A26, Forest #08382F (main), hover #2C4A43, cream #FBF9F4 (footer/occasional). No gold (user disliked). Fonts Lora + Inter. Width max 1920, pad clamp(20px,4vw,80px).
Home block: `<sc-if value="{{ isHome }}"` … up to `<sc-if value="{{ isListing }}"`. Listing block ends right before `<sc-if value="{{ isProduct }}"`.
Listing logic vars: col{title,label,tagline,blurb,img,hasImg}, colFound, colMissing, tabs[{href,label,current,color,line}], items (card objs), countText, sort/onSort, loading, loadError, retry, skeletons. card(): href,title,range,spec,price,hasCompare,compare,img,full,alt,hasBadge,badge. find(h), money(n), lo(p), P, C, page, s.route.handle, vw, desk(>=1000), mobile(<768), wide(>=1080). bestQuick items have onQuick/quickLabel/quickAria; quick sheet via setState({quick: handle}); addLine(p, i, 1, 'add').
Collections: all, toppers(1: cloud-topper), pillows(duck-feather-pillows, u-shape-pillow, v-shape-pillow, bolster-pillow), bump-and-baby(u, v), protectors(guard-mattress-protector, terry-waterproof-protector), duvets(4.5, 10.5, 13.5 hollowfibre, 13.5 microfibre, essential), cushions(1: nest-cushion-pad, 11 sizes).
Uploads are 2048² PNG ~7.7MB → resize to img/*.jpg.

# Image catalog (uploads/N.png → img name)
1 cushion-pair-cutout (cream bg) · 2 cushions-sofa (sage room) · 5 cushions-bench · 6 cushions-bed-sage
10 u-shape-cutout · 15 bump-reading (pregnant, U) · 16 bump-sleeping (hug U) · 18 u-reading-sage
22 v-shape-sleeping-sage · 24 v-shape-mug · 13 pillow-fabric-detail · 28 pillow-feathers · 31 pillow-joy (pillow above head) · 30 pillow-grip (moody)
33 bed-morning-light (rumpled white bed, window) · 32 bedroom-sage-window (sage pillows, French windows)
36 bolster-sleeping · 35 bolster-stool
43 duvet-folded-cutout · 44 duvet-draped · 45 duvet-rolled · 47 duvet-hug · 49 duvet-sunlight · 50 pillows-duvet-window · 51 duvet-palm
53 topper-floor · 54 topper-bed-marble · 55 topper-hand-press · 56 topper-strap · 57 topper-sleeping (woman, warm)
58 protector-spill (glass, terry) · 59 terry-fitting · 62 terry-pinch · 66 protector-corner (hand, quilted) · 67 protector-bed (quilted) · 68 protector-droplets
Avoid: social posts with baked text, 41/52 (labels), 60 (stain arrow), Vogue/Halloween posts.

# Reviews (verbatim, Cloud Topper, Amazon UK, 4.6/5 from 32)
Sophia Evans: "…Our mattress was just a bit too firm for me and this completely fixed it, like sleeping on a cloud!" · Suzy: "Made all the difference to my flat mattress. Haven't slept this good for ages"
