import { createContext, useContext } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setLanguage } from "../store/store";

const translations = {
  // Navigation
  dashboard: { ar: "لوحة التحكم", en: "Dashboard" },
  overview: { ar: "نظرة عامة", en: "Overview" },
  analysis: { ar: "تحليل مفصل", en: "Detailed Analysis" },
  predictions: { ar: "التنبؤات الذكية", en: "AI Predictions" },
  calculator: { ar: "حاسبة التكلفة", en: "Cost Calculator" },
  reports: { ar: "التقارير", en: "Reports" },
  alerts: { ar: "التنبيهات", en: "Alerts" },
  goals: { ar: "الأهداف والخطط", en: "Goals & Planning" },
  maintenance: { ar: "الصيانة الذكية", en: "Smart Maintenance" },
  standards: { ar: "المعايير الدولية", en: "International Standards" },
  comparison: { ar: "المقارنة", en: "Comparison" },
  energySources: { ar: "مصادر الطاقة", en: "Energy Sources" },
  factoryZones: { ar: "مناطق المصنع", en: "Factory Zones" },
  about: { ar: "حول", en: "About" },

  // Energy Management Platform
  platformTitle: {
    ar: "منصة إدارة الطاقة الذكية",
    en: "Energy Intelligence Platform",
  },
  platformSubtitle: {
    ar: "Energy Intelligence Platform",
    en: "Smart Energy Management",
  },

  // Stats
  totalConsumption: { ar: "إجمالي الاستهلاك", en: "Total Consumption" },
  efficiency: { ar: "الكفاءة", en: "Efficiency" },
  monthlyCost: { ar: "التكلفة الشهرية", en: "Monthly Cost" },
  renewableEnergy: { ar: "الطاقة المتجددة", en: "Renewable Energy" },
  lossPercentage: { ar: "نسبة الهالك", en: "Loss Percentage" },
  powerFactor: { ar: "معامل القدرة", en: "Power Factor" },
  co2Emissions: { ar: "انبعاثات CO2", en: "CO2 Emissions" },

  // Units
  kwh: { ar: "ك.و.س", en: "kWh" },
  egp: { ar: "ج.م", en: "EGP" },
  percent: { ar: "%", en: "%" },
  kg: { ar: "كجم", en: "kg" },
  kw: { ar: "ك.و", en: "kW" },
  voltage: { ar: "فولت", en: "V" },
  current: { ar: "أمبير", en: "A" },

  // Time periods
  daily: { ar: "يومي", en: "Daily" },
  weekly: { ar: "أسبوعي", en: "Weekly" },
  monthly: { ar: "شهري", en: "Monthly" },
  yearly: { ar: "سنوي", en: "Yearly" },

  // Days of week
  saturday: { ar: "السبت", en: "Saturday" },
  sunday: { ar: "الأحد", en: "Sunday" },
  monday: { ar: "الاثنين", en: "Monday" },
  tuesday: { ar: "الثلاثاء", en: "Tuesday" },
  wednesday: { ar: "الأربعاء", en: "Wednesday" },
  thursday: { ar: "الخميس", en: "Thursday" },
  friday: { ar: "الجمعة", en: "Friday" },

  // Months
  january: { ar: "يناير", en: "January" },
  february: { ar: "فبراير", en: "February" },
  march: { ar: "مارس", en: "March" },
  april: { ar: "أبريل", en: "April" },
  may: { ar: "مايو", en: "May" },
  june: { ar: "يونيو", en: "June" },
  july: { ar: "يوليو", en: "July" },
  august: { ar: "أغسطس", en: "August" },
  september: { ar: "سبتمبر", en: "September" },
  october: { ar: "أكتوبر", en: "October" },
  november: { ar: "نوفمبر", en: "November" },
  december: { ar: "ديسمبر", en: "December" },

  // Energy Sources
  solar: { ar: "طاقة شمسية", en: "Solar" },
  wind: { ar: "طاقة رياح", en: "Wind" },
  generator: { ar: "مولدات", en: "Generator" },
  grid: { ar: "الشبكة العامة", en: "Grid" },

  // Status
  connected: { ar: "متصل", en: "Connected" },
  disconnected: { ar: "غير متصل", en: "Disconnected" },
  normal: { ar: "طبيعي", en: "Normal" },
  high: { ar: "مرتفع", en: "High" },
  low: { ar: "منخفض", en: "Low" },
  critical: { ar: "حرج", en: "Critical" },

  // Actions
  export: { ar: "تصدير البيانات", en: "Export Data" },
  calculate: { ar: "حساب النتائج", en: "Calculate Results" },
  optimize: { ar: "تحسين", en: "Optimize" },
  applyRecommendation: { ar: "تطبيق التوصية", en: "Apply Recommendation" },
  viewDetails: { ar: "عرض التفاصيل", en: "View Details" },
  save: { ar: "حفظ", en: "Save" },
  cancel: { ar: "إلغاء", en: "Cancel" },

  // AI & Predictions
  aiPredictions: {
    ar: "التنبؤات الذكية للشهر القادم",
    en: "AI Predictions for Next Month",
  },
  aiRecommendations: { ar: "التوصيات الذكية", en: "Smart Recommendations" },
  predictionAccuracy: { ar: "دقة التنبؤ", en: "Prediction Accuracy" },
  confidenceLevel: { ar: "مستوى الثقة", en: "Confidence Level" },

  // Factory Zones
  productionLine: { ar: "خط الإنتاج الرئيسي", en: "Main Production Line" },
  hvacSystem: { ar: "نظام التكييف والتهوية", en: "HVAC System" },
  lightingSystem: { ar: "نظام الإضاءة", en: "Lighting System" },
  utilities: { ar: "المرافق العامة", en: "General Utilities" },

  // Priority levels
  highPriority: { ar: "عالية", en: "High" },
  mediumPriority: { ar: "متوسطة", en: "Medium" },
  lowPriority: { ar: "منخفضة", en: "Low" },

  // Comparison
  ourFactory: { ar: "مصنعنا", en: "Our Factory" },
  industryAverage: { ar: "متوسط الصناعة", en: "Industry Average" },
  bestInClass: { ar: "الأفضل في الفئة", en: "Best in Class" },
  ranking: { ar: "الترتيب", en: "Ranking" },

  // About page
  aboutTitle: { ar: "حول المطور", en: "About Developer" },
  developerName: { ar: "أحمد بدوي", en: "Ahmed Badawy" },
  developerTitle: { ar: "مطور ويب", en: "Web Developer" },
  aboutDescription: {
    ar: "مطور ويب متخصص في تطوير منصات إدارة الطاقة الذكية",
    en: "Web developer specialized in smart energy management platforms",
  },
};

const LanguageContext = createContext(undefined);

export function LanguageProvider({ children }) {
  const language = useSelector((state) => state.app.language);
  const dispatch = useDispatch();

  const t = (key) => {
    return translations[key]?.[language] || key;
  };

  const changeLanguage = (lang) => {
    dispatch(setLanguage(lang));
  };

  const dir = language === "ar" ? "rtl" : "ltr";

  return (
    <LanguageContext.Provider value={{ language, t, changeLanguage, dir }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}
