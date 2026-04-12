"use client";

import { createContext, useContext, useState, useCallback } from "react";
import type { ChatMessage } from "@/lib/chat";
import { CHAT_CONFIG } from "@/lib/chat";

interface ChatContextValue {
  messages: ChatMessage[];
  isLoading: boolean;
  sendMessage: (content: string) => void;
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
}

const ChatContext = createContext<ChatContextValue | null>(null);

export function useChatContext() {
  const ctx = useContext(ChatContext);
  if (!ctx) throw new Error("useChatContext must be used within ChatProvider");
  return ctx;
}

export default function ChatProvider({ children }: { children: React.ReactNode }) {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const sendMessage = useCallback(
    async (content: string) => {
      if (isLoading) return;
      if (messages.length >= CHAT_CONFIG.maxMessages) return;

      const userMsg: ChatMessage = { role: "user", content };
      const updated = [...messages, userMsg];
      setMessages(updated);
      setIsLoading(true);

      try {
        const res = await fetch("/api/chat", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ messages: updated }),
        });

        const data = await res.json();

        if (res.ok && data.reply) {
          setMessages((prev) => [...prev, { role: "assistant", content: data.reply }]);
        } else {
          setMessages((prev) => [
            ...prev,
            {
              role: "assistant",
              content: data.error || "Something went wrong. Try reaching out to David directly.",
            },
          ]);
        }
      } catch {
        setMessages((prev) => [
          ...prev,
          {
            role: "assistant",
            content: "Could not connect. Try again, or contact David directly at (207) 694-8691.",
          },
        ]);
      } finally {
        setIsLoading(false);
      }
    },
    [messages, isLoading]
  );

  return (
    <ChatContext.Provider value={{ messages, isLoading, sendMessage, isOpen, setIsOpen }}>
      {children}
    </ChatContext.Provider>
  );
}
