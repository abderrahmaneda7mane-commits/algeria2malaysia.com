import { useEffect } from "react";
import { navigate } from "../hooks/useNavigate";
import { ArrowRight, Clock, CheckCircle, Calendar, ExternalLink, Home } from "lucide-react";

const ZCAL_URL = "https://zcal.co/i/DNzrLfY_";

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
    <div className="min-h-screen" style={{ background: "linear-gradient(160deg, #f0faf4 0%, #ffffff 50%, #f5f9ff 100%)" }} dir="rtl">

      {/* Header */}
      <div className="pt-24 pb-10 px-4 border-b border-green-100">
        <div className="max-w-3xl mx-auto text-center">
          <button
            onClick={() => navigate("home")}
            className="inline-flex items-center gap-2 text-gray-400 hover:text-green-700 text-sm mb-8 transition-colors"
          >
            <ArrowRight size={15} />
            العودة للرئيسية
          </button>

          <div className="flex justify-center mb-5">
            <div className="w-16 h-16 rounded-2xl bg-green-100 flex items-center justify-center shadow-sm">
              <Calendar size={30} className="text-green-700" />
            </div>
          </div>

          <div className="inline-flex items-center gap-2 bg-green-100 text-green-700 rounded-full px-4 py-1.5 text-sm font-semibold mb-4">
            <Clock size={13} />
            مجانية — 30 دقيقة
          </div>

          <h1 className="text-3xl md:text-4xl font-extrabold text-gray-800 mb-3 leading-tight">
            احجز استشارتك المجانية
          </h1>
          <p className="text-gray-500 text-base max-w-xl mx-auto leading-relaxed">
            تحدّث مع أحد خبرائنا واحصل على خارطة طريق شخصية لدراستك في ماليزيا
          </p>
        </div>
      </div>

      {/* Benefits strip */}
      <div className="py-6 px-4">
        <div className="max-w-3xl mx-auto grid grid-cols-1 sm:grid-cols-2 gap-3">
          {benefits.map((b, i) => (
            <div key={i} className="flex items-start gap-2.5 bg-white rounded-xl px-4 py-3 shadow-sm border border-gray-100">
              <CheckCircle size={17} className="text-green-500 flex-shrink-0 mt-0.5" />
              <span className="text-gray-600 text-sm">{b}</span>
            </div>
          ))}
        </div>
      </div>

      {/* zcal embed */}
      <div className="max-w-3xl mx-auto px-4 pb-12">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">

          {/* Card header */}
          <div className="border-b border-gray-100 px-6 py-4 text-center">
            <p className="text-gray-800 font-bold text-base">اختر الوقت المناسب لك</p>
            <p className="text-gray-400 text-sm mt-0.5">سيتواصل معك أحد مستشارينا في الموعد المحدد</p>
          </div>

          {/* zcal widget */}
          <div className="p-4 md:p-6">
            <div
              className="zcal-inline-widget"
              data-zcal-options='{"showBackground":1}'
            >
              {/* Styled fallback button — zcal replaces this with the calendar widget */}
              <a
                href={ZCAL_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center justify-center gap-3 w-full bg-gradient-to-l from-green-600 to-green-700 hover:from-green-500 hover:to-green-600 text-white font-bold text-lg rounded-2xl py-5 px-6 shadow-lg hover:shadow-xl transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0"
              >
                <Calendar size={22} className="flex-shrink-0" />
                <span>احجز موعد استشارتك الآن</span>
                <ExternalLink size={17} className="flex-shrink-0 opacity-70 group-hover:opacity-100 transition-opacity" />
              </a>
            </div>
          </div>

          {/* Back button — for users returning from external zcal page */}
          <div className="px-6 pb-6 pt-0">
            <div className="border-t border-dashed border-gray-200 pt-5 text-center">
              <p className="text-gray-400 text-xs mb-3">بعد إتمام الحجز في الصفحة الخارجية</p>
              <button
                onClick={() => navigate("home")}
                className="inline-flex items-center justify-center gap-2 bg-gray-50 hover:bg-green-50 border border-gray-200 hover:border-green-300 text-gray-600 hover:text-green-700 font-semibold text-sm rounded-xl py-2.5 px-6 transition-all duration-200"
              >
                <Home size={15} />
                العودة للصفحة الرئيسية
              </button>
            </div>
          </div>
        </div>

        {/* Note */}
        <div className="mt-5 bg-white border border-gray-100 rounded-xl px-5 py-4 flex items-start gap-3 shadow-sm">
          <span className="text-base flex-shrink-0">💡</span>
          <p className="text-gray-500 text-sm leading-relaxed">
            الاستشارة مجانية تماماً ولا تلزمك بأي شيء. هدفنا مساعدتك في اتخاذ القرار الصحيح لمستقبلك الأكاديمي.
          </p>
        </div>
      </div>
    </div>
  );
}
