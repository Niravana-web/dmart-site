import Image from "next/image";
import { Nav } from "@/components/Nav";
import {
  Reveal,
  Parallax,
  HeroImage,
  CountUp,
  StaggerList,
} from "@/components/motion";
import { site } from "@/lib/site";

const tickerItems = [
  "Cut fresh. Packed cold. Under one roof.",
  "Fresh goat & chicken arrive Tuesday & Thursday",
  "Fresh, as promised",
  "2020 W Brandon Blvd, Suite 109 · Brandon, FL",
  "WhatsApp ahead — we’ll keep your cut ready",
];

const stats = [
  { n: 15, suffix: "", label: "butcher’s cuts at the counter" },
  { n: 30, suffix: "+", label: "farm-fresh produce items" },
  { n: 900, suffix: "+", label: "pantry & spice staples" },
  { n: 90, suffix: "+", label: "dairy & frozen picks" },
];

const cutChoices = [
  { k: "Cut style", v: "curry cut or chops" },
  { k: "Bone", v: "bone-in or boneless" },
  { k: "Trim", v: "lean or regular" },
  { k: "Mince", v: "fine or coarse" },
];

const faqs = [
  {
    q: "Do you deliver or take orders online?",
    a: "DMart is a walk-in market — the counter is the experience. A small set of everyday essentials is available for takeout pickup through our Toast page, but the full shop lives at 2020 W Brandon Blvd.",
  },
  {
    q: "Can I order a cut ahead of time?",
    a: "Yes. WhatsApp or call us with your cut — curry cut or chops, bone-in or out, lean or regular — and it will be ready when you arrive.",
  },
  {
    q: "When is the meat freshest?",
    a: "Fresh goat and chicken arrive Tuesday and Thursday mornings. Come those afternoons for the widest, freshest counter.",
  },
  {
    q: "What payments do you accept?",
    a: "Card and cash. We do not accept EBT/SNAP at this time.",
  },
];

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: { "@type": "Answer", text: f.a },
  })),
};

function WhatsAppButton({ label, dark = false }: { label: string; dark?: boolean }) {
  return (
    <a
      href={site.whatsapp}
      target="_blank"
      rel="noopener noreferrer"
      className={`inline-block rounded-full px-8 py-4 font-[family-name:var(--font-poppins)] text-sm font-semibold uppercase tracking-[0.08em] transition-all duration-300 hover:scale-[1.04] ${
        dark
          ? "bg-cream-100 text-emerald-900 hover:bg-cream-50"
          : "bg-emerald-700 text-cream-50 hover:bg-emerald-900"
      }`}
    >
      {label}
    </a>
  );
}

