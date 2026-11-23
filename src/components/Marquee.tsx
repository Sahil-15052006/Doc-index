import {
  motion,
  useAnimationFrame,
  useInView,
  useMotionValue,
  useReducedMotion,
} from "motion/react";
import { useEffect, useRef, type ReactNode } from "react";

type MarqueeProps = {
  children: ReactNode;
  /** Seconds for one full loop. */
  speed?: number;
  reverse?: boolean;
  className?: string;
  label?: string;
};

/**
 * Seamless infinite ticker. The content is rendered twice and the track is
 * translated by exactly one copy, so the loop has no visible seam.
 * Driven by Motion's animation frame loop and paused when offscreen or when
 * the visitor prefers reduced motion.
 */
export function Marquee({
  children,
  speed = 30,
  reverse = false,
  className = "",
  label,
}: MarqueeProps) {
  const reduce = useReducedMotion();
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const loopWidthRef = useRef(0);
  const x = useMotionValue(0);
  const inView = useInView(containerRef, { margin: "80px" });

  // Measure once and whenever the content resizes (e.g. after fonts load).
  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const measure = () => {
      loopWidthRef.current = track.scrollWidth / 2;
    };

    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(track);
    return () => observer.disconnect();
  }, []);

  useAnimationFrame((_, delta) => {
    if (reduce || !inView) return;

    const loopWidth = loopWidthRef.current;
    if (loopWidth <= 0) return;

    const distance = (loopWidth / speed) * (delta / 1000);
    let next = x.get() + (reverse ? distance : -distance);

    // Wrap around one copy so the strip loops forever.
    if (next <= -loopWidth) next += loopWidth;
    if (next > 0) next -= loopWidth;

    x.set(next);
  });

  const sequence = (
    <div className="flex shrink-0 items-center" aria-hidden="true">
      {children}
    </div>
  );

  return (
    <div ref={containerRef} className={`relative overflow-hidden ${className}`}>
      {label && <span className="sr-only">{label}</span>}
      <motion.div
        ref={trackRef}
        style={{ x }}
        className="flex w-max will-change-transform"
      >
        {sequence}
        {sequence}
      </motion.div>
    </div>
  );
}
