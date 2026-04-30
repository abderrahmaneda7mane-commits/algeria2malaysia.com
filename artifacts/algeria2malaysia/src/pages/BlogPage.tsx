import { ChevronLeft, Clock, Tag } from "lucide-react";
import { useNavigate } from "../hooks/useNavigate";
import { useSEO } from "../hooks/useSEO";
import { useState } from "react";

interface Article {
  slug: string;
  title: string;
  summary: string;
  category: string;
  readTime: string;
  date: string;
  tag: string;
  tagColor: string;
  content: string;
}

const ARTICLES: Article[] = [
  {
    slug: "study-in-malaysia-algerian-students",
    title: "الدراسة في ماليزيا للطلاب الجزائريين 2025 — الدليل الشامل",
    summary: "كل ما تحتاج معرفته قبل السفر: التكاليف، أفضل الجامعات، شروط الفيزا، وكيف تبدأ رحلتك من الجزائر إلى ماليزيا.",
    category: "الدراسة في ماليزيا",
    readTime: "8 دقائق",
    date: "2026-04-01",
    tag: "دليل شامل",
    tagColor: "bg-green-100 text-green-700",
    content: `
## لماذا ماليزيا؟

تُعدّ ماليزيا واحدة من أفضل الوجهات الدراسية للطلاب الجزائريين لأسباب عدة:

### الأسباب الرئيسية للدراسة في ماليزيا:

**1. التكلفة المنخفضة**
تبلغ تكلفة الدراسة الجامعية في ماليزيا بين 2,000 و5,000 دولار سنوياً، مقارنةً بـ 15,000–30,000 دولار في أوروبا وأمريكا.

**2. جودة التعليم المعترف بها دولياً**
جامعات ماليزيا كـ APU وتايلورز وMMU تحمل اعترافاً دولياً وتصنيفات عالمية مرموقة.

**3. البيئة الإسلامية**
تُشكّل المسلمون 60% من سكان ماليزيا — مساجد، مطاعم حلال، وبيئة ثقافية مريحة للطلاب العرب.

**4. اللغة الإنجليزية**
التدريس بالكامل باللغة الإنجليزية — فرصة ذهبية لتحسين مستواك وزيادة فرصك الوظيفية.

### التخصصات الأكثر طلباً:
- هندسة المعلوماتية وتقنية المعلومات
- إدارة الأعمال والمحاسبة
- الهندسة الميكانيكية والكهربائية
- الطب وطب الأسنان
- العلوم والبيوتكنولوجيا

### الخطوات العملية للتسجيل:
1. اختيار الجامعة والتخصص
2. إرسال وثائق القبول (شهادة البكالوريا/الليسانس)
3. استلام خطاب القبول
4. تقديم طلب فيزا الطالب
5. السفر والتسجيل الرسمي
    `,
  },
  {
    slug: "ielts-malaysia-preparation",
    title: "تحضير IELTS في ماليزيا — أفضل المعاهد وخطة الدراسة",
    summary: "مقارنة أفضل معاهد IELTS في كوالالمبور: الأسعار، المدة، ونسب النجاح. خطة دراسة 8 أسابيع للحصول على 6.5+.",
    category: "معاهد اللغة",
    readTime: "6 دقائق",
    date: "2026-04-10",
    tag: "IELTS",
    tagColor: "bg-blue-100 text-blue-700",
    content: `
## IELTS في كوالالمبور — الخيار الأمثل

اختبار IELTS هو الجواز إلى الجامعات الإنجليزية الكبرى في ماليزيا والعالم. إليك خارطة الطريق:

### أفضل معاهد IELTS في KL:

**معهد ستراتفورد** — درجة 4.8/5
- برنامج IELTS متكامل: Listening, Reading, Writing, Speaking
- مدة الكورس: 4 — 12 أسبوع
- السعر: يبدأ من 1,900 RM/شهر

**معهد بيغ بان** — درجة 4.7/5
- تدريب مكثف مع تقييمات أسبوعية
- مدة: 6 — 16 أسبوع
- السعر: يبدأ من 1,800 RM/شهر

**كلية شيفيلد** — درجة 4.7/5
- أسلوب بريطاني مع اختبارات Cambridge
- مدة: 3 — 18 شهر
- السعر: يبدأ من 3,400 RM/شهر

### خطة دراسة 8 أسابيع للـ IELTS:

| الأسبوع | التركيز | الهدف |
|---------|---------|-------|
| 1-2 | تشخيص المستوى + Vocabulary | فهم نقاط الضعف |
| 3-4 | Reading + Listening | تحسين الفهم |
| 5-6 | Writing Task 1 & 2 | كتابة منظمة |
| 7 | Speaking + Full Tests | الثقة بالنفس |
| 8 | Mock Exams | الاستعداد النهائي |

### النصائح الذهبية:
- خصص ساعة يومياً للقراءة بالإنجليزية
- شاهد الأفلام والمسلسلات بالإنجليزية (بدون ترجمة)
- خذ اختباراً تجريبياً كل أسبوع
    `,
  },
  {
    slug: "cost-living-kuala-lumpur-students",
    title: "تكلفة المعيشة في كوالالمبور للطالب الجزائري 2025",
    summary: "ميزانية شهرية تفصيلية لطالب جزائري في كوالالمبور: السكن، الأكل، المواصلات، والترفيه. كيف تعيش بـ 1,500 RM شهرياً.",
    category: "حياة الطلاب",
    readTime: "5 دقائق",
    date: "2026-04-15",
    tag: "نصائح مالية",
    tagColor: "bg-amber-100 text-amber-700",
    content: `
## كيف تعيش في KL بميزانية محدودة؟

### الميزانية الشهرية التقريبية (بالرينغيت الماليزي RM):

| البند | الحد الأدنى | المتوسط | مريح |
|-------|------------|---------|------|
| السكن (غرفة مشتركة) | 400 RM | 600 RM | 900 RM |
| الطعام | 300 RM | 500 RM | 800 RM |
| المواصلات | 80 RM | 120 RM | 200 RM |
| الاتصالات | 50 RM | 60 RM | 80 RM |
| الكتب والمستلزمات | 50 RM | 100 RM | 150 RM |
| الترفيه | 50 RM | 100 RM | 200 RM |
| **المجموع** | **~930 RM** | **~1,480 RM** | **~2,330 RM** |

*1 RM ≈ 0.20 EUR تقريباً*

### نصائح للتوفير:
- **السكن**: ابحث عن شقق طلابية مشتركة قرب المعهد — أرخص 40%
- **الأكل**: أسواق الطعام الشعبية (Mamak) = وجبة كاملة بـ 6-8 RM
- **المواصلات**: بطاقة Touch 'n Go للمترو والأتوبيس — أرخص من التاكسي
- **الإنترنت**: باقات Celcom أو Digi تبدأ من 35 RM/شهر (50GB)

### مناطق السكن الموصى بها للطلاب:
1. **Cheras** — هادئة وأسعار معقولة (400-600 RM)
2. **Wangsa Maju** — قرب المترو، مجتمع عربي كبير
3. **Setapak** — خيار اقتصادي ممتاز
4. **Bangsar South** — حديثة، قرب KLCC
    `,
  },
  {
    slug: "student-visa-malaysia-algeria",
    title: "كيف تحصل على فيزا الطالب لماليزيا من الجزائر — 2025",
    summary: "خطوات فيزا الطالب الماليزية (Student Pass) من الجزائر: الوثائق المطلوبة، المدة، الأخطاء الشائعة، وكيف نساعدك.",
    category: "فيزا وإجراءات",
    readTime: "7 دقائق",
    date: "2026-04-20",
    tag: "فيزا طالب",
    tagColor: "bg-purple-100 text-purple-700",
    content: `
## فيزا الطالب لماليزيا (Student Pass)

يُعدّ الحصول على فيزا الطالب الماليزية أيسر بكثير من دول أخرى، وإليك الدليل الكامل:

### الوثائق المطلوبة:

**للجامعات:**
- خطاب القبول الرسمي من الجامعة
- جواز سفر ساري المفعول (6 أشهر+)
- شهادات الثانوية/الجامعية مترجمة
- كشف حساب بنكي (3 أشهر الأخيرة)
- 4 صور شخصية (خلفية بيضاء)
- عقد السكن أو خطاب التعهد

**للمعاهد اللغوية:**
- نفس الوثائق + عقد الدراسة مع المعهد

### مدة المعالجة:
- **عادةً**: 4-8 أسابيع
- **بعد وصول الجامعة**: تُكمل الجامعة الإجراءات عوضاً عنك

### خطوات العملية:
1. تقديم طلب القبول للجامعة/المعهد
2. استلام خطاب القبول الرسمي (7-14 يوم)
3. دفع رسوم التسجيل
4. تقديم ملف الفيزا (عبر الجامعة في الغالب)
5. استلام موافقة EMGS
6. شراء تذكرة الطيران والسفر

### أخطاء شائعة يجب تجنبها:
- ❌ السفر بفيزا سياحية ثم محاولة التحويل
- ❌ تقديم وثائق غير مترجمة رسمياً
- ❌ عدم التحقق من صلاحية جواز السفر
- ✅ دائماً احتفظ بنسخ من كل الوثائق

### Algeria2Malaysia تتولى عنك:
نحن نتولى كامل إجراءات الفيزا بالتنسيق مع الجامعة — صفر تعقيدات لك.
    `,
  },
  {
    slug: "summer-camp-malaysia-children",
    title: "سامر كامب ماليزيا للأطفال والشباب 2025 — كل التفاصيل",
    summary: "برامج الصيف في ماليزيا للأطفال (13+): أسعار، مواعيد، ماذا يتعلمون، وكيف تحجز. مرخّص ومتكامل مع الإقامة.",
    category: "سامر كامب",
    readTime: "5 دقائق",
    date: "2026-04-25",
    tag: "أطفال وشباب",
    tagColor: "bg-orange-100 text-orange-700",
    content: `
## سامر كامب ماليزيا 2025

برامج الصيف في ماليزيا فرصة استثنائية لطلاب الثانوية وما فوق لتعلم الإنجليزية في بيئة دولية ممتعة.

### ما هو سامر كامب؟
برنامج مكثف لتعلم اللغة الإنجليزية خلال العطلة الصيفية، يجمع بين:
- الدراسة الأكاديمية (الإنجليزية، IELTS أساسيات)
- الأنشطة الثقافية والرياضية
- رحلات ترفيهية داخل ماليزيا
- إقامة آمنة ومؤمّنة

### مركز برايت للغات — الاختيار الأول:

**البرامج المتاحة:**
- **أسبوع واحد**: 1,365 RM (يشمل الدراسة + الإقامة + الأنشطة)
- **برنامج 7+1**: 7 أسابيع بسعر 6 (الثامن مجاناً)
- **Intensive English**: 4+ أسابيع للمستويات المتقدمة

**المميزات:**
- ✓ للأطفال من عمر 13 سنة فأكثر
- ✓ معلمون متخصصون في تعليم الناشئين
- ✓ إقامة داخلية آمنة (Dormitory)
- ✓ برنامج يومي مليء بالأنشطة
- ✓ إمكانية الحصول على منح حتى 35%

### مواعيد 2025:
- **الدفعة الأولى**: يوليو 2025
- **الدفعة الثانية**: أغسطس 2025
- **البرامج على مدار السنة**: يناير — ديسمبر

### ماذا يكتسب الطفل؟
- تحسين مستوى الإنجليزية بشكل ملحوظ في وقت قصير
- ثقة بالنفس وقدرة على التواصل الدولي
- تجربة ثقافية غنية مع أقران من 30+ دولة
- شهادة إتمام معتمدة دولياً
    `,
  },
];

