import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
  type MouseEvent as ReactMouseEvent,
  type ReactNode,
} from "react";
import { cn } from "@/lib/utils";

/*
 * Inline hover previews: editorial links that float a small live-preview card
 * above the cursor. Adapted from a reference component to this codebase's rules:
 *
 * - Tokens only (the original hardcoded its own palette and fonts).
 * - Desktop sugar, not a dependency: the card exists only on pointer-fine
 *   devices. On touch, links are plain links: nothing important behind hover
 *   (contract §4).
 * - Position updates are rAF-throttled; transitions ride the motion tokens and
 *   collapse under prefers-reduced-motion via the global killswitch.
 */

export type HoverPreviewItem = {
  title: string;
  subtitle: string;
  /** Optional poster. When missing (or 404ing), the card shows text only. */
  image?: string;
  imageWidth?: number;
  imageHeight?: number;
};

type Ctx = {
  start: (key: string, e: ReactMouseEvent) => void;
  move: (e: ReactMouseEvent) => void;
  end: () => void;
};

const HoverPreviewCtx = createContext<Ctx | null>(null);

const CARD_WIDTH = 300;
const CARD_HEIGHT = 240;
const MARGIN = 20;

export function HoverPreviewGroup({
  items,
  children,
  className,
}: {
  items: Record<string, HoverPreviewItem>;
  children: ReactNode;
  className?: string;
}) {
  const [active, setActive] = useState<HoverPreviewItem | null>(null);
  const [visible, setVisible] = useState(false);
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [pointerFine, setPointerFine] = useState(false);
  const frame = useRef(0);

  useEffect(() => {
    const mq = window.matchMedia("(pointer: fine)");
    const sync = () => setPointerFine(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  // Warm the poster cache so the first hover doesn't flash an empty card.
  useEffect(() => {
    if (!pointerFine) return;
    for (const item of Object.values(items)) {
      if (item.image) {
        const img = new Image();
        img.src = item.image;
      }
    }
  }, [pointerFine, items]);

  const clamp = (clientX: number, clientY: number) => {
    let x = clientX - CARD_WIDTH / 2;
    let y = clientY - CARD_HEIGHT - MARGIN;
    x = Math.min(Math.max(x, MARGIN), window.innerWidth - CARD_WIDTH - MARGIN);
    if (y < MARGIN) y = clientY + MARGIN;
    return { x, y };
  };

  const place = useCallback((e: ReactMouseEvent | MouseEvent) => {
    cancelAnimationFrame(frame.current);
    const { clientX, clientY } = e;
    frame.current = requestAnimationFrame(() => setPos(clamp(clientX, clientY)));
  }, []);

  const start = useCallback(
    (key: string, e: ReactMouseEvent) => {
      if (!pointerFine) return;
      const item = items[key];
      if (!item) return;
      setActive(item);
      // Position synchronously on entry: the card must appear AT the cursor,
      // not glide in from wherever the previous hover left it.
      setPos(clamp(e.clientX, e.clientY));
      setVisible(true);
    },
    [pointerFine, items],
  );

  const move = useCallback(
    (e: ReactMouseEvent) => {
      if (pointerFine) place(e);
    },
    [pointerFine, place],
  );

  const end = useCallback(() => setVisible(false), []);

  useEffect(() => () => cancelAnimationFrame(frame.current), []);

  return (
    <HoverPreviewCtx.Provider value={{ start, move, end }}>
      <div className={className}>{children}</div>

      {active ? (
        <div
          aria-hidden="true"
          className={cn(
            "pointer-events-none fixed z-50 transition-[opacity,transform] duration-[var(--dur-base)] ease-[var(--ease-brand)]",
            visible ? "translate-y-0 scale-100 opacity-100" : "translate-y-2 scale-95 opacity-0",
          )}
          style={{ left: pos.x, top: pos.y, width: CARD_WIDTH }}
        >
          <div className="rounded-xl border border-border bg-surface-2 p-2 shadow-[var(--shadow-elevated)]">
            {active.image ? (
              <img
                src={active.image}
                alt=""
                width={active.imageWidth ?? 640}
                height={active.imageHeight ?? 360}
                className="block h-auto w-full rounded-lg border border-border bg-surface object-cover"
                onError={(e) => {
                  // Poster missing (e.g. not generated yet): text-only card.
                  e.currentTarget.style.display = "none";
                }}
              />
            ) : null}
            <p className="px-2 pt-2.5 font-display text-sm font-semibold text-foreground">
              {active.title}
            </p>
            <p className="px-2 pt-0.5 pb-1.5 text-xs text-muted-foreground">{active.subtitle}</p>
          </div>
        </div>
      ) : null}
    </HoverPreviewCtx.Provider>
  );
}

/**
 * An inline link that shows its preview card on hover. Always a real anchor;
 * on touch devices it simply navigates.
 */
export function HoverPreviewLink({
  k,
  href,
  children,
  className,
}: {
  k: string;
  href: string;
  children: ReactNode;
  className?: string;
}) {
  const ctx = useContext(HoverPreviewCtx);
  const external = href.startsWith("http");

  return (
    <a
      href={href}
      target={external ? "_blank" : undefined}
      rel={external ? "noopener noreferrer" : undefined}
      onMouseEnter={(e) => ctx?.start(k, e)}
      onMouseMove={(e) => ctx?.move(e)}
      onMouseLeave={() => ctx?.end()}
      className={cn(
        "relative inline-block font-display font-semibold text-foreground transition-colors duration-[var(--dur-micro)]",
        "after:absolute after:-bottom-0.5 after:left-0 after:h-0.5 after:w-full after:origin-left after:scale-x-0 after:bg-primary after:transition-transform after:duration-[var(--dur-base)] after:ease-[var(--ease-brand)]",
        "hover:text-primary hover:after:scale-x-100 focus-visible:after:scale-x-100",
        className,
      )}
    >
      {children}
    </a>
  );
}
