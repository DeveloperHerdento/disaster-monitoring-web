import type { ReactNode } from "react";
import { X } from "lucide-react";
import { cn } from "../../lib/cn";
import type { StatusLevel } from "../../lib/status";
import { Icon } from "../icon/Icon";
import { IconButton } from "../icon-button/IconButton";
import { STATUS_ICON, STATUS_TONE } from "../status/status-icons";

export interface BannerAction {
  label: string;
  href?: string;
  onClick?: () => void;
}

export interface BannerProps {
  level: StatusLevel;
  title: string;
  children?: ReactNode;
  action?: BannerAction;
  className?: string;
}

function ActionLink({
  action,
  className,
}: {
  action: BannerAction;
  className: string;
}) {
  const content = (
    <>
      {action.label}
      <span aria-hidden="true">{" ›"}</span>
    </>
  );
  const base = cn(
    "shrink-0 cursor-pointer rounded-xs text-subhead font-semibold whitespace-nowrap no-underline hover:opacity-75",
    className,
  );
  return action.href ? (
    <a href={action.href} onClick={action.onClick} className={base}>
      {content}
    </a>
  ) : (
    <button type="button" onClick={action.onClick} className={base}>
      {content}
    </button>
  );
}

export function Banner({
  level,
  title,
  children,
  action,
  className,
}: BannerProps) {
  const tone = STATUS_TONE[level];
  return (
    <div
      role={level === "awas" ? "alert" : "status"}
      className={cn(
        "flex items-start gap-3 rounded-md px-[18px] py-4",
        tone.bg,
        className,
      )}
    >
      <Icon icon={STATUS_ICON[level]} className={cn("mt-px", tone.fg)} />
      <div className="flex min-w-0 flex-1 flex-col gap-0.5">
        <p className="text-subhead font-semibold text-label">{title}</p>
        {children && (
          <div className="text-callout text-label-secondary">{children}</div>
        )}
      </div>
      {action && <ActionLink action={action} className={tone.fg} />}
    </div>
  );
}

export interface NoticeProps {
  children: ReactNode;
  action?: BannerAction;
  onDismiss?: () => void;
  dismissLabel?: string;
  icon?: ReactNode;
  className?: string;
}

export function Notice({
  children,
  action,
  onDismiss,
  dismissLabel = "Tutup",
  icon,
  className,
}: NoticeProps) {
  return (
    <div
      role="status"
      className={cn(
        "flex items-center gap-3 rounded-[16px] bg-inverse py-3 pr-2 pl-4 text-on-inverse",
        className,
      )}
    >
      {icon}
      <p className="flex-1 text-subhead">{children}</p>
      {action && <ActionLink action={action} className="underline" />}
      {onDismiss && (
        <IconButton
          icon={X}
          label={dismissLabel}
          size="xs"
          variant="plain"
          tooltip={false}
          onClick={onDismiss}
          className="text-on-inverse"
        />
      )}
    </div>
  );
}
