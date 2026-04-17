export type Lang = "ar" | "en" | "fr";

export const translations = {
  // ─── Navbar ───────────────────────────────────────────────
  nav: {
    home:         { ar: "الرئيسية",     en: "Home",          fr: "Accueil" },
    about:        { ar: "من نحن",       en: "About",         fr: "À propos" },
    services:     { ar: "خدماتنا",      en: "Services",      fr: "Services" },
    universities: { ar: "الجامعات",     en: "Universities",  fr: "Universités" },
    institutes:   { ar: "المعاهد",      en: "Institutes",    fr: "Instituts" },
    contact:      { ar: "تواصل معنا",   en: "Contact",       fr: "Contact" },
    search:       { ar: "ابحث عن تخصص", en: "Search Course", fr: "Chercher un cours" },
    consult:      { ar: "استشارة مجانية", en: "Free Consult", fr: "Consultation" },
    start:        { ar: "ابدأ الآن",    en: "Get Started",   fr: "Commencer" },
  },

  // ─── Hero ─────────────────────────────────────────────────
  hero: {
    badge:    { ar: "🇩🇿 من الجزائر إلى ماليزيا 🇲🇾", en: "🇩🇿 Algeria to Malaysia 🇲🇾", fr: "🇩🇿 Algérie vers Malaisie 🇲🇾" },
    title1:   { ar: "ابدأ مستقبلك",    en: "Start Your",       fr: "Commencez" },
    title2:   { ar: "الأكاديمي",       en: "Academic",         fr: "votre avenir" },
    title3:   { ar: "في قلب ماليزيا", en: "Future in Malaysia", fr: "en Malaisie" },
    subtitle: {
      ar: "نساعد الطلاب الجزائريين على الدراسة في أفضل المعاهد والجامعات الماليزية. استشارة مجانية — نرافقك حتى تطأ أرض ماليزيا.",
      en: "We help Algerian students study at top Malaysian institutes and universities. Free consultation — we guide you every step of the way.",
      fr: "Nous aidons les étudiants algériens à étudier dans les meilleures universités et instituts de Malaisie. Consultation gratuite — nous vous accompagnons jusqu'en Malaisie.",
    },
    cta1:   { ar: "ابدأ رحلتك الآن ←", en: "Start Your Journey →", fr: "Commencez maintenant →" },
    cta2:   { ar: "اعرف أكثر",          en: "Learn More",           fr: "En savoir plus" },
  },

  // ─── Stats ────────────────────────────────────────────────
  stats: {
    unis:     { ar: "جامعة معتمدة",  en: "Partner Universities", fr: "Universités partenaires" },
    insts:    { ar: "معاهد معتمدة",  en: "Certified Institutes",  fr: "Instituts certifiés" },
    students: { ar: "طالب سافر",     en: "Students Enrolled",     fr: "Étudiants inscrits" },
    free:     { ar: "استشارة مجانية", en: "Free Consultation",    fr: "Consultation gratuite" },
    freeVal:  { ar: "100%",           en: "100%",                  fr: "100%" },
  },

  // ─── Services section ─────────────────────────────────────
  services: {
    badge:    { ar: "خدماتنا",       en: "Our Services",      fr: "Nos Services" },
    title:    { ar: "كيف نساعدك؟",  en: "How We Help You",   fr: "Comment nous vous aidons ?" },
    subtitle: { ar: "نتولى كل شيء من الاستشارة حتى السفر", en: "We handle everything from consultation to arrival", fr: "Nous gérons tout de la consultation à l'arrivée" },
    trackTitle: { ar: "اختر مسارك التعليمي", en: "Choose Your Educational Path", fr: "Choisissez votre parcours" },
    trackSub:   { ar: "مسارات واضحة — مساعدة مخصصة لكل طالب", en: "Clear paths — personalized help for every student", fr: "Des parcours clairs — aide personnalisée pour chaque étudiant" },
    instLabel:  { ar: "معهد اللغة الإنجليزية", en: "English Language Institute", fr: "Institut de langue anglaise" },
    instDesc:   { ar: "IELTS، إنجليزي عام، أعمال، أطفال", en: "IELTS, General English, Business, Kids", fr: "IELTS, anglais général, affaires, enfants" },
    instCta:    { ar: "ابحث عن معهدك الأنسب →", en: "Find Your Best Institute →", fr: "Trouvez votre institut idéal →" },
    uniLabel:   { ar: "القبول الجامعي", en: "University Admission", fr: "Admission universitaire" },
    uniDesc:    { ar: "بكالوريوس، ماستر، دكتوراه", en: "Bachelor, Master, PhD", fr: "Licence, Master, Doctorat" },
    uniCta:     { ar: "تقديم طلب القبول →", en: "Apply for Admission →", fr: "Postuler à l'université →" },
  },

  // ─── Institute Track ──────────────────────────────────────
  instTrack: {
    label:   { ar: "المسار الأول", en: "Track 1", fr: "Parcours 1" },
    title:   { ar: "معاهد اللغة الإنجليزية", en: "English Language Institutes", fr: "Instituts de langue anglaise" },
    desc:    { ar: "4 معاهد معتمدة في قلب كوالالمبور — IELTS، إنجليزي عام، أعمال، وأطفال", en: "4 certified institutes in central KL — IELTS, General English, Business, Kids", fr: "4 instituts certifiés au cœur de KL — IELTS, anglais général, affaires, enfants" },
    quizBadge: { ar: "اكتشف الأنسب لك", en: "Find Your Best Match", fr: "Trouvez le meilleur pour vous" },
    quizTitle: { ar: "أجب على 3 أسئلة — نجد لك أفضل معهد", en: "Answer 3 questions — we find your best institute", fr: "Répondez à 3 questions — nous trouvons votre meilleur institut" },
    quizSub:   { ar: "بناءً على هدفك وميزانيتك ومدة إقامتك", en: "Based on your goal, budget and duration", fr: "Selon vos objectifs, budget et durée" },
    cta1:    { ar: "ابدأ طلب التسجيل", en: "Start Application", fr: "Commencer l'inscription" },
    cta2:    { ar: "استشارة مجانية",   en: "Free Consultation", fr: "Consultation gratuite" },
  },

  // ─── University Track ─────────────────────────────────────
  uniTrack: {
    label:     { ar: "المسار الثاني",   en: "Track 2",            fr: "Parcours 2" },
    title:     { ar: "القبول الجامعي", en: "University Admission", fr: "Admission universitaire" },
    desc:      { ar: "12 جامعة ماليزية معتمدة — بكالوريوس، ماستر، دكتوراه — نتولى القبول والتأشيرة كاملاً", en: "12 certified Malaysian universities — Bachelor, Master, PhD — full admission & visa support", fr: "12 universités malaises certifiées — Licence, Master, Doctorat — admission et visa complets" },
    bannerTitle: { ar: "ابدأ بنموذج القبول الجامعي الرسمي", en: "Start the Official University Admission Form", fr: "Commencez le formulaire d'admission officiel" },
    bannerSub:   { ar: "أكثر من 2,000 تخصص — فريقنا يراجع طلبك ويتواصل معك خلال 24 ساعة", en: "Over 2,000 majors — our team reviews and contacts you within 24 hours", fr: "Plus de 2 000 spécialités — notre équipe vous contacte sous 24 heures" },
    formCta:     { ar: "📋 ابدأ نموذج القبول", en: "📋 Start Admission Form", fr: "📋 Commencer le formulaire" },
    exploreCta:  { ar: "استكشف الجامعات",       en: "Explore Universities",  fr: "Explorer les universités" },
  },

  // ─── Quiz ─────────────────────────────────────────────────
  quiz: {
    back:       { ar: "رجوع",              en: "Back",              fr: "Retour" },
    change:     { ar: "تغيير",             en: "Change",            fr: "Modifier" },
    restart:    { ar: "البدء من جديد",     en: "Start Over",        fr: "Recommencer" },
    prevQ:      { ar: "السؤال السابق",     en: "Previous Question", fr: "Question précédente" },
    remaining:  { ar: "سؤال متبقي",        en: "question left",     fr: "question restante" },
    lastQ:      { ar: "آخر سؤال",          en: "Last Question",     fr: "Dernière question" },
    bestMatch:  { ar: "المعاهد الأنسب لك", en: "Best Institutes for You", fr: "Meilleurs instituts pour vous" },
    best:       { ar: "الأنسب ✓",          en: "Best Match ✓",     fr: "Meilleur choix ✓" },
    alt:        { ar: "بديل جيد",          en: "Good Alternative",  fr: "Bonne alternative" },
    match:      { ar: "توافق",              en: "match",             fr: "correspondance" },
    details:    { ar: "عرض التفاصيل",      en: "View Details",      fr: "Voir les détails" },
    whatsapp:   { ar: "واتساب",             en: "WhatsApp",          fr: "WhatsApp" },
    noResult:   { ar: "لم يتم العثور على معهد مناسب — حاول تغيير الإجابات", en: "No matching institute found — try different answers", fr: "Aucun institut trouvé — essayez d'autres réponses" },
    q1: {
      q:   { ar: "ما هدفك الأساسي من الدراسة؟",    en: "What is your main study goal?",       fr: "Quel est votre objectif principal ?" },
      sub: { ar: "اختر ما يصف هدفك بدقة",            en: "Choose what best describes your goal", fr: "Choisissez ce qui décrit le mieux votre objectif" },
      general:  { ar: "تحسين الإنجليزية العامة",     en: "Improve General English",   fr: "Améliorer l'anglais général" },
      ielts:    { ar: "التحضير لاختبار IELTS",        en: "IELTS Preparation",          fr: "Préparation au IELTS" },
      business: { ar: "إنجليزية الأعمال",             en: "Business English",           fr: "Anglais des affaires" },
      kids:     { ar: "برامج الأطفال والناشئين",      en: "Kids & Youth Programs",      fr: "Programmes enfants et jeunes" },
      generalD:  { ar: "بناء مهارات التواصل والطلاقة",          en: "Build communication skills and fluency",    fr: "Développer la communication et la fluidité" },
      ieltsD:    { ar: "الحصول على درجة مرتفعة للجامعة أو الهجرة", en: "Get a high score for university or immigration", fr: "Obtenir un score élevé pour l'université ou l'immigration" },
      businessD: { ar: "للبيئات المهنية والشركات",              en: "For professional environments and companies", fr: "Pour les environnements professionnels" },
      kidsD:     { ar: "من 7 إلى 17 سنة",                       en: "Ages 7 to 17",                               fr: "De 7 à 17 ans" },
    },
    q2: {
      q:   { ar: "كم مدة الدراسة المتوقعة؟",                   en: "How long do you plan to study?",      fr: "Quelle est la durée de votre séjour ?" },
      sub: { ar: "ملاحظة: 4 أشهر فأكثر تستلزم تأشيرة طالب",    en: "Note: 4+ months require a student visa", fr: "Note: 4 mois+ nécessitent un visa étudiant" },
      short:  { ar: "1 إلى 3 أشهر",  en: "1 to 3 months",  fr: "1 à 3 mois" },
      mid:    { ar: "4 إلى 6 أشهر",  en: "4 to 6 months",  fr: "4 à 6 mois" },
      long:   { ar: "7 أشهر فأكثر",  en: "7 months or more", fr: "7 mois ou plus" },
      shortD: { ar: "تأشيرة سياحية تكفي — لا تأشيرة طالب", en: "Tourist visa is enough — no student visa", fr: "Visa touristique suffisant — pas de visa étudiant" },
      midD:   { ar: "تأشيرة طالب ضرورية — نتولى إجراءاتها", en: "Student visa required — we handle the process", fr: "Visa étudiant requis — nous gérons la procédure" },
      longD:  { ar: "إقامة طلابية كاملة — تأشيرة طالب",     en: "Full student residency — student visa",         fr: "Résidence étudiante complète — visa étudiant" },
    },
    q3: {
      q:   { ar: "ما ميزانيتك التقريبية للدراسة؟",             en: "What is your approximate study budget?",       fr: "Quel est votre budget approximatif ?" },
      sub: { ar: "رسوم التسجيل فقط — بدون احتساب السكن والمعيشة", en: "Tuition fees only — excluding accommodation", fr: "Frais de scolarité uniquement — hébergement non inclus" },
      low:    { ar: "أقل من 10,000 RM",   en: "Under 10,000 RM",      fr: "Moins de 10 000 RM" },
      mid:    { ar: "10,000 – 25,000 RM", en: "10,000 – 25,000 RM",   fr: "10 000 – 25 000 RM" },
      high:   { ar: "أكثر من 25,000 RM", en: "Over 25,000 RM",        fr: "Plus de 25 000 RM" },
      lowD:   { ar: "≈ أقل من 2,000 €",  en: "≈ Under €2,000",        fr: "≈ Moins de 2 000 €" },
      midD:   { ar: "≈ 2,000 – 5,000 €", en: "≈ €2,000 – €5,000",     fr: "≈ 2 000 – 5 000 €" },
      highD:  { ar: "≈ أكثر من 5,000 €", en: "≈ Over €5,000",         fr: "≈ Plus de 5 000 €" },
    },
  },

  // ─── Apply Page ───────────────────────────────────────────
  apply: {
    title:      { ar: "ابدأ رحلتك التعليمية",   en: "Start Your Educational Journey",   fr: "Commencez votre parcours" },
    subtitle:   { ar: "اختر المسار الذي تريده في ماليزيا", en: "Choose your path in Malaysia", fr: "Choisissez votre voie en Malaisie" },
    free:       { ar: "كلا المسارين مجانيان — بدون رسوم استشارة", en: "Both paths are free — no consultation fees", fr: "Les deux parcours sont gratuits — sans frais de conseil" },
    instLabel:  { ar: "معهد اللغة الإنجليزية",  en: "English Language Institute",       fr: "Institut de langue anglaise" },
    instSub:    { ar: "IELTS · إنجليزي عام · أعمال · أطفال", en: "IELTS · General · Business · Kids", fr: "IELTS · Général · Affaires · Enfants" },
    instHint:   { ar: "✦ نساعدك تختار الأنسب لك", en: "✦ We help you find the best fit", fr: "✦ Nous vous aidons à trouver le meilleur" },
    uniLabel:   { ar: "القبول الجامعي",           en: "University Admission",             fr: "Admission universitaire" },
    uniSub:     { ar: "بكالوريوس · ماستر · دكتوراه", en: "Bachelor · Master · PhD",      fr: "Licence · Master · Doctorat" },
    uniHint:    { ar: "✦ تعبئة نموذج القبول الرسمي", en: "✦ Fill the official admission form", fr: "✦ Remplir le formulaire officiel" },
    back:       { ar: "الرئيسية", en: "Home", fr: "Accueil" },
    backStep:   { ar: "رجوع",     en: "Back",  fr: "Retour" },
    next:       { ar: "التالي",   en: "Next",  fr: "Suivant" },
    recs:       { ar: "عرض التوصيات", en: "Show Recommendations", fr: "Afficher les recommandations" },
  },

  // ─── Consultation ─────────────────────────────────────────
  consult: {
    freeLabel: { ar: "مجانية — 30 دقيقة",     en: "Free — 30 minutes",         fr: "Gratuite — 30 minutes" },
    title:     { ar: "احجز استشارتك المجانية", en: "Book Your Free Consultation", fr: "Réservez votre consultation gratuite" },
    subtitle:  { ar: "أجب على بعض الأسئلة حتى نتمكن من تقديم أفضل استشارة لك", en: "Answer a few questions so we can provide the best advice", fr: "Répondez à quelques questions pour que nous puissions vous aider au mieux" },
    backHome:  { ar: "العودة للرئيسية", en: "Back to Home", fr: "Retour à l'accueil" },
  },

  // ─── Search ───────────────────────────────────────────────
  search: {
    title:       { ar: "ابحث عن تخصصك",   en: "Search Your Major",        fr: "Recherchez votre spécialité" },
    subtitle:    { ar: "أكثر من 2,000 تخصص في 12 جامعة ماليزية معتمدة", en: "Over 2,000 majors in 12 certified Malaysian universities", fr: "Plus de 2 000 spécialités dans 12 universités malaises certifiées" },
    placeholder: { ar: "اكتب اسم التخصص أو الجامعة...", en: "Type a major name or university...", fr: "Tapez un nom de spécialité ou université..." },
    backHome:    { ar: "الرئيسية",         en: "Home",                     fr: "Accueil" },
    startNow:    { ar: "ابدأ البحث الآن",  en: "Start Searching Now",      fr: "Commencez à chercher maintenant" },
    startSub:    { ar: "اكتب اسم التخصص الذي تبحث عنه وستظهر لك النتائج من جميع الجامعات فوراً", en: "Type the major you're looking for and results from all universities will appear instantly", fr: "Tapez la spécialité que vous cherchez et les résultats s'affichent instantanément" },
    searching:   { ar: "جارٍ البحث...",    en: "Searching...",              fr: "Recherche en cours..." },
    noResults:   { ar: "لا توجد نتائج لـ", en: "No results for",           fr: "Aucun résultat pour" },
    noResultsSub: { ar: "حاول باسم آخر أو اكتب بالإنجليزية", en: "Try a different name or search in English", fr: "Essayez un autre nom ou cherchez en anglais" },
  },

  // ─── Common ───────────────────────────────────────────────
  common: {
    from:      { ar: "تبدأ من",     en: "from",    fr: "à partir de" },
    month:     { ar: "شهر",         en: "month",   fr: "mois" },
    year:      { ar: "سنة",         en: "year",    fr: "an" },
    total:     { ar: "الإجمالي",    en: "Total",   fr: "Total" },
    details:   { ar: "التفاصيل",    en: "Details", fr: "Détails" },
    viewPrices: { ar: "عرض الأسعار", en: "View Prices", fr: "Voir les tarifs" },
    whatsapp:  { ar: "واتساب",      en: "WhatsApp", fr: "WhatsApp" },
    apply:     { ar: "ابدأ التقديم", en: "Apply Now", fr: "Postuler" },
    loading:   { ar: "جارٍ التحميل...", en: "Loading...", fr: "Chargement..." },
  },

  // ─── Footer / Contact ─────────────────────────────────────
  contact: {
    badge:   { ar: "تواصل معنا",    en: "Contact Us",    fr: "Contactez-nous" },
    title:   { ar: "نحن هنا لمساعدتك", en: "We're Here to Help", fr: "Nous sommes là pour vous" },
    subtitle: { ar: "تواصل معنا عبر أي من القنوات التالية", en: "Reach us through any of these channels", fr: "Contactez-nous via l'un de ces canaux" },
    whatsapp: { ar: "تواصل عبر واتساب", en: "WhatsApp Us", fr: "Nous contacter via WhatsApp" },
    consult:  { ar: "احجز استشارة مجانية", en: "Book Free Consultation", fr: "Réserver une consultation gratuite" },
  },
} as const;

export type TranslationKey = typeof translations;
