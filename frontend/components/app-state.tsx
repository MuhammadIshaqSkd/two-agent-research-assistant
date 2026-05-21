"use client";

import { createContext, useCallback, useContext, useMemo, useState } from "react";
import { MOCK_EVENTS, MOCK_MESSAGES, type AgentEvent, type ChatMessage, type ToolCall } from "@/lib/mock-data";

export type AgentName = "planner" | "search" | "idle";
export type RunStatus = "idle" | "ready" | "streaming" | "error";

export type AppState = {
  status: RunStatus;
  activeAgent: AgentName;
  step: string;
  toolCalls: ToolCall[];
  events: AgentEvent[];
  messages: ChatMessage[];
  threadId: string;
  setStatus: (s: RunStatus) => void;
  setActiveAgent: (a: AgentName) => void;
  appendUserMessage: (content: string) => void;
};

const AppStateContext = createContext<AppState | null>(null);

export function AppStateProvider({ children }: { children: React.ReactNode }) {
  // F1 placeholder state - mock data baked in so the panels look real before F2/F3 wiring.
  const [status, setStatus] = useState<RunStatus>("ready");
  const [activeAgent, setActiveAgent] = useState<AgentName>("idle");
  const [messages, setMessages] = useState<ChatMessage[]>(MOCK_MESSAGES);

  const appendUserMessage = useCallback((content: string) => {
    setMessages((prev) => [...prev, { id: `m_${Date.now()}`, role: "user", content }]);
  }, []);

  const value = useMemo<AppState>(
    () => ({
      status,
      activeAgent,
      step: status === "streaming" ? `${activeAgent} Â· running` : "idle Â· awaiting question",
      toolCalls: [
        {
          id: "tc_1",
          name: "web_search",
          status: "done",
          query: "AI agent protocols 2026",
          resultsCount: 3,
        },
      ],
      events: MOCK_EVENTS,
      messages,
      threadId: "thr_xn422j8r",
      setStatus,
      setActiveAgent,
      appendUserMessage,
    }),
    [status, activeAgent, messages, appendUserMessage],
  );

  return <AppStateContext.Provider value={value}>{children}</AppStateContext.Provider>;
}

export function useAppState() {
  const ctx = useContext(AppStateContext);
  if (!ctx) throw new Error("useAppState must be used inside AppStateProvider");
  return ctx;
}
