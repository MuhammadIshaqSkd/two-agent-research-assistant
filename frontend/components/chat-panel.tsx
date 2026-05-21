"use client";

import { useEffect, useRef } from "react";
import { useAppState } from "@/components/app-state";
import { ChatBubble } from "@/components/chat-bubble";
import { Composer } from "@/components/composer";

export function ChatPanel() {
  const { messages, threadId, status } = useAppState();
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    el.scrollTo({ top: el.scrollHeight, behavior: "smooth" });
  }, [messages.length, status]);

  return (
    <section className="flex h-full min-h-0 flex-col bg-panel ring-1 ring-line rounded-lg overflow-hidden">
      {/* Section header */}
      <div className="flex items-center justify-between border-b border-line px-4 py-2.5">
        <div className="flex items-center gap-2">
          <span className="eyebrow">Conversation</span>
        </div>
        <div className="flex items-center gap-1.5 text-[11px] text-dim">
          <span className="font-mono">thread</span>
          <span>·</span>
          <span className="text-ok inline-flex items-center gap-1">
            <span className="h-1.5 w-1.5 rounded-full bg-ok" />
            active
          </span>
          <span className="hidden sm:inline text-dim/70 ml-1.5">{threadId}</span>
        </div>
      </div>

      {/* Scrollable conversation */}
      <div
        ref={scrollRef}
        className="flex-1 min-h-0 overflow-y-auto px-4 py-5 space-y-5"
        aria-live="polite"
      >
        {messages.length === 0 ? (
          <EmptyState />
        ) : (
          messages.map((m) => <ChatBubble key={m.id} message={m} />)
        )}
      </div>

      {/* Composer */}
      <Composer />
    </section>
  );
}

function EmptyState() {
  return (
    <div className="flex h-full flex-col items-center justify-center text-center px-6 py-12">
      <div className="text-muted text-[13px] max-w-sm">
        Two agents — <span className="text-foreground">Planner</span> and{" "}
        <span className="text-foreground">Search</span> — will collaborate to answer your question.
        <br />
        Try: <span className="text-foreground">&quot;What are the latest developments in AI agent protocols?&quot;</span>
      </div>
    </div>
  );
}
