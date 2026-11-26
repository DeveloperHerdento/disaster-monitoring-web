import {
  CircleCheck,
  CircleDashed,
  Info,
  OctagonAlert,
  TriangleAlert,
  createLucideIcon,
  type LucideIcon,
} from "lucide-react";
import type { StatusLevel } from "../../lib/status";

const DiamondAlert = createLucideIcon("diamond-alert", [
  [
    "path",
    {
      d: "M2.7 10.3a2.41 2.41 0 0 0 0 3.41l7.59 7.59a2.41 2.41 0 0 0 3.41 0l7.59-7.59a2.41 2.41 0 0 0 0-3.41l-7.59-7.59a2.41 2.41 0 0 0-3.41 0Z",
      key: "diamond",
    },
  ],
  ["path", { d: "M12 8v4", key: "stem" }],
  ["path", { d: "M12 16h.01", key: "dot" }],
]);

export const STATUS_ICON: Record<StatusLevel, LucideIcon> = {
  normal: CircleCheck,
  waspada: TriangleAlert,
  siaga: DiamondAlert,
  awas: OctagonAlert,
  info: Info,
  offline: CircleDashed,
};

export const STATUS_TONE: Record<
  StatusLevel,
  { bg: string; fg: string; icon: string }
> = {
  normal: {
    bg: "bg-status-normal-bg",
    fg: "text-status-normal-fg",
    icon: "text-status-normal",
  },
  waspada: {
    bg: "bg-status-waspada-bg",
    fg: "text-status-waspada-fg",
    icon: "text-status-waspada",
  },
  siaga: {
    bg: "bg-status-siaga-bg",
    fg: "text-status-siaga-fg",
    icon: "text-status-siaga",
  },
  awas: {
    bg: "bg-status-awas-bg",
    fg: "text-status-awas-fg",
    icon: "text-status-awas",
  },
  info: {
    bg: "bg-status-info-bg",
    fg: "text-status-info-fg",
    icon: "text-status-info",
  },
  offline: {
    bg: "bg-status-offline-bg",
    fg: "text-status-offline-fg",
    icon: "text-status-offline",
  },
};
