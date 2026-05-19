import { useState } from "react";
import { ArrowLeft, RotateCcw, CheckCircle, ChevronLeft, Sparkles, Info } from "lucide-react";
import { useNavigate } from "../hooks/useNavigate";
import { useLanguage } from "../i18n/LanguageContext";
import { translations as T } from "../i18n/translations";
import type { Lang } from "../i18n/translations";

type Goal     = "general" | "ielts" | "business" | "kids" | "international";
type Duration = "weekly" | "short" | "mid" | "long";
type Budget   = "low" | "mid" | "high";

interface Answers {
  goal?: Goal;
  duration?: Duration;
  budget?: Budget;
}

type InstId = "stratford" | "bigben" | "erican" | "sheffield" | "bright" | "cambright";

interface InstMeta {
  nameAr: string;
  name: string;
  logo: string;
  logoImgClass?: string;
  borderColor: string;
  headerBg: string;
  btnColor: string;
  page: string;
  from: string;
}

const INST_META: Record<InstId, InstMeta> = {
  stratford: {
    nameAr: "معهد ستراتفورد",
    name: "Stratford International",
    logo: "/stratford-logo.png",
    borderColor: "border-teal-200",
    headerBg: "bg-teal-50",
    btnColor: "bg-teal-600 hover:bg-teal-700",
    page: "stratford-institute",
    from: "950 RM / شهر",
  },
  bigben: {
    nameAr: "مجموعة بيغ بان",
    name: "Big Ben Education",
    logo: "/bigben-logo.png",
    borderColor: "border-rose-200",
    headerBg: "bg-rose-50",
    btnColor: "bg-[#7a1a2e] hover:bg-[#5a1020]",
    page: "bigben-institute",
    from: "2,618 RM / شهر",
  },
  erican: {
    nameAr: "مركز إيريكان",
    name: "Erican Language Centre",
    logo: "/erican-logo.png",
    borderColor: "border-violet-200",
    headerBg: "bg-violet-50",
    btnColor: "bg-[#5a2a9a] hover:bg-[#3d1a6e]",
    page: "erican-institute",
    from: "2,800 RM / شهر",
  },
  sheffield: {
    nameAr: "أكاديمية شيفيلد",
    name: "Sheffield Academy",
    logo: "/sheffield-logo.png",
    borderColor: "border-blue-200",
    headerBg: "bg-blue-50",
    btnColor: "bg-[#1a3272] hover:bg-[#0d1f4e]",
    page: "sheffield-institute",
    from: "3,400 RM / شهر",
  },
  bright: {
    nameAr: "مركز برايت للغات",
    name: "Bright Language Center",
    logo: "/bright-logo.png",
    logoImgClass: "w-full h-full object-cover object-left",
    borderColor: "border-orange-200",
    headerBg: "bg-orange-50",
    btnColor: "bg-[#e85d26] hover:bg-[#b03a10]",
    page: "bright-institute",
    from: "1,365 RM / أسبوع",
  },
  cambright: {
    nameAr: "معهد Cambright الدولي",
    name: "Cambright International Language Centre",
    logo: "/cambright-logo.png",
    borderColor: "border-blue-300",
    headerBg: "bg-[#1a2a6c]/5",
    btnColor: "bg-[#1a2a6c] hover:bg-[#0f1d52]",
    page: "cambright-institute",
    from: "2,650 RM / شهر",
  },
};

// ─── Score Entry ───────────────────────────────────────────
interface ScoreEntry {
  id: InstId;
  score: number;
  program: string;
  reason: string;
  highlights: string[];
}

