import { useEffect, useState } from "react";
import { ArrowLeft, MapPin, Clock, CheckCircle, Calendar, ExternalLink, Star, Gift, Sun, Users, FileText } from "lucide-react";
import { useNavigate } from "@/hooks/useNavigate";
import { useSEO } from "@/hooks/useSEO";
import { useReveal } from "@/hooks/useReveal";

const EUR = (rm: number) => Math.round(rm / 5).toLocaleString();
const RM  = (rm: number) => rm.toLocaleString();

const SUMMER_CAMP_FEES = [
  { weeks: 1,  rm: 1365, free: false },
  { weeks: 2,  rm: 2030, free: false },
  { weeks: 3,  rm: 2295, free: false },
  { weeks: 4,  rm: 2560, free: false },
  { weeks: 5,  rm: 3125, free: false },
  { weeks: 6,  rm: 3690, free: false },
  { weeks: 7,  rm: 4255, free: "7 + 1 أسبوع مجاني" },
  { weeks: 8,  rm: 4820, free: "أسبوع مجاني مشمول" },
  { weeks: 9,  rm: 5385, free: false },
  { weeks: 10, rm: 5950, free: "10 + 2 أسبوع مجاناً" },
  { weeks: 11, rm: 6515, free: "أسبوعان مجانيان مشمولان" },
  { weeks: 12, rm: 7080, free: false },
];

const INTENSIVE_FEES = [
  { months: 1, original: null,  rm: 3000, note: "شهر مرن — مثالي لصيف 2026" },
  { months: 2, original: null,  rm: 5000, note: "الأكثر طلباً" },
  { months: 3, original: null,  rm: 6500, note: "أفضل قيمة للمكثف" },
];

const VISA_SCHOLARSHIP = [
  { months: 6,  original: 18980, rm: 15410, discount: 25, gift: null },
  { months: 8,  original: 24040, rm: 18328, discount: 30, gift: "IELTS مجاني + Bright Bag + بطاقة مواصلات" },
  { months: 10, original: 29100, rm: 21960, discount: 30, gift: "IELTS مجاني + Bright Bag + بطاقة مواصلات" },
  { months: 12, original: 34160, rm: 24164, discount: 35, gift: "IELTS مجاني + Bright Bag + بطاقة مواصلات" },
];

const SUMMER_PACKAGES = [
  {
    name: "Classic",
    nameAr: "الكلاسيك",
    rm: 4400,
    tagColor: "bg-gray-600",
    accommodation: "بدون إقامة",
    highlights: ["6 ساعات دراسة/يوم", "رحلات جماعية كاملة", "هدايا Bright الترحيبية", "شهادة إتمام", "نشاطات رياضية"],
  },
  {
    name: "Economy",
    nameAr: "الاقتصادي",
    rm: 5500,
    tagColor: "bg-blue-600",
    accommodation: "غرفة صغيرة (walking distance)",
    highlights: ["6 ساعات دراسة/يوم", "رحلة Bright شهرية", "هدايا Bright الترحيبية", "شهادة إتمام", "نشاطات رياضية"],
  },
  {
    name: "Executive",
    nameAr: "التنفيذي",
    rm: 6900,
    rmAlt: 7700,
    tagColor: "bg-orange-500",
    accommodation: "غرفة صغيرة / متوسطة / ماستر (walking distance)",
    highlights: ["6 ساعات دراسة/يوم", "رحلات جماعية كاملة", "هدايا Bright الترحيبية", "حفل التخرج", "شهادة إتمام", "نشاطات رياضية"],
  },
  {
    name: "Executive Plus",
    nameAr: "التنفيذي بلس",
    rm: 10800,
    tagColor: "bg-purple-600",
    accommodation: "شقة ستوديو (walking distance)",
    highlights: ["6 ساعات دراسة/يوم", "استقبال من المطار (4 أشخاص)", "رحلات جماعية كاملة", "حفل التخرج", "شهادة إتمام", "نشاط فيلم + رياضة"],
    star: true,
  },
  {
    name: "Signature Family",
    nameAr: "عائلي VIP",
    rm: 13900,
    tagColor: "bg-yellow-600",
    accommodation: "شقة 3 غرف (walking distance)",
    highlights: ["6 ساعات دراسة/يوم", "استقبال من المطار (4 أشخاص)", "رحلات جماعية كاملة", "حقيبة ترحيب Bright", "شهادة إتمام", "فيلم + رياضة"],
    star: true,
  },
];

