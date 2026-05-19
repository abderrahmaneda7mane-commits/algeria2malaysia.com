import { ArrowLeft, Star, Clock, MapPin, BookOpen, Users, DollarSign, GraduationCap, CheckCircle } from "lucide-react";
import { useNavigate } from "../hooks/useNavigate";
import { useSEO } from "../hooks/useSEO";

const FORM_URL = "https://docs.google.com/forms/d/e/1FAIpQLSf6Xx2DET7SCulFT3EuvLW_8wuEA9aE9EkOy06i9lGC09T81w/viewform?usp=header";
const WA = "https://wa.me/601112200603";

const INSTITUTES = [
  {
    id: "stratford-institute" as const,
    name: "Stratford International College",
    nameAr: "معهد ستراتفورد الدولي",
    logo: "/stratford-logo.png",
    color: "#16a34a",
    bg: "from-green-50 to-emerald-50",
    border: "border-green-200",
    badge: "الأشهر",
    badgeBg: "bg-green-500",
    tagBg: "bg-green-100 text-green-800",
    desc: "معهد معتمد لتعليم اللغة الإنجليزية مع تخصصات IELTS والإنجليزي العام والأعمال.",
    programs: ["IELTS Preparation", "General English", "Business English", "Academic English"],
    duration: "4 أسابيع — 6 أشهر",
    from: "1,900 RM",
    perUnit: "شهر",
    location: "KLCC، كوالالمبور",
    rating: 4.8,
    highlight: "الأمثل لـ IELTS",
  },
  {
    id: "bigben-institute" as const,
    name: "Big Ben Language Centre",
    nameAr: "مركز بيغ بان للغات",
    logo: "/bigben-logo.png",
    color: "#7a1a2e",
    bg: "from-red-50 to-rose-50",
    border: "border-red-200",
    badge: "تقييم عالٍ",
    badgeBg: "bg-red-600",
    tagBg: "bg-red-100 text-red-800",
    desc: "مركز لغات بريطاني الأسلوب في قلب KL — IELTS وإنجليزي تجاري مع مدرسين محترفين.",
    programs: ["IELTS", "Business English", "Cambridge Exam Prep", "Spoken English"],
    duration: "1 — 12 شهر",
    from: "1,800 RM",
    perUnit: "شهر",
    location: "وسط كوالالمبور",
    rating: 4.7,
    highlight: "أسلوب بريطاني",
  },
  {
    id: "erican-institute" as const,
    name: "Erican College",
    nameAr: "كلية إيريكان",
    logo: "/erican-logo.png",
    color: "#5a2a9a",
    bg: "from-purple-50 to-violet-50",
    border: "border-purple-200",
    badge: "برامج الأطفال",
    badgeBg: "bg-purple-600",
    tagBg: "bg-purple-100 text-purple-800",
    desc: "كلية معتمدة بخبرة 30+ سنة تقدم برامج أطفال (7+ سنوات) وإنجليزي عام وأكاديمي.",
    programs: ["Kids Program (7+)", "General English", "Academic English", "IELTS"],
    duration: "3 أشهر — سنة",
    from: "1,500 RM",
    perUnit: "شهر",
    location: "Cheras، كوالالمبور",
    rating: 4.6,
    highlight: "برامج الأطفال",
  },
  {
    id: "sheffield-institute" as const,
    name: "Sheffield College Malaysia",
    nameAr: "كلية شيفيلد ماليزيا",
    logo: "/sheffield-logo.png",
    color: "#1a3272",
    bg: "from-blue-50 to-sky-50",
    border: "border-blue-200",
    badge: "بريطاني الأسلوب",
    badgeBg: "bg-blue-700",
    tagBg: "bg-blue-100 text-blue-800",
    desc: "تعليم إنجليزي بأسلوب بريطاني مع إمكانية التحويل لجامعات ماليزية وبريطانية.",
    programs: ["Foundation English", "IELTS", "Cambridge", "University Pathway"],
    duration: "3 — 18 شهر",
    from: "3,400 RM",
    perUnit: "شهر",
    location: "Damansara، كوالالمبور",
    rating: 4.7,
    highlight: "University Pathway",
  },
  {
    id: "bright-institute" as const,
    name: "Bright Language Center",
    nameAr: "مركز برايت للغات",
    logo: "/bright-logo.png",
    logoClass: "object-cover object-left",
    color: "#e85d26",
    bg: "from-orange-50 to-amber-50",
    border: "border-orange-200",
    badge: "سامر كامب",
    badgeBg: "bg-orange-500",
    tagBg: "bg-orange-100 text-orange-800",
    desc: "متخصص في سامر كامب الأسبوعي للأطفال والشباب (13+) مع منح وفيزا دراسية.",
    programs: ["Summer Camp (أسبوعي)", "Intensive English", "Kids 13+", "Study Visa Program"],
    duration: "أسبوع — 8 أسابيع",
    from: "1,365 RM",
    perUnit: "أسبوع",
    location: "كوالالمبور",
    rating: 4.5,
    highlight: "للأطفال 13+",
  },
  {
    id: "cambright-institute" as const,
    name: "Cambright International Language Centre",
    nameAr: "معهد Cambright الدولي",
    logo: "/cambright-logo.png",
    color: "#1a2a6c",
    bg: "from-blue-50 to-indigo-50",
    border: "border-blue-300",
    badge: "بيئة دولية 🌍",
    badgeBg: "bg-[#1a2a6c]",
    tagBg: "bg-blue-100 text-blue-900",
    desc: "معهد دولي في KLCC — طلاب من جنسيات مختلفة، تركيز على المحادثة، ومناهج Cambridge. الخيار الأمثل لمن يريد إنجليزية حقيقية بعيداً عن الجو العربي.",
    programs: ["Academic 4h/يوم", "Intensive 6h/يوم", "IELTS Preparation", "سامر كامب 7-15 سنة", "حصص خاصة"],
    duration: "شهر — 12 شهراً",
    from: "2,650 RM",
    perUnit: "شهر",
    location: "Wisma MCA — KLCC",
    rating: 4.8,
    highlight: "أقل عرب — أكثر تنوع",
  },
];