function buildRecommendations(a: Answers): ScoreEntry[] {
  // ── International environment (low Arabic) ─────────────
  if (a.goal === "international") {
    return [
      {
        id: "cambright", score: 99,
        program: "Academic / Intensive — بيئة دولية متعددة الجنسيات",
        reason: "Cambright هو المعهد الوحيد في كوالالمبور المصمم خصيصاً للبيئة الدولية — طلاب من جنسيات مختلفة حول العالم، الإنجليزية هي لغة التواصل الوحيدة، وأقل نسبة متحدثين بالعربية. مثالي لمن يريد تحسين المحادثة بشكل طبيعي وسريع",
        highlights: ["أقل عرب 🌍", "جنسيات متعددة", "تحسين المحادثة طبيعياً", "موقع KLCC"],
      },
      {
        id: "stratford", score: 72,
        program: "General English — بيئة متنوعة نسبياً",
        reason: "ستراتفورد في G Tower KLCC يضم طلاباً من جنسيات مختلفة مع أسعار مناسبة — خيار جيد لمن يريد بيئة متنوعة بتكلفة معقولة",
        highlights: ["موقع KLCC", "أسعار مناسبة", "جنسيات متعددة"],
      },
      {
        id: "bigben", score: 65,
        program: "IEP Intensive — بيئة أكاديمية متنوعة",
        reason: "بيغ بان يضم طلاباً من خلفيات مختلفة مع منهج Pearson المكثف الذي يركز على التطور الفردي",
        highlights: ["Pearson معتمد", "مجموعات صغيرة", "تقدم مضمون"],
      },
    ];
  }

  // ── IELTS ──────────────────────────────────────────────
  if (a.goal === "ielts") {
    return [
      {
        id: "cambright", score: 98,
        program: "IELTS Preparation — بيئة دولية + تدريب يومي",
        reason: "Cambright هو الأفضل لـ IELTS لأنه يجمع التحضير الأكاديمي مع بيئة دولية حقيقية — تتحدث إنجليزية مع جنسيات مختلفة يومياً مما يطور جزء Speaking بشكل طبيعي لا يمكن تعلمه في الفصل وحده",
        highlights: ["Speaking طبيعي 🌍", "تحضير IELTS متكامل", "4h/يوم", "KLCC"],
      },
      {
        id: "bigben", score: 91,
        program: "IELTS Preparation + IEP (Pearson)",
        reason: "بيغ بان متخصص بـ IELTS بشهادة Pearson الدولية — برنامج IEP المكثف يرفع درجتك في وقت قياسي مع مدرسين معتمدين",
        highlights: ["Pearson معتمد", "IEP مكثف", "نتائج مضمونة"],
      },
      {
        id: "sheffield", score: 80,
        program: "IELTS Preparation + اختبار مجاني",
        reason: "شيفيلد يمنحك اختبار IELTS مجاناً مع أي تسجيل — توفير فعلي يصل إلى 800 RM، مع دعم كامل للتأشيرة",
        highlights: ["IELTS مجاني ✓", "توفير 800 RM", "تأشيرة طالب"],
      },
    ];
  }

  // ── Kids ───────────────────────────────────────────────
  if (a.goal === "kids") {
    return [
      {
        id: "cambright", score: 99,
        program: "سامر كامب Cambright (7–15 سنة) — بيئة دولية",
        reason: "Cambright هو الأفضل للأطفال الذين يريدون بيئة دولية حقيقية — سامر كامب للأعمار 7-15 سنة مع طلاب من جنسيات مختلفة، برنامج يومي منظم، وجبات، وكتب Cambridge. هذا يجعل الطفل يتحدث الإنجليزية بشكل طبيعي بدون الاعتماد على العربية",
        highlights: ["7–15 سنة ✓", "بيئة دولية 🌍", "كتب Cambridge", "برنامج يومي كامل"],
      },
      {
        id: "bright", score: 91,
        program: "International Summer Program 2026 (13+ سنة)",
        reason: "برايت متخصص في برامج المراهقين 13+ — سامر كامب دولي بكوالالمبور يشمل رحلات ونشاطات ترفيهية وتعليمية خلال الصيف",
        highlights: ["من 13 سنة فأكثر", "رحلات + نشاطات", "باقات سكن متنوعة"],
      },
      {
        id: "erican", score: 75,
        program: "Cambridge Young Learners Program",
        reason: "إيريكان معتمد من Cambridge للناشئين — منهج دولي يمنح الطفل شهادة Cambridge معترفاً بها",
        highlights: ["Cambridge معتمد", "شهادة دولية", "تعلم تفاعلي"],
      },
    ];
  }

  // ── Business English ────────────────────────────────────
  if (a.goal === "business") {
    return [
      {
        id: "erican", score: 95,
        program: "Business English (Cambridge Certified)",
        reason: "إيريكان هو المركز الوحيد في كوالالمبور بمنهج Cambridge للأعمال — يدرّبك على العروض والمفاوضات والكتابة المهنية",
        highlights: ["Cambridge معتمد", "محاكاة بيئة عمل", "كتابة ومحادثة مهنية"],
      },
      {
        id: "bigben", score: 82,
        program: "VIP Business English Program",
        reason: "برنامج VIP من بيغ بان مصمم للمهنيين — حصص مكثفة وتدريب على الاجتماعات والعروض التقديمية",
        highlights: ["برنامج VIP", "Pearson معتمد", "مجموعات صغيرة"],
      },
    ];
  }

  // ── Weekly (Summer Camp) ────────────────────────────────
  if (a.duration === "weekly") {
    return [
      {
        id: "bright", score: 99,
        program: "Summer Camp أسبوعي (1–4 أسابيع)",
        reason: "برايت هو المعهد الوحيد المتخصص في البرامج الأسبوعية — يبدأ السامر كامب من أسبوع واحد بـ 1,365 RM، مع عروض 7+1 و10+2 مجاناً. لا تحتاج فيزا دراسية",
        highlights: ["من 1,365 RM/أسبوع", "☀️ سامر كامب", "بدون فيزا"],
      },
      {
        id: "sheffield", score: 72,
        program: "General English (أسبوعي — بدون فيزا)",
        reason: "شيفيلد يوفر أيضاً برامج أسبوعية للبالغين — خيار جيد لمن يريد بيئة أكاديمية مع مرونة الأسابيع",
        highlights: ["بدون فيزا", "بيئة أكاديمية", "مرن"],
      },
    ];
  }

  // ── General English: score by duration + budget ─────────
  const results: ScoreEntry[] = [];

  if (a.duration === "short") {
    if (a.budget === "low") {
      results.push({
        id: "bright", score: 98,
        program: "Summer Camp أسبوعي (1–12 أسبوع)",
        reason: "برايت هو الأفضل للبرامج الأسبوعية القصيرة — تبدأ من 1,365 RM/أسبوع مع عروض 7+1 و10+2 أسابيع مجاناً. لا تحتاج فيزا للزيارات القصيرة",
        highlights: ["من 1,365 RM/أسبوع", "بدون فيزا", "7+1 مجاناً"],
      });
      results.push({
        id: "stratford", score: 83,
        program: "General English (1–3 أشهر)",
        reason: "ستراتفورد مثالي للبرامج الشهرية القصيرة — يبدأ من 950 RM/شهر بدون تأشيرة دراسية",
        highlights: ["من 950 RM/شهر", "بدون تأشيرة طالب", "تسجيل مرن"],
      });
      results.push({
        id: "sheffield", score: 70,
        program: "General English + Free IELTS",
        reason: "إذا احتجت IELTS لاحقاً، شيفيلد يمنحه مجاناً مع التسجيل — قيمة مضافة لا تجدها في غيره",
        highlights: ["IELTS مجاني", "أسعار تنافسية"],
      });
    } else if (a.budget === "mid") {
      results.push({
        id: "cambright", score: 96,
        program: "Academic Program 1–3 أشهر — بيئة دولية",
        reason: "Cambright هو الأفضل لمن يريد تطوير المحادثة والإنجليزية بسرعة في بيئة دولية حقيقية — 4 ساعات يومياً في قلب KLCC مع طلاب من جنسيات مختلفة",
        highlights: ["بيئة دولية 🌍", "KLCC", "تحسن سريع"],
      });
      results.push({
        id: "bright", score: 88,
        program: "Summer Camp أسبوعي أو Intensive شهري",
        reason: "برايت يتيح لك الاختيار — سامر كامب أسبوعي مرن أو برنامج مكثف شهري بـ 3,000 RM مع خصم صيفي 25%",
        highlights: ["مرونة الاختيار", "خصم 25% صيف 2026", "7+1 مجاناً"],
      });
      results.push({
        id: "stratford", score: 78,
        program: "General English (1–3 أشهر)",
        reason: "بميزانيتك المتوسطة، ستراتفورد يوفر عليك الكثير لفترة قصيرة دون التنازل عن جودة التعليم",
        highlights: ["من 950 RM/شهر", "تسجيل مرن", "قريب من المركز"],
      });
    } else {
      results.push({
        id: "cambright", score: 94,
        program: "Intensive Program 1–3 أشهر — 6h/يوم",
        reason: "بميزانيتك المرتفعة، البرنامج المكثف من Cambright (4h أكاديمي + 2h محادثة) في بيئة دولية هو الأسرع لتطوير الإنجليزية بشكل متكامل",
        highlights: ["6h/يوم", "بيئة دولية", "أكاديمي + محادثة"],
      });
      results.push({
        id: "bright", score: 84,
        program: "International Summer Program 2026 — Executive Plus",
        reason: "بميزانيتك المرتفعة، باقة Executive Plus من برايت توفر سكن ستوديو + رحلات + استقبال مطار + سامر كامب متكامل",
        highlights: ["شقة ستوديو", "رحلات شاملة", "استقبال مطار"],
      });
      results.push({
        id: "bigben", score: 76,
        program: "IEP Intensive Program",
        reason: "بيغ بان IEP المكثف بـ Pearson — لو هدفك رفع مستواك بسرعة ملحوظة هو الخيار الأول",
        highlights: ["Pearson معتمد", "نتائج سريعة", "IEP مكثف"],
      });
    }
  }

  if (a.duration === "mid") {
    if (a.budget === "low") {
      results.push({
        id: "sheffield", score: 95,
        program: "6-Month Special Offer + Free IELTS",
        reason: "شيفيلد له أفضل عرض لـ 6 أشهر في كوالالمبور + IELTS مجاني + دعم تأشيرة الطالب. لا يوجد خيار أفضل بهذه الميزانية",
        highlights: ["عرض 6 أشهر حصري", "IELTS مجاني ✓", "تأشيرة طالب ✓"],
      });
      results.push({
        id: "cambright", score: 78,
        program: "Academic Program 4–6 أشهر",
        reason: "Cambright لـ 4-6 أشهر يمنحك بيئة دولية حقيقية مع منهج Cambridge — خيار ممتاز لتطوير الإنجليزية الطبيعية",
        highlights: ["بيئة دولية", "Cambridge", "KLCC"],
      });
    } else if (a.budget === "mid") {
      results.push({
        id: "cambright", score: 97,
        program: "Intensive Program 4–6 أشهر — بيئة دولية",
        reason: "Cambright المكثف لـ 4-6 أشهر هو الأفضل لمن يريد بيئة إنجليزية حقيقية — 6 ساعات يومياً مع جنسيات مختلفة يجعلك تتكلم الإنجليزية بثقة خلال أسابيع",
        highlights: ["بيئة دولية 🌍", "6h/يوم", "تطور سريع مضمون"],
      });
      results.push({
        id: "bigben", score: 84,
        program: "IEP Intensive 4–6 Months (Pearson)",
        reason: "بيغ بان IEP المكثف لـ 4-6 أشهر — برنامج Pearson المنظم يضمن تقدماً حقيقياً وقابلاً للقياس",
        highlights: ["Pearson معتمد", "IEP مكثف", "تقدم مضمون"],
      });
      results.push({
        id: "sheffield", score: 74,
        program: "Medium-Term Package + Free IELTS",
        reason: "شيفيلد مع عروضه الحصرية + IELTS مجاني + دعم تأشيرة كاملة",
        highlights: ["IELTS مجاني", "أفضل سعر", "تأشيرة طالب ✓"],
      });
    } else {
      results.push({
        id: "cambright", score: 96,
        program: "Intensive Program 4–6 أشهر — Premium",
        reason: "بميزانيتك المرتفعة، البرنامج المكثف من Cambright في بيئة دولية KLCC هو الأفضل — 6 ساعات يومياً مع مناهج Cambridge وطلاب من جنسيات مختلفة",
        highlights: ["6h/يوم", "بيئة دولية 🌍", "Cambridge", "KLCC Premium"],
      });
      results.push({
        id: "bigben", score: 88,
        program: "IEP Premium (Pearson) 4–6 Months",
        reason: "بيغ بان IEP Premium — أفضل مدرسين Pearson مع برنامج مكثف منظم",
        highlights: ["Pearson معتمد", "IEP Premium", "تأشيرة طالب ✓"],
      });
      results.push({
        id: "erican", score: 79,
        program: "Comprehensive English (Cambridge) 6 Months",
        reason: "إيريكان Cambridge المتكامل — 6 برامج متخصصة مع شهادة دولية معترف بها لدى أصحاب العمل",
        highlights: ["Cambridge & IDP", "6 برامج", "شهادة دولية"],
      });
    }
  }

  if (a.duration === "long") {
    if (a.budget === "low") {
      results.push({
        id: "sheffield", score: 91,
        program: "Long-Term Program + Student Visa Support",
        reason: "شيفيلد لديه أفضل عروض طويلة الأمد بكوالالمبور — دعم كامل لتأشيرة الطالب + IELTS مجاني لمن يريد الحصول عليه",
        highlights: ["أفضل سعر طويل", "تأشيرة طالب ✓", "IELTS مجاني"],
      });
      results.push({
        id: "bigben", score: 72,
        program: "IEP Annual Program",
        reason: "بيغ بان IEP لسنة كاملة — برنامج Pearson المنظم يضمن تقدماً مستمراً مع دعم تأشيرة الطالب",
        highlights: ["Pearson معتمد", "تأشيرة طالب ✓", "منهج سنوي"],
      });
    } else {
      results.push({
        id: "bigben", score: 95,
        program: "IEP Annual Program (Pearson Certified)",
        reason: "بيغ بان IEP السنوي هو الأفضل للإقامة الطويلة — برنامج Pearson الأكاديمي يضمن تقدماً حقيقياً مع تأشيرة طالب كاملة",
        highlights: ["Pearson معتمد", "تأشيرة طالب ✓", "تقدم مضمون"],
      });
      results.push({
        id: "erican", score: 88,
        program: "Comprehensive Annual Program (Cambridge)",
        reason: "إيريكان Cambridge لسنة كاملة — 6 برامج متخصصة يمكنك الانتقال بينها مع شهادة دولية في النهاية",
        highlights: ["Cambridge & IDP", "6 برامج", "شهادة دولية"],
      });
      results.push({
        id: "sheffield", score: 79,
        program: "Long-Term Premium + Free IELTS",
        reason: "شيفيلد طويل الأمد مع IELTS مجاني — قيمة ممتازة للإقامة السنوية وأسعار تنافسية",
        highlights: ["IELTS مجاني", "تأشيرة طالب ✓"],
      });
    }
  }

  return results.filter(e => e.score >= 60).sort((a, b) => b.score - a.score).slice(0, 3);
}

