import { useEffect } from "react";
import { ArrowLeft, Search, BookOpen, Clock, Calendar, DollarSign, AlertCircle, GraduationCap, ChevronRight, ChevronLeft, Filter } from "lucide-react";
import { useSEO } from "@/hooks/useSEO";
import { useReveal } from "@/hooks/useReveal";
import { useNavigate } from "@/hooks/useNavigate";
import { useCourses, PAGE_SIZE } from "@/hooks/useCourses";
import PriceDisclaimer from "@/components/shared/PriceDisclaimer";

const CITYU_UNIVERSITY_ID = 11;
const EUR_RATE = 5;
function toEur(rm: number) { return Math.round(rm / EUR_RATE).toLocaleString(); }

const PRICE_RANGES = [
  { label: "الكل", min: 0, max: Infinity },
  { label: "RM 5,000 – 15,000", min: 5000, max: 15000 },
  { label: "RM 15,000 – 30,000", min: 15000, max: 30000 },
  { label: "RM +30,000", min: 30000, max: Infinity },
];

function SkeletonCard() {
  return (
    <div className="bg-white border border-gray-100 rounded-2xl p-5 animate-pulse">
      <div className="h-4 bg-gray-100 rounded-lg w-3/4 mb-3" />
      <div className="h-3 bg-gray-50 rounded-lg w-1/2 mb-4" />
      <div className="flex gap-3">
        <div className="h-3 bg-gray-100 rounded-lg w-16" />
        <div className="h-3 bg-gray-100 rounded-lg w-20" />
        <div className="h-3 bg-gray-100 rounded-lg w-24" />
      </div>
    </div>
  );
}

