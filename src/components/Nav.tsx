"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { motion } from "motion/react";
import { site } from "@/lib/site";

const links = [
  { href: "#grocery", label: "Fresh & Grocery" },
  { href: "#counter", label: "The Counter" },
  { href: "#reviews", label: "Reviews" },
  { href: "#visit", label: "Visit Us" },
  { href: "#contact", label: "Contact" },
];

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-cream-50/90 backdrop-blur-md shadow-[0_1px_0_rgba(20,83,45,0.08)]"
          : "bg-transparent"
      }`}
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 md:px-8">
        <a href="#top" className="flex items-center gap-2.5">
          <Image
            src="/logo-mark.png"
            alt="DMart leaf mark"
            width={40}
            height={40}
            priority
            className="h-10 w-10 object-contain"
          />
          <span className="font-[family-name:var(--font-poppins)] text-2xl font-bold tracking-tight text-emerald-900">
            DMart
          </span>
          <span className="hidden text-[10px] font-medium uppercase tracking-[0.22em] text-copper-700 sm:inline">
            Brandon · FL
          </span>
        </a>

        <ul className="hidden items-center gap-7 md:flex">
          {links.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                className="draw-link font-[family-name:var(--font-poppins)] text-sm font-medium text-emerald-900"
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-3">
          <a
            href={site.whatsapp}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden rounded-full border-2 border-emerald-700 px-5 py-2 font-[family-name:var(--font-poppins)] text-xs font-semibold uppercase tracking-[0.08em] text-emerald-900 transition-transform duration-300 hover:scale-[1.04] hover:bg-emerald-700/10 lg:inline-block"
          >
            WhatsApp Us
          </a>
          <a
            href={site.toast}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden rounded-full bg-emerald-700 px-6 py-2.5 font-[family-name:var(--font-poppins)] text-xs font-semibold uppercase tracking-[0.08em] text-cream-50 transition-transform duration-300 hover:scale-[1.04] hover:bg-emerald-900 sm:inline-block"
          >
            Order Online
          </a>
          <button
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen(!open)}
            className="flex h-10 w-10 flex-col items-center justify-center gap-1.5 md:hidden"
          >
            <span
              className={`h-0.5 w-6 bg-emerald-900 transition-transform duration-300 ${open ? "translate-y-1 rotate-45" : ""}`}
            />
            <span
              className={`h-0.5 w-6 bg-emerald-900 transition-transform duration-300 ${open ? "-translate-y-1 -rotate-45" : ""}`}
            />
          </button>
        </div>
      </nav>

      {open && (
        <motion.div
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          className="border-t border-emerald-900/10 bg-cream-50/95 px-6 py-6 backdrop-blur-md md:hidden"
        >
          <ul className="flex flex-col gap-5">
            {links.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="font-[family-name:var(--font-poppins)] text-lg font-semibold text-emerald-900"
                >
                  {l.label}
                </a>
              </li>
            ))}
            <li className="flex flex-wrap gap-3">
              <a
                href={site.toast}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block rounded-full bg-emerald-700 px-6 py-3 font-[family-name:var(--font-poppins)] text-sm font-semibold uppercase tracking-wider text-cream-50"
              >
                Order Online
              </a>
              <a
                href={site.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block rounded-full border-2 border-emerald-700 px-6 py-3 font-[family-name:var(--font-poppins)] text-sm font-semibold uppercase tracking-wider text-emerald-900"
              >
                WhatsApp Us
              </a>
            </li>
          </ul>
        </motion.div>
      )}
    </motion.header>
  );
}
