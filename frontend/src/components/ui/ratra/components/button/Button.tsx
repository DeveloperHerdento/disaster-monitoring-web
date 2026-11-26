import type { ComponentProps, MouseEvent } from "react";
import type { LucideIcon } from "lucide-react";
import { Slot } from "radix-ui";
import { cn } from "../../lib/cn";
import { Icon } from "../icon/Icon";
import { Spinner } from "../spinner/Spinner";

export type ButtonVariant =
  "filled" | "tinted" | "gray" | "plain" | "destructive";
export type ButtonSize = "s" | "m" | "l";

const VARIANT: Record<ButtonVariant, string> = {
  filled: "bg-filled text-white",
  tinted: "bg-tint-fill text-tint",
  gray: "bg-fill text-label",
  plain: "bg-transparent text-tint",
  destructive: "bg-danger-fill text-danger",
};

const ON_MEDIA: Record<ButtonVariant, string> = {
  filled: "bg-white text-navy",
  tinted: "glass-clear text-white",
  gray: "glass-clear text-white",
  plain: "bg-transparent text-white",
  destructive: "bg-danger-fill text-danger",
};

const SIZE: Record<ButtonSize, string> = {
  s: "h-[34px] px-4 text-footnote font-semibold",
  m: "h-11 px-5 text-subhead font-semibold",
  l: "h-[50px] px-6 text-headline",
};

export interface ButtonProps extends ComponentProps<"button"> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  icon?: LucideIcon;
  iconEnd?: LucideIcon;
  loading?: boolean;
  onMedia?: boolean;
  asChild?: boolean;
}

export function Button({
  variant = "gray",
  size = "m",
  icon,
  iconEnd,
  loading = false,
  onMedia = false,
  asChild = false,
  type = "button",
  className,
  children,
  onClick,
  ...rest
}: ButtonProps) {
  const Comp = asChild ? Slot.Root : "button";
  const iconSize = size === "s" ? 16 : 20;
  const blockWhileLoading = (e: MouseEvent<HTMLButtonElement>) =>
    e.preventDefault();
  return (
    <Comp
      type={asChild ? undefined : type}
      aria-busy={loading || undefined}
      aria-disabled={loading || undefined}
      onClick={loading ? blockWhileLoading : onClick}
      className={cn(
        "press inline-flex shrink-0 cursor-pointer items-center justify-center gap-2 rounded-full whitespace-nowrap no-underline select-none",
        "disabled:cursor-not-allowed disabled:bg-fill-secondary disabled:text-label-tertiary aria-busy:cursor-progress aria-busy:opacity-90",
        (onMedia ? ON_MEDIA : VARIANT)[variant],
        SIZE[size],
        className,
      )}
      {...rest}
    >
      {loading ? (
        <Spinner size={iconSize} />
      ) : (
        icon && <Icon icon={icon} size={iconSize} />
      )}
      <Slot.Slottable>{children}</Slot.Slottable>
      {iconEnd && <Icon icon={iconEnd} size={iconSize} />}
    </Comp>
  );
}
