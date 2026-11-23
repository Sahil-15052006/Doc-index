import { useEffect, type ReactNode } from "react";
import { motion } from "motion/react";
import { Link } from "react-router-dom";
import { Card } from "../components/Card";
import { ColorTrio } from "../components/ColorTrio";
import { CountUp } from "../components/CountUp";
import { Marquee } from "../components/Marquee";
import { Reveal } from "../components/Reveal";
import { RotatingMark } from "../components/RotatingMark";
import { SectionHeading } from "../components/SectionHeading";
import { useDocs } from "../context/DocsContext";
import { site } from "../data/site";
import { EASE, fadeUp, lineReveal, stagger } from "../lib/animations";

const tickerWords = [
  "Project notes",
  "Work logs",
  "Troubleshooting",
  "Build",
  "Break",
  "Fix",
  "Repeat",
];

const contactTickerWords = [
  "Let's compare notes",
  "Open to collaboration",
  "Always shipping",
  "Keep a record",
];

function Stat({
  label,
  value,
  large = false,
  tone = "",
}: {
  label: string;
  value: ReactNode;
  large?: boolean;
  tone?: string;
}) {
  return (
    <div className="flex items-end justify-between gap-4 px-5 py-4">
      <dt className="font-mono text-[11px] font-medium uppercase tracking-[0.18em] text-ink/65">
        {label}
      </dt>
      <dd
        className={
          large
            ? `tabular-nums font-mono text-[2rem] leading-none tracking-[-0.04em] ${tone}`
            : `tabular-nums text-sm font-medium ${tone}`
        }
      >
        {value}
      </dd>
    </div>
  );
}