const TRIPS = [
  "🌊 Sunway Lagoon",
  "⛰️ Genting Highland",
  "🏖️ Port Dickson + Beach BBQ",
  "🥾 Outdoor Adventure Hike",
  "🇮🇳 Little India",
  "🏛️ Central Market",
  "🗺️ Merdeka Square Leisure Stop",
];

const TABS = ["☀️ السامر كامب", "📚 مكثف شهري", "🎓 منحة + فيزا", "🌍 السامر الدولي 2026"];

export default function BrightPage() {
  useSEO({
    title: "مركز برايت للغات كوالالمبور — سامر كامب وبرامج أطفال 2025",
    description: "Bright Language Center في KL: سامر كامب أسبوعي من 1,365 RM، برامج مكثفة شهرية، منح 35%، وفيزا دراسية. للأطفال والشباب من 13 سنة فأكثر.",
    canonicalPath: "/english-course-bright-kl",
    keywords: "سامر كامب ماليزيا، Bright Language Center، كورس صيفي كوالالمبور، برامج اطفال ماليزيا",
  });
  const { go } = useNavigate();
  const reveal = useReveal();
  const [activeTab, setActiveTab] = useState(0);

  useEffect(() => { window.scrollTo({ top: 0, behavior: "smooth" }); }, []);

  return (
    <div ref={reveal} className="section-reveal min-h-screen bg-[#f8fafc]" dir="rtl">

      {/* ── Header ── */}
      <div className="relative overflow-hidden bg-gradient-to-br from-[#b03a10] via-[#e85d26] to-[#f07a40] text-white pt-20 pb-24 px-4">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 right-0 w-96 h-96 bg-orange-300/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/4" />
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-yellow-200/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/4" />
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
            <div className="w-20 h-20 bg-white rounded-2xl flex-shrink-0 shadow-xl overflow-hidden">
              <img src="/bright-logo.png" alt="Bright Language Center" className="w-full h-full object-cover object-left" />
            </div>
            <div>
              <h1 className="text-2xl md:text-3xl font-black leading-tight">Bright Language Center</h1>
              <p className="text-white/80 text-sm mt-1">مركز برايت للغات — كوالالمبور</p>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {[
              { icon: <Sun size={14} />,          text: "سامر كامب أسبوعي" },
              { icon: <Users size={14} />,        text: "من 13 سنة فأكثر" },
              { icon: <MapPin size={14} />,       text: "كوالالمبور" },
              { icon: <CheckCircle size={14} />,  text: "تأشيرة طالب متاحة" },
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-2 bg-white/10 border border-white/15 rounded-xl px-3 py-2 text-sm backdrop-blur-sm">
                <span className="text-white/70">{item.icon}</span>
                <span className="text-white/90 font-medium">{item.text}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Tabs ── */}
      <div className="max-w-4xl mx-auto px-4 -mt-6 relative z-10">
        <div className="bg-white rounded-2xl shadow-[0_4px_20px_-4px_rgba(0,0,0,.12)] border border-gray-100 p-1.5 grid grid-cols-2 sm:grid-cols-4 gap-1.5 mb-6">
          {TABS.map((tab, i) => (
            <button
              key={i}
              onClick={() => setActiveTab(i)}
              className={`rounded-xl py-2.5 px-2 text-[11px] sm:text-sm font-bold transition-all text-center ${
                activeTab === i
                  ? "bg-[#e85d26] text-white"
                  : "text-gray-500 hover:bg-gray-50"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* ── Tab 0: Summer Camp ── */}
        {activeTab === 0 && (
          <div className="space-y-4 mb-6">
            {/* Promo badges */}
            <div className="bg-gradient-to-l from-orange-50 to-yellow-50 border border-orange-200 rounded-2xl p-4">
              <div className="flex items-center gap-2 mb-3">
                <Star size={16} className="text-orange-500" />
                <span className="font-bold text-orange-700 text-sm">عروض خاصة Summer Camp 2026</span>
              </div>
              <div className="flex flex-wrap gap-2">
                <span className="bg-orange-500 text-white text-xs font-bold px-3 py-1.5 rounded-full">7 أسابيع + 1 مجاني 🎁</span>
                <span className="bg-red-600 text-white text-xs font-bold px-3 py-1.5 rounded-full">10 أسابيع + 2 مجاناً 🎁</span>
              </div>
            </div>

            {/* Schedule */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5">
              <div className="flex items-center gap-2 mb-3">
                <Calendar size={16} className="text-orange-600" />
                <h3 className="font-bold text-gray-800">الجدول الدراسي</h3>
              </div>
              <div className="grid sm:grid-cols-2 gap-3 text-sm">
                <div className="bg-orange-50 rounded-xl p-3 border border-orange-100">
                  <div className="font-bold text-orange-700 mb-1">الإثنين – الخميس</div>
                  <div className="text-gray-600">الجلسة الصباحية: 8:30 – 12:30</div>
                  <div className="text-gray-600">الجلسة المسائية: 13:30 – 16:30</div>
                </div>
                <div className="bg-yellow-50 rounded-xl p-3 border border-yellow-100">
                  <div className="font-bold text-yellow-700 mb-1">الجمعة</div>
                  <div className="text-gray-600">صباحي: 8:30 – 12:30</div>
                  <div className="text-gray-600">أو مسائي: 13:00 – 17:30</div>
                </div>
              </div>
              <div className="flex items-center gap-2 mt-3 text-xs text-gray-500">
                <Clock size={12} />
                <span>6 ساعات يومياً (يشمل استراحة الغداء ساعة) — الجمعة 4 ساعات</span>
              </div>
            </div>

            {/* Pricing table */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
              <div className="p-5 border-b border-gray-100">
                <h3 className="font-extrabold text-gray-900 text-lg">جدول الأسعار الأسبوعية</h3>
                <p className="text-gray-400 text-sm">Bright Language Center — Summer Camp Fee Structure</p>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full min-w-[420px] text-sm">
                  <thead>
                    <tr className="bg-[#e85d26]">
                      <th className="text-right py-3 px-4 font-bold text-white border-b border-white/10">عدد الأسابيع</th>
                      <th className="text-right py-3 px-4 font-bold text-white border-b border-white/10">السعر (RM)</th>
                      <th className="text-right py-3 px-4 font-bold text-yellow-200 border-b border-white/10">≈ €</th>
                      <th className="text-right py-3 px-4 font-bold text-white border-b border-white/10">ملاحظة</th>
                    </tr>
                  </thead>
                  <tbody>
                    {SUMMER_CAMP_FEES.map((row, i) => (
                      <tr
                        key={i}
                        className={`${row.free ? "bg-orange-50" : i % 2 === 0 ? "bg-white" : "bg-gray-50/50"} hover:bg-orange-50/30 transition-colors`}
                      >
                        <td className="py-3 px-4 font-semibold text-gray-800 border-b border-gray-50">
                          {row.weeks} {row.weeks === 1 ? "أسبوع" : "أسابيع"}
                        </td>
                        <td className="py-3 px-4 font-extrabold text-[#e85d26] border-b border-gray-50">
                          {RM(row.rm)} <span className="text-xs font-normal text-gray-400">RM</span>
                        </td>
                        <td className="py-3 px-4 text-gray-500 border-b border-gray-50">≈ {EUR(row.rm)} €</td>
                        <td className="py-3 px-4 border-b border-gray-50">
                          {row.free ? (
                            <span className="bg-orange-500 text-white text-xs font-bold px-2 py-0.5 rounded-full">
                              🎁 {row.free}
                            </span>
                          ) : (
                            <span className="text-gray-300">—</span>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="px-5 py-3 text-xs text-gray-400 bg-gray-50 border-t border-gray-100">
                * الأسعار بالرينجت الماليزي — للأعمار 13 سنة فأكثر — للتسجيل: رسوم حجز RM 500 غير قابلة للاسترداد
              </div>
            </div>
          </div>
        )}

        {/* ── Tab 1: Intensive Monthly ── */}
        {activeTab === 1 && (
          <div className="space-y-4 mb-6">
            <div className="bg-gradient-to-l from-orange-50 to-red-50 border border-orange-200 rounded-2xl p-4">
              <div className="flex items-center gap-2 mb-2">
                <Star size={16} className="text-orange-600" />
                <span className="font-bold text-orange-700">عرض الصيف 2026 — خصم 25%</span>
              </div>
              <p className="text-sm text-gray-600">سارٍ من مارس إلى أغسطس 2026. الأسعار أدناه تعكس الخصم المباشر.</p>
            </div>

            {/* What's included */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5">
              <h3 className="font-bold text-gray-800 mb-3">جميع الباقات تشمل:</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {["رسوم التسجيل", "اختبار تحديد المستوى", "الكتب والمواد الدراسية", "رسوم الدراسة"].map((item, i) => (
                  <div key={i} className="flex items-center gap-2 text-sm text-gray-600">
                    <CheckCircle size={14} className="text-orange-500 flex-shrink-0" />
                    {item}
                  </div>
                ))}
              </div>
              <div className="mt-3 text-xs text-gray-400 flex items-center gap-1">
                <Clock size={11} />
                للأعمار 13 سنة فأكثر — رسوم حجز RM 500 لتأكيد المقعد
              </div>
            </div>

            {/* Pricing cards */}
            <div className="grid gap-4">
              {INTENSIVE_FEES.map((row, i) => (
                <div key={i} className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 flex items-center justify-between gap-4">
                  <div>
                    <span className="inline-block bg-orange-100 text-orange-700 text-xs font-bold px-2.5 py-0.5 rounded-full mb-2">
                      {row.note}
                    </span>
                    <div className="font-extrabold text-gray-900 text-lg">
                      {row.months} {row.months === 1 ? "شهر" : "أشهر"}
                    </div>
                    <div className="text-gray-400 text-sm mt-0.5">Intensive Program</div>
                  </div>
                  <div className="text-left flex-shrink-0">
                    <div className="text-2xl font-extrabold text-[#e85d26]">{RM(row.rm)}</div>
                    <div className="text-xs text-gray-400">RM ≈ {EUR(row.rm)} €</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ── Tab 2: Visa Scholarship ── */}
        {activeTab === 2 && (
          <div className="space-y-4 mb-6">
            {/* What's included */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5">
              <h3 className="font-bold text-gray-800 mb-3 flex items-center gap-2">
                <CheckCircle size={16} className="text-orange-500" />
                جميع الباقات تشمل:
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {["رسوم الفيزا الدراسية", "التأمين الطبي", "الاستقبال من المطار", "رسوم التسجيل", "اختبار تحديد المستوى", "الكتب والمواد الدراسية"].map((item, i) => (
                  <div key={i} className="flex items-center gap-2 text-sm text-gray-600">
                    <CheckCircle size={13} className="text-green-500 flex-shrink-0" />
                    {item}
                  </div>
                ))}
              </div>
              <div className="mt-3 text-xs text-gray-400">
                * للأعمار 18–45 سنة — ضريبة SST 6% تُضاف على أساس شهري — رسوم الفيزا RM 3,300 لتأمين المقعد (غير قابلة للاسترداد)
              </div>
            </div>

            {/* Scholarship cards */}
            {VISA_SCHOLARSHIP.map((row, i) => (
              <div key={i} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="bg-gradient-to-l from-orange-600 to-[#b03a10] px-5 py-3 flex items-center justify-between">
                  <div>
                    <div className="text-white font-extrabold text-base">
                      {row.months} {row.months === 1 ? "شهر" : "أشهر"}
                    </div>
                    <div className="text-orange-200 text-xs">منحة دراسية + فيزا طالب</div>
                  </div>
                  <span className="bg-white/20 border border-white/30 text-white text-xs font-bold px-3 py-1 rounded-full">
                    خصم {row.discount}%
                  </span>
                </div>
                <div className="p-5">
                  <div className="flex items-start justify-between gap-3 mb-3">
                    <div>
                      <div className="text-sm text-gray-400 line-through mb-0.5">{RM(row.original)} RM</div>
                      <div className="text-2xl font-extrabold text-[#e85d26]">{RM(row.rm)} <span className="text-sm font-normal text-gray-400">RM</span></div>
                      <div className="text-xs text-gray-400">≈ {EUR(row.rm)} €</div>
                    </div>
                    <div className="bg-green-100 text-green-700 text-xs font-bold px-3 py-1.5 rounded-xl text-left">
                      وفر<br />{RM(row.original - row.rm)} RM
                    </div>
                  </div>
                  {row.gift && (
                    <div className="flex items-start gap-2 bg-yellow-50 border border-yellow-200 rounded-xl p-3 text-sm text-yellow-800 font-semibold">
                      <Gift size={15} className="text-yellow-600 flex-shrink-0 mt-0.5" />
                      <span>هدية مجانية: {row.gift}</span>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* ── Tab 3: International Summer Program 2026 ── */}
        {activeTab === 3 && (
          <div className="space-y-4 mb-6">
            {/* Trips included */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5">
              <h3 className="font-bold text-gray-800 mb-3 flex items-center gap-2">
                <Sun size={16} className="text-orange-500" />
                الرحلات المشمولة في معظم الباقات
              </h3>
              <div className="flex flex-wrap gap-2">
                {TRIPS.map((trip, i) => (
                  <span key={i} className="bg-orange-50 text-orange-800 border border-orange-100 text-xs font-semibold px-3 py-1.5 rounded-full">
                    {trip}
                  </span>
                ))}
              </div>
              <div className="mt-3 text-xs text-gray-400 flex items-center gap-1">
                <Users size={11} />
                للأعمار 13 سنة فأكثر — الباقات لشخص واحد
              </div>
            </div>

            {/* Package cards */}
            {SUMMER_PACKAGES.map((pkg, i) => (
              <div key={i} className={`bg-white rounded-2xl shadow-sm border ${pkg.star ? "border-orange-300" : "border-gray-100"} overflow-hidden`}>
                {pkg.star && (
                  <div className="bg-gradient-to-l from-orange-100 to-yellow-50 px-5 py-1.5 flex items-center gap-2">
                    <Star size={13} className="text-orange-500" />
                    <span className="text-xs font-bold text-orange-700">الأكثر شمولاً</span>
                  </div>
                )}
                <div className="p-5">
                  <div className="flex items-start justify-between gap-3 mb-3">
                    <div>
                      <span className={`inline-block ${pkg.tagColor} text-white text-xs font-bold px-3 py-0.5 rounded-full mb-2`}>
                        {pkg.name}
                      </span>
                      <h3 className="text-lg font-extrabold text-gray-900">{pkg.nameAr}</h3>
                      <div className="flex items-center gap-1.5 text-xs text-gray-400 mt-1">
                        <MapPin size={11} />
                        {pkg.accommodation}
                      </div>
                    </div>
                    <div className="text-left flex-shrink-0">
                      <div className="text-2xl font-extrabold text-[#e85d26]">{RM(pkg.rm)}</div>
                      {pkg.rmAlt && (
                        <div className="text-sm font-bold text-orange-400">– {RM(pkg.rmAlt)}</div>
                      )}
                      <div className="text-xs text-gray-400">RM ≈ {EUR(pkg.rm)} €</div>
                    </div>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
                    {pkg.highlights.map((h, j) => (
                      <div key={j} className="flex items-center gap-2 text-sm text-gray-600">
                        <CheckCircle size={13} className="text-orange-400 flex-shrink-0" />
                        {h}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}

            <div className="text-xs text-gray-400 px-2 space-y-1">
              <p>* خدمة الاستقبال من المطار: RM 100 إضافية للشخص</p>
              <p>* الأنشطة الإضافية: RM 1,500 (للوالدين/المرافق)</p>
              <p>* رسوم الطفل (برامج الأطفال): RM 3,000/شهر للبالغين — RM 3,800/شهر للأطفال</p>
              <p>* باقتَي Executive Plus وSignature Family فقط لمن يصحبهم أطفال</p>
            </div>
          </div>
        )}

        {/* ── CTA ── */}
        <div className="bg-gradient-to-r from-[#b03a10] to-[#e85d26] rounded-2xl p-6 mb-8 text-white text-center">
          <h3 className="text-lg font-extrabold mb-2">جاهز للتسجيل في Bright؟</h3>
          <p className="text-orange-100 text-sm mb-5">عبّئ فورم المعهد وسنتواصل معك لاختيار أفضل باقة وإتمام عملية القبول خطوة بخطوة</p>
          <div className="flex justify-center">
            <a
              href="https://docs.google.com/forms/d/e/1FAIpQLSf6Xx2DET7SCulFT3EuvLW_8wuEA9aE9EkOy06i9lGC09T81w/viewform?usp=header"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 bg-white text-[#e85d26] hover:bg-orange-50 font-bold text-sm rounded-xl px-8 py-3 transition-all shadow-md"
            >
              <ExternalLink size={16} />
              عبّئ فورم المعهد لاستخراج القبول
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
