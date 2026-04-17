import { useEffect, useState } from "react";
import { ArrowLeft, MapPin, Clock, CheckCircle, Calendar, ExternalLink, Star } from "lucide-react";
import { useNavigate } from "../hooks/useNavigate";

const EUR = (rm: number) => Math.round(rm / 5).toLocaleString();
const RM  = (rm: number) => rm.toLocaleString();

type Program = {
  id: string;
  name: string;
  nameEn: string;
  hours: string;
  days: string;
  badge: string;
  badgeColor: string;
  desc: string;
  highlights: string[];
  color: string;
  priceType: "monthly" | "ielts" | "vip";
  prices?: { months: number; standard: number; special: number }[];
  ieltsData?: { label: string; rm: number; note?: string }[];
  vipPhysical?: { range: string; rate: number }[];
  vipOnline?: { range: string; rate: number }[];
};

const PROGRAMS: Program[] = [
  {
    id: "iep",
    name: "برنامج IEP المكثف",
    nameEn: "Immersive English Program",
    hours: "حضوري مكثف",
    days: "5 أيام / أسبوع",
    badge: "الأكثر طلباً",
    badgeColor: "bg-red-100 text-red-700",
    desc: "البرنامج الإنجليزي الأشمل في بيغ بان — يجمع بين المهارات الأربع في بيئة تعليمية مكثفة تضمن تقدماً سريعاً وملموساً.",
    highlights: [
      "رسوم إدارية: 500 RM",
      "مواد دراسية (مستوى واحد): 300 RM",
      "تأشيرة 6 أشهر: 2,900 RM إضافية",
      "تأشيرة 12 شهراً: 3,400 RM إضافية",
    ],
    color: "red",
    priceType: "monthly",
    prices: [
      { months: 1,  standard: 2880,  special: 2618  },
      { months: 2,  standard: 4960,  special: 4712  },
      { months: 3,  standard: 7420,  special: 6676  },
      { months: 4,  standard: 9855,  special: 8378  },
      { months: 5,  standard: 12320, special: 10472 },
      { months: 6,  standard: 14786, special: 12566 },
      { months: 7,  standard: 17785, special: 14661 },
      { months: 8,  standard: 19635, special: 15708 },
      { months: 9,  standard: 22090, special: 17672 },
      { months: 10, standard: 24435, special: 18326 },
      { months: 11, standard: 26880, special: 20159 },
      { months: 12, standard: 29320, special: 21991 },
    ],
  },
  {
    id: "ielts",
    name: "تحضير IELTS",
    nameEn: "IELTS Preparation Course",
    hours: "3 ساعات / يوم",
    days: "شهران متتاليان",
    badge: "معتمد IDP",
    badgeColor: "bg-blue-100 text-blue-700",
    desc: "برنامج تحضيري منهجي مدته شهران — الشهر الأول يركز على المهارات الأساسية واستراتيجيات الاختبار، والشهر الثاني على إدارة الوقت والمحاكاة الكاملة للامتحان.",
    highlights: [
      "الشهر الأول: 9AM–12PM (مهارات أساسية)",
      "الشهر الثاني: 1PM–4PM (محاكاة الامتحان)",
      "اختبار تحديد مستوى + رسوم إدارية: 500 RM",
      "مركز IELTS معتمد من IDP",
    ],
    color: "blue",
    priceType: "ielts",
    ieltsData: [
      { label: "اختبار تحديد المستوى + الرسوم الإدارية", rm: 500 },
      { label: "شهر واحد", rm: 2000 },
      { label: "شهران (العرض الخاص)", rm: 3700, note: "بدلاً من 4,000 RM" },
    ],
  },
  {
    id: "vip",
    name: "دروس خاصة VIP",
    nameEn: "Private Class (VIP)",
    hours: "مرن / فردي",
    days: "حسب الطلب",
    badge: "خاص وفردي",
    badgeColor: "bg-amber-100 text-amber-700",
    desc: "برنامج فردي مئة بالمئة — يقترن كل طالب بمعلم مخصص لتلبية أهدافه الدراسية سواء للتحضير لاختبارات دولية أو الإنجليزية الأكاديمية أو المهنية.",
    highlights: [
      "تحضير PTE / TOEFL / IELTS",
      "إنجليزي مهني للأعمال",
      "دعم أكاديمي متخصص",
      "تحسين الطلاقة والثقة في التواصل",
    ],
    color: "amber",
    priceType: "vip",
    vipPhysical: [
      { range: "تجريبي (45 دقيقة)", rate: 100 },
      { range: "1 – 20 ساعة",  rate: 200 },
      { range: "21 – 40 ساعة", rate: 180 },
      { range: "41 – 80 ساعة", rate: 170 },
      { range: "81 – 100 ساعة", rate: 150 },
      { range: "100+ ساعة",    rate: 100 },
    ],
    vipOnline: [
      { range: "تجريبي (45 دقيقة)", rate: 80 },
      { range: "1 – 20 ساعة",  rate: 180 },
      { range: "21 – 40 ساعة", rate: 160 },
      { range: "41 – 80 ساعة", rate: 140 },
      { range: "81 – 100 ساعة", rate: 120 },
      { range: "100+ ساعة",    rate: 80  },
    ],
  },
];