export function Home() {
  const { docs, featured, categories } = useDocs();

  useEffect(() => {
    document.title = "Doc Index — Project, Work & Troubleshooting Notes";
  }, []);

  const contactRows = [
    {
      label: "Email",
      value: site.email,
      href: `mailto:${site.email}`,
      external: false,
    },
    ...site.socials.map((social) => ({
      label: social.label,
      value: social.handle,
      href: social.href,
      external: true,
    })),
  ];

  return (
    <>
      <section className="border-b border-ink/15">
        <div className="mx-auto max-w-[1280px] px-5 sm:px-8">
          <div className="flex items-center justify-between border-b border-ink/15 py-4 font-mono text-[11px] font-medium uppercase tracking-[0.18em] text-ink/65">
            <span className="flex items-center gap-3">
              <ColorTrio />
              Personal documentation index
            </span>
            <span className="hidden sm:inline">Vol. 01 — {site.updated}</span>
          </div>

          <div className="grid gap-12 py-14 lg:grid-cols-[minmax(0,1fr)_350px] lg:gap-16 lg:py-20 xl:py-24">
            <motion.div
              initial="hidden"
              animate="show"
              variants={stagger}
              className="flex flex-col justify-between"
            >
              <div>
                <motion.p
                  variants={fadeUp}
                  className="flex items-center gap-3 font-mono text-[11px] font-medium uppercase tracking-[0.18em] text-ink/65"
                >
                  <span className="inline-block size-2 bg-accent" />
                  Project · Work · Troubleshooting
                </motion.p>
                <motion.h1
                  variants={stagger}
                  className="mt-8 text-[clamp(3rem,8vw,7rem)] font-bold uppercase leading-[0.88] tracking-[-0.045em]"
                >
                  {["Notes", "worth", "keeping."].map((line) => (
                    <span
                      key={line}
                      className="block overflow-hidden pb-[0.1em] -mb-[0.1em]"
                    >
                      <motion.span
                        variants={lineReveal}
                        className={`block ${
                          line === "keeping." ? "text-accent-strong" : ""
                        }`}
                      >
                        {line}
                      </motion.span>
                    </span>
                  ))}
                </motion.h1>
              </div>

              <motion.div variants={fadeUp} className="mt-10 max-w-lg">
                <p className="text-base leading-relaxed text-ink/70 sm:text-lg">
                  A living archive of the things I build, break, and fix. Project
                  write-ups, work notes, and troubleshooting guides — written down so
                  future me doesn't have to start from zero.
                </p>
                <div className="mt-8 flex flex-wrap gap-3">
                  <Link
                    to="/docs"
                    className="inline-flex items-center gap-3 border border-ink bg-ink px-5 py-3.5 font-mono text-[11px] font-medium uppercase tracking-[0.16em] text-paper transition-colors hover:border-accent hover:bg-accent hover:text-accent-ink"
                  >
                    Browse all docs
                    <span aria-hidden="true">↗</span>
                  </Link>
                  <button
                    type="button"
                    onClick={() =>
                      document
                        .getElementById("contact")
                        ?.scrollIntoView({ behavior: "smooth" })
                    }
                    className="inline-flex items-center gap-3 border border-ink/20 px-5 py-3.5 font-mono text-[11px] font-medium uppercase tracking-[0.16em] text-ink transition-colors hover:border-ink hover:bg-surface"
                  >
                    Get in touch
                  </button>
                </div>
              </motion.div>
            </motion.div>

            <motion.aside
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.35, ease: EASE }}
              className="relative self-end border border-ink bg-surface shadow-[0_28px_60px_-44px_rgba(0,0,0,0.5)]"
              aria-label="Index overview"
            >
              <span
                aria-hidden="true"
                className="absolute inset-x-0 top-0 h-[3px] bg-accent"
              />

              <div className="flex items-center justify-between border-b border-ink/15 px-5 py-3 font-mono text-[11px] font-medium uppercase tracking-[0.18em] text-ink/65">
                <span className="text-accent-strong">Index status</span>
                <span className="flex items-center gap-2 text-ink/70">
                  <span className="inline-block size-1.5 bg-accent" />
                  Live
                </span>
              </div>

              <dl className="divide-y divide-ink/10">
                <Stat
                  label="Documents"
                  value={<CountUp value={docs.length} />}
                  large
                  tone="text-accent-strong"
                />
                <Stat
                  label="Fields"
                  value={<CountUp value={categories.length} />}
                  large
                  tone="text-cobalt-strong"
                />
                <Stat label="Updated" value={site.updated} />
              </dl>

              <div className="border-t border-ink/15 bg-ink px-5 py-4 text-paper">
                <p className="font-mono text-[11px] font-medium uppercase tracking-[0.18em] text-paper/60">
                  Maintained by
                </p>
                <p className="mt-1 flex items-center gap-2 text-sm font-medium">
                  <span aria-hidden="true" className="inline-block size-1.5 bg-acid" />
                  {site.owner}
                </p>
              </div>
            </motion.aside>
          </div>
        </div>
      </section>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.5 }}
        className="border-b border-ink/15 bg-surface"
      >
        <Marquee
          speed={55}
          className="py-2.5"
          label={`${categories.join(" · ")} · ${tickerWords.join(" · ")}`}
        >
          {[...categories, ...tickerWords].map((word, index) => (
            <span
              key={`${word}-${index}`}
              className="mx-4 inline-flex items-center gap-3 font-mono text-[11px] font-medium uppercase tracking-[0.18em] text-ink/65"
            >
              <span aria-hidden="true" className="inline-block size-1 bg-accent" />
              {word}
            </span>
          ))}
        </Marquee>
      </motion.div>

      <section className="relative overflow-hidden border-b border-ink/15">
        <div className="relative mx-auto max-w-[1280px] px-5 py-16 sm:px-8 lg:py-20">
          <Reveal>
            <SectionHeading
              index="01 — Featured"
              title="Selected documentation"
              meta={
                <Link
                  to="/docs"
                  className="font-mono text-[11px] font-medium uppercase tracking-[0.16em] text-ink/65 underline-offset-4 transition-colors hover:text-accent-strong hover:underline"
                >
                  View all {docs.length} ↗
                </Link>
              }
            />
          </Reveal>
          <div className="mt-10 grid gap-5 md:grid-cols-2">
            {featured.map((doc, index) => (
              <Reveal
                key={doc.id}
                delay={index * 0.08}
                className={index === 0 ? "h-full md:col-span-2" : "h-full"}
              >
                <Card doc={doc} index={index} wide={index === 0} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <div className="border-b border-ink/15 bg-cobalt text-cobalt-ink">
        <Marquee
          speed={55}
          reverse
          className="py-2.5"
          label={contactTickerWords.join(" · ")}
        >
          {contactTickerWords.map((word, index) => (
            <span
              key={`${word}-${index}`}
              className="mx-4 inline-flex items-center gap-3 font-mono text-[11px] font-medium uppercase tracking-[0.18em]"
            >
              <span aria-hidden="true" className="inline-block size-1 bg-cobalt-ink" />
              {word}
            </span>
          ))}
        </Marquee>
      </div>

      <section
        id="contact"
        className="relative scroll-mt-[65px] overflow-hidden bg-ink text-paper"
      >
        <div className="flex h-0.5" aria-hidden="true">
          <span className="flex-1 bg-accent" />
          <span className="flex-1 bg-cobalt" />
          <span className="flex-1 bg-acid" />
        </div>

        <RotatingMark
          duration={26}
          className="pointer-events-none absolute right-8 top-24 hidden select-none text-[8rem] leading-none text-accent-on-ink/15 lg:block"
        >
          ✳
        </RotatingMark>

        <div className="mx-auto max-w-[1280px] px-5 py-16 sm:px-8 lg:py-20">
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
            <div>
              <Reveal>
                <p className="font-mono text-[11px] font-medium uppercase tracking-[0.18em] text-accent-on-ink">
                  02 — Contact
                </p>
              </Reveal>
              <Reveal delay={0.06}>
                <h2 className="mt-6 text-[clamp(2.5rem,5.5vw,4.75rem)] font-bold uppercase leading-[0.92] tracking-[-0.035em]">
                  Let's
                  <br />
                  compare
                  <br />
                  <span className="text-accent-on-ink">notes.</span>
                </h2>
              </Reveal>
              <Reveal delay={0.12}>
                <p className="mt-6 max-w-md text-base leading-relaxed text-paper/65 sm:text-lg">
                  Found something useful, spotted a mistake, or want to talk shop? My
                  inbox is always open.
                </p>
              </Reveal>
            </div>

            <div className="self-end">
              {contactRows.map((row, index) => (
                <Reveal key={row.label} delay={0.1 + index * 0.06}>
                  <a
                    href={row.href}
                    target={row.external ? "_blank" : undefined}
                    rel={row.external ? "noopener noreferrer" : undefined}
                    className="group -mx-4 flex items-center justify-between gap-6 border-t border-paper/15 px-4 py-4 transition-colors hover:bg-paper/[0.05]"
                  >
                    <span className="font-mono text-[11px] font-medium uppercase tracking-[0.18em] text-paper/60 transition-colors group-hover:text-paper/80">
                      {row.label}
                    </span>
                    <span className="flex items-center gap-4 text-base font-medium sm:text-lg">
                      {row.value}
                      <span
                        aria-hidden="true"
                        className="text-accent-on-ink transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                      >
                        ↗
                      </span>
                    </span>
                  </a>
                </Reveal>
              ))}
              <div className="border-t border-paper/15" />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
