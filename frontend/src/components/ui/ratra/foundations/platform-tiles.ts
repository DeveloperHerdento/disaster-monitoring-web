// Micro-tile artwork copied verbatim from the design canvas (V3-20 platform chips). Brand artwork: colours are fixed in light and dark.
import type { Platform } from "../lib/platform";

export type TileShape = readonly [
  "path" | "circle" | "ellipse",
  Readonly<Record<string, string>>,
];

export interface TileArt {
  from: string;
  to: string;
  direction: readonly [number, number, number, number];
  motif: readonly TileShape[];
}

export const PLATFORM_TILES: Record<Platform, TileArt> = {
  aero: {
    from: "#0a214f",
    to: "#18437c",
    direction: [0, 0.5, 1, 0.5],
    motif: [
      [
        "path",
        {
          d: "M -5 22 Q 50 2 105 22",
          stroke: "#3B9BEF",
          strokeWidth: "7",
          strokeLinecap: "round",
          fill: "none",
          opacity: ".8",
        },
      ],
      [
        "path",
        {
          d: "M -5 80 Q 50 100 105 80",
          stroke: "#3B9BEF",
          strokeWidth: "7",
          strokeLinecap: "round",
          fill: "none",
          opacity: ".8",
        },
      ],
    ],
  },
  disaster: {
    from: "#0a214f",
    to: "#4a3945",
    direction: [1, 0, 0, 1],
    motif: [
      [
        "circle",
        { cx: "100", cy: "0", r: "34", fill: "#F0782A", opacity: ".85" },
      ],
      [
        "circle",
        {
          cx: "100",
          cy: "0",
          r: "50",
          stroke: "#F0782A",
          strokeWidth: "7",
          strokeLinecap: "round",
          fill: "none",
          opacity: ".5",
        },
      ],
      [
        "ellipse",
        {
          cx: "4",
          cy: "104",
          rx: "36",
          ry: "32",
          fill: "#F0782A",
          opacity: ".6",
        },
      ],
    ],
  },
  urban: {
    from: "#0a214f",
    to: "#2f3c7c",
    direction: [0, 0, 1, 1],
    motif: [
      [
        "path",
        {
          d: "M 0 30 L 100 30 M 0 70 L 100 70 M 30 0 L 30 100 M 70 0 L 70 100",
          stroke: "#8F80F0",
          strokeWidth: "6",
          opacity: ".7",
        },
      ],
    ],
  },
  agri: {
    from: "#0a214f",
    to: "#164a57",
    direction: [0, 1, 1, 0],
    motif: [
      [
        "path",
        {
          d: "M -10 40 L 40 -10 M -10 80 L 80 -10 M 20 110 L 110 20 M 60 110 L 110 60",
          stroke: "#36B36A",
          strokeWidth: "7",
          strokeLinecap: "round",
          fill: "none",
          opacity: ".7",
        },
      ],
    ],
  },
  survey: {
    from: "#0a214f",
    to: "#104d6e",
    direction: [1, 1, 0, 0],
    motif: [
      [
        "path",
        {
          d: "M 12 14 L 88 22 L 50 92 Z M 12 14 L 50 92",
          stroke: "#1FBFBF",
          strokeWidth: "6",
          strokeLinejoin: "round",
          fill: "none",
          opacity: ".75",
        },
      ],
      ["circle", { cx: "12", cy: "14", r: "7", fill: "#1FBFBF" }],
      ["circle", { cx: "88", cy: "22", r: "7", fill: "#1FBFBF" }],
      ["circle", { cx: "50", cy: "92", r: "7", fill: "#1FBFBF" }],
    ],
  },
  peat: {
    from: "#0a214f",
    to: "#4a4033",
    direction: [0, 0, 1, 1],
    motif: [
      [
        "path",
        {
          d: "M 75.1,62.0 L 74.2,63.6 L 73.0,64.9 L 71.8,66.1 L 70.7,67.3 L 69.5,68.5 L 68.0,69.5 L 66.1,70.1 L 64.0,70.2 L 62.0,70.0 L 60.1,69.7 L 58.3,69.3 L 56.5,69.0 L 54.7,68.4 L 53.1,67.5 L 51.8,66.3 L 50.8,65.0 L 50.0,63.5 L 49.2,62.0 L 48.7,60.3 L 49.0,58.6 L 50.2,57.0 L 52.2,56.0 L 54.5,55.5 L 56.7,55.3 L 58.6,55.1 L 60.3,54.8 L 62.0,54.5 L 63.8,54.4 L 65.7,54.5 L 67.6,54.9 L 69.5,55.5 L 71.3,56.3 L 73.1,57.3 L 74.6,58.7 L 75.3,60.3 L 75.1,62.0 Z",
          fill: "none",
          stroke: "#D4A373",
          strokeWidth: "5",
          strokeLinejoin: "round",
          opacity: ".7",
        },
      ],
      [
        "path",
        {
          d: "M 97.6,62.0 L 96.5,66.4 L 93.9,70.5 L 90.4,73.9 L 86.4,76.9 L 81.8,79.2 L 76.7,80.6 L 71.5,81.0 L 66.5,80.7 L 62.0,80.4 L 57.5,80.5 L 52.5,81.1 L 46.8,81.2 L 40.9,80.3 L 36.1,77.8 L 32.9,74.2 L 31.2,70.2 L 30.5,66.1 L 30.1,62.0 L 30.3,57.9 L 31.5,53.9 L 34.2,50.3 L 38.2,47.4 L 42.7,45.3 L 47.4,43.5 L 52.0,41.9 L 56.8,40.6 L 62.0,40.1 L 67.1,40.7 L 71.7,42.5 L 75.7,44.7 L 79.4,46.9 L 83.5,48.8 L 88.3,50.9 L 93.0,53.8 L 96.4,57.6 L 97.6,62.0 Z",
          fill: "none",
          stroke: "#D4A373",
          strokeWidth: "7",
          strokeLinejoin: "round",
          opacity: ".7",
        },
      ],
      [
        "path",
        {
          d: "M 103.2,62.0 L 103.0,67.3 L 103.2,72.9 L 102.3,79.0 L 99.1,84.7 L 93.7,89.5 L 86.9,93.4 L 79.3,96.7 L 71.0,99.4 L 62.0,101.2 L 52.5,101.1 L 43.6,98.8 L 36.1,94.7 L 30.0,89.8 L 24.6,84.9 L 19.2,80.0 L 14.3,74.7 L 11.1,68.5 L 11.0,62.0 L 14.2,55.9 L 19.4,50.7 L 24.8,46.3 L 29.4,42.1 L 33.7,37.4 L 38.7,32.5 L 45.2,28.3 L 53.1,25.3 L 62.0,23.9 L 71.3,23.6 L 80.9,24.2 L 90.4,26.1 L 98.9,29.9 L 104.9,35.7 L 107.4,42.9 L 106.8,50.1 L 104.7,56.5 L 103.2,62.0 Z",
          fill: "none",
          stroke: "#D4A373",
          strokeWidth: "5",
          strokeLinejoin: "round",
          opacity: ".7",
        },
      ],
    ],
  },
};
