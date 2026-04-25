import { useState } from "react";
import { Menu, X, Search, Calendar, GraduationCap, BookOpen } from "lucide-react";
import { useNavigate, getNavState, navigate } from "../hooks/useNavigate";

const NAV_LINKS = [
  { label: "الرئيسية",   sectionId: "hero",       page: null },
  { label: "من نحن",     sectionId: "about",      page: null },
  { label: "خدماتنا",   sectionId: "services",   page: null },
  { label: "الجامعات",  sectionId: null,          page: "universities" as const },
  { label: "المعاهد",   sectionId: "institutes",  page: null },
  { label: "تواصل معنا",sectionId: "contact",     page: null },
];

function scrollToSection(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
}

function handleNavLink(sectionId: string | null, page: "universities" | null, onClose?: () => void) {
  onClose?.();
  if (page) { navigate(page); return; }
  if (!sectionId) return;
  const { page: cur } = getNavState();
  if (cur === "home") scrollToSection(sectionId);
  else navigate("home", { scrollTo: sectionId });
}

export default function Navbar() {
  const [open, setOpen] = useState(false);
  useNavigate();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-gray-100 shadow-sm" dir="rtl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-[70px] flex items-center justify-between gap-4">

        {/* ── Logo ── */}
        <div
          className="flex items-center gap-3 cursor-pointer flex-shrink-0 group"
          onClick={() => handleNavLink("hero", null)}
        >
          <div className="w-14 h-14 flex-shrink-0 group-hover:scale-105 transition-transform">
            <img src="/logo-hq.jpg" alt="Algeria2Malaysia" className="w-full h-full object-contain drop-shadow-sm" />
          </div>
          <div className="hidden sm:flex flex-col">
            <span className="text-green-800 font-extrabold text-[16px] leading-snug tracking-tight">Algeria2Malaysia</span>
            <span className="text-green-500 text-[11px] font-semibold leading-none tracking-wide">الجزائر إلى ماليزيا</span>
          </div>
        </div>

        {/* ── Desktop nav links ── */}
        <div className="hidden lg:flex items-center gap-0.5 flex-1 justify-center">
          {NAV_LINKS.map((l) => (
            <button
              key={l.label}
              onClick={() => handleNavLink(l.sectionId, l.page)}
              className="text-[13.5px] text-gray-600 hover:text-green-700 font-medium px-3 py-1.5 rounded-lg hover:bg-green-50 transition-all whitespace-nowrap"
            >
              {l.label}
            </button>
          ))}
        </div>

        {/* ── Desktop action buttons ── */}
        <div className="hidden md:flex items-center gap-2 flex-shrink-0">
          <button
            onClick={() => navigate("search")}
            title="ابحث عن تخصص"
            className="w-9 h-9 flex items-center justify-center rounded-full border border-gray-200 text-gray-500 hover:text-green-700 hover:border-green-300 hover:bg-green-50 transition-all"
          >
            <Search size={16} />
          </button>

          <button
            onClick={() => navigate("consultation")}
            className="flex items-center gap-1.5 border border-green-600 text-green-700 hover:bg-green-700 hover:text-white px-4 py-2 rounded-full text-[13px] font-semibold transition-all"
          >
            <Calendar size={14} />
            <span>استشارة مجانية</span>
          </button>

          <button
            onClick={() => handleNavLink("apply", null)}
            className="bg-green-700 text-white px-5 py-2 rounded-full text-[13px] font-bold hover:bg-green-800 transition-colors shadow-sm"
          >
            ابدأ الآن
          </button>
        </div>

        {/* ── Mobile hamburger ── */}
        <button
          onClick={() => setOpen(!open)}
          className="md:hidden w-9 h-9 flex items-center justify-center text-gray-700 hover:bg-gray-100 rounded-full transition-colors"
        >
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* ── Mobile drawer ── */}
      {open && (
        <div className="md:hidden bg-white border-t border-gray-100 shadow-lg" dir="rtl">
          {/* Quick actions */}
          <div className="grid grid-cols-2 gap-2 px-4 pt-4 pb-3 border-b border-gray-100">
            <button
              onClick={() => { setOpen(false); navigate("search"); }}
              className="flex items-center gap-2 bg-gray-50 border border-gray-200 text-gray-700 px-3 py-2.5 rounded-xl text-sm font-medium justify-center"
            >
              <Search size={15} />
              بحث تخصص
            </button>
            <button
              onClick={() => { setOpen(false); navigate("consultation"); }}
              className="flex items-center gap-2 bg-green-50 border border-green-200 text-green-700 px-3 py-2.5 rounded-xl text-sm font-semibold justify-center"
            >
              <Calendar size={15} />
              استشارة مجانية
            </button>
          </div>

          {/* Nav links */}
          <div className="px-4 py-2">
            {NAV_LINKS.map((l) => (
              <button
                key={l.label}
                onClick={() => handleNavLink(l.sectionId, l.page, () => setOpen(false))}
                className="w-full flex items-center gap-3 py-2.5 text-sm text-gray-700 hover:text-green-700 border-b border-gray-50 last:border-0 text-right"
              >
                {l.page === "universities" && <GraduationCap size={16} className="text-gray-400 flex-shrink-0" />}
                {l.label === "المعاهد" && <BookOpen size={16} className="text-gray-400 flex-shrink-0" />}
                <span className="font-medium">{l.label}</span>
              </button>
            ))}
          </div>

          {/* CTA */}
          <div className="px-4 pb-4 pt-2">
            <button
              onClick={() => { setOpen(false); handleNavLink("apply", null); }}
              className="w-full bg-green-700 text-white py-3 rounded-xl text-sm font-bold hover:bg-green-800 transition-colors"
            >
              ابدأ الآن ←
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}
