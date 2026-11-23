import { useEffect } from "react";
import { MotionConfig } from "motion/react";
import {
  HashRouter,
  Navigate,
  Route,
  Routes,
  useLocation,
} from "react-router-dom";
import { Layout } from "./components/Layout";
import { DocsProvider } from "./context/DocsContext";
import { ThemeProvider } from "./context/ThemeContext";
import { DocsPage } from "./pages/DocsPage";
import { Home } from "./pages/Home";

function ScrollManager() {
  const location = useLocation();

  useEffect(() => {
    const target = (location.state as { scrollTo?: string } | null)?.scrollTo;

    if (!target) {
      window.scrollTo(0, 0);
      return;
    }

    // The target page may still be mounting behind the exit animation,
    // so keep looking for the element for a few frames.
    let frame = 0;
    let raf = 0;

    const tryScroll = () => {
      const element = document.getElementById(target);

      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
        return;
      }

      if (frame < 45) {
        frame += 1;
        raf = requestAnimationFrame(tryScroll);
      }
    };

    raf = requestAnimationFrame(tryScroll);
    return () => cancelAnimationFrame(raf);
  }, [location.pathname, location.state]);

  return null;
}

export default function App() {
  return (
    <MotionConfig reducedMotion="user">
      <ThemeProvider>
        <DocsProvider>
          <HashRouter>
            <ScrollManager />
            <Routes>
              <Route element={<Layout />}>
                <Route index element={<Home />} />
                <Route path="docs" element={<DocsPage />} />
                <Route path="*" element={<Navigate to="/" replace />} />
              </Route>
            </Routes>
          </HashRouter>
        </DocsProvider>
      </ThemeProvider>
    </MotionConfig>
  );
}
