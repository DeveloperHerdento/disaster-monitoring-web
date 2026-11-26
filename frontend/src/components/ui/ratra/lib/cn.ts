import { clsx, type ClassValue } from "clsx";
import { extendTailwindMerge } from "tailwind-merge";

const twMerge = extendTailwindMerge({
  extend: {
    theme: {
      text: [
        "large-title",
        "title-1",
        "title-2",
        "title-3",
        "headline",
        "body",
        "callout",
        "subhead",
        "footnote",
        "caption",
        "data",
      ],
      radius: ["xs", "sm", "md", "pane", "lg", "tray", "xl"],
      shadow: ["1", "2", "3", "4", "marker", "sheet"],
    },
  },
});

export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}
