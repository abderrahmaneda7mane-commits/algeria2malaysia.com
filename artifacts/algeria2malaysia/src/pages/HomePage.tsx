import { useEffect, useState } from "react";
import { GraduationCap, Globe, DollarSign, Shield, Star, CheckCircle, ArrowLeft, Building2, BookOpen, Users, Award, Phone, MapPin, Wifi, Home, Plane, MessageCircle, ChevronDown } from "lucide-react";
import { useNavigate, getNavState } from "../hooks/useNavigate";
import { useSEO } from "../hooks/useSEO";
import InstituteQuiz from "../components/InstituteQuiz";
import { useLanguage } from "../i18n/LanguageContext";
import { translations as T } from "../i18n/translations";

const WA_LINK = "https://wa.me/601112200603";
const GOOGLE_FORM_URL = "https://docs.google.com/forms/d/e/1FAIpQLSd0wQH2-RL3zDf2BB1UsskwBfIIXsJ8KLxw1lMVD6TEQnWpgA/viewform";

const WHATSAPP_SVG = (
  <svg viewBox="0 0 24 24" className="w-full h-full fill-current">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
  </svg>
);

const UNIVERSITIES = [
  {
    uniId: "apu",
    name: "APU",
    nameAr: "جامعة آسيا باسيفيك للتكنولوجيا والابتكار",
    desc: "بيئة دولية متميزة وبرامج تقنية حديثة",
    strengths: ["قوية في IT والتكنولوجيا", "بيئة طلابية دولية", "شراكات عالمية"],
    img: "/logos/apu.png",
    badge: "IT & Technology",
    badgeColor: "bg-blue-600",
  },
  {
    uniId: "taylors",
    name: "Taylor's University",
    nameAr: "جامعة تايلور",
    desc: "من أعلى الجامعات الخاصة تصنيفاً في ماليزيا",
    strengths: ["الأعلى تصنيفاً بين الخاصة", "قوية في الأعمال والضيافة", "حرم حديث ومجهز"],
    img: "/logos/taylors.png",
    badge: "Top Ranked",
    badgeColor: "bg-purple-600",
  },
  {
    uniId: "mmu",
    name: "MMU",
    nameAr: "جامعة الوسائط المتعددة",
    desc: "رائدة في التكنولوجيا والهندسة والاتصالات",
    strengths: ["تكنولوجيا وهندسة", "اتصالات ووسائط متعددة", "حرم سايبر جايا وملاكا"],
    img: "/logos/mmu.png",
    badge: "Technology",
    badgeColor: "bg-teal-600",
  },
  {
    uniId: "unikl",
    name: "UniKL",
    nameAr: "جامعة كوالالمبور",
    desc: "متخصصة في البرامج التقنية والهندسية التطبيقية",
    strengths: ["هندسة تطبيقية", "برامج تقنية متخصصة", "شهادات دولية معترفة"],
    img: "/logos/unikl.png",
    badge: "Engineering",
    badgeColor: "bg-orange-600",
  },
  {
    uniId: "lincoln",
    name: "Lincoln University",
    nameAr: "جامعة لينكولن",
    desc: "برامج معتمدة بتكاليف مناسبة ومجموعة واسعة من التخصصات",
    strengths: ["تكاليف معقولة", "تخصصات متنوعة", "قبول مرن"],
    img: "/logos/lincoln.png",
    badge: "Affordable",
    badgeColor: "bg-green-600",
  },
  {
    uniId: "utp",
    name: "UTP",
    nameAr: "جامعة تكنولوجيا بتروناس",
    desc: "أفضل جامعة هندسية حكومية بسايبر جايا",
    strengths: ["هندسة بترولية وكيميائية", "من أفضل جامعات ماليزيا", "منح دراسية متاحة"],
    img: "/logos/utp.png",
    badge: "Top Engineering",
    badgeColor: "bg-yellow-600",
  },
  {
    uniId: "upm",
    name: "UPM",
    nameAr: "جامعة بوترا ماليزيا",
    desc: "جامعة بحثية حكومية رائدة بحرم خضراء واسعة",
    strengths: ["بحث علمي متقدم", "حرم جامعي ضخم", "تخصصات زراعية وبيئية"],
    img: "/logos/upm.png",
    badge: "Research",
    badgeColor: "bg-emerald-600",
  },
  {
    uniId: "utm",
    name: "UTM",
    nameAr: "جامعة تكنولوجيا ماليزيا",
    desc: "جامعة هندسية حكومية رائدة بحرمين في جوهور بهرو وكوالالمبور",
    strengths: ["رائدة في الهندسة منذ 1904", "حرمان رئيسيان", "علوم وتكنولوجيا تطبيقية"],
    img: "/logos/utm.png",
    badge: "Top Engineering",
    badgeColor: "bg-sky-600",
  },
  {
    uniId: "utem",
    name: "UTeM",
    nameAr: "جامعة تكنيكال ماليزيا ملاكا",
    desc: "جامعة تقنية حكومية متخصصة في الهندسة التطبيقية والتصنيع بملاكا",
    strengths: ["هندسة تقنية تطبيقية", "تصنيع وإلكترونيك", "رسوم تنافسية"],
    img: "/logos/utem.png",
    badge: "Technical Engineering",
    badgeColor: "bg-rose-600",
  },
  {
    uniId: "ucsi",
    name: "UCSI University",
    nameAr: "جامعة UCSI",
    desc: "قوية في الطب والصيدلة والأعمال والتكنولوجيا",
    strengths: ["طب وصيدلة", "أعمال وتكنولوجيا", "اعتماد دولي"],
    img: "/logos/ucsi.png",
    badge: "Medicine & Business",
    badgeColor: "bg-pink-600",
  },
  {
    uniId: "sunway",
    name: "Sunway University",
    nameAr: "جامعة صنواي",
    desc: "حرم عصري متكامل بشراكات دولية مرموقة",
    strengths: ["حرم حديث ومتكامل", "شراكات دولية", "موقع مثالي بكوالالمبور"],
    img: "/logos/sunway.png",
    badge: "Modern Campus",
    badgeColor: "bg-indigo-600",
  },
  {
    uniId: "cityu",
    name: "City University",
    nameAr: "جامعة سيتي ماليزيا",
    desc: "جامعة معتمدة من 1984 في الهندسة والقانون والأعمال وتكنولوجيا المعلومات",
    strengths: ["هندسة وقانون وأعمال", "معتمدة MQA", "رسوم تنافسية"],
    img: "/logos/cityu.png",
    badge: "Engineering & Law",
    badgeColor: "bg-red-600",
  },
];

