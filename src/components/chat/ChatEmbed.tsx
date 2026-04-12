"use client";

import { useChatContext } from "./ChatProvider";
import ChatMessages from "./ChatMessages";
import ChatInput from "./ChatInput";
import { CHAT_CONFIG } from "@/lib/chat";

export default function ChatEmbed() {
  const { messages, isLoading, sendMessage } = useChatContext();
  const atLimit = messages.filter((m) => m.role === "user").length >= CHAT_CONFIG.maxMessages;

  return (
    <div
      className="card-cosmic"
      style={{
        display: "flex",
        flexDirection: "column",
        height: "400px",
        overflow: "hidden",
      }}
    >
      <h2 className="heading-section mb-2" style={{ padding: "0.25rem 0" }}>
        ASK THE ASSISTANT
      </h2>
      <p
        style={{
          fontFamily: "var(--font-body)",
          fontSize: "0.7rem",
          color: "var(--color-text-ghost)",
          marginBottom: "0.75rem",
        }}
      >
        Questions about services, pricing, or process? Ask here.
      </p>

      <div
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          border: "1px solid rgba(212, 168, 83, 0.04)",
          borderRadius: "4px",
          overflow: "hidden",
          background: "rgba(3, 3, 8, 0.4)",
        }}
      >
        <ChatMessages messages={messages} isLoading={isLoading} />

        {atLimit ? (
          <div
            style={{
              padding: "0.75rem",
              borderTop: "1px solid rgba(212, 168, 83, 0.06)",
              textAlign: "center",
              fontFamily: "var(--font-body)",
              fontSize: "0.7rem",
              color: "var(--color-text-dim)",
            }}
          >
            Message limit reached. Use the booking form above or call David directly.
          </div>
        ) : (
          <ChatInput onSend={sendMessage} disabled={isLoading} />
        )}
      </div>
    </div>
  );
}
