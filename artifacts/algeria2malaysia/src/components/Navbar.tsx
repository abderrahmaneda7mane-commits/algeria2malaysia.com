import { useState, useEffect, useRef } from "react";
import { Menu, X, Search, Building2, BookOpen, Home, ChevronDown, Sparkles } from "lucide-react";
import { useNavigate, type Page, PAGE_TO_URL, subscribeNavForceScrolled, getNavForceScrolled } from "../hooks/useNavigate";

const WA = "https://wa.me/601112200603";

interface NavItem {
  label: string;
  page?: Page;
  href?: string;
  icon?: React.ReactNode;
  children?: { label: string; page?: Page; href?: string; desc?: string }[];
}

const NAV_ITEMS: NavItem[] = [
  { label: "الرئيسية", page: "home", icon: <Home size={14} /> },
  {
    label: "الجامعات",
    icon: <Building2 size={14} />,
    children: [
      { label: "كل الجامعات", page: "universities", desc: "12 جامعة معتمدة" },
      { label: "مقارنة الجامعات", page: "compare", desc: "قارن حتى 3 جامعات" },
    ],
  },
  {
    label: "المعاهد",
    icon: <BookOpen size={14} />,
    children: [
      { label: "كل المعاهد", page: "institutes", desc: "6 معاهد معتمدة" },
    ],
  },
  { label: "بحث شامل", page: "search", icon: <Search size={14} /> },
  { label: "المقالات", page: "blog" },
];

