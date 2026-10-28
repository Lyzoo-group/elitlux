// Elovela catalogue — sourced from elovela.com (shop, product and policy pages) and the Elovela Store on Amazon.co.uk, Oct 2026.
// Shopify mapping: each object ≈ a product (handle, title, product_type, collections, variants, images, metafields).
// PRICES: the lowest and highest variant of every product match the live site's price range.
// Variants marked est:true sit between those verified prices and are INTERPOLATED PLACEHOLDERS — replace with real variant prices on import.
const IMG = 'https://elovela.com/wp-content/uploads/2025/12/';
// Images are served from the Elovela Shopify store's CDN (elovela.com blocks hotlinking).
const SHOP_CDN = 'https://cdn.shopify.com/s/files/1/0859/9640/4956/files/';
const SHOP_V = {"Topper-0002.jpg":1791809148,"Mattress-Topper-03.jpg":1791809148,"Mattress-Topper-04.jpg":1791809148,"Mattress-Topper-05.jpg":1791809148,"Protector-0002.jpg":1791809149,"Mattress-Protector-03.jpg":1791809149,"Mattress-Protector-04.jpg":1791809149,"Mattress-Protector-05.jpg":1791809149,"Terry-Towel-Waterproof-Mattress-Protector.jpg":1791809150,"Duck-Feather-Pillows-01.jpg":1791809151,"Duck-Feather-Pillows-06.jpg":1791809151,"Duck-Feather-Pillows-03.jpg":1791809151,"Duck-Feather-Pillows-05.jpg":1791809151,"Duck-Feather-Pillows-04.jpg":1791809151,"Duck-Feather-Pillows-02.jpg":1791809150,"Loomerig-U-Shape-Pillow-01.jpg":1791809199,"Loomerig-U-Shape-Pillow-04.jpg":1791809199,"Loomerig-U-Shape-Pillow-06.jpg":1791809199,"Loomerig-U-Shape-Pillow-05.jpg":1791809199,"Loomerig-U-Shape-Pillow-03.jpg":1791809200,"Loomerig-U-Shape-Pillow-02.jpg":1791809199,"Loomerig-V-Shape-Pillow-01.jpg":1791809201,"Loomerig-V-Shape-Pillow-02.jpg":1791809200,"Bolster-Pillow-01.jpg":1791809201,"Bolster-Pillow-09.jpg":1791809201,"Luxury-Hollowfibre-4.5-Tog-Duvet-01.jpg":1791809202,"Luxury-Hollowfibre-4.5-Tog-Duvet-02.jpg":1791809201,"Luxury-Hollowfibre-10.5-Tog-Duvet-01.jpg":1791809259,"Luxury-Hollowfibre-10.5-Tog-Duvet-02.jpg":1791809259,"Luxury-Hollowfibre-13.5-Tog-Duvet-01.jpg":1791809260,"Luxury-Hollowfibre-13.5-Tog-Duvet-02.jpg":1791809260,"Luxury-Microfibre-13.5-Tog-Duvet-01.jpg":1791809261,"Luxury-Microfibre-13.5-Tog-Duvet-02.jpg":1791809260,"Essential-Hollow-fibre-Duvet-01.jpg":1791809261,"Essential-Hollow-fibre-Duvet-02.jpg":1791809261,"Loomerig-Cushion-01.jpg":1791809262,"Loomerig-Cushion-03.jpg":1791809262,"Loomerig-Cushion-04.jpg":1791809261};
const src = (f) => (SHOP_V[f] ? SHOP_CDN + f + '?v=' + SHOP_V[f] : IMG + f);
const L = (title, files, alts = []) => files.map((f, i) => ({ src: 'img/' + f, alt: alts[i] || `${title}, view ${i + 1}` }));
const card = (f) => src(f) + (SHOP_V[f] ? '&width=860' : '');
const gallery = (title, files, alts = []) => files.map((f, i) => ({ src: src(f), alt: alts[i] || `${title}, view ${i + 1}` }));
function sized(list, min, max) {
  const n = list.length;
  return list.map(([title, dims], i) => ({
    title, dims: dims || '',
    price: n === 1 ? min : Math.round((min + ((max - min) * i) / (n - 1)) * 100) / 100,
    est: n > 2 && i !== 0 && i !== n - 1,
  }));
}
const BED5 = (single, small, dbl, king, sk) => [['Single', single], ['4ft', small || 'Small double'], ['Double', dbl], ['King', king], ['Super King', sk]];
const DUVET = [['Single'], ['Double'], ['King'], ['Super King']];
const CARE_LABEL = 'Follow the care label for wash temperature and drying.';

