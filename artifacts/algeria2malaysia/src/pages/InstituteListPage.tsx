import { ArrowLeft, Star, Clock, MapPin, ChevronLeft } from "lucide-react";
import { useNavigate } from "../hooks/useNavigate";
import { useSEO } from "../hooks/useSEO";

const FORM_URL = "https://docs.google.com/forms/d/e/1FAIpQLSf6Xx2DET7SCulFT3EuvLW_8wuEA9aE9EkOy06i9lGC09T81w/viewform?usp=header";

const INSTITUTES = [
  {
    id: "stratford-institute" as const,
    name: "Stratford International College",
    nameAr: "معهد ستراتفورد الدولي",
    logo: "/stratford-logo.png",
    color: "#16a34a",
    bgColor: "bg-green-50",
    borderColor: "border-green-200",
    tagColor: "bg-green-100 text-green-800",
    badge: "الأشهر",
    badgeBg: "bg-green-500",
    desc: "معهد معتمد لتعليم اللغة الإنجليزية مع تخصصات IELTS والإنجليزي العام والأعمال.",
    programs: ["IELTS Preparation", "General English", "Business English", "Academic English"],
    duration: "4 أسابيع — 6 أشهر",
    from: "1,900 RM / شهر",
    location: "KLCC، كوالالمبور",
    rating: 4.8,
  },
  {
    id: "bigben-institute" as const,
    name: "Big Ben Language Centre",
    nameAr: "مركز بيغ بان للغات",
    logo: "/bigben-logo.png",
    color: "#7a1a2e",
    bgColor: "bg-red-50",
    borderColor: "border-red-200",
    tagColor: "bg-red-100 text-red-800",
    badge: "تقييم عالٍ",
    badgeBg: "bg-red-600",
    desc: "مركز لغات بريطاني الأسلوب في قلب KL — IELTS وإنجليزي تجاري مع مدرسين محترفين.",
    programs: ["IELTS", "Business English", "Cambridge Exam Prep", "Spoken English"],
    duration: "1 — 12 شهر",
    from: "1,800 RM / شهر",
    location: "وسط كوالالمبور",
    rating: 4.7,
  },
  {
    id: "erican-institute" as const,
    name: "Erican College",
    nameAr: "كلية إيريكان",
    logo: "/erican-logo.png",
    color: "#5a2a9a",
    bgColor: "bg-purple-50",
    borderColor: "border-purple-200",
    tagColor: "bg-purple-100 text-purple-800",
    badge: "برامج الأطفال",
    badgeBg: "bg-purple-600",
    desc: "كلية معتمدة بخبرة 30+ سنة تقدم برامج أطفال (7+ سنوات) وإنجليزي عام وأكاديمي.",
    programs: ["Kids Program (7+)", "General English", "Academic English", "IELTS"],
    duration: "3 أشهر — سنة",
    from: "1,500 RM / شهر",
    location: "Cheras، كوالالمبور",
    rating: 4.6,
  },
  {
    id: "sheffield-institute" as const,
    name: "Sheffield College Malaysia",
    nameAr: "كلية شيفيلد ماليزيا",
    logo: "/sheffield-logo.png",
    color: "#1a3272",
    bgColor: "bg-blue-50",
    borderColor: "border-blue-200",
    tagColor: "bg-blue-100 text-blue-800",
    badge: "بريطاني الأسلوب",
    badgeBg: "bg-blue-700",
    desc: "تعليم إنجليزي بأسلوب بريطاني مع إمكانية التحويل لجامعات ماليزية وبريطانية.",
    programs: ["Foundation English", "IELTS", "Cambridge", "University Pathway"],
    duration: "3 — 18 شهر",
    from: "3,400 RM / شهر",
    location: "Damansara، كوالالمبور",
    rating: 4.7,
  },
  {
    id: "bright-institute" as const,
    name: "Bright Language Center",
    nameAr: "مركز برايت للغات",
    logo: "/bright-logo.png",
    logoClass: "object-cover object-left",
    color: "#e85d26",
    bgColor: "bg-orange-50",
    borderColor: "border-orange-200",
    tagColor: "bg-orange-100 text-orange-800",
    badge: "سامر كامب",
    badgeBg: "bg-orange-500",
    desc: "متخصص في سامر كامب الأسبوعي للأطفال والشباب (13+) مع منح وفيزا دراسية.",
    programs: ["Summer Camp (أسبوعي)", "Intensive English", "Kids 13+", "Study Visa Program"],
    duration: "أسبوع — 8 أسابيع",
    from: "1,365 RM / أسبوع",
    location: "كوالالمبور",
    rating: 4.5,
  },
];

