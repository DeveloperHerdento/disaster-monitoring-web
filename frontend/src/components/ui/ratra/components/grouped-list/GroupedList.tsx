import { useId, type ReactNode } from "react";
import { cn } from "../../lib/cn";

export interface GroupedListProps {
  title?: string;
  footer?: ReactNode;
  className?: string;
  children: ReactNode;
}

export function GroupedList({
  title,
  footer,
  className,
  children,
}: GroupedListProps) {
  const titleId = useId();
  return (
    <section
      aria-labelledby={title ? titleId : undefined}
      className={className}
    >
      {title && (
        <p
          id={titleId}
          className="px-4 pb-1.5 text-footnote font-semibold text-label-secondary"
        >
          {title}
        </p>
      )}
      <div className="overflow-hidden rounded-md bg-surface">{children}</div>
      {footer && (
        <p className="px-4 pt-1.5 text-footnote text-label-secondary">
          {footer}
        </p>
      )}
    </section>
  );
}

export interface ListRowProps {
  className?: string;
  children: ReactNode;
}

export function ListRow({ className, children }: ListRowProps) {
  return (
    <div
      className={cn(
        "relative flex min-h-[52px] items-center gap-3 px-4 py-3 hover:bg-fill-secondary",
        "after:absolute after:right-0 after:bottom-0 after:left-4 after:h-px after:bg-separator last:after:hidden",
        className,
      )}
    >
      {children}
    </div>
  );
}
