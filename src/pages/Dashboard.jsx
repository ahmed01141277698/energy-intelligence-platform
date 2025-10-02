// this is motion librily
import { motion } from "motion/react";
import { EnergyStats } from "../components/energy-stats";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { Progress } from "../components/ui/progress";
import {
  TrendingUp,
  TrendingDown,
  Activity,
  AlertTriangle,
  CheckCircle,
  Clock,
  Zap,
  DollarSign,
  Gauge,
  Target,
} from "lucide-react";
import { useSelector } from "react-redux";
import { useLanguage } from "../contexts/LanguageContext";

export function Dashboard() {
  const { t } = useLanguage();
  const energyData = useSelector((state) => state.app.energyData[0]);
  const currentFactory = useSelector((state) => state.app.currentFactory);

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

  const todayAlerts = [
    {
      type: "warning",
      message: "استهلاك مرتفع في قسم الإنتاج",
      time: "09:45",
      priority: "medium",
    },
    {
      type: "success",
      message: "تحسن في كفاءة الطاقة المتجددة",
      time: "08:30",
      priority: "low",
    },
    {
      type: "info",
      message: "جدولة صيانة دورية مطلوبة",
      time: "07:15",
      priority: "high",
    },
  ];

  const quickStats = [
    {
      title: "الحالة العامة",
      value: "جيدة",
      icon: CheckCircle,
      color: "text-green-600",
      bgColor: "bg-green-50 dark:bg-green-950/30",
    },
    {
      title: "آخر تحديث",
      value: "منذ 5 دقائق",
      icon: Clock,
      color: "text-blue-600",
      bgColor: "bg-blue-50 dark:bg-blue-950/30",
    },
    {
      title: "التنبيهات النشطة",
      value: "3",
      icon: AlertTriangle,
      color: "text-orange-600",
      bgColor: "bg-orange-50 dark:bg-orange-950/30",
    },
    {
      title: "مستوى الأداء",
      value: "87.5%",
      icon: Gauge,
      color: "text-purple-600",
      bgColor: "bg-purple-50 dark:bg-purple-950/30",
    },
  ];

  return (
    <motion.div
      className="space-y-6"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Welcome Header */}
      <motion.div variants={itemVariants}>
        <div className="bg-gradient-to-r from-blue-50 to-blue-100 dark:from-blue-950/50 dark:to-blue-900/50 rounded-lg p-6 border">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-blue-900 dark:text-blue-100">
                {t("مرحباً بك في لوحة التحكم")}
              </h1>
              <p className="text-blue-700 dark:text-blue-300 mt-1">
                نظرة شاملة على أداء نظام الطاقة في مصنعك
              </p>
            </div>
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            >
              <Activity className="h-12 w-12 text-blue-600" />
            </motion.div>
          </div>
        </div>
      </motion.div>

      {/* Main Stats */}
      <motion.div variants={itemVariants}>
        <EnergyStats />
      </motion.div>

      {/* Quick Stats */}
      <motion.div variants={itemVariants}>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {quickStats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={stat.title}
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.2 }}
              >
                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-center gap-3">
                      <div className={`p-2 rounded-lg ${stat.bgColor}`}>
                        <Icon className={`h-5 w-5 ${stat.color}`} />
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">
                          {stat.title}
                        </p>
                        <p className="font-bold">{stat.value}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </div>
      </motion.div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Today's Alerts */}
        <motion.div variants={itemVariants}>
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertTriangle className="h-5 w-5 text-orange-600" />
                تنبيهات اليوم
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {todayAlerts.map((alert, index) => (
                  <motion.div
                    key={index}
                    className="flex items-center gap-3 p-3 border rounded-lg"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                    whileHover={{ scale: 1.02 }}
                  >
                    <div
                      className={`w-2 h-2 rounded-full ${
                        alert.priority === "high"
                          ? "bg-red-500"
                          : alert.priority === "medium"
                          ? "bg-orange-500"
                          : "bg-green-500"
                      }`}
                    />
                    <div className="flex-1">
                      <p className="text-sm font-medium">{alert.message}</p>
                      <p className="text-xs text-muted-foreground">
                        {alert.time}
                      </p>
                    </div>
                    <Badge
                      variant={
                        alert.priority === "high"
                          ? "destructive"
                          : alert.priority === "medium"
                          ? "default"
                          : "secondary"
                      }
                    >
                      {alert.priority === "high"
                        ? "عالي"
                        : alert.priority === "medium"
                        ? "متوسط"
                        : "منخفض"}
                    </Badge>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Performance Overview */}
        <motion.div variants={itemVariants}>
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="h-5 w-5 text-blue-600" />
                نظرة على الأداء
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span>كفاءة الطاقة</span>
                    <span className="font-medium">
                      {energyData.efficiency}%
                    </span>
                  </div>
                  <Progress value={energyData.efficiency} className="h-2" />
                </div>

                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span>الطاقة المتجددة</span>
                    <span className="font-medium">{energyData.renewable}%</span>
                  </div>
                  <Progress value={energyData.renewable} className="h-2" />
                </div>

                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span>معامل القدرة</span>
                    <span className="font-medium">
                      {(energyData.powerFactor * 100).toFixed(1)}%
                    </span>
                  </div>
                  <Progress
                    value={energyData.powerFactor * 100}
                    className="h-2"
                  />
                </div>

                <div className="pt-3 border-t">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">التقييم العام</span>
                    <div className="flex items-center gap-2">
                      <TrendingUp className="h-4 w-4 text-green-600" />
                      <Badge
                        variant="default"
                        className="bg-green-100 text-green-800 dark:bg-green-950/30 dark:text-green-300"
                      >
                        ممتاز
                      </Badge>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Quick Actions */}
      <motion.div variants={itemVariants}>
        <Card>
          <CardHeader>
            <CardTitle>الإجراءات السريعة</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-3">
              <motion.button
                className="p-4 border rounded-lg text-left hover:bg-accent transition-colors"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-blue-50 dark:bg-blue-950/30 rounded-lg">
                    <Zap className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-medium">تحليل مفصل</h3>
                    <p className="text-sm text-muted-foreground">
                      عرض التحليلات المتقدمة
                    </p>
                  </div>
                </div>
              </motion.button>

              <motion.button
                className="p-4 border rounded-lg text-left hover:bg-accent transition-colors"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-green-50 dark:bg-green-950/30 rounded-lg">
                    <DollarSign className="h-5 w-5 text-green-600" />
                  </div>
                  <div>
                    <h3 className="font-medium">حاسبة التكلفة</h3>
                    <p className="text-sm text-muted-foreground">
                      حساب تكاليف الطاقة
                    </p>
                  </div>
                </div>
              </motion.button>

              <motion.button
                className="p-4 border rounded-lg text-left hover:bg-accent transition-colors"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-purple-50 dark:bg-purple-950/30 rounded-lg">
                    <Activity className="h-5 w-5 text-purple-600" />
                  </div>
                  <div>
                    <h3 className="font-medium">تقرير سريع</h3>
                    <p className="text-sm text-muted-foreground">
                      إنشاء تقرير فوري
                    </p>
                  </div>
                </div>
              </motion.button>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  );
}
