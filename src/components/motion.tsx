"use client";

import { motion, useScroll, useTransform, useInView, animate } from "motion/react";
import { useRef, useEffect, useState, type ReactNode } from "react";

const EASE = [0.22, 1, 0.36, 1] as const;

/** Scroll-reveal: fades and rises once when it enters the viewport. */
export function Reveal({
  children,
  delay = 0,
  y = 28,
  className,
}: {
  children: ReactNode;
  delay?: number;
  y?: number;
  className?: string;
}) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.9, delay, ease: EASE }}
    >
      {children}
    </motion.div>
  );
}

/** Parallax: shifts children vertically as the section scrolls by. */
export function Parallax({
  children,
  range = 60,
  className,
}: {
  children: ReactNode;
  range?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [range, -range]);
  return (
    <motion.div ref={ref} style={{ y }} className={className}>
      {children}
    </motion.div>
  );
}


/** Counts up from 0 when scrolled into view. */
export function CountUp({ to, suffix = "" }: { to: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const controls = animate(0, to, {
      duration: 1.8,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (v) => setValue(Math.round(v)),
    });
    return () => controls.stop();
  }, [inView, to]);

  return (
    <span ref={ref}>
      {value.toLocaleString()}
      {suffix}
    </span>
  );
}

/** Staggered children reveal for lists. */
export function StaggerList({
  children,
  className,
}: {
  children: ReactNode[];
  className?: string;
}) {
  return (
    <motion.ul
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-60px" }}
      variants={{ show: { transition: { staggerChildren: 0.09 } } }}
    >
      {children.map((child, i) => (
        <motion.li
          key={i}
          variants={{
            hidden: { opacity: 0, x: -24 },
            show: { opacity: 1, x: 0, transition: { duration: 0.7, ease: EASE } },
          }}
        >
          {child}
        </motion.li>
      ))}
    </motion.ul>
  );
}
