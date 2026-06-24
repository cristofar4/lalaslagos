/* ------------------------------------------------------------------ */
/*  Lala's Bistro — single source of truth for all site content.       */
/*  Edit copy, menu, prices, hours and contact details here.           */
/* ------------------------------------------------------------------ */

export type Tone = "forest" | "clay" | "ochre" | "sage" | "dusk" | "bone";

export interface MenuItem {
  name: string;
  desc: string;
  price: string;
  tag?: string;
}

export interface MenuCategory {
  id: string;
  label: string;
  note: string;
  items: MenuItem[];
}

export interface Dish {
  name: string;
  kicker: string;
  desc: string;
  tone: Tone;
  /** Optional real photo URL — overrides the gradient art when present. */
  image?: string;
}

/** Build an Unsplash CDN url. Swap these ids for the venue's own photos. */
const img = (id: string, w = 1200) =>
  `https://images.unsplash.com/photo-${id}?q=80&w=${w}&auto=format&fit=crop`;

export const images = {
  hero: img("1504674900247-0877df9cc836", 1500),
  story: img("1517248135467-4c7edcad34c4", 1200),
  patio: img("1559339352-11d035aa65de", 1700),
  map: img("1555396273-367ea4eb4db5", 1100),
};

export const heroVideo = {
  // Replace `src` with the venue's own footage (mp4/webm). If it can't load,
  // the poster image is shown instead — so the hero never looks broken.
  src: "https://assets.mixkit.co/videos/preview/mixkit-set-of-dishes-with-food-on-a-table-44849-large.mp4",
  poster: images.hero,
};

export const site = {
  name: "Lala's Bistro",
  shortName: "Lala's",
  tagline: "Boho chic resto bar",
  location: "Victoria Island, Lagos",
  phone: "+234 915 025 1251",
  phoneHref: "tel:+2349150251251",
  email: "hello@lalaslagos.com",
  emailHref: "mailto:hello@lalaslagos.com",
  address: {
    line1: "251A Sapara Williams Close",
    line2: "Victoria Island, Lagos",
    country: "Nigeria",
  },
  mapHref:
    "https://www.google.com/maps/search/?api=1&query=Lala's+Lagos+251A+Sapara+Williams+Close+Victoria+Island+Lagos",
  social: [
    { label: "Instagram", handle: "@lalaslagos", href: "https://www.instagram.com/lalaslagos/" },
    { label: "Bistro", handle: "@lalasbistro", href: "https://www.instagram.com/lalasbistro/" },
  ],
} as const;

export const nav = [
  { label: "Signatures", target: "#signatures" },
  { label: "Story", target: "#story" },
  { label: "Menu", target: "#menu" },
  { label: "The Patio", target: "#patio" },
  { label: "Visit", target: "#visit" },
] as const;

export const hero = {
  eyebrow: "Victoria Island, Lagos",
  // Each line animates in independently.
  lines: ["Lala's", "Bistro"],
  lead:
    "A boho chic resto bar tucked inside Lala's Lagos. Slow brunches, golden afternoons, candlelit dinners.",
  tags: ["Brunch", "Resto bar", "Garden Patio"],
};

export const manifesto = {
  eyebrow: "The idea",
  // The word matching `accent` is highlighted in lime.
  lead: "We cook the way Lagos lives",
  accent: "Lagos",
  body: "Unhurried and generous, a little bit golden. One kitchen wandering from the lagoon to the Mediterranean — plating it all by candlelight.",
};

export const gallery = [
  img("1414235077428-338989a2e8c0", 800),
  img("1517248135467-4c7edcad34c4", 800),
  img("1424847651672-bf20a4b0982b", 800),
  img("1546069901-ba9599a7e63c", 800),
  img("1466978913421-dad2ebd01d17", 800),
  img("1559339352-11d035aa65de", 800),
  img("1504674900247-0877df9cc836", 800),
  img("1555396273-367ea4eb4db5", 800),
];

export const marquee = [
  "Boho Chic",
  "Garden Patio",
  "Brunch & Dinner",
  "Resto Bar",
  "Seasonal Plates",
  "Victoria Island",
  "Candlelight",
  "Made to Order",
];

export const story = {
  eyebrow: "Our Story",
  heading: "Warm light, dark greenery, and a table that feels like home.",
  body: [
    "Tucked inside the Lala's Lagos boutique hotel, the bistro is the kind of room you settle into. Leafy corners, low candlelight and a patio that turns golden as the afternoon slips by.",
    "Our kitchen wanders — from Lagos to Lisbon, Marrakech to Mexico City — plating seasonal, made to order dishes that pair as easily with a morning coffee as a midnight cocktail.",
  ],
  stats: [
    { value: 4, suffix: "", label: "Services daily" },
    { value: 9, suffix: "", label: "World cuisines" },
    { value: 100, suffix: "%", label: "Made to order" },
  ],
};

