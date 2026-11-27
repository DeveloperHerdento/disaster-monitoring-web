import type { LucideIcon } from "lucide-react";
import { ToggleGroup } from "radix-ui";
import { cn } from "../../lib/cn";
import { Icon } from "../icon/Icon";

export interface SegmentedOption<T extends string> {
  value: T;
  label: string;
  icon?: LucideIcon;
}

export interface SegmentedProps<T extends string> {
  options: readonly SegmentedOption<T>[];
  value: T;
  onChange: (value: T) => void;
  label: string;
  className?: string;
}

export function Segmented<T extends string>({
  options,
  value,
  onChange,
  label,
  className,
}: SegmentedProps<T>) {
  return (
    <ToggleGroup.Root
      type="single"
      value={value}
      onValueChange={(next) => next && onChange(next as T)}
      aria-label={label}
      className={cn(
        "inline-flex w-fit max-w-full overflow-x-auto rounded-full bg-fill p-[3px]",
        className,
      )}
    >
      {options.map((o) => (
        <ToggleGroup.Item
          key={o.value}
          value={o.value}
          className="inline-flex h-[34px] shrink-0 cursor-pointer items-center gap-1.5 rounded-full px-3.5 text-subhead font-semibold whitespace-nowrap text-label transition-[background-color,box-shadow] duration-200 data-[state=on]:bg-raised data-[state=on]:shadow-1"
        >
          {o.icon && <Icon icon={o.icon} size={16} />}
          {o.label}
        </ToggleGroup.Item>
      ))}
    </ToggleGroup.Root>
  );
}
