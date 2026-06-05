import { useEffect, useState } from "react";
import { ArrowLeft, MapPin, Clock, CheckCircle, Calendar, ExternalLink, BookOpen } from "lucide-react";
import { useNavigate } from "@/hooks/useNavigate";
import { useSEO } from "@/hooks/useSEO";

const EUR = (rm: number) => Math.round(rm / 5).toLocaleString();
const RM  = (rm: number) => rm.toLocaleString();

const PRICES = [
  { months: 1,  standard: 4000,  special: 2800  },
  { months: 2,  standard: 7500,  special: 5250  },
  { months: 3,  standard: 11000, special: 7700  },
  { months: 4,  standard: 15000, special: 10500 },
  { months: 5,  standard: 18000, special: 12600 },
  { months: 6,  standard: 21500, special: 15050 },
  { months: 7,  standard: 25000, special: 17500 },
  { months: 8,  standard: 28500, special: 19950 },
  { months: 9,  standard: 32000, special: 22400 },
  { months: 10, standard: 35400, special: 24780 },
  { months: 11, standard: 39000, special: 27300 },
  { months: 12, standard: 42000, special: 29400 },
];

const PROGRAMS = [
  {
    name: "الإنجليزية الدولية",
    nameEn: "Erican International English",
    color: "bg-teal-500",
    desc: "برنامج شامل لتطوير مهارات اللغة الإنجليزية بأسلوب مكثف وتفاعلي. يناسب المراهقين والبالغين الراغبين في تحسين التواصل اليومي والمهني.",
  },
  {
    name: "إنجليزية الأعمال",
    nameEn: "Erican Business English",
    color: "bg-orange-500",
    desc: "مثالي للمهنيين والطلاب — يركز على مهارات الأعمال كالاجتماعات والعروض التقديمية والكتابة المهنية للنجاح في البيئات الدولية.",
  },
  {
    name: "Cambridge الدولي",
    nameEn: "Erican Cambridge English",
    color: "bg-violet-400",
    desc: "احصل على شهادة Cambridge المعترف بها دولياً. يبني هذا البرنامج أساساً قوياً في اللغة ويفتح أبواب الفرص الأكاديمية والمهنية.",
  },
  {
    name: "دروس خاصة 1 لـ 1",
    nameEn: "Private Class 1-to-1",
    color: "bg-orange-500",
    desc: "دروس فردية مصممة خصيصاً لأهداف الطالب وإيقاعه. تركيز كامل من المعلم مع مواد مخصصة وجداول مرنة لتحقيق أسرع تقدم.",
  },
  {
    name: "إنجليزية الناشئين",
    nameEn: "Erican Young Learners",
    color: "bg-teal-500",
    desc: "يبني أساساً لغوياً قوياً للطلاب الصغار عبر دروس تفاعلية. مصمم لمن يستعد للالتحاق بالمدارس الدولية مع تنمية مهارات القراءة والكتابة والتحدث.",
  },
  {
    name: "تحضير IELTS",
    nameEn: "Erican IELTS Preparation",
    color: "bg-violet-400",
    desc: "تدريب مركّز وموجه للنتائج لمساعدتك على تحقيق الدرجة المطلوبة في IELTS. يشمل جميع أقسام الاختبار مع اختبارات محاكاة حقيقية.",
  },
];

const EXTRAS = [
  { label: "رسوم التسجيل", value: "300 RM" },
  { label: "المواد الدراسية", value: "150 RM × عدد الأشهر" },
  { label: "تأشيرة 6 أشهر", value: "2,050 RM" },
  { label: "تأشيرة سنة كاملة", value: "2,450 RM" },
];

const INCLUDES = [
  "الرسوم تشمل جميع تكاليف الدراسة بدون رسوم مخفية",
  "شهادة إتمام معتمدة عند اجتياز كل مستوى",
  "مشاركة مجانية في جميع الأنشطة التعليمية",
  "دخول مجاني لجميع المرافق التعليمية",
  "استقبال مجاني من المطار لحاملي التأشيرة",
];

