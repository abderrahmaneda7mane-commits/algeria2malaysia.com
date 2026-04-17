import { useEffect, useState } from "react";
import emailjs from "@emailjs/browser";
import { navigate } from "../hooks/useNavigate";
import { ArrowRight, ArrowLeft, Clock, CheckCircle, Calendar, Send, User, BookOpen, Star } from "lucide-react";

const EMAILJS_PUBLIC_KEY  = import.meta.env.VITE_EMAILJS_PUBLIC_KEY  as string;
const EMAILJS_SERVICE_ID  = import.meta.env.VITE_EMAILJS_SERVICE_ID  as string;
const EMAILJS_TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID as string;

const ZCAL_URL = "https://zcal.co/i/DNzrLfY_";

interface FormData {
  fullName: string;
  email: string;
  phone: string;
  studyField: string;
  specialty: string;
  currentLevel: string;
  lastDegree: string;
  bacGrade: string;
  budget: string;
  englishLevel: string;
  ielts: string;
  whyMalaysia: string;
  priority: string;
}

const EMPTY: FormData = {
  fullName: "", email: "", phone: "",
  studyField: "", specialty: "", currentLevel: "", lastDegree: "", bacGrade: "",
  budget: "", englishLevel: "", ielts: "", whyMalaysia: "", priority: "",
};

const steps = [
  { label: "معلومات شخصية", icon: User },
  { label: "المسار الأكاديمي", icon: BookOpen },
  { label: "تفاصيل إضافية", icon: Star },
];

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="space-y-1.5">
      <label className="block text-sm font-semibold text-gray-700">{label}</label>
      {children}
    </div>
  );
}

function Input(props: React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      {...props}
      className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-transparent transition-all bg-gray-50 focus:bg-white"
    />
  );
}

function Select({ children, ...props }: React.SelectHTMLAttributes<HTMLSelectElement>) {
  return (
    <select
      {...props}
      className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-transparent transition-all bg-gray-50 focus:bg-white appearance-none"
    >
      {children}
    </select>
  );
}

