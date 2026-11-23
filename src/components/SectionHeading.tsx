import type { ReactNode } from "react";

type SectionHeadingProps = {
  index: string;
  title: string;
  meta?: ReactNode;
};

export function SectionHeading({ index, title, meta }: SectionHeadingProps) {
  return (
    <div className="relative flex flex-col gap-4 border-b border-ink/15 pb-5 sm:flex-row sm:items-end sm:justify-between">
      <span
        aria-hidden="true"
        className="absolute -bottom-px left-0 h-[2px] w-14 bg-accent"
      />
      <div className="flex items-baseline gap-4">
        <span className="font-mono text-[11px] font-medium uppercase tracking-[0.18em] text-accent-strong">
          {index}
        </span>
        <h2 className="text-2xl font-semibold tracking-[-0.02em] sm:text-3xl">{title}</h2>
      </div>
      {meta}
    </div>
  );
}
