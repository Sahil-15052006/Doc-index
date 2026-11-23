import { createContext, useContext, useMemo, type ReactNode } from "react";
import { docs as allDocs, type Doc } from "../data/docs";

type DocsContextValue = {
  docs: Doc[];
  featured: Doc[];
  categories: string[];
};

const DocsContext = createContext<DocsContextValue | null>(null);

export function DocsProvider({ children }: { children: ReactNode }) {
  const value = useMemo<DocsContextValue>(() => {
    const featured = allDocs.filter((doc) => doc.featured).slice(0, 3);
    const categories = [...new Set(allDocs.map((doc) => doc.field))];

    return {
      docs: allDocs,
      featured: featured.length > 0 ? featured : allDocs.slice(0, 3),
      categories,
    };
  }, []);

  return <DocsContext.Provider value={value}>{children}</DocsContext.Provider>;
}

export function useDocs() {
  const context = useContext(DocsContext);

  if (!context) {
    throw new Error("useDocs must be used inside a <DocsProvider>");
  }

  return context;
}