function buildHtmlMessage(form: FormData): string {
  const row = (label: string, value: string) => `
    <tr>
      <td style="padding:10px 16px;background:#f8fdf9;font-weight:700;color:#1a5c35;width:40%;border-bottom:1px solid #e2f0e8;font-family:Arial,sans-serif;font-size:14px;">${label}</td>
      <td style="padding:10px 16px;color:#333;border-bottom:1px solid #e2f0e8;font-family:Arial,sans-serif;font-size:14px;">${value || "—"}</td>
    </tr>`;

  return `
<!DOCTYPE html>
<html dir="rtl" lang="ar">
<head><meta charset="UTF-8"></head>
<body style="margin:0;padding:0;background:#f0f4f0;font-family:Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f0f4f0;padding:32px 0;">
    <tr><td align="center">
      <table width="600" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:16px;overflow:hidden;box-shadow:0 4px 24px rgba(0,0,0,0.08);max-width:600px;">

        <!-- Header -->
        <tr>
          <td style="background:linear-gradient(135deg,#1a7a45,#25a05a);padding:32px 24px;text-align:center;">
            <p style="margin:0 0 4px 0;color:rgba(255,255,255,0.8);font-size:13px;letter-spacing:1px;">ALGERIA 2 MALAYSIA</p>
            <h1 style="margin:0;color:#ffffff;font-size:24px;font-weight:800;">طلب استشارة مجانية جديد 🎓</h1>
            <p style="margin:12px 0 0 0;color:rgba(255,255,255,0.85);font-size:14px;">وصل طلب جديد من خلال الموقع — يرجى التواصل في أقرب وقت</p>
          </td>
        </tr>

        <!-- Section: Personal -->
        <tr><td style="padding:24px 24px 0;">
          <p style="margin:0 0 8px 0;font-size:13px;font-weight:800;color:#1a7a45;text-transform:uppercase;letter-spacing:1px;">👤 المعلومات الشخصية</p>
        </td></tr>
        <tr><td style="padding:0 24px;">
          <table width="100%" cellpadding="0" cellspacing="0" style="border-radius:10px;overflow:hidden;border:1px solid #e2f0e8;">
            ${row("الاسم الكامل", form.fullName)}
            ${row("البريد الإلكتروني", form.email)}
            ${row("رقم الهاتف (واتساب)", form.phone)}
          </table>
        </td></tr>

        <!-- Section: Academic -->
        <tr><td style="padding:24px 24px 0;">
          <p style="margin:0 0 8px 0;font-size:13px;font-weight:800;color:#1a7a45;text-transform:uppercase;letter-spacing:1px;">📚 المسار الأكاديمي</p>
        </td></tr>
        <tr><td style="padding:0 24px;">
          <table width="100%" cellpadding="0" cellspacing="0" style="border-radius:10px;overflow:hidden;border:1px solid #e2f0e8;">
            ${row("مجال الدراسة", form.studyField)}
            ${row("التخصص", form.specialty)}
            ${row("المستوى الدراسي الحالي", form.currentLevel)}
            ${row("آخر شهادة", form.lastDegree)}
            ${row("معدل الباكالوريا", form.bacGrade)}
          </table>
        </td></tr>

        <!-- Section: Extra -->
        <tr><td style="padding:24px 24px 0;">
          <p style="margin:0 0 8px 0;font-size:13px;font-weight:800;color:#1a7a45;text-transform:uppercase;letter-spacing:1px;">⭐ تفاصيل إضافية</p>
        </td></tr>
        <tr><td style="padding:0 24px;">
          <table width="100%" cellpadding="0" cellspacing="0" style="border-radius:10px;overflow:hidden;border:1px solid #e2f0e8;">
            ${row("الميزانية السنوية", form.budget)}
            ${row("مستوى الإنجليزية", form.englishLevel)}
            ${row("شهادة IELTS", form.ielts)}
            ${row("الأولوية", form.priority)}
          </table>
        </td></tr>

        <!-- Why Malaysia -->
        <tr><td style="padding:24px 24px 0;">
          <p style="margin:0 0 8px 0;font-size:13px;font-weight:800;color:#1a7a45;text-transform:uppercase;letter-spacing:1px;">💬 لماذا ماليزيا؟</p>
        </td></tr>
        <tr><td style="padding:0 24px;">
          <div style="background:#f8fdf9;border:1px solid #e2f0e8;border-radius:10px;padding:14px 16px;color:#444;font-size:14px;line-height:1.7;font-family:Arial,sans-serif;">
            ${form.whyMalaysia || "لم يُذكر"}
          </div>
        </td></tr>

        <!-- CTA -->
        <tr><td style="padding:28px 24px;text-align:center;">
          <a href="https://wa.me/601112200603" style="display:inline-block;background:linear-gradient(135deg,#1a7a45,#25a05a);color:#ffffff;font-size:15px;font-weight:800;padding:14px 36px;border-radius:12px;text-decoration:none;box-shadow:0 4px 14px rgba(26,122,69,0.35);">
            تواصل عبر واتساب 💬
          </a>
        </td></tr>

        <!-- Footer -->
        <tr>
          <td style="background:#f8fdf9;border-top:1px solid #e2f0e8;padding:16px 24px;text-align:center;">
            <p style="margin:0;color:#aaa;font-size:12px;font-family:Arial,sans-serif;">
              Algeria2Malaysia — الجزائر إلى ماليزيا<br>
              هذا البريد أُرسل تلقائياً من نموذج الاستشارة على الموقع
            </p>
          </td>
        </tr>

      </table>
    </td></tr>
  </table>
</body>
</html>`;
}

const SUBMITTED_KEY = "a2m_consultation_submitted";

