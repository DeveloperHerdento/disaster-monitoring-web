import type { ReactNode } from "react";
import type { LucideIcon } from "lucide-react";
import { cn } from "../../lib/cn";
import { useMediaQuery } from "../../lib/use-media-query";
import { Icon } from "../icon/Icon";
import { Tooltip } from "../tooltip/Tooltip";

export interface SidebarItem {
  id: string;
  label: string;
  icon: LucideIcon;
  badge?: number;
  href?: string;
}

export interface SidebarProps {
  label: string;
  items: readonly SidebarItem[];
  current: string;
  onSelect?: (id: string) => void;
  header?: ReactNode;
  headerCompact?: ReactNode;
  collapsed?: boolean;
  className?: string;
}

function Badge({ count, compact }: { count: number; compact: boolean }) {
  return (
    <span
      className={cn(
        "inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-status-awas px-1.5 text-caption font-semibold text-white tabular-nums",
        compact && "absolute -top-1 -right-1 ring-2 ring-page",
      )}
    >
      {count > 99 ? "99+" : count}
    </span>
  );
}

export function Sidebar({
  label,
  items,
  current,
  onSelect,
  header,
  headerCompact,
  collapsed,
  className,
}: SidebarProps) {
  const wide = useMediaQuery("(min-width: 1024px)");
  const compact = collapsed ?? !wide;
  return (
    <nav
      aria-label={label}
      className={cn(
        "flex shrink-0 flex-col gap-1 rounded-[22px] bg-page",
        compact
          ? "w-16 items-center px-2.5 pt-4 pb-2.5"
          : "w-[260px] px-2.5 py-3.5",
        className,
      )}
    >
      {(compact ? (headerCompact ?? header) : header) && (
        <div className={cn(compact ? "pb-3" : "px-2.5 pt-1 pb-3.5")}>
          {compact ? (headerCompact ?? header) : header}
        </div>
      )}
      {items.map((item) => {
        const active = item.id === current;
        const Comp = item.href ? "a" : "button";
        const link = (
          <Comp
            key={item.id}
            {...(item.href ? { href: item.href } : { type: "button" as const })}
            aria-current={active ? "page" : undefined}
            aria-label={compact ? item.label : undefined}
            onClick={() => onSelect?.(item.id)}
            className={cn(
              "relative flex cursor-pointer items-center rounded-sm text-subhead text-label no-underline transition-colors duration-150",
              compact
                ? "size-11 justify-center"
                : "h-10 w-full gap-3 px-3 text-left font-medium",
              active
                ? "bg-tint-fill font-semibold text-tint"
                : "hover:bg-fill-secondary",
            )}
          >
            <Icon icon={item.icon} />
            {!compact && <span className="flex-1 truncate">{item.label}</span>}
            {item.badge ? <Badge count={item.badge} compact={compact} /> : null}
          </Comp>
        );
        return compact ? (
          <Tooltip key={item.id} content={item.label} side="right">
            {link}
          </Tooltip>
        ) : (
          link
        );
      })}
    </nav>
  );
}