export default function InstituteListPage() {
  const { go } = useNavigate();

  useSEO({
    title: "معاهد اللغة الإنجليزية في ماليزيا 2025 — Algeria2Malaysia",
    description: "دليل أفضل 5 معاهد لغة إنجليزية معتمدة في كوالالمبور ماليزيا: ستراتفورد، بيغ بان، إيريكان، شيفيلد، برايت. IELTS، إنجليزي عام، سامر كامب للجزائريين.",
    canonicalPath: "/institutes",
    keywords: "معهد لغة انجليزية ماليزيا، IELTS ماليزيا، كورس انجليزي كوالالمبور، معاهد معتمدة جزائر ماليزيا",
  });

  return (
    <div className="min-h-screen bg-gray-50 pt-[70px]" dir="rtl">

      {/* Hero */}
      <section className="bg-gradient-to-br from-green-700 to-green-600 text-white py-10 md:py-14 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-block bg-white/20 rounded-full px-4 py-1.5 text-sm font-semibold mb-3">
            5 معاهد معتمدة في كوالالمبور
          </div>
          <h1 className="text-2xl md:text-4xl font-extrabold mb-3 leading-tight">
            معاهد اللغة الإنجليزية في ماليزيا
          </h1>
          <p className="text-green-100 text-base md:text-lg mb-7 max-w-2xl mx-auto leading-relaxed">
            اختر أفضل معهد لتعلم الإنجليزية في كوالالمبور — IELTS، عام، أعمال، أطفال، وسامر كامب. استشارة مجانية للطلاب الجزائريين.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <button
              onClick={() => go("home", { scrollTo: "institutes" })}
              className="bg-white text-green-700 font-bold px-6 py-3 rounded-xl hover:bg-green-50 transition-all"
            >
              اختبر معهدك المناسب
            </button>
            <a
              href={FORM_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-green-500 hover:bg-green-400 text-white font-bold px-6 py-3 rounded-xl transition-all"
            >
              عبّئ فورم التسجيل
            </a>
          </div>
        </div>
      </section>

      {/* Breadcrumb */}
      <div className="max-w-5xl mx-auto px-4 py-3">
        <nav className="flex items-center gap-1 text-sm text-gray-500">
          <button onClick={() => go("home")} className="hover:text-green-600 transition-colors">الرئيسية</button>
          <ChevronLeft size={14} className="rotate-180" />
          <span className="text-gray-900 font-semibold">معاهد اللغة الإنجليزية</span>
        </nav>
      </div>

      {/* Main content */}
      <main className="max-w-5xl mx-auto px-4 pb-16">

        {/* Intro */}
        <section className="bg-white rounded-2xl p-6 mb-8 border border-gray-100 shadow-sm">
          <h2 className="text-xl font-extrabold text-gray-900 mb-3">
            لماذا تتعلم الإنجليزية في ماليزيا؟
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm text-gray-600">
            <div className="flex items-start gap-2">
              <span className="text-green-500 text-lg mt-0.5">✓</span>
              <div>
                <strong className="text-gray-800">تكلفة منخفضة</strong><br />
                أرخص 3× من الدراسة في أوروبا أو كندا مع نفس جودة التعليم البريطاني.
              </div>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-green-500 text-lg mt-0.5">✓</span>
              <div>
                <strong className="text-gray-800">بيئة دولية</strong><br />
                تتحدث إنجليزي مع طلاب من 50+ دولة — تطور سريع ومستدام.
              </div>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-green-500 text-lg mt-0.5">✓</span>
              <div>
                <strong className="text-gray-800">فيزا ميسرة</strong><br />
                عملية فيزا الطالب لماليزيا بسيطة ومنح متاحة تصل 35%.
              </div>
            </div>
          </div>
        </section>

        {/* Institute cards */}
        <h2 className="text-2xl font-extrabold text-gray-900 mb-6">
          المعاهد المعتمدة الخمسة
        </h2>

        <div className="space-y-5">
          {INSTITUTES.map((inst) => (
            <article
              key={inst.id}
              className={`bg-white rounded-2xl border-2 ${inst.borderColor} overflow-hidden shadow-sm hover:shadow-md transition-all`}
            >
              <div className={`${inst.bgColor} px-5 py-4 flex items-center justify-between flex-wrap gap-3`}>
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 bg-white rounded-xl border border-white/80 overflow-hidden flex-shrink-0 shadow">
                    <img
                      src={inst.logo}
                      alt={`شعار ${inst.nameAr}`}
                      className={`w-full h-full ${inst.logoClass ?? "object-contain p-1"}`}
                    />
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-extrabold text-gray-900 text-lg leading-tight">{inst.nameAr}</h3>
                      <span className={`${inst.badgeBg} text-white text-xs font-bold px-2 py-0.5 rounded-full`}>{inst.badge}</span>
                    </div>
                    <p className="text-gray-500 text-xs">{inst.name} — {inst.location}</p>
                  </div>
                </div>
                <div className="flex items-center gap-1.5">
                  <Star size={14} className="text-amber-400 fill-amber-400" />
                  <span className="font-bold text-gray-800 text-sm">{inst.rating}</span>
                </div>
              </div>

              <div className="p-5">
                <p className="text-gray-600 text-sm mb-4 leading-relaxed">{inst.desc}</p>

                <div className="flex flex-wrap gap-2 mb-4">
                  {inst.programs.map((p) => (
                    <span key={p} className={`${inst.tagColor} text-xs font-semibold px-2.5 py-1 rounded-full`}>{p}</span>
                  ))}
                </div>

                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div className="flex gap-4 text-sm text-gray-500">
                    <span className="flex items-center gap-1.5">
                      <Clock size={13} />
                      {inst.duration}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <MapPin size={13} />
                      {inst.location}
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="text-left">
                      <div className="text-xs text-gray-400">يبدأ من</div>
                      <div className="font-extrabold text-gray-900 text-base">{inst.from}</div>
                    </div>
                    <button
                      onClick={() => go(inst.id)}
                      style={{ backgroundColor: inst.color }}
                      className="flex items-center gap-1.5 text-white font-bold text-sm px-4 py-2.5 rounded-xl hover:opacity-90 transition-all shadow-sm"
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

        {/* Compare CTA */}
        <section className="mt-10 bg-gradient-to-br from-green-700 to-green-600 rounded-2xl p-7 text-white text-center">
          <h2 className="text-xl font-extrabold mb-2">لا تعرف أيهم الأنسب لك؟</h2>
          <p className="text-green-100 text-sm mb-5">أجب على 3 أسئلة قصيرة وسنجد لك المعهد المثالي بناءً على هدفك وميزانيتك.</p>
          <div className="flex flex-col sm:flex-row justify-center gap-3">
            <button
              onClick={() => go("home", { scrollTo: "institutes" })}
              className="bg-white text-green-700 font-bold px-6 py-3 rounded-xl hover:bg-green-50 transition-all"
            >
              ابدأ الاختبار السريع
            </button>
            <button
              onClick={() => go("consultation")}
              className="bg-green-500 hover:bg-green-400 text-white font-bold px-6 py-3 rounded-xl transition-all"
            >
              استشارة مجانية
            </button>
          </div>
        </section>

        {/* Internal links */}
        <section className="mt-8">
          <h2 className="text-lg font-extrabold text-gray-900 mb-4">اكتشف أيضاً</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <button
              onClick={() => go("universities")}
              className="bg-white border border-gray-200 rounded-xl p-4 text-right hover:border-green-300 hover:bg-green-50 transition-all group"
            >
              <div className="font-bold text-gray-900 mb-1 group-hover:text-green-700">🎓 الجامعات الماليزية</div>
              <div className="text-gray-500 text-sm">12 جامعة شريكة — تخصصات هندسة، أعمال، طب وأكثر</div>
            </button>
            <button
              onClick={() => go("blog")}
              className="bg-white border border-gray-200 rounded-xl p-4 text-right hover:border-green-300 hover:bg-green-50 transition-all group"
            >
              <div className="font-bold text-gray-900 mb-1 group-hover:text-green-700">📝 مقالات ونصائح</div>
              <div className="text-gray-500 text-sm">كل ما تحتاج معرفته عن الدراسة في ماليزيا</div>
            </button>
          </div>
        </section>
      </main>
    </div>
  );
}
