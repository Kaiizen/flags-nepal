import { siteConfig } from "@/lib/site";
import { clientIpFrom, rateLimit } from "@/lib/rate-limit";
import { NextResponse } from "next/server";
import { Resend } from "resend";
import { z } from "zod";

/** Max 5 submissions per IP per 10 minutes. Tune if legitimate traffic grows. */
const RATE_LIMIT_MAX = 5;
const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000;

const bodySchema = z.object({
  name: z.string().min(2).max(120),
  email: z.string().email().max(254),
  phone: z.string().min(5).max(40),
  subject: z.enum(["quote", "bulk", "custom", "support", "other"]),
  message: z.string().min(10).max(5000),
  /** Honeypot — bots auto-fill hidden inputs; real users leave this empty. */
  website: z.string().max(0).optional().or(z.literal("")),
});

export async function POST(request: Request) {
  const ip = clientIpFrom(request);
  const limit = rateLimit(ip, RATE_LIMIT_MAX, RATE_LIMIT_WINDOW_MS);
  if (!limit.success) {
    const retryAfter = Math.max(1, Math.ceil((limit.resetAt - Date.now()) / 1000));
    return NextResponse.json(
      { code: "RATE_LIMITED" as const },
      {
        status: 429,
        headers: {
          "Retry-After": String(retryAfter),
          "X-RateLimit-Limit": String(RATE_LIMIT_MAX),
          "X-RateLimit-Remaining": "0",
          "X-RateLimit-Reset": String(Math.ceil(limit.resetAt / 1000)),
        },
      },
    );
  }

  let json: unknown;
  try {
    json = await request.json();
  } catch {
    return NextResponse.json({ code: "INVALID_JSON" as const }, { status: 400 });
  }

  const parsed = bodySchema.safeParse(json);
  if (!parsed.success) {
    return NextResponse.json({ code: "VALIDATION" as const }, { status: 400 });
  }

  /**
   * Honeypot check — return the same shape as a successful submit so bots do
   * not learn they were filtered. Drop silently on the server.
   */
  if (parsed.data.website && parsed.data.website.length > 0) {
    return NextResponse.json({ ok: true as const, id: "filtered" });
  }

  const apiKey = process.env.RESEND_API_KEY?.trim();
  const isDev = process.env.NODE_ENV === "development";

  /** Local / preview without Resend: accept the form so UX can be tested. */
  if (!apiKey) {
    if (isDev) {
      // eslint-disable-next-line no-console -- intentional dev-only trace
      console.info("[api/contact] RESEND_API_KEY not set — skipping email (dev only)", {
        to: process.env.CONTACT_INBOX_EMAIL || siteConfig.email,
        from: parsed.data.email,
        subject: parsed.data.subject,
      });
      return NextResponse.json({ ok: true as const, id: "dev-mock", skippedEmail: true });
    }
    return NextResponse.json({ code: "EMAIL_NOT_CONFIGURED" as const }, { status: 503 });
  }

  const resend = new Resend(apiKey);
  const from = process.env.RESEND_FROM_EMAIL || "Flags Nepal <onboarding@resend.dev>";
  /** Inbox for contact form submissions (override with CONTACT_INBOX_EMAIL). Defaults to siteConfig.email. */
  const to = process.env.CONTACT_INBOX_EMAIL || siteConfig.email;

  const { name, email, phone, subject, message } = parsed.data;
  const { data, error } = await resend.emails.send({
    from,
    to: [to],
    replyTo: email,
    subject: `[Flags Nepal] ${subject.toUpperCase()} — ${name}`,
    text: [
      `Name: ${name}`,
      `Email: ${email}`,
      `Phone: ${phone}`,
      `Subject: ${subject}`,
      "",
      message,
    ].join("\n"),
  });

  if (error) {
    // eslint-disable-next-line no-console -- server-side delivery failure
    console.error("[api/contact] Resend error:", error);
    return NextResponse.json({ code: "EMAIL_DELIVERY_FAILED" as const }, { status: 502 });
  }

  return NextResponse.json({ ok: true as const, id: data?.id });
}
