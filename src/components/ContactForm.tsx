"use client";

import { useActionState } from "react";
import { sendContactMessage, type ContactState } from "@/app/actions";

const field =
  "mt-2 w-full rounded-lg border border-emerald-900/15 bg-white px-4 py-3 text-charcoal outline-none transition focus:border-emerald-700 focus:ring-2 focus:ring-emerald-700/20";
const label =
  "text-xs font-semibold uppercase tracking-[0.14em] text-emerald-900/70";

const initial: ContactState = { ok: false, message: "" };

export function ContactForm() {
  const [state, formAction, pending] = useActionState(
    sendContactMessage,
    initial,
  );

  if (state.ok) {
    return (
      <div className="flex min-h-[420px] flex-col items-start justify-center rounded-2xl bg-cream-50 p-9 md:p-12">
        <span className="flex h-12 w-12 items-center justify-center rounded-full bg-emerald-700 text-2xl text-cream-50">
          ✓
        </span>
        <p className="mt-6 font-[family-name:var(--font-poppins)] text-2xl font-semibold text-emerald-900">
          Message sent
        </p>
        <p className="mt-3 leading-relaxed text-charcoal/75">{state.message}</p>
      </div>
    );
  }

  return (
    <form action={formAction} className="rounded-2xl bg-cream-50 p-7 md:p-9">
      {/* Honeypot — hidden from people, catnip for bots. */}
      <input
        type="text"
        name="company"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        className="absolute h-0 w-0 opacity-0"
      />

      <div className="grid gap-5 sm:grid-cols-2">
        <label className="block">
          <span className={label}>Name</span>
          <input
            type="text"
            name="name"
            required
            maxLength={100}
            autoComplete="name"
            className={field}
          />
        </label>
        <label className="block">
          <span className={label}>Phone</span>
          <input
            type="tel"
            name="phone"
            maxLength={40}
            autoComplete="tel"
            className={field}
          />
        </label>
      </div>

      <label className="mt-5 block">
        <span className={label}>Email</span>
        <input
          type="email"
          name="email"
          required
          maxLength={200}
          autoComplete="email"
          className={field}
        />
      </label>

      <label className="mt-5 block">
        <span className={label}>How can we help?</span>
        <textarea
          name="message"
          rows={5}
          required
          maxLength={4000}
          className={`${field} resize-y`}
        />
      </label>

      {state.message && (
        <p role="alert" className="mt-5 text-sm font-medium text-copper-700">
          {state.message}
        </p>
      )}

      <button
        type="submit"
        disabled={pending}
        className="mt-7 w-full rounded-full bg-emerald-700 px-8 py-4 font-[family-name:var(--font-poppins)] text-sm font-semibold uppercase tracking-[0.08em] text-cream-50 transition-all duration-300 hover:scale-[1.04] hover:bg-emerald-900 disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:scale-100 sm:w-auto"
      >
        {pending ? "Sending…" : "Send message"}
      </button>
    </form>
  );
}