export default function CityUCoursesPage() {
  useSEO({
    title: "الدراسة في جامعة CityU ماليزيا 2025 — Algeria2Malaysia",
    description: "City University Malaysia: تخصصات أعمال وحقوق وهندسة في كوالالمبور. شراكة مع جامعات بريطانية وأمريكية.",
    canonicalPath: "/study-cityu-malaysia",
    keywords: "CityU ماليزيا، City University KL، شراكة بريطانية",
  });
  const { go } = useNavigate();
  const reveal = useReveal();
  const {
    courses, total, loading, error,
    page, setPage, search, setSearch,
    durationFilter, setDurationFilter,
    priceRangeIdx, setPriceRangeIdx,
    allDurations, totalPages, pageNumbers,
  } = useCourses(CITYU_UNIVERSITY_ID, PRICE_RANGES);

  useEffect(() => { window.scrollTo({ top: 0, behavior: "smooth" }); }, [page]);

  return (
    <div className="min-h-screen bg-[#f8fafc]" dir="rtl">

      {/* ── Hero ── */}
      <div ref={reveal} className="section-reveal relative overflow-hidden bg-gradient-to-br from-red-900 via-red-800 to-red-700 text-white pt-20 pb-20 px-4">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 right-0 w-96 h-96 bg-red-400/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/4" />
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-red-300/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/4" />
          <div className="absolute inset-0 opacity-[0.025]" style={{ backgroundImage: "radial-gradient(circle, rgba(255,255,255,.7) 1px, transparent 1px)", backgroundSize: "24px 24px" }} />
        </div>
        <div className="relative max-w-5xl mx-auto">
          <button onClick={() => go("universities")} className="flex items-center gap-2 text-red-200 hover:text-white transition-colors mb-8 group text-sm">
            <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
            <span>العودة إلى الجامعات</span>
          </button>
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5">
            <div className="w-20 h-20 bg-white rounded-2xl flex items-center justify-center flex-shrink-0 p-2.5 shadow-xl">
              <img src="/logos/cityu.png" alt="CityU" className="max-w-full max-h-full object-contain" />
            </div>
            <div className="flex-1">
              <div className="inline-flex items-center gap-2 bg-red-500/30 border border-red-400/30 rounded-full px-3 py-1 text-xs font-semibold text-red-100 mb-2">
                جامعة خاصة · City Campus
              </div>
              <h1 className="text-3xl md:text-4xl font-black text-white leading-tight">
                جامعة سيتي ماليزيا
              </h1>
              <p className="text-red-200 text-sm mt-1.5">City University Malaysia — Petaling Jaya</p>
              {!loading && !error && (
                <div className="mt-3 inline-flex items-center gap-2 bg-white/15 border border-white/20 rounded-full px-4 py-1.5 text-sm font-semibold">
                  <GraduationCap size={14} />
                  {total.toLocaleString()} تخصص دراسي
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* ── Filters ── */}
      <div className="max-w-5xl mx-auto px-4 -mt-6 relative z-10 mb-6">
        <div className="bg-white rounded-2xl shadow-[0_4px_20px_-4px_rgba(0,0,0,.12)] border border-gray-100 p-5">
          <div className="flex items-center gap-2 mb-4 text-sm font-semibold text-gray-700">
            <Filter size={15} className="text-red-600" />
            فلترة التخصصات
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <div className="relative">
              <Search size={15} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
              <input type="text" placeholder="ابحث باسم التخصص..." value={search} onChange={e => setSearch(e.target.value)}
                className="w-full border border-gray-200 rounded-xl py-2.5 pr-9 pl-3 text-sm focus:outline-none focus:ring-2 focus:ring-red-400/30 focus:border-red-400 bg-gray-50 focus:bg-white transition-all" />
            </div>
            <div className="relative">
              <Clock size={15} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
              <select value={durationFilter} onChange={e => setDurationFilter(e.target.value)}
                className="w-full border border-gray-200 rounded-xl py-2.5 pr-9 pl-3 text-sm focus:outline-none focus:ring-2 focus:ring-red-400/30 focus:border-red-400 appearance-none bg-gray-50 focus:bg-white transition-all">
                <option value="all">كل المدد الدراسية</option>
                {allDurations.map(d => <option key={d} value={d}>{d} {Number(d) === 1 ? "سنة" : "سنوات"}</option>)}
              </select>
            </div>
            <div className="relative">
              <DollarSign size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
              <select dir="ltr" value={priceRangeIdx} onChange={e => setPriceRangeIdx(Number(e.target.value))}
                className="w-full border border-gray-200 rounded-xl py-2.5 pl-9 pr-3 text-sm focus:outline-none focus:ring-2 focus:ring-red-400/30 focus:border-red-400 appearance-none bg-gray-50 focus:bg-white transition-all text-left">
                {PRICE_RANGES.map((r, i) => <option key={i} value={i}>{r.label}</option>)}
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* ── Results ── */}
      <div className="max-w-5xl mx-auto px-4 pb-16">
        <PriceDisclaimer />
        {loading && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {Array.from({ length: PAGE_SIZE }).map((_, i) => <SkeletonCard key={i} />)}
          </div>
        )}
        {!loading && error && (
          <div className="bg-red-50 border border-red-200 rounded-2xl p-8 text-center">
            <AlertCircle className="mx-auto text-red-400 mb-3" size={36} />
            <h3 className="text-red-700 font-bold text-base mb-2">تعذّر جلب البيانات</h3>
            <p className="text-red-600 text-sm">{error}</p>
          </div>
        )}
        {!loading && !error && courses.length === 0 && (
          <div className="bg-white border border-gray-100 rounded-2xl p-12 text-center shadow-sm">
            <BookOpen className="mx-auto text-gray-200 mb-3" size={44} />
            <h3 className="text-gray-700 font-bold text-base mb-2">لا توجد نتائج</h3>
            <p className="text-gray-400 text-sm">جرّب تعديل معايير البحث أو الفلاتر</p>
          </div>
        )}
        {!loading && !error && courses.length > 0 && (
          <>
            <div className="flex items-center justify-between mb-4">
              <p className="text-sm text-gray-500">
                عرض <span className="font-semibold text-gray-700">{courses.length}</span> من <span className="font-semibold text-gray-700">{total}</span> تخصص
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
              {courses.map(course => (
                <div key={course.id} className="bg-white border border-gray-100 rounded-2xl p-5 hover:shadow-md hover:border-red-200 hover:-translate-y-0.5 transition-all duration-200 group">
                  <h3 className="font-bold text-gray-900 text-sm leading-snug mb-1 group-hover:text-red-700 transition-colors">{course.name}</h3>
                  <p className="text-red-600 text-xs font-semibold mb-4">{course.universities?.[0]?.name ?? "City University Malaysia"}</p>
                  <div className="flex flex-wrap gap-x-4 gap-y-2 text-sm text-gray-500">
                    {course.duration != null && (
                      <span className="flex items-center gap-1.5 text-xs">
                        <Clock size={12} className="text-red-400 flex-shrink-0" />
                        {course.duration} {Number(course.duration) === 1 ? "سنة" : "سنوات"}
                      </span>
                    )}
                    {course.intake && (
                      <span className="flex items-center gap-1.5 text-xs">
                        <Calendar size={12} className="text-red-400 flex-shrink-0" />
                        {course.intake.trim()}
                      </span>
                    )}
                    <span className="flex items-center gap-1.5 text-xs">
                      <DollarSign size={12} className="text-red-400 flex-shrink-0" />
                      {course.price == null || course.price === 0 ? (
                        <span className="text-gray-300 italic">غير متوفر</span>
                      ) : (
                        <span className="flex items-center gap-1.5">
                          <span className="font-bold text-green-700">{course.price.toLocaleString()} RM</span>
                          <span className="text-gray-300">·</span>
                          <span className="font-bold text-red-600">€{toEur(course.price)}</span>
                          <span className="text-gray-400 text-[10px]">/ سنة</span>
                        </span>
                      )}
                    </span>
                  </div>
                </div>
              ))}
            </div>
            {totalPages > 1 && (
              <div className="flex items-center justify-center gap-2 flex-wrap">
                <button onClick={() => setPage(p => Math.max(1, p - 1))} disabled={page === 1}
                  className="flex items-center gap-1 px-4 py-2 rounded-xl border border-gray-200 text-sm font-semibold text-gray-700 hover:bg-red-50 hover:border-red-300 disabled:opacity-40 disabled:cursor-not-allowed transition-all">
                  <ChevronRight size={15} />السابق
                </button>
                {pageNumbers.map((num, i) => num === "..." ? (
                  <span key={`e-${i}`} className="px-2 text-gray-300 text-sm">…</span>
                ) : (
                  <button key={num} onClick={() => setPage(num as number)}
                    className={`w-10 h-10 rounded-xl text-sm font-bold transition-all border ${page === num ? "bg-red-600 text-white border-red-600 shadow-md" : "bg-white text-gray-600 border-gray-200 hover:bg-red-50 hover:border-red-300"}`}>
                    {num}
                  </button>
                ))}
                <button onClick={() => setPage(p => Math.min(totalPages, p + 1))} disabled={page === totalPages}
                  className="flex items-center gap-1 px-4 py-2 rounded-xl border border-gray-200 text-sm font-semibold text-gray-700 hover:bg-red-50 hover:border-red-300 disabled:opacity-40 disabled:cursor-not-allowed transition-all">
                  التالي<ChevronLeft size={15} />
                </button>
              </div>
            )}
            {totalPages > 1 && (
              <p className="text-center text-xs text-gray-400 mt-3">
                الصفحة {page} من {totalPages} · {total.toLocaleString()} تخصص
              </p>
            )}
          </>
        )}
      </div>
    </div>
  );
}