export const menu: MenuCategory[] = [
  {
    id: "starters",
    label: "To Begin",
    note: "Small plates made for sharing across the patio table.",
    items: [
      {
        name: "Prawn & Chorizo Mousse",
        desc: "Whipped prawn, smoked chorizo, charred sourdough.",
        price: "₦8,500",
        tag: "Signature",
      },
      {
        name: "Chicken Tacos",
        desc: "Soft tortillas, lime slaw, chipotle crema.",
        price: "₦7,500",
      },
      {
        name: "Buttermilk Chicken Wings",
        desc: "House dry rub, smoked herb dip.",
        price: "₦7,000",
      },
      {
        name: "Burrata & Heirloom Tomato",
        desc: "Basil oil, toasted seeds, sea salt.",
        price: "₦9,000",
      },
    ],
  },
  {
    id: "mains",
    label: "Mains",
    note: "Plates that wander from Lagos to the Mediterranean.",
    items: [
      {
        name: "Pan Seared Barracuda Filet",
        desc: "Citrus butter, seasonal greens, crushed potato.",
        price: "₦12,000",
        tag: "Chef's pick",
      },
      {
        name: "4 oz Sirloin Steak",
        desc: "Green peppercorn jus, hand cut fries.",
        price: "₦12,000",
      },
      {
        name: "Smoky Jollof & Grilled Chicken",
        desc: "Party jollof, suya spiced chicken, fried plantain.",
        price: "₦10,000",
      },
      {
        name: "Penne alla Bistro",
        desc: "Slow tomato, chili, basil, aged parmesan.",
        price: "₦9,500",
      },
      {
        name: "Beef Stroganoff",
        desc: "Wild mushroom, smoked cream, pappardelle.",
        price: "₦11,000",
      },
    ],
  },
  {
    id: "sweets",
    label: "Sweets",
    note: "The reason to stay for one more cup of coffee.",
    items: [
      {
        name: "Lala's Cinnamon Roll",
        desc: "Warm, pull apart, cream cheese glaze.",
        price: "₦4,500",
        tag: "House favourite",
      },
      {
        name: "Chef's Coconut Scone",
        desc: "Clotted cream, hibiscus jam.",
        price: "₦4,000",
      },
      {
        name: "Burnt Caramel Pudding",
        desc: "Sea salt, crème fraîche.",
        price: "₦4,500",
      },
    ],
  },
  {
    id: "bar",
    label: "From the Bar",
    note: "Sundowners for the patio, nightcaps for the lounge.",
    items: [
      {
        name: "Sex on the Beach",
        desc: "Vodka, peach, cranberry, orange.",
        price: "₦5,000",
      },
      {
        name: "Hibiscus Spritz",
        desc: "Zobo, prosecco, citrus, mint.",
        price: "₦5,000",
        tag: "Lagos twist",
      },
      {
        name: "Espresso Martini",
        desc: "Vodka, cold brew, vanilla.",
        price: "₦5,000",
      },
      {
        name: "Garden Negroni",
        desc: "Gin, bitter orange, sweet vermouth.",
        price: "₦4,500",
      },
    ],
  },
];

export const signatures: Dish[] = [
  {
    name: "Pan Seared Barracuda",
    kicker: "From the sea",
    desc: "Citrus butter, seasonal greens, crushed new potato.",
    tone: "forest",
    image: img("1414235077428-338989a2e8c0", 900),
  },
  {
    name: "Smoky Jollof",
    kicker: "From Lagos",
    desc: "Party jollof, suya spiced chicken, sweet plantain.",
    tone: "clay",
    image: img("1546069901-ba9599a7e63c", 900),
  },
  {
    name: "Lala's Cinnamon Roll",
    kicker: "From the oven",
    desc: "Warm, pull apart, cream cheese glaze.",
    tone: "ochre",
    image: img("1466978913421-dad2ebd01d17", 900),
  },
  {
    name: "Hibiscus Spritz",
    kicker: "From the bar",
    desc: "Zobo, prosecco, citrus and a sprig of mint.",
    tone: "dusk",
    image: img("1424847651672-bf20a4b0982b", 900),
  },
];

export const patio = {
  eyebrow: "The Patio",
  heading: "Boho chic, after dark.",
  body:
    "As the light drops, the patio glows — fairy lights threaded through greenery, low tables, slow conversation. It's the corner of Victoria Island that feels like a secret.",
  caption: "Open air seating · candlelit · best at golden hour",
};

export const hours = [
  { day: "Monday – Thursday", time: "8:00 — 23:00" },
  { day: "Friday – Saturday", time: "8:00 — 00:00" },
  { day: "Sunday", time: "9:00 — 22:00" },
];

export const visit = {
  eyebrow: "Visit",
  heading: "Find us on Sapara Williams.",
  body:
    "Drop by any time, but the patio fills fast at golden hour, so call ahead to reserve your corner.",
};
