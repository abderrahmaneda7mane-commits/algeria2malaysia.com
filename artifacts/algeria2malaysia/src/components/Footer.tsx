import { useNavigate, Page } from "../hooks/useNavigate";
import { ArrowLeft, MessageCircle, Calendar } from "lucide-react";

const WA_LINK = "https://wa.me/601112200603";

interface FooterLink { label: string; page?: Page; href?: string; }

const UNIVERSITIES: FooterLink[] = [
  { label: "جامعة APU",        page: "apu" },
  { label: "جامعة تايلورز",    page: "taylors" },
  { label: "جامعة MMU",        page: "mmu" },
  { label: "جامعة UniKL",      page: "unikl" },
  { label: "جامعة UPM",        page: "upm" },
  { label: "جامعة لينكولن",    page: "lincoln" },
  { label: "جامعة UTP",        page: "utp" },
  { label: "جامعة UTM",        page: "utm" },
  { label: "جامعة UTeM",       page: "utem" },
  { label: "جامعة UCSI",       page: "ucsi" },
  { label: "جامعة CityU",      page: "cityu-courses" },
  { label: "جامعة سونواي",     page: "sunway" },
];

const INSTITUTES: FooterLink[] = [
  { label: "معهد ستراتفورد",   page: "stratford-institute" },
  { label: "معهد بيغ بان",     page: "bigben-institute" },
  { label: "معهد إيريكان",     page: "erican-institute" },
  { label: "معهد شيفيلد",      page: "sheffield-institute" },
  { label: "مركز برايت للغات", page: "bright-institute" },
];

const SERVICES: FooterLink[] = [
  { label: "استشارة مجانية",   page: "consultation" },
  { label: "عبّئ فورم المعهد",  page: "apply" },
  { label: "قارن الجامعات",     page: "compare" },
  { label: "بحث شامل",          page: "search" },
  { label: "مقالات ونصائح",     page: "blog" },
];

