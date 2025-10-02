import { useState } from "react";
import { motion } from "motion/react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Badge } from "../components/ui/badge";
import { Switch } from "../components/ui/switch";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select";
import {
  Bell,
  AlertTriangle,
  CheckCircle,
  Clock,
  Settings,
  Zap,
  TrendingUp,
  TrendingDown,
  AlertCircle,
  Info,
  X,
  Plus,
  Filter,
  Search,
} from "lucide-react";
import { useLanguage } from "../contexts/LanguageContext";

export function Alerts() {
  const { t } = useLanguage();
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

  const [alertSettings, setAlertSettings] = useState({
    realTimeAlerts: true,
    emailNotifications: true,
    smsAlerts: false,
    criticalOnly: false,
    consumptionThreshold: 2500,
    efficiencyThreshold: 80,
    costThreshold: 3000,
  });

  const [filterType, setFilterType] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.5,
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
      },
    },
  };

  const alertTypes = [
    { value: "all", label: "جميع التنبيهات", count: activeAlerts.length },
    {
      value: "critical",
      label: "حرجة",
      count: activeAlerts.filter((a) => a.type === "critical").length,
    },
    {
      value: "warning",
      label: "تحذير",
      count: activeAlerts.filter((a) => a.type === "warning").length,
    },
    {
      value: "info",
      label: "معلومات",
      count: activeAlerts.filter((a) => a.type === "info").length,
    },
    {
      value: "success",
      label: "نجاح",
      count: activeAlerts.filter((a) => a.type === "success").length,
    },
  ];

  const filteredAlerts = activeAlerts.filter((alert) => {
    const matchesType = filterType === "all" || alert.type === filterType;
    const matchesSearch =
      alert.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      alert.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesType && matchesSearch;
  });

  const getAlertIcon = (type) => {
    switch (type) {
      case "critical":
        return AlertTriangle;
      case "warning":
        return AlertCircle;
      case "info":
        return Info;
      case "success":
        return CheckCircle;
      default:
        return Bell;
    }
  };

  const getAlertColor = (type) => {
    switch (type) {
      case "critical":
        return "text-red-600";
      case "warning":
        return "text-orange-600";
      case "info":
        return "text-blue-600";
      case "success":
        return "text-green-600";
      default:
        return "text-gray-600";
    }
  };

  const getAlertBgColor = (type) => {
    switch (type) {
      case "critical":
        return "bg-red-50 dark:bg-red-950/30 border-red-200 dark:border-red-800";
      case "warning":
        return "bg-orange-50 dark:bg-orange-950/30 border-orange-200 dark:border-orange-800";
      case "info":
        return "bg-blue-50 dark:bg-blue-950/30 border-blue-200 dark:border-blue-800";
      case "success":
        return "bg-green-50 dark:bg-green-950/30 border-green-200 dark:border-green-800";
      default:
        return "bg-gray-50 dark:bg-gray-950/30 border-gray-200 dark:border-gray-800";
    }
  };

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
    <motion.div
      className="space-y-6"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Header */}
      <motion.div variants={itemVariants}>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="relative">
              <Bell className="h-8 w-8 text-orange-600" />
              {unreadCount > 0 && (
                <motion.div
                  className="absolute -top-1 -right-1 h-5 w-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center"
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  {unreadCount}
                </motion.div>
              )}
            </div>
            <div>
              <h1 className="text-2xl font-bold">التنبيهات الذكية</h1>
              <p className="text-muted-foreground">
                نظام تنبيهات متقدم لمراقبة أداء الطاقة في الوقت الفعلي
              </p>
            </div>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" onClick={markAllAsRead}>
              <CheckCircle className="h-4 w-4 mr-2" />
              تسجيل الكل كمقروء
            </Button>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              إضافة تنبيه مخصص
            </Button>
          </div>
        </div>
      </motion.div>

      {/* Alert Summary */}
      <motion.div variants={itemVariants}>
        <div className="grid gap-4 md:grid-cols-5">
          {alertTypes.map((type, index) => (
            <motion.div
              key={type.value}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              whileHover={{ scale: 1.02 }}
            >
              <Card
                className={`cursor-pointer transition-all ${
                  filterType === type.value ? "ring-2 ring-blue-500" : ""
                }`}
                onClick={() => setFilterType(type.value)}
              >
                <CardContent className="p-4 text-center">
                  <div className="text-2xl font-bold">{type.count}</div>
                  <div className="text-sm text-muted-foreground">
                    {type.label}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Search and Filter */}
      <motion.div variants={itemVariants}>
        <Card>
          <CardContent className="p-4">
            <div className="flex gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="البحث في التنبيهات..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Select value={filterType} onValueChange={setFilterType}>
                <SelectTrigger className="w-48">
                  <Filter className="h-4 w-4 mr-2" />
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {alertTypes.map((type) => (
                    <SelectItem key={type.value} value={type.value}>
                      {type.label} ({type.count})
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Main Content */}
      <motion.div variants={itemVariants}>
        <Tabs defaultValue="active" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="active">التنبيهات النشطة</TabsTrigger>
            <TabsTrigger value="settings">إعدادات التنبيهات</TabsTrigger>
            <TabsTrigger value="history">سجل التنبيهات</TabsTrigger>
          </TabsList>

          {/* Active Alerts */}
          <TabsContent value="active" className="space-y-4">
            {filteredAlerts.length === 0 ? (
              <Card>
                <CardContent className="p-8 text-center">
                  <CheckCircle className="h-12 w-12 mx-auto mb-4 text-green-600" />
                  <h3 className="text-lg font-semibold mb-2">
                    لا توجد تنبيهات
                  </h3>
                  <p className="text-muted-foreground">
                    {searchTerm
                      ? "لا توجد تنبيهات تطابق البحث"
                      : "جميع الأنظمة تعمل بشكل طبيعي"}
                  </p>
                </CardContent>
              </Card>
            ) : (
              filteredAlerts.map((alert, index) => {
                const IconComponent = getAlertIcon(alert.type);
                return (
                  <motion.div
                    key={alert.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                    whileHover={{ scale: 1.01 }}
                  >
                    <Card
                      className={`${getAlertBgColor(alert.type)} ${
                        !alert.isRead ? "border-l-4" : ""
                      }`}
                    >
                      <CardContent className="p-4">
                        <div className="flex items-start gap-4">
                          <motion.div
                            animate={
                              alert.type === "critical"
                                ? {
                                    scale: [1, 1.1, 1],
                                    rotate: [0, 5, -5, 0],
                                  }
                                : {}
                            }
                            transition={{ duration: 2, repeat: Infinity }}
                          >
                            <IconComponent
                              className={`h-6 w-6 ${getAlertColor(alert.type)}`}
                            />
                          </motion.div>

                          <div className="flex-1">
                            <div className="flex items-start justify-between">
                              <div>
                                <h3
                                  className={`font-semibold ${
                                    !alert.isRead
                                      ? "text-foreground"
                                      : "text-muted-foreground"
                                  }`}
                                >
                                  {alert.title}
                                </h3>
                                <p className="text-sm text-muted-foreground mt-1">
                                  {alert.description}
                                </p>
                                <div className="flex items-center gap-4 mt-2 text-xs text-muted-foreground">
                                  <span className="flex items-center gap-1">
                                    <Clock className="h-3 w-3" />
                                    {alert.time} - {alert.date}
                                  </span>
                                  <span>المصدر: {alert.source}</span>
                                  <Badge variant="outline" className="text-xs">
                                    {alert.impact}
                                  </Badge>
                                </div>
                              </div>

                              <div className="flex items-center gap-2">
                                {!alert.isRead && (
                                  <Button
                                    size="sm"
                                    variant="outline"
                                    onClick={() => markAsRead(alert.id)}
                                  >
                                    تسجيل كمقروء
                                  </Button>
                                )}
                                <Button
                                  size="sm"
                                  variant="ghost"
                                  onClick={() => dismissAlert(alert.id)}
                                >
                                  <X className="h-4 w-4" />
                                </Button>
                              </div>
                            </div>

                            {alert.action && (
                              <div className="mt-3 p-2 bg-background/50 rounded border">
                                <span className="text-sm font-medium">
                                  الإجراء المطلوب:{" "}
                                </span>
                                <span className="text-sm">{alert.action}</span>
                              </div>
                            )}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                );
              })
            )}
          </TabsContent>

          {/* Alert Settings */}
          <TabsContent value="settings" className="space-y-6">
            <div className="grid gap-6 lg:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Settings className="h-5 w-5 text-gray-600" />
                    إعدادات التنبيهات العامة
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label>التنبيهات الفورية</Label>
                      <p className="text-sm text-muted-foreground">
                        تلقي التنبيهات في الوقت الفعلي
                      </p>
                    </div>
                    <Switch
                      checked={alertSettings.realTimeAlerts}
                      onCheckedChange={(checked) =>
                        setAlertSettings((prev) => ({
                          ...prev,
                          realTimeAlerts: checked,
                        }))
                      }
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <Label>إشعارات البريد الإلكتروني</Label>
                      <p className="text-sm text-muted-foreground">
                        إرسال التنبيهات عبر البريد الإلكتروني
                      </p>
                    </div>
                    <Switch
                      checked={alertSettings.emailNotifications}
                      onCheckedChange={(checked) =>
                        setAlertSettings((prev) => ({
                          ...prev,
                          emailNotifications: checked,
                        }))
                      }
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <Label>تنبيهات SMS</Label>
                      <p className="text-sm text-muted-foreground">
                        إرسال التنبيهات الحرجة عبر الرسائل النصية
                      </p>
                    </div>
                    <Switch
                      checked={alertSettings.smsAlerts}
                      onCheckedChange={(checked) =>
                        setAlertSettings((prev) => ({
                          ...prev,
                          smsAlerts: checked,
                        }))
                      }
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <Label>التنبيهات الحرجة فقط</Label>
                      <p className="text-sm text-muted-foreground">
                        عرض التنبيهات عالية الأولوية فقط
                      </p>
                    </div>
                    <Switch
                      checked={alertSettings.criticalOnly}
                      onCheckedChange={(checked) =>
                        setAlertSettings((prev) => ({
                          ...prev,
                          criticalOnly: checked,
                        }))
                      }
                    />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Zap className="h-5 w-5 text-blue-600" />
                    حدود التنبيهات
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label>حد الاستهلاك الأقصى (kWh)</Label>
                    <Input
                      type="number"
                      value={alertSettings.consumptionThreshold}
                      onChange={(e) =>
                        setAlertSettings((prev) => ({
                          ...prev,
                          consumptionThreshold: Number(e.target.value),
                        }))
                      }
                      className="text-right"
                    />
                    <p className="text-xs text-muted-foreground">
                      تنبيه عند تجاوز هذا الحد
                    </p>
                  </div>

                  <div className="space-y-2">
                    <Label>حد الكفاءة الأدنى (%)</Label>
                    <Input
                      type="number"
                      value={alertSettings.efficiencyThreshold}
                      onChange={(e) =>
                        setAlertSettings((prev) => ({
                          ...prev,
                          efficiencyThreshold: Number(e.target.value),
                        }))
                      }
                      className="text-right"
                    />
                    <p className="text-xs text-muted-foreground">
                      تنبيه عند انخفاض الكفاءة تحت هذا الحد
                    </p>
                  </div>

                  <div className="space-y-2">
                    <Label>حد التكلفة الأقصى (ج.م)</Label>
                    <Input
                      type="number"
                      value={alertSettings.costThreshold}
                      onChange={(e) =>
                        setAlertSettings((prev) => ({
                          ...prev,
                          costThreshold: Number(e.target.value),
                        }))
                      }
                      className="text-right"
                    />
                    <p className="text-xs text-muted-foreground">
                      تنبيه عند تجاوز التكلفة الشهرية لهذا الحد
                    </p>
                  </div>

                  <Button className="w-full mt-4">حفظ الإعدادات</Button>
                </CardContent>
              </Card>
            </div>

            {/* Quick Alert Rules */}
            <Card>
              <CardHeader>
                <CardTitle>قواعد التنبيه السريعة</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="p-4 border rounded-lg">
                    <h4 className="font-medium mb-2">تنبيهات الاستهلاك</h4>
                    <ul className="text-sm space-y-1 text-muted-foreground">
                      <li>• تجاوز الحد اليومي بنسبة 20%</li>
                      <li>• زيادة مفاجئة في الاستهلاك خلال ساعة</li>
                      <li>• تشغيل معدات خارج الجدولة المحددة</li>
                    </ul>
                  </div>

                  <div className="p-4 border rounded-lg">
                    <h4 className="font-medium mb-2">تنبيهات الكفاءة</h4>
                    <ul className="text-sm space-y-1 text-muted-foreground">
                      <li>• انخفاض الكفاءة تحت 80%</li>
                      <li>• تدهور أداء المعدات تدريجياً</li>
                      <li>• معامل قدرة منخفض (أقل من 0.85)</li>
                    </ul>
                  </div>

                  <div className="p-4 border rounded-lg">
                    <h4 className="font-medium mb-2">تنبيهات الصيانة</h4>
                    <ul className="text-sm space-y-1 text-muted-foreground">
                      <li>• اقتراب موعد الصيانة الدورية</li>
                      <li>• علامات التحذير من المعدات</li>
                      <li>• تجاوز ساعات التشغيل المقررة</li>
                    </ul>
                  </div>

                  <div className="p-4 border rounded-lg">
                    <h4 className="font-medium mb-2">تنبيهات التكلفة</h4>
                    <ul className="text-sm space-y-1 text-muted-foreground">
                      <li>• اقتراب من الحد الشهري للميزانية</li>
                      <li>• تقلبات غير مبررة في التكلفة</li>
                      <li>• فرص توفير غير مستغلة</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Alert History */}
          <TabsContent value="history" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>سجل التنبيهات (آخر 30 يوم)</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid gap-4 md:grid-cols-4">
                    <div className="text-center p-4 border rounded-lg">
                      <div className="text-2xl font-bold text-red-600">12</div>
                      <div className="text-sm text-muted-foreground">
                        تنبيهات حرجة
                      </div>
                    </div>
                    <div className="text-center p-4 border rounded-lg">
                      <div className="text-2xl font-bold text-orange-600">
                        28
                      </div>
                      <div className="text-sm text-muted-foreground">
                        تحذيرات
                      </div>
                    </div>
                    <div className="text-center p-4 border rounded-lg">
                      <div className="text-2xl font-bold text-blue-600">45</div>
                      <div className="text-sm text-muted-foreground">
                        معلومات
                      </div>
                    </div>
                    <div className="text-center p-4 border rounded-lg">
                      <div className="text-2xl font-bold text-green-600">
                        18
                      </div>
                      <div className="text-sm text-muted-foreground">
                        إنجازات
                      </div>
                    </div>
                  </div>

                  <div className="border-t pt-4">
                    <h4 className="font-medium mb-3">
                      أهم التنبيهات المحلولة:
                    </h4>
                    <div className="space-y-2">
                      <div className="flex items-center gap-3 p-2 border rounded">
                        <CheckCircle className="h-4 w-4 text-green-600" />
                        <span className="text-sm flex-1">
                          تم حل مشكلة تجاوز الاستهلاك في قسم الإنتاج
                        </span>
                        <span className="text-xs text-muted-foreground">
                          أمس
                        </span>
                      </div>
                      <div className="flex items-center gap-3 p-2 border rounded">
                        <CheckCircle className="h-4 w-4 text-green-600" />
                        <span className="text-sm flex-1">
                          تم إجراء الصيانة الوقائية لمحرك التبريد
                        </span>
                        <span className="text-xs text-muted-foreground">
                          منذ يومين
                        </span>
                      </div>
                      <div className="flex items-center gap-3 p-2 border rounded">
                        <CheckCircle className="h-4 w-4 text-green-600" />
                        <span className="text-sm flex-1">
                          تم تحسين معامل القدرة إلى 0.92
                        </span>
                        <span className="text-xs text-muted-foreground">
                          منذ 3 أيام
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </motion.div>
    </motion.div>
  );
}
