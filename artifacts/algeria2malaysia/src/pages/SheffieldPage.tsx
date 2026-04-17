import { useEffect, useState } from "react";
import { ArrowLeft, MapPin, Clock, CheckCircle, Calendar, ExternalLink, Star, Gift } from "lucide-react";
import { useNavigate } from "../hooks/useNavigate";

const EUR = (rm: number) => Math.round(rm / 5).toLocaleString();
const RM  = (rm: number) => rm.toLocaleString();

const ADULT_FEES = [
  { duration: "شهر واحد",   course: 2900,  reg: 500, ins: null,  visa: null,  total: 3400  },
  { duration: "شهران",      course: 5800,  reg: 500, ins: null,  visa: null,  total: 6300  },
  { duration: "3 أشهر",     course: 8700,  reg: 500, ins: null,  visa: null,  total: 9200  },
  { duration: "4 أشهر",     course: 11600, reg: 500, ins: 800,   visa: 2400,  total: 15300 },
  { duration: "5 أشهر",     course: 14500, reg: 500, ins: 800,   visa: 2400,  total: 18200 },
  { duration: "6 أشهر",     course: 17400, reg: 500, ins: 800,   visa: 2400,  total: 21100 },
  { duration: "7 أشهر",     course: 20300, reg: 500, ins: 800,   visa: 2400,  total: 24000 },
  { duration: "8 أشهر",     course: 23200, reg: 500, ins: 800,   visa: 2900,  total: 27400 },
  { duration: "9 أشهر",     course: 26100, reg: 500, ins: 800,   visa: 2900,  total: 30300 },
  { duration: "10 أشهر",    course: 29000, reg: 500, ins: 800,   visa: 2900,  total: 33200 },
  { duration: "11 شهراً",   course: 31900, reg: 500, ins: 800,   visa: 2900,  total: 36100 },
  { duration: "12 شهراً",   course: 34800, reg: 500, ins: 800,   visa: 2900,  total: 39000 },
];

const KIDS_FEES = [
  { duration: "أسبوع واحد", course: 1700,  reg: 500, total: 2200  },
  { duration: "أسبوعان",    course: 2380,  reg: 500, total: 2880  },
  { duration: "3 أسابيع",   course: 2720,  reg: 500, total: 3220  },
  { duration: "شهر واحد",   course: 3400,  reg: 500, total: 3900  },
  { duration: "شهران",      course: 6800,  reg: 500, total: 7300  },
  { duration: "3 أشهر",     course: 10200, reg: 500, total: 10700 },
  { duration: "4 أشهر",     course: 13600, reg: 500, total: 14100 },
];

const OFFERS = [
  {
    tag: "شهر مجاني",
    tagColor: "bg-green-500",
    title: "باقة 2 شهر + شهر مجاناً",
    subtitle: "ادفع 2 واحصل على 3",
    original: 9200,
    price: 6300,
    saving: null,
    highlight: "احصل على شهر دراسة مجاني!",
    highlightColor: "text-green-600",
    includes: ["رسوم الدراسة", "رسوم التسجيل", "اختبار تحديد المستوى", "شهادة الإتمام"],
    ielts: false,
    visa: false,
  },
  {
    tag: "خصم 20%",
    tagColor: "bg-blue-600",
    title: "باقة 6 أشهر",
    subtitle: "خصم خاص 20%",
    original: 21100,
    price: 17620,
    saving: 3480,
    highlight: "وفر 3,480 رينجت",
    highlightColor: "text-blue-700",
    includes: ["رسوم الدراسة", "الفيزا الدراسية", "التأمين الصحي", "رسوم التسجيل", "الاستقبال من المطار", "الفحص الطبي", "اختبار تحديد المستوى", "شهادة الإتمام"],
    ielts: true,
    visa: true,
  },
  {
    tag: "خصم 25%",
    tagColor: "bg-orange-500",
    title: "باقة 8 أشهر",
    subtitle: "خصم خاص 25%",
    original: 27400,
    price: 21600,
    saving: 5800,
    highlight: "وفر 5,800 رينجت",
    highlightColor: "text-orange-600",
    includes: ["رسوم الدراسة", "الفيزا الدراسية (سنة)", "التأمين الصحي", "رسوم التسجيل", "الاستقبال من المطار", "الفحص الطبي", "اختبار تحديد المستوى", "شهادة الإتمام"],
    ielts: true,
    visa: true,
  },
  {
    tag: "عرض استثنائي",
    tagColor: "bg-yellow-500",
    title: "8 أشهر + 4 أشهر مجاناً",
    subtitle: "12 شهراً بسعر 8 فقط!",
    original: null,
    price: 27400,
    saving: null,
    highlight: "احصل على 12 شهراً بسعر 8 أشهر!",
    highlightColor: "text-yellow-700",
    includes: ["رسوم الدراسة", "الفيزا الدراسية (سنة)", "التأمين الصحي", "رسوم التسجيل", "الاستقبال من المطار", "الفحص الطبي", "اختبار تحديد المستوى", "شهادة الإتمام"],
    ielts: true,
    visa: true,
  },
  {
    tag: "خصم 30%",
    tagColor: "bg-red-600",
    title: "باقة 10 أشهر",
    subtitle: "أعلى خصم متاح 30%",
    original: 33200,
    price: 24500,
    saving: 8700,
    highlight: "وفر 8,700 رينجت",
    highlightColor: "text-red-600",
    includes: ["رسوم الدراسة", "الفيزا الدراسية (سنة)", "التأمين الصحي", "رسوم التسجيل", "الاستقبال من المطار", "الفحص الطبي", "اختبار تحديد المستوى", "شهادة الإتمام"],
    ielts: true,
    visa: true,
  },
];

