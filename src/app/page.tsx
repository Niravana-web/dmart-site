import Image from "next/image";
import { Nav } from "@/components/Nav";
import { ContactForm } from "@/components/ContactForm";
import { HeroVideos } from "@/components/HeroVideos";
import {
  Reveal,
  Parallax,
  CountUp,
  StaggerList,
} from "@/components/motion";
import { site } from "@/lib/site";

const tickerItems = [
  "Farm-fresh produce, picked over daily",
  "900+ pantry staples, spices, dals & atta",
  "Fresh-made food from the kitchen counter",
  "Order essentials online for pickup",
  "2020 W Brandon Blvd, Suite 109 · Brandon, FL",
  "Meats cut to order at the counter",
];

const stats = [
  { n: 900, suffix: "+", label: "pantry & spice staples" },
  { n: 30, suffix: "+", label: "farm-fresh produce items" },
  { n: 90, suffix: "+", label: "dairy & frozen picks" },
  { n: 15, suffix: "", label: "butcher’s cuts at the counter" },
];

const cutChoices = [
  { k: "Cut style", v: "curry cut or chops" },
  { k: "Bone", v: "bone-in or boneless" },
  { k: "Trim", v: "lean or regular" },
  { k: "Mince", v: "fine or coarse" },
];

const faqs = [
  {
    q: "Do you take orders online?",
    a: "Yes — order everyday essentials and kitchen favorites for pickup through our Toast page, and they’ll be bagged and waiting. The full produce, pantry and butcher selection lives in the shop at 2020 W Brandon Blvd.",
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

const btnBase =
  "inline-block rounded-full px-8 py-4 font-[family-name:var(--font-poppins)] text-sm font-semibold uppercase tracking-[0.08em] transition-all duration-300 hover:scale-[1.04]";

/** Primary call to action across the page — online ordering on Toast. */
function ToastButton({ label, dark = false }: { label: string; dark?: boolean }) {
  return (
    <a
      href={site.toast}
      target="_blank"
      rel="noopener noreferrer"
      className={`${btnBase} ${
        dark
          ? "bg-cream-100 text-emerald-900 hover:bg-cream-50"
          : "bg-emerald-700 text-cream-50 hover:bg-emerald-900"
      }`}
    >
      {label}
    </a>
  );
}

/**
 * Entry splash — camera pushes through the storefront, then dissolves into the
 * page: outside the shop, then inside. /Store.png is loaded for this alone now
 * that the hero shows video, so it is the splash's true cost.
 * Server-rendered with CSS-only animation: no JS to hydrate, nothing that can
 * fail and leave a customer staring at a covered page.
 */
function Splash() {
  return (
    <div
      aria-hidden
      className="splash pointer-events-none fixed inset-0 z-[100] overflow-hidden bg-black"
    >
      <div className="splash-push absolute inset-0">
        <Image
          src="/Store.png"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
      </div>
      {/* No overlaid lockup — the storefront sign in the photo is the branding. */}
      <div className="splash-vignette absolute inset-0" />
    </div>
  );
}

/**
 * The shared green surface: deep emerald over a dimmed photo, so every dark
 * section reads as textured rather than flat. Pass a different image per
 * section — the gradient keeps them all the same weight regardless.
 */
function GreenPanel({
  id,
  image,
  children,
}: {
  id?: string;
  image: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className="relative overflow-hidden bg-emerald-950">
      <div className="absolute inset-0 opacity-25">
        <Parallax range={80} className="h-[120%]">
          <Image src={image} alt="" fill sizes="100vw" className="object-cover" />
        </Parallax>
      </div>
      <div className="absolute inset-0 bg-gradient-to-b from-emerald-950 via-emerald-950/90 to-emerald-950" />
      <div className="relative">{children}</div>
    </section>
  );
}

function Social({
  href,
  label,
  children,
}: {
  href: string;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className="flex h-10 w-10 items-center justify-center rounded-full border border-cream-100/25 text-cream-100/80 transition-all duration-300 hover:border-copper-300 hover:text-copper-300"
    >
      <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
        {children}
      </svg>
    </a>
  );
}

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
      <Splash />
      <Nav />

      {/* ============ HERO ============ */}
      <section className="relative grain px-6 pt-24 pb-14 md:pt-36 md:pb-24">
        <div className="mx-auto grid max-w-7xl items-center gap-10 md:grid-cols-2 md:gap-16">
          <div>
            <Reveal delay={0.15} y={22}>
              <p className="eyebrow">
                Indian Grocery, Fresh Produce &amp; Meats · Brandon, Florida
              </p>
            </Reveal>
            <Reveal delay={0.28} y={26}>
              <h1 className="mt-4 font-[family-name:var(--font-poppins)] text-4xl font-bold leading-[1.06] tracking-[-0.01em] text-emerald-900 sm:text-5xl md:text-6xl">
                Freshness you can see.{" "}
                <span className="copper-text font-[family-name:var(--font-playfair)] italic">
                  Quality
                </span>{" "}
                you can trust.
              </h1>
            </Reveal>
            <Reveal delay={0.42} y={24}>
              <div className="copper-divider mt-7 w-24" />
              <p className="mt-7 max-w-lg text-lg leading-relaxed text-charcoal/80">
                Produce that still smells of the farm, nine hundred pantry
                staples and spices, fresh-made food from the kitchen — and a
                butcher counter that cuts to your order. One roof, on West
                Brandon Blvd.
              </p>
            </Reveal>
            <Reveal delay={0.56} y={20}>
              <div className="mt-9 flex flex-wrap items-center gap-4">
                <ToastButton label="Order online" />
                <a
                  href="#grocery"
                  className={`${btnBase} border-2 border-copper-500 text-emerald-900 hover:bg-copper-300/20`}
                >
                  Shop the aisles
                </a>
              </div>
              <p className="mt-5 text-xs uppercase tracking-[0.14em] text-charcoal/50">
                Pickup on Toast · or walk in daily
              </p>
            </Reveal>
          </div>

          {/* Grid item must stretch — justify-self would shrink it and collapse
              the card's w-full to zero. Align the card with flex instead. */}
          <Reveal delay={0.35} className="flex justify-center md:justify-end">
            <HeroVideos />
          </Reveal>
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

      {/* ============ FRESH & GROCERY ============ */}
      <GreenPanel id="grocery" image="/images/hero.jpg">
        <div className="mx-auto max-w-7xl px-6 py-20 md:py-32">
          <Reveal>
            <p className="eyebrow !text-copper-300">Fresh &amp; Grocery</p>
            <h2 className="mt-4 max-w-2xl font-[family-name:var(--font-poppins)] text-3xl font-semibold leading-tight text-cream-50 md:text-5xl">
              From the farm and the{" "}
              <span className="copper-text font-[family-name:var(--font-playfair)] italic">
                spice
              </span>{" "}
              road
            </h2>
            <div className="copper-divider mt-6 w-20" />
            <p className="mt-7 max-w-2xl leading-relaxed text-cream-100/85">
              The weekly grocery run, done properly. Produce picked over every
              morning, the pantry aisle your recipes actually ask for, and a
              kitchen counter turning out fresh food all day.
            </p>
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
                body: "Biryani, dosa, idli, vada, chaat and pizza made fresh at the counter — for the evenings the family pot gets a night off.",
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
                  <h3 className="mt-6 font-[family-name:var(--font-poppins)] text-xl font-semibold text-cream-50">
                    {c.title}
                  </h3>
                  <div className="copper-divider mt-3 w-10 transition-all duration-500 group-hover:w-20" />
                  <p className="mt-4 leading-relaxed text-cream-100/75">{c.body}</p>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal delay={0.2}>
            <div className="mt-14 flex flex-col items-start justify-between gap-6 rounded-2xl bg-cream-50 p-8 md:flex-row md:items-center md:p-10">
              <p className="max-w-2xl leading-relaxed text-charcoal/80">
                Plus a dairy and frozen aisle of ninety-some picks — paneer,
                yogurts, kulfi, parathas — and local creameries alongside the
                brands you grew up with. Short on time? Put the everyday list on
                Toast and collect it bagged.
              </p>
              <ToastButton label="Order essentials online" />
            </div>
          </Reveal>
        </div>
      </GreenPanel>

      {/* ============ THE COUNTER ============ */}
      <section id="counter" className="relative grain overflow-hidden">
        <div className="mx-auto grid max-w-7xl items-center gap-12 px-6 py-20 md:grid-cols-2 md:gap-20 md:py-32">
          <Parallax range={40} className="relative">
            <div className="card-img relative aspect-[4/5] overflow-hidden rounded-2xl shadow-2xl shadow-emerald-950/15">
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
              <p className="eyebrow">The Counter</p>
              <h2 className="mt-4 font-[family-name:var(--font-poppins)] text-3xl font-semibold leading-tight text-emerald-900 md:text-5xl">
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
              <p className="mt-7 max-w-lg leading-relaxed text-charcoal/80">
                Premium goat is cut to order, the way your dish asks for it.
                Chicken and ground meats sit packed cold in the case for
                grab-and-go speed. Our meats come from trusted certified suppliers
                — checked, not just claimed.
              </p>
            </Reveal>
            <StaggerList className="mt-9 max-w-md divide-y divide-emerald-900/12 border-y border-emerald-900/12">
              {cutChoices.map((c) => (
                <div
                  key={c.k}
                  className="flex items-baseline justify-between py-4"
                >
                  <span className="font-[family-name:var(--font-poppins)] text-sm font-semibold uppercase tracking-[0.12em] text-copper-700">
                    {c.k}
                  </span>
                  <span className="text-charcoal/80">{c.v}</span>
                </div>
              ))}
            </StaggerList>
            <Reveal delay={0.2}>
              <p className="mt-7 text-sm text-charcoal/60">
                Fresh goat and chicken arrive {site.freshDays}.
              </p>
              <div className="mt-6">
                <WhatsAppButton label="WhatsApp your cut ahead" />
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ============ GOOGLE REVIEWS ============ */}
      <GreenPanel id="reviews" image="/images/festival.jpg">
        <div className="mx-auto max-w-6xl px-6 py-20 md:py-28">
          <Reveal>
            <p className="eyebrow text-center !text-brand-gold">
              Word of mouth
            </p>
            <h2 className="mx-auto mt-4 max-w-2xl text-center font-[family-name:var(--font-poppins)] text-3xl font-semibold leading-tight text-cream-50 md:text-4xl">
              What the neighborhood{" "}
              <span className="copper-text font-[family-name:var(--font-playfair)] italic">
                says
              </span>
            </h2>
            <div className="copper-divider mx-auto mt-6 w-24" />
            <div className="mt-8 flex items-center justify-center gap-4">
              <span className="font-[family-name:var(--font-playfair)] text-5xl italic text-cream-50">
                {site.googleRating}
              </span>
              <span className="h-10 w-px bg-cream-100/20" />
              <span className="text-left">
                <span
                  className="block text-lg leading-none text-brand-gold"
                  aria-hidden
                >
                  ★★★★<span className="text-cream-100/25">★</span>
                </span>
                <span className="mt-1.5 block text-sm text-cream-100/70">
                  {site.googleReviewCount} reviews on Google
                </span>
              </span>
            </div>
          </Reveal>

          {site.reviews.length > 0 && (
            <div className="mt-14 grid gap-6 md:grid-cols-3">
              {site.reviews.map((r, i) => (
                <Reveal key={r.name} delay={i * 0.12}>
                  <figure className="h-full rounded-2xl bg-cream-50/5 p-7 ring-1 ring-cream-100/15 backdrop-blur">
                    <div
                      className="text-brand-gold"
                      aria-label={`${r.rating} out of 5 stars`}
                    >
                      {"★".repeat(r.rating)}
                      <span className="text-cream-100/25">
                        {"★".repeat(5 - r.rating)}
                      </span>
                    </div>
                    <blockquote className="mt-4 leading-relaxed text-cream-100/85">
                      “{r.text}”
                    </blockquote>
                    <figcaption className="mt-5 font-[family-name:var(--font-poppins)] text-xs font-semibold uppercase tracking-[0.14em] text-copper-300">
                      {r.name}
                      {r.badge && (
                        <span className="text-cream-100/40"> · {r.badge}</span>
                      )}
                      <span className="text-cream-100/40"> · via Google</span>
                    </figcaption>
                  </figure>
                </Reveal>
              ))}
            </div>
          )}

          <Reveal delay={0.2}>
            <p className="mx-auto mt-12 max-w-lg text-center leading-relaxed text-cream-100/80">
              Neighbors leave their honest notes on our Google listing — the
              good mornings and the things we still owe them. Read them all,
              and add yours after your next visit.
            </p>
            <div className="mt-9 flex flex-wrap justify-center gap-4">
              <a
                href={site.reviewsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={`${btnBase} bg-cream-100 text-emerald-900 hover:bg-cream-50`}
              >
                Read our Google reviews
              </a>
              <a
                href={site.reviewsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={`${btnBase} border-2 border-copper-300/80 text-cream-50 hover:border-copper-300 hover:bg-copper-300/10`}
              >
                Leave a review
              </a>
            </div>
          </Reveal>
        </div>
      </GreenPanel>

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
                    className={`${btnBase} bg-emerald-700 text-cream-50 hover:bg-emerald-900`}
                  >
                    Get directions
                  </a>
                  <a
                    href={`tel:${site.phone}`}
                    className={`${btnBase} border-2 border-copper-500 text-emerald-900 hover:bg-copper-300/20`}
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
                        href={site.reviewsUrl}
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

          <Reveal delay={0.15}>
            <div className="relative mt-14 overflow-hidden rounded-2xl shadow-xl shadow-emerald-950/10 ring-1 ring-emerald-900/10">
              <iframe
                src={site.mapEmbed}
                title={`Map to ${site.name}, ${site.address.street}, ${site.address.city}`}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                allowFullScreen
                className="block h-[340px] w-full border-0 md:h-[440px]"
              />
              <a
                href={site.maps}
                target="_blank"
                rel="noopener noreferrer"
                /* Top-right: keeps Google's attribution in the bottom corners clear. */
                className="absolute right-5 top-5 rounded-full bg-emerald-900 px-6 py-3 font-[family-name:var(--font-poppins)] text-xs font-semibold uppercase tracking-[0.1em] text-cream-50 shadow-lg transition-all duration-300 hover:scale-[1.04] hover:bg-emerald-950"
              >
                Open in Google Maps
              </a>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ============ CONTACT ============ */}
      <GreenPanel id="contact" image="/images/spices.jpg">
        <div className="mx-auto grid max-w-6xl gap-12 px-6 py-20 md:grid-cols-[0.9fr_1.1fr] md:gap-16 md:py-28">
          <Reveal>
            <p className="eyebrow !text-copper-300">Contact Us</p>
            <h2 className="mt-4 font-[family-name:var(--font-poppins)] text-3xl font-semibold leading-tight text-cream-50 md:text-4xl">
              Ask us{" "}
              <span className="copper-text font-[family-name:var(--font-playfair)] italic">
                anything
              </span>
            </h2>
            <div className="copper-divider mt-6 w-20" />
            <p className="mt-7 max-w-sm leading-relaxed text-cream-100/85">
              A special order, a product you can’t find, catering for a
              gathering, or a note about your last visit — send it over and
              we’ll write back.
            </p>
            <ul className="mt-8 space-y-3 text-sm text-cream-100/80">
              <li>
                <a href={`tel:${site.phone}`} className="draw-link">
                  {site.phoneDisplay}
                </a>
              </li>
              <li>
                <a href={`mailto:${site.email}`} className="draw-link">
                  {site.email}
                </a>
              </li>
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
            </ul>
          </Reveal>

          <Reveal delay={0.15}>
            <ContactForm />
          </Reveal>
        </div>
      </GreenPanel>

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
              <div className="flex items-center gap-3">
                {/* Cream tile — the mark is dark green and vanishes on emerald. */}
                <span className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-cream-50">
                  <Image
                    src="/logo-mark.png"
                    alt="DMart leaf mark"
                    width={48}
                    height={48}
                    className="h-11 w-11 object-contain"
                  />
                </span>
                <p className="font-[family-name:var(--font-poppins)] text-3xl font-bold leading-none">
                  DMart
                </p>
              </div>
              <p className="mt-5 max-w-xs text-sm leading-relaxed text-cream-100/60">
                {site.tagline}. A neighborhood market on West Brandon Blvd.
              </p>
              <div className="mt-6 flex items-center gap-3">
                <Social href={site.facebook} label="DMart on Facebook">
                  <path d="M14 9h3V6h-3c-2.2 0-4 1.8-4 4v2H8v3h2v7h3v-7h3l1-3h-4v-2c0-.6.4-1 1-1z" />
                </Social>
                <Social href={site.instagram} label="DMart on Instagram">
                  <path d="M12 8.6a3.4 3.4 0 1 0 0 6.8 3.4 3.4 0 0 0 0-6.8zm0 5.6a2.2 2.2 0 1 1 0-4.4 2.2 2.2 0 0 1 0 4.4z" />
                  <circle cx="15.7" cy="8.3" r=".9" />
                  <path d="M16.5 3.5h-9A4 4 0 0 0 3.5 7.5v9a4 4 0 0 0 4 4h9a4 4 0 0 0 4-4v-9a4 4 0 0 0-4-4zm2.8 13a2.8 2.8 0 0 1-2.8 2.8h-9a2.8 2.8 0 0 1-2.8-2.8v-9a2.8 2.8 0 0 1 2.8-2.8h9a2.8 2.8 0 0 1 2.8 2.8v9z" />
                </Social>
              </div>
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
                    href={site.toast}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="draw-link"
                  >
                    Order online on Toast
                  </a>
                </li>
                <li>
                  <a
                    href={site.facebook}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="draw-link"
                  >
                    Facebook
                  </a>
                  <span className="px-2 text-cream-100/30">·</span>
                  <a
                    href={site.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="draw-link"
                  >
                    Instagram
                  </a>
                </li>
                <li>
                  <a
                    href={site.reviewsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="draw-link"
                  >
                    Google reviews
                  </a>
                </li>
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
