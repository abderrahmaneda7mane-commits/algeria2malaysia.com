export default function PriceDisclaimer() {
  return (
    <div className="flex items-start gap-2.5 bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 mb-5 text-right">
      <span className="text-base flex-shrink-0 mt-0.5">📌</span>
      <p className="text-gray-500 text-xs leading-relaxed">
        <span className="font-semibold text-gray-600">ملاحظة:</span>{" "}
        الرسوم المعروضة هي الرسوم الدراسية فقط. قد توجد تكاليف إضافية مثل رسوم التسجيل، التأمين، الفيزا، الرسوم الإدارية، أو ضريبة 6% (SST).
      </p>
    </div>
  );
}
