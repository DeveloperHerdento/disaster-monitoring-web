import type { ReactNode } from "react";
import { FileArchive, X } from "lucide-react";
import { cn } from "../../lib/cn";
import { ProgressBar } from "../feedback/Progress";
import { IconButton } from "../icon-button/IconButton";
import { Icon } from "../icon/Icon";

export interface FileProgressProps {
  name: string;
  detail: ReactNode;
  progress?: number;
  error?: boolean;
  onCancel?: () => void;
  cancelLabel?: string;
  className?: string;
}

export function FileProgress({
  name,
  detail,
  progress,
  error = false,
  onCancel,
  cancelLabel = "Batalkan unggahan",
  className,
}: FileProgressProps) {
  return (
    <div
      className={cn(
        "flex items-center gap-3 rounded-[16px] bg-fill-secondary px-3.5 py-3",
        error && "bg-danger-fill",
        className,
      )}
    >
      <Icon
        icon={FileArchive}
        size={24}
        className={error ? "text-danger" : "text-label"}
      />
      <div className="flex min-w-0 flex-1 flex-col gap-1.5">
        <p className="truncate text-subhead font-semibold">{name}</p>
        {progress !== undefined && (
          <ProgressBar value={progress} label={name} />
        )}
        <p
          className={cn(
            "text-footnote tabular-nums",
            error ? "text-danger" : "text-label-secondary",
          )}
        >
          {detail}
        </p>
      </div>
      {onCancel && (
        <IconButton icon={X} label={cancelLabel} size="xs" onClick={onCancel} />
      )}
    </div>
  );
}
