"use client";

import { useEffect, useRef, useState } from "react";
import { Square, ArrowUp, CornerDownLeft } from "lucide-react";
import { useAppState } from "@/components/app-state";
import { cn } from "@/lib/utils";

export function Composer() {
  const { status, setStatus } = useAppState();
  const [value, setValue] = useState("");
  const ref = useRef<HTMLTextAreaElement>(null);
  const isStreaming = status === "streaming";

  // Auto-grow
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    el.style.height = "auto";
    el.style.height = Math.min(el.scrollHeight, 200) + "px";
  }, [value]);

  function submit() {
    if (!value.trim() || isStreaming) return;
    // F2 will wire this up to the Planner Agent. For F1 we just flip status briefly.
    setStatus("streaming");
    setTimeout(() => setStatus("ready"), 1400);
    setValue("");
  }

  function onKey(e: React.KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      submit();
    }
  }

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        submit();
      }}
      className="border-t border-line bg-panel/70 backdrop-blur"
    >
      <div className="px-4 pt-3">
        <textarea
          ref={ref}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={onKey}
          rows={1}
          placeholder="Ask the agents anything…"
          disabled={isStreaming}
          aria-label="Ask the agents anything"
          className={cn(
            "block w-full resize-none bg-transparent text-[14px] text-foreground placeholder:text-dim outline-none",
            "max-h-[200px] min-h-[24px]",
          )}
        />
      </div>

      <div className="flex items-center justify-between gap-3 px-4 py-2.5 text-[11px] text-dim">
        <div className="flex items-center gap-3">
          <span className="inline-flex items-center gap-1.5">
            <kbd className="inline-flex h-4 items-center rounded border border-line bg-panel-2 px-1 font-mono text-[10px]">
              <CornerDownLeft className="h-2.5 w-2.5" />
            </kbd>
            send
          </span>
          <span className="hidden sm:inline-flex items-center gap-1.5">
            <kbd className="inline-flex h-4 items-center rounded border border-line bg-panel-2 px-1 font-mono text-[10px]">⇧↵</kbd>
            newline
          </span>
        </div>

        {isStreaming ? (
          <button
            type="button"
            onClick={() => setStatus("ready")}
            className="inline-flex items-center gap-1.5 rounded-md bg-err/15 px-2.5 py-1 text-[11px] font-medium text-err ring-1 ring-err/30 hover:bg-err/25 transition-colors"
          >
            <Square className="h-3 w-3 fill-current" />
            stop
          </button>
        ) : (
          <button
            type="submit"
            disabled={!value.trim()}
            className={cn(
              "inline-flex items-center gap-1.5 rounded-md bg-ok/15 px-2.5 py-1 text-[11px] font-medium text-ok ring-1 ring-ok/30 transition-colors",
              "hover:bg-ok/25",
              "disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:bg-ok/15",
            )}
          >
            run
            <ArrowUp className="h-3 w-3" />
          </button>
        )}
      </div>
    </form>
  );
}