export const COLLECTIONS = [
  { handle: 'all', label: 'Elovela', title: 'Shop all', tagline: 'Rest, made lovely.', blurb: 'Every Elovela product, from everyday pillows to deep toppers and support shapes.', img: '' },
  { handle: 'toppers', label: 'Toppers', title: 'Cloud Toppers', tagline: 'Your bed, made new.', blurb: '10cm deep, 1100–1200 GSM microfibre, quilted to stay even. Single to Super King.', img: 'https://cdn.shopify.com/s/files/1/0859/9640/4956/files/Topper-0002.jpg?v=1791809148' },
  { handle: 'pillows', label: 'Pillows', title: 'Pillows', tagline: 'Hotel nights, every night.', blurb: 'Natural duck feather and down for everyday softness, plus support shapes for bump, back and neck.', img: 'https://cdn.shopify.com/s/files/1/0859/9640/4956/files/Bolster-Pillow-09.jpg?v=1791809201' },
  { handle: 'bump-and-baby', label: 'Support', title: 'Support Pillows', tagline: 'Hold you, however you rest.', blurb: 'V and U-shape pillows for pregnancy, nursing, back and neck, with the cover included.', img: 'https://cdn.shopify.com/s/files/1/0859/9640/4956/files/Loomerig-U-Shape-Pillow-01.jpg?v=1791809199' },
  { handle: 'protectors', label: 'Protection', title: 'Guard Protectors', tagline: 'Quietly keeps your bed fresh.', blurb: '100% waterproof and breathable, with quilted and terry towel options and deep fitted skirts.', img: 'https://cdn.shopify.com/s/files/1/0859/9640/4956/files/Terry-Towel-Waterproof-Mattress-Protector.jpg?v=1791809150' },
  { handle: 'duvets', label: 'Duvets', title: 'Duvets', tagline: 'A tog for every season.', blurb: 'Hollowfibre and microfibre duvets, from a light 4.5 tog for summer to a warm 13.5 tog for winter.', img: 'https://cdn.shopify.com/s/files/1/0859/9640/4956/files/Essential-Hollow-fibre-Duvet-01.jpg?v=1791809261' },
  { handle: 'cushions', label: 'Living room', title: 'Nest Cushions', tagline: 'The plump your sofa’s missing.', blurb: 'Virgin hollowfibre cushion pads with bounce-back fill, in eleven sizes from 12in to 30in.', img: 'https://cdn.shopify.com/s/files/1/0859/9640/4956/files/Loomerig-Cushion-01.jpg?v=1791809262' },
];

const duvet = (o) => ({
  type: 'Duvet', range: 'Duvets', collections: ['duvets'], option: 'Size', badges: [], pairsWith: 'duck-feather-pillows',
  related: ['duck-feather-pillows', 'guard-mattress-protector', 'cloud-topper', 'luxury-hollowfibre-10-5-tog'],
  care: [CARE_LABEL], keywords: 'duvet quilt tog bedding', ...o,
});

