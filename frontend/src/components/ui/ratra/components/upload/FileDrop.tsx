import { useRef, useState, type DragEvent } from "react";
import { Upload } from "lucide-react";
import { cn } from "../../lib/cn";
import { Button } from "../button/Button";
import { Icon } from "../icon/Icon";

export interface FileDropProps {
  title: string;
  formats: string;
  onFiles: (files: File[]) => void;
  accept?: string;
  multiple?: boolean;
  disabled?: boolean;
  buttonLabel?: string;
  className?: string;
}

export function FileDrop({
  title,
  formats,
  onFiles,
  accept,
  multiple = false,
  disabled = false,
  buttonLabel = "Pilih berkas",
  className,
}: FileDropProps) {
  const input = useRef<HTMLInputElement>(null);
  const [over, setOver] = useState(false);

  const drop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setOver(false);
    if (disabled) return;
    const files = Array.from(e.dataTransfer.files);
    if (files.length) onFiles(multiple ? files : files.slice(0, 1));
  };

  return (
    <div
      onDragOver={(e) => {
        e.preventDefault();
        if (!disabled) setOver(true);
      }}
      onDragLeave={() => setOver(false)}
      onDrop={drop}
      className={cn(
        "flex flex-col items-center gap-2.5 rounded-md bg-fill-secondary px-6 py-9 text-center inset-ring-[1.5px] inset-ring-label/15 transition-shadow",
        over && "bg-tint-fill inset-ring-2 inset-ring-tint",
        disabled && "opacity-50",
        className,
      )}
    >
      <Icon icon={Upload} size={32} className="text-tint" />
      <p className="text-headline">{title}</p>
      <p className="text-footnote text-label-secondary">{formats}</p>
      <Button
        variant="tinted"
        disabled={disabled}
        onClick={() => input.current?.click()}
      >
        {buttonLabel}
      </Button>
      <input
        ref={input}
        type="file"
        hidden
        accept={accept}
        multiple={multiple}
        disabled={disabled}
        onChange={(e) => {
          const files = Array.from(e.target.files ?? []);
          if (files.length) onFiles(files);
          e.target.value = "";
        }}
      />
    </div>
  );
}
