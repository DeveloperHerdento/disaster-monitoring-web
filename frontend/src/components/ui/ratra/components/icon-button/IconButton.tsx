import type { ComponentProps } from "react";
import type { LucideIcon } from "lucide-react";
import { cn } from "../../lib/cn";
import { Icon, type IconSize } from "../icon/Icon";
import { Tooltip } from "../tooltip/Tooltip";

export type IconButtonVariant = "filled" | "tinted" | "gray" | "plain";
export type IconButtonSize = "xs" | "s" | "m" | "l";

const VARIANT: Record<IconButtonVariant, string> = {
  filled: "bg-filled text-white",
  tinted: "bg-tint-fill text-tint",
  gray: "bg-fill text-label",
  plain: "bg-transparent text-tint",
};

const ON_MEDIA: Record<IconButtonVariant, string> = {
  filled: "bg-white text-navy",
  tinted: "glass-clear text-white",
  gray: "glass-clear text-white",
  plain: "bg-transparent text-white",
};

const SIZE: Record<IconButtonSize, { box: string; icon: IconSize }> = {
  xs: { box: "size-[30px]", icon: 16 },
  s: { box: "size-[34px]", icon: 20 },
  m: { box: "size-11", icon: 20 },
  l: { box: "size-[50px]", icon: 24 },
};

export interface IconButtonProps extends Omit<
  ComponentProps<"button">,
  "children" | "aria-label"
> {
  icon: LucideIcon;
  label: string;
  variant?: IconButtonVariant;
  size?: IconButtonSize;
  pressed?: boolean;
  onMedia?: boolean;
  tooltip?: boolean;
  tooltipSide?: "top" | "right" | "bottom" | "left";
}

export function IconButton({
  icon,
  label,
  variant = "gray",
  size = "m",
  pressed,
  onMedia = false,
  tooltip = true,
  tooltipSide,
  type = "button",
  className,
  ...rest
}: IconButtonProps) {
  const button = (
    <button
      type={type}
      aria-label={label}
      aria-pressed={pressed}
      className={cn(
        "press inline-flex shrink-0 cursor-pointer items-center justify-center rounded-full",
        "disabled:cursor-not-allowed disabled:bg-fill-secondary disabled:text-label-tertiary",
        (onMedia ? ON_MEDIA : VARIANT)[variant],
        pressed && "bg-tint-fill text-tint",
        SIZE[size].box,
        className,
      )}
      {...rest}
    >
      <Icon icon={icon} size={SIZE[size].icon} />
    </button>
  );
  return tooltip ? (
    <Tooltip content={label} side={tooltipSide}>
      {button}
    </Tooltip>
  ) : (
    button
  );
}
