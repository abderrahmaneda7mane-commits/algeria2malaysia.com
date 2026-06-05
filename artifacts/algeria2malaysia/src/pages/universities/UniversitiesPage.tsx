import { useEffect } from "react";
import { ArrowLeft, CheckCircle, GraduationCap, MapPin, BookOpen, BarChart2, ExternalLink, Calendar } from "lucide-react";
import { useNavigate, getNavState } from "@/hooks/useNavigate";
import { useSEO } from "@/hooks/useSEO";
import PriceDisclaimer from "@/components/shared/PriceDisclaimer";

const WA_LINK = "https://wa.me/601112200603";
const GOOGLE_FORM_URL = "https://docs.google.com/forms/d/e/1FAIpQLSd0wQH2-RL3zDf2BB1UsskwBfIIXsJ8KLxw1lMVD6TEQnWpgA/viewform";

function fmtEur(rm: number) { return Math.round(rm / 5).toLocaleString(); }

const UNIVERSITIES = [
  {
    id: "apu", name: "APU", nameAr: "جامعة آسيا باسيفيك (APU)",
    nameFull: "Asia Pacific University of Technology & Innovation",
    location: "كوالالمبور — Technology Park Malaysia", established: "1993",
    badge: "IT & Technology", accentColor: "blue",
    desc: "جامعة خاصة رائدة في مجال التكنولوجيا وتكنولوجيا المعلومات، تستقطب طلاباً من أكثر من 130 دولة. تحتل مراتب متقدمة في تصنيفات QS Asia في تخصصات الحوسبة والهندسة والأعمال.",
    logoImg: "/logos/apu.png",
    strengths: ["رائدة في IT والأمن السيبراني والذكاء الاصطناعي", "بيئة طلابية دولية من 130+ دولة", "حرم عصري في Technology Park Malaysia", "شراكات مع IBM وMicrosoft وOracle"],
    programs: [
      { level: "Foundation", duration: "1 سنة", specialties: ["علوم الحاسوب", "هندسة البرمجيات", "تقنية المعلومات"] },
      { level: "البكالوريوس", duration: "3 سنوات", specialties: ["هندسة البرمجيات", "الأمن السيبراني", "الذكاء الاصطناعي", "الأعمال والتقنية"] },
      { level: "الماستر", duration: "1-2 سنة", specialties: ["تكنولوجيا المعلومات", "علم البيانات", "الأمن السيبراني"] },
    ],
    pricing: [
      { label: "Foundation", rm: "15,000 – 17,500", eur: `${fmtEur(15000)} – ${fmtEur(17500)}`, note: "السنة الأولى" },
      { label: "البكالوريوس", rm: "19,000 – 30,000", eur: `${fmtEur(19000)} – ${fmtEur(30000)}`, note: "سنوياً" },
      { label: "الماستر", rm: "24,000 – 38,000", eur: `${fmtEur(24000)} – ${fmtEur(38000)}`, note: "المجموع" },
    ],
    coursePage: "apu" as const,
  },
  {
    id: "taylors", name: "Taylor's University", nameAr: "جامعة تايلور",
    nameFull: "Taylor's University Lakeside Campus",
    location: "سوبانج جايا — سيلانغور", established: "1969",
    badge: "Top Ranked", accentColor: "purple",
    desc: "إحدى أعرق الجامعات الخاصة في ماليزيا وأعلاها تصنيفاً عالمياً. تتميز بحرمها المطل على بحيرة صناعية وبرامج مزدوجة مع جامعات بريطانية وأسترالية. ضمن أفضل 500 جامعة عالمياً (QS 2025).",
    logoImg: "/logos/taylors.png",
    strengths: ["الأعلى تصنيفاً بين الجامعات الخاصة (QS 2025)", "حرم استثنائي مطل على بحيرة صناعية", "برامج مزدوجة مع جامعات بريطانية وأسترالية", "قوية في الأعمال والضيافة والهندسة والطب"],
    programs: [
      { level: "Foundation", duration: "1 سنة", specialties: ["العلوم الطبيعية", "الأعمال والتكنولوجيا", "الفنون والتصميم"] },
      { level: "البكالوريوس", duration: "3-4 سنوات", specialties: ["إدارة الأعمال", "الهندسة", "الضيافة والسياحة", "الطب"] },
      { level: "الماستر", duration: "1-2 سنة", specialties: ["MBA", "التعليم والتدريس", "هندسة البرمجيات"] },
    ],
    pricing: [
      { label: "Foundation", rm: "15,000 – 19,000", eur: `${fmtEur(15000)} – ${fmtEur(19000)}`, note: "السنة الأولى" },
      { label: "البكالوريوس", rm: "22,000 – 42,000", eur: `${fmtEur(22000)} – ${fmtEur(42000)}`, note: "سنوياً" },
      { label: "الماستر", rm: "32,000 – 55,000", eur: `${fmtEur(32000)} – ${fmtEur(55000)}`, note: "المجموع" },
    ],
    coursePage: "taylors" as const,
  },
  {
    id: "mmu", name: "MMU", nameAr: "جامعة الوسائط المتعددة (MMU)",
    nameFull: "Multimedia University",
    location: "سايبر جايا (الحرم الرئيسي) وملاكا", established: "1996",
    badge: "Technology", accentColor: "teal",
    desc: "جامعة حكومية تقنية تأسست بدعم من Telekom Malaysia، متخصصة في علوم الحاسوب والهندسة الكهربائية والوسائط المتعددة. حرمها الرئيسي في قلب سايبر جايا عاصمة التكنولوجيا الماليزية.",
    logoImg: "/logos/mmu.png",
    strengths: ["متخصصة في التكنولوجيا والهندسة الكهربائية", "حرم سايبر جايا في المدينة التقنية الرائدة", "مرتبطة رسمياً بـ Telekom Malaysia", "برامج الذكاء الاصطناعي وعلم البيانات"],
    programs: [
      { level: "Foundation", duration: "1 سنة", specialties: ["علوم الحاسوب", "هندسة كهربائية", "الوسائط المتعددة"] },
      { level: "البكالوريوس", duration: "3-4 سنوات", specialties: ["هندسة البرمجيات", "هندسة الاتصالات", "الذكاء الاصطناعي", "الوسائط الإبداعية"] },
      { level: "الماستر", duration: "1-2 سنة", specialties: ["علوم الحاسوب", "هندسة الكهرباء"] },
    ],
    pricing: [
      { label: "Foundation", rm: "11,000 – 14,000", eur: `${fmtEur(11000)} – ${fmtEur(14000)}`, note: "السنة الأولى" },
      { label: "البكالوريوس", rm: "15,000 – 24,000", eur: `${fmtEur(15000)} – ${fmtEur(24000)}`, note: "سنوياً" },
      { label: "الماستر", rm: "22,000 – 32,000", eur: `${fmtEur(22000)} – ${fmtEur(32000)}`, note: "المجموع" },
    ],
    coursePage: "mmu" as const,
  },
  {
    id: "unikl", name: "UniKL", nameAr: "جامعة كوالالمبور (UniKL)",
    nameFull: "Universiti Kuala Lumpur",
    location: "كوالالمبور (11 حرم في 8 ولايات)", established: "2002",
    badge: "Engineering", accentColor: "orange",
    desc: "جامعة تقنية حكومية فريدة تضم 11 حرماً متخصصاً منتشرة عبر 8 ولايات ماليزية. كل حرم متخصص في قطاع صناعي محدد مما يضمن تدريباً عملياً مباشراً مع الصناعة.",
    logoImg: "/logos/unikl.png",
    strengths: ["11 حرم متخصص في 8 ولايات ماليزية", "تدريب عملي مباشر مع الصناعة الوطنية", "برامج هندسة تطبيقية فريدة (طيران، نفط، تصنيع)", "رسوم دراسية تنافسية"],
    programs: [
      { level: "الدبلوم", duration: "2.5-3 سنوات", specialties: ["هندسة ميكانيكية", "هندسة مدنية", "هندسة كهربائية"] },
      { level: "البكالوريوس", duration: "4 سنوات", specialties: ["هندسة الطيران", "هندسة النفط والغاز", "هندسة التصنيع", "الميكاترونيك"] },
      { level: "الماستر", duration: "1.5-2 سنة", specialties: ["هندسة الميكاترونيك", "إدارة الهندسة"] },
    ],
    pricing: [
      { label: "الدبلوم", rm: "9,000 – 13,000", eur: `${fmtEur(9000)} – ${fmtEur(13000)}`, note: "سنوياً" },
      { label: "البكالوريوس", rm: "11,000 – 17,000", eur: `${fmtEur(11000)} – ${fmtEur(17000)}`, note: "سنوياً" },
      { label: "الماستر", rm: "16,000 – 24,000", eur: `${fmtEur(16000)} – ${fmtEur(24000)}`, note: "المجموع" },
    ],
    coursePage: "unikl" as const,
  },
  {
    id: "lincoln", name: "Lincoln University", nameAr: "جامعة لينكولن كوليدج",
    nameFull: "Lincoln University College",
    location: "بيتالينغ جايا — سيلانغور", established: "2002",
    badge: "Affordable", accentColor: "green",
    desc: "جامعة خاصة معتمدة من MQA تتميز بتنوع برامجها وأسعارها التنافسية. تُعدّ من أكثر الجامعات انفتاحاً على الطلاب الدوليين وخاصة من الدول العربية.",
    logoImg: "/logos/lincoln.png",
    strengths: ["رسوم تنافسية ومناسبة للطلاب العرب", "قبول مرن وإجراءات سريعة", "تخصصات واسعة: طب، صيدلة، أعمال، هندسة", "دعم خاص للطلاب الدوليين"],
    programs: [
      { level: "Foundation", duration: "1 سنة", specialties: ["العلوم الصحية", "الأعمال والتكنولوجيا"] },
      { level: "البكالوريوس", duration: "3-4 سنوات", specialties: ["إدارة الأعمال", "علوم الحاسوب", "التمريض والصحة العامة", "الصيدلة", "القانون"] },
      { level: "الماستر", duration: "1.5-2 سنة", specialties: ["MBA", "الصحة العامة", "هندسة البرمجيات"] },
    ],
    pricing: [
      { label: "Foundation", rm: "7,500 – 11,000", eur: `${fmtEur(7500)} – ${fmtEur(11000)}`, note: "السنة الأولى" },
      { label: "البكالوريوس", rm: "9,000 – 15,000", eur: `${fmtEur(9000)} – ${fmtEur(15000)}`, note: "سنوياً" },
      { label: "الماستر", rm: "15,000 – 22,000", eur: `${fmtEur(15000)} – ${fmtEur(22000)}`, note: "المجموع" },
    ],
    coursePage: "lincoln" as const,
  },
  {
    id: "utp", name: "UTP", nameAr: "جامعة تكنولوجيا بتروناس (UTP)",
    nameFull: "Universiti Teknologi PETRONAS",
    location: "سيري إسكندر — بيراك", established: "1997",
    badge: "Top Engineering", accentColor: "yellow",
    desc: "جامعة هندسية حكومية تأسست بدعم بتروناس — أكبر شركة في ماليزيا. تُصنَّف ضمن أفضل الجامعات الهندسية في آسيا، وتُركّز على الهندسة والتكنولوجيا والبحث في قطاعي النفط والطاقة.",
    logoImg: "/logos/utp.png",
    strengths: ["ضمن أفضل الجامعات الهندسية في آسيا (QS)", "مدعومة من بتروناس — أقوى شركة ماليزية", "منح دراسية جزئية وكاملة متاحة", "حرم جامعي ضخم ومتكامل"],
    programs: [
      { level: "Foundation", duration: "1 سنة", specialties: ["العلوم والهندسة", "الرياضيات والفيزياء"] },
      { level: "البكالوريوس", duration: "4 سنوات", specialties: ["هندسة البترول", "هندسة كيميائية", "هندسة الكمبيوتر", "هندسة مدنية", "هندسة الميكانيك"] },
      { level: "الماستر", duration: "1.5-2 سنة", specialties: ["هندسة البترول", "الطاقة المتجددة", "هندسة الكيمياء"] },
    ],
    pricing: [
      { label: "Foundation", rm: "9,000 – 12,000", eur: `${fmtEur(9000)} – ${fmtEur(12000)}`, note: "السنة الأولى" },
      { label: "البكالوريوس", rm: "15,000 – 22,000", eur: `${fmtEur(15000)} – ${fmtEur(22000)}`, note: "سنوياً" },
      { label: "الماستر", rm: "22,000 – 32,000", eur: `${fmtEur(22000)} – ${fmtEur(32000)}`, note: "المجموع" },
    ],
    coursePage: "utp" as const,
  },
  {
    id: "upm", name: "UPM", nameAr: "جامعة بوترا ماليزيا (UPM)",
    nameFull: "Universiti Putra Malaysia",
    location: "سيردانغ — سيلانغور (قرب كوالالمبور)", established: "1931",
    badge: "Research", accentColor: "emerald",
    desc: "إحدى أعرق الجامعات الحكومية الماليزية، تأسست 1931 وتحتل مرتبة ضمن أفضل 150 جامعة في آسيا. رائدة في البحث العلمي بالزراعة والبيئة والهندسة والطب البيطري.",
    logoImg: "/logos/upm.png",
    strengths: ["ضمن أفضل 150 جامعة في آسيا (QS Asia 2025)", "حرم أخضر ضخم 1200 هكتار", "رائدة عالمياً في الزراعة والعلوم البيئية", "رسوم تنافسية كجامعة حكومية"],
    programs: [
      { level: "البكالوريوس", duration: "4 سنوات", specialties: ["الزراعة وعلوم الغذاء", "هندسة مدنية وبيئية", "علوم الحاسوب", "الطب البيطري"] },
      { level: "الماستر", duration: "1.5-2 سنة", specialties: ["علوم الزراعة والبيئة", "الهندسة البيئية", "MBA"] },
      { level: "الدكتوراه", duration: "3-5 سنوات", specialties: ["العلوم الزراعية", "الهندسة", "علوم الحياة"] },
    ],
    pricing: [
      { label: "البكالوريوس", rm: "8,000 – 16,000", eur: `${fmtEur(8000)} – ${fmtEur(16000)}`, note: "سنوياً" },
      { label: "الماستر", rm: "12,000 – 20,000", eur: `${fmtEur(12000)} – ${fmtEur(20000)}`, note: "المجموع" },
      { label: "الدكتوراه", rm: "16,000 – 28,000", eur: `${fmtEur(16000)} – ${fmtEur(28000)}`, note: "سنوياً" },
    ],
    coursePage: "upm" as const,
  },
  {
    id: "utm", name: "UTM", nameAr: "جامعة تكنولوجيا ماليزيا (UTM)",
    nameFull: "Universiti Teknologi Malaysia",
    location: "جوهور بهرو — جوهور + كوالالمبور", established: "1904",
    badge: "Top Engineering", accentColor: "sky",
    desc: "إحدى أعرق الجامعات الهندسية الحكومية في ماليزيا، تأسست 1904 وتحتل مراتب متقدمة عالمياً في الهندسة والتكنولوجيا. تمتلك حرمين رئيسيين: الحرم الأم في جوهور بهرو وحرم كوالالمبور.",
    logoImg: "/logos/utm.png",
    strengths: ["رائدة في الهندسة والتكنولوجيا منذ 1904", "حرمان رئيسيان: جوهور بهرو وكوالالمبور", "قوية في العلوم التطبيقية والبيئة المبنية", "بحث علمي متقدم وشراكات صناعية دولية"],
    programs: [
      { level: "البكالوريوس", duration: "4 سنوات", specialties: ["هندسة مدنية", "هندسة كهربائية", "هندسة ميكانيكية", "هندسة الكمبيوتر", "العمارة"] },
      { level: "الماستر", duration: "1.5-2 سنة", specialties: ["هندسة الإنشاءات", "الهندسة الكهربائية", "علوم الحاسوب"] },
      { level: "الدكتوراه", duration: "3-5 سنوات", specialties: ["تخصصات بحثية في الهندسة والتكنولوجيا"] },
    ],
    pricing: [
      { label: "البكالوريوس", rm: "12,000 – 20,000", eur: `${fmtEur(12000)} – ${fmtEur(20000)}`, note: "سنوياً" },
      { label: "الماستر", rm: "15,000 – 25,000", eur: `${fmtEur(15000)} – ${fmtEur(25000)}`, note: "المجموع" },
      { label: "الدكتوراه", rm: "18,000 – 30,000", eur: `${fmtEur(18000)} – ${fmtEur(30000)}`, note: "سنوياً" },
    ],
    coursePage: "utm" as const,
  },
  {
    id: "utem", name: "UTeM", nameAr: "جامعة تكنيكال ماليزيا ملاكا (UTeM)",
    nameFull: "Universiti Teknikal Malaysia Melaka",
    location: "دوريان تونغال — ملاكا", established: "2000",
    badge: "Technical Engineering", accentColor: "rose",
    desc: "جامعة حكومية تقنية متخصصة تأسست عام 2000 في ملاكا، تُركّز على الهندسة التقنية التطبيقية والتصنيع والإلكترونيك. تُقدّم تدريباً عملياً مكثفاً يُؤهّل الطلاب مباشرةً لسوق العمل الصناعي.",
    logoImg: "/logos/utem.png",
    strengths: ["متخصصة في الهندسة التقنية التطبيقية", "رائدة في تكنولوجيا التصنيع والإلكترونيك", "تدريب عملي مكثف مرتبط بالصناعة", "رسوم تنافسية كجامعة حكومية"],
    programs: [
      { level: "البكالوريوس", duration: "4 سنوات", specialties: ["هندسة الإلكترونيك", "هندسة التصنيع", "هندسة الميكاترونيك", "هندسة الكهرباء الصناعية"] },
      { level: "الماستر", duration: "1.5-2 سنة", specialties: ["هندسة الإلكترونيك المتقدمة", "هندسة التصنيع"] },
      { level: "الدكتوراه", duration: "3-5 سنوات", specialties: ["تخصصات بحثية في الهندسة التقنية"] },
    ],
    pricing: [
      { label: "البكالوريوس", rm: "8,000 – 14,000", eur: `${fmtEur(8000)} – ${fmtEur(14000)}`, note: "سنوياً" },
      { label: "الماستر", rm: "12,000 – 20,000", eur: `${fmtEur(12000)} – ${fmtEur(20000)}`, note: "المجموع" },
      { label: "الدكتوراه", rm: "15,000 – 24,000", eur: `${fmtEur(15000)} – ${fmtEur(24000)}`, note: "سنوياً" },
    ],
    coursePage: "utem" as const,
  },
  {
    id: "ucsi", name: "UCSI University", nameAr: "جامعة UCSI",
    nameFull: "UCSI University",
    location: "شيراس — كوالالمبور الجنوبية", established: "1986",
    badge: "Medicine & Business", accentColor: "pink",
    desc: "جامعة خاصة راسخة تأسست 1986 وتتميز بقوتها في الطب والعلوم الصحية والصيدلة. تمتلك مستشفى تعليمياً خاصاً وبرامج MBBS معتمدة دولياً من هيئات بريطانية وأمريكية.",
    logoImg: "/logos/ucsi.png",
    strengths: ["برنامج MBBS معتمد دولياً (هيئات UK/USA)", "مستشفى تعليمي خاص تابع للجامعة", "رائدة في الصيدلة والتمريض وطب الأسنان", "ضمن أفضل 600 جامعة عالمياً (QS 2025)"],
    programs: [
      { level: "Foundation", duration: "1 سنة", specialties: ["العلوم الطبية والصحية", "الأعمال والتكنولوجيا"] },
      { level: "البكالوريوس", duration: "3-5 سنوات", specialties: ["الطب والجراحة MBBS", "الصيدلة", "التمريض", "طب الأسنان", "إدارة الأعمال"] },
      { level: "الماستر", duration: "1.5-3 سنوات", specialties: ["الطب التخصصي", "MBA", "الصحة العامة"] },
    ],
    pricing: [
      { label: "Foundation", rm: "13,000 – 16,000", eur: `${fmtEur(13000)} – ${fmtEur(16000)}`, note: "السنة الأولى" },
      { label: "البكالوريوس", rm: "17,000 – 62,000", eur: `${fmtEur(17000)} – ${fmtEur(62000)}`, note: "سنوياً (الطب الأعلى)" },
      { label: "الماستر", rm: "28,000 – 68,000", eur: `${fmtEur(28000)} – ${fmtEur(68000)}`, note: "المجموع" },
    ],
    coursePage: "ucsi" as const,
  },
  {
    id: "sunway", name: "Sunway University", nameAr: "جامعة صنواي",
    nameFull: "Sunway University",
    location: "بانغار سيري بيتالينغ — كوالالمبور", established: "1987",
    badge: "Modern Campus", accentColor: "indigo",
    desc: "جامعة خاصة حديثة تقع في مدينة صنواي المتكاملة الشهيرة. تتميز بشراكة استراتيجية حصرية مع جامعة لانكستر البريطانية (مرتبة 127 عالمياً) وتقدم برامج مزدوجة بدرجات بريطانية.",
    logoImg: "/logos/sunway.png",
    strengths: ["شراكة حصرية مع جامعة لانكستر البريطانية (#127 عالمياً)", "حرم حديث متكامل داخل مدينة صنواي", "درجات بريطانية مُعترف بها عالمياً", "بيئة طلابية دولية نابضة وفعّالة"],
    programs: [
      { level: "Foundation", duration: "1 سنة", specialties: ["العلوم الطبيعية", "الأعمال والإدارة", "الفنون والتصميم"] },
      { level: "البكالوريوس", duration: "3-4 سنوات", specialties: ["إدارة الأعمال", "الهندسة", "علوم الحاسوب", "التمريض", "المحاسبة والمال"] },
      { level: "الماستر", duration: "1-2 سنة", specialties: ["MBA", "هندسة البرمجيات", "علم النفس التطبيقي"] },
    ],
    pricing: [
      { label: "Foundation", rm: "15,000 – 18,500", eur: `${fmtEur(15000)} – ${fmtEur(18500)}`, note: "السنة الأولى" },
      { label: "البكالوريوس", rm: "20,000 – 38,000", eur: `${fmtEur(20000)} – ${fmtEur(38000)}`, note: "سنوياً" },
      { label: "الماستر", rm: "28,000 – 50,000", eur: `${fmtEur(28000)} – ${fmtEur(50000)}`, note: "المجموع" },
    ],
    coursePage: "sunway" as const,
  },
  {
    id: "cityu", name: "City University", nameAr: "جامعة سيتي ماليزيا",
    nameFull: "City University Malaysia",
    location: "بيتالينغ جايا — سيلانغور", established: "1984",
    badge: "Engineering & Law", accentColor: "crimson",
    desc: "جامعة خاصة ماليزية معتمدة تأسست عام 1984، تتميز بتنوع برامجها بين الهندسة والقانون والأعمال وتكنولوجيا المعلومات، وتستقطب طلاباً من مختلف أنحاء العالم.",
    logoImg: "/logos/cityu.png",
    strengths: ["معتمدة من MQA — هيئة الاعتماد الأكاديمي الماليزية", "تخصصات قانونية وهندسية وتقنية متكاملة", "رسوم تنافسية مناسبة للطلاب الجزائريين", "بيئة دولية متعددة الثقافات وقريبة من كوالالمبور"],
    programs: [
      { level: "Foundation", duration: "1 سنة", specialties: ["العلوم الطبيعية", "الأعمال والإدارة", "تكنولوجيا المعلومات"] },
      { level: "البكالوريوس", duration: "3-4 سنوات", specialties: ["الهندسة المدنية", "الهندسة الكهربائية", "القانون", "إدارة الأعمال", "العمارة"] },
      { level: "الماستر", duration: "1-2 سنة", specialties: ["هندسة البناء", "MBA", "القانون التجاري"] },
    ],
    pricing: [
      { label: "Foundation", rm: "8,000 – 12,000", eur: `${fmtEur(8000)} – ${fmtEur(12000)}`, note: "السنة الأولى" },
      { label: "البكالوريوس", rm: "12,000 – 20,000", eur: `${fmtEur(12000)} – ${fmtEur(20000)}`, note: "سنوياً" },
      { label: "الماستر", rm: "15,000 – 26,000", eur: `${fmtEur(15000)} – ${fmtEur(26000)}`, note: "المجموع" },
    ],
    coursePage: "cityu-courses" as const,
  },
];