// ─── Build translated steps ─────────────────────────────────
type TFn = (obj: Record<Lang, string>) => string;

function buildSteps(t: TFn) {
  return [
    {
      key: "goal",
      q: t(T.quiz.q1.q), sub: t(T.quiz.q1.sub),
      options: [
        { value: "general",       label: t(T.quiz.q1.general),       icon: "🗣️", desc: t(T.quiz.q1.generalD) },
        { value: "ielts",         label: t(T.quiz.q1.ielts),         icon: "📋", desc: t(T.quiz.q1.ieltsD) },
        { value: "international", label: t(T.quiz.q1.international), icon: "🌍", desc: t(T.quiz.q1.internationalD) },
        { value: "business",      label: t(T.quiz.q1.business),      icon: "💼", desc: t(T.quiz.q1.businessD) },
        { value: "kids",          label: t(T.quiz.q1.kids),          icon: "🎒", desc: t(T.quiz.q1.kidsD) },
      ],
    },
    {
      key: "duration",
      q: t(T.quiz.q2.q), sub: t(T.quiz.q2.sub),
      options: [
        { value: "weekly", label: t(T.quiz.q2.weekly), icon: "☀️", desc: t(T.quiz.q2.weeklyD) },
        { value: "short",  label: t(T.quiz.q2.short),  icon: "⚡", desc: t(T.quiz.q2.shortD) },
        { value: "mid",    label: t(T.quiz.q2.mid),    icon: "📅", desc: t(T.quiz.q2.midD) },
        { value: "long",   label: t(T.quiz.q2.long),   icon: "🗓️", desc: t(T.quiz.q2.longD) },
      ],
    },
    {
      key: "budget",
      q: t(T.quiz.q3.q), sub: t(T.quiz.q3.sub),
      options: [
        { value: "low",  label: t(T.quiz.q3.low),  icon: "💰", desc: t(T.quiz.q3.lowD) },
        { value: "mid",  label: t(T.quiz.q3.mid),  icon: "💳", desc: t(T.quiz.q3.midD) },
        { value: "high", label: t(T.quiz.q3.high), icon: "💎", desc: t(T.quiz.q3.highD) },
      ],
    },
  ];
}