export default function Navbar() {
  const { go } = useNavigate();
  const [scrolled, setScrolled] = useState(false);
  const [forceScrolled, setForceScrolled] = useState(getNavForceScrolled);
  const [visible, setVisible] = useState(true);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const lastY = useRef(0);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 24);
      setVisible(y < lastY.current || y < 80);
      lastY.current = y;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    return subscribeNavForceScrolled(() => setForceScrolled(getNavForceScrolled()));
  }, []);

  useEffect(() => {
    const close = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setOpenDropdown(null);
      }
    };
    document.addEventListener("mousedown", close);
    return () => document.removeEventListener("mousedown", close);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  function handleNav(item: { page?: Page; href?: string }) {
    if (item.href) window.open(item.href, "_blank", "noopener noreferrer");
    else if (item.page) go(item.page);
    setMobileOpen(false);
    setOpenDropdown(null);
  }

  const isScrolled = forceScrolled || scrolled;

  return (
    <>
      <nav
        dir="rtl"
        className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
          visible ? "translate-y-0" : "-translate-y-full"
        } ${
          isScrolled
            ? "bg-white/96 backdrop-blur-xl shadow-[0_1px_0_rgba(0,0,0,.06),0_4px_20px_-4px_rgba(0,0,0,.08)]"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">

            {/* Logo */}
            <a href="/" onClick={(e) => { e.preventDefault(); go("home"); }} className="flex items-center gap-2.5 group flex-shrink-0">
              <div className="relative flex-shrink-0">
                <div className="absolute inset-0 rounded-full bg-green-400/25 scale-150 opacity-0 group-hover:opacity-100 blur-md transition-all duration-300" />
                <img
                  src="/logo-hq.jpg"
                  alt="Algeria2Malaysia"
                  className={`relative w-10 h-10 rounded-full object-cover transition-all duration-300 ${
                    isScrolled ? "ring-2 ring-green-500/30" : "ring-2 ring-white/40"
                  }`}
                />
              </div>
              <div className="hidden sm:flex sm:flex-col sm:justify-center">
                <div className={`font-extrabold text-[15px] leading-tight transition-colors ${isScrolled ? "text-gray-900" : "text-white"}`}>
                  Algeria2Malaysia
                </div>
                <div className={`text-[10px] tracking-widest uppercase font-semibold transition-colors ${isScrolled ? "text-green-600" : "text-green-200"}`}>
                  الجزائر · ماليزيا
                </div>
              </div>
            </a>

            {/* Desktop Nav */}
            <div ref={dropdownRef} className="hidden lg:flex items-center gap-0.5">
              {NAV_ITEMS.map((item) => (
                <div key={item.label} className="relative">
                  {item.children ? (
                    <button
                      onClick={() => setOpenDropdown(openDropdown === item.label ? null : item.label)}
                      className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-sm font-semibold transition-all duration-200 ${
                        openDropdown === item.label
                          ? isScrolled ? "bg-green-50 text-green-700" : "bg-white/15 text-white"
                          : isScrolled
                          ? "text-gray-700 hover:text-green-700 hover:bg-green-50"
                          : "text-white/90 hover:text-white hover:bg-white/12"
                      }`}
                    >
                      {item.label}
                      <ChevronDown size={13} className={`transition-transform duration-200 ${openDropdown === item.label ? "rotate-180" : ""}`} />
                    </button>
                  ) : (
                    <a
                      href={item.page ? PAGE_TO_URL[item.page] : item.href ?? "/"}
                      onClick={(e) => { e.preventDefault(); handleNav(item); }}
                      className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-sm font-semibold transition-all duration-200 ${
                        isScrolled
                          ? "text-gray-700 hover:text-green-700 hover:bg-green-50"
                          : "text-white/90 hover:text-white hover:bg-white/12"
                      }`}
                    >
                      {item.label}
                    </a>
                  )}

                  {item.children && openDropdown === item.label && (
                    <div className="absolute top-full right-0 mt-2 w-60 bg-white rounded-2xl shadow-[0_8px_30px_-4px_rgba(0,0,0,.12),0_2px_8px_-2px_rgba(0,0,0,.06)] border border-gray-100/80 overflow-hidden animate-fade-in-down">
                      <div className="p-2">
                        {item.children.map((child) => (
                          <a
                            key={child.label}
                            href={child.page ? PAGE_TO_URL[child.page] : child.href ?? "/"}
                            onClick={(e) => { e.preventDefault(); handleNav(child); }}
                            className="w-full text-right px-3.5 py-2.5 rounded-xl hover:bg-green-50 transition-colors group flex items-center justify-between gap-3"
                          >
                            <span className="text-sm font-semibold text-gray-800 group-hover:text-green-700 transition-colors">{child.label}</span>
                            {child.desc && <span className="text-xs text-gray-400 group-hover:text-green-500 transition-colors flex-shrink-0">{child.desc}</span>}
                          </a>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Desktop CTAs */}
            <div className="hidden lg:flex items-center gap-2">
              <a
                href={WA}
                target="_blank"
                rel="noopener noreferrer"
                className={`text-sm font-semibold px-4 py-2 rounded-full transition-all duration-200 ${
                  isScrolled ? "text-gray-600 hover:text-green-700 hover:bg-green-50" : "text-white/85 hover:text-white hover:bg-white/12"
                }`}
              >
                واتساب
              </a>
              <a
                href={PAGE_TO_URL["consultation"]}
                onClick={(e) => { e.preventDefault(); go("consultation"); }}
                className="flex items-center gap-1.5 bg-green-600 hover:bg-green-700 text-white text-sm font-bold px-5 py-2.5 rounded-full shadow-[0_4px_14px_-2px_rgba(22,163,74,.40)] hover:shadow-[0_6px_20px_-2px_rgba(22,163,74,.50)] hover:-translate-y-0.5 transition-all duration-200"
              >
                <Sparkles size={13} />
                استشارة مجانية
              </a>
            </div>

            {/* Mobile toggle */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className={`lg:hidden w-10 h-10 rounded-xl flex items-center justify-center transition-all ${
                isScrolled ? "text-gray-700 hover:bg-gray-100" : "text-white hover:bg-white/15"
              }`}
            >
              {mobileOpen ? <X size={21} /> : <Menu size={21} />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Drawer */}
      <div className={`fixed inset-0 z-40 lg:hidden transition-all duration-300 ${mobileOpen ? "pointer-events-auto" : "pointer-events-none"}`}>
        <div
          className={`absolute inset-0 bg-black/45 backdrop-blur-sm transition-opacity duration-300 ${mobileOpen ? "opacity-100" : "opacity-0"}`}
          onClick={() => setMobileOpen(false)}
        />
        <div
          dir="rtl"
          className={`absolute top-0 right-0 h-full w-80 max-w-[calc(100vw-3rem)] bg-white shadow-2xl transition-transform duration-300 flex flex-col ${mobileOpen ? "translate-x-0" : "translate-x-full"}`}
        >
          <div className="flex items-center justify-between px-5 h-16 border-b border-gray-100 flex-shrink-0">
            <a href="/" onClick={(e) => { e.preventDefault(); go("home"); setMobileOpen(false); }} className="flex items-center gap-3">
              <img src="/logo-hq.jpg" alt="Logo" className="w-9 h-9 rounded-full object-cover ring-2 ring-green-500/30" />
              <span className="font-extrabold text-gray-900 text-[15px]">Algeria2Malaysia</span>
            </a>
            <button onClick={() => setMobileOpen(false)} className="w-9 h-9 rounded-xl bg-gray-100 flex items-center justify-center text-gray-500 hover:bg-gray-200 transition-colors">
              <X size={17} />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto py-3 px-3">
            {NAV_ITEMS.map((item) => (
              <div key={item.label}>
                {item.children ? (
                  <>
                    <div className="px-4 pt-4 pb-1 text-[11px] font-bold text-gray-400 uppercase tracking-widest">{item.label}</div>
                    {item.children.map((child) => (
                      <a
                        key={child.label}
                        href={child.page ? PAGE_TO_URL[child.page] : child.href ?? "/"}
                        onClick={(e) => { e.preventDefault(); handleNav(child); }}
                        className="w-full text-right px-4 py-2.5 rounded-xl text-sm font-semibold text-gray-700 hover:bg-green-50 hover:text-green-700 transition-colors flex items-center justify-between"
                      >
                        <span>{child.label}</span>
                        {child.desc && <span className="text-xs text-gray-400">{child.desc}</span>}
                      </a>
                    ))}
                  </>
                ) : (
                  <a
                    href={item.page ? PAGE_TO_URL[item.page] : item.href ?? "/"}
                    onClick={(e) => { e.preventDefault(); handleNav(item); }}
                    className="w-full text-right px-4 py-3 rounded-xl text-sm font-semibold text-gray-700 hover:bg-green-50 hover:text-green-700 transition-colors flex items-center gap-2"
                  >
                    <span className="text-gray-400">{item.icon}</span>
                    {item.label}
                  </a>
                )}
              </div>
            ))}
          </div>

          <div className="p-4 border-t border-gray-100 space-y-2.5 flex-shrink-0">
            <a
              href={PAGE_TO_URL["consultation"]}
              onClick={(e) => { e.preventDefault(); go("consultation"); setMobileOpen(false); }}
              className="w-full block text-center bg-green-600 hover:bg-green-700 text-white font-bold py-3 rounded-full text-sm transition-all shadow-[0_4px_14px_-2px_rgba(22,163,74,.35)]"
            >
              استشارة مجانية
            </a>
            <a
              href={WA}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full flex items-center justify-center gap-2 bg-gray-100 hover:bg-gray-200 text-gray-800 font-semibold py-3 rounded-full text-sm transition-all"
            >
              واتساب
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
