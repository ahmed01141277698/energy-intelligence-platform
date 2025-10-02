import { motion } from "motion/react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { Progress } from "../components/ui/progress";
import { Button } from "../components/ui/button";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../components/ui/tabs";
import { ConsumptionChart } from "../components/consumption-chart";
import {
  BarChart3,
  TrendingUp,
  TrendingDown,
  PieChart,
  LineChart,
  Activity,
  Zap,
  AlertTriangle,
  CheckCircle,
  Download,
  Filter,
} from "lucide-react";
import { useSelector } from "react-redux";
import { useLanguage } from "../contexts/LanguageContext";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart as RechartsPieChart,
  Pie,
  Cell,
  RadialBarChart,
  RadialBar,
} from "recharts";
// import jsPDF from "jspdf";
// import html2canvas from "html2canvas";

export function Analysis() {
  const { t } = useLanguage();
  const energyData = useSelector((state) => state.app.energyData[0]);
  const factoryZones = useSelector((state) => state.app.factoryZones);

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

  // Data for analysis
  const performanceData = [
    { name: "الكفاءة", current: 87.5, target: 90, benchmark: 85 },
    { name: "الطاقة المتجددة", current: 35.2, target: 40, benchmark: 30 },
    { name: "تقليل الهالك", current: 87.5, target: 90, benchmark: 82 },
    { name: "معامل القدرة", current: 85, target: 95, benchmark: 80 },
  ];

  const zoneConsumption = factoryZones.map((zone) => ({
    name: zone.name,
    consumption: zone.consumption,
    efficiency: zone.efficiency,
    color:
      zone.id === "production"
        ? "#3b82f6"
        : zone.id === "hvac"
        ? "#10b981"
        : zone.id === "lighting"
        ? "#f59e0b"
        : "#8b5cf6",
  }));

  const hourlyTrend = [
    { hour: "00", consumption: 45, efficiency: 92, cost: 54 },
    { hour: "02", consumption: 42, efficiency: 94, cost: 50.4 },
    { hour: "04", consumption: 40, efficiency: 95, cost: 48 },
    { hour: "06", consumption: 65, efficiency: 88, cost: 78 },
    { hour: "08", consumption: 85, efficiency: 82, cost: 102 },
    { hour: "10", consumption: 92, efficiency: 78, cost: 110.4 },
    { hour: "12", consumption: 98, efficiency: 75, cost: 117.6 },
    { hour: "14", consumption: 95, efficiency: 77, cost: 114 },
    { hour: "16", consumption: 88, efficiency: 80, cost: 105.6 },
    { hour: "18", consumption: 82, efficiency: 85, cost: 98.4 },
    { hour: "20", consumption: 75, efficiency: 88, cost: 90 },
    { hour: "22", consumption: 58, efficiency: 90, cost: 69.6 },
  ];

  const analysisPoints = [
    {
      type: "strength",
      title: "نقاط القوة",
      points: [
        "كفاءة عالية في استخدام الطاقة المتجددة (35.2%)",
        "تحسن مستمر في الكفاءة العامة (+5.2%)",
        "انخفاض في التكاليف الشهرية (-8.1%)",
        "أداء ممتاز في أنظمة الإضاءة (92.1%)",
        "استقرار في معامل القدرة",
      ],
      color: "green",
    },
    {
      type: "improvement",
      title: "مجالات التحسين",
      points: [
        "تقليل نسبة الهالك في ساعات الذروة (12-16)",
        "تحسين جدولة الأحمال في فترات الذروة",
        "زيادة الاعتماد على الطاقة المتجددة إلى 40%",
        "تحسين كفاءة خط الإنتاج الرئيسي",
        "تحديث نظام التحكم في التكييف",
      ],
      color: "yellow",
    },
    {
      type: "critical",
      title: "نقاط حرجة",
      points: [
        "تجاوز الهالك للحد المقبول في قسم الإنتاج",
        "استهلاك مرتفع خلال ساعات الذروة",
        "حاجة لصيانة دورية للمعدات القديمة",
        "تحسين عزل المباني لتقليل أحمال التكييف",
      ],
      color: "red",
    },
  ];

  const COLORS = ["#3b82f6", "#10b981", "#f59e0b", "#8b5cf6"];

  const downloadPDF = () => {
    const capture = document.querySelector("#pdf-content");
    // @ts-ignore
    html2canvas(capture).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "mm", "a4");
      const imgProps = pdf.getImageProperties(imgData);
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
      pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
      pdf.save("dashboard.pdf");
    });
  };
  return (
    <motion.div
      className="space-y-6"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      id="pdf-content"
    >
      {/* Header */}
      <motion.div variants={itemVariants}>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <BarChart3 className="h-8 w-8 text-blue-600" />
            <div>
              <h1 className="text-2xl font-bold">التحليل المفصل</h1>
              <p className="text-muted-foreground">
                تحليل شامل لأداء نظام الطاقة والكفاءة
              </p>
            </div>
          </div>
          <div className="flex gap-2">
            <Button variant="outline">
              <Filter className="h-4 w-4 mr-2" />
              تصفية البيانات
            </Button>
            <Button onClick={downloadPDF}>
              <Download className="h-4 w-4 mr-2" />
              تصدير التحليل
            </Button>
          </div>
        </div>
      </motion.div>

      {/* Analysis Tabs */}
      <motion.div variants={itemVariants}>
        <Tabs defaultValue="performance" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="performance">تحليل الأداء</TabsTrigger>
            <TabsTrigger value="trends">الاتجاهات</TabsTrigger>
            <TabsTrigger value="zones">تحليل المناطق</TabsTrigger>
            <TabsTrigger value="insights">الرؤى المتقدمة</TabsTrigger>
          </TabsList>

          {/* Performance Analysis */}
          <TabsContent value="performance" className="space-y-6">
            <div className="grid gap-6 lg:grid-cols-2">
              <motion.div variants={itemVariants}>
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Activity className="h-5 w-5 text-blue-600" />
                      مقارنة الأداء بالأهداف
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {performanceData.map((item, index) => (
                        <motion.div
                          key={item.name}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.5, delay: index * 0.1 }}
                        >
                          <div className="space-y-2">
                            <div className="flex justify-between text-sm">
                              <span>{item.name}</span>
                              <span className="font-medium">
                                {item.current}% / {item.target}%
                              </span>
                            </div>
                            <div className="relative">
                              <Progress
                                value={(item.current / item.target) * 100}
                                className="h-3"
                              />
                              <div
                                className="absolute top-0 h-3 w-1 bg-orange-500 rounded"
                                style={{
                                  left: `${
                                    (item.benchmark / item.target) * 100
                                  }%`,
                                }}
                              />
                            </div>
                            <div className="flex justify-between text-xs text-muted-foreground">
                              <span>المعيار: {item.benchmark}%</span>
                              <span>
                                {item.current >= item.target ? (
                                  <Badge
                                    variant="default"
                                    className="bg-green-100 text-green-800"
                                  >
                                    تم التحقيق
                                  </Badge>
                                ) : (
                                  <Badge variant="secondary">
                                    {(
                                      (item.current / item.target) *
                                      100
                                    ).toFixed(1)}
                                    % من الهدف
                                  </Badge>
                                )}
                              </span>
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              <motion.div variants={itemVariants}>
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <PieChart className="h-5 w-5 text-green-600" />
                      توزيع الاستهلاك بالمناطق
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ResponsiveContainer width="100%" height={300}>
                      <RechartsPieChart>
                        <Pie
                          data={zoneConsumption}
                          cx="50%"
                          cy="50%"
                          outerRadius={80}
                          fill="#8884d8"
                          dataKey="consumption"
                          label={({ name, value }) => `${name}: ${value} kWh`}
                        >
                          {zoneConsumption.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                        <Tooltip />
                      </RechartsPieChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>
              </motion.div>
            </div>

            {/* Analysis Points */}
            <div className="grid gap-6 lg:grid-cols-3">
              {analysisPoints.map((section, index) => (
                <motion.div key={section.type} variants={itemVariants}>
                  <Card
                    className={`border-l-4 ${
                      section.color === "green"
                        ? "border-l-green-500"
                        : section.color === "yellow"
                        ? "border-l-yellow-500"
                        : "border-l-red-500"
                    }`}
                  >
                    <CardHeader>
                      <CardTitle
                        className={`text-lg flex items-center gap-2 ${
                          section.color === "green"
                            ? "text-green-700 dark:text-green-300"
                            : section.color === "yellow"
                            ? "text-yellow-700 dark:text-yellow-300"
                            : "text-red-700 dark:text-red-300"
                        }`}
                      >
                        {section.color === "green" ? (
                          <CheckCircle className="h-5 w-5" />
                        ) : section.color === "yellow" ? (
                          <AlertTriangle className="h-5 w-5" />
                        ) : (
                          <AlertTriangle className="h-5 w-5" />
                        )}
                        {section.title}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-2">
                        {section.points.map((point, pointIndex) => (
                          <motion.li
                            key={pointIndex}
                            className="text-sm flex items-start gap-2"
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{
                              duration: 0.3,
                              delay: index * 0.2 + pointIndex * 0.1,
                            }}
                          >
                            <div
                              className={`w-1.5 h-1.5 rounded-full mt-2 ${
                                section.color === "green"
                                  ? "bg-green-500"
                                  : section.color === "yellow"
                                  ? "bg-yellow-500"
                                  : "bg-red-500"
                              }`}
                            />
                            {point}
                          </motion.li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </TabsContent>

          {/* Trends Analysis */}
          <TabsContent value="trends" className="space-y-6">
            <motion.div variants={itemVariants}>
              <ConsumptionChart />
            </motion.div>

            <motion.div variants={itemVariants}>
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <LineChart className="h-5 w-5 text-purple-600" />
                    التحليل اليومي المفصل
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={400}>
                    <AreaChart data={hourlyTrend}>
                      <defs>
                        <linearGradient
                          id="consumptionGradient"
                          x1="0"
                          y1="0"
                          x2="0"
                          y2="1"
                        >
                          <stop
                            offset="5%"
                            stopColor="#3b82f6"
                            stopOpacity={0.3}
                          />
                          <stop
                            offset="95%"
                            stopColor="#3b82f6"
                            stopOpacity={0}
                          />
                        </linearGradient>
                        <linearGradient
                          id="efficiencyGradient"
                          x1="0"
                          y1="0"
                          x2="0"
                          y2="1"
                        >
                          <stop
                            offset="5%"
                            stopColor="#10b981"
                            stopOpacity={0.3}
                          />
                          <stop
                            offset="95%"
                            stopColor="#10b981"
                            stopOpacity={0}
                          />
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="hour" />
                      <YAxis />
                      <Tooltip />
                      <Area
                        type="monotone"
                        dataKey="consumption"
                        stroke="#3b82f6"
                        fill="url(#consumptionGradient)"
                        name="الاستهلاك (kWh)"
                      />
                      <Area
                        type="monotone"
                        dataKey="efficiency"
                        stroke="#10b981"
                        fill="url(#efficiencyGradient)"
                        name="الكفاءة (%)"
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </motion.div>
          </TabsContent>

          {/* Zones Analysis */}
          <TabsContent value="zones" className="space-y-6">
            <div className="grid gap-4">
              {factoryZones.map((zone, index) => (
                <motion.div
                  key={zone.id}
                  variants={itemVariants}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Card>
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <CardTitle className="flex items-center gap-2">
                          <Zap className="h-5 w-5 text-blue-600" />
                          {zone.name}
                        </CardTitle>
                        <Badge
                          variant={
                            zone.priority === "high"
                              ? "destructive"
                              : zone.priority === "medium"
                              ? "default"
                              : "secondary"
                          }
                        >
                          أولوية{" "}
                          {zone.priority === "high"
                            ? "عالية"
                            : zone.priority === "medium"
                            ? "متوسطة"
                            : "منخفضة"}
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="grid gap-4 md:grid-cols-3">
                        <div className="space-y-2">
                          <div className="flex justify-between">
                            <span className="text-sm text-muted-foreground">
                              الاستهلاك
                            </span>
                            <span className="font-medium">
                              {zone.consumption} kWh
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-sm text-muted-foreground">
                              الكفاءة
                            </span>
                            <span className="font-medium">
                              {zone.efficiency}%
                            </span>
                          </div>
                          <Progress value={zone.efficiency} className="h-2" />
                        </div>

                        <div className="space-y-2">
                          <h4 className="font-medium text-sm">
                            المعدات الرئيسية:
                          </h4>
                          <ul className="text-xs space-y-1">
                            {zone.equipment.map((equipment, eqIndex) => (
                              <li
                                key={eqIndex}
                                className="flex items-center gap-2"
                              >
                                <div className="w-1 h-1 bg-blue-500 rounded-full" />
                                {equipment}
                              </li>
                            ))}
                          </ul>
                        </div>

                        <div className="space-y-2">
                          <h4 className="font-medium text-sm">التوصيات:</h4>
                          <ul className="text-xs space-y-1">
                            {zone.recommendations
                              .slice(0, 2)
                              .map((rec, recIndex) => (
                                <li
                                  key={recIndex}
                                  className="flex items-center gap-2"
                                >
                                  <TrendingUp className="w-3 h-3 text-green-500" />
                                  {rec}
                                </li>
                              ))}
                          </ul>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </TabsContent>

          {/* Advanced Insights */}
          <TabsContent value="insights" className="space-y-6">
            <div className="grid gap-6 lg:grid-cols-2">
              <motion.div variants={itemVariants}>
                <Card>
                  <CardHeader>
                    <CardTitle>توصيات التحسين المتقدمة</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="p-4 bg-blue-50 dark:bg-blue-950/30 rounded-lg border border-blue-200 dark:border-blue-800">
                        <h4 className="font-medium text-blue-800 dark:text-blue-300 mb-2">
                          تحسين فوري (0-30 يوم)
                        </h4>
                        <ul className="text-sm space-y-1 text-blue-700 dark:text-blue-400">
                          <li>• تحسين جدولة الأحمال لتوفير 320 ج.م شهرياً</li>
                          <li>• تحديث إعدادات نظام التكييف</li>
                          <li>• صيانة دورية للمعدات الحرجة</li>
                        </ul>
                      </div>

                      <div className="p-4 bg-green-50 dark:bg-green-950/30 rounded-lg border border-green-200 dark:border-green-800">
                        <h4 className="font-medium text-green-800 dark:text-green-300 mb-2">
                          تحسين متوسط المدى (1-6 شهور)
                        </h4>
                        <ul className="text-sm space-y-1 text-green-700 dark:text-green-400">
                          <li>• تحديث أنظمة الإضاءة لـ LED</li>
                          <li>• تحسين عزل المباني</li>
                          <li>• تركيب نظام إدارة الطاقة الذكي</li>
                        </ul>
                      </div>

                      <div className="p-4 bg-purple-50 dark:bg-purple-950/30 rounded-lg border border-purple-200 dark:border-purple-800">
                        <h4 className="font-medium text-purple-800 dark:text-purple-300 mb-2">
                          تحسين طويل المدى (6+ شهور)
                        </h4>
                        <ul className="text-sm space-y-1 text-purple-700 dark:text-purple-400">
                          <li>• زيادة الطاقة المتجددة إلى 50%</li>
                          <li>• تحديث المعدات القديمة</li>
                          <li>• تطبيق معايير ISO 50001</li>
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              <motion.div variants={itemVariants}>
                <Card>
                  <CardHeader>
                    <CardTitle>مؤشرات الأداء الرئيسية</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div className="text-center p-4 border rounded-lg">
                          <div className="text-2xl font-bold text-blue-600">
                            87.5%
                          </div>
                          <div className="text-sm text-muted-foreground">
                            كفاءة الطاقة
                          </div>
                        </div>
                        <div className="text-center p-4 border rounded-lg">
                          <div className="text-2xl font-bold text-green-600">
                            35.2%
                          </div>
                          <div className="text-sm text-muted-foreground">
                            طاقة متجددة
                          </div>
                        </div>
                        <div className="text-center p-4 border rounded-lg">
                          <div className="text-2xl font-bold text-orange-600">
                            2,940
                          </div>
                          <div className="text-sm text-muted-foreground">
                            تكلفة شهرية (ج.م)
                          </div>
                        </div>
                        <div className="text-center p-4 border rounded-lg">
                          <div className="text-2xl font-bold text-red-600">
                            1,470
                          </div>
                          <div className="text-sm text-muted-foreground">
                            انبعاثات CO2 (كجم)
                          </div>
                        </div>
                      </div>

                      <div className="pt-4 border-t">
                        <h4 className="font-medium mb-3">تقييم الاستدامة</h4>
                        <div className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span>مؤشر الاستدامة الإجمالي</span>
                            <span className="font-medium">B+ (جيد جداً)</span>
                          </div>
                          <Progress value={78} className="h-2" />
                          <p className="text-xs text-muted-foreground">
                            يمكن تحسين التقييم إلى A- بتطبيق التوصيات قصيرة
                            المدى
                          </p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </div>
          </TabsContent>
        </Tabs>
      </motion.div>
    </motion.div>
  );
}
