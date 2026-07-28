
import { Language } from "../types";

export const translations = {
  ar: {
    appTitle: "نظام مواءمة النظرية الذكي",
    beta: "BETA v0.05",
    loadingProcessing: "جاري المعالجة الذكية",
    loadingWait: "يرجى الانتظار، يقوم النظام الآن بمعالجة البيانات واستدعاء النماذج العلمية...",
    loadingProgress: "التقدم",
    
    // Step Input
    inputTitle: "بيانات الدراسة الأساسية",
    inputSubtitle: "أدخل عنوان بحثك وحدد مجاله التأسيسي لنقوم بتحليله واقتراح النظريات العلمية الأنسب.",
    levelLabel: "1. المستوى الأكاديمي",
    levelBachelor: "بكالوريوس",
    levelMaster: "ماجستير",
    levelPhD: "دكتوراة",
    levelBachelorDesc: "دراسة تطبيقية",
    levelMasterDesc: "دراسة تحليلية",
    levelPhDDesc: "أصالة علمية",

    typeLabel: "2. نوع البحث",
    typeQuantitative: "بحث كمي",
    typeQualitative: "بحث كيفي",
    typeQuantitativeDesc: "بيانات رقمية وإحصاء",
    typeQualitativeDesc: "فهم متعمق واستكشاف",
    
    foundationLabel: "3. المجال التأسيسي للبحث",
    foundationSubLabel: "(على أي أساس علمي تبني دراستك؟)",
    foundationMedia: "إعلامي واتصال",
    foundationSocial: "اجتماعي",
    foundationEconomic: "اقتصادي",
    foundationEdu: "تربوي",
    foundationPsych: "نفسي",
    foundationAdmin: "إداري",
    foundationTech: "تقني/رقمي",
    foundationLegal: "قانوني",
    foundationHumanities: "إنساني ولغوي",
    foundationOther: "مجال آخر",

    titleLabel: "4. عنوان البحث المقترح",
    titlePlaceholder: "مثال: أثر استخدام تطبيقات الذكاء الاصطناعي التوليدي على الكفاءة البحثية لدى طلبة الدراسات العليا في مملكة البحرين...",
    charCount: "حرف",
    submitBtn: "بدء التحليل الذكي",
    submittingBtn: "جاري البدء...",
    backToLangBtn: "تغيير اللغة",

    // Step Theories
    theoriesTitle: "النظريات المقترحة",
    studyTitle: "عنوان الدراسة:",
    theoriesSubtitle: "",
    editTitleBtn: "تعديل العنوان",
    adoptTheoryBtn: "تحديد النظرية",
    unadoptTheoryBtn: "إلغاء التحديد",
    viewDetailsBtn: "عرض التفاصيل",
    theoryBackgroundLabel: "الخلفية الأكاديمية",
    theoryPrinciplesLabel: "المبادئ والأسس",
    theoryConceptsLabel: "المفاهيم الجوهرية",
    loadMoreBtn: "اقتراح نظريات أخرى",
    compareBtn: "مقارنة النظريات",
    proceedToHypotheses: "الانتقال لاختيار الفرضيات",
    backBtn: "العودة للخطوة السابقة",
    compareModalTitle: "مقارنة النظريات",
    compareModalSubtitle: "تحليل مقارن لمساعدتك في اتخاذ القرار الأنسب",
    comparingMsg: "جاري إجراء المقارنة الذكية...",
    comparingSubMsg: "يقوم الذكاء الاصطناعي الآن بوزن نقاط القوة والضعف لكل نظرية",
    compareErrorTitle: "تعذر إتمام المقارنة",
    retryBtn: "إعادة المحاولة",
    commonGround: "القواسم المشتركة",
    keyDifferences: "نقاط الاختلاف الجوهرية",
    pros: "نقاط القوة",
    cons: "التحديات",
    recommendation: "التوصية الذكية",

    // Step Hypotheses Picking
    hypothesesPickTitle: "اختيار الفرضيات الأساسية",
    hypothesesPickSubtitle: "بناءً على النظريات التي اخترتها، حدد الفرضيات العلمية (الأركان) التي ترغب في بناء دراستك عليها.",
    theoryAxiomsLabel: "الفرضيات الأساسية لنظرية:",
    noHypothesesSelected: "يرجى اختيار فرضية واحدة على الأقل للاستمرار.",
    generateReportBtn: "توليد التقرير النهائي",
    selectAll: "اختيار الكل",
    deselectAll: "إلغاء الكل",

    // Step Report
    reportTitle: "التقرير النهائي للمواءمة",
    exportWord: "تصدير Word",
    exportPDF: "تصدير PDF",
    newSearch: "بحث جديد",
    backToHypBtn: "تعديل الفرضيات",
    adoptedTheoryLabel: "النظريات المعتمدة:",
    justificationTitle: "مبررات المواءمة النظرية",
    ivLabel: "المتغير المستقل",
    dvLabel: "المتغير التابع",
    theoryHypotheses: "الفرضيات الأساسية المختارة",
    studyHypotheses: "فرضيات الدراسة المقترحة",
    conceptualFramework: "الإطار المفاهيمي المرئي",
    conceptualFrameworkDesc: "تمثيل بصري يوضح مسار التأثير من المتغير المستقل إلى المتغير التابع عبر العدسة النظرية المختارة.",
    disclaimerTitle: "تنويه وإخلاء مسؤولية",
    disclaimerText: "تم إنشاء هذا التقرير تلقائياً بواسطة نظام المواءمة النظرية الذكي عن طريق الذكاء الإصطناعي. قد يحتوي التقرير على أخطاء أو معلومات غير دقيقة، لذا يجب على المستخدم مراجعة المعلومات والتحقق من صحتها والتفاصيل الواردة واستخدامها على مسؤوليته الشخصية.",
    
    // Footer
    footerRights: "© مركز بو جود للاستشارات البحثية. جميع الحقوق محفوظة",
  },
  en: {
    appTitle: "Smart Theory Alignment System",
    beta: "BETA v0.05",
    loadingProcessing: "Smart Processing",
    loadingWait: "Please wait, the system is processing data and retrieving scientific models...",
    loadingProgress: "Progress",

    // Step Input
    inputTitle: "Basic Study Information",
    inputSubtitle: "Enter your research title and select its foundational field to analyze and suggest appropriate scientific theories.",
    levelLabel: "1. Academic Level",
    levelBachelor: "Bachelor",
    levelMaster: "Master",
    levelPhD: "PhD",
    levelBachelorDesc: "Applied Study",
    levelMasterDesc: "Analytical Study",
    levelPhDDesc: "Original Contribution",

    typeLabel: "2. Research Type",
    typeQuantitative: "Quantitative",
    typeQualitative: "Qualitative",
    typeQuantitativeDesc: "Numerical & Statistics",
    typeQualitativeDesc: "In-depth & Exploratory",

    foundationLabel: "3. Research Foundation",
    foundationSubLabel: "(What is the scientific basis of your study?)",
    foundationMedia: "Media & Comm",
    foundationSocial: "Social",
    foundationEconomic: "Economic",
    foundationEdu: "Educational",
    foundationPsych: "Psychological",
    foundationAdmin: "Administrative",
    foundationTech: "Tech/Digital",
    foundationLegal: "Legal",
    foundationHumanities: "Humanities & Linguistics",
    foundationOther: "Other",

    titleLabel: "4. Proposed Research Title",
    titlePlaceholder: "Example: The impact of Generative AI applications on research efficiency among postgraduate students in the Kingdom of Bahrain...",
    charCount: "chars",
    submitBtn: "Start Smart Analysis",
    submittingBtn: "Starting...",
    backToLangBtn: "Change Language",

    // Step Theories
    theoriesTitle: "Suggested Theories",
    studyTitle: "Study Title:",
    theoriesSubtitle: "",
    editTitleBtn: "Edit Title",
    adoptTheoryBtn: "Select Theory",
    unadoptTheoryBtn: "Deselect",
    viewDetailsBtn: "View Details",
    theoryBackgroundLabel: "Academic Background",
    theoryPrinciplesLabel: "Core Principles",
    theoryConceptsLabel: "Key Concepts",
    loadMoreBtn: "Suggest More Theories",
    compareBtn: "Compare Theories",
    proceedToHypotheses: "Proceed to Hypotheses",
    backBtn: "Go Back",
    compareModalTitle: "Theory Comparison",
    compareModalSubtitle: "Comparative analysis to help you decide",
    comparingMsg: "Running Smart Comparison...",
    comparingSubMsg: "AI is weighing pros and cons for each theory",
    compareErrorTitle: "Comparison Failed",
    retryBtn: "Retry",
    commonGround: "Common Ground",
    keyDifferences: "Key Differences",
    pros: "Strengths",
    cons: "Challenges",
    recommendation: "Smart Recommendation",

    // Step Hypotheses Picking
    hypothesesPickTitle: "Select Core Hypotheses",
    hypothesesPickSubtitle: "Based on your selected theories, pick the scientific axioms you want to build your study upon.",
    theoryAxiomsLabel: "Core Axioms of:",
    noHypothesesSelected: "Please select at least one hypothesis to continue.",
    generateReportBtn: "Generate Final Report",
    selectAll: "Select All",
    deselectAll: "Deselect All",

    // Step Report
    reportTitle: "Final Alignment Report",
    exportWord: "Export to Word",
    exportPDF: "Export PDF",
    newSearch: "New Search",
    backToHypBtn: "Edit Hypotheses",
    adoptedTheoryLabel: "Adopted Theories:",
    justificationTitle: "Theoretical Alignment Justification",
    ivLabel: "Independent Variable",
    dvLabel: "Dependent Variable",
    theoryHypotheses: "Selected Core Hypotheses",
    studyHypotheses: "Proposed Study Hypotheses",
    conceptualFramework: "Visual Conceptual Framework",
    conceptualFrameworkDesc: "A visual representation showing the influence path from the Independent Variable to the Dependent Variable via the selected theoretical lens.",
    disclaimerTitle: "Disclaimer",
    disclaimerText: "This report was automatically generated by the Smart Theory Alignment System using Artificial Intelligence. It may contain errors or inaccuracies. Users must verify the information and details at their own risk.",

    // Footer
    footerRights: "© Bu Jood Center for Research Consulting. All rights reserved",
  }
};

/**
 * Safely get the translation object for a given language.
 * Defaults to Arabic if the provided language is null or unsupported.
 */
export const getSafeTranslations = (lang: Language | null) => {
    if (!lang || !translations[lang]) {
        return translations.ar;
    }
    return translations[lang];
};
