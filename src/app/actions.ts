"use server";

import { Resend } from "resend";
import { site } from "@/lib/site";

export type ContactState = { ok: boolean; message: string };

/** Caps so a scripted post can't stuff the inbox. */
const LIMITS = { name: 100, email: 200, phone: 40, message: 4000 };

function clean(v: FormDataEntryValue | null, max: number) {
  return typeof v === "string" ? v.trim().slice(0, max) : "";
}

const escapeHtml = (s: string) =>
  s.replace(
    /[&<>"']/g,
    (c) =>
      ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[
        c
      ]!,
  );

export async function sendContactMessage(
  _prev: ContactState,
  formData: FormData,
): Promise<ContactState> {
  // Honeypot — real people never fill a hidden field.
  if (clean(formData.get("company"), 100)) {
    return { ok: true, message: "Thanks — we’ll be in touch shortly." };
  }

  const name = clean(formData.get("name"), LIMITS.name);
  const email = clean(formData.get("email"), LIMITS.email);
  const phone = clean(formData.get("phone"), LIMITS.phone);
  const message = clean(formData.get("message"), LIMITS.message);

  if (!name || !email || !message) {
    return { ok: false, message: "Please fill in your name, email and message." };
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)) {
    return { ok: false, message: "That email address doesn’t look right." };
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.error("RESEND_API_KEY is not set — contact message dropped.");
    return {
      ok: false,
      message: `Our form is having a moment. Please email us at ${site.email} or call ${site.phoneDisplay}.`,
    };
  }

  const rows: [string, string][] = [
    ["Name", name],
    ["Email", email],
    ["Phone", phone || "—"],
  ];

  const from = process.env.BOOKING_EMAIL_FROM;
  if (!from) {
    console.error("BOOKING_EMAIL_FROM is not set — contact message dropped.");
    return {
      ok: false,
      message: `Our form is having a moment. Please email us at ${site.email} or call ${site.phoneDisplay}.`,
    };
  }

  const { error } = await new Resend(apiKey).emails.send({
    // Sender domain must be verified in Resend.
    from,
    to: [site.email],
    replyTo: email,
    subject: `Website enquiry from ${name}`,
    text: [...rows.map(([k, v]) => `${k}: ${v}`), "", message].join("\n"),
    html: `<table style="font-family:system-ui,sans-serif;font-size:15px">${rows
      .map(
        ([k, v]) =>
          `<tr><td style="padding:4px 12px 4px 0;color:#666">${k}</td><td>${escapeHtml(v)}</td></tr>`,
      )
      .join("")}</table><hr style="border:none;border-top:1px solid #ddd;margin:16px 0">
      <p style="font-family:system-ui,sans-serif;font-size:15px;white-space:pre-wrap">${escapeHtml(message)}</p>`,
  });

  if (error) {
    console.error("Resend send failed:", error);
    return {
      ok: false,
      message: `We couldn’t send that. Please email ${site.email} or call ${site.phoneDisplay}.`,
    };
  }

  return {
    ok: true,
    message: "Thanks — your message is with us. We’ll write back shortly.",
  };
}
