import type { ReactNode } from "react";
import { cn } from "../../lib/cn";
import type { StatusLevel } from "../../lib/status";
import { StatusPill } from "../status/StatusPill";

export interface DetailPanelProps {
  title: string;
  subtitle?: ReactNode;
  status?: StatusLevel;
  summary?: ReactNode;
  children?: ReactNode;
  actions?: ReactNode;
}

export function DetailPanel({
  title,
  subtitle,
  status,
  summary,
  children,
  actions,
}: DetailPanelProps) {
  return (
    <>
      <div className="flex items-start justify-between gap-3">
        <div className="flex min-w-0 flex-col gap-1">
          <h2 className="font-display text-title-3 font-bold">{title}</h2>
          {subtitle && (
            <p className="text-callout text-label-secondary">{subtitle}</p>
          )}
        </div>
        {status && <StatusPill level={status} />}
      </div>
      {summary && <p className="text-callout">{summary}</p>}
      {children}
      {actions && (
        <div className="mt-auto flex gap-2.5 pt-1 *:min-w-0 *:flex-1">
          {actions}
        </div>
      )}
    </>
  );
}

export interface MetricTileProps {
  label: string;
  value: ReactNode;
  className?: string;
}

export function MetricTile({ label, value, className }: MetricTileProps) {
  return (
    <div
      className={cn(
        "flex flex-col gap-0.5 rounded-[16px] bg-surface/90 px-3.5 py-3",
        className,
      )}
    >
      <p className="text-footnote font-medium text-label-secondary">{label}</p>
      <p className="font-display text-title-3 font-bold tabular-nums">
        {value}
      </p>
    </div>
  );
}

export interface NavSectionProps {
  title?: string;
  children: ReactNode;
  className?: string;
}

export function NavSection({ title, children, className }: NavSectionProps) {
  return (
    <div className={cn("flex flex-col gap-1", className)}>
      {title && (
        <p className="px-2.5 pb-1.5 text-footnote font-semibold text-label-secondary">
          {title}
        </p>
      )}
      {children}
    </div>
  );
}

export interface NavItemProps {
  label: string;
  visual?: ReactNode;
  meta?: ReactNode;
  current?: boolean;
  href?: string;
  onClick?: () => void;
}

export function NavItem({
  label,
  visual,
  meta,
  current = false,
  href,
  onClick,
}: NavItemProps) {
  const Comp = href ? "a" : "button";
  return (
    <Comp
      {...(href ? { href } : { type: "button" as const })}
      aria-current={current ? "page" : undefined}
      onClick={onClick}
      className={cn(
        "flex w-full cursor-pointer items-center gap-2.5 rounded-[14px] px-3 py-2 text-left text-subhead no-underline",
        current
          ? "bg-tint-fill font-semibold text-label"
          : "font-medium text-label hover:bg-fill-secondary",
      )}
    >
      {visual}
      <span className="min-w-0 flex-1 truncate">{label}</span>
      {meta && (
        <span className="text-footnote font-normal text-label-tertiary tabular-nums">
          {meta}
        </span>
      )}
    </Comp>
  );
}

export interface AccountChipProps {
  initials: string;
  name: string;
  detail?: string;
  className?: string;
}

export function AccountChip({
  initials,
  name,
  detail,
  className,
}: AccountChipProps) {
  return (
    <div className={cn("flex items-center gap-2.5 p-2.5", className)}>
      <span
        aria-hidden="true"
        className="grid size-8 shrink-0 place-items-center rounded-full bg-fill text-footnote font-semibold"
      >
        {initials}
      </span>
      <span className="flex min-w-0 flex-col">
        <span className="truncate text-subhead font-semibold">{name}</span>
        {detail && (
          <span className="truncate text-footnote text-label-secondary">
            {detail}
          </span>
        )}
      </span>
    </div>
  );
}