const VISA = [
  { range: "6 أشهر",  total: 2900 },
  { range: "12 شهراً", total: 3400 },
];

const colorMap: Record<string, { header: string; tabActive: string; row: string; accent: string }> = {
  red: {
    header: "from-[#5a1020] via-[#7a1a2e] to-[#952236]",
    tabActive: "bg-[#7a1a2e] text-white border-[#7a1a2e]",
    row: "bg-rose-50",
    accent: "text-[#7a1a2e]",
  },
  blue: {
    header: "from-slate-900 via-slate-800 to-slate-700",
    tabActive: "bg-slate-700 text-white border-slate-700",
    row: "bg-slate-50",
    accent: "text-slate-700",
  },
  amber: {
    header: "from-stone-800 via-stone-700 to-amber-800",
    tabActive: "bg-stone-700 text-white border-stone-700",
    row: "bg-amber-50",
    accent: "text-stone-700",
  },
};

export default function BigBenPage() {
  const { go } = useNavigate();
  const [activeProgram, setActiveProgram] = useState(0);

  useEffect(() => { window.scrollTo({ top: 0, behavior: "smooth" }); }, []);

  const prog = PROGRAMS[activeProgram];
  const c = colorMap[prog.color];

  return (
    <div className="min-h-screen bg-gray-50" dir="rtl">

      {/* ── Header ── */}
      <div className={`bg-gradient-to-br ${c.header} text-white pt-20 pb-20 px-4 transition-all duration-500`}>
        <div className="max-w-4xl mx-auto">
          <button
            onClick={() => go("home", { scrollTo: "institutes" })}
            className="flex items-center gap-2 bg-white/20 hover:bg-white/30 text-white font-semibold text-sm px-4 py-2 rounded-xl transition-all mb-6 group border border-white/30"
          >
            <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
            <span>العودة للرئيسية</span>
          </button>

          <div className="flex items-center gap-5 mb-6">
            <div className="w-20 h-20 bg-white rounded-2xl flex items-center justify-center flex-shrink-0 p-2 shadow-xl">
              <img src="/bigben-logo.png" alt="Big Ben" className="max-w-full max-h-full object-contain" />
            </div>
            <div>
              <h1 className="text-2xl md:text-3xl font-extrabold leading-tight">مجموعة بيغ بان التعليمية</h1>
              <p className="text-white/70 text-sm mt-1">Big Ben Education Group</p>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {[
              { icon: <Clock size={14} />,       text: "3 برامج متاحة" },
              { icon: <Star size={14} />,         text: "معتمد Pearson" },
              { icon: <MapPin size={14} />,       text: "كوالالمبور" },
              { icon: <CheckCircle size={14} />,  text: "تأشيرة طالب متاحة" },
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-2 bg-white/10 rounded-xl px-3 py-2 text-sm">
                <span className="text-white/70">{item.icon}</span>
                <span className="text-white/90 font-medium">{item.text}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Program Tabs ── */}
      <div className="max-w-4xl mx-auto px-4 -mt-8">
        <div className="bg-white rounded-2xl shadow-md border border-gray-100 p-1.5 flex gap-1.5 mb-6">
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
              <div className="sm:hidden">{p.nameEn.split(" ")[0]}</div>
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
              {prog.priceType === "monthly" && prog.prices && (
                <div className="text-left flex-shrink-0">
                  <div className="text-xs text-gray-400 mb-1">العرض الخاص من</div>
                  <div className={`text-2xl font-extrabold ${c.accent}`}>{RM(prog.prices[0].special)} <span className="text-sm font-normal">RM</span></div>
                  <div className="text-xs text-gray-400">≈ {EUR(prog.prices[0].special)} €</div>
                </div>
              )}
              {prog.priceType === "ielts" && (
                <div className="text-left flex-shrink-0">
                  <div className="text-xs text-gray-400 mb-1">يبدأ من</div>
                  <div className={`text-2xl font-extrabold ${c.accent}`}>2,000 <span className="text-sm font-normal">RM</span></div>
                  <div className="text-xs text-gray-400">≈ 400 €</div>
                </div>
              )}
              {prog.priceType === "vip" && (
                <div className="text-left flex-shrink-0">
                  <div className="text-xs text-gray-400 mb-1">تجريبي من</div>
                  <div className={`text-2xl font-extrabold ${c.accent}`}>80 <span className="text-sm font-normal">RM</span></div>
                  <div className="text-xs text-gray-400">للجلسة</div>
                </div>
              )}
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

          {/* ── IEP Price Table ── */}
          {prog.priceType === "monthly" && prog.prices && (
            <div className="p-6">
              <h3 className="text-sm font-bold text-gray-700 mb-4">جدول الأسعار — السعر الأصلي والعرض الخاص</h3>
              <div className="overflow-x-auto rounded-xl border border-gray-100">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-gray-50">
                      <th className="text-right py-3 px-4 font-bold text-gray-600 border-b border-gray-100">المدة</th>
                      <th className="text-right py-3 px-4 font-bold text-gray-600 border-b border-gray-100">السعر الأصلي</th>
                      <th className="text-right py-3 px-4 font-bold text-red-600 border-b border-gray-100">العرض الخاص</th>
                      <th className="text-right py-3 px-4 font-bold text-gray-600 border-b border-gray-100">تقريباً (€)</th>
                    </tr>
                  </thead>
                  <tbody>
                    {prog.prices.map((p, i) => (
                      <tr key={i} className={`transition-colors ${i % 2 === 0 ? "bg-white" : "bg-red-50/30"}`}>
                        <td className="py-3 px-4 font-medium text-gray-800 border-b border-gray-50">
                          {p.months === 1 ? "شهر واحد" : p.months === 2 ? "شهران" : `${p.months} أشهر`}
                        </td>
                        <td className="py-3 px-4 text-gray-400 line-through border-b border-gray-50">
                          {RM(p.standard)} RM
                        </td>
                        <td className="py-3 px-4 font-bold text-[#7a1a2e] border-b border-gray-50">
                          {RM(p.special)} RM
                        </td>
                        <td className="py-3 px-4 text-gray-500 border-b border-gray-50">
                          ≈ {EUR(p.special)} €
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <p className="text-xs text-gray-400 mt-3">* الرسوم الإدارية (500 RM) ومواد الدراسة (300 RM) تُضاف منفصلةً</p>
            </div>
          )}

          {/* ── IELTS Price Table ── */}
          {prog.priceType === "ielts" && prog.ieltsData && (
            <div className="p-6">
              <h3 className="text-sm font-bold text-gray-700 mb-4">رسوم برنامج تحضير IELTS</h3>
              <div className="overflow-x-auto rounded-xl border border-gray-100">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-gray-50">
                      <th className="text-right py-3 px-4 font-bold text-gray-600 border-b border-gray-100">البيان</th>
                      <th className="text-right py-3 px-4 font-bold text-gray-600 border-b border-gray-100">السعر (RM)</th>
                      <th className="text-right py-3 px-4 font-bold text-gray-600 border-b border-gray-100">تقريباً (€)</th>
                    </tr>
                  </thead>
                  <tbody>
                    {prog.ieltsData.map((item, i) => (
                      <tr key={i} className={i % 2 === 0 ? "bg-white" : "bg-blue-50/30"}>
                        <td className="py-3 px-4 font-medium text-gray-800 border-b border-gray-50">
                          {item.label}
                          {item.note && <span className="block text-xs text-gray-400 mt-0.5">{item.note}</span>}
                        </td>
                        <td className="py-3 px-4 font-bold text-slate-700 border-b border-gray-50">
                          {RM(item.rm)} RM
                        </td>
                        <td className="py-3 px-4 text-gray-500 border-b border-gray-50">
                          ≈ {EUR(item.rm)} €
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* ── VIP Price Tables ── */}
          {prog.priceType === "vip" && prog.vipPhysical && prog.vipOnline && (
            <div className="p-6">
              <h3 className="text-sm font-bold text-gray-700 mb-4">أسعار الساعة — حضوري وأونلاين</h3>
              <div className="grid md:grid-cols-2 gap-4">
                {/* Physical */}
                <div>
                  <div className="bg-stone-700 text-white text-center text-sm font-bold py-2.5 rounded-t-xl">حضوري (Physical)</div>
                  <div className="rounded-b-xl border border-amber-100 overflow-hidden">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="bg-amber-50">
                          <th className="text-right py-2 px-3 font-bold text-gray-600 border-b border-amber-100">عدد الساعات</th>
                          <th className="text-right py-2 px-3 font-bold text-gray-600 border-b border-amber-100">السعر/ساعة</th>
                        </tr>
                      </thead>
                      <tbody>
                        {prog.vipPhysical.map((item, i) => (
                          <tr key={i} className={i % 2 === 0 ? "bg-white" : "bg-amber-50/40"}>
                            <td className="py-2.5 px-3 text-gray-800 border-b border-gray-50">{item.range}</td>
                            <td className="py-2.5 px-3 font-bold text-stone-700 border-b border-gray-50">{RM(item.rate)} RM</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
                {/* Online */}
                <div>
                  <div className="bg-gray-700 text-white text-center text-sm font-bold py-2.5 rounded-t-xl">أونلاين (Online)</div>
                  <div className="rounded-b-xl border border-gray-100 overflow-hidden">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="bg-gray-50">
                          <th className="text-right py-2 px-3 font-bold text-gray-600 border-b border-gray-100">عدد الساعات</th>
                          <th className="text-right py-2 px-3 font-bold text-gray-600 border-b border-gray-100">السعر/ساعة</th>
                        </tr>
                      </thead>
                      <tbody>
                        {prog.vipOnline.map((item, i) => (
                          <tr key={i} className={i % 2 === 0 ? "bg-white" : "bg-gray-50/40"}>
                            <td className="py-2.5 px-3 text-gray-800 border-b border-gray-50">{item.range}</td>
                            <td className="py-2.5 px-3 font-bold text-gray-700 border-b border-gray-50">{RM(item.rate)} RM</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* ── Visa Section (IEP only) ── */}
        {prog.priceType === "monthly" && (
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
                  </div>
                  <div className="text-right flex-shrink-0">
                    <div className="font-extrabold text-amber-700">{RM(v.total)} RM</div>
                    <div className="text-xs text-gray-400">≈ {EUR(v.total)} €</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ── CTA ── */}
        <div className="bg-gradient-to-r from-[#5a1020] to-[#7a1a2e] rounded-2xl p-6 mb-8 text-white text-center">
          <h3 className="text-lg font-extrabold mb-2">جاهز للتسجيل في بيغ بان؟</h3>
          <p className="text-red-100 text-sm mb-5">تواصل معنا وسنساعدك في إتمام عملية القبول والتأشيرة خطوة بخطوة</p>
          <div className="flex justify-center">
            <a
              href="https://wa.me/601112200603"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 bg-white/20 hover:bg-white/30 border border-white/30 text-white font-bold text-sm rounded-xl px-8 py-3 transition-all"
            >
              <ExternalLink size={16} />
              تواصل عبر واتساب
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
