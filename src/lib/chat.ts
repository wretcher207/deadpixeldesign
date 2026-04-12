export interface ChatMessage {
  role: "user" | "assistant";
  content: string;
}

export const CHAT_CONFIG = {
  maxMessages: 20,
  maxInputLength: 500,
  model: "gemma2-9b-it",
  maxTokens: 512,
  temperature: 0.7,
} as const;