export default function Home() {
  return (
    <main id="top" className="relative">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <Nav />

      {/* ============ HERO ============ */}
      <section className="relative px-3 pt-20 md:px-5 md:pt-24">
        <div className="relative mx-auto h-[82vh] min-h-[560px] max-w-[1600px] overflow-hidden rounded-2xl">
          <HeroImage>
            <Image
              src="/Store.png"
              alt="The DMart storefront at 2020 W Brandon Blvd, Brandon, FL"
              fill
              priority
              sizes="100vw"
              className="object-cover"
            />
          </HeroImage>
          <div className="absolute inset-0 bg-black/40" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/20" />

          <div className="absolute inset-0 flex flex-col items-start justify-end p-7 pb-14 md:p-16 md:pb-20">
            <Reveal delay={0.35} y={22}>
              <p className="eyebrow !text-copper-300">
                Fresh Meats &amp; Grocery · Brandon, Florida
              </p>
            </Reveal>
            <Reveal delay={0.5} y={26}>
              <h1 className="mt-4 max-w-3xl font-[family-name:var(--font-poppins)] text-4xl font-bold leading-[1.06] tracking-[-0.01em] text-cream-50 sm:text-6xl md:text-7xl">
                Freshness you can see.{" "}
                <span className="copper-text font-[family-name:var(--font-playfair)] italic">
                  Quality
                </span>{" "}
                you can trust.
              </h1>
            </Reveal>
            <Reveal delay={0.68} y={24}>
              <p className="mt-6 max-w-xl text-lg leading-relaxed text-cream-100/90">
                Goat cut to your order at the counter, produce that still smells
                of the farm, and the spice aisle your recipes ask for — under
                one roof on West Brandon Blvd.
              </p>
            </Reveal>
            <Reveal delay={0.85} y={20}>
              <div className="mt-9 flex flex-wrap items-center gap-4">
                <WhatsAppButton label="Tell us your cut" />
                <a
                  href="#visit"
                  className="inline-block rounded-full border-2 border-copper-300/80 px-8 py-4 font-[family-name:var(--font-poppins)] text-sm font-semibold uppercase tracking-[0.08em] text-cream-50 transition-all duration-300 hover:scale-[1.04] hover:border-copper-300 hover:bg-copper-300/10"
                >
                  Plan your visit
                </a>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ============ TICKER ============ */}
      <div className="mt-3 overflow-hidden bg-emerald-900 py-3.5 md:mt-5">
        <div className="marquee-track">
          {[0, 1].map((copy) => (
            <div key={copy} className="flex shrink-0" aria-hidden={copy === 1}>
              {tickerItems.map((item) => (
                <span
                  key={item}
                  className="flex items-center whitespace-nowrap px-6 font-[family-name:var(--font-poppins)] text-xs font-medium uppercase tracking-[0.16em] text-cream-100/90"
                >
                  {item}
                  <span className="ml-12 text-copper-300">✦</span>
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* ============ STATS ============ */}
      <section className="relative grain px-6 py-20 md:py-28">
        <div className="mx-auto max-w-6xl">
          <Reveal>
            <p className="eyebrow text-center">One roof, the whole list</p>
            <h2 className="mx-auto mt-4 max-w-2xl text-center font-[family-name:var(--font-poppins)] text-3xl font-semibold leading-tight text-emerald-900 md:text-4xl">
              The weekly run, without the second stop
            </h2>
            <div className="copper-divider mx-auto mt-6 w-24" />
          </Reveal>
          <div className="mt-14 grid grid-cols-2 gap-y-12 md:grid-cols-4">
            {stats.map((s, i) => (
              <Reveal key={s.label} delay={i * 0.12} className="text-center">
                <p className="copper-text font-[family-name:var(--font-playfair)] text-5xl italic md:text-6xl">
                  <CountUp to={s.n} suffix={s.suffix} />
                </p>
                <p className="mx-auto mt-3 max-w-[180px] text-sm leading-snug text-charcoal/75">
                  {s.label}
                </p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ============ THE COUNTER ============ */}
      <section id="counter" className="emerald-panel relative overflow-hidden">
        <div className="mx-auto grid max-w-7xl items-center gap-12 px-6 py-20 md:grid-cols-2 md:gap-20 md:py-32">
          <Parallax range={40} className="relative">
            <div className="card-img relative aspect-[4/5] overflow-hidden rounded-2xl shadow-2xl shadow-emerald-950/40">
              <Image
                src="/images/meat.jpg"
                alt="Trimmed goat curry cut arranged on butcher paper with mint and whole spices"
                fill
                sizes="(min-width: 768px) 45vw, 92vw"
                className="object-cover"
              />
            </div>
            <div className="absolute -bottom-5 left-6 flex items-center gap-3 rounded-full bg-emerald-950/95 py-3 pl-4 pr-6 shadow-lg backdrop-blur">
              <span className="flex h-9 w-9 items-center justify-center rounded-full border border-brand-gold text-brand-gold">
                ❋
              </span>
              <span className="font-[family-name:var(--font-poppins)] text-xs font-semibold uppercase tracking-[0.14em] text-cream-50">
                Fresh, as promised
              </span>
            </div>
          </Parallax>

          <div>
            <Reveal>
              <p className="eyebrow !text-copper-300">The Counter</p>
              <h2 className="mt-4 font-[family-name:var(--font-poppins)] text-3xl font-semibold leading-tight text-cream-50 md:text-5xl">
                Tell us your cut.
                <br />
                We’ll keep it{" "}
                <span className="copper-text font-[family-name:var(--font-playfair)] italic">
                  ready
                </span>
                .
              </h2>
              <div className="copper-divider mt-6 w-20" />
            </Reveal>
            <Reveal delay={0.15}>
              <p className="mt-7 max-w-lg leading-relaxed text-cream-100/85">
                Premium goat is cut to order, the way your dish asks for it.
                Chicken and ground meats sit packed cold in the case for
                grab-and-go speed. Our meats come from trusted certified suppliers
                — checked, not just claimed.
              </p>
            </Reveal>
            <StaggerList className="mt-9 max-w-md divide-y divide-cream-100/15 border-y border-cream-100/15">
              {cutChoices.map((c) => (
                <div
                  key={c.k}
                  className="flex items-baseline justify-between py-4"
                >
                  <span className="font-[family-name:var(--font-poppins)] text-sm font-semibold uppercase tracking-[0.12em] text-copper-300">
                    {c.k}
                  </span>
                  <span className="text-cream-100/90">{c.v}</span>
                </div>
              ))}
            </StaggerList>
            <Reveal delay={0.2}>
              <p className="mt-7 text-sm text-cream-100/70">
                Fresh goat and chicken arrive {site.freshDays}.
              </p>
              <div className="mt-6">
                <WhatsAppButton label="WhatsApp your cut ahead" dark />
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ============ FRESH & GROCERY ============ */}
      <section id="grocery" className="relative grain px-6 py-20 md:py-32">
        <div className="mx-auto max-w-7xl">
          <Reveal>
            <p className="eyebrow">Fresh &amp; Grocery</p>
            <h2 className="mt-4 max-w-2xl font-[family-name:var(--font-poppins)] text-3xl font-semibold leading-tight text-emerald-900 md:text-5xl">
              From the farm and the{" "}
              <span className="copper-text font-[family-name:var(--font-playfair)] italic">
                spice
              </span>{" "}
              road
            </h2>
            <div className="copper-divider mt-6 w-20" />
          </Reveal>

          <div className="mt-14 grid gap-8 md:grid-cols-3">
            {[
              {
                img: "/images/produce.jpg",
                alt: "Bundles of fresh methi and spinach tied with twine",
                title: "Farm-Fresh Produce",
                body: "Methi that still smells of the field, bhindi that snaps, curry leaves by the bunch — thirty-plus items, picked over daily.",
              },
              {
                img: "/images/spices.jpg",
                alt: "Whole spices in brass bowls on cream linen",
                title: "Pantry & Spices",
                body: "Over nine hundred staples — atta, dals, rice, masalas, pickles and ghee — from House of Spices, Deep, and names your kitchen already knows.",
              },
              {
                img: "/images/dish.jpg",
                alt: "Steaming chicken biryani in a copper handi",
                title: "From the Kitchen",
                body: "Fresh-made food and grab-and-go favorites, for the evenings the family pot gets a night off.",
              },
            ].map((c, i) => (
              <Reveal key={c.title} delay={i * 0.14}>
                <div className="group">
                  <div className="card-img relative aspect-[4/5] overflow-hidden rounded-2xl">
                    <Image
                      src={c.img}
                      alt={c.alt}
                      fill
                      sizes="(min-width: 768px) 30vw, 92vw"
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-emerald-950/50 to-transparent opacity-0 transition-opacity duration-700 group-hover:opacity-100" />
                  </div>
                  <h3 className="mt-6 font-[family-name:var(--font-poppins)] text-xl font-semibold text-emerald-900">
                    {c.title}
                  </h3>
                  <div className="copper-divider mt-3 w-10 transition-all duration-500 group-hover:w-20" />
                  <p className="mt-4 leading-relaxed text-charcoal/75">{c.body}</p>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal delay={0.2}>
            <div className="mt-14 flex flex-col items-start justify-between gap-6 rounded-2xl bg-cream-50 p-8 md:flex-row md:items-center md:p-10">
              <p className="max-w-2xl leading-relaxed text-charcoal/80">
                Plus a dairy and frozen aisle of ninety-some picks — paneer,
                yogurts, kulfi, parathas — and local creameries alongside the
                brands you grew up with.
              </p>
              <a
                href={site.toast}
                target="_blank"
                rel="noopener noreferrer"
                className="draw-link shrink-0 font-[family-name:var(--font-poppins)] text-sm font-semibold uppercase tracking-[0.1em] text-emerald-700"
              >
                Essentials on Toast →
              </a>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ============ EID / RAMADAN ============ */}
      <section id="eid" className="relative overflow-hidden bg-emerald-950">
        <div className="absolute inset-0 opacity-40">
          <Parallax range={80} className="h-[120%]">
            <Image
              src="/images/festival.jpg"
              alt=""
              fill
              sizes="100vw"
              className="object-cover"
            />
          </Parallax>
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-emerald-950 via-emerald-950/80 to-emerald-950/30" />
        <div className="relative mx-auto max-w-7xl px-6 py-24 md:py-36">
          <Reveal>
            <p className="eyebrow !text-brand-gold">Ramadan &amp; Eid</p>
            <h2 className="mt-4 max-w-xl font-[family-name:var(--font-poppins)] text-3xl font-semibold leading-tight text-cream-50 md:text-5xl">
              The table that matters most, arranged ahead
            </h2>
            <div className="copper-divider mt-6 w-20" />
          </Reveal>
          <Reveal delay={0.15}>
            <p className="mt-7 max-w-lg leading-relaxed text-cream-100/85">
              We take Eid and Ramadan pre-orders at the counter — bulk cuts,
              prepared to your order and timed for collection, so the biggest
              days of the year are the calmest ones in your kitchen.
            </p>
            <div className="mt-9">
              <WhatsAppButton label="Ask about pre-orders" dark />
            </div>
          </Reveal>
        </div>
      </section>

      {/* ============ VISIT ============ */}
      <section id="visit" className="relative grain px-6 py-20 md:py-32">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-14 md:grid-cols-2 md:gap-20">
            <div>
              <Reveal>
                <p className="eyebrow">Visit Us</p>
                <h2 className="mt-4 font-[family-name:var(--font-poppins)] text-3xl font-semibold leading-tight text-emerald-900 md:text-5xl">
                  Worth the drive, easy to{" "}
                  <span className="copper-text font-[family-name:var(--font-playfair)] italic">
                    find
                  </span>
                </h2>
                <div className="copper-divider mt-6 w-20" />
              </Reveal>
              <Reveal delay={0.15}>
                <p className="mt-7 max-w-lg leading-relaxed text-charcoal/80">
                  Neighbors drive in from Tampa, Valrico, Riverview, Seffner and
                  Lakeland. There’s ample parking in the main plaza lot, and the
                  entrance sits right beside it — you’ll see the green sign.
                </p>
                <p className="mt-4 max-w-lg leading-relaxed text-charcoal/80">
                  Weekends run busy, Friday evening through Sunday. Come early
                  for the widest counter. Card and cash accepted.
                </p>
              </Reveal>
              <Reveal delay={0.25}>
                <div className="mt-9 flex flex-wrap gap-4">
                  <a
                    href={site.maps}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block rounded-full bg-emerald-700 px-8 py-4 font-[family-name:var(--font-poppins)] text-sm font-semibold uppercase tracking-[0.08em] text-cream-50 transition-all duration-300 hover:scale-[1.04] hover:bg-emerald-900"
                  >
                    Get directions
                  </a>
                  <a
                    href={`tel:${site.phone}`}
                    className="inline-block rounded-full border-2 border-copper-500 px-8 py-4 font-[family-name:var(--font-poppins)] text-sm font-semibold uppercase tracking-[0.08em] text-emerald-900 transition-all duration-300 hover:scale-[1.04] hover:bg-copper-300/20"
                  >
                    Call {site.phoneDisplay}
                  </a>
                </div>
              </Reveal>
            </div>

            <Reveal delay={0.2}>
              <div className="rounded-2xl bg-emerald-900 p-8 text-cream-100 md:p-12">
                <h3 className="font-[family-name:var(--font-poppins)] text-lg font-semibold uppercase tracking-[0.12em] text-copper-300">
                  The Shop
                </h3>
                <dl className="mt-8 space-y-7">
                  <div>
                    <dt className="text-xs uppercase tracking-[0.18em] text-cream-100/60">
                      Address
                    </dt>
                    <dd className="mt-2 text-lg leading-snug">
                      {site.address.street}
                      <br />
                      {site.address.city}, {site.address.state} {site.address.zip}
                    </dd>
                  </div>
                  <div>
                    <dt className="text-xs uppercase tracking-[0.18em] text-cream-100/60">
                      Hours
                    </dt>
                    <dd className="mt-2 text-lg leading-snug">
                      Open daily —{" "}
                      <a
                        href={site.maps}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="draw-link text-copper-300"
                      >
                        today’s hours on Google
                      </a>
                    </dd>
                  </div>
                  <div>
                    <dt className="text-xs uppercase tracking-[0.18em] text-cream-100/60">
                      Fresh arrivals
                    </dt>
                    <dd className="mt-2 text-lg leading-snug">
                      Goat &amp; chicken — {site.freshDays}
                    </dd>
                  </div>
                  <div>
                    <dt className="text-xs uppercase tracking-[0.18em] text-cream-100/60">
                      Word of mouth
                    </dt>
                    <dd className="mt-2 text-lg leading-snug">
                      <a
                        href={site.maps}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="draw-link text-copper-300"
                      >
                        Read our Google reviews
                      </a>
                    </dd>
                  </div>
                </dl>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ============ FAQ ============ */}
      <section className="border-t border-emerald-900/10 px-6 py-20 md:py-28">
        <div className="mx-auto max-w-3xl">
          <Reveal>
            <p className="eyebrow text-center">Good to know</p>
            <h2 className="mt-4 text-center font-[family-name:var(--font-poppins)] text-3xl font-semibold text-emerald-900 md:text-4xl">
              Questions we hear at the counter
            </h2>
            <div className="copper-divider mx-auto mt-6 w-16" />
          </Reveal>
          <div className="mt-12 divide-y divide-emerald-900/10">
            {faqs.map((f, i) => (
              <Reveal key={f.q} delay={i * 0.07}>
                <details className="group py-5">
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-[family-name:var(--font-poppins)] text-lg font-medium text-emerald-900 [&::-webkit-details-marker]:hidden">
                    {f.q}
                    <span className="text-copper-500 transition-transform duration-300 group-open:rotate-45">
                      +
                    </span>
                  </summary>
                  <p className="mt-4 max-w-2xl leading-relaxed text-charcoal/75">
                    {f.a}
                  </p>
                </details>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ============ FOOTER ============ */}
      <footer className="bg-emerald-950 text-cream-100">
        <div className="mx-auto max-w-7xl px-6 py-16 md:py-20">
          <div className="grid gap-12 md:grid-cols-3">
            <div>
              <Image
                src="/logo-transparant.png"
                alt="DMart leaf mark"
                width={72}
                height={72}
                className="rounded-xl"
              />
              <p className="mt-5 font-[family-name:var(--font-poppins)] text-2xl font-bold">
                DMart
              </p>
              <p className="mt-2 max-w-xs text-sm leading-relaxed text-cream-100/60">
                {site.tagline}. A neighborhood market on West Brandon
                Blvd.
              </p>
            </div>
            <div>
              <h3 className="font-[family-name:var(--font-poppins)] text-xs font-semibold uppercase tracking-[0.18em] text-copper-300">
                Find us
              </h3>
              <ul className="mt-5 space-y-3 text-sm text-cream-100/80">
                <li>
                  {site.address.street}, {site.address.city},{" "}
                  {site.address.state} {site.address.zip}
                </li>
                <li>
                  <a href={`tel:${site.phone}`} className="draw-link">
                    {site.phoneDisplay}
                  </a>
                </li>
                <li>
                  <a
                    href={site.maps}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="draw-link"
                  >
                    Directions &amp; hours on Google
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-[family-name:var(--font-poppins)] text-xs font-semibold uppercase tracking-[0.18em] text-copper-300">
                Stay close
              </h3>
              <ul className="mt-5 space-y-3 text-sm text-cream-100/80">
                <li>
                  <a
                    href={site.whatsapp}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="draw-link"
                  >
                    WhatsApp the counter
                  </a>
                </li>
                <li>
                  <a
                    href={site.whatsappGroup}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="draw-link"
                  >
                    Join the neighborhood WhatsApp group
                  </a>
                </li>
                <li>
                  <a
                    href={site.toast}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="draw-link"
                  >
                    Order essentials on Toast
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="copper-divider mt-14 opacity-40" />
          <div className="mt-6 flex flex-col items-start justify-between gap-3 text-xs text-cream-100/50 md:flex-row">
            <p>
              © {new Date().getFullYear()} {site.legalName}. All rights
              reserved.
            </p>
            <p>Freshness you can see. Quality you can trust.</p>
          </div>
        </div>
      </footer>
    </main>
  );
}