function FaqItem({ question, answer }: { question: string; answer: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  return (
    <div className={`bg-white rounded-2xl border transition-all duration-200 overflow-hidden ${open ? "border-green-200 shadow-md" : "border-gray-100 shadow-sm"}`}>
      <button
        className="w-full flex items-center justify-between gap-4 px-6 py-4 text-right"
        onClick={() => setOpen(!open)}
        aria-expanded={open}
      >
        <span className="text-[15px] font-bold text-gray-800 text-right">{question}</span>
        <div className={`flex-shrink-0 w-7 h-7 rounded-full flex items-center justify-center transition-all duration-200 ${open ? "bg-green-600 text-white rotate-180" : "bg-gray-100 text-gray-500"}`}>
          <ChevronDown size={16} />
        </div>
      </button>
      {open && (
        <div className="px-6 pb-5 text-[15px] text-gray-600 leading-relaxed border-t border-gray-50 pt-3">
          {answer}
        </div>
      )}
    </div>
  );
}

export default function HomePage() {
  useSEO({
    title: "الدراسة في ماليزيا من الجزائر | مجانية ومضمونة",
    description: "خطوة بخطوة نرافقك من القبول حتى الوصول — جامعات ومعاهد بأسعار تناسبك. استشارة مجانية 100% لكل طالب جزائري. سجّل الآن ولا تفوّت الفرصة!",
  });
  const { go } = useNavigate();
  const { t, dir } = useLanguage();

  useEffect(() => {
    const { state } = getNavState();
    if (state.scrollTo) {
      const id = state.scrollTo;
      setTimeout(() => {
        document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
      }, 80);
    }
  }, []);

  return (
    <div className="min-h-screen bg-white" dir={dir}>

      {/* WhatsApp Floating Button */}
      <a
        href={WA_LINK}
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 left-6 z-50 w-14 h-14 bg-green-500 hover:bg-green-600 text-white rounded-full shadow-2xl flex items-center justify-center transition-all hover:scale-110 hover:shadow-green-400/50"
        aria-label="تواصل عبر واتساب"
      >
        <div className="w-7 h-7">{WHATSAPP_SVG}</div>
        <span className="absolute -top-10 left-1/2 -translate-x-1/2 bg-gray-900 text-white text-xs px-3 py-1 rounded-full whitespace-nowrap opacity-0 group-hover:opacity-100 pointer-events-none">
          تواصل معنا
        </span>
      </a>

      {/* Hero Section */}
      <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16" style={{ background: "linear-gradient(135deg, #1a6b3a 0%, #1f8a4a 50%, #27a85e 100%)" }}>
        <div className="absolute inset-0">
          <div className="absolute top-20 right-10 w-80 h-80 bg-white/15 rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 left-10 w-96 h-96 bg-white/10 rounded-full blur-3xl"></div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-emerald-300/10 rounded-full blur-3xl"></div>
        </div>

        <div className="relative z-10 max-w-5xl mx-auto px-4 text-center text-white py-20">
          <div className="flex justify-center mb-8">
            <div className="relative">
              {/* Outer ping ring — green */}
              <div className="absolute inset-0 rounded-full bg-green-400/40 scale-125 animate-ping" style={{ animationDuration: "3s" }} />
              {/* Mid glow ring — green */}
              <div className="absolute inset-0 rounded-full bg-gradient-to-br from-green-400/50 to-green-300/20 blur-sm" style={{ transform: "scale(1.15)" }} />
              {/* Logo container */}
              <div className="relative w-36 h-36 rounded-full overflow-hidden shadow-2xl border-4 border-white/80">
                <img
                  src="/logo-hq.jpg"
                  alt="Algeria2Malaysia"
                  className="w-full h-full object-cover scale-[1.18]"
                />
              </div>
            </div>
          </div>

          <div className="inline-block bg-white/20 backdrop-blur-sm border border-white/30 rounded-full px-5 py-2 text-sm font-medium mb-6">
            {t(T.hero.badge)}
          </div>

          <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
            {t(T.hero.title1)}
            <span className="block text-green-300 mt-2">{t(T.hero.title3)}</span>
          </h1>

          <p className="text-lg md:text-xl text-green-100 mb-10 max-w-2xl mx-auto leading-relaxed">
            {t(T.hero.subtitle)}
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => go("apply")}
              className="bg-white text-green-800 px-8 py-4 rounded-full font-bold text-lg hover:bg-green-50 transition-all shadow-lg hover:shadow-xl flex items-center justify-center gap-2 group"
            >
              <span>{t(T.hero.cta1)}</span>
            </button>
            <a
              href="#about"
              className="border-2 border-white/50 text-white px-8 py-4 rounded-full font-semibold text-lg hover:bg-white/10 transition-all"
            >
              {t(T.hero.cta2)}
            </a>
          </div>

          <div className="mt-14 max-w-2xl mx-auto">
            <div className="grid grid-cols-3 gap-3 mb-3">
              {[
                { num: "2000+", label: t(T.stats.majors), icon: "📚" },
                { num: "12+",   label: t(T.stats.partners), icon: "🎓" },
                { num: "4",     label: t(T.stats.certified), icon: "🏫" },
              ].map((stat) => (
                <div key={stat.label} className="text-center bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl py-4 px-2">
                  <div className="text-xl mb-1">{stat.icon}</div>
                  <div className="text-2xl font-extrabold text-white leading-none">{stat.num}</div>
                  <div className="text-[11px] text-green-200 mt-1 font-medium">{stat.label}</div>
                </div>
              ))}
            </div>
            <div className="grid grid-cols-2 gap-3">
              {[
                { num: "100%", label: t(T.stats.transparent), icon: "✅" },
                { num: "24h",  label: t(T.stats.fast), icon: "⚡" },
              ].map((stat) => (
                <div key={stat.label} className="text-center bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl py-4 px-2">
                  <div className="text-xl mb-1">{stat.icon}</div>
                  <div className="text-2xl font-extrabold text-white leading-none">{stat.num}</div>
                  <div className="text-[11px] text-green-200 mt-1 font-medium">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-white/40 rounded-full flex justify-center pt-2">
            <div className="w-1.5 h-3 bg-white/60 rounded-full"></div>
          </div>
        </div>
      </section>

      {/* About Us Section */}
      <section id="about" className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-block bg-green-100 text-green-700 rounded-full px-4 py-1 text-sm font-semibold mb-4">{t(T.about.badge)}</div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6 leading-tight">
                {t(T.about.title)}
              </h2>
              <p className="text-gray-600 text-lg leading-relaxed mb-6">
                {t(T.about.desc)}
              </p>
              <div className="space-y-4 mb-8">
                {[
                  { icon: <CheckCircle className="text-green-600 flex-shrink-0" size={20} />, text: t(T.about.p1) },
                  { icon: <CheckCircle className="text-green-600 flex-shrink-0" size={20} />, text: t(T.about.p2) },
                  { icon: <CheckCircle className="text-green-600 flex-shrink-0" size={20} />, text: t(T.about.p3) },
                  { icon: <CheckCircle className="text-green-600 flex-shrink-0" size={20} />, text: t(T.about.p4) },
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-3">
                    {item.icon}
                    <span className="text-gray-700">{item.text}</span>
                  </div>
                ))}
              </div>
              <button
                onClick={() => go("consultation")}
                className="bg-green-700 hover:bg-green-800 text-white px-8 py-4 rounded-full font-bold text-lg transition-all shadow-lg hover:shadow-xl flex items-center gap-2 group w-fit"
              >
                <span>{t(T.about.cta)}</span>
                <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
              </button>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {[
                { num: "مجاني", label: "الاستشارة الأولى", color: "bg-green-50 border-green-200" },
                { num: "24h", label: "وقت الرد", color: "bg-blue-50 border-blue-200" },
                { num: "شامل", label: "دعم التأشيرة", color: "bg-purple-50 border-purple-200" },
                { num: "متكامل", label: "من الملف للوصول", color: "bg-orange-50 border-orange-200" },
              ].map((item) => (
                <div key={item.label} className={`${item.color} border rounded-2xl p-6 text-center`}>
                  <div className="text-3xl font-bold text-gray-900 mb-1">{item.num}</div>
                  <div className="text-sm text-gray-600">{item.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Why Malaysia Section */}
      <section id="why" className="py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-14">
            <h2 className="text-4xl md:text-6xl font-extrabold text-gray-900 mb-4 leading-tight">
              لماذا{" "}
              <span className="bg-gradient-to-l from-green-600 to-emerald-500 bg-clip-text text-transparent">
                ماليزيا؟
              </span>
            </h2>
            <p className="text-green-700 font-semibold text-base md:text-lg mb-3">أفضل وجهة دراسية بتكلفة معقولة</p>
            <p className="text-gray-500 max-w-2xl mx-auto text-[15px]">ماليزيا تجمع بين الجودة الأكاديمية والتكلفة المناسبة في بيئة إسلامية آمنة</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { icon: <DollarSign className="text-green-600" size={28} />, title: "أسعار في المتناول", desc: "تكاليف الدراسة والمعيشة أقل بكثير مقارنة بأوروبا وأمريكا مع نفس مستوى الجودة" },
              { icon: <Globe className="text-green-600" size={28} />, title: "التعليم باللغة الإنجليزية", desc: "جميع البرامج تدرس باللغة الإنجليزية مع شهادات معترف بها دولياً" },
              { icon: <Shield className="text-green-600" size={28} />, title: "بيئة إسلامية آمنة", desc: "ماليزيا دولة إسلامية تتميز بالأمان والاستقرار وتوفر بيئة مريحة للطلاب العرب" },
              { icon: <Award className="text-green-600" size={28} />, title: "جامعات معترف بها دولياً", desc: "شهادات من جامعات معترف بها في الجزائر وأوروبا وكل أنحاء العالم" },
              { icon: <Users className="text-green-600" size={28} />, title: "مجتمع عربي كبير", desc: "مجتمع طلابي عربي جزائري نشط يساعدك على الاندماج بسرعة ودون عزلة" },
              { icon: <GraduationCap className="text-green-600" size={28} />, title: "مسارات متعددة", desc: "من تحسين الإنجليزي إلى البكالوريوس والماستر في مختلف التخصصات" },
            ].map((item) => (
              <div key={item.title} className="bg-white border border-gray-100 rounded-2xl p-6 hover:shadow-lg hover:border-green-200 transition-all group">
                <div className="w-12 h-12 bg-green-50 rounded-xl flex items-center justify-center mb-4 group-hover:bg-green-100 transition-colors">
                  {item.icon}
                </div>
                <h3 className="font-bold text-gray-900 mb-2 text-lg">{item.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>

          {/* Direct flights banner */}
          <div className="mt-8 bg-gradient-to-r from-amber-50 to-orange-50 border-2 border-amber-200 rounded-2xl px-6 py-5 flex flex-col sm:flex-row items-center gap-4">
            <div className="flex-shrink-0 w-12 h-12 bg-amber-100 rounded-xl flex items-center justify-center text-2xl">
              ✈️
            </div>
            <div className="flex-1 text-center sm:text-right">
              <div className="inline-block bg-amber-400 text-white text-xs font-bold px-2.5 py-0.5 rounded-full mb-1">جديد 2026</div>
              <p className="text-gray-800 font-semibold text-base leading-relaxed">
                أصبح الوصول إلى ماليزيا أكثر سهولة للطلبة الجزائريين — مع إطلاق رحلات مباشرة ابتداءً من سنة 2026، تختصر وقت السفر وتجعل تجربة الانتقال أكثر راحة وسلاسة.
              </p>
            </div>
          </div>

          <div className="text-center mt-10">
            <button
              onClick={() => go("apply")}
              className="bg-green-700 hover:bg-green-800 text-white px-8 py-4 rounded-full font-bold text-lg transition-all shadow-lg flex items-center gap-2 mx-auto group"
            >
              <span>ابدأ طلبك الآن</span>
              <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
      </section>

      {/* Our Services — Full 6-card grid */}
      <section id="services" className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-14">
            <div className="inline-block bg-green-100 text-green-700 rounded-full px-4 py-1 text-sm font-semibold mb-4">خدماتنا</div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">كل ما تحتاجه في مكان واحد</h2>
            <p className="text-gray-600 max-w-xl mx-auto">نقدم خدمة شاملة من أول استشارة حتى وصولك إلى ماليزيا</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
            {[
              {
                icon: <MessageCircle className="text-green-600" size={32} />,
                title: "استشارة مجانية",
                desc: "جلسة استشارية مجانية لتقييم وضعك وتحديد أفضل مسار دراسي يناسبك",
                highlight: true,
              },
              {
                icon: <GraduationCap className="text-blue-600" size={32} />,
                title: "التسجيل والقبول",
                desc: "نتولى كامل إجراءات التسجيل والقبول في المعاهد والجامعات الماليزية",
                highlight: false,
              },
              {
                icon: <Globe className="text-purple-600" size={32} />,
                title: "معالجة التأشيرة الكاملة",
                desc: "نعد ملفك كاملاً ونتابع التأشيرة الطلابية حتى الحصول عليها — بدون أي تعقيد",
                highlight: false,
              },
              {
                icon: <Plane className="text-orange-600" size={32} />,
                title: "الاستقبال بالمطار",
                desc: "فريقنا في كوالالمبور يستقبلك لحظة وصولك ويوصلك لسكنك بأمان",
                highlight: false,
              },
              {
                icon: <Wifi className="text-teal-600" size={32} />,
                title: "شريحة الاتصال (SIM)",
                desc: "نوفر لك شريحة اتصال محلية فور وصولك حتى تبقى متواصلاً مع عائلتك",
                highlight: false,
              },
              {
                icon: <Home className="text-pink-600" size={32} />,
                title: "دعم السكن",
                desc: "نساعدك في إيجاد سكن مناسب حسب ميزانيتك وقريب من جامعتك",
                highlight: false,
              },
            ].map((svc) => (
              <div
                key={svc.title}
                className={`rounded-2xl p-6 border transition-all hover:shadow-lg group ${
                  svc.highlight
                    ? "bg-green-700 border-green-600 text-white"
                    : "bg-white border-gray-100 hover:border-green-200"
                }`}
              >
                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-4 ${svc.highlight ? "bg-white/20" : "bg-gray-50 group-hover:bg-green-50"} transition-colors`}>
                  {svc.highlight
                    ? <MessageCircle className="text-white" size={32} />
                    : svc.icon}
                </div>
                <h3 className={`font-bold text-xl mb-3 ${svc.highlight ? "text-white" : "text-gray-900"}`}>{svc.title}</h3>
                <p className={`text-sm leading-relaxed ${svc.highlight ? "text-green-100" : "text-gray-600"}`}>{svc.desc}</p>
                {svc.highlight && (
                  <div className="mt-4 inline-block bg-white text-green-700 text-xs font-bold px-3 py-1 rounded-full">مجاني تماماً ✓</div>
                )}
              </div>
            ))}
          </div>

          {/* Track selector */}
          <div className="grid md:grid-cols-2 gap-4">
            <button
              onClick={() => go("apply")}
              className="text-right p-6 rounded-2xl border-2 border-green-200 bg-green-50 hover:border-green-400 hover:bg-green-100 transition-all group"
            >
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-2xl bg-white flex items-center justify-center flex-shrink-0 shadow-sm">
                  <BookOpen size={26} className="text-green-600" />
                </div>
                <div className="flex-1">
                  <div className="font-extrabold text-gray-900 text-base">معهد اللغة الإنجليزية</div>
                  <div className="text-gray-500 text-sm mt-0.5">IELTS · عام · أعمال · أطفال</div>
                  <div className="text-green-600 text-xs font-bold mt-1.5">اكتشف أنسب معهد لك ←</div>
                </div>
              </div>
            </button>
            <button
              onClick={() => go("apply", { type: "university" })}
              className="text-right p-6 rounded-2xl border-2 border-blue-200 bg-blue-50 hover:border-blue-400 hover:bg-blue-100 transition-all group"
            >
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-2xl bg-white flex items-center justify-center flex-shrink-0 shadow-sm">
                  <GraduationCap size={26} className="text-blue-600" />
                </div>
                <div className="flex-1">
                  <div className="font-extrabold text-gray-900 text-base">القبول الجامعي</div>
                  <div className="text-gray-500 text-sm mt-0.5">بكالوريوس · ماستر · دكتوراه</div>
                  <div className="text-blue-600 text-xs font-bold mt-1.5">ابدأ نموذج القبول ←</div>
                </div>
              </div>
            </button>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how" className="py-20 bg-green-50">
        <div className="max-w-5xl mx-auto px-4">
          <div className="text-center mb-14">
            <div className="inline-block bg-green-200 text-green-800 rounded-full px-4 py-1 text-sm font-semibold mb-4">كيف يعمل؟</div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">4 خطوات فقط — نحن نتكفل بالباقي</h2>
            <p className="text-gray-500">ملأ النموذج واترك الباقي علينا</p>
          </div>

          <div className="relative">
            <div className="hidden md:block absolute top-10 right-16 left-16 h-0.5 bg-green-300 z-0"></div>
            <div className="grid md:grid-cols-4 gap-6 relative z-10">
              {[
                { step: "01", icon: "📝", title: "املأ النموذج", desc: "استغرق 3 دقائق فقط، أجب على بعض الأسئلة عن هدفك وميزانيتك" },
                { step: "02", icon: "🔍", title: "نراجع ملفك", desc: "فريقنا يراجع معلوماتك ويحدد أنسب خيار لك" },
                { step: "03", icon: "💬", title: "نتواصل معك", desc: "نتصل بك عبر واتساب خلال 24 ساعة لمناقشة الخطوات" },
                { step: "04", icon: "✈️", title: "نتكفل بكل شيء", desc: "التأشيرة، القبول، السكن، الاستقبال — كل شيء بيدنا" },
              ].map((item) => (
                <div key={item.step} className="text-center">
                  <div className="w-20 h-20 bg-white border-4 border-green-200 text-green-800 rounded-full flex flex-col items-center justify-center mx-auto mb-4 shadow-md">
                    <span className="text-2xl">{item.icon}</span>
                  </div>
                  <div className="text-xs font-bold text-green-600 mb-1">خطوة {item.step}</div>
                  <h3 className="font-bold text-gray-900 mb-2 text-lg">{item.title}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="text-center mt-12">
            <button
              onClick={() => go("apply")}
              className="bg-green-700 hover:bg-green-800 text-white px-10 py-4 rounded-full font-bold text-xl transition-all shadow-xl hover:shadow-2xl flex items-center gap-3 mx-auto group"
            >
              <span>ابدأ الآن — مجاناً</span>
              <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
      </section>

      {/* Institutes Track */}
      <section id="institutes" className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4">

          {/* Track label */}
          <div className="flex items-center gap-3 mb-3">
            <div className="w-1.5 h-10 bg-green-500 rounded-full"></div>
            <div>
              <div className="text-xs font-bold text-green-600 uppercase tracking-widest">المسار الأول</div>
              <h2 className="text-2xl md:text-3xl font-extrabold text-gray-900">معاهد اللغة الإنجليزية</h2>
            </div>
          </div>
          <p className="text-gray-500 mb-10 mr-5">4 معاهد معتمدة في قلب كوالالمبور — IELTS، إنجليزي عام، أعمال، وأطفال</p>

          {/* Smart finder embedded */}
          <div className="bg-gradient-to-br from-green-50 to-white border border-green-100 rounded-2xl sm:rounded-3xl p-4 sm:p-8 mb-10">
            <div className="text-center mb-4 sm:mb-6">
              <div className="inline-block bg-green-100 text-green-700 rounded-full px-3 py-1 text-xs sm:text-sm font-semibold mb-2">اكتشف الأنسب لك</div>
              <h3 className="text-lg sm:text-xl font-extrabold text-gray-900 mb-1">أجب على 3 أسئلة — نجد لك أفضل معهد</h3>
              <p className="text-gray-400 text-xs sm:text-sm">بناءً على هدفك وميزانيتك ومدة إقامتك</p>
            </div>
            <InstituteQuiz />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              {
                name: "Stratford International",
                nameAr: "معهد ستراتفورد",
                badge: "إنجليزي مكثف",
                badgeColor: "bg-teal-600",
                borderColor: "border-teal-200",
                accentColor: "bg-teal-600",
                logo: "/stratford-logo.png",
                desc: "برامج مكثفة 4-6 ساعات/يوم في موقع متميز بـ KLCC",
                from: "950 RM",
                fromEur: "≈ 190 €",
                highlights: ["إنجليزي للتواصل", "مكثف 4 ساعات/يوم", "مكثف بلس 6 ساعات"],
                onClick: () => go("stratford-institute"),
                btnLabel: "عرض الأسعار",
              },
              {
                name: "Big Ben Education",
                nameAr: "مجموعة بيغ بن",
                badge: "IELTS & IEP",
                badgeColor: "bg-red-800",
                borderColor: "border-red-200",
                accentColor: "bg-red-800",
                logo: "/bigben-logo.png",
                desc: "المعتمد من Pearson — IELTS وبرامج أكاديمية متكاملة",
                from: "2,618 RM",
                fromEur: "≈ 524 €",
                highlights: ["برنامج IEP مكثف", "تحضير IELTS", "دروس خاصة VIP"],
                onClick: () => go("bigben-institute"),
                btnLabel: "عرض الأسعار",
              },
              {
                name: "Erican Language Centre",
                nameAr: "مركز إيريكان",
                badge: "Cambridge & IELTS",
                badgeColor: "bg-purple-700",
                borderColor: "border-purple-200",
                accentColor: "bg-purple-700",
                logo: "/erican-logo.png",
                desc: "معتمد Cambridge وIDP IELTS — 400,000+ متعلم",
                from: "2,000 RM",
                fromEur: "≈ 400 €",
                highlights: ["برنامج دولي مكثف", "تحضير IELTS", "Cambridge معتمد"],
                onClick: () => go("erican-institute"),
                btnLabel: "عرض الأسعار",
              },
              {
                name: "Sheffield Academy",
                nameAr: "أكاديمية شيفيلد",
                badge: "عروض حصرية",
                badgeColor: "bg-[#1a3272]",
                borderColor: "border-blue-200",
                accentColor: "bg-[#1a3272]",
                logo: "/sheffield-logo.png",
                desc: "خصومات تصل 30% + IELTS مجاني + أشهر مجانية",
                from: "1,950 RM",
                fromEur: "≈ 390 €",
                highlights: ["2 شهر + شهر مجاني", "خصم 25% على 8 أشهر", "IELTS مجاني"],
                onClick: () => go("sheffield-institute"),
                btnLabel: "عرض العروض",
              },
            ].map((inst) => (
              <div
                key={inst.name}
                onClick={inst.onClick}
                className={`border ${inst.borderColor} rounded-2xl overflow-hidden hover:shadow-xl transition-all cursor-pointer group flex flex-col bg-white`}
              >
                {/* accent top bar */}
                <div className={`${inst.accentColor} h-1.5`}></div>

                {/* Mobile: horizontal row | Desktop: vertical card */}
                <div className="p-4 sm:p-5 flex flex-row sm:flex-col gap-4 flex-1">

                  {/* Logo + price (left col on mobile) */}
                  <div className="flex flex-col items-center gap-2 flex-shrink-0 w-16 sm:w-auto">
                    <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-xl bg-white border border-gray-100 shadow-sm flex items-center justify-center overflow-hidden p-1">
                      <img src={inst.logo} alt={inst.name} className="w-full h-full object-contain" />
                    </div>
                    {/* Price below logo on mobile */}
                    <div className="text-center sm:hidden">
                      <div className="text-green-700 font-extrabold text-sm leading-tight">{inst.from}</div>
                      <div className="text-gray-400 text-xs">{inst.fromEur}</div>
                    </div>
                  </div>

                  {/* Main content */}
                  <div className="flex-1 min-w-0 flex flex-col">
                    <span className={`inline-block self-start ${inst.badgeColor} text-white text-xs font-bold px-2.5 py-0.5 rounded-full mb-1.5`}>
                      {inst.badge}
                    </span>
                    <h3 className="font-extrabold text-gray-900 text-base sm:text-lg leading-tight mb-0.5">{inst.nameAr}</h3>
                    <p className="text-gray-400 text-xs mb-2">{inst.name}</p>
                    <p className="text-gray-500 text-xs sm:text-sm leading-relaxed mb-3 line-clamp-2 sm:line-clamp-none">{inst.desc}</p>

                    <ul className="space-y-1 mb-3 hidden sm:block">
                      {inst.highlights.map((h) => (
                        <li key={h} className="flex items-center gap-2 text-xs text-gray-600">
                          <CheckCircle size={12} className="text-green-500 flex-shrink-0" />
                          {h}
                        </li>
                      ))}
                    </ul>

                    {/* Price row (desktop) */}
                    <div className="mt-auto hidden sm:flex items-center justify-between mb-3">
                      <span className="text-green-700 font-extrabold text-sm">من {inst.from}</span>
                      <span className="text-green-500 text-xs">{inst.fromEur}</span>
                    </div>

                    {/* CTA button */}
                    <button
                      onClick={(e) => { e.stopPropagation(); inst.onClick(); }}
                      className={`w-full sm:w-full ${inst.accentColor} hover:opacity-90 text-white text-xs sm:text-sm font-bold py-2 sm:py-2.5 rounded-xl transition-all mt-auto flex items-center justify-center gap-1.5 group-hover:gap-2.5`}
                    >
                      <span>{inst.btnLabel}</span>
                      <ArrowLeft size={13} className="transition-transform group-hover:-translate-x-0.5" />
                    </button>
                  </div>

                </div>
              </div>
            ))}
          </div>

          <div className="mt-10 flex flex-col sm:flex-row gap-3 justify-center items-center">
            <button
              onClick={() => go("apply")}
              className="w-full sm:w-auto bg-green-600 hover:bg-green-700 active:bg-green-800 text-white px-8 py-4 rounded-2xl font-extrabold text-base transition-all shadow-lg shadow-green-200 flex items-center justify-center gap-2 group"
            >
              <BookOpen size={19} />
              <span>ابدأ طلب التسجيل</span>
              <ArrowLeft size={17} className="group-hover:-translate-x-1 transition-transform" />
            </button>
            <button
              onClick={() => go("apply")}
              className="w-full sm:w-auto border-2 border-green-600 text-green-700 hover:bg-green-50 px-8 py-4 rounded-2xl font-bold text-base transition-all flex items-center justify-center gap-2"
            >
              استشارة مجانية
            </button>
          </div>
        </div>
      </section>

      {/* Universities Track */}
      <section id="universities" className="py-20 bg-slate-50">
        <div className="max-w-6xl mx-auto px-4">

          {/* Track label */}
          <div className="flex items-center gap-3 mb-3">
            <div className="w-1.5 h-10 bg-blue-500 rounded-full"></div>
            <div>
              <div className="text-xs font-bold text-blue-600 uppercase tracking-widest">المسار الثاني</div>
              <h2 className="text-2xl md:text-3xl font-extrabold text-gray-900">القبول الجامعي</h2>
            </div>
          </div>
          <p className="text-gray-500 mb-10 mr-5">12 جامعة ماليزية معتمدة — بكالوريوس، ماستر، دكتوراه — نتولى القبول والتأشيرة كاملاً</p>

          {/* University form CTA banner */}
          <div className="bg-gradient-to-r from-blue-700 to-blue-900 rounded-3xl p-6 sm:p-8 mb-12 flex flex-col sm:flex-row items-center gap-6">
            <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center flex-shrink-0">
              <GraduationCap size={32} className="text-white" />
            </div>
            <div className="flex-1 text-center sm:text-right">
              <h3 className="text-white font-extrabold text-xl mb-1">ابدأ بنموذج القبول الجامعي الرسمي</h3>
              <p className="text-blue-200 text-sm">أكثر من 2,000 تخصص — فريقنا يراجع طلبك ويتواصل معك خلال 24 ساعة</p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 flex-shrink-0">
              <button
                onClick={() => go("apply", { type: "university" })}
                className="bg-white text-blue-800 font-bold text-sm rounded-xl px-5 py-3 hover:bg-blue-50 transition-all"
              >
                📋 ابدأ نموذج القبول
              </button>
              <button
                onClick={() => go("universities")}
                className="border border-white/40 text-white font-bold text-sm rounded-xl px-5 py-3 hover:bg-white/10 transition-all"
              >
                استكشف الجامعات
              </button>
            </div>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {UNIVERSITIES.map((uni) => (
              <div
                key={uni.name}
                className="bg-white rounded-2xl overflow-hidden border border-gray-100 hover:shadow-xl hover:border-green-200 hover:-translate-y-1 transition-all group cursor-pointer"
                onClick={() => go("universities", { scrollTo: uni.uniId })}
              >
                <div className="relative h-40 bg-white flex items-center justify-center px-6 py-4 border-b border-gray-100 overflow-hidden">
                  <img
                    src={uni.img}
                    alt={uni.name}
                    className="max-w-full max-h-full object-contain group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                  <div className={`absolute bottom-3 right-3 ${uni.badgeColor} text-white text-xs font-bold px-2 py-1 rounded-lg shadow`}>
                    {uni.badge}
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="font-bold text-gray-900 text-base mb-0.5">{uni.nameAr}</h3>
                  <p className="text-gray-400 text-xs mb-2">{uni.name}</p>
                  <p className="text-gray-600 text-xs leading-relaxed mb-3">{uni.desc}</p>
                  <ul className="space-y-1">
                    {uni.strengths.map((s) => (
                      <li key={s} className="flex items-center gap-1.5 text-xs text-gray-600">
                        <CheckCircle size={12} className="text-green-500 flex-shrink-0" />
                        {s}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-12 flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => go("universities")}
              className="bg-green-700 hover:bg-green-800 text-white px-8 py-4 rounded-full font-bold text-lg transition-all shadow-xl hover:shadow-2xl flex items-center gap-3 group"
            >
              <Building2 size={20} />
              <span>عرض جميع الجامعات والأسعار</span>
              <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
            </button>
            <button
              onClick={() => (sessionStorage.setItem("formOpened","1"), window.open(GOOGLE_FORM_URL, "_blank"))}
              className="bg-amber-500 hover:bg-amber-600 text-white px-8 py-4 rounded-full font-bold text-lg transition-all shadow-xl flex items-center gap-3 group"
            >
              <span>📄</span>
              <span>اطلب Offer Letter الآن</span>
              <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
      </section>

      {/* CTA Apply Section */}
      <section id="apply" className="py-20 bg-white">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <div className="bg-gradient-to-br from-green-700 to-green-900 rounded-3xl p-10 md:p-14 text-white shadow-2xl">
            <GraduationCap size={52} className="mx-auto mb-5 text-green-300" />
            <h2 className="text-3xl md:text-4xl font-bold mb-4">هل أنت جاد في الدراسة بماليزيا؟</h2>
            <p className="text-green-100 text-lg mb-8 leading-relaxed">
              اختر مسارك الآن وسيتواصل معك فريقنا خلال 24 ساعة.
              استشارة مجانية — بدون أي التزام.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => go("apply")}
                className="bg-white text-green-800 px-8 py-4 rounded-full font-bold text-lg hover:bg-green-50 transition-all shadow-lg flex items-center justify-center gap-2 group"
              >
                <BookOpen size={20} />
                <span>معهد اللغة</span>
                <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
              </button>
              <button
                onClick={() => go("apply", { type: "university" })}
                className="border-2 border-white text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-white/10 transition-all flex items-center justify-center gap-2 group"
              >
                <Building2 size={20} />
                <span>القبول الجامعي</span>
                <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Pillars */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-5xl mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-6 text-center">
            {[
              { icon: <CheckCircle className="text-green-600 mx-auto mb-3" size={32} />, title: "خبرة موثوقة", desc: "متخصصون في توجيه الطلاب الجزائريين نحو ماليزيا" },
              { icon: <Star className="text-green-600 mx-auto mb-3" size={32} />, title: "شركاء رسميون مع وكلاء بالجامعات", desc: "شراكات مع وكلاء رسميين معتمدين لدى المعاهد والجامعات الماليزية" },
              { icon: <Shield className="text-green-600 mx-auto mb-3" size={32} />, title: "أسعار شفافة", desc: "لا رسوم مخفية، كل التكاليف واضحة من البداية" },
            ].map((item) => (
              <div key={item.title} className="p-6 bg-white rounded-2xl border border-gray-100">
                {item.icon}
                <h3 className="font-bold text-gray-900 mb-2">{item.title}</h3>
                <p className="text-gray-600 text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ Article / Guide Section ═══ */}
      <section id="guide" className="py-20 bg-gray-50">
        <div className="max-w-3xl mx-auto px-4">

          {/* Article header */}
          <div className="mb-12 text-center">

            {/* Icon */}
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-green-500 to-emerald-600 shadow-lg mb-5 text-3xl">
              📖
            </div>

            {/* Main title */}
            <h2 className="text-3xl md:text-5xl font-extrabold text-gray-900 mb-3 leading-tight">
              الدليل الكامل
              <span className="inline-block mr-2 md:mr-3 bg-gradient-to-l from-green-600 to-emerald-500 bg-clip-text text-transparent">
                2026
              </span>
            </h2>

            {/* Subtitle */}
            <p className="text-green-700 font-semibold text-base md:text-lg mb-5">
              الدراسة في ماليزيا من الجزائر — خطوة بخطوة
            </p>

            {/* Divider */}
            <div className="flex items-center justify-center gap-3 mb-6">
              <div className="h-px w-16 bg-gradient-to-r from-transparent to-green-300" />
              <div className="w-2 h-2 rounded-full bg-green-400" />
              <div className="h-px w-16 bg-gradient-to-l from-transparent to-green-300" />
            </div>

            <p className="text-gray-500 text-[15px] leading-relaxed max-w-2xl mx-auto">
              إذا كنت طالباً جزائرياً وتفكر في إكمال دراستك في الخارج، فماليزيا تعتبر واحدة من أفضل الخيارات من حيث التكلفة، جودة التعليم، وسهولة الإجراءات.
              في هذا الدليل، نشرح لك كل شيء من التقديم إلى التكاليف والحياة هناك.
            </p>
          </div>

          {/* Article body */}
          <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-5 md:p-10">
          <article className="space-y-8 text-gray-700 text-[15px] leading-relaxed">

            {/* Block 1 */}
            <div>
              <h3 className="text-xl font-bold text-gray-900 mb-3 flex items-center gap-2">
                <span className="w-7 h-7 rounded-full bg-green-100 text-green-700 text-sm font-bold flex items-center justify-center flex-shrink-0">1</span>
                لماذا الدراسة في ماليزيا خيار ذكي للجزائريين؟
              </h3>
              <p className="mb-3">
                ماليزيا دولة مسلمة، مما يسهّل التأقلم من ناحية الأكل ونمط الحياة. تتميز بتكاليفها المعقولة وجودة تعليم عالية معترف بها دولياً، مع مجتمع طلابي دولي نابض بالحياة.
              </p>
              <button
                onClick={() => go("universities")}
                className="group flex w-full sm:w-auto sm:inline-flex items-center justify-center gap-2 bg-green-700 text-white font-semibold px-5 py-2.5 rounded-xl hover:bg-green-800 transition-all shadow-sm hover:shadow-md text-[14px]"
              >
                <GraduationCap size={16} className="flex-shrink-0" />
                <span>استعرض الجامعات والتخصصات المتاحة</span>
                <ArrowLeft size={14} className="flex-shrink-0 group-hover:-translate-x-1 transition-transform" />
              </button>
            </div>

            {/* Block 2 */}
            <div>
              <h3 className="text-xl font-bold text-gray-900 mb-3 flex items-center gap-2">
                <span className="w-7 h-7 rounded-full bg-green-100 text-green-700 text-sm font-bold flex items-center justify-center flex-shrink-0">2</span>
                كم تكلفة الدراسة في ماليزيا؟
              </h3>
              <p className="mb-4">
                تختلف التكلفة حسب قوة الجامعة والتخصص، لكن في المتوسط تكون حوالي{" "}
                <span className="bg-yellow-50 border border-yellow-200 text-yellow-800 font-bold px-2 py-0.5 rounded-md">6,000 € سنوياً</span>.
                تبقى ماليزيا خياراً ذكياً مقارنة بأوروبا وكندا وأستراليا.
              </p>

              {/* Cost breakdown */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {[
                  { label: "الرسوم الجامعية السنوية",  value: "3,000 – 8,000 €",   icon: "🎓" },
                  { label: "السكن الشهري",              value: "150 – 300 €/شهر",   icon: "🏠" },
                  { label: "المصاريف المعيشية",          value: "100 – 200 €/شهر",   icon: "🛒" },
                  { label: "الإجمالي التقريبي سنوياً",  value: "≈ 5,000 – 9,000 €", icon: "📊" },
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-3 bg-gray-50 border border-gray-100 rounded-xl px-4 py-3">
                    <span className="text-xl">{item.icon}</span>
                    <div>
                      <div className="text-[12px] text-gray-500 font-medium">{item.label}</div>
                      <div className="text-[14px] font-bold text-gray-800">{item.value}</div>
                    </div>
                  </div>
                ))}
              </div>

              <p className="mt-4">
                للاطلاع على{" "}
                <button
                  onClick={() => go("universities")}
                  className="inline-flex items-center gap-0.5 bg-green-50 text-green-700 font-semibold px-2 py-0.5 rounded-md border border-green-200 hover:bg-green-100 hover:border-green-400 transition-all cursor-pointer text-[14px]"
                >
                  أسعار الجامعات بالتفصيل ↗
                </button>{" "}
                تفضل بزيارة صفحة الجامعات — فيها كل التفاصيل حسب كل مؤسسة.
              </p>
            </div>

            {/* Block 3 */}
            <div>
              <h3 className="text-xl font-bold text-gray-900 mb-3 flex items-center gap-2">
                <span className="w-7 h-7 rounded-full bg-green-100 text-green-700 text-sm font-bold flex items-center justify-center flex-shrink-0">3</span>
                ما هي الوثائق المطلوبة؟
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {[
                  "شهادة البكالوريا أو الشهادة الجامعية",
                  "كشف النقاط (Transcript)",
                  "جواز السفر — نسخة واضحة",
                  "صور شخصية بخلفية بيضاء",
                  "ترجمة جميع الوثائق إلى الإنجليزية",
                  "شهادة لغة مثل IELTS (أحياناً)",
                ].map((doc, i) => (
                  <div key={i} className="flex items-center gap-2 bg-gray-50 border border-gray-100 rounded-xl px-4 py-2.5 text-[14px]">
                    <CheckCircle size={15} className="text-green-500 flex-shrink-0" />
                    <span>{doc}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Block 4 */}
            <div>
              <h3 className="text-xl font-bold text-gray-900 mb-3 flex items-center gap-2">
                <span className="w-7 h-7 rounded-full bg-green-100 text-green-700 text-sm font-bold flex items-center justify-center flex-shrink-0">4</span>
                هل يحتاج الجزائري فيزا للدراسة في ماليزيا؟
              </h3>
              <p>
                نعم، يحتاج الطالب إلى{" "}
                <span className="bg-blue-50 border border-blue-200 text-blue-800 font-bold px-2 py-0.5 rounded-md">فيزا طالب</span>{" "}
                عند الدراسة في{" "}
                <button
                  onClick={() => go("universities")}
                  className="inline-flex items-center gap-0.5 bg-green-50 text-green-700 font-semibold px-2 py-0.5 rounded-md border border-green-200 hover:bg-green-100 hover:border-green-400 transition-all cursor-pointer text-[14px]"
                >
                  الجامعات ↗
                </button>
                . لكن في{" "}
                <button
                  onClick={() => document.getElementById("institutes")?.scrollIntoView({ behavior: "smooth" })}
                  className="inline-flex items-center gap-0.5 bg-green-50 text-green-700 font-semibold px-2 py-0.5 rounded-md border border-green-200 hover:bg-green-100 hover:border-green-400 transition-all cursor-pointer text-[14px]"
                >
                  المعاهد ↗
                </button>
                ، يمكن الدراسة أول{" "}
                <span className="font-bold text-green-700">3 أشهر بدون فيزا</span>، وبعدها تبدأ إجراءات الإقامة.{" "}
                الإجراءات بسيطة إذا كانت ملفاتك مكتملة — فريقنا في{" "}
                <button
                  onClick={() => document.getElementById("about")?.scrollIntoView({ behavior: "smooth" })}
                  className="inline-flex items-center gap-0.5 bg-green-50 text-green-700 font-semibold px-2 py-0.5 rounded-md border border-green-200 hover:bg-green-100 hover:border-green-400 transition-all cursor-pointer text-[14px]"
                >
                  من نحن ↗
                </button>
                {" "}يتولى كل شيء معك.
              </p>
            </div>

            {/* Block 5 — Steps */}
            <div>
              <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <span className="w-7 h-7 rounded-full bg-green-100 text-green-700 text-sm font-bold flex items-center justify-center flex-shrink-0">5</span>
                كيف تقدم للدراسة في ماليزيا؟
              </h3>
              <div className="space-y-2">
                {[
                  { step: "1", label: "اختيار الجامعة أو المعهد المناسب" },
                  { step: "2", label: "إرسال الوثائق المطلوبة" },
                  { step: "3", label: "الحصول على خطاب القبول" },
                  { step: "4", label: "بدء إجراءات فيزا الطالب" },
                  { step: "5", label: "السفر والوصول إلى ماليزيا" },
                ].map((item) => (
                  <div key={item.step} className="flex items-center gap-3 bg-gray-50 border border-gray-100 rounded-xl px-4 py-3">
                    <div className="w-7 h-7 rounded-full bg-green-600 text-white text-sm font-bold flex items-center justify-center flex-shrink-0">{item.step}</div>
                    <span className="font-medium text-gray-800">{item.label}</span>
                  </div>
                ))}
              </div>
              <p className="mt-4 text-gray-500 text-sm">
                ⏱️ المدة: من <strong className="text-gray-700">3 أيام عمل</strong> إلى <strong className="text-gray-700">6 أسابيع</strong> حسب الجامعة والتخصص.
              </p>
            </div>

            {/* Block 6 — Extra info */}
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="bg-green-50 border border-green-100 rounded-2xl p-5">
                <div className="text-lg font-bold text-green-800 mb-2">💼 هل يمكن العمل أثناء الدراسة؟</div>
                <p className="text-sm text-green-700">نعم، يمكن العمل بدوام جزئي في فترات معينة خارج وقت الدراسة.</p>
              </div>
              <div className="bg-blue-50 border border-blue-100 rounded-2xl p-5">
                <div className="text-lg font-bold text-blue-800 mb-2">🌟 هل ماليزيا مناسبة لك؟</div>
                <p className="text-sm text-blue-700">جودة تعليم + تكلفة مناسبة + بيئة مسلمة = ماليزيا خيار ممتاز.</p>
              </div>
            </div>

          </article>
          </div>

          {/* Article CTA */}
          <div className="mt-10 bg-gradient-to-br from-green-700 to-emerald-600 rounded-2xl p-8 text-center text-white shadow-xl">
            <h3 className="text-xl font-extrabold mb-2">جاهز تبدأ رحلتك؟</h3>
            <p className="text-green-100 text-sm mb-6 max-w-md mx-auto">
              فريقنا يرافقك من أول خطوة حتى تطأ أرض ماليزيا — استشارة مجانية 100%
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <button
                onClick={() => go("consultation")}
                className="bg-white text-green-800 font-bold px-7 py-3 rounded-full hover:bg-green-50 transition-all shadow-md text-sm"
              >
                📅 احجز استشارتك المجانية
              </button>
              <button
                onClick={() => go("universities")}
                className="border-2 border-white/50 text-white font-semibold px-7 py-3 rounded-full hover:bg-white/10 transition-all text-sm"
              >
                🎓 استعرض الجامعات
              </button>
            </div>
          </div>

        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="py-20 bg-gray-50">
        <div className="max-w-3xl mx-auto px-4">
          <div className="text-center mb-12">
            <div className="inline-block bg-green-100 text-green-700 rounded-full px-4 py-1 text-sm font-semibold mb-4">
              أسئلة شائعة
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
              كل ما تريد معرفته عن الدراسة في ماليزيا
            </h2>
            <p className="text-gray-500 text-base max-w-xl mx-auto">
              أجوبة واضحة وصريحة على الأسئلة التي يطرحها الطلاب الجزائريون
            </p>
          </div>

          <div className="space-y-3">
            {[
              {
                q: "هل يحتاج الجزائري فيزا للدراسة في ماليزيا؟",
                a: (
                  <span>
                    نعم، يحتاج الطالب الجزائري إلى <strong>فيزا طالب</strong> عند الدراسة في الجامعات.
                    <br /><br />
                    لكن بالنسبة لمعاهد اللغة، يمكن الدراسة خلال <strong>أول 3 أشهر بدون فيزا</strong>، وبعدها يتم البدء في إجراءات الفيزا إذا أراد الاستمرار.
                    الإجراءات عادة بسيطة إذا كانت ملفاتك مكتملة.
                  </span>
                ),
              },
              {
                q: "كم تكلفة الدراسة في ماليزيا؟",
                a: (
                  <span>
                    تختلف التكلفة حسب الجامعة والتخصص، لكن في المتوسط تكون حوالي <strong>6,000 € سنوياً</strong>.
                    <br /><br />
                    ماليزيا تبقى خياراً ذكياً من حيث الجودة مقابل السعر مقارنة بأوروبا وكندا وأستراليا.
                  </span>
                ),
              },
              {
                q: "هل ماليزيا مناسبة للطلاب الجزائريين؟",
                a: (
                  <span>
                    نعم، ماليزيا تعتبر من <strong>أفضل الوجهات</strong> للطلاب الجزائريين بفضل تكاليفها المعقولة، جودة التعليم العالي، والبيئة المريحة.
                    <br /><br />
                    كما أنها <strong>دولة مسلمة</strong>، مما يجعل التأقلم أسهل من ناحية الأكل ونمط الحياة.
                  </span>
                ),
              },
              {
                q: "ما هي الوثائق المطلوبة للدراسة في ماليزيا؟",
                a: (
                  <ul className="list-none space-y-1.5 mt-1">
                    {[
                      "شهادة البكالوريا أو الشهادة الجامعية (حسب البرنامج)",
                      "كشف النقاط (Transcript)",
                      "جواز السفر — نسخة واضحة",
                      "صور شخصية بخلفية بيضاء",
                      "ترجمة جميع الوثائق إلى اللغة الإنجليزية",
                      "شهادة لغة مثل IELTS في بعض الحالات",
                    ].map((item, i) => (
                      <li key={i} className="flex items-start gap-2 text-gray-700 text-[15px]">
                        <CheckCircle size={15} className="text-green-500 flex-shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                ),
              },
              {
                q: "كم تستغرق إجراءات القبول؟",
                a: (
                  <span>
                    يعتمد على الجامعة والتخصص:
                    <br /><br />
                    • أحياناً يتم القبول خلال <strong>3 أيام عمل</strong> (خاصة للبكالوريوس)<br />
                    • وفي حالات أخرى قد يستغرق من <strong>أسبوع إلى 6 أسابيع</strong>
                    <br /><br />
                    كلما كانت الملفات جاهزة، كانت الإجراءات أسرع. فريقنا يتابع معك كل خطوة.
                  </span>
                ),
              },
            ].map((item, i) => (
              <FaqItem key={i} question={item.q} answer={item.a} />
            ))}
          </div>

          {/* CTA under FAQ */}
          <div className="mt-10 bg-white border border-green-100 rounded-2xl p-6 text-center shadow-sm">
            <p className="text-gray-700 font-semibold mb-2">لديك سؤال لم تجد إجابته هنا؟</p>
            <p className="text-gray-500 text-sm mb-4">تواصل مع فريقنا مباشرة — نرد في أقل من 24 ساعة</p>
            <button
              onClick={() => go("consultation")}
              className="bg-green-700 hover:bg-green-800 text-white px-7 py-3 rounded-full font-bold text-sm transition-all shadow-md"
            >
              احجز استشارتك المجانية الآن
            </button>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-16 bg-white">
        <div className="max-w-2xl mx-auto px-4 text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-3">تواصل معنا مباشرة</h2>
          <p className="text-gray-600 mb-6">فريقنا جاهز للإجابة على استفساراتك</p>
          <a
            href={WA_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 bg-green-500 hover:bg-green-600 text-white px-8 py-4 rounded-full font-bold text-lg transition-all shadow-lg hover:shadow-xl"
          >
            <div className="w-6 h-6">{WHATSAPP_SVG}</div>
            <span>تواصل عبر واتساب</span>
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-green-900 text-white py-12">
        <div className="max-w-5xl mx-auto px-4 text-center">
          <div className="flex justify-center mb-4">
            <div className="w-16 h-16 rounded-full bg-white p-1 shadow-xl border-2 border-white/60">
              <img src="/logo-hq.jpg" alt="Algeria2Malaysia" className="w-full h-full object-contain rounded-full" />
            </div>
          </div>
          <div className="text-xl font-bold mb-1">Algeria2Malaysia</div>
          <div className="text-green-300 text-sm mb-6">من الجزائر إلى ماليزيا — مستقبلك يبدأ هنا</div>

          {/* Social Media Links */}
          <div className="flex items-center justify-center gap-5 mb-8">
            <a
              href="https://www.instagram.com/algeria2malaysia?igsh=MXE2emw2aTc0eWZnbw%3D%3D&utm_source=qr"
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col items-center gap-1.5 group"
              aria-label="Instagram"
            >
              <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-purple-500 via-pink-500 to-orange-400 flex items-center justify-center shadow-md group-hover:scale-110 transition-transform">
                <svg viewBox="0 0 24 24" fill="white" className="w-5 h-5">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
                </svg>
              </div>
              <span className="text-green-300 text-xs group-hover:text-white transition-colors">Instagram</span>
            </a>

            <a
              href="https://www.tiktok.com/@algeria2malaysiaa?_r=1&_t=ZS-957y69kPwJD"
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col items-center gap-1.5 group"
              aria-label="TikTok"
            >
              <div className="w-11 h-11 rounded-xl bg-black flex items-center justify-center shadow-md group-hover:scale-110 transition-transform border border-white/10">
                <svg viewBox="0 0 24 24" fill="white" className="w-5 h-5">
                  <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V8.69a8.27 8.27 0 004.84 1.55V6.79a4.85 4.85 0 01-1.07-.1z"/>
                </svg>
              </div>
              <span className="text-green-300 text-xs group-hover:text-white transition-colors">TikTok</span>
            </a>

            <a
              href="https://www.facebook.com/algeria2malaysia"
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col items-center gap-1.5 group"
              aria-label="Facebook"
            >
              <div className="w-11 h-11 rounded-xl bg-blue-600 flex items-center justify-center shadow-md group-hover:scale-110 transition-transform">
                <svg viewBox="0 0 24 24" fill="white" className="w-5 h-5">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </div>
              <span className="text-green-300 text-xs group-hover:text-white transition-colors">Facebook</span>
            </a>
          </div>

          <div className="text-green-400 text-xs mb-1">تابعنا على وسائل التواصل: @algeria2malaysia</div>
          <div className="border-t border-green-700 pt-4 text-green-500 text-xs">
            © 2026 Algeria2Malaysia. جميع الحقوق محفوظة.
          </div>
        </div>
      </footer>
    </div>
  );
}
