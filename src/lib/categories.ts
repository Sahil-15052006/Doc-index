export type CategoryTone = "accent" | "cobalt" | "acid" | "grape";

const fieldTones: Record<string, CategoryTone> = {
  troubleshooting: "accent",
  work: "cobalt",
  project: "acid",
};

export function getCategoryTone(field: string): CategoryTone {
  return fieldTones[field.trim().toLowerCase()] ?? "grape";
}

type ToneStyle = {
  chip: string;
  dot: string;
  bar: string;
};

export const toneStyles: Record<CategoryTone, ToneStyle> = {
  accent: {
    chip: "border-ink/20 text-ink/70",
    dot: "bg-accent",
    bar: "bg-accent",
  },
  cobalt: {
    chip: "border-ink/20 text-ink/70",
    dot: "bg-cobalt",
    bar: "bg-cobalt",
  },
  acid: {
    chip: "border-ink/20 text-ink/70",
    dot: "bg-acid",
    bar: "bg-acid",
  },
  grape: {
    chip: "border-ink/20 text-ink/70",
    dot: "bg-grape",
    bar: "bg-grape",
  },
};