export default function ConsultationPage() {
  const [showBooking, setShowBooking] = useState(false);
  const [submitted, setSubmitted] = useState(() => localStorage.getItem(SUBMITTED_KEY) === "1");
  const [step, setStep] = useState(0);
  const [form, setForm] = useState<FormData>(EMPTY);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const set = (field: keyof FormData) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) =>
    setForm(f => ({ ...f, [field]: e.target.value }));

  function validateStep() {
    if (step === 0) {
      if (!form.fullName.trim()) return "الرجاء إدخال الاسم الكامل";
      if (!form.email.trim() || !/\S+@\S+\.\S+/.test(form.email)) return "الرجاء إدخال بريد إلكتروني صحيح";
      if (!form.phone.trim()) return "الرجاء إدخال رقم الهاتف";
    }
    if (step === 1) {
      if (!form.studyField.trim()) return "الرجاء تحديد مجال الدراسة";
      if (!form.currentLevel) return "الرجاء تحديد مستواك الدراسي الحالي";
      if (!form.lastDegree) return "الرجاء تحديد آخر شهادة حصلت عليها";
    }
    return "";
  }

  function next() {
    const err = validateStep();
    if (err) { setError(err); return; }
    setError("");
    setStep(s => s + 1);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  async function submit() {
    setLoading(true);
    setError("");
    try {
      await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        {
          to_email:      "algeria2malaysia@gmail.com",
          reply_to:      form.email,
          full_name:     form.fullName,
          subject:       `طلب استشارة جديد — ${form.fullName}`,
          message:       buildHtmlMessage(form),
        },
        { publicKey: EMAILJS_PUBLIC_KEY }
      );
      localStorage.setItem(SUBMITTED_KEY, "1");
      setSubmitted(true);
      setShowBooking(true);
    } catch (err: unknown) {
      console.error("EmailJS error:", err);
      setError("حدث خطأ أثناء إرسال البيانات. يرجى المحاولة مرة أخرى.");
    } finally {
      setLoading(false);
    }
  }

  if (submitted && !showBooking) {
    return (
      <div
        className="min-h-screen flex items-center justify-center px-4"
        style={{ background: "linear-gradient(160deg, #f0faf4 0%, #ffffff 50%, #f5f9ff 100%)" }}
        dir="rtl"
      >
        <div className="max-w-md w-full text-center">
          <div className="bg-white rounded-2xl shadow-sm border border-green-100 p-8 md:p-10">
            <div className="flex justify-center mb-5">
              <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center">
                <CheckCircle size={40} className="text-green-600" />
              </div>
            </div>
            <h2 className="text-xl font-extrabold text-gray-800 mb-3">تم استلام طلبك! 🎉</h2>
            <p className="text-gray-600 text-sm leading-relaxed mb-6">
              تم إرسال تفاصيلك للفريق.<br />
              سيتم التواصل معك قريباً عبر الواتساب لتأكيد استشارتك.
            </p>
            <a
              href="https://wa.me/601112200603"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white font-bold text-sm rounded-xl px-6 py-3 transition-all shadow-sm mb-4"
            >
              تواصل معنا مباشرة عبر واتساب
            </a>
            <div>
              <button
                onClick={() => navigate("home")}
                className="text-gray-400 hover:text-green-700 text-sm transition-colors"
              >
                العودة للرئيسية
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      {/* ── Booking overlay ── */}
      {showBooking && (
        <div className="fixed inset-0 z-[9999] flex flex-col bg-white" dir="rtl">
          <div className="flex items-center gap-3 bg-white border-b border-gray-200 px-4 py-3 shadow-sm flex-shrink-0">
            <button
              onClick={() => setShowBooking(false)}
              className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white font-bold text-sm rounded-xl px-5 py-2.5 transition-all shadow-sm"
            >
              <ArrowRight size={16} />
              رجوع
            </button>
            <div className="flex items-center gap-2 text-gray-600 text-sm font-medium">
              <Calendar size={15} className="text-green-600" />
              احجز موعدك — 30 دقيقة مجانية
            </div>
          </div>
          <iframe src={ZCAL_URL} title="حجز استشارة مجانية" className="flex-1 w-full border-none" />
        </div>
      )}

      {/* ── Main page ── */}
      <div
        className="min-h-screen"
        style={{ background: "linear-gradient(160deg, #f0faf4 0%, #ffffff 50%, #f5f9ff 100%)" }}
        dir="rtl"
      >
        {/* Header */}
        <div className="pt-24 pb-8 px-4 border-b border-green-100">
          <div className="max-w-2xl mx-auto text-center">
            <button
              onClick={() => navigate("home")}
              className="inline-flex items-center gap-2 text-gray-400 hover:text-green-700 text-sm mb-6 transition-colors"
            >
              <ArrowRight size={15} />
              العودة للرئيسية
            </button>
            <div className="flex justify-center mb-4">
              <div className="w-14 h-14 rounded-2xl bg-green-100 flex items-center justify-center shadow-sm">
                <Calendar size={26} className="text-green-700" />
              </div>
            </div>
            <div className="inline-flex items-center gap-2 bg-green-100 text-green-700 rounded-full px-4 py-1.5 text-sm font-semibold mb-3">
              <Clock size={13} />
              مجانية — 30 دقيقة
            </div>
            <h1 className="text-2xl md:text-3xl font-extrabold text-gray-800 mb-2">احجز استشارتك المجانية</h1>
            <p className="text-gray-500 text-sm max-w-md mx-auto">أجب على بعض الأسئلة حتى نتمكن من تقديم أفضل استشارة لك</p>
          </div>
        </div>

        {/* Form */}
        <div className="max-w-2xl mx-auto px-4 py-8">

          {/* Step indicators */}
          <div className="flex items-center justify-center gap-2 mb-8">
            {steps.map((s, i) => {
              const Icon = s.icon;
              return (
                <div key={i} className="flex items-center gap-2">
                  <div className={`flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-semibold transition-all ${
                    i === step ? "bg-green-600 text-white shadow-md" :
                    i < step  ? "bg-green-100 text-green-700" :
                                "bg-gray-100 text-gray-400"
                  }`}>
                    {i < step ? <CheckCircle size={13} /> : <Icon size={13} />}
                    <span className="hidden sm:inline">{s.label}</span>
                    <span className="sm:hidden">{i + 1}</span>
                  </div>
                  {i < steps.length - 1 && (
                    <div className={`w-8 h-0.5 ${i < step ? "bg-green-400" : "bg-gray-200"}`} />
                  )}
                </div>
              );
            })}
          </div>

          {/* Card */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-8">
            <h2 className="text-base font-bold text-gray-800 mb-6 pb-3 border-b border-gray-100">
              {steps[step].label}
            </h2>

            {/* ── Step 0: Personal info ── */}
            {step === 0 && (
              <div className="space-y-4">
                <Field label="الاسم الكامل *">
                  <Input value={form.fullName} onChange={set("fullName")} placeholder="مثال: أحمد بن علي" />
                </Field>
                <Field label="البريد الإلكتروني *">
                  <Input type="email" value={form.email} onChange={set("email")} placeholder="example@gmail.com" dir="ltr" />
                </Field>
                <Field label="رقم الهاتف (واتساب) *">
                  <Input type="tel" value={form.phone} onChange={set("phone")} placeholder="+213 xxx xxx xxx" dir="ltr" />
                </Field>
              </div>
            )}

            {/* ── Step 1: Academic info ── */}
            {step === 1 && (
              <div className="space-y-4">
                <Field label="ماذا تريد أن تدرس؟ *">
                  <Input value={form.studyField} onChange={set("studyField")} placeholder="مثال: هندسة حاسوب، طب، إدارة أعمال..." />
                </Field>
                <Field label="هل لديك تخصص معين في بالك؟">
                  <Input value={form.specialty} onChange={set("specialty")} placeholder="اختياري — مثال: ذكاء اصطناعي، تمويل..." />
                </Field>
                <Field label="ما هو مستواك الدراسي الحالي؟ *">
                  <Select value={form.currentLevel} onChange={set("currentLevel")}>
                    <option value="">اختر مستواك...</option>
                    <option>طالب ثانوي</option>
                    <option>طالب بكالوريوس (سنة 1)</option>
                    <option>طالب بكالوريوس (سنة 2)</option>
                    <option>طالب بكالوريوس (سنة 3)</option>
                    <option>طالب بكالوريوس (سنة 4)</option>
                    <option>خريج ليسانس</option>
                    <option>طالب ماستر</option>
                    <option>خريج ماستر</option>
                    <option>أخرى</option>
                  </Select>
                </Field>
                <Field label="ما هي آخر شهادة حصلت عليها؟ *">
                  <Select value={form.lastDegree} onChange={set("lastDegree")}>
                    <option value="">اختر الشهادة...</option>
                    <option>بكالوريا (ثانوية)</option>
                    <option>ليسانس (L.M.D)</option>
                    <option>ماستر</option>
                    <option>دبلوم مهني</option>
                    <option>دكتوراه</option>
                    <option>أخرى</option>
                  </Select>
                </Field>
                <Field label="معدل الباكالوريا">
                  <Input value={form.bacGrade} onChange={set("bacGrade")} placeholder="مثال: 14.50 / 20" />
                </Field>
              </div>
            )}

            {/* ── Step 2: Extra details ── */}
            {step === 2 && (
              <div className="space-y-4">
                <Field label="ما هي ميزانيتك السنوية المتوقعة؟">
                  <Select value={form.budget} onChange={set("budget")}>
                    <option value="">اختر الميزانية...</option>
                    <option>أقل من 15,000 RM</option>
                    <option>15,000 – 25,000 RM</option>
                    <option>25,000 – 40,000 RM</option>
                    <option>أكثر من 40,000 RM</option>
                    <option>لا أعرف بعد</option>
                  </Select>
                </Field>
                <Field label="ما هو مستواك في اللغة الإنجليزية؟">
                  <Select value={form.englishLevel} onChange={set("englishLevel")}>
                    <option value="">اختر المستوى...</option>
                    <option>مبتدئ (A1–A2)</option>
                    <option>متوسط (B1–B2)</option>
                    <option>متقدم (C1)</option>
                    <option>متمكن (C2 / Native)</option>
                  </Select>
                </Field>
                <Field label="هل لديك شهادة IELTS أو أي شهادة لغة؟">
                  <Input value={form.ielts} onChange={set("ielts")} placeholder="مثال: IELTS 5.5 — أو 'لا'" />
                </Field>
                <Field label="لماذا تريد الدراسة في ماليزيا؟">
                  <textarea
                    value={form.whyMalaysia}
                    onChange={set("whyMalaysia")}
                    rows={3}
                    placeholder="اكتب باختصار سبب اختيارك لماليزيا..."
                    className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-transparent transition-all bg-gray-50 focus:bg-white resize-none"
                  />
                </Field>
                <Field label="ما هو الأهم بالنسبة لك؟">
                  <Select value={form.priority} onChange={set("priority")}>
                    <option value="">اختر الأولوية...</option>
                    <option>السعر المنخفض</option>
                    <option>الترتيب العالمي للجامعة</option>
                    <option>الموقع الجغرافي</option>
                    <option>فرص العمل بعد التخرج</option>
                    <option>جودة التعليم</option>
                  </Select>
                </Field>
              </div>
            )}

            {/* Error */}
            {error && (
              <div className="mt-4 bg-red-50 border border-red-200 text-red-700 rounded-xl px-4 py-3 text-sm">
                {error}
              </div>
            )}

            {/* Navigation buttons */}
            <div className="flex items-center justify-between mt-8 pt-6 border-t border-gray-100">
              {step > 0 ? (
                <button
                  onClick={() => { setError(""); setStep(s => s - 1); }}
                  className="flex items-center gap-2 text-gray-500 hover:text-gray-700 font-medium text-sm transition-colors"
                >
                  <ArrowLeft size={16} />
                  السابق
                </button>
              ) : <div />}

              {step < steps.length - 1 ? (
                <button
                  onClick={next}
                  className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white font-bold text-sm rounded-xl px-6 py-3 transition-all shadow-sm hover:shadow"
                >
                  التالي
                  <ArrowLeft size={16} />
                </button>
              ) : (
                <button
                  onClick={submit}
                  disabled={loading}
                  className="flex items-center gap-2 bg-green-600 hover:bg-green-700 disabled:opacity-60 text-white font-bold text-sm rounded-xl px-6 py-3 transition-all shadow-sm hover:shadow"
                >
                  {loading ? (
                    <><span className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />جارٍ الإرسال...</>
                  ) : (
                    <><Send size={15} />إرسال وحجز الموعد</>
                  )}
                </button>
              )}
            </div>
          </div>

          {/* Note */}
          <div className="mt-5 bg-white border border-gray-100 rounded-xl px-5 py-4 flex items-start gap-3 shadow-sm">
            <span className="text-base flex-shrink-0">💡</span>
            <p className="text-gray-500 text-sm leading-relaxed">
              بعد إرسال معلوماتك ستُفتح صفحة حجز الموعد مع أحد مستشارينا. الاستشارة مجانية تماماً ولا تلزمك بأي شيء.
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
