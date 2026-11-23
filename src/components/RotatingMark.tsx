import {
  motion,
  useAnimationFrame,
  useInView,
  useMotionValue,
  useReducedMotion,
} from "motion/react";
import { useRef, type ReactNode } from "react";

type RotatingMarkProps = {
  children: ReactNode;
  className?: string;
  /** Seconds per full rotation. */
  duration?: number;
};

/**
 * Decorative mark that rotates continuously. Uses Motion's frame loop so it
 * stays smooth, pauses offscreen, and stops for reduced-motion visitors.
 */
export function RotatingMark({
  children,
  className = "",
  duration = 22,
}: RotatingMarkProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const rotate = useMotionValue(0);
  const reduce = useReducedMotion();
  const inView = useInView(ref, { margin: "120px" });

  useAnimationFrame((_, delta) => {
    if (reduce || !inView) return;
    rotate.set((rotate.get() + (360 / (duration * 1000)) * delta) % 360);
  });

  return (
    <motion.span
      ref={ref}
      aria-hidden="true"
      style={{ rotate }}
      className={className}
    >
      {children}
    </motion.span>
  );
}
