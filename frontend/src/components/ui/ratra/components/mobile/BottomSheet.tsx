import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
  type KeyboardEvent,
  type PointerEvent,
  type ReactNode,
} from "react";
import { cn } from "../../lib/cn";
import {
  FLICK_SPRING,
  SHEET_SPRING,
  nearest,
  projectedEnd,
  rubberBand,
  springStep,
  type SpringState,
} from "../../lib/spring";

const DEFAULT_DETENTS = [0.29, 0.5, 0.88] as const;
const INTERACTIVE = "a,button,input,select,textarea,[role=slider]";

export interface BottomSheetProps {
  label: string;
  children: ReactNode;
  header?: ReactNode;
  detents?: readonly number[];
  defaultDetent?: number;
  onDetentChange?: (index: number) => void;
  dim?: boolean;
  handleLabel?: string;
  className?: string;
}

function prefersReducedMotion(): boolean {
  return (
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );
}

export function BottomSheet({
  label,
  children,
  header,
  detents = DEFAULT_DETENTS,
  defaultDetent = 0,
  onDetentChange,
  dim = true,
  handleLabel = "Ubah tinggi panel",
  className,
}: BottomSheetProps) {
  const sheet = useRef<HTMLElement>(null);
  const shade = useRef<HTMLDivElement>(null);
  const top = useRef<HTMLDivElement>(null);
  const spring = useRef<SpringState>({ x: 0, v: 0, target: 0 });
  const frame = useRef(0);
  const flick = useRef(false);
  const moved = useRef(false);
  const drag = useRef<{ offset: number; history: [number, number][] } | null>(
    null,
  );
  const [index, setIndex] = useState(defaultDetent);
  const [height, setHeight] = useState(0);
  const [headerHeight, setHeaderHeight] = useState(0);

  const ys = useMemo(
    () => detents.map((d) => height - (d <= 1 ? d * height : d)),
    [detents, height],
  );

  const paint = useCallback(
    (y: number) => {
      if (sheet.current) sheet.current.style.transform = `translateY(${y}px)`;
      if (shade.current && ys.length > 1) {
        const highest = ys[ys.length - 1];
        const below = ys[ys.length - 2];
        const p = (below - y) / Math.max(1, below - highest);
        shade.current.style.opacity = String(Math.min(1, Math.max(0, p)));
      }
    },
    [ys],
  );

  const animate = useCallback(() => {
    cancelAnimationFrame(frame.current);
    if (prefersReducedMotion()) {
      spring.current = { ...spring.current, x: spring.current.target, v: 0 };
      paint(spring.current.x);
      return;
    }
    let last = performance.now();
    const tick = (now: number) => {
      const dt = Math.min(0.032, (now - last) / 1000);
      last = now;
      const { response, damping } = flick.current ? FLICK_SPRING : SHEET_SPRING;
      spring.current = springStep(spring.current, dt, response, damping);
      paint(spring.current.x);
      if (
        spring.current.v !== 0 ||
        spring.current.x !== spring.current.target
      ) {
        frame.current = requestAnimationFrame(tick);
      }
    };
    frame.current = requestAnimationFrame(tick);
  }, [paint]);

  const goTo = useCallback(
    (i: number) => {
      const next = Math.min(detents.length - 1, Math.max(0, i));
      setIndex(next);
      onDetentChange?.(next);
      spring.current = { ...spring.current, target: ys[next] };
      animate();
    },
    [animate, detents.length, onDetentChange, ys],
  );

  useLayoutEffect(() => {
    const parent = sheet.current?.parentElement;
    if (!parent) return;
    const measure = () => {
      setHeight(parent.clientHeight);
      setHeaderHeight(top.current?.offsetHeight ?? 0);
    };
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(parent);
    return () => observer.disconnect();
  }, []);

  useLayoutEffect(() => {
    if (!height || drag.current) return;
    spring.current = { x: ys[index], v: 0, target: ys[index] };
    paint(ys[index]);
  }, [height, ys, index, paint]);

  useEffect(() => () => cancelAnimationFrame(frame.current), []);

  const onPointerDown = (e: PointerEvent<HTMLDivElement>) => {
    const target = e.target as HTMLElement;
    if (target.closest(INTERACTIVE) && !target.closest("[data-sheet-handle]"))
      return;
    cancelAnimationFrame(frame.current);
    moved.current = false;
    drag.current = {
      offset: e.clientY - spring.current.x,
      history: [[performance.now(), spring.current.x]],
    };
    e.currentTarget.setPointerCapture(e.pointerId);
  };

  const onPointerMove = (e: PointerEvent<HTMLDivElement>) => {
    const d = drag.current;
    if (!d) return;
    const raw = e.clientY - d.offset;
    const highest = Math.min(...ys);
    const lowest = Math.max(...ys);
    const y =
      raw < highest
        ? highest - rubberBand(highest - raw, height)
        : raw > lowest
          ? lowest + rubberBand(raw - lowest, height)
          : raw;
    if (Math.abs(y - d.history[0][1]) > 4) moved.current = true;
    spring.current = { ...spring.current, x: y, v: 0 };
    d.history = [...d.history.slice(-4), [performance.now(), y]];
    paint(y);
  };

  const onPointerUp = () => {
    const d = drag.current;
    if (!d) return;
    drag.current = null;
    const [t0, y0] = d.history[0];
    const [t1, y1] = d.history[d.history.length - 1];
    const velocity = (y1 - y0) / Math.max(0.008, (t1 - t0) / 1000);
    flick.current = Math.abs(velocity) > 300;
    spring.current = { ...spring.current, v: velocity };
    goTo(ys.indexOf(nearest(ys, projectedEnd(spring.current.x, velocity))));
  };

  const onHandleKey = (e: KeyboardEvent<HTMLButtonElement>) => {
    if (e.key === "ArrowUp") {
      e.preventDefault();
      goTo(index + 1);
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      goTo(index - 1);
    }
  };

  const initial = detents[index];
  const initialTransform =
    initial <= 1
      ? `translateY(${(1 - initial) * 100}%)`
      : `translateY(calc(100% - ${initial}px))`;

  return (
    <>
      {dim && (
        <div
          ref={shade}
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 z-20 bg-scrim opacity-0"
        />
      )}
      <section
        ref={sheet}
        aria-label={label}
        style={{ transform: initialTransform }}
        className={cn(
          "absolute inset-x-0 top-0 z-20 flex h-full flex-col rounded-t-lg bg-page/94 shadow-sheet backdrop-blur-[30px]",
          className,
        )}
      >
        <div
          ref={top}
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={onPointerUp}
          onPointerCancel={onPointerUp}
          className="cursor-grab touch-none select-none active:cursor-grabbing"
        >
          <div className="flex justify-center pt-2 pb-1">
            <button
              type="button"
              data-sheet-handle
              aria-label={handleLabel}
              aria-keyshortcuts="ArrowUp ArrowDown"
              onKeyDown={onHandleKey}
              onClick={() => {
                if (!moved.current) goTo((index + 1) % detents.length);
              }}
              className="grid h-6 w-14 cursor-grab place-items-center rounded-full"
            >
              <span className="h-[5px] w-10 rounded-full bg-label/22" />
            </button>
          </div>
          {header && <div className="px-5 pt-2">{header}</div>}
        </div>
        <div
          className="overflow-y-auto overscroll-contain px-5 pt-4 pb-6"
          style={
            height
              ? { height: Math.max(0, height - ys[index] - headerHeight) }
              : undefined
          }
        >
          {children}
        </div>
      </section>
    </>
  );
}
