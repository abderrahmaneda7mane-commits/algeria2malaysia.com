import { useState } from "react";
import { ArrowLeft, RotateCcw, CheckCircle, ChevronLeft, Sparkles, Info } from "lucide-react";
import { useNavigate } from "../hooks/useNavigate";

type Goal     = "general" | "ielts" | "business" | "kids";
type Duration = "short" | "mid" | "long";
type Budget   = "low" | "mid" | "high";

interface Answers {
  goal?: Goal;
  duration?: Duration;
  budget?: Budget;
}

type InstId = "stratford" | "bigben" | "erican" | "sheffield";

interface InstMeta {
  nameAr: string;
  name: string;
  logo: string;
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
  // ── IELTS ──────────────────────────────────────────────
  if (a.goal === "ielts") {
    return [
      {
        id: "bigben", score: 96,
        program: "IELTS Preparation + IEP (Pearson)",
        reason: "بيغ بان متخصص بـ IELTS بشهادة Pearson الدولية — برنامج IEP المكثف يرفع درجتك في وقت قياسي مع مدرسين معتمدين",
        highlights: ["Pearson معتمد", "IEP مكثف", "نتائج مضمونة"],
      },
      {
        id: "sheffield", score: 88,
        program: "IELTS Preparation + اختبار مجاني",
        reason: "شيفيلد يمنحك اختبار IELTS مجاناً مع أي تسجيل — توفير فعلي يصل إلى 800 RM، مع دعم كامل للتأشيرة",
        highlights: ["IELTS مجاني ✓", "توفير 800 RM", "تأشيرة طالب"],
      },
      {
        id: "erican", score: 78,
        program: "IELTS Preparation (IDP & Cambridge)",
        reason: "إيريكان معتمد من IDP وCambridge — بيئة أكاديمية صارمة لمن يريد أعلى درجة بأعلى مستوى تدريسي",
        highlights: ["IDP & Cambridge", "7 مستويات", "بيئة أكاديمية"],
      },
    ];
  }

