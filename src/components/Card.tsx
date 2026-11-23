import { motion } from "motion/react";
import type { Doc } from "../data/docs";
import { spring } from "../lib/animations";
import { getCategoryTone, toneStyles } from "../lib/categories";

type CardProps = {
  doc: Doc;
  /** Wide editorial variant used for the lead featured doc. */
  wide?: boolean;
};

/**
 * Shared documentation card — used on both the home page and the docs page.
 */
export function Card({ doc, wide = false }: CardProps) {
  const tone = toneStyles[getCategoryTone(doc.field)];

  return (
    <motion.a
      href={doc.link}
      target="_blank"
      rel="noopener noreferrer"
      whileHover={{ y: -3 }}
      whileTap={{ scale: 0.995 }}
      transition={spring}
      className={`group relative flex h-full flex-col border border-ink bg-surface text-ink transition-[box-shadow,border-color] duration-300 hover:border-ink/45 hover:shadow-[0_22px_45px_-32px_rgba(0,0,0,0.45)] dark:hover:shadow-[0_22px_45px_-30px_rgba(0,0,0,0.85)] ${
        wide ? "p-6 sm:p-8 lg:p-10" : "p-6 sm:p-7"
      }`}
    >
      <span
        aria-hidden="true"
        className={`absolute inset-x-0 top-0 h-[3px] ${tone.bar}`}
      />

      <div className="flex items-center justify-between gap-4">
        <span
          className={`inline-flex items-center gap-2 border px-2 py-1 font-mono text-[11px] font-medium uppercase tracking-[0.16em] ${tone.chip}`}
        >
          <span aria-hidden="true" className={`inline-block size-1.5 ${tone.dot}`} />
          {doc.field}
        </span>
      </div>

      <div
        className={`flex flex-1 flex-col justify-between ${
          wide ? "mt-8 sm:mt-10" : "mt-10"
        }`}
      >
        <div className={wide ? "max-w-3xl" : ""}>
          <h3
            className={
              wide
                ? "text-3xl font-semibold leading-[1.06] tracking-[-0.025em] sm:text-4xl lg:text-[3.25rem]"
                : "text-2xl font-semibold leading-[1.18] tracking-[-0.015em]"
            }
          >
            {doc.name}
          </h3>
          {doc.summary && (
            <p
              className={
                wide
                  ? "mt-4 max-w-2xl text-base leading-relaxed text-ink/65 sm:text-lg"
                  : "mt-3 text-[15px] leading-relaxed text-ink/65"
              }
            >
              {doc.summary}
            </p>
          )}
        </div>

        <div
          className={`flex items-center justify-between border-t border-ink/10 pt-4 ${
            wide ? "mt-10" : "mt-8"
          }`}
        >
          <span className="font-mono text-[11px] font-medium uppercase tracking-[0.18em] text-ink/65 transition-colors group-hover:text-ink">
            Read document
          </span>
          <span
            aria-hidden="true"
            className="text-lg leading-none text-ink/35 transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent-strong"
          >
            ↗
          </span>
        </div>
      </div>
    </motion.a>
  );
}
