import type { ReactNode } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "../../lib/cn";
import { Icon } from "../icon/Icon";

export type SortDirection = "asc" | "desc";

export interface SortState<K extends string> {
  key: K;
  direction: SortDirection;
}

export interface Column<T, K extends string = string> {
  key: K;
  header: string;
  cell: (row: T) => ReactNode;
  align?: "start" | "end";
  sortable?: boolean;
  width?: string;
  emphasis?: boolean;
}

export interface DataTableProps<T, K extends string = string> {
  label: string;
  columns: readonly Column<T, K>[];
  rows: readonly T[];
  rowKey: (row: T) => string;
  sort?: SortState<K>;
  onSortChange?: (sort: SortState<K>) => void;
  toolbar?: ReactNode;
  footer?: ReactNode;
  empty?: ReactNode;
  className?: string;
}

export function DataTable<T, K extends string = string>({
  label,
  columns,
  rows,
  rowKey,
  sort,
  onSortChange,
  toolbar,
  footer,
  empty,
  className,
}: DataTableProps<T, K>) {
  const toggle = (key: K) =>
    onSortChange?.({
      key,
      direction: sort?.key === key && sort.direction === "asc" ? "desc" : "asc",
    });

  return (
    <div className={cn("overflow-hidden rounded-lg bg-surface", className)}>
      {toolbar && (
        <div className="flex flex-wrap items-center gap-3 p-4">{toolbar}</div>
      )}
      <div className="overflow-x-auto">
        <table aria-label={label} className="w-full border-collapse">
          <thead className="bg-page">
            <tr>
              {columns.map((c) => {
                const active = sort?.key === c.key;
                const end = c.align === "end";
                return (
                  <th
                    key={c.key}
                    scope="col"
                    aria-sort={
                      active
                        ? sort.direction === "asc"
                          ? "ascending"
                          : "descending"
                        : undefined
                    }
                    style={c.width ? { width: c.width } : undefined}
                    className={cn(
                      "p-0 text-footnote font-semibold whitespace-nowrap",
                      end ? "text-right" : "text-left",
                      active ? "text-label" : "text-label-secondary",
                    )}
                  >
                    {c.sortable && onSortChange ? (
                      <button
                        type="button"
                        onClick={() => toggle(c.key)}
                        className={cn(
                          "inline-flex cursor-pointer items-center gap-1 px-4 py-2.5",
                          end && "flex-row-reverse",
                        )}
                      >
                        {c.header}
                        <Icon
                          icon={ChevronDown}
                          size={16}
                          className={cn(
                            "transition-transform duration-150",
                            active ? "opacity-100" : "opacity-0",
                            active && sort.direction === "asc" && "rotate-180",
                          )}
                        />
                      </button>
                    ) : (
                      <span className="inline-block px-4 py-2.5">
                        {c.header}
                      </span>
                    )}
                  </th>
                );
              })}
            </tr>
          </thead>
          <tbody>
            {rows.length === 0 && empty && (
              <tr>
                <td colSpan={columns.length} className="p-6">
                  {empty}
                </td>
              </tr>
            )}
            {rows.map((row) => (
              <tr
                key={rowKey(row)}
                className="bg-[linear-gradient(var(--separator),var(--separator))] bg-[length:calc(100%-16px)_1px] bg-[position:right_bottom] bg-no-repeat hover:bg-fill-secondary"
              >
                {columns.map((c) => (
                  <td
                    key={c.key}
                    className={cn(
                      "px-4 py-3 text-subhead",
                      c.align === "end"
                        ? "text-right tabular-nums"
                        : "text-left",
                      c.emphasis
                        ? "font-semibold text-label"
                        : "text-label-secondary",
                    )}
                  >
                    {c.cell(row)}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {footer && <div className="px-4 py-3">{footer}</div>}
    </div>
  );
}
