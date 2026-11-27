import { useState } from "react";
import { Calendar, ChevronLeft, ChevronRight } from "lucide-react";
import { Popover } from "radix-ui";
import { cn } from "../../lib/cn";
import {
  MONTHS,
  WEEKDAYS,
  formatRange,
  isoDay,
  monthCells,
  orderRange,
  parseDay,
  presetRange,
  rangeLength,
  type DateRange,
  type RangePreset,
} from "../../lib/date-range";
import type { Lang } from "../../lib/format";
import { Button } from "../button/Button";
import { FieldShell } from "../field/FieldShell";
import { fieldBox } from "../field/field-styles";
import { Icon } from "../icon/Icon";

const TEXT = {
  id: {
    presets: {
      last7: "7 hari terakhir",
      last30: "30 hari terakhir",
      thisMonth: "Bulan ini",
    },
    days: (n: number) => `${n} hari`,
    picked: (n: number) => `${n} hari dipilih`,
    pickEnd: "Pilih tanggal selesai",
    prev: "Bulan sebelumnya",
    next: "Bulan berikutnya",
    today: "hari ini",
    cancel: "Batal",
    apply: "Terapkan",
    dialog: "Pilih periode",
  },
  en: {
    presets: {
      last7: "Last 7 days",
      last30: "Last 30 days",
      thisMonth: "This month",
    },
    days: (n: number) => `${n} ${n === 1 ? "day" : "days"}`,
    picked: (n: number) => `${n} ${n === 1 ? "day" : "days"} selected`,
    pickEnd: "Pick an end date",
    prev: "Previous month",
    next: "Next month",
    today: "today",
    cancel: "Cancel",
    apply: "Apply",
    dialog: "Choose a period",
  },
} as const;

const PRESETS: readonly RangePreset[] = ["last7", "last30", "thisMonth"];

interface Draft {
  start: string;
  end: string | null;
}

export interface DateRangePickerProps {
  label: string;
  value: DateRange;
  onChange: (range: DateRange) => void;
  max?: string;
  lang?: Lang;
  hint?: string;
  className?: string;
}

