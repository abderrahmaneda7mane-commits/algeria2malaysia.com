import { useNavigate, Page } from "../hooks/useNavigate";

const FORM_URL = "https://docs.google.com/forms/d/e/1FAIpQLSf6Xx2DET7SCulFT3EuvLW_8wuEA9aE9EkOy06i9lGC09T81w/viewform?usp=header";
const WA_LINK = "https://wa.me/601112200603";
const ZCAL_URL = "https://zcal.co/i/DNzrLfY_";

interface FooterLink { label: string; page?: Page; href?: string; }

const UNIVERSITIES: FooterLink[] = [
  { label: "جامعة APU",           page: "apu" },
  { label: "جامعة تايلورز",       page: "taylors" },
  { label: "جامعة MMU",           page: "mmu" },
  { label: "جامعة UniKL",         page: "unikl" },
  { label: "جامعة UPM",           page: "upm" },
  { label: "جامعة لينكولن",       page: "lincoln" },
  { label: "جامعة UTP",           page: "utp" },
  { label: "جامعة UTM",           page: "utm" },
  { label: "جامعة UTeM",          page: "utem" },
  { label: "جامعة UCSI",          page: "ucsi" },
  { label: "جامعة CityU",         page: "cityu-courses" },
  { label: "جامعة سونواي",        page: "sunway" },
];

const INSTITUTES: FooterLink[] = [
  { label: "معهد ستراتفورد",      page: "stratford-institute" },
  { label: "معهد بيغ بان",        page: "bigben-institute" },
  { label: "معهد إيريكان",        page: "erican-institute" },
  { label: "معهد شيفيلد",         page: "sheffield-institute" },
  { label: "مركز برايت للغات",    page: "bright-institute" },
];

const SERVICES: FooterLink[] = [
  { label: "استشارة مجانية",      href: ZCAL_URL },
  { label: "عبّئ فورم المعهد",     href: FORM_URL },
  { label: "قارن الجامعات",        page: "compare" },
  { label: "بحث شامل",             page: "search" },
  { label: "مقالات ونصائح",        page: "blog" },
];

