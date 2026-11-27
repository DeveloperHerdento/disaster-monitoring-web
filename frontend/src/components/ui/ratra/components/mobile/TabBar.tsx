import type { ReactNode } from "react";
import type { LucideIcon } from "lucide-react";
import { cn } from "../../lib/cn";
import { Icon } from "../icon/Icon";

export interface TabBarItem {
  id: string;
  label: string;
  icon: LucideIcon;
  href?: string;
  badge?: number;
}

export interface TabBarProps {
  label: string;
  items: readonly TabBarItem[];
  current: string;
  onSelect?: (id: string) => void;
  className?: string;
}

export function TabBar({
  label,
  items,
  current,
  onSelect,
  className,
}: TabBarProps) {
  return (
    <nav
      aria-label={label}
      className={cn("glass-float flex gap-0.5 rounded-full p-[5px]", className)}
    >
      {items.slice(0, 4).map((item) => {
        const active = item.id === current;
        const Comp = item.href ? "a" : "button";
        return (
          <Comp
            key={item.id}
            {...(item.href ? { href: item.href } : { type: "button" as const })}
            aria-current={active ? "page" : undefined}
            onClick={() => onSelect?.(item.id)}
            className={cn(
              "relative flex w-19 cursor-pointer flex-col items-center gap-px rounded-full py-1.5 text-caption font-semibold no-underline",
              active ? "bg-fill text-tint" : "text-label",
            )}
          >
            <Icon icon={item.icon} size={24} />
            {item.label}
            {item.badge ? (
              <span className="absolute top-0.5 left-1/2 ml-1.5 inline-flex h-4 min-w-4 items-center justify-center rounded-full bg-status-awas px-1 text-[10px] leading-none text-white tabular-nums">
                {item.badge > 9 ? "9+" : item.badge}
              </span>
            ) : null}
          </Comp>
        );
      })}
    </nav>
  );
}

export interface LargeTitleProps {
  title: string;
  subtitle?: ReactNode;
  trailing?: ReactNode;
  className?: string;
}

export function LargeTitle({
  title,
  subtitle,
  trailing,
  className,
}: LargeTitleProps) {
  return (
    <header className={cn("flex flex-col gap-2", className)}>
      <div className="flex items-end justify-between gap-3">
        <h1 className="font-display text-title-2 font-bold">{title}</h1>
        {trailing}
      </div>
      {subtitle && <p className="text-body text-label-secondary">{subtitle}</p>}
    </header>
  );
}
