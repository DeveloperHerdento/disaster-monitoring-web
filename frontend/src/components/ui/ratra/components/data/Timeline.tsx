import type { ReactNode } from "react";
import { ChevronDown } from "lucide-react";
import { Accordion } from "radix-ui";
import { cn } from "../../lib/cn";
import type { StatusLevel } from "../../lib/status";
import { Icon } from "../icon/Icon";
import { StatusIcon } from "../status/StatusPill";

export interface TimelineEntry {
  id: string;
  time: string;
  label: ReactNode;
  level?: StatusLevel;
}

export interface TimelineProps {
  items: readonly TimelineEntry[];
  className?: string;
}

export function Timeline({ items, className }: TimelineProps) {
  return (
    <ol className={cn("flex flex-col", className)}>
      {items.map((item, i) => (
        <li
          key={item.id}
          className="grid grid-cols-[56px_20px_1fr] items-start gap-3"
        >
          <span className="pt-0.5 text-footnote text-label-secondary tabular-nums">
            {item.time}
          </span>
          <span className="flex h-full flex-col items-center">
            {item.level ? (
              <StatusIcon level={item.level} size={20} />
            ) : (
              <span className="mt-1.5 size-2 rounded-full bg-tint" />
            )}
            {i < items.length - 1 && (
              <span
                aria-hidden="true"
                className="mt-1 min-h-[22px] w-[1.5px] flex-1 bg-label/12"
              />
            )}
          </span>
          <p className="pb-3.5 text-subhead">{item.label}</p>
        </li>
      ))}
    </ol>
  );
}

export interface DisclosureItem {
  id: string;
  title: string;
  content: ReactNode;
}

export interface DisclosureProps {
  items: readonly DisclosureItem[];
  defaultOpen?: string[];
  className?: string;
}

export function Disclosure({ items, defaultOpen, className }: DisclosureProps) {
  return (
    <Accordion.Root
      type="multiple"
      defaultValue={defaultOpen}
      className={cn("overflow-hidden rounded-md bg-surface", className)}
    >
      {items.map((item) => (
        <Accordion.Item
          key={item.id}
          value={item.id}
          className="relative after:absolute after:right-0 after:bottom-0 after:left-4 after:h-px after:bg-separator last:after:hidden"
        >
          <Accordion.Header className="m-0">
            <Accordion.Trigger className="group flex w-full cursor-pointer items-center gap-3 px-4 py-3.5 text-left text-body hover:bg-fill-secondary">
              <span className="flex-1">{item.title}</span>
              <Icon
                icon={ChevronDown}
                className="text-label-tertiary transition-transform duration-[240ms] group-data-[state=open]:rotate-180"
              />
            </Accordion.Trigger>
          </Accordion.Header>
          <Accordion.Content className="overflow-hidden data-[state=closed]:animate-disclosure-close data-[state=open]:animate-disclosure-open">
            <div className="px-4 pb-4 text-callout text-label-secondary">
              {item.content}
            </div>
          </Accordion.Content>
        </Accordion.Item>
      ))}
    </Accordion.Root>
  );
}
