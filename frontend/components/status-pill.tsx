import { Activity, CheckCircle2, CircleDashed, CircleX } from "lucide-react";
import { cn } from "@/lib/utils";

type Status = "idle" | "ready" | "streaming" | "error";

const META: Record<Status, { label: string; tone: string; Icon: React.ComponentType<{ className?: string }> }> = {
  idle: { label: "idle", tone: "text-dim", Icon: CircleDashed },
  ready: { label: "ready", tone: "text-ok", Icon: CheckCircle2 },
  streaming: { label: "stream active", tone: "text-warn", Icon: Activity },
  error: { label: "error", tone: "text-err", Icon: CircleX },
};

export function StatusPill({ status, className }: { status: Status; className?: string }) {
  const m = META[status];
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 text-[11px] font-medium",
        m.tone,
        className,
      )}
      aria-live="polite"
    >
      <m.Icon className={cn("h-3.5 w-3.5", status === "streaming" && "animate-pulse-soft")} />
      {m.label}
    </span>
  );
}
