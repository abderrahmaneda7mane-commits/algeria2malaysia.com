import { useState, useRef, useEffect } from "react";
import { Menu, X, Search, Calendar, ChevronDown, GraduationCap, BookOpen } from "lucide-react";
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
  { code: "ar", flag: "🇩🇿", label: "العربية" },
  { code: "en", flag: "🇬🇧", label: "English" },
  { code: "fr", flag: "🇫🇷", label: "Français" },
];

function LangDropdown() {
  const { lang, setLang } = useLanguage();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const current = LANGS.find(l => l.code === lang)!;

  useEffect(() => {
    function close(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("mousedown", close);
    return () => document.removeEventListener("mousedown", close);
  }, []);

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-gray-200 hover:border-green-300 bg-white hover:bg-green-50 text-sm font-medium text-gray-600 hover:text-green-700 transition-all"
      >
        <span className="text-base leading-none">{current.flag}</span>
        <span className="text-xs font-bold uppercase">{lang.toUpperCase()}</span>
        <ChevronDown size={13} className={`transition-transform ${open ? "rotate-180" : ""}`} />
      </button>

      {open && (
        <div className="absolute top-full mt-1.5 bg-white rounded-xl border border-gray-200 shadow-lg py-1 z-50 min-w-[140px] right-0">
          {LANGS.map(({ code, flag, label }) => (
            <button
              key={code}
              onClick={() => { setLang(code); setOpen(false); }}
              className={`w-full flex items-center gap-2.5 px-3 py-2.5 text-sm transition-colors ${
                lang === code
                  ? "bg-green-50 text-green-700 font-semibold"
                  : "text-gray-700 hover:bg-gray-50"
              }`}
            >
              <span className="text-base">{flag}</span>
              <span>{label}</span>
              {lang === code && <span className="mr-auto text-green-500 text-xs">✓</span>}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const { t, lang, setLang } = useLanguage();

  const navLinks: { labelKey: keyof typeof T.nav; sectionId: string | null; page: "universities" | null }[] = [
    { labelKey: "home",         sectionId: "hero",       page: null },
    { labelKey: "about",        sectionId: "about",      page: null },
    { labelKey: "services",     sectionId: "services",   page: null },
    { labelKey: "universities", sectionId: null,         page: "universities" },
    { labelKey: "institutes",   sectionId: "institutes", page: null },
    { labelKey: "contact",      sectionId: "contact",    page: null },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-gray-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6" style={{ height: "68px" }}>
        <div className="flex items-center justify-between h-full gap-4">

          {/* ── Logo ── */}
          <div
            className="flex items-center gap-2.5 cursor-pointer flex-shrink-0"
            onClick={() => handleNavLink("hero", null)}
          >
            <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-green-400 shadow bg-white flex-shrink-0">
              <img src="/logo-hq.jpg" alt="Algeria2Malaysia" className="w-full h-full object-contain" />
            </div>
            <div className="hidden sm:block">
              <div className="text-green-800 font-extrabold text-[15px] leading-tight tracking-tight">Algeria2Malaysia</div>
              <div className="text-green-500 text-[10px] font-medium leading-none mt-0.5">الجزائر إلى ماليزيا</div>
            </div>
          </div>

          {/* ── Desktop nav links ── */}
          <div className="hidden lg:flex items-center gap-0.5 flex-1 justify-center">
            {navLinks.map((l) => (
              <button
                key={l.labelKey}
                onClick={() => handleNavLink(l.sectionId, l.page)}
                className="text-[13px] text-gray-600 hover:text-green-700 font-medium px-2.5 py-1.5 rounded-lg hover:bg-green-50 transition-all"
              >
                {t(T.nav[l.labelKey])}
              </button>
            ))}
          </div>

          {/* ── Desktop actions ── */}
          <div className="hidden md:flex items-center gap-2 flex-shrink-0">
            <LangDropdown />

            <div className="w-px h-5 bg-gray-200 mx-1" />

            <button
              onClick={() => navigate("search")}
              title={t(T.nav.search)}
              className="w-9 h-9 flex items-center justify-center rounded-full border border-gray-200 text-gray-500 hover:text-green-700 hover:border-green-300 hover:bg-green-50 transition-all"
            >
              <Search size={16} />
            </button>

            <button
              onClick={() => navigate("consultation")}
              className="flex items-center gap-1.5 border border-green-600 text-green-700 hover:bg-green-700 hover:text-white px-3.5 py-2 rounded-full text-[13px] font-semibold transition-all"
            >
              <Calendar size={14} />
              <span>{t(T.nav.consult)}</span>
            </button>

            <button
              onClick={() => handleNavLink("apply", null)}
              className="bg-green-700 text-white px-4 py-2 rounded-full text-[13px] font-bold hover:bg-green-800 transition-colors shadow-sm"
            >
              {t(T.nav.start)}
            </button>
          </div>

          {/* ── Mobile: lang + hamburger ── */}
          <div className="md:hidden flex items-center gap-2">
            <div className="flex items-center gap-1 bg-gray-100 rounded-full p-0.5">
              {LANGS.map(({ code, flag }) => (
                <button
                  key={code}
                  onClick={() => setLang(code)}
                  className={`flex items-center justify-center w-7 h-7 rounded-full text-sm transition-all ${
                    lang === code ? "bg-white shadow text-green-700" : "text-gray-500"
                  }`}
                  title={code.toUpperCase()}
                >
                  {flag}
                </button>
              ))}
            </div>
            <button
              onClick={() => setOpen(!open)}
              className="w-9 h-9 flex items-center justify-center text-gray-700 hover:bg-gray-100 rounded-full transition-colors"
            >
              {open ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </div>

      {/* ── Mobile drawer ── */}
      {open && (
        <div className="md:hidden bg-white border-t border-gray-100 shadow-lg">
          {/* Quick actions */}
          <div className="grid grid-cols-2 gap-2 px-4 pt-4 pb-3 border-b border-gray-100">
            <button
              onClick={() => { setOpen(false); navigate("search"); }}
              className="flex items-center gap-2 bg-gray-50 border border-gray-200 text-gray-700 px-3 py-2.5 rounded-xl text-sm font-medium justify-center"
            >
              <Search size={15} />
              {t(T.nav.search)}
            </button>
            <button
              onClick={() => { setOpen(false); navigate("consultation"); }}
              className="flex items-center gap-2 bg-green-50 border border-green-200 text-green-700 px-3 py-2.5 rounded-xl text-sm font-semibold justify-center"
            >
              <Calendar size={15} />
              {t(T.nav.consult)}
            </button>
          </div>

          {/* Nav links */}
          <div className="px-4 py-2">
            {navLinks.map((l) => (
              <button
                key={l.labelKey}
                onClick={() => handleNavLink(l.sectionId, l.page, () => setOpen(false))}
                className="w-full flex items-center gap-3 py-2.5 text-sm text-gray-700 hover:text-green-700 border-b border-gray-50 last:border-0"
              >
                {l.labelKey === "universities" && <GraduationCap size={16} className="text-gray-400" />}
                {l.labelKey === "institutes" && <BookOpen size={16} className="text-gray-400" />}
                <span className="font-medium">{t(T.nav[l.labelKey])}</span>
              </button>
            ))}
          </div>

          {/* CTA */}
          <div className="px-4 pb-4 pt-2">
            <button
              onClick={() => { setOpen(false); handleNavLink("apply", null); }}
              className="w-full bg-green-700 text-white py-3 rounded-xl text-sm font-bold hover:bg-green-800 transition-colors text-center"
            >
              {t(T.nav.start)} →
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}