// ─── Props ─────────────────────────────────────────────────
interface Props { }

export default function InstituteQuiz(_props: Props = {}) {
  const { go } = useNavigate();
  const { t, dir } = useLanguage();
  const [step, setStep]       = useState(0);
  const [answers, setAnswers] = useState<Answers>({});
  const [done, setDone]       = useState(false);

  const STEPS = buildSteps(t);
  const currentStep = STEPS[step];

  function pick(value: string) {
    const newAnswers = { ...answers, [currentStep.key]: value } as Answers;
    setAnswers(newAnswers);

    if (currentStep.key === "goal" && value !== "general") {
      setDone(true); return;
    }

    if (currentStep.key === "duration" && value === "weekly") {
      setDone(true); return;
    }

    if (step < STEPS.length - 1) { setStep(step + 1); }
    else { setDone(true); }
  }

  function reset() { setStep(0); setAnswers({}); setDone(false); }

  const recs = buildRecommendations(answers);

  // ── Main results ──
  if (done) {
    return (
      <div className="space-y-4">
        {/* Header */}
        <div className="flex items-start justify-between">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <Sparkles size={16} className="text-green-600" />
              <h3 className="font-extrabold text-gray-900 text-lg">{t(T.quiz.bestMatch)}</h3>
            </div>
            {/* Selections summary */}
            <div className="flex flex-wrap gap-1.5 mt-1">
              {answers.goal     && <span className="bg-green-100 text-green-800 text-xs font-semibold px-2.5 py-0.5 rounded-full">{STEPS[0].options.find(o => o.value === answers.goal)?.label}</span>}
              {answers.duration && <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded-full">{STEPS[1].options.find(o => o.value === answers.duration)?.label}</span>}
              {answers.budget   && <span className="bg-amber-100 text-amber-800 text-xs font-semibold px-2.5 py-0.5 rounded-full">{STEPS[2].options.find(o => o.value === answers.budget)?.label}</span>}
            </div>
          </div>
          <button onClick={reset} className="flex items-center gap-1.5 text-xs text-gray-400 hover:text-gray-600 border border-gray-200 rounded-lg px-3 py-1.5 transition-all hover:border-gray-300 flex-shrink-0">
            <RotateCcw size={12} /> {t(T.quiz.change)}
          </button>
        </div>

        {/* Result cards */}
        {recs.map((rec, i) => {
          const meta = INST_META[rec.id];
          return (
            <div key={rec.id} className={`rounded-2xl border-2 ${meta.borderColor} overflow-hidden`}>
              {/* Top bar */}
              <div className={`${meta.headerBg} px-4 py-3 flex items-center justify-between`}>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-white rounded-xl border border-white/60 shadow-sm flex-shrink-0 overflow-hidden flex items-center justify-center p-1">
                    <img src={meta.logo} alt={meta.name} className={meta.logoImgClass ?? "max-w-full max-h-full object-contain"} />
                  </div>
                  <div>
                    <div className="font-extrabold text-gray-900 text-sm leading-tight">{meta.nameAr}</div>
                    <div className="text-gray-500 text-xs">{rec.program}</div>
                  </div>
                </div>
                <div className="text-right flex-shrink-0">
                  {i === 0
                    ? <span className="bg-green-500 text-white text-xs font-bold px-2.5 py-1 rounded-full">{t(T.quiz.best)}</span>
                    : <span className="bg-gray-100 text-gray-600 text-xs font-semibold px-2.5 py-1 rounded-full">{t(T.quiz.alt)}</span>
                  }
                </div>
              </div>

              {/* Body */}
              <div className="px-4 py-3 bg-white">
                {/* Match score bar */}
                <div className="flex items-center gap-2 mb-3">
                  <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all ${i === 0 ? "bg-green-500" : "bg-blue-400"}`}
                      style={{ width: `${rec.score}%` }}
                    />
                  </div>
                  <span className={`text-xs font-bold flex-shrink-0 ${i === 0 ? "text-green-600" : "text-blue-600"}`}>{t(T.quiz.match)} {rec.score}%</span>
                </div>

                {/* Reason */}
                <div className="flex gap-2 mb-3">
                  <Info size={14} className="text-gray-400 flex-shrink-0 mt-0.5" />
                  <p className="text-gray-700 text-xs leading-relaxed">{rec.reason}</p>
                </div>

                {/* Highlights */}
                <div className="flex flex-wrap gap-1.5 mb-3">
                  {rec.highlights.map((h) => (
                    <span key={h} className="bg-gray-100 text-gray-700 text-xs font-medium px-2 py-0.5 rounded-full">{h}</span>
                  ))}
                  <span className="bg-gray-100 text-gray-700 text-xs font-medium px-2 py-0.5 rounded-full">تبدأ من {meta.from}</span>
                </div>

                {/* Actions */}
                <div className="flex gap-2">
                  <button
                    onClick={() => go(meta.page as any)}
                    className={`flex-1 ${meta.btnColor} text-white text-xs font-bold rounded-xl px-3 py-2.5 transition-all flex items-center gap-1 justify-center`}
                  >
                    {t(T.quiz.details)}
                    <ChevronLeft size={13} />
                  </button>
                  <a
                    href="https://wa.me/601112200603"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-[#25d366] hover:bg-[#1da851] text-white text-xs font-bold rounded-xl px-4 py-2.5 transition-all text-center flex-shrink-0"
                  >
                    {t(T.quiz.whatsapp)}
                  </a>
                </div>
              </div>
            </div>
          );
        })}

        {recs.length === 0 && (
          <div className="text-center py-8 text-gray-400 text-sm">{t(T.quiz.noResult)}</div>
        )}
      </div>
    );
  }

  // ── Question screen ──
  const totalSteps = answers.goal === "general" || !answers.goal ? 3 : 1;
  return (
    <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
      {/* Progress bar */}
      <div className="h-1.5 bg-gray-100">
        <div className="h-full bg-green-500 transition-all duration-500" style={{ width: `${Math.round((step / totalSteps) * 100)}%` }} />
      </div>

      <div className="p-5 sm:p-7">
        {/* Step dots */}
        <div className="flex items-center gap-2 mb-5">
          {STEPS.slice(0, answers.goal && answers.goal !== "general" ? 1 : 3).map((_, i) => (
            <div key={i} className="flex items-center gap-2">
              <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                i < step ? "bg-green-500 text-white" :
                i === step ? "bg-green-600 text-white ring-2 ring-green-100" :
                "bg-gray-100 text-gray-400"
              }`}>
                {i < step ? <CheckCircle size={12} /> : i + 1}
              </div>
              {i < (answers.goal && answers.goal !== "general" ? 0 : 2) && (
                <div className={`h-0.5 w-6 rounded ${i < step ? "bg-green-400" : "bg-gray-200"}`} />
              )}
            </div>
          ))}
          <span className="text-xs text-gray-400 mr-auto">
            {step < totalSteps - 1 ? `${totalSteps - step - 1} ${t(T.quiz.remaining)}` : t(T.quiz.lastQ)}
          </span>
        </div>

        <h3 className="text-lg sm:text-xl font-extrabold text-gray-900 mb-0.5">{currentStep.q}</h3>
        <p className="text-gray-400 text-xs sm:text-sm mb-4">{currentStep.sub}</p>

        <div className="grid gap-2">
          {currentStep.options.map((opt) => (
            <button
              key={opt.value}
              onClick={() => pick(opt.value)}
              className="flex items-center gap-3 text-right p-3 sm:p-4 rounded-xl sm:rounded-2xl border-2 border-gray-100 hover:border-green-400 hover:bg-green-50 active:bg-green-100 transition-all group w-full"
            >
              <span className="text-lg sm:text-xl flex-shrink-0 w-8 text-center">{opt.icon}</span>
              <div className="flex-1 min-w-0 text-right">
                <div className="font-bold text-gray-900 group-hover:text-green-700 transition-colors text-sm leading-snug">{opt.label}</div>
                <div className="text-gray-400 text-xs mt-0.5 leading-snug line-clamp-2">{opt.desc}</div>
              </div>
              <ArrowLeft size={14} className="text-gray-300 group-hover:text-green-500 group-hover:-translate-x-1 transition-all flex-shrink-0" />
            </button>
          ))}
        </div>

        <div className="flex items-center justify-between mt-4">
          {step > 0 ? (
            <button
              onClick={() => setStep(step - 1)}
              className="flex items-center gap-1.5 text-xs font-semibold text-gray-500 hover:text-green-700 border border-gray-200 hover:border-green-300 bg-white hover:bg-green-50 px-3 py-1.5 rounded-lg transition-all"
            >
              <ArrowLeft size={13} className={dir === "ltr" ? "rotate-180" : ""} />
              {t(T.quiz.prevQ)}
            </button>
          ) : (
            <button
              onClick={reset}
              className="flex items-center gap-1.5 text-xs text-gray-400 hover:text-gray-500 transition-colors"
            >
              <RotateCcw size={11} />
              {t(T.quiz.restart)}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
