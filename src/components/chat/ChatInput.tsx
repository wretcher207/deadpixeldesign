"use client";

import { useState } from "react";
import { CHAT_CONFIG } from "@/lib/chat";

export default function ChatInput({
  onSend,
  disabled,
}: {
  onSend: (message: string) => void;
  disabled: boolean;
}) {
  const [input, setInput] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = input.trim();
    if (!trimmed || disabled) return;
    onSend(trimmed);
    setInput("");
  };

  return (
    <form
      onSubmit={handleSubmit}
      style={{
        display: "flex",
        gap: "0.5rem",
        padding: "0.75rem",
        borderTop: "1px solid rgba(212, 168, 83, 0.06)",
      }}
    >
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value.slice(0, CHAT_CONFIG.maxInputLength))}
        placeholder="Ask about our services..."
        disabled={disabled}
        className="input-cosmic"
        style={{ flex: 1, fontSize: "0.78rem", padding: "0.5rem 0.75rem" }}
      />
      <button
        type="submit"
        disabled={disabled || !input.trim()}
        className="btn-ghost"
        style={{
          padding: "0.5rem 1rem",
          fontSize: "0.6rem",
          opacity: disabled || !input.trim() ? 0.4 : 1,
          cursor: disabled || !input.trim() ? "not-allowed" : "pointer",
        }}
      >
        Send
      </button>
    </form>
  );
}
