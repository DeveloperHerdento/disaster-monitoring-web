import { Check, ChevronDown } from "lucide-react";
import { DropdownMenu } from "radix-ui";
import { cn } from "../../lib/cn";
import type { Lang } from "../../lib/format";
import { PLATFORMS, type Platform } from "../../lib/platform";
import { Icon } from "../icon/Icon";
import { PlatformTile } from "./PlatformTile";

const ALL = Object.keys(PLATFORMS) as Platform[];

export interface PlatformChipProps {
  platform: Platform;
  className?: string;
}

export function PlatformChip({ platform, className }: PlatformChipProps) {
  return (
    <span
      className={cn(
        "inline-flex h-10 items-center gap-2 rounded-full bg-fill pr-4 pl-2.5 text-subhead font-semibold whitespace-nowrap",
        className,
      )}
    >
      <PlatformTile platform={platform} size={24} decorative />
      {PLATFORMS[platform].name}
    </span>
  );
}

export interface PlatformSwitcherProps {
  value: Platform;
  onChange: (platform: Platform) => void;
  platforms?: readonly Platform[];
  lang?: Lang;
  label?: string;
}

export function PlatformSwitcher({
  value,
  onChange,
  platforms = ALL,
  lang = "id",
  label = "Ganti platform",
}: PlatformSwitcherProps) {
  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger
        aria-label={`${label}: RATRA ${PLATFORMS[value].name}`}
        className="press inline-flex h-11 cursor-pointer items-center gap-2.5 rounded-full bg-fill pr-4 pl-3"
      >
        <PlatformTile platform={value} decorative />
        <span className="text-subhead font-semibold">
          RATRA {PLATFORMS[value].name}
        </span>
        <Icon icon={ChevronDown} size={16} className="text-label-secondary" />
      </DropdownMenu.Trigger>
      <DropdownMenu.Portal>
        <DropdownMenu.Content
          align="start"
          sideOffset={8}
          collisionPadding={8}
          className="material z-50 w-[312px] rounded-[22px] p-2 shadow-3"
        >
          <DropdownMenu.RadioGroup
            className="flex flex-col gap-1"
            value={value}
            onValueChange={(v) => onChange(v as Platform)}
          >
            {platforms.map((p) => (
              <DropdownMenu.RadioItem
                key={p}
                value={p}
                className={cn(
                  "flex cursor-pointer items-center gap-3 rounded-[14px] px-3 py-2.5 outline-none select-none",
                  "data-highlighted:bg-fill data-[state=checked]:bg-tint/10",
                )}
              >
                <PlatformTile platform={p} size={32} decorative />
                <span className="flex flex-1 flex-col">
                  <span className="text-subhead font-semibold">
                    RATRA {PLATFORMS[p].name}
                  </span>
                  <span className="text-footnote text-label-secondary">
                    {lang === "id" ? PLATFORMS[p].descId : PLATFORMS[p].descEn}
                  </span>
                </span>
                <DropdownMenu.ItemIndicator>
                  <Icon icon={Check} className="text-tint" />
                </DropdownMenu.ItemIndicator>
              </DropdownMenu.RadioItem>
            ))}
          </DropdownMenu.RadioGroup>
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  );
}
