import { useId } from "react";
import { Slider as SliderPrimitive } from "radix-ui";
import { cn } from "../../lib/cn";

export interface SliderProps {
  label: string;
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
  step?: number;
  format?: (value: number) => string;
  disabled?: boolean;
  className?: string;
}

export function Slider({
  label,
  value,
  onChange,
  min = 0,
  max = 100,
  step = 1,
  format = String,
  disabled,
  className,
}: SliderProps) {
  const labelId = useId();
  const shown = format(value);
  return (
    <div className={cn("flex flex-1 flex-col gap-2.5 py-1", className)}>
      <div className="flex items-baseline justify-between gap-3">
        <span id={labelId} className="text-body">
          {label}
        </span>
        <span className="text-body text-label-secondary tabular-nums">
          {shown}
        </span>
      </div>
      <SliderPrimitive.Root
        value={[value]}
        onValueChange={([next]) => onChange(next)}
        min={min}
        max={max}
        step={step}
        disabled={disabled}
        className="relative flex h-7 touch-none items-center select-none data-disabled:opacity-50"
      >
        <SliderPrimitive.Track className="relative h-1.5 grow overflow-hidden rounded-full bg-separator">
          <SliderPrimitive.Range className="absolute h-full bg-tint" />
        </SliderPrimitive.Track>
        <SliderPrimitive.Thumb
          aria-labelledby={labelId}
          aria-valuetext={shown}
          className="block size-7 cursor-grab rounded-full bg-white shadow-2 active:cursor-grabbing"
        />
      </SliderPrimitive.Root>
    </div>
  );
}
