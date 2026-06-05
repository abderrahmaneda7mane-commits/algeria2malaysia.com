import { useState } from "react";
import { ArrowRight, ArrowLeft, CheckCircle, BookOpen, Building2, DollarSign, Target, BedDouble, Calendar, GraduationCap } from "lucide-react";
import { INSTITUTES, ACCOMMODATION_OPTIONS, suggestInstitutes, GOOGLE_FORM_LINKS, toEur } from "@/data/institutes";
import type { Goal, RoomType } from "@/data/institutes";
import { useNavigate } from "@/hooks/useNavigate";
import { useSEO } from "@/hooks/useSEO";
import InstituteQuiz from "@/components/shared/InstituteQuiz";
import { useLanguage } from "@/i18n/LanguageContext";
import { translations as T } from "@/i18n/translations";

type Step = "type" | "institute-quiz" | "goal" | "budget" | "suggestion" | "accommodation" | "intake" | "redirect" | "university-redirect";

interface FormState {
  type: "institute" | "university" | null;
  goal: Goal | null;
  budget: number;
  selectedInstitute: string | null;
  room: RoomType | null;
  intake: string | null;
}

const initialState: FormState = {
  type: null,
  goal: null,
  budget: 0,
  selectedInstitute: null,
  room: null,
  intake: null,
};

