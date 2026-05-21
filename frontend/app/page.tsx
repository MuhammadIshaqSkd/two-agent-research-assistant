import { AppStateProvider } from "@/components/app-state";
import { ConsoleHeader } from "@/components/console-header";
import { PanelsShell } from "@/components/panels-shell";
import { CopilotMascot } from "@/components/copilot-mascot";

export default function Home() {
  return (
    <AppStateProvider>
      <div className="console-bg flex min-h-screen flex-col">
        <ConsoleHeader />

        <main className="mx-auto w-full max-w-[1600px] flex-1 px-4 sm:px-6 lg:px-8 py-3 sm:py-4 lg:py-5">
          <PanelsShell />
        </main>

        <CopilotMascot />
      </div>
    </AppStateProvider>
  );
}
