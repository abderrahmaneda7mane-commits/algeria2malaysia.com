import { ChevronLeft, Clock, Tag, ChevronDown } from "lucide-react";
import { useNavigate } from "../hooks/useNavigate";
import { useSEO } from "../hooks/useSEO";
import { useState } from "react";

interface FAQ {
  q: string;
  a: string;
}

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
  faqs?: FAQ[];
}

const ARTICLES: Article[] = [
  {
    slug: "study-in-malaysia-algerian-students",
    title: "الدراسة في ماليزيا للجزائريين 2026 — الدليل الشامل",
    summary: "تُعدّ الدراسة في ماليزيا للجزائريين من أبرز الفرص الأكاديمية اليوم — تعليم معترف به دولياً، بيئة إسلامية آمنة، وتكاليف في المتناول. اكتشف كل شيء: الجامعات، الفيزا، التكاليف، والخطوات.",
    category: "الدراسة في ماليزيا",
    readTime: "10 دقائق",
    date: "2026-04-01",
    tag: "دليل شامل",
    tagColor: "bg-green-100 text-green-700",
    content: `
## لماذا تختار الدراسة في ماليزيا عام 2026؟

تجمع ماليزيا بين الجودة الأكاديمية والتكلفة المناسبة في بيئة إسلامية آمنة، مما يجعلها الوجهة الدراسية الأفضل للطلاب الجزائريين. وفيما يلي أبرز الأسباب التي تدفع آلاف الطلبة سنوياً لاختيارها:

- أسعار في المتناول: تكاليف الدراسة والمعيشة أقل بكثير مقارنة بأوروبا وأمريكا مع نفس مستوى الجودة.
- التعليم باللغة الإنجليزية: جميع البرامج تُدرَّس بالإنجليزية مع شهادات معترف بها دولياً.
- بيئة إسلامية آمنة: ماليزيا دولة إسلامية تتميز بالأمان والاستقرار، وتوفر مساجد ومطاعم حلال وقيماً عائلية.
- جامعات معترف بها دولياً: شهادات تمنحك فرص توظيف واسعة بعد التخرج في أي مكان.
- مجتمع عربي كبير: وجود جالية جزائرية نشطة يُسهّل الاندماج منذ اليوم الأول.
- مسارات تعليمية متعددة: من تحسين اللغة الإنجليزية إلى البكالوريوس والماجستير في مختلف التخصصات.
- إجراءات قبول مبسّطة: بدون تعقيدات إدارية، خاصة عند الاستعانة بفريق algeria2malaysia.com.

## جديد 2026: رحلات مباشرة من الجزائر إلى ماليزيا

أصبح السفر من الجزائر إلى ماليزيا أكثر سهولة من أي وقت مضى. مع إطلاق رحلات الطيران المباشرة بين الجزائر وكوالالمبور ابتداءً من 2026، اختُصرت مدة الرحلة بشكل كبير وأصبح بإمكان الطالب الجزائري الانتقال بسلاسة دون ترانزيت مرهق. هذا يعني توفيراً في الوقت والتكلفة وراحة أكبر في بداية رحلتك الأكاديمية.

## كيفية التقديم للدراسة من الجزائر — خطوة بخطوة

### الخطوة 1: اختيار التخصص والجامعة
حدد المرحلة الدراسية (بكالوريوس أو ماجستير) ثم اختر الجامعة الأنسب لتخصصك من بين الجامعات الشريكة لـ algeria2malaysia.com.

### الخطوة 2: تجهيز الوثائق المطلوبة
- شهادة البكالوريا أو الشهادة الجامعية
- كشف النقاط (Transcript)
- جواز السفر — نسخة واضحة سارية المفعول
- صور شخصية بخلفية بيضاء
- ترجمة جميع الوثائق إلى الإنجليزية
- شهادة لغة مثل IELTS (اختياري حسب الجامعة)

### الخطوة 3: الحصول على القبول الجامعي
بعد دراسة ملفك، تُصدر الجامعة خطاب القبول (Offer Letter) وخطاب الموافقة على التأشيرة (VAL) الذي تُصدره هيئة EMGS الماليزية.

### الخطوة 4: التقديم على فيزا الطالب
تتم إجراءات الفيزا عبر الجامعة أو من خلال مكتب algeria2malaysia.com الذي يتولى المتابعة الكاملة نيابةً عن الطالب.

### الخطوة 5: السفر واستلام بطاقة الإقامة
عند الوصول إلى مطار كوالالمبور عبر الرحلة المباشرة الجديدة، تستقبلك الجامعة لإتمام الإجراءات النهائية واستلام بطاقة الطالب.

## الجامعات الشريكة مع algeria2malaysia.com

- Asia Pacific University (APU) — رائدة في تكنولوجيا المعلومات والذكاء الاصطناعي
- Taylor's University — من أفضل الجامعات الخاصة، متخصصة في إدارة الأعمال والضيافة
- Multimedia University (MMU) — عريقة في الإعلام والاتصالات والهندسة
- Universiti Kuala Lumpur (UniKL) — متميزة في التخصصات الهندسية والتقنية
- Lincoln University College — خيار مثالي لطلاب الطب والصيدلة وعلوم الصحة
- Universiti Teknologi PETRONAS (UTP) — من أبرز جامعات الهندسة والبترول في آسيا
- Universiti Putra Malaysia (UPM) — جامعة حكومية مصنّفة عالمياً في الزراعة والعلوم
- Universiti Teknologi Malaysia (UTM) — رائدة في الهندسة والعلوم التطبيقية
- UCSI University — ضمن أفضل 300 جامعة عالمياً في الطب وإدارة الأعمال
- Sunway University — شريكة جامعات بريطانية عريقة بمعايير دولية
- City University Malaysia — خيار مرن ومناسب اقتصادياً للطلبة الدوليين

## شروط القبول للجزائريين

**للبكالوريوس:**
شهادة البكالوريا الجزائرية أو ما يعادلها، مع معدل مناسب حسب التخصص (الطب والهندسة يتطلبان معدلاً أعلى).

**للماجستير:**
شهادة ليسانس من جامعة معترف بها، معدل تراكمي لا يقل عن 2.5/4، رسالة دوافع، سيرة ذاتية، ورسائل توصية.

**اللغة الإنجليزية:**
IELTS بمعدل 5.5–6.5 أو TOEFL iBT بين 60–80 حسب الجامعة. بعض الجامعات تكتفي باختبار داخلي.

## كم تكلفة الدراسة في ماليزيا؟

تختلف التكلفة حسب الجامعة والتخصص، لكن في المتوسط تبلغ حوالي 6,000 € سنوياً — وتبقى ماليزيا أذكى خيار مقارنة بأوروبا وكندا وأستراليا.

| البند | التكلفة التقريبية |
|-------|------------------|
| الرسوم الجامعية السنوية | 3,000 – 8,000 € |
| السكن الشهري | 150 – 300 €/شهر |
| المصاريف المعيشية | 100 – 200 €/شهر |
| المجموع السنوي التقريبي | 5,000 – 9,000 € |

## المنح الدراسية المتاحة للجزائريين

- منحة MTCP (Malaysian Technical Cooperation Programme)
- منح داخلية من الجامعات الماليزية كخصومات على الرسوم
- منح من منظمات إسلامية مثل البنك الإسلامي للتنمية

يمكن لفريق algeria2malaysia.com مساعدتك في التقديم على هذه المنح وزيادة فرص قبولك.
    `,
    faqs: [
      {
        q: "هل يحتاج الجزائري فيزا للدراسة في ماليزيا؟",
        a: "نعم، الطالب الجزائري يحتاج إلى تأشيرة طالب رسمية تُسمى Student Pass. الخبر الجيد أن الإجراءات مبسّطة جداً — في الغالب تتولاها الجامعة نيابةً عنك بعد قبولك. الأوراق المطلوبة هي: جواز سفر ساري، خطاب القبول الجامعي، صور شخصية، وشهادات دراسية مترجمة. مكتبنا يتابع كل هذه الإجراءات من الألف إلى الياء."
      },
      {
        q: "كم تكلفة الدراسة في ماليزيا؟",
        a: "تتراوح الرسوم الجامعية السنوية بين 3,000 و8,000 يورو حسب الجامعة والتخصص. أما المعيشة فتكلّف بين 300 و500 يورو شهرياً (سكن + طعام + مواصلات). المجموع السنوي الإجمالي يتراوح بين 5,000 و9,000 يورو — أي ما يعادل ثلث تكلفة الدراسة في أوروبا مع نفس جودة الشهادة الدولية."
      },
      {
        q: "هل ماليزيا مناسبة للطلاب الجزائريين؟",
        a: "ماليزيا من أفضل الوجهات للطلاب الجزائريين لأسباب عدة: البيئة الإسلامية (60% من السكان مسلمون، مطاعم حلال في كل مكان)، وجود جالية جزائرية وعربية كبيرة، التدريس بالإنجليزية، التكلفة المنخفضة، والإجراءات البسيطة. كثير من الطلاب الجزائريين يقولون إنهم شعروا بالراحة منذ أول يوم."
      },
      {
        q: "ما هي الوثائق المطلوبة للدراسة في ماليزيا؟",
        a: "الوثائق الأساسية هي: شهادة البكالوريا أو الليسانس + كشف النقاط، جواز السفر (ساري 6 أشهر على الأقل)، صور شخصية بخلفية بيضاء، وترجمة معتمدة لجميع الوثائق إلى الإنجليزية. بعض الجامعات تطلب إضافياً شهادة IELTS أو اختبار لغوي داخلي. مكتبنا يرشدك حسب متطلبات كل جامعة بالتحديد."
      },
      {
        q: "كم تستغرق إجراءات القبول؟",
        a: "عادةً 2 إلى 4 أسابيع لاستلام خطاب القبول من الجامعة، ثم 4 إلى 8 أسابيع إضافية لمعالجة الفيزا عبر هيئة EMGS الماليزية. المجموع من البداية حتى السفر: 6 إلى 12 أسبوعاً. إذا كانت ملفاتك مكتملة وتعاملت معنا مباشرة، نضمن لك أسرع وقت ممكن."
      },
    ],
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

function FAQAccordion({ faqs }: { faqs: FAQ[] }) {
  const [openIdx, setOpenIdx] = useState<number | null>(null);
  return (
    <section className="mt-10 mb-6">
      <div className="bg-gradient-to-br from-green-700 to-green-800 rounded-2xl p-5 md:p-7 text-white mb-5">
        <h2 className="text-lg md:text-xl font-extrabold mb-1">أسئلة شائعة</h2>
        <p className="text-green-200 text-sm">أجوبة واضحة وصريحة على الأسئلة التي يطرحها الطلاب الجزائريون</p>
      </div>
      <div className="space-y-3">
        {faqs.map((faq, i) => (
          <div
            key={i}
            className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm hover:border-green-300 transition-colors"
          >
            <button
              className="w-full flex items-center justify-between gap-3 px-5 py-4 text-right text-gray-900 font-bold text-sm md:text-base hover:bg-green-50 transition-colors"
              onClick={() => setOpenIdx(openIdx === i ? null : i)}
            >
              <span className="flex items-center gap-2 text-right">
                <span className="flex-shrink-0 w-6 h-6 rounded-full bg-green-100 text-green-700 text-xs font-extrabold flex items-center justify-center">{i + 1}</span>
                {faq.q}
              </span>
              <ChevronDown
                size={18}
                className={`flex-shrink-0 text-green-600 transition-transform duration-200 ${openIdx === i ? "rotate-180" : ""}`}
              />
            </button>
            {openIdx === i && (
              <div className="px-5 pb-5 pt-1 border-t border-gray-100 text-gray-600 text-sm leading-relaxed bg-green-50/40">
                {faq.a}
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}

function ArticleView({ article, onBack }: { article: Article; onBack: () => void }) {
  const { go } = useNavigate();

  useSEO({
    title: `${article.title} — Algeria2Malaysia`,
    description: article.summary,
    canonicalPath: `/blog/${article.slug}`,
    keywords: `دراسة ماليزيا، ${article.category}، طلاب جزائريين`,
  });

  const renderInline = (text: string): React.ReactNode[] => {
    const parts = text.split(/(\*\*[^*]+\*\*)/g);
    return parts.map((part, j) => {
      if (part.startsWith("**") && part.endsWith("**"))
        return <strong key={j} className="font-bold text-gray-900">{part.slice(2, -2)}</strong>;
      return <span key={j}>{part}</span>;
    });
  };

  const renderContent = (content: string) => {
    const ls = content.trim().split("\n");
    return ls.map((line, i) => {
      if (line.startsWith("## "))
        return <h2 key={i} className="text-xl font-extrabold text-gray-900 mt-8 mb-3 pb-2 border-b border-gray-100">{line.slice(3)}</h2>;
      if (line.startsWith("### "))
        return <h3 key={i} className="text-base font-extrabold text-green-800 mt-5 mb-2">{line.slice(4)}</h3>;
      if (line.startsWith("**") && line.endsWith("**"))
        return <p key={i} className="font-bold text-gray-800 mt-4 mb-1">{line.slice(2, -2)}</p>;
      if (line.startsWith("**"))
        return <p key={i} className="font-semibold text-gray-800 mt-4 mb-1">{renderInline(line)}</p>;
      if (line.startsWith("- ") || line.startsWith("* "))
        return (
          <div key={i} className="flex items-start gap-2 mb-1.5 mr-2">
            <span className="text-green-500 flex-shrink-0 leading-5">✓</span>
            <span className="text-gray-700 text-sm leading-relaxed">{renderInline(line.slice(2))}</span>
          </div>
        );
      if (line.startsWith("| ") && line.includes("|") && !line.startsWith("|---")) {
        const cells = line.split("|").filter(c => c.trim());
        const isHeader = ls[i + 1]?.startsWith("|---");
        return (
          <div key={i} className={`flex gap-2 border-b border-gray-100 py-2 text-sm ${isHeader ? "font-bold bg-gray-50 text-gray-800" : "text-gray-600"}`}>
            {cells.map((c, j) => <span key={j} className="flex-1">{c.trim()}</span>)}
          </div>
        );
      }
      if (line.startsWith("|---")) return null;
      if (line.trim() === "") return <div key={i} className="h-2" />;
      if (/^\d+\. /.test(line))
        return <p key={i} className="mb-1.5 text-gray-700 text-sm">{renderInline(line)}</p>;
      return <p key={i} className="mb-2 text-gray-700 text-sm leading-relaxed">{renderInline(line)}</p>;
    });
  };

  return (
    <div className="max-w-3xl mx-auto px-4 pb-16">
      <button
        onClick={onBack}
        className="flex items-center gap-2 text-green-600 hover:text-green-700 font-semibold text-sm py-4 transition-colors"
      >
        <ArrowLeftIcon /> العودة للمقالات
      </button>

      <article>
        {/* Header */}
        <div className="mb-7">
          <span className={`${article.tagColor} text-xs font-bold px-3 py-1 rounded-full`}>{article.tag}</span>
          <h1 className="text-2xl md:text-3xl font-extrabold text-gray-900 mt-3 mb-4 leading-tight">{article.title}</h1>
          <p className="text-gray-600 mt-1 text-base leading-relaxed border-r-4 border-green-500 pr-4 bg-green-50/50 py-3 rounded-l-lg">
            {article.summary}
          </p>
        </div>

        {/* Content */}
        <div className="text-gray-700 leading-loose">
          {renderContent(article.content)}
        </div>

        {/* CTA Box */}
        <div className="mt-8 bg-gradient-to-br from-green-600 to-green-700 rounded-2xl p-6 text-white text-center">
          <p className="font-extrabold text-lg mb-1">مستعد تبدأ رحلتك؟</p>
          <p className="text-green-100 text-sm mb-4">احصل على استشارة مجانية الآن — فريقنا يساعدك خطوة بخطوة.</p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <button
              onClick={() => go("home", { scrollTo: "apply" })}
              className="bg-white text-green-700 font-bold px-6 py-3 rounded-xl hover:bg-green-50 transition-all text-sm"
            >
              ابدأ التسجيل الآن
            </button>
            <button
              onClick={() => go("universities")}
              className="bg-green-500 hover:bg-green-400 text-white font-bold px-6 py-3 rounded-xl transition-all text-sm"
            >
              استعرض الجامعات
            </button>
          </div>
        </div>

        {/* FAQ */}
        {article.faqs && article.faqs.length > 0 && (
          <FAQAccordion faqs={article.faqs} />
        )}
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
