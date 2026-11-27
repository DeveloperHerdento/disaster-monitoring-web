import type { Lang } from "../../lib/format";
import { STATUS_LABEL, type StatusLevel } from "../../lib/status";
import { cn } from "../../lib/cn";
import { Icon, type IconSize } from "../icon/Icon";
import { STATUS_ICON, STATUS_TONE } from "./status-icons";

export interface StatusPillProps {
  level: StatusLevel;
  lang?: Lang;
  label?: string;
  className?: string;
}

export function StatusPill({
  level,
  lang = "id",
  label,
  className,
}: StatusPillProps) {
  const Glyph = STATUS_ICON[level];
  const tone = STATUS_TONE[level];
  return (
    <span
      className={cn(
        "inline-flex h-[26px] shrink-0 items-center gap-1.5 rounded-full pr-2.5 pl-2 text-footnote font-semibold whitespace-nowrap",
        tone.bg,
        tone.fg,
        className,
      )}
    >
      <Glyph size={14} strokeWidth={2} aria-hidden="true" />
      {label ?? STATUS_LABEL[lang][level]}
    </span>
  );
}

export interface StatusIconProps {
  level: StatusLevel;
  size?: IconSize;
  lang?: Lang;
  decorative?: boolean;
  className?: string;
}

export function StatusIcon({
  level,
  size = 20,
  lang = "id",
  decorative = false,
  className,
}: StatusIconProps) {
  return (
    <Icon
      icon={STATUS_ICON[level]}
      size={size}
      label={decorative ? undefined : STATUS_LABEL[lang][level]}
      className={cn(STATUS_TONE[level].fg, className)}
    />
  );
}