function ArticleView({ article, onBack }: { article: Article; onBack: () => void }) {
  useSEO({
    title: `${article.title} — Algeria2Malaysia`,
    description: article.summary,
    canonicalPath: `/blog/${article.slug}`,
    keywords: `دراسة ماليزيا، ${article.category}، طلاب جزائريين`,
  });

  return (
    <div className="max-w-3xl mx-auto px-4 pb-16">
      <button
        onClick={onBack}
        className="flex items-center gap-2 text-green-600 hover:text-green-700 font-semibold text-sm py-4 transition-colors"
      >
        <ArrowLeftIcon /> العودة للمقالات
      </button>

      <article>
        <div className="mb-6">
          <span className={`${article.tagColor} text-xs font-bold px-3 py-1 rounded-full`}>{article.tag}</span>
          <h1 className="text-2xl md:text-3xl font-extrabold text-gray-900 mt-3 mb-2 leading-tight">{article.title}</h1>
          <div className="flex items-center gap-4 text-gray-400 text-sm">
            <span className="flex items-center gap-1"><Clock size={13} /> {article.readTime}</span>
            <span>{article.date}</span>
          </div>
          <p className="text-gray-600 mt-4 text-base leading-relaxed border-r-4 border-green-500 pr-4">{article.summary}</p>
        </div>

        <div className="prose-custom text-gray-700 text-sm leading-loose">
          {article.content.trim().split("\n").map((line, i) => {
            if (line.startsWith("## ")) return <h2 key={i} className="text-xl font-extrabold text-gray-900 mt-8 mb-3">{line.slice(3)}</h2>;
            if (line.startsWith("### ")) return <h3 key={i} className="text-base font-extrabold text-gray-800 mt-5 mb-2">{line.slice(4)}</h3>;
            if (line.startsWith("**") && line.endsWith("**")) return <p key={i} className="font-bold text-gray-800 mt-3 mb-1">{line.slice(2, -2)}</p>;
            if (line.startsWith("- ") || line.startsWith("* ")) return <li key={i} className="mr-4 mb-1">{line.slice(2)}</li>;
            if (line.startsWith("| ") && line.includes("|")) {
              const cells = line.split("|").filter(c => c.trim());
              return (
                <div key={i} className="flex gap-2 border-b border-gray-100 py-1.5 text-xs">
                  {cells.map((c, j) => <span key={j} className="flex-1">{c.trim()}</span>)}
                </div>
              );
            }
            if (line.trim() === "") return <br key={i} />;
            if (line.startsWith("1. ") || /^\d+\. /.test(line)) return <p key={i} className="mb-1">{line}</p>;
            return <p key={i} className="mb-2">{line}</p>;
          })}
        </div>
      </article>
    </div>
  );
}

function ArrowLeftIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
      <path d="M19 12H5M12 5l7 7-7 7" />
    </svg>
  );
}

export default function BlogPage() {
  const { go } = useNavigate();
  const [openArticle, setOpenArticle] = useState<Article | null>(null);

  useSEO({
    title: "مقالات ونصائح عن الدراسة في ماليزيا — Algeria2Malaysia",
    description: "أحدث المقالات والأدلة للطلاب الجزائريين الراغبين في الدراسة في ماليزيا: تكاليف المعيشة، الفيزا، أفضل الجامعات، IELTS، وسامر كامب.",
    canonicalPath: "/blog",
    keywords: "دراسة ماليزيا جزائر، مقالات دراسة، نصائح طلاب، فيزا ماليزيا، IELTS",
  });

  if (openArticle) {
    return (
      <div className="min-h-screen bg-gray-50 pt-[70px]" dir="rtl">
        {/* Breadcrumb */}
        <div className="bg-white border-b border-gray-100 px-4 py-3">
          <nav className="max-w-3xl mx-auto flex items-center gap-1 text-sm text-gray-500">
            <button onClick={() => go("home")} className="hover:text-green-600 transition-colors">الرئيسية</button>
            <ChevronLeft size={14} className="rotate-180" />
            <button onClick={() => setOpenArticle(null)} className="hover:text-green-600 transition-colors">المقالات</button>
            <ChevronLeft size={14} className="rotate-180" />
            <span className="text-gray-900 font-semibold truncate max-w-48">{openArticle.title.slice(0, 40)}…</span>
          </nav>
        </div>
        <ArticleView article={openArticle} onBack={() => setOpenArticle(null)} />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-[70px]" dir="rtl">

      {/* Hero */}
      <section className="bg-gradient-to-br from-green-800 to-green-700 text-white py-10 md:py-14 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-block bg-white/20 rounded-full px-4 py-1.5 text-sm font-semibold mb-3">
            مقالات ونصائح مجانية
          </div>
          <h1 className="text-2xl md:text-4xl font-extrabold mb-3 leading-tight">مدوّنة Algeria2Malaysia</h1>
          <p className="text-green-100 text-base max-w-xl mx-auto leading-relaxed">
            كل ما تحتاج معرفته عن الدراسة في ماليزيا — جامعات، معاهد، فيزا، تكاليف، ونصائح من خبرة حقيقية.
          </p>
        </div>
      </section>

      {/* Breadcrumb */}
      <div className="max-w-5xl mx-auto px-4 py-3">
        <nav className="flex items-center gap-1 text-sm text-gray-500">
          <button onClick={() => go("home")} className="hover:text-green-600 transition-colors">الرئيسية</button>
          <ChevronLeft size={14} className="rotate-180" />
          <span className="text-gray-900 font-semibold">المقالات</span>
        </nav>
      </div>

      <main className="max-w-5xl mx-auto px-4 pb-16">

        {/* Featured article */}
        <div
          className="bg-white rounded-2xl border border-gray-200 overflow-hidden mb-8 shadow-sm hover:shadow-md transition-all cursor-pointer group"
          onClick={() => setOpenArticle(ARTICLES[0])}
        >
          <div className="bg-gradient-to-br from-green-600 to-green-700 p-6 text-white">
            <span className="bg-white/20 text-white text-xs font-bold px-3 py-1 rounded-full">
              {ARTICLES[0].tag}
            </span>
            <h2 className="text-xl md:text-2xl font-extrabold mt-3 mb-2 group-hover:text-green-200 transition-colors leading-tight">
              {ARTICLES[0].title}
            </h2>
            <p className="text-green-100 text-sm leading-relaxed">{ARTICLES[0].summary}</p>
            <div className="flex items-center gap-3 mt-4 text-green-200 text-xs">
              <span className="flex items-center gap-1"><Clock size={12} />{ARTICLES[0].readTime}</span>
              <span>{ARTICLES[0].date}</span>
            </div>
          </div>
          <div className="p-4 flex justify-end">
            <span className="text-green-600 font-bold text-sm group-hover:gap-2 flex items-center gap-1 transition-all">
              اقرأ المقال كاملاً ←
            </span>
          </div>
        </div>

        {/* Article grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {ARTICLES.slice(1).map((article) => (
            <article
              key={article.slug}
              className="bg-white rounded-2xl border border-gray-200 p-5 hover:border-green-300 hover:shadow-md transition-all cursor-pointer group"
              onClick={() => setOpenArticle(article)}
            >
              <div className="flex items-start justify-between mb-3">
                <span className={`${article.tagColor} text-xs font-bold px-2.5 py-1 rounded-full`}>
                  {article.tag}
                </span>
                <div className="flex items-center gap-1 text-gray-400 text-xs">
                  <Clock size={11} />
                  {article.readTime}
                </div>
              </div>

              <h2 className="font-extrabold text-gray-900 text-base leading-tight mb-2 group-hover:text-green-700 transition-colors">
                {article.title}
              </h2>
              <p className="text-gray-500 text-sm leading-relaxed line-clamp-3 mb-4">{article.summary}</p>

              <div className="flex items-center justify-between">
                <span className="text-gray-400 text-xs flex items-center gap-1">
                  <Tag size={11} /> {article.category}
                </span>
                <span className="text-green-600 font-semibold text-sm group-hover:text-green-700 transition-colors">
                  اقرأ أكثر ←
                </span>
              </div>
            </article>
          ))}
        </div>

        {/* Internal links */}
        <section className="mt-12 bg-gradient-to-br from-green-700 to-green-600 rounded-2xl p-7 text-white text-center">
          <h2 className="text-xl font-extrabold mb-2">مستعد تبدأ رحلتك؟</h2>
          <p className="text-green-100 text-sm mb-5">استشارة مجانية لتحديد أفضل جامعة أو معهد يناسب هدفك وميزانيتك.</p>
          <div className="flex flex-col sm:flex-row justify-center gap-3">
            <button
              onClick={() => go("universities")}
              className="bg-white text-green-700 font-bold px-6 py-3 rounded-xl hover:bg-green-50 transition-all"
            >
              استعرض الجامعات
            </button>
            <button
              onClick={() => go("institutes")}
              className="bg-green-500 hover:bg-green-400 text-white font-bold px-6 py-3 rounded-xl transition-all"
            >
              استعرض المعاهد
            </button>
          </div>
        </section>
      </main>
    </div>
  );
}
