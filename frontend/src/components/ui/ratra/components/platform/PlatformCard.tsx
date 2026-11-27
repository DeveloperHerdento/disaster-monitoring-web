import type { ReactNode } from "react";
import { cn } from "../../lib/cn";
import type { Lang } from "../../lib/format";
import { PLATFORMS, type Platform } from "../../lib/platform";
import { PlatformTile } from "./PlatformTile";

export interface PlatformCardProps {
  platform: Platform;
  href: string;
  description?: ReactNode;
  actionLabel?: string;
  lang?: Lang;
  className?: string;
}

export function PlatformCard({
  platform,
  href,
  description,
  actionLabel = "Buka platform",
  lang = "id",
  className,
}: PlatformCardProps) {
  const p = PLATFORMS[platform];
  return (
    <a
      href={href}
      className={cn(
        "press group flex min-h-[208px] flex-col gap-4 rounded-lg bg-surface p-6 text-label no-underline transition-shadow hover:shadow-2",
        className,
      )}
    >
      <PlatformTile platform={platform} size={56} decorative />
      <span className="mt-auto flex flex-col gap-1">
        <span className="font-display text-title-3 font-bold">
          RATRA {p.name}
        </span>
        <span className="text-callout text-label-secondary">
          {description ?? (lang === "id" ? p.descId : p.descEn)}
        </span>
      </span>
      <span className="text-subhead font-semibold text-tint">
        {actionLabel}
        <span aria-hidden="true">{" ›"}</span>
      </span>
    </a>
  );
}
