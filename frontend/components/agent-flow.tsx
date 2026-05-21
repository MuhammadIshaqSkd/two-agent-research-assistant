"use client";

import { Wrench, User2, Search } from "lucide-react";
import { useAppState } from "@/components/app-state";
import { cn } from "@/lib/utils";

type Node = {
  key: "planner" | "search" | "tool";
  label: string;
  port: string;
  badge: "agent" | "tool";
  Icon: React.ComponentType<{ className?: string }>;
};

const PLANNER: Node = { key: "planner", label: "Planner", port: ":8000", badge: "agent", Icon: User2 };
const SEARCH: Node = { key: "search", label: "Search", port: ":8002", badge: "agent", Icon: Search };
const TOOL: Node = { key: "tool", label: "web_search", port: ":8001", badge: "tool", Icon: Wrench };

function stepLabel(agent: "planner" | "search", toolRunning: boolean) {
  if (agent === "planner") return "synthesising answer";
  if (agent === "search" && toolRunning) return "preparing web_search call";
  return "delegated";
}

export function AgentFlow() {
  const { activeAgent, toolCalls, status } = useAppState();

  const toolRunning = toolCalls.some((t) => t.status === "running");
  const isStreaming = status === "streaming";
  const isActive = (k: Node["key"]) => {
    if (k === "planner") return activeAgent === "planner";
    if (k === "search") return activeAgent === "search";
    return toolRunning;
  };

  return (
    <div className="px-3 sm:px-4 pt-4 pb-3">
      <div className="grid grid-cols-[1fr_auto_1fr_auto_1fr] items-stretch gap-1.5 sm:gap-2">
        <FlowItem node={PLANNER} active={isActive("planner")} streaming={isStreaming} />
        <Connector label="A2A" tone="a2a" animate={isStreaming} />
        <FlowItem node={SEARCH} active={isActive("search")} streaming={isStreaming} />
        <Connector label="MCP" tone="mcp" animate={isStreaming && toolRunning} />
        <FlowItem node={TOOL} active={isActive("tool")} streaming={isStreaming} />
      </div>

      <div className="mt-3 flex items-center gap-2 text-[11px] text-muted">
        <span className="inline-flex h-1.5 w-1.5 rounded-full bg-current opacity-60" />
        <span>
          {activeAgent === "idle"
            ? "idle ~"
            : `${activeAgent} · ${stepLabel(activeAgent, toolRunning)}`}
        </span>
      </div>
    </div>
  );
}

function FlowItem({
  node,
  active,
  streaming,
}: {
  node: Node;
  active: boolean;
  streaming: boolean;
}) {
  const Icon = node.Icon;
  return (
    <div
      className={cn(
        "min-w-0 rounded-md ring-1 px-2.5 py-2 transition-all bg-panel-2",
        active ? "ring-copilot/60 bg-copilot/5" : "ring-line",
      )}
    >
      <div className="flex items-center gap-1.5">
        <Icon className={cn("h-3 w-3", active ? "text-copilot" : "text-muted")} />
        <span className="eyebrow truncate">{node.badge}</span>
        {active && streaming && (
          <span
            className="ml-auto inline-flex h-1.5 w-1.5 rounded-full bg-copilot animate-pulse-soft"
            aria-label="active"
          />
        )}
      </div>
      <div
        className={cn(
          "mt-1 text-[13px] font-medium truncate",
          active ? "text-foreground" : "text-foreground/90",
        )}
      >
        {node.label}
      </div>
      <div className="text-[10.5px] text-dim font-mono mt-0.5">{node.port}</div>
    </div>
  );
}

function Connector({
  label,
  tone,
  animate,
}: {
  label: string;
  tone: "a2a" | "mcp";
  animate?: boolean;
}) {
  return (
    <div className="flex flex-col items-center justify-center pt-3 select-none">
      <span className={cn("eyebrow", tone === "a2a" ? "text-a2a" : "text-mcp")}>{label}</span>
      <svg viewBox="0 0 32 12" className="mt-1 h-3 w-7" aria-hidden="true">
        <line
          x1="0"
          y1="6"
          x2="26"
          y2="6"
          stroke={tone === "a2a" ? "rgb(103 232 249 / 0.75)" : "rgb(52 211 153 / 0.75)"}
          strokeWidth="1.5"
          strokeDasharray="4 4"
          className={cn(animate && "animate-flow-dash")}
        />
        <polygon
          points="26,2 32,6 26,10"
          fill={tone === "a2a" ? "rgb(103 232 249 / 0.85)" : "rgb(52 211 153 / 0.85)"}
        />
      </svg>
    </div>
  );
}