export const PRODUCTS = [
  {
    handle: 'cloud-topper', title: 'Cloud Mattress Topper', type: 'Mattress topper', range: 'Cloud Topper', sku: 'LGT12',
    collections: ['toppers'], badges: ['Hero range'], option: 'Size',
    spec: '10cm deep · 1100–1200 GSM · Single to Super King',
    lead: 'Your bed, made new. 10cm of plump, even softness that adds comfort and support without replacing your mattress.',
    variants: sized(BED5('90 × 190cm', '', '137 × 190cm', '', '182 × 200cm'), 20.64, 29.64),
    card: 'img/topper-press-quilt.png',
    images: L('Cloud Mattress Topper', ['topper-press-quilt.png', 'topper-eyemask.jpg', 'topper-strap-fit.png', 'topper-sleeping.jpg', 'topper-bed-marble.jpg'], ['Hand pressing the quilted Cloud Topper', 'Woman in an eye mask resting on the Cloud Topper', 'Fitting the Cloud Topper’s elastic strap under the mattress', 'Woman asleep on the Cloud Topper', 'Cloud Topper on a bed']),
    features: ['10cm deep, quilted so the fill stays even', '1100–1200 GSM microfibre fill, depending on size', 'Breathable and hypoallergenic', 'Secure, non-slip fit', 'Machine washable'],
    description: [
      'A quilted microfibre topper that sits on your mattress and adds 10cm of soft, even comfort. The cushioning adapts to your body shape, helping keep your spine aligned and reducing movement disturbance through the night.',
      'Breathable materials let air move freely, so heat doesn’t build up while you sleep. It’s ideal for a firm or tired mattress — it restores comfort and helps your mattress last longer.',
    ],
    specs: [['Depth', '10cm'], ['Fill', 'Microfibre, 1100–1200 GSM by size'], ['Fabric', '100% microfibre'], ['Fit', 'Secure, non-slip'], ['Colour', 'White'], ['SKU', 'LGT12']],
    care: ['Machine washable.', CARE_LABEL],
    pairsWith: 'guard-mattress-protector', related: ['guard-mattress-protector', 'terry-waterproof-protector', 'duck-feather-pillows', 'luxury-hollowfibre-10-5-tog'],
    keywords: 'mattress topper microfibre quilted toppers',
    benefits: [['Softness that stays even','Quilted panels hold the microfibre in place, so it doesn’t bunch or go flat in the middle.'],['Cooler nights','Breathable materials let air move freely, so heat doesn’t build up while you sleep.'],['Stays put','A secure, non-slip fit keeps the topper where you laid it, night after night.']],
  },
  {
    handle: 'guard-mattress-protector', title: 'Guard Waterproof Mattress Protector', type: 'Mattress protector', range: 'Guard Protectors', sku: 'TBW02',
    collections: ['protectors'], badges: ['Hypoallergenic'], option: 'Size',
    spec: '100% waterproof · 30cm deep skirt · Single to Super King',
    lead: 'Quietly keeps your bed fresh. A breathable, waterproof layer that guards your mattress against everyday spills, dust and stains.',
    variants: sized(BED5('', '', '', '152 × 200cm', ''), 11.64, 15.64),
    card: 'img/protector-corner.jpg',
    images: L('Guard Waterproof Mattress Protector', ['protector-corner.jpg', 'protector-bed.jpg', 'protector-droplets.jpg', 'protector-spill.jpg'], ['Fitting the Guard protector over a mattress corner', 'Guard protector on a made bed', 'Water beading on the waterproof surface', 'A spill sitting on top of the protector']),
    features: ['100% waterproof', 'Soft, breathable quilted surface', 'Fitted stretch skirt, 30cm deep', 'A barrier against allergens and moisture', 'Machine washable'],
    description: [
      'Made with breathable fabric, it adds a soft layer of comfort without changing the natural feel of your mattress.',
      'It acts as a barrier against allergens and moisture, helping your mattress last longer. Easy to remove and wash, it’s a simple way to keep your bed fresh.',
    ],
    specs: [['Waterproof', '100%'], ['Surface', 'Quilted, breathable'], ['Skirt', 'Fitted stretch skirt, 30cm deep'], ['Colour', 'White'], ['SKU', 'TBW02']],
    care: ['Easy to remove and machine wash.', CARE_LABEL],
    pairsWith: 'cloud-topper', related: ['cloud-topper', 'terry-waterproof-protector', 'duck-feather-pillows', 'luxury-hollowfibre-13-5-tog'],
    keywords: 'mattress protector waterproof protection quilted protectors',
    benefits: [['Nothing gets through','100% waterproof against spills, sweat and stains, and it still breathes.'],['You won’t feel it','A soft quilted surface adds a little comfort without changing how your mattress feels.'],['Fits deep mattresses','A 30cm stretch skirt wraps under the mattress and stays in place.']],
  },
  {
    handle: 'terry-waterproof-protector', title: 'Terry Towel Waterproof Mattress Protector', type: 'Mattress protector', range: 'Guard Protectors',
    collections: ['protectors'], badges: [], option: 'Size',
    spec: '100% waterproof · Terry towel · Aloe vera treated',
    lead: 'A soft terry towel surface over a waterproof layer. It absorbs spills and lets air circulate, so your bed stays fresh and you stay comfortable.',
    variants: sized(BED5('90 × 190cm', '', '', '', ''), 9.99, 13.99),
    card: 'img/terry-fitting-corner.png',
    images: L('Terry Towel Waterproof Mattress Protector', ['terry-fitting-corner.png', 'terry-pinch.jpg', 'terry-fitting.jpg'], ['Fitting the terry towel protector over a mattress corner', 'Close-up of the terry towel surface', 'Terry towel protector being fitted']),
    features: ['100% waterproof', 'Breathable terry towel surface', 'Aloe vera treated', 'Deep fitted stretch skirt', 'Machine washable'],
    description: [
      'Helps protect your mattress against allergens, dust and bed bugs, while adding an extra comfortable layer to your bed.',
      'The terry towel surface absorbs liquid and moisture and allows air to circulate, so you sleep comfortably and your mattress stays clean.',
    ],
    specs: [['Waterproof', '100%'], ['Surface', 'Terry towel'], ['Treatment', 'Aloe vera'], ['Skirt', 'Deep fitted stretch skirt'], ['Colour', 'White']],
    care: ['Machine washable.', CARE_LABEL],
    pairsWith: 'cloud-topper', related: ['guard-mattress-protector', 'cloud-topper', 'duck-feather-pillows', 'luxury-hollowfibre-4-5-tog'],
    keywords: 'mattress protector waterproof terry towel aloe vera protectors',
    benefits: [['Absorbs, then protects','Terry towel soaks up spills while the waterproof layer underneath keeps the mattress dry.'],['Air keeps moving','Breathable fabric lets air circulate, so you don’t overheat.'],['Soft, treated surface','A terry towel top with an aloe vera treatment, over a deep fitted skirt.']],
  },
  {
    handle: 'duck-feather-pillows', title: 'Hotel Collection Duck Feather & Down Pillows', type: 'Bed pillow', range: 'Hotel Collection', sku: 'TBW06',
    collections: ['pillows'], badges: [], option: 'Pack',
    spec: 'Standard 48 × 74cm · Duck feather & down · Pack of 2 or 4',
    lead: 'Hotel nights, every night. Natural duck feather and down in a 100% cotton, double-stitched cover — soft, supportive and sold in pairs.',
    variants: sized([['Pack of 2', '2 pillows'], ['Pack of 4', '4 pillows']], 19.64, 34.64),
    card: 'img/pillows-stack-stool.png',
    images: L('Hotel Collection Duck Feather & Down Pillows', ['pillows-stack-stool.png', 'pillow-feathers.jpg', 'pillow-fabric-detail.jpg', 'pillows-duvet-window.jpg', 'pillow-joy.jpg'], ['Four duck feather and down pillows stacked on a stool', 'Duck feathers and down', 'Close-up of the double-stitched cotton cover', 'Pillows and duvet in window light', 'Woman hugging a pillow']),
    features: ['Natural duck feather and down fill', '100% cotton cover, double stitched', 'Breathable, so you stay cool', 'For side, stomach and back sleepers', 'Machine washable on a cold wash'],
    description: [
      'A balance of duck feather and down gives these pillows the right kind of softness, with enough support for your neck and shoulders. They suit side, stomach and back sleepers alike.',
      'The fill sits directly inside a 100% cotton cover (it isn’t a separate case), double stitched to hold its shape and keep the feathers in. The cotton breathes, so air keeps moving and you stay comfortable all night.',
    ],
    specs: [['Size', 'Standard, 48 × 74cm (19 × 29in)'], ['Fill', 'Duck feather and down'], ['Cover', '100% cotton, double stitched'], ['Colour', 'White'], ['SKU', 'TBW06']],
    care: ['Machine washable on a cold wash.', CARE_LABEL],
    pairsWith: 'guard-mattress-protector', related: ['cloud-topper', 'guard-mattress-protector', 'luxury-hollowfibre-10-5-tog', 'bolster-pillow'],
    keywords: 'bed pillow pillows feather down hotel standard',
    benefits: [['Soft, with real support','A balance of duck feather and down gives softness with enough support for your neck and shoulders.'],['Breathable cotton','The 100% cotton cover lets air move, so you stay comfortable all night.'],['Built to keep its shape','Double stitching holds the shape and keeps the feathers in.']],
  },
  {
    handle: 'u-shape-pillow', title: 'U-Shape Pregnancy & Body Pillow', type: 'Support pillow', range: 'Support Pillows', sku: 'TBW03',
    collections: ['pillows', 'bump-and-baby'], badges: ['Support'], option: 'Colour', compareAt: 27.99,
    spec: '12ft / 3.7m · Hollowfibre · Removable cover',
    lead: 'Held, from bump to baby. A 3.7m U-shape that cradles you from head to toe, keeping your neck, shoulders, back and hips aligned.',
    variants: sized([['White']], 24.64, 24.64),
    card: 'img/u-shape-cutout.jpg',
    images: L('U-Shape Pregnancy & Body Pillow', ['u-shape-cutout.jpg', 'u-reading-sage.jpg', 'bump-sleeping.jpg', 'bump-reading.jpg'], ['U-shape pregnancy and body pillow', 'Reading propped up in the U-shape pillow', 'Sleeping on her side with the U-shape pillow', 'Expectant mother reading with the U-shape pillow']),
    features: ['12ft / 3.7m long — cradles you from head to toe', 'Keeps neck, shoulders, back and hips aligned', 'Soft hollowfibre fill, microfibre outer', 'Removable cover', 'Hypoallergenic and chemical free', 'Lightweight and machine washable'],
    description: [
      'The U-shaped body pillow gives comfort and support through pregnancy, or whenever your back, hips, shoulders or neck need a little more. Its shape cradles your body all night long, so you can settle and stay comfortable.',
      'Soft hollowfibre filling sits inside a microfibre outer, with a removable cover for easy washing.',
    ],
    specs: [['Length', '12ft / 3.7m'], ['Shape', 'U-shape (semicircular)'], ['Fill', 'Polyester hollowfibre'], ['Outer', 'Microfibre'], ['Cover', 'Removable'], ['Colour', 'White'], ['SKU', 'TBW03']],
    care: ['Machine washable, with a removable cover.', CARE_LABEL],
    pairsWith: 'v-shape-pillow', related: ['v-shape-pillow', 'bolster-pillow', 'duck-feather-pillows', 'guard-mattress-protector'],
    keywords: 'pregnancy maternity body pillow support u shape',
    benefits: [['Support from head to toe','3.7m of pillow cradles your whole body, keeping neck, shoulders, back and hips aligned.'],['For bump, back and beyond','Made for pregnancy, and just as useful whenever your back, hips, shoulders or neck need a little more.'],['Easy to keep fresh','The cover comes off for washing, and the fill is hypoallergenic and chemical free.']],
  },
  {
    handle: 'v-shape-pillow', title: 'V-Shape Support Pillow', type: 'Support pillow', range: 'Support Pillows',
    collections: ['pillows', 'bump-and-baby'], badges: ['Support'], option: 'Colour', compareAt: 12.95,
    spec: '73 × 34cm · Hollowfibre · Pillowcase included',
    lead: 'Support around the back and sides of your neck — for sleeping, nursing, reading or an evening on the sofa.',
    variants: sized([['White']], 9.64, 9.64),
    card: 'img/v-shape-green-bed.png',
    images: L('V-Shape Support Pillow', ['v-shape-green-bed.png', 'v-shape-mug.jpg', 'v-shape-sleeping-sage.jpg'], ['V-shape support pillow against a headboard', 'V-shape pillow with a morning mug', 'Sleeping against the V-shape pillow']),
    features: ['Supports the back and sides of your neck', 'Made for pregnancy and nursing', 'Generous non-allergenic hollowfibre', 'High-density down-proof fabric keeps the fibre in', 'Pillowcase included'],
    description: [
      'A multipurpose V-shaped pillow for neck and back support. Use it for sleeping, reading or watching TV, and through pregnancy and nursing, when a little extra support goes a long way.',
      'A poly-cotton cover and generous non-allergenic hollowfibre make it a good choice for allergy-conscious sleepers, with high-density down-proof fabric that stops the fibre working its way out.',
    ],
    specs: [['Size', '73 × 34cm'], ['Fill', 'Hollowfibre'], ['Cover', 'Poly-cotton, high-density down-proof fabric'], ['Colour', 'White']],
    care: [CARE_LABEL],
    pairsWith: 'u-shape-pillow', related: ['u-shape-pillow', 'bolster-pillow', 'duck-feather-pillows', 'nest-cushion-pad'],
    keywords: 'nursing pregnancy orthopaedic neck back support v shape pillow',
    benefits: [['Holds your neck and back','The V-shape supports the back and sides of your neck while you sit up in bed.'],['From pregnancy to nursing','Comfortable support through pregnancy and while feeding.'],['Kind to allergies','Non-allergenic hollowfibre in a down-proof poly-cotton cover, with a pillowcase included.']],
  },
  {
    handle: 'bolster-pillow', title: 'Hollowfibre Bolster Pillow', type: 'Support pillow', range: 'Pillows',
    collections: ['pillows'], badges: [], option: 'Length',
    spec: 'Hollowfibre · 100% cotton cover · 3ft to 6ft',
    lead: 'A long, soft bolster for full-body support. Hug it, lean on it, or tuck it along your back.',
    variants: sized([['3ft', 'Single'], ['4ft', 'Small double'], ['4ft 6in', 'Double'], ['5ft', 'King'], ['6ft', 'Super King']], 9.64, 14.64),
    card: 'img/bolster-sleeping.jpg',
    images: L('Hollowfibre Bolster Pillow', ['bolster-sleeping.jpg'], ['Woman sleeping with the hollowfibre bolster pillow']),
    features: ['Full-body, back, neck and maternity support', 'Soft hollowfibre fill', 'Breathable 100% cotton cover', 'Resists pilling', 'Five lengths, 3ft to 6ft'],
    description: [
      'A full-length bolster filled with soft hollowfibre, for back, neck and maternity support or simply something to hold on to.',
      'The 100% cotton cover is breathable and soft, and made to resist pilling.',
    ],
    specs: [['Fill', 'Hollowfibre'], ['Cover', '100% cotton'], ['Lengths', '3ft, 4ft, 4ft 6in, 5ft, 6ft'], ['Colour', 'White']],
    care: [CARE_LABEL],
    pairsWith: 'u-shape-pillow', related: ['u-shape-pillow', 'v-shape-pillow', 'duck-feather-pillows', 'nest-cushion-pad'],
    keywords: 'bolster body pillow maternity long support',
    benefits: [['Full-length support','Hug it, lean on it or tuck it along your back for support where you need it.'],['Soft, breathable cotton','A 100% cotton cover that breathes and resists pilling.'],['A length for every bed','Five lengths from 3ft to 6ft, matching Single through Super King.']],
  },
  duvet({
    handle: 'luxury-hollowfibre-4-5-tog', title: 'Luxury Hollowfibre 4.5 Tog Duvet', spec: '4.5 tog · Hollowfibre · Polycotton',
    lead: 'A light 4.5 tog for summer nights and warm rooms.',
    variants: sized(DUVET, 11.64, 15.64), card: 'img/duvet-sunlight.jpg',
    images: L('Luxury Hollowfibre 4.5 Tog Duvet', ['duvet-sunlight.jpg', 'duvet-flatlay-green.png', 'duvet-mug-morning.png', 'duvet-palm.jpg'], ['Light duvet in summer sunlight', 'Duvet and pillows from above', 'Morning mug on the duvet', 'Hand resting on the duvet']),
    features: ['4.5 tog — light, for summer', 'Soft hollowfibre fill', 'Polycotton cover'],
    description: ['Wrap yourself in a lightweight hollowfibre duvet made for summer nights, so you sleep well and wake up refreshed.'],
    specs: [['Tog', '4.5'], ['Fill', 'Hollowfibre'], ['Cover', 'Polycotton'], ['Colour', 'White']],
    benefits: [['Made for summer','A light 4.5 tog that keeps you covered without overheating on warm nights.'],['Soft hollowfibre fill','Plump, lightweight hollowfibre in a polycotton cover.'],['Part of a tog family','Pair it with a 10.5 or 13.5 tog as the seasons change.']],
  }),
  duvet({
    handle: 'luxury-hollowfibre-10-5-tog', title: 'Luxury Hollowfibre 10.5 Tog Duvet', spec: '10.5 tog · Hollowfibre · Polycotton',
    lead: 'An all-season 10.5 tog — the one to keep on the bed most of the year.',
    variants: sized(DUVET, 12.64, 17.14), card: 'img/duvet-rolled-hands.png',
    images: L('Luxury Hollowfibre 10.5 Tog Duvet', ['duvet-rolled-hands.png', 'duvet-lamp-evening.png', 'duvet-draped.jpg', 'duvet-flatlay-green.png'], ['Rolled hollowfibre duvet', 'Duvet on a bed in evening lamplight', 'Duvet draped over the bed', 'Duvet and pillows from above']),
    features: ['10.5 tog — for year-round use', 'Soft hollowfibre fill', 'Polycotton cover'],
    description: ['Curl up in a hollowfibre 10.5 tog duvet. It’s made for year-round use, and especially good on cooler spring nights.'],
    specs: [['Tog', '10.5'], ['Fill', 'Hollowfibre'], ['Cover', 'Polycotton'], ['Colour', 'White']],
    benefits: [['One duvet, most of the year','Made for year-round use, and especially good on cooler spring nights.'],['Soft hollowfibre fill','Plump, lightweight hollowfibre in a polycotton cover.'],['Four sizes','Single, Double, King and Super King.']],
  }),
  duvet({
    handle: 'luxury-hollowfibre-13-5-tog', title: 'Luxury Hollowfibre 13.5 Tog Duvet', spec: '13.5 tog · Hollowfibre · Polycotton',
    lead: 'A warm 13.5 tog for cold British winters.',
    variants: sized(DUVET, 13.64, 19.64), card: 'img/duvet-hug.jpg',
    images: L('Luxury Hollowfibre 13.5 Tog Duvet', ['duvet-hug.jpg', 'duvet-lamp-evening.png', 'duvet-rolled-hands.png', 'duvet-folded-cutout.jpg'], ['Wrapped up in the 13.5 tog duvet', 'Duvet on a bed in evening lamplight', 'Rolled hollowfibre duvet', 'Folded duvet']),
    features: ['13.5 tog — our warmest weight', 'Soft hollowfibre fill', 'Polycotton cover'],
    description: ['Our highest tog, made for the coldest winter nights, so you sleep soundly and wake up warm.'],
    specs: [['Tog', '13.5'], ['Fill', 'Hollowfibre'], ['Cover', 'Polycotton'], ['Colour', 'White']],
    benefits: [['Our warmest weight','13.5 tog for the coldest nights of a British winter.'],['Soft hollowfibre fill','Plump, lightweight hollowfibre in a polycotton cover.'],['Four sizes','Single, Double, King and Super King.']],
  }),
  duvet({
    handle: 'luxury-microfibre-13-5-tog', title: 'Luxury Microfibre 13.5 Tog Duvet', spec: '13.5 tog · Microfibre · Polycotton',
    lead: 'Winter-warm 13.5 tog with a soft microfibre fill.',
    variants: sized(DUVET, 19.64, 26.64), card: 'img/duvet-folded-cutout.jpg',
    images: L('Luxury Microfibre 13.5 Tog Duvet', ['duvet-folded-cutout.jpg', 'duvet-draped.jpg', 'duvet-mug-morning.png', 'duvet-lamp-evening.png'], ['Folded microfibre duvet', 'Duvet draped over the bed', 'Morning mug on the duvet', 'Duvet on a bed in evening lamplight']),
    features: ['13.5 tog — for winter', 'Soft microfibre fill', 'Polycotton cover'],
    description: ['A 13.5 tog microfibre duvet for the coldest nights of the British winter.'],
    specs: [['Tog', '13.5'], ['Fill', 'Microfibre'], ['Cover', 'Polycotton'], ['Colour', 'White']],
    benefits: [['Winter warm','13.5 tog for the coldest nights of a British winter.'],['Soft microfibre fill','Fine microfibre in a polycotton cover.'],['Four sizes','Single, Double, King and Super King.']],
  }),
  duvet({
    handle: 'essential-hollowfibre-duvet', title: 'Essential Hollowfibre Winter Duvet', spec: 'Hollowfibre · Multi-pocket · Winter weight',
    lead: 'Warm, soft and lightweight, with multi-pocket construction that keeps the fill evenly spread.',
    variants: sized(DUVET, 16.64, 23.64), card: 'img/duvet-flatlay-green.png',
    images: L('Essential Hollowfibre Winter Duvet', ['duvet-flatlay-green.png', 'duvet-rolled.jpg', 'duvet-palm.jpg', 'duvet-rolled-hands.png'], ['Duvet and pillows from above', 'Rolled duvet', 'Hand resting on the duvet', 'Rolled hollowfibre duvet']),
    features: ['Winter-weight hollowfibre', 'Multi-pocket construction keeps the fill even', 'Warm, soft and lightweight'],
    description: ['Our essential line uses a hollowfibre filling that keeps the duvet warm, soft and lightweight. Multi-pocket construction holds the fill evenly in place, so it stays comfortable night after night.'],
    specs: [['Fill', 'Hollowfibre'], ['Construction', 'Multi-pocket'], ['Season', 'Winter'], ['Colour', 'White']],
    benefits: [['Fill that stays put','Multi-pocket construction holds the hollowfibre evenly, so there are no thin patches.'],['Warm without the weight','Hollowfibre keeps the duvet warm, soft and lightweight.'],['Four sizes','Single, Double, King and Super King.']],
  }),
  {
    handle: 'nest-cushion-pad', title: 'Nest Hollowfibre Cushion Pad', type: 'Cushion pad', range: 'Nest Cushions',
    collections: ['cushions'], badges: [], option: 'Size',
    spec: 'Virgin hollowfibre · Sewn seam · 11 sizes',
    lead: 'The plump your sofa’s missing. Soft yet supportive inserts with bounce-back virgin hollowfibre.',
    variants: sized([['12 × 12in', '30 × 30cm'], ['12 × 18in', '30 × 45cm'], ['14 × 14in', '35 × 35cm'], ['16 × 16in', '40 × 40cm'], ['18 × 18in', '45 × 45cm'], ['20 × 20in', '50 × 50cm'], ['22 × 22in', '55 × 55cm'], ['24 × 24in', '60 × 60cm'], ['26 × 26in', '65 × 65cm'], ['28 × 28in', '70 × 70cm'], ['30 × 30in', '75 × 75cm']], 4.64, 9.14),
    card: 'img/cushion-pair-cutout.jpg',
    images: L('Nest Hollowfibre Cushion Pad', ['cushion-pair-cutout.jpg', 'duvet-sofa-cushions.png', 'cushions-sofa.jpg', 'cushions-bench.jpg', 'cushions-bed-sage.jpg'], ['Two hollowfibre cushion pads', 'Cushions on a sofa with a throw', 'Cushions on a sofa', 'Cushions on a bench', 'Cushions on a bed']),
    features: ['Virgin hollowfibre fill', 'Soft, resilient and holds its shape', 'Sewn seam closure', 'Square sizes from 12in to 30in, plus 12 × 18in oblong'],
    description: [
      'Soft yet supportive cushion inserts that make sitting more comfortable, on the sofa, in bed or wherever you like to unwind.',
      'Filled with virgin hollowfibre that’s soft, resilient and durable, so your cushions keep their shape.',
    ],
    specs: [['Fill', 'Virgin hollowfibre'], ['Closure', 'Sewn seam'], ['Shape', 'Square, or 12 × 18in oblong'], ['Colour', 'White']],
    care: [CARE_LABEL],
    pairsWith: 'bolster-pillow', related: ['v-shape-pillow', 'bolster-pillow', 'duck-feather-pillows', 'u-shape-pillow'],
    keywords: 'cushion pad insert inner filler sofa scatter cushions',
    benefits: [['Bounce that lasts','Virgin hollowfibre is soft, resilient and durable, so cushions keep their shape.'],['Eleven sizes','Square pads from 12in to 30in, plus a 12 × 18in oblong.'],['Clean, sewn finish','A sewn seam closure that sits neatly inside any cover.']],
  },
];
