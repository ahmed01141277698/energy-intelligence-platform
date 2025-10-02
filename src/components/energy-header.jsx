import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Switch } from "./ui/switch";
import { useState } from "react";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Link } from "react-router-dom";
import { Bell, Settings, User, Zap, Moon, Sun } from "lucide-react";
import { motion } from "motion/react";
import { useSelector, useDispatch } from "react-redux";
import { toggleDarkMode } from "../store/store";
import { useLanguage } from "../contexts/LanguageContext";
import { useEffect } from "react";
import NetworkStatus from "./ui/NetworkStatus";
export function EnergyHeader() {
  const dispatch = useDispatch();
  const darkMode = useSelector((state) => state.app.darkMode);
  const { t, language, changeLanguage, dir } = useLanguage();

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  const handleThemeToggle = () => {
    dispatch(toggleDarkMode());
  };

  const handleLanguageChange = (value) => {
    changeLanguage(value);
  };

  const [activeAlerts, setActiveAlerts] = useState([
    {
      id: 1,
      type: "critical",
      title: "تجاوز الحد الأقصى للاستهلاك",
      description: "استهلاك قسم الإنتاج تجاوز الحد المسموح بنسبة 15%",
      time: "10:30 ص",
      date: "اليوم",
      source: "قسم الإنتاج",
      isRead: false,
      impact: "عالي",
      action: "مطلوب تدخل فوري",
    },
    {
      id: 2,
      type: "warning",
      title: "انخفاض كفاءة المعدات",
      description: "كفاءة محرك التبريد الرئيسي انخفضت إلى 75%",
      time: "09:45 ص",
      date: "اليوم",
      source: "نظام التكييف",
      isRead: false,
      impact: "متوسط",
      action: "جدولة صيانة",
    },
    {
      id: 3,
      type: "info",
      title: "تحسن في إنتاج الطاقة الشمسية",
      description: "زيادة إنتاج الطاقة الشمسية بنسبة 20% بسبب الطقس المثالي",
      time: "08:15 ص",
      date: "اليوم",
      source: "الطاقة المتجددة",
      isRead: true,
      impact: "منخفض",
      action: "للعلم",
    },
    {
      id: 4,
      type: "warning",
      title: "تذبذب في معامل القدرة",
      description: "معامل القدرة انخفض إلى 0.82 في الدائرة الرئيسية",
      time: "07:30 ص",
      date: "اليوم",
      source: "النظام الكهربائي",
      isRead: true,
      impact: "متوسط",
      action: "فحص المكثفات",
    },
    {
      id: 5,
      type: "success",
      title: "تحقيق هدف التوفير",
      description: "تم تحقيق هدف توفير 300 ج.م هذا الشهر",
      time: "06:00 ص",
      date: "اليوم",
      source: "النظام المالي",
      isRead: true,
      impact: "إيجابي",
      action: "تهنئة",
    },
  ]);

  const markAsRead = (alertId) => {
    setActiveAlerts((prev) =>
      prev.map((alert) =>
        alert.id === alertId ? { ...alert, isRead: true } : alert
      )
    );
  };

  const dismissAlert = (alertId) => {
    setActiveAlerts((prev) => prev.filter((alert) => alert.id !== alertId));
  };

  const markAllAsRead = () => {
    setActiveAlerts((prev) =>
      prev.map((alert) => ({ ...alert, isRead: true }))
    );
  };
  const unreadCount = activeAlerts.filter((alert) => !alert.isRead).length;

  return (
    <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50 ">
      <div className="container mx-auto px-4 py-4  ">
        <div className="flex items-center justify-between">
          {/* Logo and Title */}
          <motion.div
            className="flex items-center gap-3"
            initial={{ opacity: 0, x: dir === "rtl" ? 20 : -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <motion.div
              className="bg-gradient-to-br from-blue-600 to-blue-700 p-2 rounded-xl shadow-lg"
              whileHover={{ scale: 1.05, rotate: 5 }}
              whileTap={{ scale: 0.95 }}
            >
              <Zap className="h-6 w-6 text-white" />
            </motion.div>
            <div>
              <h1 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
                {t("platformTitle")}
              </h1>
              <p className="text-sm text-muted-foreground">
                {t("platformSubtitle")}
              </p>
            </div>
          </motion.div>

          {/* Status and Controls */}
          <motion.div
            className="flex items-center gap-4"
            initial={{ opacity: 0, x: dir === "rtl" ? -20 : 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            {/* Language Selector */}
            <Select value={language} onValueChange={handleLanguageChange}>
              <SelectTrigger className="w-20">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="ar">العربية</SelectItem>
                <SelectItem value="en">English</SelectItem>
              </SelectContent>
            </Select>

            {/* Dark Mode Toggle */}
            <div className="flex items-center gap-2">
              <Sun className="h-4 w-4" />
              <Switch checked={darkMode} onCheckedChange={handleThemeToggle} />
              <Moon className="h-4 w-4" />
            </div>

            {/* Connection Status */}
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Badge variant="outline">
                <motion.div
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
                <NetworkStatus />
              </Badge>
            </motion.div>

            {/* Action Buttons */}

            <Link to={`/alerts`}>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button variant="ghost" size="icon" className="relative">
                  <div>
                    <Bell className="h-4 w-4" />
                    {unreadCount}
                  </div>

                  <motion.div
                    className="absolute -top-1 -right-1 h-3 w-3 bg-red-500 rounded-full"
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  />
                </Button>
              </motion.div>
            </Link>

            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button variant="ghost" size="icon">
                <Settings className="h-4 w-4" />
              </Button>
            </motion.div>
            <Link to={`/about`}>
              {" "}
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button variant="ghost" size="icon">
                  <User className="h-4 w-4" />
                </Button>
              </motion.div>
            </Link>
          </motion.div>
        </div>
      </div>
    </header>
  );
}
