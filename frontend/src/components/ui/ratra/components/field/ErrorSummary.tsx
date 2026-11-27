import type { Ref } from "react";
import { CircleAlert } from "lucide-react";
import { cn } from "../../lib/cn";
import { Icon } from "../icon/Icon";

export interface FieldError {
  fieldId: string;
  message: string;
}

export interface ErrorSummaryProps {
  title: string;
  errors: readonly FieldError[];
  ref?: Ref<HTMLDivElement>;
  className?: string;
}

export function ErrorSummary({
  title,
  errors,
  ref,
  className,
}: ErrorSummaryProps) {
  if (errors.length === 0) return null;
  return (
    <div
      ref={ref}
      role="alert"
      tabIndex={-1}
      className={cn(
        "flex gap-3 rounded-[16px] bg-danger-fill px-4 py-3.5 text-danger",
        className,
      )}
    >
      <Icon icon={CircleAlert} />
      <div className="flex flex-col gap-1">
        <p className="text-subhead font-semibold">{title}</p>
        <ul className="flex flex-col gap-1">
          {errors.map((e) => (
            <li key={e.fieldId}>
              <a
                href={`#${e.fieldId}`}
                onClick={(ev) => {
                  const field = document.getElementById(e.fieldId);
                  if (!field) return;
                  ev.preventDefault();
                  field.focus();
                }}
                className="rounded-xs text-callout text-danger underline underline-offset-2"
              >
                {e.message}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
