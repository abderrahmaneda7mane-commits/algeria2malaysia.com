import { useEffect, useState } from "react";
import { ArrowLeft, MapPin, Clock, CheckCircle, Calendar, ExternalLink } from "lucide-react";
import { useNavigate } from "@/hooks/useNavigate";
import { useSEO } from "@/hooks/useSEO";
import { useReveal } from "@/hooks/useReveal";

const EUR = (rm: number) => Math.round(rm / 5).toLocaleString();
const RM  = (rm: number) => rm.toLocaleString();

const PROGRAMS = [
  {
    id: "communication",
    name: "إنجليزي للتواصل",
    nameEn: "English for Communication",
    hours: "2 ساعة / يوم",
    days: "5 أيام / أسبوع",
    badge: "الأنسب للمبتدئين",
    badgeColor: "bg-teal-100 text-teal-700",
    desc: "مناسب للمحترفين وطلاب الجامعات والأفراد الراغبين في تطوير مهارات اللغة الإنجليزية اليومية.",
    highlights: [
      "تقوية الاستماع والتواصل",
      "بناء الثقة في الإنجليزية المهنية",
      "توسيع المفردات اليومية",
      "تحسين الكتابة الرسمية",
    ],
    color: "teal",
    prices: [
      { months: 1,  rm: 950  },
      { months: 2,  rm: 1800 },
      { months: 3,  rm: 2650 },
      { months: 4,  rm: 3500 },
      { months: 5,  rm: 4100 },
      { months: 6,  rm: 4750 },
      { months: 7,  rm: 5350 },
      { months: 8,  rm: 5950 },
      { months: 9,  rm: 6450 },
      { months: 10, rm: 7050 },
      { months: 11, rm: 7650 },
      { months: 12, rm: 8000 },
    ],
  },
  {
    id: "intensive",
    name: "البرنامج المكثف",
    nameEn: "Intensive English Program",
    hours: "4 ساعات / يوم",
    days: "5 أيام / أسبوع",
    badge: "الأكثر طلباً",
    badgeColor: "bg-green-100 text-green-700",
    desc: "برنامج مكثف يجمع بين المهارات الأربعة. الرسوم تشمل التسجيل واختبار المستوى والكتب والمواد الدراسية.",
    highlights: [
      "تسجيل واختبار مستوى: 200 RM",
      "كتب ومواد (1-3 أشهر): 250–500 RM",
      "كتب ومواد (4+ أشهر): 500–1,500 RM",
      "تأشيرة 4-7 أشهر: 1,980 RM إضافية",
    ],
    color: "green",
    prices: [
      { months: 1,  rm: 2500  },
      { months: 2,  rm: 4500  },
      { months: 3,  rm: 5900  },
      { months: 4,  rm: 7500  },
      { months: 5,  rm: 9000  },
      { months: 6,  rm: 10200 },
      { months: 7,  rm: 11600 },
      { months: 8,  rm: 12800 },
      { months: 9,  rm: 13900 },
      { months: 10, rm: 14850 },
      { months: 11, rm: 15750 },
      { months: 12, rm: 16700 },
    ],
  },
  {
    id: "intensive-plus",
    name: "البرنامج المكثف بلس",
    nameEn: "Intensive Plus Program",
    hours: "6 ساعات / يوم",
    days: "5 أيام / أسبوع",
    badge: "الأسرع تطوراً",
    badgeColor: "bg-purple-100 text-purple-700",
    desc: "أقوى برامج ستراتفورد للتطور السريع. تغمر نفسك في الإنجليزية 6 ساعات يومياً مع معلمين متخصصين.",
    highlights: [
      "تسجيل واختبار مستوى: 200 RM",
      "كتب ومواد (1-3 أشهر): 250–500 RM",
      "كتب ومواد (4+ أشهر): 500–1,500 RM",
      "تأشيرة 8-12 شهراً: 2,950 RM إضافية",
    ],
    color: "purple",
    prices: [
      { months: 1,  rm: 3000  },
      { months: 2,  rm: 5400  },
      { months: 3,  rm: 7450  },
      { months: 4,  rm: 8900  },
      { months: 5,  rm: 10650 },
      { months: 6,  rm: 12350 },
      { months: 7,  rm: 13750 },
      { months: 8,  rm: 15300 },
      { months: 9,  rm: 16550 },
      { months: 10, rm: 17800 },
      { months: 11, rm: 18900 },
      { months: 12, rm: 19950 },
    ],
  },
];

