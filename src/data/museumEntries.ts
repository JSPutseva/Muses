export type Lang = "en" | "fr" | "ru";

export interface MuseumEntry {
  lines: Record<Lang, string[]>;
}

// Placeholder copy — swap per entry/language for real content later.
export const museumEntries: MuseumEntry[] = [
  {
    lines: {
      en: ["Calliope"],
      fr: ["Calliope"],
      ru: ["Каллиопа"],
    },
  },
  {
    lines: {
      en: ["Melpomene"],
      fr: ["Melpomène"],
      ru: ["Мельпомена"],
    },
  },
  {
    lines: {
      en: ["Euterpe"],
      fr: ["Euterpe"],
      ru: ["Эвтерпа"],
    },
  },
];

export const languageOrder: Lang[] = ["en", "fr", "ru"];
