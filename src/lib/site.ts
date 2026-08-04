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
  phone: "+16562410641",
  phoneDisplay: "(656) 241-0641",
  whatsapp: "https://wa.me/16562410641?text=Hi%20DMart!",
  whatsappGroup: "https://chat.whatsapp.com/KSc0xfPYnCDIIOVvHTNdPJ",
  maps: "https://maps.app.goo.gl/KbQ5Z5ZqET9Giftf7",
  toast:
    "https://www.toasttab.com/local/order/dmart/r-01a6039d-9a50-4c62-ad50-a690d975d302?diningOption=takeout",
  email: "Dmartbrandon@gmail.com",
  freshDays: "Tuesday & Thursday mornings",
  areas: ["Brandon", "Tampa", "Valrico", "Riverview", "Seffner", "Lakeland"],
} as const;
