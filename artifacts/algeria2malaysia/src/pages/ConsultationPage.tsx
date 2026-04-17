import { useEffect, useState } from "react";
import { navigate } from "../hooks/useNavigate";
import { ArrowRight, Clock, CheckCircle, Calendar } from "lucide-react";

const ZCAL_URL = "https://zcal.co/i/DNzrLfY_";

export default function ConsultationPage() {
  const [showBooking, setShowBooking] = useState(false);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const benefits = [
    "تعرّف على أفضل الجامعات والتخصصات المناسبة لك",
    "نصائح حول متطلبات القبول والوثائق المطلوبة",
    "معلومات تفصيلية عن الرسوم الدراسية والمعيشة",
    "خطة واضحة لرحلتك الأكاديمية في ماليزيا",
  ];

  return (
    <>
      {/* ── Booking overlay with back button ── */}
      {showBooking && (
        <div className="fixed inset-0 z-[9999] flex flex-col bg-white" dir="rtl">
          {/* Back bar */}
          <div className="flex items-center gap-3 bg-white border-b border-gray-200 px-4 py-3 shadow-sm flex-shrink-0">
            <button
              onClick={() => setShowBooking(false)}
              className="flex items-center gap-2 bg-green-600 hover:bg-green-700 active:bg-green-800 text-white font-bold text-sm rounded-xl px-5 py-2.5 transition-all shadow-sm"
            >
              <ArrowRight size={16} />
              رجوع
            </button>
            <div className="flex items-center gap-2 text-gray-600 text-sm font-medium">
              <Calendar size={15} className="text-green-600" />
              استشارة مجانية — 30 دقيقة
            </div>
          </div>

          {/* zcal page */}
          <iframe
            src={ZCAL_URL}
            title="حجز استشارة مجانية"
            className="flex-1 w-full border-none"
          />
        </div>
      )}

      {/* ── Main page ── */}
      <div
        className="min-h-screen"
        style={{ background: "linear-gradient(160deg, #f0faf4 0%, #ffffff 50%, #f5f9ff 100%)" }}
        dir="rtl"
      >
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

        {/* Benefits */}
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

        {/* Booking card */}
        <div className="max-w-3xl mx-auto px-4 pb-12">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="border-b border-gray-100 px-6 py-4 text-center">
              <p className="text-gray-800 font-bold text-base">اختر الوقت المناسب لك</p>
              <p className="text-gray-400 text-sm mt-0.5">سيتواصل معك أحد مستشارينا في الموعد المحدد</p>
            </div>

            <div className="p-6">
              <button
                onClick={() => setShowBooking(true)}
                className="group flex items-center justify-center gap-3 w-full bg-gradient-to-l from-green-600 to-green-700 hover:from-green-500 hover:to-green-600 text-white font-bold text-lg rounded-2xl py-5 px-6 shadow-lg hover:shadow-xl transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0"
              >
                <Calendar size={22} className="flex-shrink-0" />
                <span>احجز موعد استشارتك الآن</span>
                <ArrowRight size={18} className="flex-shrink-0 opacity-70 group-hover:opacity-100 transition-opacity" />
              </button>
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
    </>
  );
}
