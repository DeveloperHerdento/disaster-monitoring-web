import { createElement, useId } from "react";
import rGlyph from "../../assets/ratra-r-white.png";
import { PLATFORM_TILES } from "../../foundations/platform-tiles";
import { PLATFORMS, type Platform } from "../../lib/platform";

const SQUIRCLE =
  "M 2 23 Q 2 2 23 2 L 77 2 Q 98 2 98 23 L 98 77 Q 98 98 77 98 L 23 98 Q 2 98 2 77 Z";

export interface PlatformTileProps {
  platform: Platform;
  size?: number;
  decorative?: boolean;
  className?: string;
}

export function PlatformTile({
  platform,
  size = 28,
  decorative = false,
  className,
}: PlatformTileProps) {
  const id = useId();
  const art = PLATFORM_TILES[platform];
  const [x1, y1, x2, y2] = art.direction;
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      role={decorative ? undefined : "img"}
      aria-label={decorative ? undefined : `RATRA ${PLATFORMS[platform].name}`}
      aria-hidden={decorative ? true : undefined}
      className={className}
      style={{ flex: "none" }}
    >
      <defs>
        <clipPath id={`${id}c`}>
          <path d={SQUIRCLE} />
        </clipPath>
        <linearGradient id={`${id}b`} x1={x1} y1={y1} x2={x2} y2={y2}>
          <stop offset="0" stopColor={art.from} />
          <stop offset="1" stopColor={art.to} />
        </linearGradient>
        <radialGradient id={`${id}g`} cx="50%" cy="50%" r="34%">
          <stop offset="0" stopColor={art.from} stopOpacity=".95" />
          <stop offset=".6" stopColor={art.from} stopOpacity=".6" />
          <stop offset="1" stopColor={art.from} stopOpacity="0" />
        </radialGradient>
      </defs>
      <path d={SQUIRCLE} fill={`url(#${id}b)`} />
      <g clipPath={`url(#${id}c)`}>
        {art.motif.map(([tag, attrs], i) =>
          createElement(tag, { key: i, ...attrs }),
        )}
        <rect width="100" height="100" fill={`url(#${id}g)`} />
      </g>
      <image
        href={rGlyph}
        x="25.16"
        y="23"
        width="49.68"
        height="54"
        preserveAspectRatio="xMidYMid meet"
      />
    </svg>
  );
}
