import { useState } from "react";
import { ArrowLeft, MapPin, Clock, CheckCircle, Calendar, Globe, Users, BookOpen, Mic, Star } from "lucide-react";
import { useNavigate } from "../hooks/useNavigate";
import { useSEO } from "../hooks/useSEO";

const EUR = (rm: number) => Math.round(rm / 5).toLocaleString();
const RM  = (rm: number) => rm.toLocaleString();

const ACADEMIC_PRICES = [
  { months: 1,  total: 2650  },
  { months: 2,  total: 4664  },
  { months: 3,  total: 6360  },
  { months: 4,  total: 7791  },
  { months: 5,  total: 9222  },
  { months: 6,  total: 10441 },
  { months: 7,  total: 11660 },
  { months: 8,  total: 12720 },
  { months: 9,  total: 13992 },
  { months: 10, total: 14787 },
  { months: 11, total: 15794 },
  { months: 12, total: 16483 },
];

const INTENSIVE_PRICES = [
  { months: 1,  total: 3551  },
  { months: 2,  total: 6413  },
  { months: 3,  total: 8745  },
  { months: 4,  total: 10812 },
  { months: 5,  total: 12773 },
  { months: 6,  total: 14416 },
  { months: 7,  total: 16027 },
  { months: 8,  total: 17437 },
  { months: 9,  total: 19032 },
  { months: 10, total: 20140 },
  { months: 11, total: 21465 },
  { months: 12, total: 22430 },
];

const SUMMER_FEES = [
  { weeks: 1, total: 2200 },
  { weeks: 2, total: 2700 },
  { weeks: 3, total: 3000 },
  { weeks: 4, total: 3600 },
];

const VISA = [
  { range: "6 أشهر",  total: 2000 },
  { range: "سنة كاملة", total: 2900 },
];

const PROGRAMS_INFO = [
  {
    id: "academic",
    name: "البرنامج الأكاديمي",
    nameEn: "Academic Program",
    hours: "4 ساعات / يوم",
    days: "5 أيام / أسبوع",
    badge: "الأكثر طلباً",
    badgeColor: "bg-blue-100 text-blue-700",
    icon: <BookOpen size={20} />,
    color: "blue",
    desc: "برنامج شامل يغطي المهارات اللغوية الأربعة بكتب Cambridge معتمدة. مثالي لمن يريد تحسين مستواه الأكاديمي في إنجليزية دولية.",
    highlights: [
      "قواعد اللغة (Grammar)",
      "الكتابة (Writing)",
      "القراءة (Reading)",
      "الاستماع (Listening)",
      "3 كتب قواعد + كتاب قراءة + واجبات منزلية",
      "رسوم التسجيل والاختبار: 150 RM",
    ],
  },
  {
    id: "speaking",
    name: "كورس المحادثة",
    nameEn: "Speaking Course",
    hours: "2 ساعة / يوم",
    days: "5 أيام / أسبوع",
    badge: "تواصل ثقة",
    badgeColor: "bg-green-100 text-green-700",
    icon: <Mic size={20} />,
    color: "green",
    desc: "حصص مركزة على المحادثة والتواصل الشفهي فقط. مع زملاء من جنسيات مختلفة — بيئة مثالية للتدرب على الإنجليزية الطبيعية.",
    highlights: [
      "محادثة يومية بدون عربي",
      "تمثيل أدوار وسيناريوهات حقيقية",
      "تصحيح النطق والأخطاء الشائعة",
      "بناء الثقة في الكلام أمام الآخرين",
      "50 RM للجلسة المنفصلة",
    ],
  },
  {
    id: "intensive",
    name: "البرنامج المكثف",
    nameEn: "Intensive Program (6h/day)",
    hours: "6 ساعات / يوم",
    days: "5 أيام / أسبوع",
    badge: "الأسرع تطوراً",
    badgeColor: "bg-red-100 text-red-700",
    icon: <Star size={20} />,
    color: "red",
    desc: "4 ساعات أكاديمية + 2 ساعة محادثة يومياً. الأفضل لمن يريد تطوراً سريعاً ومتكاملاً في وقت قصير.",
    highlights: [
      "4 ساعات أكاديمية (قواعد، كتابة، قراءة، استماع)",
      "2 ساعة محادثة يومية مع جنسيات مختلفة",
      "أسرع تحسن ممكن في وقت قصير",
      "جميع مواد البرنامج الأكاديمي مشمولة",
    ],
  },
  {
    id: "ielts",
    name: "تحضير IELTS",
    nameEn: "IELTS Preparation",
    hours: "4 ساعات / يوم",
    days: "5 أيام / أسبوع",
    badge: "اختبارات دولية",
    badgeColor: "bg-purple-100 text-purple-700",
    icon: <CheckCircle size={20} />,
    color: "purple",
    desc: "برنامج متخصص للتحضير لاختبار IELTS يغطي المهارات الأربعة وفق معايير الاختبار الدولي.",
    highlights: [
      "Listening — استماع بمعايير IELTS",
      "Reading — قراءة وفهم المقاطع الطويلة",
      "Writing — Task 1 & Task 2",
      "Speaking — الجزء الشفهي مع مدرب متخصص",
      "تقييم أسبوعي وتتبع التقدم",
    ],
  },
  {
    id: "private",
    name: "حصص خاصة",
    nameEn: "Private Classes",
    hours: "2 ساعة / حصة",
    days: "2 – 3 أيام / أسبوع",
    badge: "جدول مرن",
    badgeColor: "bg-amber-100 text-amber-700",
    icon: <Users size={20} />,
    color: "amber",
    desc: "حصص فردية مع مدرس خاص — جدول مرن يناسب وقتك. مثالي لمن يريد اهتماماً شخصياً وتطوراً مباشراً.",
    highlights: [
      "جدول يناسب وقتك",
      "2 إلى 3 أيام أسبوعياً",
      "2 ساعة لكل حصة",
      "تخصيص كامل حسب مستواك وهدفك",
      "تواصل مع الفريق للسعر",
    ],
  },
];

