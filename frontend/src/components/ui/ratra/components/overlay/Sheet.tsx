import type { ReactNode } from "react";
import { X } from "lucide-react";
import { Dialog as DialogPrimitive } from "radix-ui";
import { cn } from "../../lib/cn";
import { IconButton } from "../icon-button/IconButton";

export interface SheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  children: ReactNode;
  footer?: ReactNode;
  closeLabel?: string;
  className?: string;
}

export function Sheet({
  open,
  onOpenChange,
  title,
  children,
  footer,
  closeLabel = "Tutup",
  className,
}: SheetProps) {
  return (
    <DialogPrimitive.Root open={open} onOpenChange={onOpenChange} modal={false}>
      <DialogPrimitive.Portal>
        <DialogPrimitive.Content
          aria-describedby={undefined}
          onInteractOutside={(e) => e.preventDefault()}
          className={cn(
            "fixed inset-y-3 right-3 z-40 flex w-[360px] bg-page/90 backdrop-blur-[30px] max-w-[calc(100vw-24px)] flex-col gap-4 overflow-y-auto rounded-lg p-[22px] shadow-3",
            "transition-transform duration-300 ease-out starting:translate-x-[calc(100%+12px)]",
            className,
          )}
        >
          <div className="flex items-center justify-between gap-3">
            <DialogPrimitive.Title className="font-display text-title-3 font-bold">
              {title}
            </DialogPrimitive.Title>
            <DialogPrimitive.Close asChild>
              <IconButton
                icon={X}
                label={closeLabel}
                size="xs"
                tooltip={false}
              />
            </DialogPrimitive.Close>
          </div>
          <div className="flex flex-col gap-4">{children}</div>
          {footer && (
            <div className="mt-auto flex gap-2.5 pt-2 *:min-w-0 *:flex-1">
              {footer}
            </div>
          )}
        </DialogPrimitive.Content>
      </DialogPrimitive.Portal>
    </DialogPrimitive.Root>
  );
}
