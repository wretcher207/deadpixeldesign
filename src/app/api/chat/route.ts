import { NextRequest, NextResponse } from "next/server";
import Groq from "groq-sdk";
import fs from "fs";
import path from "path";
import { CHAT_CONFIG, type ChatMessage } from "@/lib/chat";

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

// Simple in-memory rate limiting
const rateLimit = new Map<string, { count: number; resetAt: number }>();
const RATE_LIMIT = 30;
const RATE_WINDOW = 60 * 60 * 1000;

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const entry = rateLimit.get(ip);

  if (!entry || now > entry.resetAt) {
    rateLimit.set(ip, { count: 1, resetAt: now + RATE_WINDOW });
    return true;
  }

  if (entry.count >= RATE_LIMIT) return false;

  entry.count++;
  return true;
}

// Load knowledge base at startup
let knowledgeBase = "";
try {
  knowledgeBase = fs.readFileSync(
    path.join(process.cwd(), "src/data/chatbot-knowledge.md"),
    "utf-8"
  );
} catch {
  knowledgeBase = "You are a helpful assistant for Dead Pixel Design, a web design and audio engineering studio in Maine.";
}

const SYSTEM_PROMPT = `You are the AI assistant for Dead Pixel Design, a web design and audio engineering studio based in Maine, run by David. Your job is to answer questions about services and pricing, help qualify leads, and be a knowledgeable resource.

Rules:
- Be direct and helpful. No corporate fluff. Match the Dead Pixel voice: clear, honest, no bullshit.
- Only answer based on the knowledge base below. Never make up services, prices, or capabilities.
- If you do not know the answer, say so and suggest they contact David directly.
- When someone shows interest, ask qualifying questions to recommend the right package.
- When someone seems ready to book, direct them to the contact page booking form.
- Keep responses concise. 2-3 sentences for simple questions. Longer only if they ask for detail.
- Never discuss competitors or other businesses.
- You are not David. You are the Dead Pixel assistant.

Knowledge Base:
${knowledgeBase}`;

export async function POST(request: NextRequest) {
  const ip = request.headers.get("x-forwarded-for") || "unknown";

  if (!checkRateLimit(ip)) {
    return NextResponse.json(
      { error: "Too many requests. Try again in a bit." },
      { status: 429 }
    );
  }

  try {
    const { messages } = (await request.json()) as { messages: ChatMessage[] };

    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      return NextResponse.json(
        { error: "No messages provided." },
        { status: 400 }
      );
    }

    const trimmed = messages.slice(-CHAT_CONFIG.maxMessages);

    const completion = await groq.chat.completions.create({
      model: CHAT_CONFIG.model,
      messages: [
        { role: "system", content: SYSTEM_PROMPT },
        ...trimmed.map((m) => ({
          role: m.role as "user" | "assistant",
          content: m.content.slice(0, CHAT_CONFIG.maxInputLength),
        })),
      ],
      max_tokens: CHAT_CONFIG.maxTokens,
      temperature: CHAT_CONFIG.temperature,
    });

    const reply = completion.choices[0]?.message?.content || "Sorry, I could not generate a response. Try reaching out to David directly.";

    return NextResponse.json({ reply });
  } catch (error) {
    console.error("Chat API error:", error);
    return NextResponse.json(
      { error: "Something went wrong. Try again, or contact David directly." },
      { status: 500 }
    );
  }
}