const VISA = [
  { range: "1 – 3 أشهر",  total: null,  note: "لا تأشيرة مطلوبة" },
  { range: "4 – 7 أشهر",  total: 1980,  note: "تأشيرة + تأمين صحي + تخليص هجرة" },
  { range: "8 – 12 شهراً", total: 2950,  note: "تأشيرة + تأمين صحي + تخليص هجرة" },
];

const colorMap: Record<string, { header: string; tab: string; tabActive: string; badge: string; row: string }> = {
  teal: {
    header: "from-teal-800 via-teal-700 to-teal-600",
    tab: "text-teal-600 border-teal-200",
    tabActive: "bg-teal-600 text-white border-teal-600",
    badge: "bg-teal-500/30 border-teal-400/40 text-teal-100",
    row: "bg-teal-50",
  },
  green: {
    header: "from-green-900 via-green-800 to-green-700",
    tab: "text-green-600 border-green-200",
    tabActive: "bg-green-600 text-white border-green-600",
    badge: "bg-green-500/30 border-green-400/40 text-green-100",
    row: "bg-green-50",
  },
  purple: {
    header: "from-purple-900 via-purple-800 to-purple-700",
    tab: "text-purple-600 border-purple-200",
    tabActive: "bg-purple-600 text-white border-purple-600",
    badge: "bg-purple-500/30 border-purple-400/40 text-purple-100",
    row: "bg-purple-50",
  },
};

