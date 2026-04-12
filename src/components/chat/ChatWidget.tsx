"use client";

import { useChatContext } from "./ChatProvider";
import ChatMessages from "./ChatMessages";
import ChatInput from "./ChatInput";
import { CHAT_CONFIG } from "@/lib/chat";

export default function ChatWidget() {
  const { messages, isLoading, sendMessage, isOpen, setIsOpen } = useChatContext();
  const atLimit = messages.filter((m) => m.role === "user").length >= CHAT_CONFIG.maxMessages;

  return (
    <>
      {/* Floating bubble */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          aria-label="Open chat assistant"
          style={{
            position: "fixed",
            bottom: "1.5rem",
            right: "1.5rem",
            zIndex: 90,
            width: "52px",
            height: "52px",
            borderRadius: "50%",
            background: "rgba(3, 3, 8, 0.8)",
            backdropFilter: "blur(12px)",
            border: "1px solid rgba(212, 168, 83, 0.15)",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            transition: "border-color var(--duration-base) var(--ease-smooth), transform var(--duration-base) var(--ease-snappy)",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.borderColor = "rgba(212, 168, 83, 0.3)";
            e.currentTarget.style.transform = "scale(1.05)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.borderColor = "rgba(212, 168, 83, 0.15)";
            e.currentTarget.style.transform = "scale(1)";
          }}
        >
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="var(--color-accent-gold)" strokeWidth="1.5">
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
          </svg>
        </button>
      )}

      {/* Chat panel */}
      {isOpen && (
        <div
          style={{
            position: "fixed",
            bottom: "1.5rem",
            right: "1.5rem",
            zIndex: 91,
            width: "min(360px, calc(100vw - 2rem))",
            height: "min(500px, calc(100dvh - 6rem))",
            background: "rgba(7, 7, 15, 0.95)",
            backdropFilter: "blur(20px)",
            border: "1px solid rgba(212, 168, 83, 0.08)",
            borderRadius: "8px",
            display: "flex",
            flexDirection: "column",
            overflow: "hidden",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              padding: "0.75rem 1rem",
              borderBottom: "1px solid rgba(212, 168, 83, 0.06)",
            }}
          >
            <span
              style={{
                fontFamily: "var(--font-body)",
                fontSize: "0.65rem",
                letterSpacing: "0.15em",
                textTransform: "uppercase",
                color: "var(--color-text-dim)",
              }}
            >
              Dead Pixel Assistant
            </span>
            <button
              onClick={() => setIsOpen(false)}
              aria-label="Close chat"
              style={{
                background: "none",
                border: "none",
                color: "var(--color-text-ghost)",
                cursor: "pointer",
                padding: "4px",
                fontSize: "1.1rem",
                lineHeight: 1,
              }}
            >
              &times;
            </button>
          </div>

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
              You have reached the message limit. Head to the{" "}
              <a href="/contact" style={{ color: "var(--color-accent-gold)" }}>
                contact page
              </a>{" "}
              to book a project.
            </div>
          ) : (
            <ChatInput onSend={sendMessage} disabled={isLoading} />
          )}
        </div>
      )}
    </>
  );
}