type AccentKey = "blue"|"purple"|"teal"|"orange"|"green"|"yellow"|"emerald"|"pink"|"indigo"|"sky"|"rose"|"crimson";
const ACCENT: Record<AccentKey, { border: string; badge: string; badgeText: string; text: string; bg: string; ring: string; dot: string }> = {
  blue:    { border:"border-blue-200",   badge:"bg-blue-600",   badgeText:"text-white", text:"text-blue-700",    bg:"bg-blue-50",    ring:"ring-blue-200",    dot:"bg-blue-500"   },
  purple:  { border:"border-purple-200", badge:"bg-purple-600", badgeText:"text-white", text:"text-purple-700",  bg:"bg-purple-50",  ring:"ring-purple-200",  dot:"bg-purple-500" },
  teal:    { border:"border-teal-200",   badge:"bg-teal-600",   badgeText:"text-white", text:"text-teal-700",    bg:"bg-teal-50",    ring:"ring-teal-200",    dot:"bg-teal-500"   },
  orange:  { border:"border-orange-200", badge:"bg-orange-600", badgeText:"text-white", text:"text-orange-700",  bg:"bg-orange-50",  ring:"ring-orange-200",  dot:"bg-orange-500" },
  green:   { border:"border-green-200",  badge:"bg-green-600",  badgeText:"text-white", text:"text-green-700",   bg:"bg-green-50",   ring:"ring-green-200",   dot:"bg-green-500"  },
  yellow:  { border:"border-yellow-200", badge:"bg-yellow-500", badgeText:"text-white", text:"text-yellow-700",  bg:"bg-yellow-50",  ring:"ring-yellow-200",  dot:"bg-yellow-500" },
  emerald: { border:"border-emerald-200",badge:"bg-emerald-600",badgeText:"text-white", text:"text-emerald-700", bg:"bg-emerald-50", ring:"ring-emerald-200", dot:"bg-emerald-500"},
  pink:    { border:"border-pink-200",   badge:"bg-pink-600",   badgeText:"text-white", text:"text-pink-700",    bg:"bg-pink-50",    ring:"ring-pink-200",    dot:"bg-pink-500"   },
  indigo:  { border:"border-indigo-200", badge:"bg-indigo-600", badgeText:"text-white", text:"text-indigo-700",  bg:"bg-indigo-50",  ring:"ring-indigo-200",  dot:"bg-indigo-500" },
  sky:     { border:"border-sky-200",    badge:"bg-sky-600",    badgeText:"text-white", text:"text-sky-700",     bg:"bg-sky-50",     ring:"ring-sky-200",     dot:"bg-sky-500"    },
  rose:    { border:"border-rose-200",   badge:"bg-rose-600",   badgeText:"text-white", text:"text-rose-700",    bg:"bg-rose-50",    ring:"ring-rose-200",    dot:"bg-rose-500"   },
  crimson: { border:"border-red-200",    badge:"bg-red-600",    badgeText:"text-white", text:"text-red-700",     bg:"bg-red-50",     ring:"ring-red-200",     dot:"bg-red-500"    },
};