  // ── Kids ───────────────────────────────────────────────
  if (a.goal === "kids") {
    return [
      {
        id: "sheffield", score: 94,
        program: "Kids English Course (7–17 سنة)",
        reason: "شيفيلد لديها برنامج مخصص للأطفال والمراهقين بمناهج حديثة ومعلمين متخصصين في تعليم الأطفال",
        highlights: ["مناهج خاصة بالأطفال", "7–17 سنة", "بيئة آمنة"],
      },
      {
        id: "erican", score: 86,
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

  // ── General English: score by duration + budget ─────────
  const results: ScoreEntry[] = [];

  if (a.duration === "short") {
    if (a.budget === "low") {
      results.push({
        id: "stratford", score: 97,
        program: "General English (1–3 أشهر)",
        reason: "الأرخص بكوالالمبور — يبدأ من 950 RM/شهر. لفترة 1-3 أشهر لا تحتاج تأشيرة طالب، وستراتفورد مثالي لهذه الحالة بالضبط",
        highlights: ["من 950 RM/شهر", "بدون تأشيرة طالب", "تسجيل مرن"],
      });
      results.push({
        id: "sheffield", score: 74,
        program: "General English + Free IELTS",
        reason: "إذا احتجت IELTS لاحقاً، شيفيلد يمنحه مجاناً مع التسجيل — قيمة مضافة لا تجدها في غيره",
        highlights: ["IELTS مجاني", "أسعار تنافسية"],
      });
    } else if (a.budget === "mid") {
      results.push({
        id: "stratford", score: 92,
        program: "General English (1–3 أشهر)",
        reason: "بميزانيتك المتوسطة، ستراتفورد يوفر عليك الكثير لفترة قصيرة دون التنازل عن جودة التعليم",
        highlights: ["من 950 RM/شهر", "تسجيل مرن", "قريب من المركز"],
      });
      results.push({
        id: "sheffield", score: 84,
        program: "General English + Free IELTS",
        reason: "شيفيلد مع عروضه الحصرية هو الأفضل قيمة — IELTS مجاني بونص حقيقي",
        highlights: ["IELTS مجاني", "عروض حصرية"],
      });
      results.push({
        id: "bigben", score: 68,
        program: "IEP Short Intensive",
        reason: "بيغ بان IEP مكثف لمن يريد تقدماً سريعاً ومحسوساً خلال شهر أو شهرين بمنهج Pearson",
        highlights: ["Pearson معتمد", "مكثف وسريع"],
      });
    } else {
      results.push({
        id: "sheffield", score: 89,
        program: "General English Premium + Free IELTS",
        reason: "بميزانيتك المرتفعة، شيفيلد يمنحك أفضل الباقات: IELTS مجاني + عروض VIP + دعم تأشيرة",
        highlights: ["IELTS مجاني", "باقات VIP", "دعم تأشيرة"],
      });
      results.push({
        id: "bigben", score: 84,
        program: "IEP Intensive Program",
        reason: "بيغ بان IEP المكثف بـ Pearson — لو هدفك رفع مستواك بسرعة ملحوظة هو الخيار الأول",
        highlights: ["Pearson معتمد", "نتائج سريعة", "IEP مكثف"],
      });
      results.push({
        id: "erican", score: 73,
        program: "General English (Cambridge)",
        reason: "إيريكان Cambridge — شهادة دولية معترف بها مع برنامج عام شامل",
        highlights: ["Cambridge معتمد", "شهادة دولية"],
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
        id: "bigben", score: 69,
        program: "IEP 4–6 Months",
        reason: "بيغ بان IEP لمدة 4-6 أشهر — Pearson معتمد بتكلفة معقولة مع دعم تأشيرة الطالب",
        highlights: ["Pearson معتمد", "تأشيرة طالب ✓"],
      });
    } else if (a.budget === "mid") {
      results.push({
        id: "sheffield", score: 96,
        program: "Medium-Term Package + Free IELTS",
        reason: "الأفضل قيمة لـ 4-6 أشهر بكوالالمبور — عروض شيفيلد الحصرية + IELTS مجاني + دعم تأشيرة كاملة",
        highlights: ["IELTS مجاني", "أفضل سعر", "تأشيرة طالب ✓"],
      });
      results.push({
        id: "bigben", score: 84,
        program: "IEP Intensive 4–6 Months (Pearson)",
        reason: "بيغ بان IEP المكثف لـ 4-6 أشهر — برنامج Pearson المنظم يضمن تقدماً حقيقياً وقابلاً للقياس",
        highlights: ["Pearson معتمد", "IEP مكثف", "تقدم مضمون"],
      });
      results.push({
        id: "erican", score: 74,
        program: "General English (Cambridge Certified)",
        reason: "إيريكان Cambridge لمن يريد شهادة دولية معترف بها بجانب الدراسة",
        highlights: ["Cambridge معتمد", "شهادة دولية"],
      });
    } else {
      results.push({
        id: "bigben", score: 93,
        program: "IEP Premium (Pearson) 4–6 Months",
        reason: "بميزانيتك المرتفعة، بيغ بان IEP Premium هو الأفضل — أفضل مدرسين Pearson مع برنامج مكثف منظم",
        highlights: ["Pearson معتمد", "IEP Premium", "تأشيرة طالب ✓"],
      });
      results.push({
        id: "erican", score: 85,
        program: "Comprehensive English (Cambridge) 6 Months",
        reason: "إيريكان Cambridge المتكامل — 6 برامج متخصصة مع شهادة دولية معترف بها لدى أصحاب العمل",
        highlights: ["Cambridge & IDP", "6 برامج", "شهادة دولية"],
      });
      results.push({
        id: "sheffield", score: 77,
        program: "Premium Package + Free IELTS",
        reason: "شيفيلد مع الميزانية المرتفعة يتيح لك أفضل الباقات + IELTS مجاني كـ bonus",
        highlights: ["IELTS مجاني", "باقات VIP"],
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

// ─── Answer labels (for summary bar) ──────────────────────
const GOAL_LABELS: Record<Goal, string>     = { general: "إنجليزية عامة", ielts: "IELTS", business: "أعمال", kids: "أطفال/ناشئون" };
const DUR_LABELS:  Record<Duration, string> = { short: "1–3 أشهر", mid: "4–6 أشهر", long: "7+ أشهر" };
const BUD_LABELS:  Record<Budget, string>   = { low: "< 10,000 RM", mid: "10–25,000 RM", high: "> 25,000 RM" };

// ─── Questions ─────────────────────────────────────────────
const STEPS = [
  {
    key: "goal",
    q: "ما هدفك الأساسي من الدراسة؟",
    sub: "اختر ما يصف هدفك بدقة",
    options: [
      { value: "general",  label: "تحسين الإنجليزية العامة",  icon: "🗣️", desc: "بناء مهارات التواصل والطلاقة" },
      { value: "ielts",    label: "التحضير لاختبار IELTS",    icon: "📋", desc: "الحصول على درجة مرتفعة للجامعة أو الهجرة" },
      { value: "business", label: "إنجليزية الأعمال",          icon: "💼", desc: "للبيئات المهنية والشركات" },
      { value: "kids",     label: "برامج الأطفال والناشئين",   icon: "🎒", desc: "من 7 إلى 17 سنة" },
    ],
  },
  {
    key: "duration",
    q: "كم مدة الدراسة المتوقعة؟",
    sub: "ملاحظة: 4 أشهر فأكثر تستلزم تأشيرة طالب",
    options: [
      { value: "short", label: "1 إلى 3 أشهر",  icon: "⚡", desc: "تأشيرة سياحية تكفي — لا تأشيرة طالب" },
      { value: "mid",   label: "4 إلى 6 أشهر",  icon: "📅", desc: "تأشيرة طالب ضرورية — نتولى إجراءاتها" },
      { value: "long",  label: "7 أشهر فأكثر",  icon: "🗓️", desc: "إقامة طلابية كاملة — تأشيرة طالب" },
    ],
  },
  {
    key: "budget",
    q: "ما ميزانيتك التقريبية للدراسة؟",
    sub: "رسوم التسجيل فقط — بدون احتساب السكن والمعيشة",
    options: [
      { value: "low",  label: "أقل من 10,000 RM",    icon: "💰", desc: "≈ أقل من 2,000 €" },
      { value: "mid",  label: "10,000 – 25,000 RM",  icon: "💳", desc: "≈ 2,000 – 5,000 €" },
      { value: "high", label: "أكثر من 25,000 RM",   icon: "💎", desc: "≈ أكثر من 5,000 €" },
    ],
  },
];

// ─── Props ─────────────────────────────────────────────────
interface Props { }

export default function InstituteQuiz(_props: Props = {}) {
  const { go } = useNavigate();
  const [step, setStep]       = useState(0);
  const [answers, setAnswers] = useState<Answers>({});
  const [done, setDone]       = useState(false);

  const currentStep = STEPS[step];

  function pick(value: string) {
    const newAnswers = { ...answers, [currentStep.key]: value } as Answers;
    setAnswers(newAnswers);

    if (currentStep.key === "goal" && value !== "general") {
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
              <h3 className="font-extrabold text-gray-900 text-lg">المعاهد الأنسب لك</h3>
            </div>
            {/* Selections summary */}
            <div className="flex flex-wrap gap-1.5 mt-1">
              {answers.goal     && <span className="bg-green-100 text-green-800 text-xs font-semibold px-2.5 py-0.5 rounded-full">{GOAL_LABELS[answers.goal]}</span>}
              {answers.duration && <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded-full">{DUR_LABELS[answers.duration]}</span>}
              {answers.budget   && <span className="bg-amber-100 text-amber-800 text-xs font-semibold px-2.5 py-0.5 rounded-full">{BUD_LABELS[answers.budget]}</span>}
            </div>
          </div>
          <button onClick={reset} className="flex items-center gap-1.5 text-xs text-gray-400 hover:text-gray-600 border border-gray-200 rounded-lg px-3 py-1.5 transition-all hover:border-gray-300 flex-shrink-0">
            <RotateCcw size={12} /> تغيير
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
                  <div className="w-10 h-10 bg-white rounded-xl border border-white/60 flex items-center justify-center p-1 shadow-sm flex-shrink-0">
                    <img src={meta.logo} alt={meta.name} className="max-w-full max-h-full object-contain" />
                  </div>
                  <div>
                    <div className="font-extrabold text-gray-900 text-sm leading-tight">{meta.nameAr}</div>
                    <div className="text-gray-500 text-xs">{rec.program}</div>
                  </div>
                </div>
                <div className="text-right flex-shrink-0">
                  {i === 0
                    ? <span className="bg-green-500 text-white text-xs font-bold px-2.5 py-1 rounded-full">الأنسب ✓</span>
                    : <span className="bg-gray-100 text-gray-600 text-xs font-semibold px-2.5 py-1 rounded-full">بديل جيد</span>
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
                  <span className={`text-xs font-bold flex-shrink-0 ${i === 0 ? "text-green-600" : "text-blue-600"}`}>توافق {rec.score}%</span>
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
                    عرض الأسعار والبرامج
                    <ChevronLeft size={13} />
                  </button>
                  <a
                    href="https://wa.me/601112200603"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-[#25d366] hover:bg-[#1da851] text-white text-xs font-bold rounded-xl px-4 py-2.5 transition-all text-center flex-shrink-0"
                  >
                    واتساب
                  </a>
                </div>
              </div>
            </div>
          );
        })}

        {recs.length === 0 && (
          <div className="text-center py-8 text-gray-400 text-sm">لم يتم العثور على معهد مناسب — حاول تغيير الإجابات</div>
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
            {step < totalSteps - 1 ? `${totalSteps - step - 1} سؤال متبقي` : "آخر سؤال"}
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

        {step > 0 && (
          <button onClick={() => setStep(step - 1)} className="mt-4 text-xs text-gray-400 hover:text-gray-600 flex items-center gap-1.5 transition-colors">
            <RotateCcw size={12} /> السؤال السابق
          </button>
        )}
      </div>
    </div>
  );
}
