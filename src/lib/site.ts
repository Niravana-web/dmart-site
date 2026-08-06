/** Every published fact about the shop lives here — one place to correct. */
export const site = {
  name: "DMart",
  legalName: "Shree Annapurna LLC DBA DMart",
  tagline: "Farm Fresh Produce, Meats Cut to Order",
  domain: "https://www.dmartbrandon.com",
  address: {
    street: "2020 W Brandon Blvd, Suite 109",
    city: "Brandon",
    state: "FL",
    zip: "33511",
  },
  phone: "+18133813008",
  phoneDisplay: "(813) 381-3008",
  // ponytail: WhatsApp still points at the old 656 number — swap if WhatsApp moved to 813.
  whatsapp: "https://wa.me/16562410641?text=Hi%20DMart!",
  whatsappGroup: "https://chat.whatsapp.com/KSc0xfPYnCDIIOVvHTNdPJ",
  maps: "https://maps.app.goo.gl/KbQ5Z5ZqET9Giftf7",
  /** Google place CID — opens the listing with the review panel. */
  reviewsUrl: "https://www.google.com/maps?cid=3777314055763517523",
  /**
   * Keyless Google Maps embed pinned to our listing by feature id (ftid).
   * ponytail: a plain iframe — no map library, no API key, no billing, and it
   * carries the real Google pin card. Swap for @vis.gl/react-google-maps only if
   * custom markers or map styling are ever actually needed.
   */
  mapEmbed:
    "https://maps.google.com/maps?ftid=0x88c2cfde69207ddd:0x346bb71ee2dfe053&q=DMart,+2020+W+Brandon+Blvd+Ste+109,+Brandon,+FL+33511&z=16&hl=en&output=embed",
  facebook: "https://www.facebook.com/dmartbrandon/",
  instagram: "https://www.instagram.com/dmartbrandon/",
  toast:
    "https://www.toasttab.com/local/order/dmart/r-01a6039d-9a50-4c62-ad50-a690d975d302?diningOption=takeout",
  email: "Dmartbrandon@gmail.com",
  freshDays: "Tuesday & Thursday mornings",
  areas: ["Brandon", "Tampa", "Valrico", "Riverview", "Seffner", "Lakeland"],
  /** Google listing snapshot, 6 Aug 2026. Re-check when featuring it in copy. */
  googleRating: 4.3,
  googleReviewCount: 31,
  /**
   * Real customer quotes, copied verbatim from the Google listing (6 Aug 2026).
   * Never invent entries here — an empty array just renders the CTA on its own.
   * ponytail: hand-copied. Move to a Google Places Details API pull if it goes stale.
   */
  reviews: [
    {
      name: "Vivek Chitturi",
      badge: "Local Guide",
      rating: 5,
      text: "This is very good Indian store to go to. They have wide range of products and fresh vegetables. The place is maintained clean, customer friendly.",
    },
    {
      name: "SAI lavanya",
      badge: "",
      rating: 5,
      text: "I must say chicken pizza at DMART was the best I've had in recent times. It was juicy, well-cooked, and incredibly tasty. It was so delicious that I couldn't resist ordering another one.",
    },
    {
      name: "Shoma Chandra",
      badge: "",
      rating: 5,
      text: "Extremely great hospitality and great selection of items — meat is fresh daily as well. Would definitely recommend.",
    },
  ],
} as const;
