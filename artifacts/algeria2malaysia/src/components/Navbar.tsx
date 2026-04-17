import { useState } from "react";
import { Menu, X, Search, Calendar } from "lucide-react";
import { useNavigate, getNavState, navigate } from "../hooks/useNavigate";
import { useLanguage } from "../i18n/LanguageContext";
import { translations as T } from "../i18n/translations";
import type { Lang } from "../i18n/translations";

function scrollToSection(sectionId: string) {
  const el = document.getElementById(sectionId);
  if (el) el.scrollIntoView({ behavior: "smooth" });
}

function handleNavLink(sectionId: string | null, page: "universities" | null, closeMobile?: () => void) {
  if (closeMobile) closeMobile();
  if (page) { navigate(page); return; }
  if (!sectionId) return;
  const { page: currentPage } = getNavState();
  if (currentPage === "home") scrollToSection(sectionId);
  else navigate("home", { scrollTo: sectionId });
}

const LANGS: { code: Lang; flag: string; label: string }[] = [
  { code: "ar", flag: "🇩🇿", label: "AR" },
  { code: "en", flag: "🇬🇧", label: "EN" },
  { code: "fr", flag: "🇫🇷", label: "FR" },
];

function LangSwitcher({ mobile }: { mobile?: boolean }) {
  const { lang, setLang } = useLanguage();
  return (
    <div className={`flex items-center gap-1 ${mobile ? "justify-center" : ""}`}>
      {LANGS.map(({ code, flag, label }) => (
        <button
          key={code}
          onClick={() => setLang(code)}
          className={`flex items-center gap-0.5 px-2 py-1 rounded-full text-xs font-bold transition-all ${
            lang === code
              ? "bg-green-700 text-white shadow-sm"
              : "text-gray-500 hover:bg-green-50 hover:text-green-700"
          }`}
          title={label}
        >
          <span>{flag}</span>
          <span className="hidden sm:inline ml-0.5">{label}</span>
        </button>
      ))}
    </div>
  );
}

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const { t } = useLanguage();

  const links: { labelKey: keyof typeof T.nav; sectionId: string | null; page: "universities" | null }[] = [
    { labelKey: "home",         sectionId: "hero",       page: null },
    { labelKey: "about",        sectionId: "about",      page: null },
    { labelKey: "services",     sectionId: "services",   page: null },
    { labelKey: "universities", sectionId: null,         page: "universities" },
    { labelKey: "institutes",   sectionId: "institutes", page: null },
    { labelKey: "contact",      sectionId: "contact",    page: null },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/97 backdrop-blur-sm border-b border-green-100 shadow-sm">
      <div className="max-w-6xl mx-auto px-4 h-18 flex items-center justify-between" style={{ height: "72px" }}>
        {/* Logo */}
        <div className="flex items-center gap-3 cursor-pointer flex-shrink-0" onClick={() => handleNavLink("hero", null)}>
          <div className="flex-shrink-0 w-14 h-14 rounded-full overflow-hidden border-2 border-green-400 shadow-lg bg-white p-0.5" style={{ width: 56, height: 56 }}>
            <img src="/logo-hq.jpg" alt="Algeria2Malaysia" className="w-full h-full object-contain rounded-full" />
          </div>
          <div>
            <div className="text-green-800 font-extrabold text-base leading-tight tracking-tight">Algeria2Malaysia</div>
            <div className="text-green-500 text-[11px] font-medium">الجزائر إلى ماليزيا</div>
          </div>
        </div>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-5">
          {links.map((l) => (
            <button
              key={l.labelKey}
              onClick={() => handleNavLink(l.sectionId, l.page)}
              className="text-sm text-gray-700 hover:text-green-700 font-medium transition-colors"
            >
              {t(T.nav[l.labelKey])}
            </button>
          ))}
          <LangSwitcher />
          <button
            onClick={() => navigate("search")}
            className="flex items-center gap-1.5 border border-gray-200 text-gray-600 hover:text-green-700 hover:border-green-300 bg-gray-50 hover:bg-green-50 px-4 py-2 rounded-full text-sm font-medium transition-all"
          >
            <Search size={15} />
            <span>{t(T.nav.search)}</span>
          </button>
          <button
            onClick={() => navigate("consultation")}
            className="flex items-center gap-1.5 border border-green-600 text-green-700 hover:bg-green-700 hover:text-white px-4 py-2 rounded-full text-sm font-semibold transition-all"
          >
            <Calendar size={15} />
            <span>{t(T.nav.consult)}</span>
          </button>
          <button
            onClick={() => handleNavLink("apply", null)}
            className="bg-green-700 text-white px-5 py-2.5 rounded-full text-sm font-bold hover:bg-green-800 transition-colors shadow-sm"
          >
            {t(T.nav.start)}
          </button>
        </div>

        <button
          className="md:hidden text-green-800 p-2"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {open && (
        <div className="md:hidden bg-white border-t border-green-100 px-4 py-4 flex flex-col gap-3">
          <LangSwitcher mobile />
          <button
            onClick={() => { setOpen(false); navigate("search"); }}
            className="flex items-center gap-2 border border-green-200 text-green-700 bg-green-50 px-4 py-2.5 rounded-full text-sm font-semibold justify-center"
          >
            <Search size={15} />
            {t(T.nav.search)}
          </button>
          {links.map((l) => (
            <button
              key={l.labelKey}
              onClick={() => handleNavLink(l.sectionId, l.page, () => setOpen(false))}
              className="text-sm text-gray-700 hover:text-green-700 font-medium py-2 border-b border-gray-100 text-right"
            >
              {t(T.nav[l.labelKey])}
            </button>
          ))}
          <button
            onClick={() => { setOpen(false); navigate("consultation"); }}
            className="flex items-center justify-center gap-2 border border-green-600 text-green-700 px-5 py-2.5 rounded-full text-sm font-semibold text-center hover:bg-green-700 hover:text-white transition-all"
          >
            <Calendar size={15} />
            {t(T.nav.consult)} — 30 min
          </button>
          <button
            onClick={() => { setOpen(false); handleNavLink("apply", null); }}
            className="bg-green-700 text-white px-5 py-3 rounded-full text-sm font-bold text-center hover:bg-green-800 transition-colors"
          >
            {t(T.nav.start)}
          </button>
        </div>
      )}
    </nav>
  );
}
