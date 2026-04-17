import { useState } from "react";
import { ArrowLeft, RotateCcw, CheckCircle, ChevronLeft } from "lucide-react";
import { useNavigate } from "../hooks/useNavigate";

type Goal     = "general" | "ielts" | "business" | "kids" | "university";
type Duration = "short" | "mid" | "long";
type Budget   = "low" | "mid" | "high";

interface Answers {
  goal?: Goal;
  duration?: Duration;
  budget?: Budget;
}

type InstId = "stratford" | "bigben" | "erican" | "sheffield";

const INSTITUTES: Record<InstId, {
  nameAr: string; name: string; logo: string; color: string; btnColor: string;
  tagline: string; page: string; from: string;
}> = {
  stratford: {
    nameAr: "معهد ستراتفورد",
    name: "Stratford International",
    logo: "/stratford-logo.png",
    color: "border-teal-300 bg-teal-50",
    btnColor: "bg-teal-600 hover:bg-teal-700",
    tagline: "الأنسب للمبتدئين — برامج مرنة تبدأ من شهر واحد",
    page: "stratford-institute",
    from: "950 RM",
  },
  bigben: {
    nameAr: "مجموعة بيغ بان",
    name: "Big Ben Education",
    logo: "/bigben-logo.png",
    color: "border-rose-300 bg-rose-50",
    btnColor: "bg-[#7a1a2e] hover:bg-[#5a1020]",
    tagline: "معتمد Pearson — IEP مكثف وتحضير IELTS احترافي",
    page: "bigben-institute",
    from: "2,618 RM",
  },
  erican: {
    nameAr: "مركز إيريكان",
    name: "Erican Language Centre",
    logo: "/erican-logo.png",
    color: "border-violet-300 bg-violet-50",
    btnColor: "bg-[#5a2a9a] hover:bg-[#3d1a6e]",
    tagline: "معتمد Cambridge وIDP — 6 برامج متخصصة للجميع",
    page: "erican-institute",
    from: "2,800 RM",
  },
  sheffield: {
    nameAr: "أكاديمية شيفيلد",
    name: "Sheffield Academy",
    logo: "/sheffield-logo.png",
    color: "border-blue-300 bg-blue-50",
    btnColor: "bg-[#1a3272] hover:bg-[#0d1f4e]",
    tagline: "عروض حصرية + IELTS مجاني — أفضل قيمة مقابل السعر",
    page: "sheffield-institute",
    from: "3,400 RM",
  },
};

function recommend(a: Answers): InstId[] {
  if (a.goal === "university")  return [];
  if (a.goal === "kids")        return ["sheffield", "erican"];
  if (a.goal === "ielts")       return ["bigben", "sheffield", "erican"];
  if (a.goal === "business")    return ["erican", "bigben", "sheffield"];

  // general english
  if (a.duration === "short") {
    if (a.budget === "low")  return ["stratford", "sheffield"];
    if (a.budget === "mid")  return ["stratford", "sheffield", "bigben"];
    return ["stratford", "sheffield", "bigben", "erican"];
  }
  if (a.duration === "mid") {
    if (a.budget === "low")  return ["sheffield", "stratford"];
    if (a.budget === "mid")  return ["sheffield", "bigben", "erican"];
    return ["sheffield", "bigben", "erican"];
  }
  // long
  if (a.budget === "low")  return ["sheffield", "bigben"];
  return ["sheffield", "bigben", "erican"];
}

