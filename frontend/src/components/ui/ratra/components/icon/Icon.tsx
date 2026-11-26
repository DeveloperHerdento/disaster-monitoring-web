import type { LucideIcon, LucideProps } from "lucide-react";

export type IconSize = 16 | 20 | 24 | 32;

export interface IconProps extends Omit<
  LucideProps,
  "ref" | "size" | "strokeWidth"
> {
  icon: LucideIcon;
  size?: IconSize;
  label?: string;
}

export function Icon({ icon: Glyph, size = 20, label, ...rest }: IconProps) {
  return (
    <Glyph
      size={size}
      strokeWidth={size === 16 ? 2 : 1.75}
      aria-hidden={label ? undefined : true}
      aria-label={label}
      role={label ? "img" : undefined}
      focusable="false"
      {...rest}
    />
  );
}