const TABS = ["العروض الترويجية", "رسوم البالغين", "رسوم الأطفال"];

export default function SheffieldPage() {
  const { go } = useNavigate();
  const [activeTab, setActiveTab] = useState(0);

  useEffect(() => { window.scrollTo({ top: 0, behavior: "smooth" }); }, []);

  return (
    <div className="min-h-screen bg-gray-50" dir="rtl">

      {/* ── Header ── */}
      <div className="bg-gradient-to-br from-[#0d1f4e] via-[#1a3272] to-[#1e3d8a] text-white pt-20 pb-20 px-4">
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
              <img src="/sheffield-logo.png" alt="Sheffield" className="max-w-full max-h-full object-contain" />
            </div>
            <div>
              <h1 className="text-2xl md:text-3xl font-extrabold leading-tight">أكاديمية شيفيلد للغات</h1>
              <p className="text-white/70 text-sm mt-1">Sheffield Academy Malaysia</p>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {[
              { icon: <Star size={14} />,         text: "IELTS مجاني" },
              { icon: <Calendar size={14} />,     text: "دخول كل شهر" },
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

      {/* ── Tabs ── */}
      <div className="max-w-4xl mx-auto px-4 -mt-8">
        <div className="bg-white rounded-2xl shadow-md border border-gray-100 p-1.5 flex gap-1.5 mb-6">
          {TABS.map((tab, i) => (
            <button
              key={i}
              onClick={() => setActiveTab(i)}
              className={`flex-1 rounded-xl py-2.5 px-3 text-sm font-bold transition-all ${
                activeTab === i
                  ? "bg-[#1a3272] text-white"
                  : "text-gray-500 hover:bg-gray-50"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* ── Tab: Promotional Offers ── */}
        {activeTab === 0 && (
          <div className="space-y-4 mb-6">
            {OFFERS.map((offer, i) => (
              <div key={i} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="p-5">
                  <div className="flex items-start justify-between gap-3 mb-4">
                    <div>
                      <span className={`inline-block ${offer.tagColor} text-white text-xs font-bold px-3 py-1 rounded-full mb-2`}>
                        {offer.tag}
                      </span>
                      <h3 className="text-lg font-extrabold text-gray-900">{offer.title}</h3>
                      <p className="text-gray-500 text-sm">{offer.subtitle}</p>
                    </div>
                    <div className="text-left flex-shrink-0">
                      {offer.original && (
                        <div className="text-xs text-gray-400 line-through text-left">{RM(offer.original)} RM</div>
                      )}
                      <div className="text-2xl font-extrabold text-[#1a3272]">{RM(offer.price)}</div>
                      <div className="text-xs text-gray-400 text-left">RM ≈ {EUR(offer.price)} €</div>
                    </div>
                  </div>

                  <div className={`flex items-center gap-2 text-sm font-bold mb-4 ${offer.highlightColor}`}>
                    <Gift size={15} />
                    {offer.highlight}
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
                    {offer.includes.map((item, j) => (
                      <div key={j} className="flex items-center gap-2 text-sm text-gray-600">
                        <CheckCircle size={13} className="text-green-500 flex-shrink-0" />
                        {item}
                      </div>
                    ))}
                    {offer.ielts && (
                      <div className="flex items-center gap-2 text-sm font-semibold text-blue-700">
                        <CheckCircle size={13} className="text-blue-500 flex-shrink-0" />
                        اختبار IELTS مجاني (مرة واحدة)
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* ── Tab: Adult Fees ── */}
        {activeTab === 1 && (
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden mb-6">
            <div className="p-6 border-b border-gray-100">
              <span className="inline-block text-xs font-bold px-3 py-1 rounded-full mb-2 bg-blue-100 text-blue-700">
                برنامج الإنجليزية المكثف
              </span>
              <h2 className="text-xl font-extrabold text-gray-900">رسوم البالغين 2026</h2>
              <p className="text-gray-400 text-sm">Intensive General English — Adult Course Fees</p>
              <div className="mt-3 flex flex-wrap gap-4 text-xs text-gray-500">
                <span className="flex items-center gap-1"><Clock size={12} /> التأمين الصحي يُضاف من الشهر الرابع</span>
                <span className="flex items-center gap-1"><CheckCircle size={12} className="text-green-500" /> الفيزا من الشهر الرابع</span>
              </div>
            </div>
            <div className="p-4 overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-gray-50">
                    <th className="text-right py-3 px-3 font-bold text-gray-600 border-b border-gray-100">المدة</th>
                    <th className="text-right py-3 px-3 font-bold text-gray-600 border-b border-gray-100">رسوم الدراسة</th>
                    <th className="text-right py-3 px-3 font-bold text-gray-600 border-b border-gray-100">التسجيل</th>
                    <th className="text-right py-3 px-3 font-bold text-gray-600 border-b border-gray-100">التأمين</th>
                    <th className="text-right py-3 px-3 font-bold text-gray-600 border-b border-gray-100">الفيزا</th>
                    <th className="text-right py-3 px-3 font-bold text-[#1a3272] border-b border-gray-100">الإجمالي</th>
                  </tr>
                </thead>
                <tbody>
                  {ADULT_FEES.map((row, i) => (
                    <tr key={i} className={i % 2 === 0 ? "bg-white" : "bg-blue-50/20"}>
                      <td className="py-2.5 px-3 font-medium text-gray-800 border-b border-gray-50">{row.duration}</td>
                      <td className="py-2.5 px-3 text-gray-600 border-b border-gray-50">{RM(row.course)}</td>
                      <td className="py-2.5 px-3 text-gray-600 border-b border-gray-50">{RM(row.reg)}</td>
                      <td className="py-2.5 px-3 text-gray-500 border-b border-gray-50">{row.ins ? RM(row.ins) : "—"}</td>
                      <td className="py-2.5 px-3 text-gray-500 border-b border-gray-50">{row.visa ? RM(row.visa) : "—"}</td>
                      <td className="py-2.5 px-3 font-extrabold text-[#1a3272] border-b border-gray-50">{RM(row.total)} <span className="text-xs font-normal text-gray-400">RM</span></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="px-6 pb-4">
              <p className="text-xs text-gray-400">* جميع الأسعار بالرينجت الماليزي — التأمين والفيزا يُضافان اعتباراً من الشهر الرابع</p>
            </div>
          </div>
        )}

        {/* ── Tab: Kids Fees ── */}
        {activeTab === 2 && (
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden mb-6">
            <div className="p-6 border-b border-gray-100">
              <span className="inline-block text-xs font-bold px-3 py-1 rounded-full mb-2 bg-yellow-100 text-yellow-700">
                برامج الأطفال والناشئين
              </span>
              <h2 className="text-xl font-extrabold text-gray-900">رسوم دورات الأطفال</h2>
              <p className="text-gray-400 text-sm">Sheffield Academy — Kids Course Fees</p>
            </div>
            <div className="p-4 overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-gray-50">
                    <th className="text-right py-3 px-4 font-bold text-gray-600 border-b border-gray-100">المدة</th>
                    <th className="text-right py-3 px-4 font-bold text-gray-600 border-b border-gray-100">رسوم الدراسة</th>
                    <th className="text-right py-3 px-4 font-bold text-gray-600 border-b border-gray-100">التسجيل</th>
                    <th className="text-right py-3 px-4 font-bold text-[#1a3272] border-b border-gray-100">الإجمالي</th>
                    <th className="text-right py-3 px-4 font-bold text-gray-500 border-b border-gray-100">≈ €</th>
                  </tr>
                </thead>
                <tbody>
                  {KIDS_FEES.map((row, i) => (
                    <tr key={i} className={i % 2 === 0 ? "bg-white" : "bg-yellow-50/30"}>
                      <td className="py-3 px-4 font-medium text-gray-800 border-b border-gray-50">{row.duration}</td>
                      <td className="py-3 px-4 text-gray-600 border-b border-gray-50">{RM(row.course)}</td>
                      <td className="py-3 px-4 text-gray-600 border-b border-gray-50">{RM(row.reg)}</td>
                      <td className="py-3 px-4 font-extrabold text-[#1a3272] border-b border-gray-50">{RM(row.total)} <span className="text-xs font-normal text-gray-400">RM</span></td>
                      <td className="py-3 px-4 text-gray-500 border-b border-gray-50">≈ {EUR(row.total)} €</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* ── CTA ── */}
        <div className="bg-gradient-to-r from-[#0d1f4e] to-[#1a3272] rounded-2xl p-6 mb-8 text-white text-center">
          <h3 className="text-lg font-extrabold mb-2">جاهز للتسجيل في شيفيلد؟</h3>
          <p className="text-blue-100 text-sm mb-5">تواصل معنا وسنساعدك في اختيار أفضل باقة وإتمام عملية القبول خطوة بخطوة</p>
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
