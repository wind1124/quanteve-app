import { create } from "zustand";

interface LangStore {
  lang: "zh_CN" | "en";
  changeLanguage: (lang: "zh_CN" | "en") => void;
  toggleLanguage: () => void;
}

export const useLanguageStore = create<LangStore>((set, get) => ({
  lang: "zh_CN", // en
  changeLanguage: (lang) => lang && set(() => ({ lang })),
  toggleLanguage: (val?: string) =>
    set(() => {
      const init = {
        lang: get().lang,
      };
      if (!val) return init;
      if (!["en", "zh_CN"].includes(val)) return init;
      return {
        lang: val,
      };
    }),
}));
