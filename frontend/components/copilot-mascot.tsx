import { cn } from "@/lib/utils";

/**
 * Floating CopilotKit mascot — matches the screenshots' bottom-right pair.
 * Pure visual for F1; F2 will swap this for the real `<CopilotSidebar>` toggle.
 */
export function CopilotMascot({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "fixed bottom-4 right-4 z-40 flex items-center gap-2 select-none pointer-events-none",
        className,
      )}
      aria-hidden
    >
      <span className="grid h-9 w-9 place-items-center rounded-full bg-panel-2 ring-1 ring-line shadow-lg shadow-black/30">
        <span className="relative grid h-6 w-6 place-items-center rounded-full bg-ok/20 text-ok">
          <span className="h-2 w-2 rounded-full bg-ok" />
          <span className="absolute -bottom-0.5 -right-0.5 h-2 w-2 rounded-full bg-ok ring-2 ring-panel-2" />
        </span>
      </span>
      <span className="grid h-9 w-9 place-items-center rounded-full bg-panel-2 ring-1 ring-line shadow-lg shadow-black/30 text-copilot font-bold text-[14px]">
        G
      </span>
    </div>
  );
}