export default function Footer() {
  const { go } = useNavigate();

  function handleLink(link: FooterLink) {
    if (link.href) {
      window.open(link.href, "_blank", "noopener noreferrer");
    } else if (link.page) {
      go(link.page);
    }
  }

  return (
    <footer className="bg-gray-900 text-white" dir="rtl">
      <div className="max-w-7xl mx-auto px-4 py-14">

        {/* Top grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">

          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <button onClick={() => go("home")} className="flex items-center gap-3 mb-4 group">
              <img src="/logo-hq.jpg" alt="Algeria2Malaysia" className="w-10 h-10 rounded-full object-cover" />
              <div className="text-right">
                <div className="font-extrabold text-white text-base leading-tight">Algeria2Malaysia</div>
                <div className="text-green-400 text-xs">الجزائر إلى ماليزيا</div>
              </div>
            </button>
            <p className="text-gray-400 text-sm leading-relaxed mb-5">
              نساعد الطلاب الجزائريين على الدراسة في أفضل الجامعات والمعاهد الماليزية — من القبول حتى الوصول.
            </p>
            <div className="flex gap-3">
              <a
                href={WA_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-green-600 hover:bg-green-500 text-white text-xs font-bold px-4 py-2 rounded-xl transition-all"
              >
                واتساب
              </a>
              <a
                href={ZCAL_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white/10 hover:bg-white/20 text-white text-xs font-bold px-4 py-2 rounded-xl transition-all"
              >
                استشارة مجانية
              </a>
            </div>
          </div>

          {/* Universities */}
          <div>
            <h3 className="font-extrabold text-white text-sm mb-4 pb-2 border-b border-white/10">الجامعات</h3>
            <ul className="space-y-2">
              {UNIVERSITIES.slice(0, 6).map((l) => (
                <li key={l.label}>
                  <button
                    onClick={() => handleLink(l)}
                    className="text-gray-400 hover:text-green-400 text-sm transition-colors text-right w-full"
                  >
                    {l.label}
                  </button>
                </li>
              ))}
              <li>
                <button
                  onClick={() => go("universities")}
                  className="text-green-500 hover:text-green-400 text-sm font-semibold transition-colors"
                >
                  عرض كل الجامعات ←
                </button>
              </li>
            </ul>
          </div>

          {/* Institutes */}
          <div>
            <h3 className="font-extrabold text-white text-sm mb-4 pb-2 border-b border-white/10">معاهد اللغة</h3>
            <ul className="space-y-2 mb-6">
              {INSTITUTES.map((l) => (
                <li key={l.label}>
                  <button
                    onClick={() => handleLink(l)}
                    className="text-gray-400 hover:text-green-400 text-sm transition-colors text-right w-full"
                  >
                    {l.label}
                  </button>
                </li>
              ))}
              <li>
                <button
                  onClick={() => go("institutes")}
                  className="text-green-500 hover:text-green-400 text-sm font-semibold transition-colors"
                >
                  عرض كل المعاهد ←
                </button>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="font-extrabold text-white text-sm mb-4 pb-2 border-b border-white/10">خدماتنا</h3>
            <ul className="space-y-2 mb-6">
              {SERVICES.map((l) => (
                <li key={l.label}>
                  <button
                    onClick={() => handleLink(l)}
                    className="text-gray-400 hover:text-green-400 text-sm transition-colors text-right w-full"
                  >
                    {l.label}
                  </button>
                </li>
              ))}
            </ul>

            <h3 className="font-extrabold text-white text-sm mb-3 pb-2 border-b border-white/10">التنقل</h3>
            <ul className="space-y-2">
              {[
                { label: "الصفحة الرئيسية", page: "home" as Page },
                { label: "الجامعات", page: "universities" as Page },
                { label: "المعاهد", page: "institutes" as Page },
                { label: "المقالات", page: "blog" as Page },
              ].map((l) => (
                <li key={l.label}>
                  <button
                    onClick={() => go(l.page)}
                    className="text-gray-400 hover:text-green-400 text-sm transition-colors text-right w-full"
                  >
                    {l.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* SEO internal links strip */}
        <div className="border-t border-white/10 pt-6 mb-6">
          <p className="text-gray-500 text-xs mb-3 font-semibold">روابط مفيدة</p>
          <div className="flex flex-wrap gap-x-4 gap-y-2">
            {[
              { label: "الدراسة في APU ماليزيا",      page: "apu" as Page },
              { label: "الدراسة في تايلورز",            page: "taylors" as Page },
              { label: "الدراسة في MMU",                page: "mmu" as Page },
              { label: "كورس IELTS كوالالمبور",         page: "stratford-institute" as Page },
              { label: "معهد بيغ بان KL",               page: "bigben-institute" as Page },
              { label: "سامر كامب ماليزيا",             page: "bright-institute" as Page },
              { label: "قارن الجامعات الماليزية",       page: "compare" as Page },
            ].map((l) => (
              <button
                key={l.label}
                onClick={() => go(l.page)}
                className="text-gray-500 hover:text-green-400 text-xs transition-colors"
              >
                {l.label}
              </button>
            ))}
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex flex-col gap-1 text-center sm:text-right">
            <p className="text-gray-500 text-xs">
              © {new Date().getFullYear()} Algeria2Malaysia — جميع الحقوق محفوظة
            </p>
            <p className="text-gray-600 text-xs">
              Website created and developed by <span className="text-gray-400 font-medium">Abderrahmane Kebaili</span>.
            </p>
          </div>
          <div className="flex gap-4">
            <a href="/sitemap.xml" className="text-gray-500 hover:text-green-400 text-xs transition-colors">
              خريطة الموقع
            </a>
            <a href="/robots.txt" className="text-gray-500 hover:text-green-400 text-xs transition-colors">
              robots.txt
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