const TABS = ["📚 الأسعار", "☀️ سامر كامب أطفال", "📋 IELTS والخاص", "🏛️ عن المعهد"];

export default function CambrightPage() {
  const { go } = useNavigate();
  const [tab, setTab] = useState(0);
  const [activeProgram, setActiveProgram] = useState<"academic" | "intensive">("academic");

  useSEO({
    title: "معهد Cambright الدولي للغات — كوالالمبور | الأسعار والبرامج 2026",
    description: "Cambright International Language Centre في KLCC: برنامج أكاديمي 4h/يوم، مكثف 6h، كورس محادثة، IELTS، حصص خاصة، وسامر كامب للأطفال 7-15 سنة.",
    canonicalPath: "/english-institute-cambright-klcc",
    keywords: "Cambright Language Center، معهد لغة كوالالمبور، IELTS ماليزيا، سامر كامب أطفال، كورس انجليزي KLCC",
  });

  const priceData = activeProgram === "academic" ? ACADEMIC_PRICES : INTENSIVE_PRICES;

  return (
    <div className="min-h-screen bg-gray-50" dir="rtl">
      {/* Hero */}
      <div className="bg-gradient-to-br from-[#1a2a6c] via-[#1e3a8a] to-[#b21f1f] text-white">
        <div className="max-w-4xl mx-auto px-4 pt-6 pb-8">
          <button
            onClick={() => go("institutes")}
            className="flex items-center gap-2 text-white/70 hover:text-white text-sm mb-6 transition-colors"
          >
            <ArrowLeft size={16} />
            العودة للمعاهد
          </button>

          <div className="flex items-start gap-4 mb-6">
            <div className="w-20 h-20 bg-white rounded-2xl shadow-lg flex-shrink-0 overflow-hidden flex items-center justify-center p-2">
              <img src="/cambright-logo.png" alt="Cambright" className="max-w-full max-h-full object-contain" />
            </div>
            <div>
              <div className="flex flex-wrap gap-2 mb-2">
                <span className="bg-white/20 text-white text-xs font-bold px-3 py-1 rounded-full">CILC</span>
                <span className="bg-yellow-400 text-yellow-900 text-xs font-bold px-3 py-1 rounded-full">Wisma MCA — KLCC</span>
                <span className="bg-green-400 text-green-900 text-xs font-bold px-3 py-1 rounded-full">دولي 🌍</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-black leading-tight">
                Cambright International<br />Language Centre
              </h1>
              <p className="text-white/80 text-sm mt-1">معهد لغة إنجليزية دولي — بيئة متعددة الجنسيات بدون هيمنة العربية</p>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {[
              { label: "يبدأ من", value: "2,650 RM" },
              { label: "المكثف من", value: "3,551 RM" },
              { label: "السامر كامب", value: "2,200 RM/أسبوع" },
              { label: "المحادثة المنفردة", value: "50 RM/جلسة" },
            ].map((s) => (
              <div key={s.label} className="bg-white/15 backdrop-blur rounded-xl p-3 text-center">
                <div className="text-white font-black text-base">{s.value}</div>
                <div className="text-white/70 text-xs mt-0.5">{s.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Tabs */}
        <div className="max-w-4xl mx-auto px-4">
          <div className="flex gap-1 overflow-x-auto pb-0">
            {TABS.map((t, i) => (
              <button
                key={t}
                onClick={() => setTab(i)}
                className={`whitespace-nowrap text-xs sm:text-sm font-bold px-4 py-2.5 rounded-t-xl transition-all flex-shrink-0 ${
                  tab === i
                    ? "bg-white text-[#1a2a6c]"
                    : "text-white/70 hover:text-white hover:bg-white/10"
                }`}
              >
                {t}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-6">

        {/* ── Tab 0: Prices ── */}
        {tab === 0 && (
          <div className="space-y-6">
            {/* Program selector */}
            <div className="bg-white rounded-2xl border border-gray-200 p-5">
              <h2 className="font-black text-gray-900 text-lg mb-4">اختر البرنامج لعرض الأسعار</h2>
              <div className="grid grid-cols-2 gap-3 mb-5">
                {(["academic", "intensive"] as const).map((p) => (
                  <button
                    key={p}
                    onClick={() => setActiveProgram(p)}
                    className={`rounded-xl p-3 border-2 text-sm font-bold transition-all ${
                      activeProgram === p
                        ? p === "academic"
                          ? "bg-blue-600 text-white border-blue-600"
                          : "bg-red-600 text-white border-red-600"
                        : "bg-white text-gray-700 border-gray-200 hover:border-gray-300"
                    }`}
                  >
                    {p === "academic" ? (
                      <>📚 أكاديمي — 4h/يوم</>
                    ) : (
                      <>⚡ مكثف — 6h/يوم</>
                    )}
                  </button>
                ))}
              </div>

              <div className={`rounded-xl p-3 mb-4 text-sm ${activeProgram === "academic" ? "bg-blue-50 border border-blue-100" : "bg-red-50 border border-red-100"}`}>
                {activeProgram === "academic" ? (
                  <p className="text-blue-800">
                    <strong>البرنامج الأكاديمي:</strong> 4 ساعات/يوم · 5 أيام/أسبوع · يشمل: Grammar + Writing + Reading + Listening + كتب Cambridge + واجبات. رسوم التسجيل والاختبار: <strong>150 RM</strong>. الأسعار تشمل SST 6%.
                  </p>
                ) : (
                  <p className="text-red-800">
                    <strong>البرنامج المكثف:</strong> 4h أكاديمي + 2h محادثة = 6 ساعات/يوم · 5 أيام/أسبوع. أسرع تطور ممكن في وقت قصير. الأسعار تشمل SST 6%.
                  </p>
                )}
              </div>

              {/* Price table */}
              <div className="overflow-x-auto rounded-xl border border-gray-200">
                <table className="w-full text-sm">
                  <thead>
                    <tr className={activeProgram === "academic" ? "bg-blue-700 text-white" : "bg-red-700 text-white"}>
                      <th className="px-4 py-3 text-right font-bold">المدة</th>
                      <th className="px-4 py-3 text-center font-bold">الإجمالي (شامل SST)</th>
                      <th className="px-4 py-3 text-center font-bold">بالأورو ≈</th>
                    </tr>
                  </thead>
                  <tbody>
                    {priceData.map((row, i) => (
                      <tr key={row.months} className={i % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                        <td className="px-4 py-3 font-bold text-gray-900">
                          {row.months === 1 ? "شهر واحد" : row.months === 2 ? "شهران" : `${row.months} أشهر`}
                        </td>
                        <td className="px-4 py-3 text-center">
                          <span className={`font-black text-base ${activeProgram === "academic" ? "text-blue-700" : "text-red-700"}`}>
                            {RM(row.total)} RM
                          </span>
                        </td>
                        <td className="px-4 py-3 text-center text-gray-500">≈ {EUR(row.total)} €</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <p className="text-gray-400 text-xs mt-2">* جميع الأسعار بالرينجيت الماليزي (RM) وتشمل ضريبة SST 6%.</p>
            </div>

            {/* Speaking class card */}
            <div className="bg-green-50 border border-green-200 rounded-2xl p-5">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 bg-green-100 rounded-xl flex items-center justify-center">
                  <Mic size={20} className="text-green-700" />
                </div>
                <div>
                  <h3 className="font-black text-green-900">حصة المحادثة المنفردة</h3>
                  <p className="text-green-700 text-xs">Speaking Class — 2 ساعة</p>
                </div>
                <span className="mr-auto font-black text-2xl text-green-700">50 RM</span>
              </div>
              <p className="text-green-800 text-sm">
                يمكنك حجز جلسة محادثة منفردة لمدة ساعتين بـ <strong>50 RM فقط</strong>. مثالية لمن يريد تجربة البيئة الدولية قبل التسجيل، أو لمن يريد تقوية المحادثة بجانب برنامجه الحالي.
              </p>
            </div>

            {/* Visa */}
            <div className="bg-white rounded-2xl border border-gray-200 p-5">
              <h2 className="font-black text-gray-900 text-lg mb-4 flex items-center gap-2">
                <Calendar size={20} className="text-[#1a2a6c]" />
                رسوم التأشيرة الدراسية
              </h2>
              <div className="grid sm:grid-cols-2 gap-3">
                {VISA.map((v) => (
                  <div key={v.range} className="bg-[#1a2a6c]/5 border border-[#1a2a6c]/20 rounded-xl p-4 flex items-center justify-between">
                    <div>
                      <div className="font-bold text-[#1a2a6c]">{v.range}</div>
                      <div className="text-gray-500 text-xs mt-0.5">تأشيرة طالب + تأمين + إجراءات</div>
                    </div>
                    <div className="text-right">
                      <div className="font-black text-[#b21f1f] text-xl">{RM(v.total)} RM</div>
                      <div className="text-gray-400 text-xs">≈ {EUR(v.total)} €</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ── Tab 1: Summer Camp ── */}
        {tab === 1 && (
          <div className="space-y-6">
            <div className="bg-gradient-to-br from-orange-50 to-yellow-50 border border-orange-200 rounded-2xl p-5">
              <div className="flex items-center gap-3 mb-4">
                <span className="text-4xl">☀️</span>
                <div>
                  <h2 className="font-black text-gray-900 text-xl">سامر كامب Cambright للأطفال</h2>
                  <p className="text-orange-700 text-sm font-semibold">للأعمار من 7 إلى 15 سنة — بيئة دولية متعددة الجنسيات</p>
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-3 mb-5">
                <div className="bg-white rounded-xl p-4 border border-orange-100">
                  <div className="text-orange-600 font-bold text-sm mb-2 flex items-center gap-1.5">
                    <Calendar size={14} /> دورة أولى
                  </div>
                  <div className="font-black text-gray-900">29 يونيو → 24 يوليو</div>
                </div>
                <div className="bg-white rounded-xl p-4 border border-orange-100">
                  <div className="text-orange-600 font-bold text-sm mb-2 flex items-center gap-1.5">
                    <Calendar size={14} /> دورة ثانية
                  </div>
                  <div className="font-black text-gray-900">27 يوليو → 21 أغسطس</div>
                </div>
              </div>

              {/* Prices */}
              <h3 className="font-black text-gray-900 mb-3">أسعار السامر كامب</h3>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-5">
                {SUMMER_FEES.map((f) => (
                  <div key={f.weeks} className="bg-white rounded-xl p-3 border-2 border-orange-200 text-center">
                    <div className="text-orange-600 font-bold text-sm">{f.weeks} {f.weeks === 1 ? "أسبوع" : "أسابيع"}</div>
                    <div className="font-black text-gray-900 text-lg mt-1">{RM(f.total)}</div>
                    <div className="text-gray-400 text-xs">RM</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Daily schedule */}
            <div className="bg-white rounded-2xl border border-gray-200 p-5">
              <h3 className="font-black text-gray-900 text-lg mb-4">البرنامج اليومي</h3>
              <div className="space-y-2">
                {[
                  { time: "09:30 – 10:00", activity: "تمارين خفيفة وألعاب صباحية", color: "bg-green-50 border-green-200" },
                  { time: "10:00 – 11:30", activity: "مراجعة الواجبات ودراسة الدروس", color: "bg-blue-50 border-blue-200" },
                  { time: "11:30 – 11:45", activity: "استراحة خفيفة (سناك)", color: "bg-yellow-50 border-yellow-200" },
                  { time: "11:45 – 13:00", activity: "أنشطة إنجليزية ممتعة (تمثيل أدوار، قصص، ألعاب)", color: "bg-purple-50 border-purple-200" },
                  { time: "13:00 – 13:45", activity: "استراحة الغداء", color: "bg-orange-50 border-orange-200" },
                  { time: "13:45 – 15:00", activity: "أنشطة يدوية وإبداعية + عروض تفاعلية", color: "bg-pink-50 border-pink-200" },
                  { time: "15:00 – 15:30", activity: "تقييم اليوم واسترخاء", color: "bg-teal-50 border-teal-200" },
                ].map((s) => (
                  <div key={s.time} className={`flex items-center gap-3 rounded-xl p-3 border ${s.color}`}>
                    <div className="text-xs font-bold text-gray-600 w-28 flex-shrink-0 font-mono">{s.time}</div>
                    <div className="text-sm text-gray-800">{s.activity}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* What's included */}
            <div className="bg-white rounded-2xl border border-gray-200 p-5">
              <h3 className="font-black text-gray-900 text-lg mb-4">ما يشمله السامر كامب</h3>
              <div className="grid sm:grid-cols-2 gap-2">
                {[
                  "دروس اللغة الإنجليزية طوال البرنامج",
                  "وجبة غداء يومية",
                  "كتب تعليمية معتمدة من Cambridge",
                  "قميص خاص بالبرنامج (T-shirt)",
                  "حقيبة قماشية (Tote Bag)",
                  "شهادة إتمام البرنامج",
                  "اختبار تحديد المستوى (Placement Test)",
                  "دفتر للدراسة (Notebook)",
                  "صلصال للأنشطة الإبداعية (Play Doh)",
                  "أقلام تلوين ورق وخشب",
                  "ممحاة ومبراة",
                ].map((item) => (
                  <div key={item} className="flex items-center gap-2 text-sm text-gray-700">
                    <CheckCircle size={14} className="text-green-500 flex-shrink-0" />
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ── Tab 2: IELTS & Private ── */}
        {tab === 2 && (
          <div className="space-y-6">
            {/* IELTS */}
            <div className="bg-white rounded-2xl border border-gray-200 p-5">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
                  <CheckCircle size={24} className="text-purple-700" />
                </div>
                <div>
                  <h2 className="font-black text-gray-900 text-xl">تحضير IELTS</h2>
                  <p className="text-purple-600 text-sm">IELTS Preparation — 4h يومياً · 5 أيام/أسبوع</p>
                </div>
              </div>
              <p className="text-gray-700 text-sm mb-4">
                برنامج Cambright للـ IELTS مصمم لتطوير المهارات الأربعة وفق معايير الاختبار الدولي. الدراسة في بيئة متعددة الجنسيات تساعدك على تحسين النطق والفهم بشكل طبيعي.
              </p>
              <div className="grid sm:grid-cols-2 gap-3 mb-4">
                {[
                  { skill: "Listening", desc: "تدريبات استماع بمستويات IELTS الفعلية", icon: "🎧" },
                  { skill: "Reading",   desc: "قراءة مقاطع أكاديمية وعامة وتحليلها", icon: "📖" },
                  { skill: "Writing",   desc: "Task 1 (تقارير/رسوم بيانية) + Task 2 (مقالات)", icon: "✍️" },
                  { skill: "Speaking",  desc: "محادثة مع مدرب متخصص + تسجيل وتحليل", icon: "🎤" },
                ].map((s) => (
                  <div key={s.skill} className="bg-purple-50 border border-purple-100 rounded-xl p-3">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-lg">{s.icon}</span>
                      <span className="font-bold text-purple-900">{s.skill}</span>
                    </div>
                    <p className="text-purple-700 text-xs">{s.desc}</p>
                  </div>
                ))}
              </div>
              <div className="bg-purple-50 border border-purple-200 rounded-xl p-4">
                <p className="text-purple-800 text-sm font-semibold">
                  💡 للاستفسار عن أسعار IELTS وتواريخ البداية، تواصل مع فريقنا عبر واتساب.
                </p>
              </div>
            </div>

            {/* Private Classes */}
            <div className="bg-white rounded-2xl border border-gray-200 p-5">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-amber-100 rounded-xl flex items-center justify-center">
                  <Users size={24} className="text-amber-700" />
                </div>
                <div>
                  <h2 className="font-black text-gray-900 text-xl">الحصص الخاصة</h2>
                  <p className="text-amber-600 text-sm">Private Classes — جدول مرن</p>
                </div>
              </div>
              <p className="text-gray-700 text-sm mb-4">
                حصص فردية مع مدرس خاص بجدول يناسب وقتك. مثالية لمن يريد اهتماماً شخصياً ويحتاج مرونة في المواعيد.
              </p>
              <div className="grid sm:grid-cols-3 gap-3 mb-4">
                {[
                  { label: "أيام الحصة", value: "2 – 3 أيام / أسبوع" },
                  { label: "مدة الحصة",  value: "2 ساعة / حصة" },
                  { label: "الجدول",     value: "مرن حسب وقتك" },
                ].map((d) => (
                  <div key={d.label} className="bg-amber-50 border border-amber-100 rounded-xl p-3 text-center">
                    <div className="font-black text-amber-900 text-sm">{d.value}</div>
                    <div className="text-amber-600 text-xs mt-0.5">{d.label}</div>
                  </div>
                ))}
              </div>
              <div className="bg-amber-50 border border-amber-200 rounded-xl p-4">
                <p className="text-amber-800 text-sm font-semibold">
                  💡 للاستفسار عن أسعار الحصص الخاصة وتفاصيل المنهج، تواصل معنا مباشرة.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* ── Tab 3: About ── */}
        {tab === 3 && (
          <div className="space-y-6">
            <div className="bg-white rounded-2xl border border-gray-200 p-5">
              <div className="flex items-center gap-3 mb-5">
                <div className="w-16 h-16 bg-[#1a2a6c]/5 rounded-2xl flex items-center justify-center overflow-hidden">
                  <img src="/cambright-logo.png" alt="Cambright" className="max-w-full max-h-full object-contain p-1" />
                </div>
                <div>
                  <h2 className="font-black text-gray-900 text-xl">Cambright International Language Centre</h2>
                  <p className="text-gray-500 text-sm">C.I.L.C — Cambright International Language Centre</p>
                </div>
              </div>

              <p className="text-gray-700 text-sm leading-relaxed mb-4">
                Cambright هو معهد لغة إنجليزية دولي يقع في قلب كوالالمبور (Wisma MCA – منطقة KLCC)، يتميز ببيئة متعددة الجنسيات حيث يدرس طلاب من دول مختلفة حول العالم. هذا يجعله الخيار الأمثل لمن يريد تحسين الإنجليزية بشكل طبيعي وسريع بعيداً عن الجو العربي.
              </p>

              <div className="grid sm:grid-cols-2 gap-4 mb-5">
                {[
                  { icon: <Globe size={18} />,     title: "بيئة دولية حقيقية",       desc: "طلاب من جنسيات مختلفة — الإنجليزية لغة التواصل الوحيدة" },
                  { icon: <Mic size={18} />,        title: "تركيز على المحادثة",       desc: "منهج متخصص في تطوير مهارات الكلام والتواصل اليومي" },
                  { icon: <BookOpen size={18} />,   title: "مناهج Cambridge",          desc: "مواد تعليمية معتمدة ومعترف بها دولياً" },
                  { icon: <MapPin size={18} />,     title: "موقع استراتيجي",           desc: "Wisma MCA — منطقة KLCC في قلب كوالالمبور" },
                ].map((f) => (
                  <div key={f.title} className="flex gap-3 p-3 bg-[#1a2a6c]/5 rounded-xl">
                    <div className="w-8 h-8 bg-[#1a2a6c]/10 rounded-lg flex items-center justify-center flex-shrink-0 text-[#1a2a6c]">
                      {f.icon}
                    </div>
                    <div>
                      <div className="font-bold text-gray-900 text-sm">{f.title}</div>
                      <div className="text-gray-500 text-xs mt-0.5">{f.desc}</div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex items-center gap-2 text-sm text-gray-600 bg-gray-50 rounded-xl p-3">
                <MapPin size={16} className="text-[#b21f1f] flex-shrink-0" />
                <span>Wisma MCA, Jalan Ampang, KLCC District, Kuala Lumpur, Malaysia</span>
              </div>
            </div>

            {/* Why Cambright */}
            <div className="bg-gradient-to-br from-[#1a2a6c] to-[#b21f1f] rounded-2xl p-5 text-white">
              <h3 className="font-black text-xl mb-4">لماذا Cambright للجزائريين؟</h3>
              <div className="space-y-3">
                {[
                  { icon: "🌍", text: "بيئة دولية حقيقية — لن تجد نفسك محاطاً بالعرب فقط، مما يجبرك على التحدث بالإنجليزية دائماً" },
                  { icon: "⚡", text: "تطور سريع في المحادثة — التحدث مع جنسيات مختلفة يطور نطقك وثقتك بشكل لا يقارن" },
                  { icon: "📍", text: "موقع مميز في KLCC — في قلب كوالالمبور مع سهولة التنقل والحياة اليومية" },
                  { icon: "👨‍👩‍👧", text: "سامر كامب للأطفال — برنامج صيفي احترافي للأطفال 7-15 سنة بيئة تعليمية ممتعة وآمنة" },
                  { icon: "📚", text: "مناهج Cambridge معتمدة — شهادة معترف بها دولياً تضيف قيمة لسيرتك الذاتية" },
                ].map((r) => (
                  <div key={r.text} className="flex gap-3 items-start">
                    <span className="text-xl flex-shrink-0">{r.icon}</span>
                    <p className="text-white/90 text-sm leading-relaxed">{r.text}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* CTA */}
        <div className="mt-8 bg-white rounded-2xl border border-gray-200 p-5">
          <h3 className="font-black text-gray-900 text-lg mb-2">ابدأ رحلتك مع Cambright</h3>
          <p className="text-gray-500 text-sm mb-4">فريقنا يساعدك في التسجيل وإجراءات التأشيرة — مجاناً وبدون أي التزام.</p>
          <div className="flex flex-col sm:flex-row gap-3">
            <a
              href="https://wa.me/601112200603?text=السلام عليكم، أريد الاستفسار عن معهد Cambright International Language Centre"
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 bg-[#25d366] hover:bg-[#1da851] text-white font-bold rounded-xl py-3 text-center transition-all"
            >
              📲 واتساب — استفسار مجاني
            </a>
            <button
              onClick={() => go("consultation")}
              className="flex-1 bg-[#1a2a6c] hover:bg-[#0f1d52] text-white font-bold rounded-xl py-3 text-center transition-all"
            >
              📅 احجز استشارة مجانية
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
