"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Real counter footage, kitchen first and the butcher last — same order the
 * page tells its story in. All segments picked to avoid the burnt-in title
 * cards in the source reels.
 */
const clips = [
  { src: "/video/dosa.mp4", poster: "/video/dosa.jpg", label: "Dosa batter going onto the tawa" },
  { src: "/video/pizza.mp4", poster: "/video/pizza.jpg", label: "Pizza made fresh at the counter" },
  { src: "/video/burger.mp4", poster: "/video/burger.jpg", label: "Crispy chicken burger from the kitchen" },
  { src: "/video/vada.mp4", poster: "/video/vada.jpg", label: "Vada shaped by hand" },
  { src: "/video/chicken.mp4", poster: "/video/chicken.jpg", label: "Chicken and goat cut to order at the counter" },
];

export function HeroVideos() {
  const [active, setActive] = useState(0);
  const refs = useRef<(HTMLVideoElement | null)[]>([]);

  useEffect(() => {
    const v = refs.current[active];
    if (!v) return;
    // Someone who asked for less motion gets the poster frame, not a moving hero.
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    v.currentTime = 0;
    // Autoplay can be refused (iOS Low Power Mode). Poster stays; nothing breaks.
    v.play().catch(() => {});
  }, [active]);

  return (
    <div className="relative aspect-[9/16] w-full max-w-[340px] overflow-hidden rounded-2xl bg-emerald-950 shadow-2xl shadow-emerald-950/25 md:max-w-[380px]">
      {clips.map((c, i) => (
        <video
          key={c.src}
          ref={(el) => {
            refs.current[i] = el;
          }}
          src={c.src}
          poster={c.poster}
          muted
          playsInline
          preload={i === 0 ? "auto" : "none"}
          aria-label={c.label}
          onEnded={() => setActive((n) => (n + 1) % clips.length)}
          // Warm the next clip while this one plays, so the cut isn't a stall.
          onPlay={() => refs.current[(i + 1) % clips.length]?.load()}
          className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-700 ${
            i === active ? "opacity-100" : "opacity-0"
          }`}
        />
      ))}

      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-emerald-950/70 to-transparent" />

      <div className="absolute inset-x-0 bottom-0 flex gap-2 p-4">
        {clips.map((c, i) => (
          <button
            key={c.src}
            type="button"
            onClick={() => setActive(i)}
            aria-label={`Play: ${c.label}`}
            aria-current={i === active}
            className="h-1.5 flex-1 overflow-hidden rounded-full bg-cream-50/30 transition-colors hover:bg-cream-50/50"
          >
            <span
              className={`block h-full rounded-full bg-cream-50 transition-all duration-500 ${
                i === active ? "w-full" : "w-0"
              }`}
            />
          </button>
        ))}
      </div>
    </div>
  );
}
