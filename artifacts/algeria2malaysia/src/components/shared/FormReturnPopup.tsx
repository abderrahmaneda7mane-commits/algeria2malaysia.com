interface Props {
  onClose: () => void;
}

export default function FormReturnPopup({ onClose }: Props) {
  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center px-4 pb-6 sm:pb-0" dir="rtl">
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={onClose} />
      <div className="relative bg-white rounded-2xl shadow-2xl max-w-sm w-full p-6 border border-green-100">
        <div className="flex items-start gap-3">
          <div className="w-10 h-10 bg-green-100 rounded-xl flex items-center justify-center flex-shrink-0 mt-0.5">
            <span className="text-xl">📌</span>
          </div>
          <div className="flex-1">
            <h3 className="font-bold text-gray-900 text-base mb-1">ملاحظة مهمة</h3>
            <p className="text-gray-700 text-sm leading-relaxed">
              بعد الانتهاء من تعبئة الفورم، سيتم إرسال طلبك مباشرة إلى الجامعة، وسيتم التواصل معك قريبًا.
            </p>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors text-xl leading-none flex-shrink-0 mt-0.5"
            aria-label="إغلاق"
          >
            ×
          </button>
        </div>
        <button
          onClick={onClose}
          className="mt-4 w-full bg-green-600 hover:bg-green-700 text-white py-2.5 rounded-xl font-bold text-sm transition-all"
        >
          حسناً، شكراً
        </button>
      </div>
    </div>
  );
}