const STEPS = [
  {
    key: "goal",
    q: "ما هو هدفك من الدراسة؟",
    sub: "اختر ما يصف هدفك بدقة",
    options: [
      { value: "general",    label: "تحسين الإنجليزية العامة",   icon: "🗣️",  desc: "بناء مهارات التواصل والطلاقة" },
      { value: "ielts",      label: "التحضير لـ IELTS",           icon: "📋",  desc: "تحقيق درجة مرتفعة في الاختبار" },
      { value: "business",   label: "إنجليزية الأعمال",           icon: "💼",  desc: "للبيئات المهنية والشركات" },
      { value: "kids",       label: "برامج الأطفال والناشئين",    icon: "🎒",  desc: "من 6 إلى 17 سنة" },
      { value: "university", label: "القبول في جامعة ماليزية",   icon: "🎓",  desc: "بكالوريوس أو ماستر أو دكتوراه" },
    ],
  },
  {
    key: "duration",
    q: "كم مدة الدراسة المتوقعة؟",
    sub: "تساعدنا على اختيار الباقة الأنسب",
    options: [
      { value: "short", label: "1 إلى 3 أشهر",   icon: "⚡", desc: "برامج مكثفة قصيرة" },
      { value: "mid",   label: "4 إلى 6 أشهر",   icon: "📅", desc: "برامج متوسطة الأمد" },
      { value: "long",  label: "7 أشهر فأكثر",   icon: "🗓️", desc: "إقامة طلابية كاملة" },
    ],
  },
  {
    key: "budget",
    q: "ما ميزانيتك التقريبية؟",
    sub: "شاملة رسوم الدراسة والتأشيرة",
    options: [
      { value: "low",  label: "أقل من 10,000 RM",          icon: "💰", desc: "≈ أقل من 2,000 €" },
      { value: "mid",  label: "10,000 – 25,000 RM",         icon: "💳", desc: "≈ 2,000 – 5,000 €" },
      { value: "high", label: "أكثر من 25,000 RM",          icon: "💎", desc: "≈ أكثر من 5,000 €" },
    ],
  },
];

