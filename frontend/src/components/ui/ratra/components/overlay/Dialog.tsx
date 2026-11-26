import type { ReactNode } from "react";
import { Dialog as DialogPrimitive } from "radix-ui";
import { cn } from "../../lib/cn";

export interface DialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  description?: ReactNode;
  children?: ReactNode;
  actions?: ReactNode;
  className?: string;
}

export function Dialog({
  open,
  onOpenChange,
  title,
  description,
  children,
  actions,
  className,
}: DialogProps) {
  return (
    <DialogPrimitive.Root open={open} onOpenChange={onOpenChange}>
      <DialogPrimitive.Portal>
        <DialogPrimitive.Overlay className="fixed inset-0 z-50 bg-scrim transition-opacity duration-200 starting:opacity-0" />
        <DialogPrimitive.Content
          {...(description ? {} : { "aria-describedby": undefined })}
          className={cn(
            "material fixed top-1/2 left-1/2 z-50 flex w-[420px] max-w-[calc(100vw-32px)] -translate-1/2 flex-col gap-3.5 rounded-[30px] p-6 shadow-4",
            "transition-[opacity,scale] duration-200 starting:scale-95 starting:opacity-0",
            className,
          )}
        >
          <DialogPrimitive.Title className="font-display text-title-3 font-bold">
            {title}
          </DialogPrimitive.Title>
          {description && (
            <DialogPrimitive.Description className="text-callout text-label-secondary">
              {description}
            </DialogPrimitive.Description>
          )}
          {children}
          {actions && <div className="flex gap-2.5 *:flex-1">{actions}</div>}
        </DialogPrimitive.Content>
      </DialogPrimitive.Portal>
    </DialogPrimitive.Root>
  );
}

export const DialogClose = DialogPrimitive.Close;