export default function StratfordPage() {
  useSEO({
    title: "معهد ستراتفورد كوالالمبور — IELTS وإنجليزي عام 2025",
    description: "معهد Stratford International College في كوالالمبور: كورسات IELTS، إنجليزي عام وأعمال. يبدأ من 1,900 RM/شهر. قبول سريع للطلاب الجزائريين.",
    canonicalPath: "/english-course-stratford-kl",
    keywords: "معهد ستراتفورد ماليزيا، IELTS كوالالمبور، كورس انجليزي KL، Stratford College",
  });
  const { go } = useNavigate();
  const reveal = useReveal();
  const [activeProgram, setActiveProgram] = useState(0);

  useEffect(() => { window.scrollTo({ top: 0, behavior: "smooth" }); }, []);

  const prog = PROGRAMS[activeProgram];
  const c = colorMap[prog.color];

  return (
    <div ref={reveal} className="section-reveal min-h-screen bg-[#f8fafc]" dir="rtl">

      {/* ── Header ── */}
      <div className={`relative overflow-hidden bg-gradient-to-br ${c.header} text-white pt-20 pb-24 px-4 transition-all duration-500`}>
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/4" />
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-white/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/4" />
          <div className="absolute inset-0 opacity-[0.025]" style={{ backgroundImage: "radial-gradient(circle, rgba(255,255,255,.8) 1px, transparent 1px)", backgroundSize: "24px 24px" }} />
        </div>
        <div className="relative max-w-4xl mx-auto">
          <button
            onClick={() => go("home", { scrollTo: "institutes" })}
            className="flex items-center gap-2 bg-white/15 hover:bg-white/25 text-white font-semibold text-sm px-4 py-2 rounded-xl transition-all mb-8 group border border-white/25"
          >
            <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
            <span>العودة للرئيسية</span>
          </button>

          <div className="flex items-center gap-5 mb-6">
            <div className="w-20 h-20 bg-white rounded-2xl flex items-center justify-center flex-shrink-0 p-2 shadow-xl">
              <img src="/stratford-logo.png" alt="Stratford" className="max-w-full max-h-full object-contain" />
            </div>
            <div>
              <h1 className="text-2xl md:text-3xl font-black leading-tight">معهد ستراتفورد الدولي للغات</h1>
              <p className="text-white/70 text-sm mt-1">Stratford International Language Centre</p>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {[
              { icon: <Clock size={14} />, text: "3 برامج متاحة" },
              { icon: <Calendar size={14} />, text: "دخول كل شهر" },
              { icon: <MapPin size={14} />, text: "G Tower، KLCC" },
              { icon: <CheckCircle size={14} />, text: "تأشيرة طالب متاحة" },
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-2 bg-white/10 border border-white/15 rounded-xl px-3 py-2 text-sm backdrop-blur-sm">
                <span className="text-white/70">{item.icon}</span>
                <span className="text-white/90 font-medium">{item.text}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Program Tabs ── */}
      <div className="max-w-4xl mx-auto px-4 -mt-6 relative z-10">
        <div className="bg-white rounded-2xl shadow-[0_4px_20px_-4px_rgba(0,0,0,.12)] border border-gray-100 p-1.5 flex gap-1.5 mb-6">
          {PROGRAMS.map((p, i) => (
            <button
              key={p.id}
              onClick={() => setActiveProgram(i)}
              className={`flex-1 rounded-xl py-2.5 px-3 text-sm font-bold transition-all ${
                activeProgram === i
                  ? colorMap[p.color].tabActive
                  : "text-gray-500 hover:bg-gray-50"
              }`}
            >
              <div className="hidden sm:block">{p.name}</div>
              <div className="sm:hidden">{p.hours}</div>
            </button>
          ))}
        </div>

        {/* ── Program Detail Card ── */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden mb-6">

          {/* Program header */}
          <div className="p-6 border-b border-gray-100">
            <div className="flex items-start justify-between gap-4">
              <div>
                <span className={`inline-block text-xs font-bold px-3 py-1 rounded-full mb-2 ${prog.badgeColor}`}>
                  {prog.badge}
                </span>
                <h2 className="text-xl font-extrabold text-gray-900">{prog.name}</h2>
                <p className="text-gray-400 text-sm">{prog.nameEn}</p>
              </div>
              <div className="text-left flex-shrink-0">
                <div className="text-xs text-gray-400 mb-1">يبدأ من</div>
                <div className="text-2xl font-extrabold text-green-700">{RM(prog.prices[0].rm)} <span className="text-sm font-normal">RM</span></div>
                <div className="text-xs text-gray-400">≈ {EUR(prog.prices[0].rm)} €</div>
              </div>
            </div>

            <div className="flex items-center gap-4 mt-4">
              <div className="flex items-center gap-1.5 bg-gray-100 rounded-lg px-3 py-1.5 text-sm font-medium text-gray-700">
                <Clock size={14} className="text-gray-500" />
                {prog.hours}
              </div>
              <div className="flex items-center gap-1.5 bg-gray-100 rounded-lg px-3 py-1.5 text-sm font-medium text-gray-700">
                <Calendar size={14} className="text-gray-500" />
                {prog.days}
              </div>
            </div>

            <p className="text-gray-600 text-sm leading-relaxed mt-4">{prog.desc}</p>

            <ul className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-2">
              {prog.highlights.map((h, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-gray-700">
                  <CheckCircle size={14} className="text-green-500 flex-shrink-0 mt-0.5" />
                  {h}
                </li>
              ))}
            </ul>
          </div>

          {/* Price table */}
          <div className="p-6">
            <h3 className="text-sm font-bold text-gray-700 mb-4">جدول الأسعار الكامل — بالرينغيت الماليزي</h3>
            <div className="overflow-x-auto rounded-xl border border-gray-100">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-gray-50">
                    <th className="text-right py-3 px-4 font-bold text-gray-600 border-b border-gray-100">المدة</th>
                    <th className="text-right py-3 px-4 font-bold text-gray-600 border-b border-gray-100">السعر (RM)</th>
                    <th className="text-right py-3 px-4 font-bold text-gray-600 border-b border-gray-100">تقريباً (€)</th>
                  </tr>
                </thead>
                <tbody>
                  {prog.prices.map((p, i) => (
                    <tr key={i} className={`transition-colors ${i % 2 === 0 ? "bg-white" : c.row + " bg-opacity-30"}`}>
                      <td className="py-3 px-4 font-medium text-gray-800 border-b border-gray-50">
                        {p.months === 1 ? "شهر واحد" : p.months === 2 ? "شهران" : `${p.months} أشهر`}
                      </td>
                      <td className="py-3 px-4 font-bold text-green-700 border-b border-gray-50">
                        {RM(p.rm)} RM
                      </td>
                      <td className="py-3 px-4 text-gray-500 border-b border-gray-50">
                        ≈ {EUR(p.rm)} €
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* ── Visa Section ── */}
        <div className="bg-white rounded-2xl shadow-sm border border-amber-100 overflow-hidden mb-6">
          <div className="bg-amber-50 px-6 py-4 border-b border-amber-100">
            <h3 className="font-bold text-amber-800 text-sm">تكاليف التأشيرة — للطلاب الدوليين</h3>
            <p className="text-amber-600 text-xs mt-1">أسعار منفصلة تُضاف إلى رسوم الدراسة</p>
          </div>
          <div className="p-4 grid gap-3">
            {VISA.map((v, i) => (
              <div key={i} className="flex items-center justify-between p-3 rounded-xl bg-gray-50 border border-gray-100">
                <div>
                  <div className="font-bold text-gray-800 text-sm">{v.range}</div>
                  <div className="text-gray-500 text-xs mt-0.5">{v.note}</div>
                </div>
                <div className="text-right flex-shrink-0">
                  {v.total ? (
                    <>
                      <div className="font-extrabold text-amber-700">{RM(v.total)} RM</div>
                      <div className="text-xs text-gray-400">≈ {EUR(v.total)} €</div>
                    </>
                  ) : (
                    <div className="font-bold text-green-600 text-sm">مجاناً</div>
                  )}
                </div>
              </div>
            ))}
          </div>
          <div className="px-6 pb-4">
            <p className="text-xs text-gray-400">* يُودَع 50 RM كضمان بطاقة الوصول (قابل للاسترداد)</p>
          </div>
        </div>

        {/* ── CTA ── */}
        <div className="relative overflow-hidden bg-gradient-to-br from-[#0a2e14] via-[#0f4d22] to-[#166534] rounded-2xl p-6 mb-8 text-white text-center shadow-xl">
          <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: "radial-gradient(circle, rgba(255,255,255,.8) 1px, transparent 1px)", backgroundSize: "20px 20px" }} />
          <div className="relative">
            <h3 className="text-lg font-black mb-2">جاهز للتسجيل في ستراتفورد؟</h3>
            <p className="text-green-200 text-sm mb-5">عبّئ فورم المعهد وسنتواصل معك لإتمام عملية القبول والتأشيرة خطوة بخطوة</p>
            <div className="flex justify-center">
              <a
                href="https://docs.google.com/forms/d/e/1FAIpQLSf6Xx2DET7SCulFT3EuvLW_8wuEA9aE9EkOy06i9lGC09T81w/viewform?usp=header"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 bg-white text-green-800 hover:bg-green-50 font-bold text-sm rounded-xl px-8 py-3 transition-all shadow-md hover:shadow-lg hover:-translate-y-0.5"
              >
                <ExternalLink size={16} />
                عبّئ فورم المعهد لاستخراج القبول
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