export default function InstituteQuiz() {
  const { go } = useNavigate();
  const [step, setStep]       = useState(0);
  const [answers, setAnswers] = useState<Answers>({});
  const [done, setDone]       = useState(false);

  const currentStep = STEPS[step];
  const progress    = ((step) / STEPS.length) * 100;

  function pick(value: string) {
    const newAnswers = { ...answers, [currentStep.key]: value } as Answers;
    setAnswers(newAnswers);

    // University → skip to result immediately
    if (currentStep.key === "goal" && value === "university") {
      setAnswers(newAnswers);
      setDone(true);
      return;
    }
    // IELTS / kids / business → skip duration+budget
    if (currentStep.key === "goal" && (value === "ielts" || value === "kids" || value === "business")) {
      setAnswers(newAnswers);
      setDone(true);
      return;
    }
    // Last step
    if (step === STEPS.length - 1) {
      setDone(true);
      return;
    }
    setStep(step + 1);
  }

  function reset() {
    setStep(0);
    setAnswers({});
    setDone(false);
  }

  const results = recommend(answers);

  // ── Results screen ──
  if (done) {
    if (answers.goal === "university") {
      return (
        <div className="bg-white rounded-3xl border border-gray-200 shadow-sm p-8 text-center">
          <div className="text-5xl mb-4">🎓</div>
          <h3 className="text-xl font-extrabold text-gray-900 mb-2">القبول الجامعي في ماليزيا</h3>
          <p className="text-gray-500 text-sm mb-6 max-w-sm mx-auto">
            لدينا شراكات مع أكثر من 12 جامعة معترف بها — نتولى كل شيء من القبول حتى التأشيرة
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <button
              onClick={() => go("universities")}
              className="bg-gray-900 hover:bg-gray-800 text-white font-bold text-sm rounded-xl px-6 py-3 transition-all"
            >
              استكشف الجامعات
            </button>
            <button
              onClick={() => go("apply", { type: "university" })}
              className="bg-green-600 hover:bg-green-700 text-white font-bold text-sm rounded-xl px-6 py-3 transition-all"
            >
              ابدأ طلب القبول
            </button>
          </div>
          <button onClick={reset} className="mt-5 flex items-center gap-1.5 text-xs text-gray-400 hover:text-gray-600 transition-colors mx-auto">
            <RotateCcw size={12} /> البدء من جديد
          </button>
        </div>
      );
    }

    return (
      <div className="space-y-4">
        <div className="flex items-center justify-between mb-2">
          <div>
            <h3 className="font-extrabold text-gray-900 text-lg">المعاهد المناسبة لك</h3>
            <p className="text-gray-400 text-xs mt-0.5">بناءً على إجاباتك — مرتبة من الأنسب</p>
          </div>
          <button onClick={reset} className="flex items-center gap-1.5 text-xs text-gray-400 hover:text-gray-600 transition-colors border border-gray-200 rounded-lg px-3 py-1.5">
            <RotateCcw size={12} /> تغيير الإجابات
          </button>
        </div>

        {results.map((id, i) => {
          const inst = INSTITUTES[id];
          return (
            <div key={id} className={`rounded-2xl border-2 ${inst.color} p-5 flex flex-col sm:flex-row items-start sm:items-center gap-4`}>
              {i === 0 && (
                <div className="absolute -mt-3 -mr-3 bg-green-500 text-white text-xs font-bold px-2.5 py-0.5 rounded-full hidden sm:block" style={{ position: "static" }}>
                </div>
              )}
              <div className="flex items-center gap-3 flex-1">
                <div className="w-14 h-14 bg-white rounded-xl border border-gray-100 flex items-center justify-center flex-shrink-0 p-1.5 shadow-sm">
                  <img src={inst.logo} alt={inst.name} className="max-w-full max-h-full object-contain" />
                </div>
                <div>
                  {i === 0 && <span className="inline-block bg-green-500 text-white text-xs font-bold px-2 py-0.5 rounded-full mb-1">الأنسب لك</span>}
                  <div className="font-extrabold text-gray-900 text-base">{inst.nameAr}</div>
                  <div className="text-gray-500 text-xs">{inst.tagline}</div>
                  <div className="text-green-700 font-bold text-sm mt-1">تبدأ من {inst.from}</div>
                </div>
              </div>
              <div className="flex gap-2 w-full sm:w-auto flex-shrink-0">
                <button
                  onClick={() => go(inst.page as any)}
                  className={`flex-1 sm:flex-none ${inst.btnColor} text-white text-xs font-bold rounded-xl px-4 py-2.5 transition-all flex items-center gap-1.5 justify-center`}
                >
                  عرض الأسعار
                  <ChevronLeft size={14} />
                </button>
                <a
                  href="https://wa.me/601112200603"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 sm:flex-none bg-[#25d366] hover:bg-[#1da851] text-white text-xs font-bold rounded-xl px-4 py-2.5 transition-all text-center"
                >
                  واتساب
                </a>
              </div>
            </div>
          );
        })}

        {results.length === 0 && (
          <div className="text-center py-8 text-gray-400 text-sm">لم يتم العثور على نتائج مطابقة</div>
        )}
      </div>
    );
  }

  // ── Question screen ──
  return (
    <div className="bg-white rounded-3xl border border-gray-200 shadow-sm overflow-hidden">
      {/* Progress */}
      <div className="h-1.5 bg-gray-100">
        <div
          className="h-full bg-green-500 transition-all duration-500"
          style={{ width: `${progress}%` }}
        />
      </div>

      <div className="p-6 sm:p-8">
        {/* Step indicator */}
        <div className="flex items-center gap-2 mb-5">
          {STEPS.map((s, i) => (
            <div key={i} className="flex items-center gap-2">
              <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                i < step ? "bg-green-500 text-white" :
                i === step ? "bg-green-600 text-white ring-2 ring-green-200" :
                "bg-gray-100 text-gray-400"
              }`}>
                {i < step ? <CheckCircle size={12} /> : i + 1}
              </div>
              {i < STEPS.length - 1 && <div className={`h-0.5 w-6 rounded ${i < step ? "bg-green-400" : "bg-gray-200"}`} />}
            </div>
          ))}
          <span className="text-xs text-gray-400 mr-1">خطوة {step + 1} من {STEPS.length}</span>
        </div>

        <h3 className="text-xl font-extrabold text-gray-900 mb-1">{currentStep.q}</h3>
        <p className="text-gray-400 text-sm mb-6">{currentStep.sub}</p>

        <div className="grid gap-3">
          {currentStep.options.map((opt) => (
            <button
              key={opt.value}
              onClick={() => pick(opt.value)}
              className="flex items-center gap-4 text-right p-4 rounded-2xl border-2 border-gray-100 hover:border-green-400 hover:bg-green-50 transition-all group"
            >
              <span className="text-2xl flex-shrink-0">{opt.icon}</span>
              <div className="flex-1">
                <div className="font-bold text-gray-900 group-hover:text-green-700 transition-colors">{opt.label}</div>
                <div className="text-gray-400 text-xs mt-0.5">{opt.desc}</div>
              </div>
              <ArrowLeft size={16} className="text-gray-300 group-hover:text-green-500 group-hover:-translate-x-1 transition-all flex-shrink-0" />
            </button>
          ))}
        </div>

        {step > 0 && (
          <button
            onClick={() => setStep(step - 1)}
            className="mt-5 text-xs text-gray-400 hover:text-gray-600 flex items-center gap-1 transition-colors"
          >
            <RotateCcw size={12} /> رجوع للسؤال السابق
          </button>
        )}
      </div>
    </div>
  );
}
