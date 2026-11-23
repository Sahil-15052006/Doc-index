import { AnimatePresence, motion } from "motion/react";
import {
  Link,
  NavLink,
  useLocation,
  useNavigate,
  useOutlet,
} from "react-router-dom";
import { site } from "../data/site";
import { EASE, spring } from "../lib/animations";
import { ScrollProgress } from "./ScrollProgress";
import { ThemeToggle } from "./ThemeToggle";

const navBase =
  "relative px-2 py-2 font-mono text-[11px] font-medium uppercase tracking-[0.16em] transition-colors sm:px-3";

function NavItem({
  to,
  label,
  end = false,
}: {
  to: string;
  label: string;
  end?: boolean;
}) {
  return (
    <NavLink
      to={to}
      end={end}
      className={({ isActive }) =>
        `${navBase} ${
          isActive
            ? "text-ink"
            : "text-ink/65 hover:text-ink"
        }`
      }
    >
      {({ isActive }) => (
        <>
          {isActive && (
            <motion.span
              layoutId="nav-active"
              className="absolute inset-x-2 bottom-0 h-[2px] bg-accent"
              transition={spring}
            />
          )}
          <span className="relative z-10">{label}</span>
        </>
      )}
    </NavLink>
  );
}

export function Layout() {
  const location = useLocation();
  const navigate = useNavigate();
  const outlet = useOutlet();

  const goToContact = () => {
    if (location.pathname === "/") {
      document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
    } else {
      navigate("/", { state: { scrollTo: "contact" } });
    }
  };

  return (
    <div className="flex min-h-screen flex-col bg-paper text-ink">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:border focus:border-ink focus:bg-paper focus:px-4 focus:py-3 focus:font-mono focus:text-[11px] focus:font-medium focus:uppercase focus:tracking-[0.16em]"
      >
        Skip to content
      </a>

      <ScrollProgress />

      <header className="sticky top-0 z-50 border-b border-ink/15 bg-paper/95 backdrop-blur-md">
        <div className="mx-auto flex h-16 max-w-[1280px] items-center justify-between gap-3 px-5 sm:px-8">
          <Link
            to="/"
            className="group flex items-center gap-3"
          >
            <span
              aria-hidden="true"
              className="grid size-8 shrink-0 place-items-center border border-ink bg-ink font-mono text-[11px] font-medium text-paper transition-[transform,background-color,border-color,color] group-hover:scale-105 group-hover:border-accent group-hover:bg-accent group-hover:text-accent-ink group-active:scale-95"
            >
              DI
            </span>
            <span className="sr-only text-[13px] font-semibold uppercase tracking-[0.18em] sm:not-sr-only">
              {site.name}
            </span>
            <span className="sr-only">home</span>
          </Link>

          <div className="flex items-center gap-2">
            <nav className="flex items-center gap-0.5" aria-label="Main navigation">
              <NavItem to="/" label="Index" end />
              <NavItem to="/docs" label="Docs" />
              <button
                type="button"
                onClick={goToContact}
                className={`${navBase} text-ink/65 hover:text-ink`}
              >
                Contact
              </button>
            </nav>
            <span aria-hidden="true" className="mx-1 hidden h-5 w-px bg-ink/15 sm:block" />
            <ThemeToggle />
          </div>
        </div>
      </header>

      <main id="main" className="flex-1">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={location.pathname}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.3, ease: EASE }}
          >
            {outlet}
          </motion.div>
        </AnimatePresence>
      </main>

      <footer className="bg-ink text-paper">
        <div className="h-px w-full bg-paper/15" aria-hidden="true">
          <span className="block h-px w-24 bg-accent" />
        </div>

        <div className="mx-auto max-w-[1280px] px-5 sm:px-8">
          <div className="flex flex-col gap-8 py-10 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="font-mono text-[11px] font-medium uppercase tracking-[0.18em] text-paper/60">
                {site.name} — {site.role}
              </p>
              <p className="mt-2 text-xl font-semibold tracking-[-0.015em]">
                {site.owner}
              </p>
            </div>

            <nav
              className="flex flex-wrap gap-x-5 gap-y-2 font-mono text-[11px] font-medium uppercase tracking-[0.16em] text-paper/65"
              aria-label="Footer navigation"
            >
              <Link to="/" className="transition-colors hover:text-accent-on-ink">
                Index
              </Link>
              <Link to="/docs" className="transition-colors hover:text-accent-on-ink">
                Docs
              </Link>
              <button
                type="button"
                onClick={goToContact}
                className="uppercase transition-colors hover:text-accent-on-ink"
              >
                Contact
              </button>
              <a
                href={`mailto:${site.email}`}
                className="transition-colors hover:text-accent-on-ink"
              >
                Email
              </a>
            </nav>

            <div className="flex flex-col gap-3 sm:items-end">
              <p className="font-mono text-[11px] font-medium uppercase tracking-[0.16em] text-paper/65">
                © {new Date().getFullYear()} — {site.owner}
              </p>
              <button
                type="button"
                onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                className="inline-flex items-center gap-2 font-mono text-[11px] font-medium uppercase tracking-[0.16em] text-paper/65 transition-colors hover:text-accent-on-ink"
              >
                Back to top
                <span aria-hidden="true">↑</span>
              </button>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