export function DateRangePicker({
  label,
  value,
  onChange,
  max = isoDay(new Date()),
  lang = "id",
  hint,
  className,
}: DateRangePickerProps) {
  const t = TEXT[lang];
  const [open, setOpen] = useState(false);
  const [draft, setDraft] = useState<Draft>(value);
  const [hover, setHover] = useState<string | null>(null);
  const [preset, setPreset] = useState<RangePreset | null>(null);
  const [view, setView] = useState(() => parseDay(value.end));

  const year = view.getFullYear();
  const month = view.getMonth();
  const nextDisabled = isoDay(new Date(year, month + 1, 1)) > max;
  const done = draft.end !== null;
  const shown = orderRange(draft.start, draft.end ?? hover ?? draft.start);
  const preview = !done && hover !== null;

  const openChange = (next: boolean) => {
    if (next) {
      setDraft(value);
      setPreset(null);
      setHover(null);
      setView(parseDay(value.end));
    }
    setOpen(next);
  };

  const pick = (day: string) => {
    setPreset(null);
    setHover(null);
    setDraft((d) =>
      d.end !== null ? { start: day, end: null } : orderRange(d.start, day),
    );
  };

  const choosePreset = (p: RangePreset) => {
    setPreset(p);
    setHover(null);
    setDraft(presetRange(p, max));
    setView(parseDay(max));
  };

  const apply = () => {
    if (draft.end === null) return;
    onChange({ start: draft.start, end: draft.end });
    setOpen(false);
  };

  const cells = monthCells(year, month);

  return (
    <FieldShell label={label} message={hint} className={className}>
      {({ id, describedBy }) => (
        <Popover.Root open={open} onOpenChange={openChange}>
          <Popover.Trigger asChild>
            <button
              id={id}
              type="button"
              aria-describedby={describedBy}
              className={cn(
                fieldBox(),
                "press h-12 cursor-pointer pr-2 text-left text-label-secondary",
                open &&
                  "bg-surface shadow-[0_0_0_1.5px_var(--tint),0_0_0_5px_var(--tint-fill)]",
              )}
            >
              <Icon icon={Calendar} />
              <span className="flex-1 truncate text-body font-medium text-label">
                {formatRange(value, lang)}
              </span>
              <span className="inline-flex h-7 items-center rounded-full bg-tint-fill px-2.5 text-footnote font-semibold text-tint">
                {t.days(rangeLength(value))}
              </span>
            </button>
          </Popover.Trigger>
          <Popover.Portal>
            <Popover.Content
              aria-label={t.dialog}
              align="start"
              sideOffset={8}
              collisionPadding={8}
              className="z-50 flex w-[360px] max-w-[calc(100vw-16px)] flex-col gap-3.5 rounded-[22px] bg-raised p-4 shadow-3"
            >
              <div className="flex flex-wrap gap-1.5">
                {PRESETS.map((p) => (
                  <button
                    key={p}
                    type="button"
                    aria-pressed={preset === p}
                    onClick={() => choosePreset(p)}
                    className="press h-8 cursor-pointer rounded-full bg-fill px-3 text-footnote font-semibold text-label aria-pressed:bg-filled aria-pressed:text-white"
                  >
                    {t.presets[p]}
                  </button>
                ))}
              </div>

              <div className="flex items-center justify-between">
                <button
                  type="button"
                  aria-label={t.prev}
                  onClick={() => setView(new Date(year, month - 1, 1))}
                  className="press grid size-9 cursor-pointer place-items-center rounded-sm bg-fill-secondary"
                >
                  <Icon icon={ChevronLeft} size={16} />
                </button>
                <span
                  aria-live="polite"
                  className="font-display text-headline font-bold"
                >
                  {MONTHS[lang][month]} {year}
                </span>
                <button
                  type="button"
                  aria-label={t.next}
                  disabled={nextDisabled}
                  onClick={() => setView(new Date(year, month + 1, 1))}
                  className="press grid size-9 cursor-pointer place-items-center rounded-sm bg-fill-secondary disabled:cursor-default disabled:bg-transparent disabled:text-label/25"
                >
                  <Icon icon={ChevronRight} size={16} />
                </button>
              </div>

              <div
                className="grid grid-cols-7 gap-y-1"
                onMouseLeave={() => setHover(null)}
              >
                {WEEKDAYS[lang].map((w) => (
                  <span
                    key={w}
                    className="pb-1 text-center text-caption font-semibold text-label-tertiary"
                  >
                    {w}
                  </span>
                ))}
                {cells.map((day, i) => {
                  if (!day) return <span key={`lead-${i}`} />;
                  const date = parseDay(day);
                  const col = i % 7;
                  const disabled = day > max;
                  const isStart = day === shown.start;
                  const isEnd = day === shown.end;
                  const inRange = day >= shown.start && day <= shown.end;
                  const single = shown.start === shown.end;
                  const isToday = day === max;
                  const firstInRow = col === 0 || date.getDate() === 1;
                  const lastInRow = col === 6 || i === cells.length - 1;
                  const confirmedEnd =
                    (isStart || isEnd) && !(preview && day === hover);
                  return (
                    <div
                      key={day}
                      className="relative grid h-10 place-items-center"
                    >
                      {inRange && !single && (
                        <span
                          aria-hidden="true"
                          className={cn(
                            "absolute inset-y-0",
                            isStart
                              ? "right-0 left-1/2"
                              : isEnd
                                ? "right-1/2 left-0"
                                : "inset-x-0",
                            preview ? "bg-tint/7" : "bg-tint-fill",
                            firstInRow && !isStart && "rounded-l-sm",
                            lastInRow && !isEnd && "rounded-r-sm",
                          )}
                        />
                      )}
                      <button
                        type="button"
                        disabled={disabled}
                        aria-pressed={isStart || isEnd}
                        aria-label={`${date.getDate()} ${MONTHS[lang][month]} ${year}${isToday ? `, ${t.today}` : ""}`}
                        onClick={() => pick(day)}
                        onMouseEnter={() => !done && !disabled && setHover(day)}
                        className={cn(
                          "relative size-10 cursor-pointer rounded-sm text-callout tabular-nums transition-colors",
                          disabled && "cursor-default text-label/25",
                          !disabled &&
                            !(isStart || isEnd) &&
                            "hover:bg-fill-secondary",
                          isToday &&
                            !(isStart || isEnd) &&
                            "font-bold text-tint inset-ring-[1.5px] inset-ring-tint",
                          (isStart || isEnd) &&
                            (confirmedEnd
                              ? "bg-filled font-semibold text-white"
                              : "bg-fill font-semibold"),
                        )}
                      >
                        {date.getDate()}
                      </button>
                    </div>
                  );
                })}
              </div>

              <div className="flex items-center gap-2.5 border-t border-separator pt-3">
                <div className="flex min-w-0 flex-1 flex-col">
                  <span className="truncate text-subhead font-semibold">
                    {done
                      ? formatRange(shown, lang)
                      : `${formatRange({ start: draft.start, end: draft.start }, lang)} – …`}
                  </span>
                  <span className="text-footnote text-label-secondary">
                    {done ? t.picked(rangeLength(shown)) : t.pickEnd}
                  </span>
                </div>
                <Popover.Close asChild>
                  <Button size="s">{t.cancel}</Button>
                </Popover.Close>
                <Button
                  size="s"
                  variant="filled"
                  disabled={!done}
                  onClick={apply}
                >
                  {t.apply}
                </Button>
              </div>
            </Popover.Content>
          </Popover.Portal>
        </Popover.Root>
      )}
    </FieldShell>
  );
}
