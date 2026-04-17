import { createContext, useContext, useState, useEffect } from "react";
import type { Lang } from "./translations";

interface LangCtx {
  lang: Lang;
  setLang: (l: Lang) => void;
  dir: "rtl" | "ltr";
  t: (obj: Record<Lang, string>) => string;
}

const Ctx = createContext<LangCtx>({
  lang: "ar",
  setLang: () => {},
  dir: "rtl",
  t: (obj) => obj.ar,
});

const STORAGE_KEY = "a2m_lang";

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = useState<Lang>(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    return (saved === "en" || saved === "fr" || saved === "ar") ? saved : "ar";
  });

  function setLang(l: Lang) {
    setLangState(l);
    localStorage.setItem(STORAGE_KEY, l);
  }

  const dir: "rtl" | "ltr" = lang === "ar" ? "rtl" : "ltr";

  useEffect(() => {
    document.documentElement.setAttribute("dir", dir);
    document.documentElement.setAttribute("lang", lang);
  }, [lang, dir]);

  function t(obj: Record<Lang, string>): string {
    return obj[lang] ?? obj.ar;
  }

  return (
    <Ctx.Provider value={{ lang, setLang, dir, t }}>
      {children}
    </Ctx.Provider>
  );
}

export function useLanguage() {
  return useContext(Ctx);
}
