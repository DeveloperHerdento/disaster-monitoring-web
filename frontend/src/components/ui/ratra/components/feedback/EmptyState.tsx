import type { ReactNode } from "react";
import { cn } from "../../lib/cn";

export interface EmptyStateProps {
  title: string;
  description?: ReactNode;
  visual?: ReactNode;
  actions?: ReactNode;
  tone?: "neutral" | "error";
  className?: string;
}

export function EmptyState({
  title,
  description,
  visual,
  actions,
  tone = "neutral",
  className,
}: EmptyStateProps) {
  return (
    <div
      role={tone === "error" ? "alert" : undefined}
      className={cn(
        "flex flex-col items-center gap-3 py-5 text-center",
        className,
      )}
    >
      {visual && (
        <div className={tone === "error" ? "text-danger" : "text-tint"}>
          {visual}
        </div>
      )}
      <p className="text-headline">{title}</p>
      {description && (
        <p className="max-w-80 text-callout text-label-secondary">
          {description}
        </p>
      )}
      {actions && (
        <div className="mt-1.5 flex flex-wrap justify-center gap-2.5">
          {actions}
        </div>
      )}
    </div>
  );
}
