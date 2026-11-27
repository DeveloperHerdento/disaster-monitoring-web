import type { ComponentProps } from "react";
import { Slot } from "radix-ui";
import { cn } from "../../lib/cn";

export interface LinkProps extends ComponentProps<"a"> {
  arrow?: boolean;
  onMedia?: boolean;
  asChild?: boolean;
}

export function Link({
  arrow = false,
  onMedia = false,
  asChild = false,
  className,
  children,
  ...rest
}: LinkProps) {
  const Comp = asChild ? Slot.Root : "a";
  return (
    <Comp
      className={cn(
        "cursor-pointer rounded-xs font-medium no-underline hover:opacity-75",
        onMedia ? "text-white" : "text-link",
        className,
      )}
      {...rest}
    >
      <Slot.Slottable>{children}</Slot.Slottable>
      {arrow && <span aria-hidden="true">{"\u00a0›"}</span>}
    </Comp>
  );
}
