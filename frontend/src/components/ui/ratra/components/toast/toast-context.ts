import { createContext, useContext } from "react";

export interface ToastOptions {
  message: string;
  action?: { label: string; altText?: string; onClick: () => void };
  duration?: number;
}

export const ToastContext = createContext<((t: ToastOptions) => void) | null>(
  null,
);

export function useToast(): (toast: ToastOptions) => void {
  const show = useContext(ToastContext);
  if (!show) throw new Error("useToast must be used inside <ToastProvider>");
  return show;
}
