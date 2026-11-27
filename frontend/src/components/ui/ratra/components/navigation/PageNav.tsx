import { Fragment } from "react";
import {
  Check,
  ChevronLeft,
  ChevronRight,
  type LucideIcon,
} from "lucide-react";
import { cn } from "../../lib/cn";
import { formatNumber, type Lang } from "../../lib/format";
import { Icon } from "../icon/Icon";
import { IconButton } from "../icon-button/IconButton";

export interface ToggleChipOption<T extends string> {
  value: T;
  label: string;
  icon?: LucideIcon;
}

export interface ToggleChipsProps<T extends string> {
  label: string;
  options: readonly ToggleChipOption<T>[];
  value: readonly T[];
  onChange: (value: T[]) => void;
  className?: string;
}

export function ToggleChips<T extends string>({
  label,
  options,
  value,
  onChange,
  className,
}: ToggleChipsProps<T>) {
  const toggle = (v: T) =>
    onChange(value.includes(v) ? value.filter((x) => x !== v) : [...value, v]);
  return (
    <div
      role="group"
      aria-label={label}
      className={cn("flex flex-wrap gap-2", className)}
    >
      {options.map((o) => {
        const on = value.includes(o.value);
        return (
          <button
            key={o.value}
            type="button"
            aria-pressed={on}
            onClick={() => toggle(o.value)}
            className={cn(
              "press inline-flex h-[34px] cursor-pointer items-center gap-1.5 rounded-full px-3.5 text-subhead font-semibold transition-colors",
              on ? "bg-filled text-white" : "bg-fill text-label",
            )}
          >
            {on ? (
              <Icon icon={Check} size={16} />
            ) : (
              o.icon && <Icon icon={o.icon} size={16} />
            )}
            {o.label}
          </button>
        );
      })}
    </div>
  );
}

export interface Crumb {
  label: string;
  href?: string;
}

export interface BreadcrumbProps {
  items: readonly Crumb[];
  label?: string;
  className?: string;
}

export function Breadcrumb({
  items,
  label = "Jalur",
  className,
}: BreadcrumbProps) {
  return (
    <nav aria-label={label} className={className}>
      <ol className="flex flex-wrap items-center gap-1.5">
        {items.map((c, i) => {
          const last = i === items.length - 1;
          return (
            <Fragment key={`${c.label}-${i}`}>
              <li className="text-subhead">
                {last || !c.href ? (
                  <span
                    aria-current={last ? "page" : undefined}
                    className={cn(last && "font-semibold")}
                  >
                    {c.label}
                  </span>
                ) : (
                  <a
                    href={c.href}
                    className="rounded-xs text-link no-underline hover:opacity-75"
                  >
                    {c.label}
                  </a>
                )}
              </li>
              {!last && (
                <li aria-hidden="true" className="text-label-tertiary">
                  <Icon icon={ChevronRight} size={16} />
                </li>
              )}
            </Fragment>
          );
        })}
      </ol>
    </nav>
  );
}

export interface PaginationProps {
  from: number;
  to: number;
  total: number;
  onPrevious: () => void;
  onNext: () => void;
  lang?: Lang;
  className?: string;
}

const PAGE_TEXT = {
  id: { of: "dari", prev: "Halaman sebelumnya", next: "Halaman berikutnya" },
  en: { of: "of", prev: "Previous page", next: "Next page" },
} as const;

export function Pagination({
  from,
  to,
  total,
  onPrevious,
  onNext,
  lang = "id",
  className,
}: PaginationProps) {
  const t = PAGE_TEXT[lang];
  return (
    <div className={cn("flex items-center gap-3", className)}>
      <span
        aria-live="polite"
        className="text-subhead text-label-secondary tabular-nums"
      >
        {formatNumber(from, { lang })}–{formatNumber(to, { lang })} {t.of}{" "}
        {formatNumber(total, { lang })}
      </span>
      <span className="ml-auto flex gap-2">
        <IconButton
          icon={ChevronLeft}
          label={t.prev}
          size="s"
          disabled={from <= 1}
          onClick={onPrevious}
        />
        <IconButton
          icon={ChevronRight}
          label={t.next}
          size="s"
          disabled={to >= total}
          onClick={onNext}
        />
      </span>
    </div>
  );
}

export interface StepProgressProps {
  step: number;
  total: number;
  title: string;
  done?: string;
  lang?: Lang;
  className?: string;
}

export function StepProgress({
  step,
  total,
  title,
  done,
  lang = "id",
  className,
}: StepProgressProps) {
  const text =
    lang === "id"
      ? `Langkah ${step} dari ${total}`
      : `Step ${step} of ${total}`;
  return (
    <div className={cn("flex flex-col gap-2.5", className)}>
      <div className="flex justify-between gap-3">
        <p className="text-subhead font-semibold">
          {text} · {title}
        </p>
        {done && <p className="text-subhead text-label-secondary">{done}</p>}
      </div>
      <div
        role="progressbar"
        aria-label={title}
        aria-valuemin={1}
        aria-valuemax={total}
        aria-valuenow={step}
        aria-valuetext={text}
        className="grid gap-1.5"
        style={{ gridTemplateColumns: `repeat(${total}, minmax(0, 1fr))` }}
      >
        {Array.from({ length: total }, (_, i) => (
          <span
            key={i}
            className={cn(
              "h-1.5 rounded-full",
              i < step ? "bg-tint" : "bg-separator",
            )}
          />
        ))}
      </div>
    </div>
  );
}