const TABS = ["الأسعار والباقات", "البرامج المتاحة"];

export default function EricanPage() {
  useSEO({
    title: "كلية إيريكان كوالالمبور — برامج أطفال وإنجليزي عام 2025",
    description: "Erican College في Cheras KL: برامج للأطفال من 7 سنوات، IELTS، وإنجليزي أكاديمي. 30+ سنة خبرة. يبدأ من 1,500 RM/شهر للطلاب الجزائريين.",
    canonicalPath: "/english-course-erican-kl",
    keywords: "معهد إيريكان ماليزيا، Erican College، كورس اطفال كوالالمبور، انجليزي للاطفال ماليزيا",
  });
  const { go } = useNavigate();
  const [activeTab, setActiveTab] = useState(0);

  useEffect(() => { window.scrollTo({ top: 0, behavior: "smooth" }); }, []);

  return (
    <div className="min-h-screen bg-[#f8fafc]" dir="rtl">

      {/* ── Header ── */}
      <div className="relative overflow-hidden bg-gradient-to-br from-[#3d1a6e] via-[#5a2a9a] to-[#6d3ab0] text-white pt-20 pb-24 px-4">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 right-0 w-96 h-96 bg-purple-400/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/4" />
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-violet-300/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/4" />
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
              <img src="/erican-logo.png" alt="Erican" className="max-w-full max-h-full object-contain" />
            </div>
            <div>
              <h1 className="text-2xl md:text-3xl font-black leading-tight">مركز إيريكان للغات</h1>
              <p className="text-white/70 text-sm mt-1">Erican Language Centre</p>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {[
              { icon: <BookOpen size={14} />,    text: "6 برامج متاحة" },
              { icon: <Calendar size={14} />,    text: "دخول كل شهر" },
              { icon: <MapPin size={14} />,      text: "كوالالمبور" },
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

      {/* ── Tabs ── */}
      <div className="max-w-4xl mx-auto px-4 -mt-6 relative z-10">
        <div className="bg-white rounded-2xl shadow-[0_4px_20px_-4px_rgba(0,0,0,.12)] border border-gray-100 p-1.5 flex gap-1.5 mb-6">
          {TABS.map((tab, i) => (
            <button
              key={i}
              onClick={() => setActiveTab(i)}
              className={`flex-1 rounded-xl py-2.5 px-3 text-sm font-bold transition-all ${
                activeTab === i
                  ? "bg-[#5a2a9a] text-white"
                  : "text-gray-500 hover:bg-gray-50"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* ── Tab: Prices ── */}
        {activeTab === 0 && (
          <>
            {/* Highlights */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
              {[
                { months: "3 أشهر",  rm: 7700 },
                { months: "6 أشهر",  rm: 15050 },
                { months: "9 أشهر",  rm: 22400 },
                { months: "12 شهراً", rm: 29400 },
              ].map((p, i) => (
                <div key={i} className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 text-center">
                  <div className="text-xs text-gray-400 mb-1">{p.months}</div>
                  <div className="text-lg font-extrabold text-[#5a2a9a]">{RM(p.rm)}</div>
                  <div className="text-xs text-gray-400">RM</div>
                </div>
              ))}
            </div>

            {/* Price Table */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden mb-6">
              <div className="p-6 border-b border-gray-100">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <span className="inline-block text-xs font-bold px-3 py-1 rounded-full mb-2 bg-violet-100 text-violet-700">
                      العرض الترويجي الخاص
                    </span>
                    <h2 className="text-xl font-extrabold text-gray-900">رسوم الدراسة 2025</h2>
                    <p className="text-gray-400 text-sm">Tuition Fees 2025</p>
                  </div>
                  <div className="text-left flex-shrink-0">
                    <div className="text-xs text-gray-400 mb-1">يبدأ من</div>
                    <div className="text-2xl font-extrabold text-[#5a2a9a]">2,800 <span className="text-sm font-normal">RM</span></div>
                    <div className="text-xs text-gray-400">≈ 560 €</div>
                  </div>
                </div>

                <ul className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {INCLUDES.map((h, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-gray-700">
                      <CheckCircle size={14} className="text-green-500 flex-shrink-0 mt-0.5" />
                      {h}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="p-6">
                <h3 className="text-sm font-bold text-gray-700 mb-4">جدول الأسعار الكامل — السعر الأصلي والعرض الخاص</h3>
                <div className="overflow-x-auto rounded-xl border border-gray-100">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="bg-gray-50">
                        <th className="text-right py-3 px-4 font-bold text-gray-600 border-b border-gray-100">المدة</th>
                        <th className="text-right py-3 px-4 font-bold text-gray-600 border-b border-gray-100">السعر الأصلي</th>
                        <th className="text-right py-3 px-4 font-bold text-violet-700 border-b border-gray-100">العرض الخاص</th>
                        <th className="text-right py-3 px-4 font-bold text-gray-600 border-b border-gray-100">تقريباً (€)</th>
                      </tr>
                    </thead>
                    <tbody>
                      {PRICES.map((p, i) => (
                        <tr key={i} className={i % 2 === 0 ? "bg-white" : "bg-violet-50/30"}>
                          <td className="py-3 px-4 font-medium text-gray-800 border-b border-gray-50">
                            {p.months === 1 ? "شهر واحد" : p.months === 2 ? "شهران" : `${p.months} أشهر`}
                          </td>
                          <td className="py-3 px-4 text-gray-400 line-through border-b border-gray-50">
                            {RM(p.standard)} RM
                          </td>
                          <td className="py-3 px-4 font-bold text-[#5a2a9a] border-b border-gray-50">
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
              </div>
            </div>

            {/* Additional Fees */}
            <div className="bg-white rounded-2xl shadow-sm border border-amber-100 overflow-hidden mb-6">
              <div className="bg-amber-50 px-6 py-4 border-b border-amber-100">
                <h3 className="font-bold text-amber-800 text-sm">الرسوم الإضافية</h3>
                <p className="text-amber-600 text-xs mt-1">تُضاف إلى رسوم الدراسة</p>
              </div>
              <div className="p-4 grid gap-3">
                {EXTRAS.map((item, i) => (
                  <div key={i} className="flex items-center justify-between p-3 rounded-xl bg-gray-50 border border-gray-100">
                    <div className="font-medium text-gray-700 text-sm">{item.label}</div>
                    <div className="font-extrabold text-amber-700 text-sm">{item.value}</div>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}

        {/* ── Tab: Programs ── */}
        {activeTab === 1 && (
          <div className="grid md:grid-cols-2 gap-4 mb-6">
            {PROGRAMS.map((p, i) => (
              <div key={i} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                <div className={`${p.color} h-1.5`} />
                <div className="p-5">
                  <div className={`inline-block ${p.color} text-white text-xs font-bold px-3 py-1 rounded-full mb-3`}>
                    {p.nameEn}
                  </div>
                  <h3 className="font-extrabold text-gray-900 text-base mb-2">{p.name}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed">{p.desc}</p>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* ── CTA ── */}
        <div className="bg-gradient-to-r from-[#3d1a6e] to-[#5a2a9a] rounded-2xl p-6 mb-8 text-white text-center">
          <h3 className="text-lg font-extrabold mb-2">جاهز للتسجيل في إيريكان؟</h3>
          <p className="text-purple-100 text-sm mb-5">عبّئ فورم المعهد وسنتواصل معك لإتمام عملية القبول والتأشيرة خطوة بخطوة</p>
          <div className="flex justify-center">
            <a
              href="https://docs.google.com/forms/d/e/1FAIpQLSf6Xx2DET7SCulFT3EuvLW_8wuEA9aE9EkOy06i9lGC09T81w/viewform?usp=header"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 bg-white text-[#3d1a6e] hover:bg-purple-50 font-bold text-sm rounded-xl px-8 py-3 transition-all shadow-md"
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
