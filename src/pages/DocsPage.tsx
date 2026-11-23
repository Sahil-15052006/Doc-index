import { useEffect, useMemo, useState, type ReactNode } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Card } from "../components/Card";
import { ColorTrio } from "../components/ColorTrio";
import { Marquee } from "../components/Marquee";
import { useDocs } from "../context/DocsContext";
import { EASE, spring } from "../lib/animations";
import {
  getCategoryTone,
  toneStyles,
  type CategoryTone,
} from "../lib/categories";

const ALL = "All";

function FilterChip({
  active,
  onClick,
  children,
  tone,
}: {
  active: boolean;
  onClick: () => void;
  children: ReactNode;
  tone?: CategoryTone;
}) {
  const styles = tone ? toneStyles[tone] : null;

  return (
    <button
      type="button"
      onClick={onClick}
      className={`relative border px-3 py-2 font-mono text-[11px] font-medium uppercase tracking-[0.16em] transition-colors ${
        active
          ? "border-accent text-accent-ink"
          : "border-ink/20 text-ink/60 hover:border-ink/40 hover:bg-ink/5 hover:text-ink"
      }`}
    >
      {active && (
        <motion.span
          layoutId="filter-active"
          className="absolute inset-0 bg-accent"
          transition={spring}
        />
      )}
      <span className="relative z-10 flex items-center gap-2">
        {styles ? (
          <span
            aria-hidden="true"
            className={`inline-block size-1.5 ${styles.dot}`}
          />
        ) : (
          <ColorTrio />
        )}
        {children}
      </span>
    </button>
  );
}

