import { useCallback, useState, type ReactNode } from "react";
import { Toast } from "radix-ui";
import { ToastContext, type ToastOptions } from "./toast-context";

interface ActiveToast extends ToastOptions {
  id: number;
}

export interface ToastProviderProps {
  children: ReactNode;
  label?: string;
}

export function ToastProvider({
  children,
  label = "Notifikasi",
}: ToastProviderProps) {
  const [toast, setToast] = useState<ActiveToast | null>(null);
  const show = useCallback(
    (t: ToastOptions) => setToast({ ...t, id: Date.now() }),
    [],
  );

  return (
    <ToastContext.Provider value={show}>
      <Toast.Provider label={label} swipeDirection="down">
        {children}
        {toast && (
          <Toast.Root
            key={toast.id}
            duration={toast.duration ?? 6000}
            onOpenChange={(open) => !open && setToast(null)}
            className="flex items-center gap-3.5 rounded-full bg-inverse py-2.5 pr-2.5 pl-[18px] text-on-inverse shadow-3 transition-[opacity,translate] duration-300 starting:translate-y-6 starting:opacity-0"
          >
            <Toast.Title className="text-subhead">{toast.message}</Toast.Title>
            {toast.action && (
              <Toast.Action
                altText={toast.action.altText ?? toast.action.label}
                onClick={toast.action.onClick}
                className="press h-[34px] shrink-0 cursor-pointer rounded-full bg-on-inverse/16 px-3.5 text-subhead font-semibold"
              >
                {toast.action.label}
              </Toast.Action>
            )}
          </Toast.Root>
        )}
        <Toast.Viewport className="fixed bottom-6 left-1/2 z-[60] flex max-w-[calc(100vw-32px)] -translate-x-1/2 flex-col outline-none" />
      </Toast.Provider>
    </ToastContext.Provider>
  );
}
