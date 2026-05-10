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

function escapeHtml(value: string): string {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

function quoteAcknowledgementHtml(name: string): string {
  const safeName = escapeHtml(name);
  const logoUrl = `${siteConfig.url}/flags-nepal-logo-white.png`;
  const phoneHref = `tel:${siteConfig.phoneTel}`;

  return `
<!doctype html>
<html>
  <body style="margin:0;padding:0;background:#f3f4f6;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;color:#111827;">
    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background:#f3f4f6;padding:24px 12px;">
      <tr>
        <td align="center">
          <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="max-width:640px;background:#ffffff;border-radius:14px;overflow:hidden;border:1px solid #e5e7eb;">
            <tr>
              <td style="background:#b91c1c;padding:22px 24px;" align="center">
                <img src="${logoUrl}" alt="Flags Nepal" width="140" style="display:block;border:0;max-width:100%;height:auto;" />
              </td>
            </tr>
            <tr>
              <td style="padding:28px 24px 8px 24px;text-align:center;">
                <h1 style="margin:0 0 12px 0;font-size:24px;line-height:1.25;color:#111827;">Quote request received</h1>
                <p style="margin:0 0 14px 0;font-size:16px;line-height:1.6;color:#374151;">
                  Hi ${safeName},
                </p>
                <p style="margin:0 0 12px 0;font-size:16px;line-height:1.6;color:#374151;">
                  Thank you for contacting Flags Nepal. We have received your quote request and our team will get back to you soon with pricing and details.
                </p>
                <p style="margin:0 0 18px 0;font-size:16px;line-height:1.6;color:#374151;">
                  If you want to share extra requirements (size, quantity, delivery date), simply reply to this email.
                </p>
              </td>
            </tr>
            <tr>
              <td style="padding:0 24px 24px 24px;text-align:center;">
                <a href="${siteConfig.url}/contact" style="display:inline-block;background:#b91c1c;color:#ffffff;text-decoration:none;font-size:15px;font-weight:600;padding:12px 18px;border-radius:10px;">
                  Contact our team
                </a>
                <a href="${phoneHref}" style="display:inline-block;margin-left:8px;background:#ffffff;color:#b91c1c;text-decoration:none;font-size:15px;font-weight:600;padding:12px 18px;border-radius:10px;border:1px solid #fecaca;">
                  Call ${siteConfig.phone}
                </a>
              </td>
            </tr>
            <tr>
              <td style="padding:18px 24px;background:#f9fafb;border-top:1px solid #e5e7eb;text-align:center;">
                <p style="margin:0 0 6px 0;font-size:14px;line-height:1.5;color:#4b5563;">
                  Flags Nepal, ${siteConfig.address}
                </p>
                <p style="margin:0;font-size:13px;line-height:1.5;color:#6b7280;">
                  Premium flags, banners, and printed identity.
                </p>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>
`.trim();
}

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

  /**
   * Auto-acknowledge quote requests so customers get immediate confirmation.
   * Do not fail the API response if this follow-up email fails.
   */
  if (subject === "quote") {
    const { error: ackError } = await resend.emails.send({
      from,
      to: [email],
      replyTo: to,
      subject: "We received your quote request - Flags Nepal",
      html: quoteAcknowledgementHtml(name),
      text: [
        `Hi ${name},`,
        "",
        "Thank you for requesting a quote from Flags Nepal.",
        "We have received your message and our team will get back to you soon.",
        "",
        "If you need to add more details, simply reply to this email.",
        "",
        "Best regards,",
        "Flags Nepal Team",
      ].join("\n"),
    });

    if (ackError) {
      // eslint-disable-next-line no-console -- secondary acknowledgement failure
      console.error("[api/contact] Resend quote acknowledgement error:", ackError);
    }
  }

  return NextResponse.json({ ok: true as const, id: data?.id });
}
