import { useId, type ComponentProps, type ReactNode } from "react";
import { Switch as SwitchPrimitive } from "radix-ui";
import { cn } from "../../lib/cn";
import { ChoiceLabel } from "./ChoiceLabel";

export interface SwitchProps extends Omit<
  ComponentProps<typeof SwitchPrimitive.Root>,
  "children"
> {
  label: string;
  description?: ReactNode;
  hideLabel?: boolean;
}

export function Switch({
  label,
  description,
  hideLabel = false,
  id,
  disabled,
  className,
  ...rest
}: SwitchProps) {
  const autoId = useId();
  const switchId = id ?? autoId;
  const control = (
    <SwitchPrimitive.Root
      id={switchId}
      aria-label={hideLabel ? label : undefined}
      disabled={disabled}
      className={cn(
        "relative inline-flex h-8 w-[52px] shrink-0 cursor-pointer rounded-full bg-label/15 p-0.5 transition-colors duration-200",
        "data-[state=checked]:bg-status-normal disabled:cursor-not-allowed disabled:opacity-50",
        hideLabel && className,
      )}
      {...rest}
    >
      <SwitchPrimitive.Thumb className="block size-7 rounded-full bg-white shadow-1 transition-transform duration-200 data-[state=checked]:translate-x-5" />
    </SwitchPrimitive.Root>
  );
  if (hideLabel) return control;
  return (
    <div className={cn("flex flex-1 items-center gap-3", className)}>
      <ChoiceLabel
        htmlFor={switchId}
        label={label}
        description={description}
        disabled={disabled}
      />
      {control}
    </div>
  );
}
