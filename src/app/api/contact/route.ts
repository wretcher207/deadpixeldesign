import { NextRequest, NextResponse } from "next/server";

const WEBHOOK_URL = process.env.WEBHOOK_URL || "";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    // Honeypot check — bots fill hidden fields, humans don't
    if (body._trap) {
      return NextResponse.json({ ok: true }); // silently drop
    }

    const { name, email, phone, projectType, details } = body;

    // Basic server-side validation
    if (!name || !email || !projectType || !details) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    if (!WEBHOOK_URL) {
      console.error("WEBHOOK_URL is not set");
      return NextResponse.json({ error: "Server misconfiguration" }, { status: 500 });
    }

    const res = await fetch(WEBHOOK_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name,
        email,
        phone: phone || "Not provided",
        projectType,
        details,
        date: new Date().toLocaleString("en-US", { timeZone: "America/New_York" }),
      }),
    });

    if (!res.ok) {
      console.error("Webhook responded with", res.status);
      return NextResponse.json({ error: "Webhook error" }, { status: 500 });
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Contact route error:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
