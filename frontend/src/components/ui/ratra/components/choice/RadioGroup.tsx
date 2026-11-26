import { useId, type ReactNode } from "react";
import { Check } from "lucide-react";
import { RadioGroup as RadioPrimitive } from "radix-ui";
import { ListRow } from "../grouped-list/GroupedList";
import { ChoiceLabel } from "./ChoiceLabel";

export interface RadioOption<T extends string> {
  value: T;
  label: string;
  description?: ReactNode;
  disabled?: boolean;
}

export interface RadioGroupProps<T extends string> {
  label: string;
  options: readonly RadioOption<T>[];
  value: T;
  onChange: (value: T) => void;
}

export function RadioGroup<T extends string>({
  label,
  options,
  value,
  onChange,
}: RadioGroupProps<T>) {
  const baseId = useId();
  return (
    <RadioPrimitive.Root
      aria-label={label}
      value={value}
      onValueChange={(next) => onChange(next as T)}
    >
      {options.map((o) => {
        const id = `${baseId}-${o.value}`;
        return (
          <ListRow key={o.value}>
            <ChoiceLabel
              htmlFor={id}
              label={o.label}
              description={o.description}
              disabled={o.disabled}
            />
            <RadioPrimitive.Item
              id={id}
              value={o.value}
              disabled={o.disabled}
              className="grid size-6 shrink-0 cursor-pointer place-items-center rounded-full text-tint disabled:cursor-not-allowed"
            >
              <RadioPrimitive.Indicator>
                <Check size={18} strokeWidth={2.25} aria-hidden="true" />
              </RadioPrimitive.Indicator>
            </RadioPrimitive.Item>
          </ListRow>
        );
      })}
    </RadioPrimitive.Root>
  );
}