function StepIndicator({ steps, current }: { steps: string[]; current: number }) {
  return (
    <div className="flex items-center justify-center gap-1 mb-6">
      {steps.map((label, i) => (
        <div key={label} className="flex items-center">
          <div
            className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
              i < current
                ? "bg-green-600 text-white"
                : i === current
                ? "bg-green-700 text-white ring-4 ring-green-200"
                : "bg-gray-100 text-gray-400"
            }`}
          >
            {i < current ? <CheckCircle size={13} /> : i + 1}
          </div>
          {i < steps.length - 1 && (
            <div className={`w-5 sm:w-7 h-0.5 mx-0.5 ${i < current ? "bg-green-500" : "bg-gray-200"}`} />
          )}
        </div>
      ))}
    </div>
  );
}

function Card({
  icon,
  title,
  desc,
  selected,
  onClick,
}: {
  icon: React.ReactNode;
  title: string;
  desc?: string;
  selected: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={`w-full text-right p-4 sm:p-5 rounded-xl sm:rounded-2xl border-2 transition-all hover:shadow-md active:scale-[0.99] ${
        selected ? "border-green-600 bg-green-50" : "border-gray-200 bg-white hover:border-green-300"
      }`}
    >
      <div className="flex items-center gap-3 sm:gap-4">
        <div className={`w-10 h-10 sm:w-12 sm:h-12 rounded-xl flex items-center justify-center flex-shrink-0 ${selected ? "bg-green-600 text-white" : "bg-gray-100 text-gray-600"}`}>
          {icon}
        </div>
        <div className="flex-1 min-w-0">
          <div className="font-bold text-gray-900 text-sm sm:text-base leading-snug">{title}</div>
          {desc && <div className="text-xs sm:text-sm text-gray-500 mt-0.5 leading-snug">{desc}</div>}
        </div>
        {selected && <CheckCircle className="mr-auto text-green-600 flex-shrink-0" size={20} />}
      </div>
    </button>
  );
}

export default function ApplyPage({ initialType }: { initialType?: "institute" | "university" }) {
  useSEO({
    title: "التسجيل والقبول في الجامعات والمعاهد الماليزية — Algeria2Malaysia",
    description: "ابدأ رحلتك الدراسية الآن — فريقنا يراجع ملفك ويختار أفضل جامعة أو معهد خلال 48 ساعة. تسجيل مجاني بدون تعقيد.",
    canonicalPath: "/apply",
    keywords: "تسجيل جامعة ماليزيا، قبول ماليزيا، التقديم للدراسة في ماليزيا",
  });
  const { go } = useNavigate();
  const { t, dir } = useLanguage();
  const [form, setForm] = useState<FormState>({ ...initialState, type: initialType || null });
  const [step, setStep] = useState<Step>(initialType === "university" ? "university-redirect" : "type");

  const institutesSteps = ["الهدف", "الميزانية", "الاختيار", "السكن", "موعد البدء"];
  const currentStepIndex = ["goal", "budget", "suggestion", "accommodation", "intake"].indexOf(step);

  const suggested = form.goal && form.budget > 0 ? suggestInstitutes(form.budget, form.goal) : [];

  function buildWhatsAppMessage() {
    const inst = INSTITUTES.find((i) => i.id === form.selectedInstitute);
    const room = ACCOMMODATION_OPTIONS.find((r) => r.id === form.room);
    const goalLabel = { ielts: "IELTS", general: "إنجليزي عام", pathway: "مسار الجامعة" }[form.goal || "general"];
    return `السلام عليكم! أنا طالب جزائري يريد الدراسة في ماليزيا.
هدفي: ${goalLabel}
ميزانيتي: ${form.budget.toLocaleString()} RM (≈ ${toEur(form.budget).toLocaleString()} €)
المعهد المختار: ${inst?.nameAr || "لم يتم الاختيار"}
نوع السكن: ${room?.label || "لم يتم الاختيار"} (${room?.priceRangeRm || ""} / ${room?.priceRangeEur || ""})
موعد البدء: ${form.intake || "لم يتم الاختيار"}
أرجو التواصل معي لإتمام الإجراءات.`;
  }

  function buildUniversityWhatsApp() {
    return `السلام عليكم! أنا طالب جزائري أريد التقديم للقبول الجامعي في ماليزيا. أرجو مساعدتي في إجراءات التقديم.`;
  }

  // -------------------- STEPS --------------------

  if (step === "type") {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-900 via-green-800 to-green-700 flex items-center justify-center py-10 px-4" dir={dir}>
        <div className="w-full max-w-lg">
          <button onClick={() => go("home")} className="flex items-center gap-2 text-green-200 hover:text-white text-sm mb-6 transition-colors">
            <ArrowRight size={16} /> {t(T.apply.back)}
          </button>

          <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
            <div className="bg-gradient-to-r from-green-600 to-green-500 px-8 py-7 text-center">
              <div className="inline-flex items-center gap-2 bg-white/20 rounded-full px-4 py-1.5 mb-3">
                <span className="text-white text-xs font-medium">Algeria2Malaysia</span>
              </div>
              <h1 className="text-2xl font-bold text-white mb-1">{t(T.apply.title)}</h1>
              <p className="text-green-100 text-sm">{t(T.apply.subtitle)}</p>
            </div>

            <div className="px-4 sm:px-7 py-5 sm:py-7 flex flex-col gap-3 sm:gap-4">
              {/* Institute path */}
              <button
                onClick={() => setStep("institute-quiz")}
                className="w-full text-right p-4 sm:p-5 rounded-xl sm:rounded-2xl border-2 border-gray-100 hover:border-green-400 hover:bg-green-50 active:bg-green-100 transition-all group"
              >
                <div className="flex items-center gap-3 sm:gap-4">
                  <div className="w-11 h-11 sm:w-14 sm:h-14 rounded-xl sm:rounded-2xl bg-green-50 group-hover:bg-green-100 flex items-center justify-center flex-shrink-0 transition-colors">
                    <BookOpen size={22} className="text-green-600" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="font-extrabold text-gray-900 text-sm sm:text-base leading-snug">{t(T.apply.instLabel)}</div>
                    <div className="text-gray-500 text-xs sm:text-sm mt-0.5 leading-snug">{t(T.apply.instSub)}</div>
                    <div className="text-green-600 text-xs font-semibold mt-1">{t(T.apply.instHint)}</div>
                  </div>
                  <ArrowLeft size={16} className="text-gray-300 group-hover:text-green-500 group-hover:-translate-x-1 transition-all flex-shrink-0" />
                </div>
              </button>

              {/* University path */}
              <button
                onClick={() => setStep("university-redirect")}
                className="w-full text-right p-4 sm:p-5 rounded-xl sm:rounded-2xl border-2 border-gray-100 hover:border-blue-400 hover:bg-blue-50 active:bg-blue-100 transition-all group"
              >
                <div className="flex items-center gap-3 sm:gap-4">
                  <div className="w-11 h-11 sm:w-14 sm:h-14 rounded-xl sm:rounded-2xl bg-blue-50 group-hover:bg-blue-100 flex items-center justify-center flex-shrink-0 transition-colors">
                    <GraduationCap size={22} className="text-blue-600" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="font-extrabold text-gray-900 text-sm sm:text-base leading-snug">{t(T.apply.uniLabel)}</div>
                    <div className="text-gray-500 text-xs sm:text-sm mt-0.5 leading-snug">{t(T.apply.uniSub)}</div>
                    <div className="text-blue-600 text-xs font-semibold mt-1">{t(T.apply.uniHint)}</div>
                  </div>
                  <ArrowLeft size={16} className="text-gray-300 group-hover:text-blue-500 group-hover:-translate-x-1 transition-all flex-shrink-0" />
                </div>
              </button>

              <p className="text-center text-xs text-gray-400 pt-1">
                {t(T.apply.free)}
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (step === "institute-quiz") {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-900 via-green-800 to-green-700 py-10 px-4" dir="rtl">
        <div className="w-full max-w-lg mx-auto">
          <button onClick={() => setStep("type")} className="flex items-center gap-2 text-green-200 hover:text-white text-sm mb-6 transition-colors">
            <ArrowRight size={16} /> رجوع
          </button>
          <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
            <div className="bg-gradient-to-r from-green-600 to-green-500 px-8 py-6 text-center">
              <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-3">
                <BookOpen size={24} className="text-white" />
              </div>
              <h1 className="text-xl font-bold text-white mb-1">معهد اللغة الإنجليزية</h1>
              <p className="text-green-100 text-sm">أجب على 3 أسئلة — نجد لك المعهد الأنسب</p>
            </div>
            <div className="px-5 py-6">
              <InstituteQuiz />
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (step === "university-redirect") {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-900 via-green-800 to-green-700 flex items-center justify-center py-10 px-4" dir="rtl">
        <div className="w-full max-w-lg">
          <button
            onClick={() => setStep("type")}
            className="flex items-center gap-2 text-green-200 hover:text-white text-sm mb-6 transition-colors"
          >
            <ArrowRight size={16} /> رجوع
          </button>

          <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
            {/* Top banner */}
            <div className="bg-gradient-to-r from-green-600 to-green-500 px-8 py-6 text-center">
              <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-3">
                <GraduationCap size={32} className="text-white" />
              </div>
              <h1 className="text-2xl font-bold text-white mb-1">القبول الجامعي في ماليزيا</h1>
              <p className="text-green-100 text-sm">نحن نتكفل بإيجاد أفضل جامعة تناسبك</p>
            </div>

            <div className="px-8 py-7">
              {/* How it works */}
              <p className="text-gray-700 text-sm font-semibold mb-4 text-center">كيف يعمل ذلك؟</p>
              <div className="space-y-3 mb-7">
                {[
                  { num: "١", text: "تملأ النموذج بمعلوماتك وميزانيتك والتخصص الذي تريده" },
                  { num: "٢", text: "يراجع فريقنا طلبك ويختار أفضل جامعة تناسب وضعك" },
                  { num: "٣", text: "نتواصل معك خلال 24 ساعة بعرض مخصص لك" },
                ].map((step) => (
                  <div key={step.num} className="flex items-start gap-3">
                    <div className="w-7 h-7 bg-green-600 text-white rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0 mt-0.5">
                      {step.num}
                    </div>
                    <p className="text-gray-700 text-sm leading-relaxed">{step.text}</p>
                  </div>
                ))}
              </div>

              {/* Info box */}
              <div className="bg-green-50 border border-green-200 rounded-2xl p-4 mb-6">
                <p className="text-green-800 text-sm font-medium text-center">
                  🎓 أكثر من 2,000 تخصص في 12 جامعة ماليزية معتمدة
                </p>
              </div>

              {/* CTA */}
              <a
                href={GOOGLE_FORM_LINKS.university}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setTimeout(() => go("thank-you"), 500)}
                className="flex items-center justify-center gap-3 w-full bg-green-700 hover:bg-green-800 text-white py-4 rounded-2xl font-bold text-lg transition-colors shadow-lg mb-3"
              >
                <span>📋</span>
                <span>ابدأ بملء النموذج الآن</span>
              </a>
              <p className="text-center text-xs text-gray-400 mb-4">يستغرق النموذج دقيقتين فقط</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (step === "goal") {
    return (
      <div className="min-h-screen bg-[#f8fafc] flex items-center justify-center py-20 px-4" dir="rtl">
        <div className="w-full max-w-lg bg-white rounded-2xl sm:rounded-3xl shadow-xl p-5 sm:p-8">
          <button onClick={() => setStep("type")} className="flex items-center gap-2 text-green-700 text-sm mb-6 hover:underline">
            <ArrowRight size={16} /> رجوع
          </button>
          <StepIndicator steps={institutesSteps} current={0} />
          <h1 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2 text-center">ما هو هدفك من الدراسة؟</h1>
          <p className="text-gray-500 text-sm text-center mb-8">اختر الهدف الذي يناسبك</p>
          <div className="flex flex-col gap-4">
            <Card
              icon={<Target size={22} />}
              title="IELTS"
              desc="الحصول على شهادة IELTS للدراسة أو الهجرة"
              selected={form.goal === "ielts"}
              onClick={() => setForm({ ...form, goal: "ielts" })}
            />
            <Card
              icon={<BookOpen size={22} />}
              title="إنجليزي عام"
              desc="تحسين مستوى اللغة الإنجليزية بشكل عام"
              selected={form.goal === "general"}
              onClick={() => setForm({ ...form, goal: "general" })}
            />
            <Card
              icon={<Building2 size={22} />}
              title="مسار الجامعة"
              desc="تحضير لدخول الجامعة الماليزية"
              selected={form.goal === "pathway"}
              onClick={() => setForm({ ...form, goal: "pathway" })}
            />
          </div>
          <button
            disabled={!form.goal}
            onClick={() => setStep("budget")}
            className="w-full mt-6 bg-green-700 text-white py-3.5 sm:py-4 rounded-xl sm:rounded-full font-bold text-sm sm:text-base disabled:opacity-40 disabled:cursor-not-allowed hover:bg-green-800 transition-colors flex items-center justify-center gap-2"
          >
            <span>التالي</span>
            <ArrowLeft size={18} />
          </button>
        </div>
      </div>
    );
  }

  if (step === "budget") {
    const budgetOptions = [
      { value: 3000, label: "أقل من 3,000 RM", labelEur: "≈ أقل من 600 €" },
      { value: 6000, label: "3,000 – 6,000 RM", labelEur: "≈ 600 – 1,200 €" },
      { value: 10000, label: "6,000 – 10,000 RM", labelEur: "≈ 1,200 – 2,000 €" },
      { value: 15000, label: "10,000 – 15,000 RM", labelEur: "≈ 2,000 – 3,000 €" },
      { value: 25000, label: "أكثر من 15,000 RM", labelEur: "≈ أكثر من 3,000 €" },
    ];
    return (
      <div className="min-h-screen bg-[#f8fafc] flex items-center justify-center py-20 px-4" dir="rtl">
        <div className="w-full max-w-lg bg-white rounded-2xl sm:rounded-3xl shadow-xl p-5 sm:p-8">
          <button onClick={() => setStep("goal")} className="flex items-center gap-2 text-green-700 text-sm mb-6 hover:underline">
            <ArrowRight size={16} /> رجوع
          </button>
          <StepIndicator steps={institutesSteps} current={1} />
          <h1 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2 text-center">ما هي ميزانيتك للدراسة؟</h1>
          <p className="text-gray-500 text-sm text-center mb-8">بدون احتساب السكن والمعيشة</p>
          <div className="flex flex-col gap-3">
            {budgetOptions.map((opt) => (
              <Card
                key={opt.value}
                icon={<DollarSign size={20} />}
                title={opt.label}
                desc={opt.labelEur}
                selected={form.budget === opt.value}
                onClick={() => setForm({ ...form, budget: opt.value })}
              />
            ))}
          </div>
          <button
            disabled={!form.budget}
            onClick={() => setStep("suggestion")}
            className="w-full mt-6 bg-green-700 text-white py-3.5 sm:py-4 rounded-xl sm:rounded-full font-bold text-sm sm:text-base disabled:opacity-40 disabled:cursor-not-allowed hover:bg-green-800 transition-colors flex items-center justify-center gap-2"
          >
            <span>عرض التوصيات</span>
            <ArrowLeft size={18} />
          </button>
        </div>
      </div>
    );
  }

  if (step === "suggestion") {
    return (
      <div className="min-h-screen bg-[#f8fafc] flex items-center justify-center py-20 px-4" dir="rtl">
        <div className="w-full max-w-lg bg-white rounded-2xl sm:rounded-3xl shadow-xl p-5 sm:p-8">
          <button onClick={() => setStep("budget")} className="flex items-center gap-2 text-green-700 text-sm mb-6 hover:underline">
            <ArrowRight size={16} /> رجوع
          </button>
          <StepIndicator steps={institutesSteps} current={2} />
          <h1 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2 text-center">المعاهد المناسبة لك</h1>
          <p className="text-gray-500 text-sm text-center mb-8">
            بناءً على ميزانيتك وهدفك — اختر المعهد الذي يناسبك
          </p>
          {suggested.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              <p>لا توجد معاهد تناسب ميزانيتك الحالية.</p>
              <button onClick={() => setStep("budget")} className="mt-4 text-green-700 underline text-sm">
                تغيير الميزانية
              </button>
            </div>
          ) : (
            <div className="flex flex-col gap-4">
              {suggested.map((inst) => (
                <button
                  key={inst.id}
                  onClick={() => setForm({ ...form, selectedInstitute: inst.id })}
                  className={`w-full text-right p-5 rounded-2xl border-2 transition-all ${
                    form.selectedInstitute === inst.id ? "border-green-600 bg-green-50" : "border-gray-200 hover:border-green-300"
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="font-bold text-gray-900">{inst.nameAr}</div>
                    {form.selectedInstitute === inst.id && <CheckCircle className="text-green-600" size={20} />}
                  </div>
                  <div className="text-gray-500 text-xs mb-2">{inst.name}</div>
                  <p className="text-sm text-gray-600 leading-relaxed mb-3">{inst.description}</p>
                  <div className="text-green-700 font-bold text-sm">
                    تبدأ من {inst.programs[0]?.specialOffer?.toLocaleString() ?? inst.programs[0]?.price.toLocaleString()} RM
                    <span className="text-green-500 font-normal text-xs mr-2">
                      (≈ {toEur(inst.programs[0]?.specialOffer ?? inst.programs[0]?.price ?? 0).toLocaleString()} €)
                    </span>
                  </div>
                </button>
              ))}
            </div>
          )}
          <button
            disabled={!form.selectedInstitute}
            onClick={() => setStep("accommodation")}
            className="w-full mt-6 bg-green-700 text-white py-3.5 sm:py-4 rounded-xl sm:rounded-full font-bold text-sm sm:text-base disabled:opacity-40 disabled:cursor-not-allowed hover:bg-green-800 transition-colors flex items-center justify-center gap-2"
          >
            <span>التالي</span>
            <ArrowLeft size={18} />
          </button>
        </div>
      </div>
    );
  }

  if (step === "accommodation") {
    return (
      <div className="min-h-screen bg-[#f8fafc] flex items-center justify-center py-20 px-4" dir="rtl">
        <div className="w-full max-w-lg bg-white rounded-2xl sm:rounded-3xl shadow-xl p-5 sm:p-8">
          <button onClick={() => setStep("suggestion")} className="flex items-center gap-2 text-green-700 text-sm mb-6 hover:underline">
            <ArrowRight size={16} /> رجوع
          </button>
          <StepIndicator steps={institutesSteps} current={3} />
          <h1 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2 text-center">اختر نوع السكن</h1>
          <p className="text-gray-500 text-sm text-center mb-2">أسعار السكن في كوالالمبور (شهرياً)</p>
          <p className="text-xs text-gray-400 text-center mb-8">هذه أسعار تقديرية — الأسعار الفعلية تتفاوت حسب الموقع</p>
          <div className="flex flex-col gap-4">
            {ACCOMMODATION_OPTIONS.map((room) => (
              <Card
                key={room.id}
                icon={<BedDouble size={20} />}
                title={`${room.label} — ${room.priceRangeRm}  (${room.priceRangeEur})`}
                desc={room.description}
                selected={form.room === room.id}
                onClick={() => setForm({ ...form, room: room.id })}
              />
            ))}
          </div>
          <button
            disabled={!form.room}
            onClick={() => setStep("intake")}
            className="w-full mt-6 bg-green-700 text-white py-3.5 sm:py-4 rounded-xl sm:rounded-full font-bold text-sm sm:text-base disabled:opacity-40 disabled:cursor-not-allowed hover:bg-green-800 transition-colors flex items-center justify-center gap-2"
          >
            <span>التالي</span>
            <ArrowLeft size={18} />
          </button>
        </div>
      </div>
    );
  }

  if (step === "intake") {
    const intakes = [
      "يناير", "فبراير", "مارس", "أبريل", "مايو", "يونيو",
      "يوليو", "أغسطس", "سبتمبر", "أكتوبر", "نوفمبر", "ديسمبر",
    ];
    return (
      <div className="min-h-screen bg-[#f8fafc] flex items-center justify-center py-20 px-4" dir="rtl">
        <div className="w-full max-w-lg bg-white rounded-2xl sm:rounded-3xl shadow-xl p-5 sm:p-8">
          <button onClick={() => setStep("accommodation")} className="flex items-center gap-2 text-green-700 text-sm mb-6 hover:underline">
            <ArrowRight size={16} /> رجوع
          </button>
          <StepIndicator steps={institutesSteps} current={4} />
          <h1 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2 text-center">موعد البدء المفضل</h1>
          <p className="text-gray-500 text-sm text-center mb-8">متى تريد أن تبدأ دراستك؟</p>
          <div className="grid grid-cols-3 gap-3">
            {intakes.map((month) => (
              <button
                key={month}
                onClick={() => setForm({ ...form, intake: month })}
                className={`py-3 px-2 rounded-xl border-2 text-sm font-medium transition-all ${
                  form.intake === month ? "border-green-600 bg-green-50 text-green-700" : "border-gray-200 text-gray-700 hover:border-green-300"
                }`}
              >
                <Calendar size={14} className="mx-auto mb-1" />
                {month}
              </button>
            ))}
          </div>
          <button
            disabled={!form.intake}
            onClick={() => setStep("redirect")}
            className="w-full mt-6 bg-green-700 text-white py-3.5 sm:py-4 rounded-xl sm:rounded-full font-bold text-sm sm:text-base disabled:opacity-40 disabled:cursor-not-allowed hover:bg-green-800 transition-colors flex items-center justify-center gap-2"
          >
            <span>متابعة التقديم</span>
            <ArrowLeft size={18} />
          </button>
        </div>
      </div>
    );
  }

  if (step === "redirect") {
    const selectedInst = INSTITUTES.find((i) => i.id === form.selectedInstitute);
    const room = ACCOMMODATION_OPTIONS.find((r) => r.id === form.room);
    const goalLabel = { ielts: "IELTS", general: "إنجليزي عام", pathway: "مسار الجامعة" }[form.goal || "general"];

    return (
      <div className="min-h-screen bg-[#f8fafc] flex items-center justify-center py-20 px-4" dir="rtl">
        <div className="w-full max-w-lg bg-white rounded-2xl sm:rounded-3xl shadow-xl p-5 sm:p-8">
          <div className="text-center mb-6">
            <CheckCircle className="text-green-600 mx-auto mb-3" size={48} />
            <h1 className="text-2xl font-bold text-gray-900 mb-2">ممتاز! ملخص طلبك</h1>
            <p className="text-gray-500 text-sm">راجع معلوماتك قبل التقديم</p>
          </div>

          <div className="bg-green-50 rounded-2xl p-5 mb-6 space-y-3">
            {[
              { label: "الهدف", value: goalLabel },
              { label: "الميزانية", value: `${form.budget.toLocaleString()} RM (≈ ${toEur(form.budget).toLocaleString()} €)` },
              { label: "المعهد المختار", value: selectedInst?.nameAr },
              { label: "نوع السكن", value: `${room?.label} (${room?.priceRangeRm} / ${room?.priceRangeEur})` },
              { label: "موعد البدء", value: form.intake },
            ].map(({ label, value }) => (
              <div key={label} className="flex justify-between text-sm">
                <span className="text-gray-500">{label}:</span>
                <span className="font-semibold text-gray-900">{value}</span>
              </div>
            ))}
          </div>

          <p className="text-gray-600 text-sm text-center mb-5 leading-relaxed">
            الخطوة الأخيرة: أرسل جواز سفرك عبر نموذج Google أو تواصل معنا مباشرة عبر واتساب.
          </p>

          <a
            href={GOOGLE_FORM_LINKS.institute}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setTimeout(() => go("thank-you"), 500)}
            className="block w-full bg-green-700 text-white py-3.5 sm:py-4 rounded-xl sm:rounded-full font-bold text-sm sm:text-base hover:bg-green-800 transition-colors text-center mb-3"
          >
            📋 ملء نموذج التقديم
          </a>

          <a
            href={`https://wa.me/601112200603?text=${encodeURIComponent(buildWhatsAppMessage())}`}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setTimeout(() => go("thank-you"), 500)}
            className="block w-full bg-green-500 text-white py-3.5 sm:py-4 rounded-xl sm:rounded-full font-bold text-sm sm:text-base hover:bg-green-600 transition-colors text-center flex items-center justify-center gap-2"
          >
            <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current flex-shrink-0">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
            </svg>
            <span>تواصل عبر واتساب</span>
          </a>
        </div>
      </div>
    );
  }

  return null;
}
