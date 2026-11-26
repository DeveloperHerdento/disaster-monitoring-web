import { useId, useState, type KeyboardEvent } from "react";
import { Search, type LucideIcon } from "lucide-react";
import { Dialog as DialogPrimitive } from "radix-ui";
import { cn } from "../../lib/cn";
import { Icon } from "../icon/Icon";

export interface CommandItem {
  id: string;
  label: string;
  detail?: string;
  icon?: LucideIcon;
}

export interface CommandGroup {
  label: string;
  items: readonly CommandItem[];
}

export interface CommandSearchProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  query: string;
  onQueryChange: (query: string) => void;
  groups: readonly CommandGroup[];
  onSelect: (id: string) => void;
  label?: string;
  placeholder?: string;
  empty?: string;
}

export function CommandSearch({
  open,
  onOpenChange,
  query,
  onQueryChange,
  groups,
  onSelect,
  label = "Cari semua",
  placeholder = "Cari area, lahan atau peringatan",
  empty = "Tidak ada hasil.",
}: CommandSearchProps) {
  const listId = useId();
  const items = groups.flatMap((g) => g.items);
  const [active, setActive] = useState(0);
  const current = items[Math.min(active, items.length - 1)];

  const choose = (id: string) => {
    onSelect(id);
    onOpenChange(false);
  };

  const onKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "ArrowDown" || e.key === "ArrowUp") {
      e.preventDefault();
      const step = e.key === "ArrowDown" ? 1 : -1;
      setActive((i) => (i + step + items.length) % Math.max(items.length, 1));
    } else if (e.key === "Enter" && current) {
      e.preventDefault();
      choose(current.id);
    }
  };

  return (
    <DialogPrimitive.Root open={open} onOpenChange={onOpenChange}>
      <DialogPrimitive.Portal>
        <DialogPrimitive.Overlay className="fixed inset-0 z-50 bg-scrim/50 transition-opacity duration-200 starting:opacity-0" />
        <DialogPrimitive.Content
          aria-describedby={undefined}
          className="material fixed top-10 left-1/2 z-50 flex max-h-[min(560px,calc(100dvh-80px))] w-[600px] max-w-[calc(100vw-24px)] -translate-x-1/2 flex-col rounded-lg p-2.5 shadow-3 transition-[opacity,scale] duration-200 starting:scale-95 starting:opacity-0"
        >
          <DialogPrimitive.Title className="sr-only">
            {label}
          </DialogPrimitive.Title>
          <div className="flex h-13 items-center gap-2.5 px-3">
            <Icon icon={Search} className="text-label-tertiary" />
            <input
              role="combobox"
              aria-expanded="true"
              aria-controls={listId}
              aria-activedescendant={
                current ? `${listId}-${current.id}` : undefined
              }
              aria-label={label}
              autoComplete="off"
              value={query}
              placeholder={placeholder}
              onChange={(e) => {
                onQueryChange(e.target.value);
                setActive(0);
              }}
              onKeyDown={onKeyDown}
              className="min-w-0 flex-1 bg-transparent text-[20px] text-label outline-none placeholder:text-label-tertiary focus-visible:outline-none"
            />
            <kbd className="rounded-[8px] bg-fill px-2 py-0.5 font-sans text-footnote text-label-tertiary">
              esc
            </kbd>
          </div>
          <div className="mx-2 mb-1 h-px bg-separator" />
          <div
            id={listId}
            role="listbox"
            aria-label={label}
            className="overflow-y-auto"
          >
            {items.length === 0 && (
              <p className="px-3 py-6 text-center text-callout text-label-secondary">
                {empty}
              </p>
            )}
            {groups
              .filter((g) => g.items.length > 0)
              .map((g) => (
                <div
                  key={g.label}
                  role="group"
                  aria-label={g.label}
                  className="flex flex-col gap-0.5"
                >
                  <p
                    aria-hidden="true"
                    className="px-3 pt-2.5 pb-1 text-footnote font-semibold text-label-secondary"
                  >
                    {g.label}
                  </p>
                  {g.items.map((item) => {
                    const on = item.id === current?.id;
                    return (
                      <div
                        key={item.id}
                        id={`${listId}-${item.id}`}
                        role="option"
                        aria-selected={on}
                        onMouseMove={() => setActive(items.indexOf(item))}
                        onClick={() => choose(item.id)}
                        className={cn(
                          "flex cursor-pointer items-center gap-3 rounded-[16px] px-3 py-2.5",
                          on ? "bg-tint text-white" : "text-label",
                        )}
                      >
                        {item.icon && <Icon icon={item.icon} />}
                        <span className="flex-1 truncate text-subhead font-medium">
                          {item.label}
                        </span>
                        {item.detail && (
                          <span className="text-footnote opacity-70">
                            {item.detail}
                          </span>
                        )}
                        {on && (
                          <span aria-hidden="true" className="text-footnote">
                            ↵
                          </span>
                        )}
                      </div>
                    );
                  })}
                </div>
              ))}
          </div>
        </DialogPrimitive.Content>
      </DialogPrimitive.Portal>
    </DialogPrimitive.Root>
  );
}