export function DocsPage() {
  const { docs, categories } = useDocs();
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState(ALL);

  useEffect(() => {
    document.title = "All documentation — Doc Index";
  }, []);

  const counts = useMemo(() => {
    return docs.reduce<Record<string, number>>((acc, doc) => {
      acc[doc.field] = (acc[doc.field] ?? 0) + 1;
      return acc;
    }, {});
  }, [docs]);

  const filtered = useMemo(() => {
    const term = query.trim().toLowerCase();

    return docs.filter((doc) => {
      const matchesCategory = category === ALL || doc.field === category;
      const matchesQuery =
        term.length === 0 ||
        doc.name.toLowerCase().includes(term) ||
        doc.field.toLowerCase().includes(term) ||
        (doc.summary?.toLowerCase().includes(term) ?? false);

      return matchesCategory && matchesQuery;
    });
  }, [docs, query, category]);

  const reset = () => {
    setQuery("");
    setCategory(ALL);
  };

  const tickerItems = [
    `${String(docs.length).padStart(2, "0")} entries`,
    `${String(categories.length).padStart(2, "0")} fields`,
    ...categories,
    "Search",
    "Filter",
    "Open",
    "Read",
  ];

  return (
    <>
      <section className="relative overflow-hidden border-b border-ink/15">
        <div className="mx-auto max-w-[1280px] px-5 sm:px-8">
          <div className="flex items-center justify-between border-b border-ink/15 py-4 font-mono text-[11px] font-medium uppercase tracking-[0.18em] text-ink/65">
            <span className="flex items-center gap-3">
              <ColorTrio />
              Index / All documentation
            </span>
            <span>{String(docs.length).padStart(2, "0")} entries</span>
          </div>
          <div className="relative py-12 lg:py-16">
            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: EASE, delay: 0.05 }}
              className="text-[clamp(1.75rem,8vw,5rem)] font-bold uppercase leading-[0.92] tracking-[-0.035em]"
            >
              All
              <br />
              <span className="text-accent-strong">documentation.</span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: EASE, delay: 0.15 }}
              className="mt-6 max-w-xl text-base leading-relaxed text-ink/65 sm:text-lg"
            >
              Project write-ups, work notes, and troubleshooting guides. Search by
              keyword or filter by field.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: EASE, delay: 0.22 }}
              className="mt-8 flex flex-wrap gap-2"
            >
              <span className="inline-flex items-center gap-2 border border-ink/15 bg-surface px-3 py-2 font-mono text-[11px] font-medium uppercase tracking-[0.16em]">
                <span className="tabular-nums text-accent-strong">
                  {String(docs.length).padStart(2, "0")}
                </span>
                <span className="text-ink/65">entries</span>
              </span>
              <span className="inline-flex items-center gap-2 border border-ink/15 bg-surface px-3 py-2 font-mono text-[11px] font-medium uppercase tracking-[0.16em]">
                <span className="tabular-nums text-cobalt-strong">
                  {String(categories.length).padStart(2, "0")}
                </span>
                <span className="text-ink/65">fields</span>
              </span>
            </motion.div>
          </div>
        </div>
      </section>

      <div className="border-b border-ink/15 bg-acid text-acid-ink">
        <Marquee speed={55} reverse className="py-2.5" label={tickerItems.join(" · ")}>
          {tickerItems.map((item, index) => (
            <span
              key={`${item}-${index}`}
              className="mx-4 inline-flex items-center gap-3 font-mono text-[11px] font-medium uppercase tracking-[0.18em]"
            >
              <span
                aria-hidden="true"
                className="inline-block size-1 bg-acid-ink"
              />
              {item}
            </span>
          ))}
        </Marquee>
      </div>

      <div className="sticky top-[65px] z-30 border-b border-ink/15 bg-paper/95 backdrop-blur-md">
        <div className="mx-auto max-w-[1280px] px-5 sm:px-8">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: EASE, delay: 0.1 }}
            className="flex flex-col gap-4 py-4 xl:flex-row xl:items-center xl:justify-between"
          >
            <label className="flex w-full items-center gap-3 border border-ink/20 bg-surface px-4 py-3 transition-colors focus-within:border-accent xl:max-w-sm">
              <span className="shrink-0 font-mono text-[11px] font-medium uppercase tracking-[0.18em] text-accent-strong">
                Search
              </span>
              <input
                type="search"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Title, field, keyword…"
                className="w-full bg-transparent text-base outline-none placeholder:text-ink/60 focus:outline-none"
                aria-label="Search documentation"
              />
            </label>

            <div className="flex flex-wrap gap-2">
              <FilterChip active={category === ALL} onClick={() => setCategory(ALL)}>
                All / {docs.length}
              </FilterChip>
              {categories.map((item) => (
                <FilterChip
                  key={item}
                  active={category === item}
                  onClick={() => setCategory(item)}
                  tone={getCategoryTone(item)}
                >
                  {item} / {counts[item] ?? 0}
                </FilterChip>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      <section className="mx-auto max-w-[1280px] px-5 py-10 sm:px-8 lg:py-14">
        <div className="mb-6 flex flex-wrap items-center justify-between gap-3 font-mono text-[11px] font-medium uppercase tracking-[0.16em] text-ink/65">
          <motion.span
            key={filtered.length}
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2 }}
            className="tabular-nums text-accent-strong"
          >
            Showing {filtered.length} of {docs.length}
          </motion.span>
          <span>
            {category}
            {query.trim() && ` · “${query.trim()}”`}
          </span>
        </div>

        {filtered.length > 0 ? (
          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            <AnimatePresence mode="popLayout">
              {filtered.map((doc, index) => (
                <motion.div
                  key={doc.id}
                  layout
                  initial={{ opacity: 0, scale: 0.98, y: 10 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.98, transition: { duration: 0.18 } }}
                  transition={{
                    duration: 0.3,
                    ease: EASE,
                    delay: Math.min(index * 0.025, 0.2),
                  }}
                  className="h-full"
                >
                  <Card doc={doc} />
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, ease: EASE }}
            className="flex flex-col items-center justify-center border border-ink/15 bg-surface px-6 py-20 text-center"
          >
            <p className="font-mono text-[11px] font-medium uppercase tracking-[0.18em] text-accent-strong">
              No results
            </p>
            <p className="mt-4 text-2xl font-semibold tracking-[-0.02em]">
              Nothing matches those filters.
            </p>
            <p className="mt-2 max-w-sm text-base leading-relaxed text-ink/60">
              Try a different keyword or clear the field filter.
            </p>
            <button
              type="button"
              onClick={reset}
              className="mt-8 border border-ink bg-ink px-5 py-3 font-mono text-[11px] font-medium uppercase tracking-[0.16em] text-paper transition-colors hover:border-accent hover:bg-accent hover:text-accent-ink"
            >
              Reset filters
            </button>
          </motion.div>
        )}
      </section>
    </>
  );
}