export default function Footer() {
  const { go } = useNavigate();

  function handleLink(link: FooterLink) {
    if (link.href) window.open(link.href, "_blank", "noopener noreferrer");
    else if (link.page) go(link.page);
  }

  return (
    <footer className="relative overflow-hidden" dir="rtl">
      {/* ── Background ── */}
      <div className="absolute inset-0 bg-[#0a1f12]" />
      <div className="absolute inset-0 bg-gradient-to-br from-green-950/80 via-[#0a1f12] to-gray-950/90" />
      {/* Subtle radial glow */}
      <div className="absolute top-0 right-1/4 w-[600px] h-[400px] bg-green-800/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-1/3 w-[400px] h-[300px] bg-emerald-900/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10">
        {/* ── CTA Strip ── */}
        <div className="border-b border-white/8">
          <div className="max-w-7xl mx-auto px-4 py-8 flex flex-col sm:flex-row items-center justify-between gap-5">
            <div>
              <p className="text-white font-bold text-lg mb-1">هل أنت جاهز للدراسة في ماليزيا؟</p>
              <p className="text-green-300/80 text-sm">احصل على استشارة مجانية وابدأ رحلتك اليوم</p>
            </div>
            <div className="flex gap-3 flex-shrink-0">
              <a
                href={WA_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 bg-green-500 hover:bg-green-400 text-white text-sm font-bold px-5 py-2.5 rounded-xl transition-all duration-200 shadow-[0_4px_16px_-2px_rgba(34,197,94,0.30)] hover:shadow-[0_6px_20px_-2px_rgba(34,197,94,0.40)] hover:-translate-y-0.5"
              >
                <MessageCircle size={15} />
                واتساب
              </a>
              <button
                onClick={() => go("consultation")}
                className="flex items-center gap-2 bg-white/10 hover:bg-white/18 text-white text-sm font-bold px-5 py-2.5 rounded-xl transition-all duration-200 border border-white/15 hover:border-white/25 hover:-translate-y-0.5"
              >
                <Calendar size={15} />
                احجز موعد
              </button>
            </div>
          </div>
        </div>

        {/* ── Main footer grid ── */}
        <div className="max-w-7xl mx-auto px-4 py-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-10">

            {/* Brand */}
            <div className="col-span-2 md:col-span-1">
              <button onClick={() => go("home")} className="flex items-center gap-3 mb-5 group">
                <div className="relative">
                  <div className="absolute inset-0 rounded-full bg-green-400/20 scale-125 opacity-0 group-hover:opacity-100 blur-sm transition-opacity duration-300" />
                  <img
                    src="/logo-hq.jpg"
                    alt="Algeria2Malaysia"
                    className="relative w-11 h-11 rounded-full object-cover ring-2 ring-green-500/40 group-hover:ring-green-400 transition-all"
                  />
                </div>
                <div className="text-right">
                  <div className="font-extrabold text-white text-[15px] leading-tight">Algeria2Malaysia</div>
                  <div className="text-green-400/80 text-[11px] tracking-widest uppercase">الجزائر · ماليزيا</div>
                </div>
              </button>
              <p className="text-gray-400/90 text-sm leading-relaxed mb-6">
                نساعد الطلاب الجزائريين على الدراسة في أفضل الجامعات والمعاهد الماليزية — من القبول حتى الوصول.
              </p>
              {/* Social proof badge */}
              <div className="inline-flex items-center gap-2 bg-green-900/40 border border-green-700/30 rounded-xl px-3 py-2 text-xs text-green-300">
                <div className="flex gap-0.5">
                  {[1,2,3,4,5].map(i => (
                    <svg key={i} className="w-3 h-3 fill-amber-400" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                    </svg>
                  ))}
                </div>
                <span>موثوق من الطلاب الجزائريين</span>
              </div>
            </div>

            {/* Universities */}
            <div>
              <h3 className="font-bold text-white/90 text-sm mb-4 flex items-center gap-2">
                <span className="w-1 h-4 bg-green-500 rounded-full block" />
                الجامعات
              </h3>
              <ul className="space-y-2">
                {UNIVERSITIES.slice(0, 7).map((l) => (
                  <li key={l.label}>
                    <button
                      onClick={() => handleLink(l)}
                      className="text-gray-400/90 hover:text-green-400 text-sm transition-colors duration-150 text-right w-full flex items-center gap-1.5 group"
                    >
                      <ArrowLeft size={10} className="opacity-0 group-hover:opacity-100 transition-all -translate-x-1 group-hover:translate-x-0 text-green-500 flex-shrink-0" />
                      {l.label}
                    </button>
                  </li>
                ))}
                <li>
                  <button
                    onClick={() => go("universities")}
                    className="text-green-500 hover:text-green-400 text-sm font-semibold transition-colors flex items-center gap-1.5 group mt-1"
                  >
                    <span>عرض كل الجامعات</span>
                    <ArrowLeft size={12} className="group-hover:-translate-x-0.5 transition-transform" />
                  </button>
                </li>
              </ul>
            </div>

            {/* Institutes */}
            <div>
              <h3 className="font-bold text-white/90 text-sm mb-4 flex items-center gap-2">
                <span className="w-1 h-4 bg-emerald-500 rounded-full block" />
                معاهد اللغة
              </h3>
              <ul className="space-y-2 mb-5">
                {INSTITUTES.map((l) => (
                  <li key={l.label}>
                    <button
                      onClick={() => handleLink(l)}
                      className="text-gray-400/90 hover:text-green-400 text-sm transition-colors duration-150 text-right w-full flex items-center gap-1.5 group"
                    >
                      <ArrowLeft size={10} className="opacity-0 group-hover:opacity-100 transition-all -translate-x-1 group-hover:translate-x-0 text-green-500 flex-shrink-0" />
                      {l.label}
                    </button>
                  </li>
                ))}
                <li>
                  <button
                    onClick={() => go("institutes")}
                    className="text-green-500 hover:text-green-400 text-sm font-semibold transition-colors flex items-center gap-1.5 group mt-1"
                  >
                    <span>عرض كل المعاهد</span>
                    <ArrowLeft size={12} className="group-hover:-translate-x-0.5 transition-transform" />
                  </button>
                </li>
              </ul>
            </div>

            {/* Services + Nav */}
            <div>
              <h3 className="font-bold text-white/90 text-sm mb-4 flex items-center gap-2">
                <span className="w-1 h-4 bg-teal-500 rounded-full block" />
                خدماتنا
              </h3>
              <ul className="space-y-2 mb-6">
                {SERVICES.map((l) => (
                  <li key={l.label}>
                    <button
                      onClick={() => handleLink(l)}
                      className="text-gray-400/90 hover:text-green-400 text-sm transition-colors duration-150 text-right w-full flex items-center gap-1.5 group"
                    >
                      <ArrowLeft size={10} className="opacity-0 group-hover:opacity-100 transition-all -translate-x-1 group-hover:translate-x-0 text-green-500 flex-shrink-0" />
                      {l.label}
                    </button>
                  </li>
                ))}
              </ul>

              <h3 className="font-bold text-white/90 text-sm mb-3 flex items-center gap-2">
                <span className="w-1 h-4 bg-sky-500 rounded-full block" />
                التنقل
              </h3>
              <ul className="space-y-2">
                {([
                  { label: "الصفحة الرئيسية", page: "home" as Page },
                  { label: "الجامعات",         page: "universities" as Page },
                  { label: "المعاهد",           page: "institutes" as Page },
                  { label: "المقالات",          page: "blog" as Page },
                ] as FooterLink[]).map((l) => (
                  <li key={l.label}>
                    <button
                      onClick={() => handleLink(l)}
                      className="text-gray-400/90 hover:text-green-400 text-sm transition-colors duration-150 text-right w-full flex items-center gap-1.5 group"
                    >
                      <ArrowLeft size={10} className="opacity-0 group-hover:opacity-100 transition-all -translate-x-1 group-hover:translate-x-0 text-green-500 flex-shrink-0" />
                      {l.label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* SEO internal links strip */}
          <div className="border-t border-white/8 pt-6 mb-6">
            <p className="text-gray-500/80 text-xs mb-3 font-semibold tracking-wide uppercase">روابط مفيدة</p>
            <div className="flex flex-wrap gap-x-5 gap-y-2.5">
              {[
                { label: "الدراسة في APU ماليزيا",    page: "apu" as Page },
                { label: "الدراسة في تايلورز",          page: "taylors" as Page },
                { label: "الدراسة في MMU",              page: "mmu" as Page },
                { label: "كورس IELTS كوالالمبور",       page: "stratford-institute" as Page },
                { label: "معهد بيغ بان KL",             page: "bigben-institute" as Page },
                { label: "سامر كامب ماليزيا",           page: "bright-institute" as Page },
                { label: "قارن الجامعات الماليزية",     page: "compare" as Page },
              ].map((l) => (
                <button
                  key={l.label}
                  onClick={() => go(l.page)}
                  className="text-gray-500/70 hover:text-green-400 text-xs transition-colors duration-150 hover:underline decoration-green-500/50 underline-offset-2"
                >
                  {l.label}
                </button>
              ))}
            </div>
          </div>

          {/* Bottom bar */}
          <div className="border-t border-white/8 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="flex flex-col gap-1 text-center sm:text-right">
              <p className="text-gray-500/80 text-xs">
                © {new Date().getFullYear()} Algeria2Malaysia — جميع الحقوق محفوظة
              </p>
              <p className="text-gray-600/70 text-xs">
                Website created and developed by{" "}
                <span className="text-gray-400/90 font-medium">Abderrahmane Kebaili</span>.
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
