import type { ReactNode } from "react";
import { cn } from "../../lib/cn";

export interface ConsoleProps {
  nav?: ReactNode;
  map: ReactNode;
  panel?: ReactNode;
  panelLabel?: string;
  overlays?: ReactNode;
  className?: string;
}

export function Console({
  nav,
  map,
  panel,
  panelLabel = "Detail",
  overlays,
  className,
}: ConsoleProps) {
  return (
    <div
      className={cn(
        "flex h-dvh gap-3 overflow-hidden bg-tray p-3 max-md:p-0",
        className,
      )}
    >
      {nav && (
        <div className="flex w-64 shrink-0 flex-col overflow-y-auto rounded-pane bg-surface px-3 py-5 max-lg:hidden">
          {nav}
        </div>
      )}
      <main className="relative min-w-0 flex-1 overflow-hidden rounded-pane bg-page max-md:rounded-none">
        <div className="absolute inset-0 *:size-full">{map}</div>
        {overlays && (
          <div
            className={cn(
              "pointer-events-none absolute inset-y-0 left-0 *:pointer-events-auto",
              panel ? "right-[356px] max-md:right-0" : "right-0",
            )}
          >
            {overlays}
          </div>
        )}
        {panel && (
          <aside
            aria-label={panelLabel}
            className={cn(
              "material absolute z-10 flex flex-col gap-[18px] overflow-y-auto rounded-md p-[22px] shadow-3",
              "top-3 right-3 bottom-3 w-[344px]",
              "max-md:inset-x-0 max-md:top-auto max-md:bottom-0 max-md:max-h-[55dvh] max-md:w-auto max-md:rounded-b-none",
            )}
          >
            {panel}
          </aside>
        )}
      </main>
    </div>
  );
}

const POSITION = {
  top: "top-5 left-1/2 -translate-x-1/2",
  "top-left": "top-5 left-5",
  "top-right": "top-5 right-5",
  bottom: "bottom-5 left-1/2 -translate-x-1/2",
  "bottom-left": "bottom-5 left-5",
  "bottom-right": "bottom-5 right-5",
} as const;

export interface MapOverlayProps {
  position: keyof typeof POSITION;
  children: ReactNode;
  className?: string;
}

export function MapOverlay({ position, children, className }: MapOverlayProps) {
  return (
    <div
      className={cn(
        "absolute z-[5] max-w-[calc(100%-40px)]",
        POSITION[position],
        className,
      )}
    >
      {children}
    </div>
  );
}
