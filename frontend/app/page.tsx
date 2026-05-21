import { AppStateProvider } from "@/components/app-state";
import { ConsoleHeader } from "@/components/console-header";
import { PanelsShell } from "@/components/panels-shell";
import { CopilotMascot } from "@/components/copilot-mascot";

export default function Home() {
  return (
    <AppStateProvider>
      <div className="console-bg grid min-h-dvh grid-rows-[auto_1fr]">
        <ConsoleHeader />

        <main className="mx-auto flex min-h-0 w-full max-w-[1600px] flex-1 px-4 py-3 sm:px-6 sm:py-4 lg:px-8 lg:py-5">
          <PanelsShell />
        </main>

        <CopilotMascot />
      </div>
    </AppStateProvider>
  );
}