export default function UniversitiesPage() {
  useSEO({
    title: "أفضل الجامعات الماليزية للجزائريين 2025 — Algeria2Malaysia",
    description: "دليل 12 جامعة ماليزية معتمدة: APU، تايلورز، MMU، UniKL، UPM وأكثر. تخصصات هندسة وأعمال وطب بأسعار مناسبة. قبول سريع بدون IELTS.",
    canonicalPath: "/universities",
    keywords: "جامعات ماليزيا، الدراسة في ماليزيا، APU ماليزيا، تايلورز ماليزيا، جامعات للجزائريين",
  });
  const { go } = useNavigate();

  useEffect(() => {
    const { state } = getNavState();
    if (state.scrollTo) {
      const id = state.scrollTo;
      setTimeout(() => { document.getElementById(id)?.scrollIntoView({ behavior: "smooth" }); }, 80);
    }
  }, []);

  return (
    <div className="min-h-screen bg-[#fafafa]" dir="rtl">

      {/* ── Hero ── */}
      <div className="relative overflow-hidden bg-gradient-to-br from-[#0a2e14] via-[#0f4d22] to-[#166534] pt-24 pb-20 px-4 text-center">
        {/* BG decorations */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-green-400/8 rounded-full blur-3xl -translate-y-1/2 translate-x-1/4" />
          <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-emerald-300/8 rounded-full blur-3xl translate-y-1/2 -translate-x-1/4" />
          <div className="absolute inset-0 opacity-[0.025]"
            style={{ backgroundImage: "radial-gradient(circle, rgba(255,255,255,.8) 1px, transparent 1px)", backgroundSize: "32px 32px" }} />
        </div>
        <div className="relative z-10 max-w-3xl mx-auto">
          <button
            onClick={() => go("home")}
            className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/18 border border-white/20 text-white/85 hover:text-white text-sm font-medium px-4 py-2 rounded-full mb-8 transition-all"
          >
            <ArrowLeft size={14} className="rotate-180" />
            الصفحة الرئيسية
          </button>
          <div className="inline-flex items-center gap-2 bg-white/12 border border-white/20 rounded-full px-4 py-1.5 text-sm font-semibold text-green-200 mb-5">
            <GraduationCap size={15} />
            جامعاتنا الشريكة
          </div>
          <h1 className="text-4xl md:text-5xl font-black text-white mb-4 leading-tight">
            12 جامعة ماليزية<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-l from-green-200 to-emerald-100">معتمدة ومعترف بها دولياً</span>
          </h1>
          <p className="text-green-100/80 text-lg max-w-xl mx-auto mb-8 leading-relaxed">
            نساعدك على الالتحاق بأفضل الجامعات — استشارة مجانية ونتولى كل الإجراءات من الملف حتى الوصول
          </p>
          <div className="flex flex-wrap gap-3 justify-center">
            <button
              onClick={() => go("compare")}
              className="inline-flex items-center gap-2 bg-white text-green-800 hover:bg-green-50 px-6 py-3 rounded-full font-bold text-sm shadow-lg hover:-translate-y-0.5 transition-all"
            >
              <BarChart2 size={16} />
              قارن بين الجامعات
            </button>
          </div>
        </div>
      </div>

      {/* ── Quick Nav ── */}
      <div className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-gray-100 shadow-[0_2px_8px_-2px_rgba(0,0,0,.06)]">
        <div className="overflow-x-auto py-3 px-4">
          <div className="flex gap-2 min-w-max mx-auto w-fit">
            {UNIVERSITIES.map((u) => (
              <a
                key={u.id}
                href={`#${u.id}`}
                className="px-4 py-1.5 rounded-full text-xs font-bold bg-gray-100 hover:bg-green-600 hover:text-white text-gray-600 transition-all duration-200 whitespace-nowrap"
              >
                {u.name}
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* ── University Sections ── */}
      <div className="max-w-6xl mx-auto px-4 py-12 space-y-10">
        <PriceDisclaimer />

        {UNIVERSITIES.map((uni) => {
          const a = ACCENT[uni.accentColor as AccentKey] || ACCENT.green;
          return (
            <section key={uni.id} id={uni.id} className="scroll-mt-16">
              <div className={`bg-white rounded-3xl border ${a.border} shadow-[0_4px_24px_-4px_rgba(0,0,0,.08)] overflow-hidden hover:shadow-[0_8px_36px_-6px_rgba(0,0,0,.12)] transition-shadow duration-300`}>

                {/* ── Card Header ── */}
                <div className={`relative px-6 py-5 ${a.bg} border-b ${a.border}`}>
                  <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                    {/* Logo */}
                    <div className={`w-20 h-14 bg-white rounded-xl shadow-sm flex items-center justify-center p-2.5 border ${a.border} flex-shrink-0`}>
                      <img src={uni.logoImg} alt={`${uni.name} logo`} className="max-w-full max-h-full object-contain" loading="lazy" />
                    </div>
                    {/* Info */}
                    <div className="flex-1 min-w-0">
                      <div className="flex flex-wrap items-center gap-2 mb-1">
                        <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${a.badge} ${a.badgeText}`}>{uni.badge}</span>
                        <span className="text-xs text-gray-400 bg-white/80 px-2 py-0.5 rounded-full border border-gray-100 flex items-center gap-1">
                          <Calendar size={10} />
                          تأسست {uni.established}
                        </span>
                      </div>
                      <h2 className={`text-xl font-black ${a.text} leading-tight`}>{uni.nameAr}</h2>
                      <p className="text-gray-500 text-xs mt-0.5">{uni.nameFull}</p>
                    </div>
                    {/* Location */}
                    <div className="flex items-center gap-1.5 text-gray-500 text-xs bg-white/80 px-3 py-1.5 rounded-full border border-gray-100 flex-shrink-0">
                      <MapPin size={11} />
                      <span>{uni.location}</span>
                    </div>
                  </div>
                </div>

                {/* ── Card Body ── */}
                <div className="p-6">
                  <div className="grid lg:grid-cols-5 gap-6">

                    {/* Left: Desc + Strengths (2 cols) */}
                    <div className="lg:col-span-2 space-y-5">
                      <p className="text-gray-600 text-[14px] leading-relaxed">{uni.desc}</p>
                      <div>
                        <h4 className="font-bold text-gray-800 text-sm mb-2.5 flex items-center gap-1.5">
                          <div className={`w-4 h-4 rounded-full ${a.badge} flex items-center justify-center`}>
                            <CheckCircle size={10} className="text-white" />
                          </div>
                          مميزات الجامعة
                        </h4>
                        <ul className="space-y-1.5">
                          {uni.strengths.map((s) => (
                            <li key={s} className="flex items-start gap-2 text-[13px] text-gray-700">
                              <div className={`w-1.5 h-1.5 rounded-full ${a.dot} flex-shrink-0 mt-1.5`} />
                              {s}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    {/* Middle: Programs (2 cols) */}
                    <div className="lg:col-span-2">
                      <h4 className="font-bold text-gray-800 text-sm mb-3 flex items-center gap-1.5">
                        <BookOpen size={14} className={a.text} />
                        البرامج المتاحة
                      </h4>
                      <div className="space-y-2">
                        {uni.programs.map((prog) => (
                          <div key={prog.level} className={`${a.bg} rounded-xl p-3 border ${a.border}`}>
                            <div className="flex items-center justify-between mb-1.5">
                              <span className={`font-bold text-[12px] ${a.text}`}>{prog.level}</span>
                              <span className="text-[11px] text-gray-500 bg-white px-2 py-0.5 rounded-full">{prog.duration}</span>
                            </div>
                            <div className="flex flex-wrap gap-1">
                              {prog.specialties.map((sp) => (
                                <span key={sp} className="text-[11px] bg-white text-gray-600 px-2 py-0.5 rounded-lg border border-white/80 shadow-[0_1px_2px_rgba(0,0,0,.04)]">
                                  {sp}
                                </span>
                              ))}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Right: Pricing (1 col) */}
                    <div className="lg:col-span-1">
                      <h4 className="font-bold text-gray-800 text-sm mb-3 flex items-center gap-1">
                        <span className="text-base">💰</span>
                        الرسوم
                      </h4>
                      <div className="rounded-xl overflow-hidden border border-gray-200">
                        <div className="bg-gray-50 px-3 py-2 text-[10px] font-bold text-gray-500 border-b border-gray-200 grid grid-cols-2 gap-2">
                          <span>RM</span>
                          <span>€</span>
                        </div>
                        {uni.pricing.map((p) => (
                          <div key={p.label} className="px-3 py-2 border-b border-gray-100 last:border-0 hover:bg-gray-50 transition-colors">
                            <div className="text-[10px] font-bold text-gray-600 mb-1">{p.label}
                              <span className="font-normal text-gray-400 ml-1">— {p.note}</span>
                            </div>
                            <div className="grid grid-cols-2 gap-1">
                              <span className="text-[11px] font-bold text-green-700">{p.rm}</span>
                              <span className="text-[11px] font-bold text-blue-600">€{p.eur}</span>
                            </div>
                          </div>
                        ))}
                      </div>
                      <p className="text-[10px] text-gray-400 mt-1.5 text-center">* أسعار تقديرية</p>
                    </div>
                  </div>

                  {/* ── CTA row ── */}
                  <div className="mt-5 pt-5 border-t border-gray-100 flex flex-wrap gap-2">
                    {uni.coursePage && (
                      <button
                        onClick={() => go(uni.coursePage)}
                        className={`flex items-center gap-1.5 ${a.badge} ${a.badgeText} hover:opacity-90 px-4 py-2 rounded-full text-xs font-bold transition-all shadow-sm hover:-translate-y-0.5`}
                      >
                        <BookOpen size={12} />
                        استعرض التخصصات والأسعار
                      </button>
                    )}
                    <button
                      onClick={() => { sessionStorage.setItem("formOpened", "1"); window.open(GOOGLE_FORM_URL, "_blank"); }}
                      className="flex items-center gap-1.5 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-full text-xs font-bold transition-all shadow-sm hover:-translate-y-0.5"
                    >
                      <ExternalLink size={12} />
                      طلب Offer Letter من {uni.name}
                    </button>
                    <a
                      href={WA_LINK}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1.5 bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-full text-xs font-bold transition-all"
                    >
                      استشارة مجانية
                    </a>
                  </div>
                </div>
              </div>
            </section>
          );
        })}
      </div>

      {/* ── Bottom CTA ── */}
      <div className="bg-gradient-to-br from-[#0a2e14] via-[#0f4d22] to-[#166534] text-white py-20 px-4 text-center">
        <GraduationCap size={44} className="mx-auto mb-4 text-green-300 opacity-80" />
        <h2 className="text-3xl font-black mb-3">لم تجد ما تبحث عنه؟</h2>
        <p className="text-green-100/80 mb-8 max-w-xl mx-auto text-lg leading-relaxed">
          تواصل معنا مجاناً وسنجد لك أفضل جامعة تناسب وضعك ومستواك وميزانيتك
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <button
            onClick={() => { sessionStorage.setItem("formOpened", "1"); window.open(GOOGLE_FORM_URL, "_blank"); }}
            className="inline-flex items-center justify-center gap-2 bg-white text-green-800 hover:bg-green-50 px-8 py-4 rounded-full font-bold text-base shadow-xl hover:-translate-y-0.5 transition-all"
          >
            <span>📄</span>
            اطلب Offer Letter الآن
          </button>
          <a
            href={WA_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 border-2 border-white/30 hover:border-white/60 text-white hover:bg-white/10 px-8 py-4 rounded-full font-semibold text-base transition-all"
          >
            تواصل عبر واتساب
          </a>
        </div>
      </div>
    </div>
  );
}
