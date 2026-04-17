import { useEffect } from "react";
import { navigate } from "../hooks/useNavigate";
import { ArrowRight, Clock, CheckCircle, Calendar } from "lucide-react";

export default function ConsultationPage() {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });

    if (document.getElementById("zcal-script")) return;

    const script = document.createElement("script");
    script.id = "zcal-script";
    script.src = "https://static.zcal.co/embed/v1/embed.js";
    script.async = true;
    document.body.appendChild(script);

    return () => {
      const existing = document.getElementById("zcal-script");
      if (existing) existing.remove();
    };
  }, []);

  const benefits = [
    "تعرّف على أفضل الجامعات والتخصصات المناسبة لك",
    "نصائح حول متطلبات القبول والوثائق المطلوبة",
    "معلومات تفصيلية عن الرسوم الدراسية والمعيشة",
    "خطة واضحة لرحلتك الأكاديمية في ماليزيا",
  ];

  return (
    <div className="min-h-screen bg-gray-50" dir="rtl">
      {/* Hero Banner */}
      <div className="bg-gradient-to-br from-green-800 via-green-700 to-green-600 pt-24 pb-12 px-4">
        <div className="max-w-3xl mx-auto text-center text-white">
          <button
            onClick={() => navigate("home")}
            className="inline-flex items-center gap-2 text-green-200 hover:text-white text-sm mb-6 transition-colors"
          >
            <ArrowRight size={16} />
            العودة للرئيسية
          </button>

          <div className="flex justify-center mb-5">
            <div className="w-20 h-20 rounded-full bg-white/10 border-2 border-white/30 flex items-center justify-center">
              <Calendar size={36} className="text-white" />
            </div>
          </div>

          <div className="inline-flex items-center gap-2 bg-green-600/50 border border-green-400/40 rounded-full px-4 py-1.5 text-sm font-medium mb-4">
            <Clock size={14} />
            مجانية — 30 دقيقة
          </div>

          <h1 className="text-3xl md:text-4xl font-extrabold mb-3 leading-tight">
            احجز استشارتك المجانية
          </h1>
          <p className="text-green-100 text-base md:text-lg max-w-xl mx-auto leading-relaxed">
            تحدّث مع أحد خبرائنا واحصل على خارطة طريق شخصية لدراستك في ماليزيا
          </p>
        </div>
      </div>

      {/* Benefits strip */}
      <div className="bg-white border-b border-gray-100 py-6 px-4">
        <div className="max-w-3xl mx-auto grid grid-cols-1 sm:grid-cols-2 gap-3">
          {benefits.map((b, i) => (
            <div key={i} className="flex items-start gap-2.5">
              <CheckCircle size={18} className="text-green-600 flex-shrink-0 mt-0.5" />
              <span className="text-gray-700 text-sm">{b}</span>
            </div>
          ))}
        </div>
      </div>

      {/* zcal embed */}
      <div className="max-w-3xl mx-auto px-4 py-10">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="bg-green-50 border-b border-green-100 px-6 py-4 text-center">
            <p className="text-green-800 font-bold text-base">اختر الوقت المناسب لك</p>
            <p className="text-green-600 text-sm mt-0.5">سيتواصل معك أحد مستشارينا في الموعد المحدد</p>
          </div>

          <div className="p-4 md:p-6">
            <div
              className="zcal-inline-widget"
              data-zcal-options='{"showBackground":1}'
            >
              <a href="https://zcal.co/i/DNzrLfY_">
                استشارة الدراسة في ماليزيا - Schedule a meeting
              </a>
            </div>
          </div>
        </div>

        {/* Note */}
        <div className="mt-6 bg-amber-50 border border-amber-200 rounded-xl px-5 py-4 flex items-start gap-3">
          <span className="text-lg flex-shrink-0">💡</span>
          <p className="text-amber-800 text-sm leading-relaxed">
            الاستشارة مجانية تماماً ولا تلزمك بأي شيء. هدفنا مساعدتك في اتخاذ القرار الصحيح لمستقبلك الأكاديمي.
          </p>
        </div>
      </div>
    </div>
  );
}