const WHY = [
  { icon: <DollarSign size={20} />, title: "تكلفة منخفضة", desc: "أرخص 3× من أوروبا مع نفس جودة التعليم البريطاني" },
  { icon: <Users size={20} />, title: "بيئة دولية", desc: "تتحدث إنجليزي مع طلاب من 50+ دولة يومياً" },
  { icon: <GraduationCap size={20} />, title: "فيزا ميسرة", desc: "عملية فيزا الطالب بسيطة ومنح تصل 35%" },
];

export default function InstituteListPage() {
  const { go } = useNavigate();

  useSEO({
    title: "معاهد اللغة الإنجليزية في ماليزيا 2025 — Algeria2Malaysia",
    description: "دليل أفضل 6 معاهد لغة إنجليزية معتمدة في كوالالمبور ماليزيا: ستراتفورد، بيغ بان، إيريكان، شيفيلد، برايت، وCambright الدولي. IELTS، إنجليزي عام، سامر كامب للجزائريين.",
    canonicalPath: "/institutes",
    keywords: "معهد لغة انجليزية ماليزيا، IELTS ماليزيا، كورس انجليزي كوالالمبور، معاهد معتمدة جزائر ماليزيا",
  });

  return (
    <div className="min-h-screen bg-[#fafafa]" dir="rtl">

      {/* ── Hero ── */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#0a2e14] via-[#0f4d22] to-[#166534] text-white pt-24 pb-20 px-4">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-0 w-[400px] h-[400px] bg-green-400/8 rounded-full blur-3xl -translate-y-1/2" />
          <div className="absolute bottom-0 right-0 w-[350px] h-[350px] bg-emerald-300/8 rounded-full blur-3xl translate-y-1/2" />
          <div className="absolute inset-0 opacity-[0.025]" style={{ backgroundImage: "radial-gradient(circle, rgba(255,255,255,.8) 1px, transparent 1px)", backgroundSize: "28px 28px" }} />
        </div>
        <div className="relative z-10 max-w-3xl mx-auto text-center">
          <button onClick={() => go("home")} className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/18 border border-white/20 text-white/85 hover:text-white text-sm font-medium px-4 py-2 rounded-full mb-8 transition-all">
            <ArrowLeft size={14} className="rotate-180" />
            الصفحة الرئيسية
          </button>
          <div className="inline-flex items-center gap-2 bg-white/12 border border-white/20 rounded-full px-4 py-1.5 text-sm font-semibold text-green-200 mb-5">
            <BookOpen size={14} />
            6 معاهد معتمدة في كوالالمبور
          </div>
          <h1 className="text-4xl md:text-5xl font-black mb-4 leading-tight">
            معاهد اللغة الإنجليزية<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-l from-green-200 to-emerald-100">في ماليزيا 2025</span>
          </h1>
          <p className="text-green-100/80 text-lg max-w-xl mx-auto mb-8 leading-relaxed">
            اختر أفضل معهد لتعلم الإنجليزية في كوالالمبور — IELTS، عام، أعمال، أطفال، وسامر كامب
          </p>
          <div className="flex flex-wrap gap-3 justify-center">
            <button
              onClick={() => go("home", { scrollTo: "institutes" })}
              className="inline-flex items-center gap-2 bg-white text-green-800 hover:bg-green-50 px-6 py-3 rounded-full font-bold text-sm shadow-lg hover:-translate-y-0.5 transition-all"
            >
              اختبر معهدك المناسب
            </button>
            <a href={FORM_URL} target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-white/15 hover:bg-white/25 border border-white/25 text-white px-6 py-3 rounded-full font-semibold text-sm transition-all">
              عبّئ فورم التسجيل
            </a>
          </div>
        </div>
      </section>

      <div className="max-w-5xl mx-auto px-4 py-12 space-y-6">

        {/* Why section */}
        <div className="grid md:grid-cols-3 gap-4 mb-8">
          {WHY.map((w) => (
            <div key={w.title} className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm hover:shadow-md hover:border-green-200 transition-all group">
              <div className="w-10 h-10 rounded-xl bg-green-50 text-green-600 flex items-center justify-center mb-3 group-hover:bg-green-600 group-hover:text-white transition-colors">
                {w.icon}
              </div>
              <div className="font-bold text-gray-900 text-sm mb-1">{w.title}</div>
              <div className="text-gray-500 text-xs leading-relaxed">{w.desc}</div>
            </div>
          ))}
        </div>

        {/* Section title */}
        <div className="flex items-center justify-between mb-2">
          <h2 className="text-2xl font-black text-gray-900">المعاهد المعتمدة الخمسة</h2>
          <span className="text-sm text-gray-400">5 معاهد</span>
        </div>

        {/* Institute cards */}
        <div className="space-y-5">
          {INSTITUTES.map((inst) => (
            <article
              key={inst.id}
              className={`bg-white rounded-3xl border ${inst.border} shadow-[0_4px_20px_-4px_rgba(0,0,0,.07)] overflow-hidden hover:shadow-[0_8px_32px_-6px_rgba(0,0,0,.12)] transition-shadow duration-300`}
            >
              {/* Card header */}
              <div className={`relative bg-gradient-to-l ${inst.bg} px-6 py-5 border-b ${inst.border}`}>
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                  <div className={`w-16 h-12 bg-white rounded-xl border ${inst.border} shadow-sm flex items-center justify-center overflow-hidden flex-shrink-0 p-1.5`}>
                    <img src={inst.logo} alt={inst.nameAr} className={`max-w-full max-h-full ${inst.logoClass ?? "object-contain"}`} />
                  </div>
                  <div className="flex-1">
                    <div className="flex flex-wrap items-center gap-2 mb-1">
                      <h3 className="font-black text-gray-900 text-lg">{inst.nameAr}</h3>
                      <span className={`text-xs font-bold px-2.5 py-0.5 rounded-full text-white ${inst.badgeBg}`}>{inst.badge}</span>
                    </div>
                    <p className="text-gray-500 text-xs">{inst.name} — {inst.location}</p>
                  </div>
                  <div className="flex flex-col items-end gap-1 flex-shrink-0">
                    <div className="flex items-center gap-1">
                      {[1,2,3,4,5].map((i) => (
                        <Star key={i} size={12} className={i <= Math.floor(inst.rating) ? "fill-amber-400 text-amber-400" : "text-gray-200 fill-gray-200"} />
                      ))}
                      <span className="font-bold text-gray-800 text-sm mr-1">{inst.rating}</span>
                    </div>
                    <span className="text-xs text-gray-400 bg-white/70 px-2 py-0.5 rounded-full border border-gray-100">{inst.highlight}</span>
                  </div>
                </div>
              </div>

              {/* Card body */}
              <div className="p-6">
                <p className="text-gray-600 text-sm mb-4 leading-relaxed">{inst.desc}</p>

                <div className="flex flex-wrap gap-1.5 mb-5">
                  {inst.programs.map((p) => (
                    <span key={p} className={`${inst.tagBg} text-xs font-semibold px-3 py-1 rounded-full`}>{p}</span>
                  ))}
                </div>

                <div className="flex flex-wrap items-center justify-between gap-4">
                  <div className="flex gap-5 text-sm text-gray-500">
                    <span className="flex items-center gap-1.5"><Clock size={13} />{inst.duration}</span>
                    <span className="flex items-center gap-1.5"><MapPin size={13} />{inst.location}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="text-right">
                      <div className="text-[11px] text-gray-400 mb-0.5">يبدأ من</div>
                      <div className="font-black text-gray-900 text-lg leading-none">{inst.from}</div>
                      <div className="text-[11px] text-gray-400">/ {inst.perUnit}</div>
                    </div>
                    <button
                      onClick={() => go(inst.id)}
                      style={{ backgroundColor: inst.color }}
                      className="flex items-center gap-1.5 text-white font-bold text-sm px-5 py-2.5 rounded-full hover:opacity-90 hover:-translate-y-0.5 transition-all shadow-md"
                    >
                      عرض التفاصيل
                      <ArrowLeft size={14} />
                    </button>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="bg-gradient-to-br from-[#0a2e14] via-[#0f4d22] to-[#166534] rounded-3xl p-8 text-white text-center">
          <div className="text-2xl font-black mb-2">لا تعرف أيهم الأنسب لك؟</div>
          <p className="text-green-100/80 text-sm mb-6 max-w-sm mx-auto leading-relaxed">أجب على 3 أسئلة قصيرة وسنجد لك المعهد المثالي بناءً على هدفك وميزانيتك</p>
          <div className="flex flex-col sm:flex-row justify-center gap-3">
            <button
              onClick={() => go("home", { scrollTo: "institutes" })}
              className="bg-white text-green-800 hover:bg-green-50 font-bold px-6 py-3 rounded-full text-sm hover:-translate-y-0.5 transition-all shadow-lg"
            >
              ابدأ الاختبار السريع
            </button>
            <button
              onClick={() => go("consultation")}
              className="bg-white/15 hover:bg-white/25 border border-white/25 text-white font-bold px-6 py-3 rounded-full text-sm transition-all"
            >
              استشارة مجانية
            </button>
          </div>
        </div>

        {/* Discover more */}
        <div className="grid sm:grid-cols-2 gap-4">
          <button onClick={() => go("universities")} className="bg-white border border-gray-100 rounded-2xl p-5 text-right hover:border-green-300 hover:bg-green-50 transition-all group shadow-sm">
            <div className="font-bold text-gray-900 mb-1 group-hover:text-green-700 flex items-center gap-2">
              <span>🎓</span> الجامعات الماليزية
            </div>
            <div className="text-gray-500 text-sm">12 جامعة شريكة — تخصصات هندسة، أعمال، طب وأكثر</div>
          </button>
          <button onClick={() => go("blog")} className="bg-white border border-gray-100 rounded-2xl p-5 text-right hover:border-green-300 hover:bg-green-50 transition-all group shadow-sm">
            <div className="font-bold text-gray-900 mb-1 group-hover:text-green-700 flex items-center gap-2">
              <span>📝</span> مقالات ونصائح
            </div>
            <div className="text-gray-500 text-sm">كل ما تحتاج معرفته عن الدراسة في ماليزيا</div>
          </button>
        </div>
      </div>
    </div>
  );
}
