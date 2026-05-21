"use client";

import { useAppState } from "@/components/app-state";
import { AgentFlow } from "@/components/agent-flow";
import { EventLog } from "@/components/event-log";

export function ActivityPanel() {
  const { events } = useAppState();
  return (
    <section className="flex h-full min-h-0 flex-col bg-panel ring-1 ring-line rounded-lg overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-line px-4 py-2.5">
        <span className="eyebrow">Agent activity</span>
        <span className="text-[11px] text-dim">
          <span className="text-foreground/80 font-mono">{events.length}</span> events
        </span>
      </div>

      {/* Agent flow cards + arrows */}
      <AgentFlow />

      {/* Divider */}
      <div className="hairline mx-3 sm:mx-4 mt-1 mb-3 opacity-70" />

      {/* Event log */}
      <div className="flex-1 min-h-0 overflow-y-auto" aria-live="polite">
        {events.length === 0 ? (
          <div className="px-5 py-10 text-center text-[12.5px] text-muted">
            No events yet. Send a question to start a run.
          </div>
        ) : (
          <EventLog events={events} />
        )}
      </div>
    </section>
  );
}
