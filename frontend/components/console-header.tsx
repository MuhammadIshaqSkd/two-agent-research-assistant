"use client";

import { ProtocolPill } from "@/components/protocol-pill";
import { StatusPill } from "@/components/status-pill";
import { ThemeToggle } from "@/components/theme-toggle";
import { useAppState } from "@/components/app-state";

export function ConsoleHeader() {
  const { status } = useAppState();

  return (
    <header className="sticky top-0 z-30 border-b border-line bg-background/85 backdrop-blur supports-[backdrop-filter]:bg-background/65">
      <div className="mx-auto flex h-12 max-w-[1600px] items-center gap-3 px-4 sm:px-6 lg:px-8">
        {/* Brand */}
        <div className="flex items-center gap-2 min-w-0">
          <span className="relative inline-flex h-2 w-2 shrink-0">
            <span className="absolute inset-0 animate-ping rounded-full bg-ok/60" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-ok" />
          </span>
          <span className="flex items-baseline gap-1.5 min-w-0">
            <span className="font-semibold tracking-tight text-foreground">Mobiz</span>
            <span className="hidden sm:inline text-[11px] text-dim truncate">
              · agent research console
            </span>
          </span>
        </div>

        {/* Protocol pills (center on desktop, scrollable on mobile) */}
        <div className="ml-2 hidden flex-1 items-center justify-center gap-1.5 md:flex">
          <ProtocolPill name="MCP" />
          <ProtocolPill name="A2A" />
          <ProtocolPill name="AG-UI" />
          <ProtocolPill name="CopilotKit" />
        </div>

        {/* Mobile: horizontal scroll pills */}
        <div className="ml-1 flex flex-1 items-center gap-1.5 overflow-x-auto md:hidden">
          <ProtocolPill name="MCP" />
          <ProtocolPill name="A2A" />
          <ProtocolPill name="AG-UI" />
          <ProtocolPill name="CopilotKit" />
        </div>

        {/* Right cluster */}
        <div className="ml-auto flex items-center gap-3">
          <StatusPill status={status} />
          <span className="hidden h-4 w-px bg-line sm:block" />
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
