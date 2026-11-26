import type { ReactElement, ReactNode } from "react";
import { Popover as PopoverPrimitive } from "radix-ui";
import { cn } from "../../lib/cn";

export interface PopoverProps {
  trigger: ReactElement;
  children: ReactNode;
  label?: string;
  side?: "top" | "right" | "bottom" | "left";
  align?: "start" | "center" | "end";
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  className?: string;
}

export function Popover({
  trigger,
  children,
  label,
  side = "bottom",
  align = "start",
  open,
  onOpenChange,
  className,
}: PopoverProps) {
  return (
    <PopoverPrimitive.Root open={open} onOpenChange={onOpenChange}>
      <PopoverPrimitive.Trigger asChild>{trigger}</PopoverPrimitive.Trigger>
      <PopoverPrimitive.Portal>
        <PopoverPrimitive.Content
          aria-label={label}
          side={side}
          align={align}
          sideOffset={8}
          collisionPadding={8}
          className={cn(
            "material z-50 flex w-75 max-w-[calc(100vw-16px)] flex-col gap-2 rounded-[22px] p-4 shadow-3",
            "transition-[opacity,scale] duration-200 starting:scale-95 starting:opacity-0",
            className,
          )}
        >
          {children}
        </PopoverPrimitive.Content>
      </PopoverPrimitive.Portal>
    </PopoverPrimitive.Root>
  );
}
