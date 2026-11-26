import type { ReactElement } from "react";
import type { LucideIcon } from "lucide-react";
import { DropdownMenu } from "radix-ui";
import { cn } from "../../lib/cn";
import { Icon } from "../icon/Icon";

export type MenuEntry =
  | {
      label: string;
      onSelect: () => void;
      icon?: LucideIcon;
      destructive?: boolean;
      disabled?: boolean;
    }
  | "separator";

export interface MenuProps {
  trigger: ReactElement;
  items: readonly MenuEntry[];
  align?: "start" | "center" | "end";
  side?: "top" | "right" | "bottom" | "left";
}

export function Menu({
  trigger,
  items,
  align = "start",
  side = "bottom",
}: MenuProps) {
  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger asChild>{trigger}</DropdownMenu.Trigger>
      <DropdownMenu.Portal>
        <DropdownMenu.Content
          align={align}
          side={side}
          sideOffset={8}
          collisionPadding={8}
          className="material z-50 flex w-60 flex-col gap-0.5 rounded-md p-2 shadow-3"
        >
          {items.map((item, i) =>
            item === "separator" ? (
              <DropdownMenu.Separator
                key={i}
                className="mx-3 my-1 h-px bg-separator"
              />
            ) : (
              <DropdownMenu.Item
                key={i}
                onSelect={item.onSelect}
                disabled={item.disabled}
                className={cn(
                  "flex cursor-pointer items-center gap-2.5 rounded-sm px-3 py-2.5 text-callout text-label outline-none select-none",
                  "data-disabled:cursor-not-allowed data-disabled:text-label-tertiary data-highlighted:bg-fill",
                  item.destructive && "text-danger",
                )}
              >
                {item.icon && <Icon icon={item.icon} />}
                {item.label}
              </DropdownMenu.Item>
            ),
          )}
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  );
}
