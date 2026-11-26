import type { ReactNode } from "react";
import { Eye, EyeOff, Minus, Plus, type LucideIcon } from "lucide-react";
import { cn } from "../../lib/cn";
import { Icon } from "../icon/Icon";

export interface MapToolbarProps {
  label: string;
  children: ReactNode;
  className?: string;
}

export function MapToolbar({ label, children, className }: MapToolbarProps) {
  return (
    <div
      role="toolbar"
      aria-label={label}
      className={cn(
        "glass-float flex max-w-full items-center gap-1.5 overflow-x-auto rounded-full p-[5px] *:shrink-0",
        className,
      )}
    >
      {children}
    </div>
  );
}

export function ToolbarDivider() {
  return (
    <span
      aria-hidden="true"
      className="mx-0.5 h-[22px] w-px shrink-0 bg-separator"
    />
  );
}

export interface MapControlsProps {
  onZoomIn: () => void;
  onZoomOut: () => void;
  labels?: { group: string; zoomIn: string; zoomOut: string };
  className?: string;
}

const CONTROL =
  "press grid size-10 cursor-pointer place-items-center rounded-full text-label hover:bg-fill";

export function MapControls({
  onZoomIn,
  onZoomOut,
  labels = { group: "Kontrol peta", zoomIn: "Perbesar", zoomOut: "Perkecil" },
  className,
}: MapControlsProps) {
  return (
    <div
      role="group"
      aria-label={labels.group}
      className={cn("glass-float flex flex-col rounded-full", className)}
    >
      <button
        type="button"
        aria-label={labels.zoomIn}
        onClick={onZoomIn}
        className={CONTROL}
      >
        <Icon icon={Plus} />
      </button>
      <span aria-hidden="true" className="mx-2.5 h-px bg-separator" />
      <button
        type="button"
        aria-label={labels.zoomOut}
        onClick={onZoomOut}
        className={CONTROL}
      >
        <Icon icon={Minus} />
      </button>
    </div>
  );
}

export interface MapMarkerProps {
  label: string;
  color?: string;
  onClick?: () => void;
  className?: string;
}

export function MapMarker({
  label,
  color = "var(--signal)",
  onClick,
  className,
}: MapMarkerProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn("group relative block cursor-pointer", className)}
    >
      <span
        aria-hidden="true"
        className="absolute -top-[11px] -left-[11px] size-[22px] rounded-full shadow-marker"
        style={{ background: color }}
      />
      <span
        className={cn(
          "glass-float absolute -top-4 left-5 rounded-full px-3 py-1.5 text-footnote font-semibold whitespace-nowrap text-label",
        )}
      >
        {label}
      </span>
    </button>
  );
}

export interface LegendProps {
  title: string;
  ramp?: readonly string[];
  ticks?: readonly string[];
  classes?: readonly { color: string; label: string }[];
  className?: string;
}

export function Legend({
  title,
  ramp,
  ticks,
  classes,
  className,
}: LegendProps) {
  return (
    <figure
      className={cn(
        "glass-float m-0 flex w-[260px] max-w-full flex-col gap-2 rounded-md px-3.5 py-3",
        className,
      )}
    >
      <figcaption className="text-footnote font-semibold">{title}</figcaption>
      {ramp && (
        <span
          aria-hidden="true"
          className="h-2 rounded-full"
          style={{ background: `linear-gradient(90deg, ${ramp.join(", ")})` }}
        />
      )}
      {ticks && (
        <span className="flex justify-between text-caption font-normal text-label-secondary tabular-nums">
          {ticks.map((t) => (
            <span key={t}>{t}</span>
          ))}
        </span>
      )}
      {classes && (
        <ul className="flex flex-col gap-1.5">
          {classes.map((c) => (
            <li key={c.label} className="flex items-center gap-2 text-footnote">
              <span
                aria-hidden="true"
                className="size-3 shrink-0 rounded-[4px]"
                style={{ background: c.color }}
              />
              {c.label}
            </li>
          ))}
        </ul>
      )}
    </figure>
  );
}

export interface MapLayer {
  id: string;
  label: string;
  icon?: LucideIcon;
  visible: boolean;
}

export interface LayerListProps {
  label: string;
  layers: readonly MapLayer[];
  onToggle: (id: string) => void;
  className?: string;
}

export function LayerList({
  label,
  layers,
  onToggle,
  className,
}: LayerListProps) {
  return (
    <div
      role="group"
      aria-label={label}
      className={cn(
        "material w-[260px] max-w-full flex flex-col gap-0.5 rounded-[22px] p-2 shadow-3",
        className,
      )}
    >
      {layers.map((l) => (
        <button
          key={l.id}
          type="button"
          aria-pressed={l.visible}
          onClick={() => onToggle(l.id)}
          className="flex w-full cursor-pointer items-center gap-2.5 rounded-[14px] px-3 py-2.5 text-left text-subhead hover:bg-fill"
        >
          {l.icon && <Icon icon={l.icon} className="text-label-secondary" />}
          <span className={cn("flex-1", !l.visible && "text-label-secondary")}>
            {l.label}
          </span>
          <Icon
            icon={l.visible ? Eye : EyeOff}
            className={l.visible ? "text-tint" : "text-label-tertiary"}
          />
        </button>
      ))}
    </div>
  );
}
