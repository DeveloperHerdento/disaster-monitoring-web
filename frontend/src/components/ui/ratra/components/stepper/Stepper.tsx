import { useId } from "react";
import { Minus, Plus } from "lucide-react";
import { cn } from "../../lib/cn";
import { Icon } from "../icon/Icon";

export interface StepperProps {
  label: string;
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
  step?: number;
  labels?: { decrease: string; increase: string };
  className?: string;
}

const STEP_BUTTON =
  "press grid h-8 w-11 cursor-pointer place-items-center rounded-full text-label disabled:cursor-not-allowed disabled:text-label-tertiary";

export function Stepper({
  label,
  value,
  onChange,
  min = 0,
  max = Number.POSITIVE_INFINITY,
  step = 1,
  labels = { decrease: "Kurangi", increase: "Tambah" },
  className,
}: StepperProps) {
  const labelId = useId();
  return (
    <div className={cn("flex flex-1 items-center gap-3", className)}>
      <span id={labelId} className="flex-1 text-body">
        {label}
      </span>
      <output
        aria-labelledby={labelId}
        aria-live="polite"
        className="min-w-6 text-right text-body tabular-nums"
      >
        {value}
      </output>
      <span
        role="group"
        aria-labelledby={labelId}
        className="inline-flex items-center rounded-full bg-fill"
      >
        <button
          type="button"
          aria-label={labels.decrease}
          disabled={value <= min}
          onClick={() => onChange(Math.max(min, value - step))}
          className={STEP_BUTTON}
        >
          <Icon icon={Minus} size={16} />
        </button>
        <span aria-hidden="true" className="h-[18px] w-px bg-separator" />
        <button
          type="button"
          aria-label={labels.increase}
          disabled={value >= max}
          onClick={() => onChange(Math.min(max, value + step))}
          className={STEP_BUTTON}
        >
          <Icon icon={Plus} size={16} />
        </button>
      </span>
    </div>
  );
}
