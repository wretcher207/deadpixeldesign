export interface ChatMessage {
  role: "user" | "assistant";
  content: string;
}

export const CHAT_CONFIG = {
  maxMessages: 20,
  maxInputLength: 500,
  model: "llama-3.3-70b-versatile",
  maxTokens: 512,
  temperature: 0.7,
} as const;
