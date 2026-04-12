"use client";

import { useRef, useEffect } from "react";
import type { ChatMessage } from "@/lib/chat";

export default function ChatMessages({
  messages,
  isLoading,
}: {
  messages: ChatMessage[];
  isLoading: boolean;
}) {
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isLoading]);

  return (
    <div
      style={{
        flex: 1,
        overflowY: "auto",
        padding: "1rem",
        display: "flex",
        flexDirection: "column",
        gap: "0.75rem",
      }}
    >
      {messages.length === 0 && (
        <p
          style={{
            fontFamily: "var(--font-body)",
            fontSize: "0.75rem",
            color: "var(--color-text-dim)",
            textAlign: "center",
            marginTop: "2rem",
          }}
        >
          Ask me anything about our services, pricing, or process.
        </p>
      )}

      {messages.map((msg, i) => (
        <div
          key={i}
          style={{
            alignSelf: msg.role === "user" ? "flex-end" : "flex-start",
            maxWidth: "85%",
            padding: "0.6rem 0.85rem",
            borderRadius: "6px",
            fontFamily: "var(--font-body)",
            fontSize: "0.78rem",
            lineHeight: 1.6,
            background:
              msg.role === "user"
                ? "rgba(212, 168, 83, 0.1)"
                : "rgba(14, 14, 26, 0.8)",
            color:
              msg.role === "user"
                ? "var(--color-text-primary)"
                : "var(--color-text-secondary)",
            border:
              msg.role === "user"
                ? "1px solid rgba(212, 168, 83, 0.15)"
                : "1px solid rgba(212, 168, 83, 0.04)",
          }}
        >
          {msg.content}
        </div>
      ))}

      {isLoading && (
        <div
          style={{
            alignSelf: "flex-start",
            padding: "0.6rem 0.85rem",
            fontFamily: "var(--font-body)",
            fontSize: "0.75rem",
            color: "var(--color-text-ghost)",
          }}
        >
          Thinking...
        </div>
      )}

      <div ref={bottomRef} />
    </div>
  );
}
