import { useState } from "react";
import { motion } from "motion/react";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { Button } from "../components/ui/button";
import { Progress } from "../components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../components/ui/select";
import { 
  Brain, 
  TrendingUp, 
  TrendingDown, 
  Zap,
  DollarSign,
  Calendar,
  AlertTriangle,
  CheckCircle,
  Clock,
  Target,
  Lightbulb,
  Download,
  RefreshCw
} from "lucide-react";
import { useSelector } from 'react-redux';
import { useLanguage } from "../contexts/LanguageContext";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area, BarChart, Bar } from "recharts";
import { EnergyCalculations } from "../utils/energyCalculations";

export function Predictions() {
  const { t } = useLanguage();
  const [predictionPeriod, setPredictionPeriod] = useState('monthly');
  const [confidenceLevel, setConfidenceLevel] = useState(87);
  const energyData = useSelector((state) => state.app.energyData);
  const aiPredictions = useSelector((state) => state.app.aiPredictions);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.5,
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5
      }
    }
  };

  // Generate prediction data
  const generatePredictions = () => {
    const historicalConsumption = [2100, 1950, 2200, 2050, 2350, 2450];
    const prediction = EnergyCalculations.predictConsumption(historicalConsumption, 1.1);
    return prediction;
  };

  const nextMonthPrediction = generatePredictions();

  // Future predictions data
  const futureData = [
    { month: 'يوليو', actual: 2450, predicted: 2680, confidence: 87, cost: 3216, savings: 320 },
    { month: 'أغسطس', actual: null, predicted: 2720, confidence: 82, cost: 3264, savings: 280 },
    { month: 'سبتمبر', actual: null, predicted: 2600, confidence: 78, cost: 3120, savings: 400 },
    { month: 'أكتوبر', actual: null, predicted: 2380, confidence: 75, cost: 2856, savings: 520 },
    { month: 'نوفمبر', actual: null, predicted: 2200, confidence: 72, cost: 2640, savings: 600 },
    { month: 'ديسمبر', actual: null, predicted: 2150, confidence: 70, cost: 2580, savings: 650 }
  ];

  const weeklyPredictions = [
    { week: 'الأسبوع 1', consumption: 610, efficiency: 88.2, cost: 732 },
    { week: 'الأسبوع 2', consumption: 665, efficiency: 86.8, cost: 798 },
    { week: 'الأسبوع 3', consumption: 680, efficiency: 87.5, cost: 816 },
    { week: 'الأسبوع 4', consumption: 625, efficiency: 89.1, cost: 750 }
  ];

  const aiInsights = [
    {
      type: 'optimization',
      title: 'فرصة توفير فورية',
      description: 'يمكن توفير 12% من التكلفة الشهرية عبر تحسين جدولة الأحمال',
      impact: 'عالي',
      timeframe: '30 يوم',
      savings: 352
    },
    {
      type: 'maintenance',
      title: 'صيانة وقائية مطلوبة',
      description: 'محرك التبريد الرئيسي يحتاج صيانة خلال الأسبوعين القادمين',
      impact: 'متوسط',
      timeframe: '14 يوم',
      savings: 180
    },
    {
      type: 'efficiency',
      title: 'تحسين الكفاءة المتوقع',
      description: 'تحديث نظام الإضاءة سيحسن الكفاءة بنسبة 8%',
      impact: 'متوسط',
      timeframe: '60 يوم',
      savings: 240
    },
    {
      type: 'renewable',
      title: 'زيادة الطاقة المتجددة',
      description: 'الطقس المتوقع مناسب لزيادة إنتاج الطاقة الشمسية 15%',
      impact: 'منخفض',
      timeframe: '7 أيام',
      savings: 120
    }
  ];

  const riskFactors = [
    { factor: 'تقلبات الطقس', probability: 25, impact: 'متوسط' },
    { factor: 'ارتفاع الطلب الصيفي', probability: 80, impact: 'عالي' },
    { factor: 'أعطال المعدات', probability: 15, impact: 'عالي' },
    { factor: 'تذبذب أسعار الطاقة', probability: 45, impact: 'متوسط' }
  ];

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
            <Brain className="h-8 w-8 text-purple-600" />
            <div>
              <h1 className="text-2xl font-bold">التنبؤات الذكية</h1>
              <p className="text-muted-foreground">تنبؤات مدعومة بالذكاء الاصطناعي لاستهلاك الطاقة والتكاليف</p>
            </div>
          </div>
          <div className="flex gap-2">
            <Select value={predictionPeriod} onValueChange={setPredictionPeriod}>
              <SelectTrigger className="w-32">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="weekly">أسبوعي</SelectItem>
                <SelectItem value="monthly">شهري</SelectItem>
                <SelectItem value="quarterly">ربعي</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline">
              <RefreshCw className="h-4 w-4 mr-2" />
              تحديث
            </Button>
            <Button>
              <Download className="h-4 w-4 mr-2" />
              تصدير التنبؤات
            </Button>
          </div>
        </div>
      </motion.div>

      {/* AI Confidence Level */}
      <motion.div variants={itemVariants}>
        <Card className="bg-gradient-to-r from-purple-50 to-blue-50 dark:from-purple-950/30 dark:to-blue-950/30 border-purple-200 dark:border-purple-800">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <motion.div
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <Brain className="h-6 w-6 text-purple-600" />
                </motion.div>
                <div>
                  <h3 className="font-semibold text-purple-900 dark:text-purple-100">
                    نموذج الذكاء الاصطناعي نشط
                  </h3>
                  <p className="text-sm text-purple-700 dark:text-purple-300">
                    يتم تحليل البيانات وتحديث التنبؤات كل 15 دقيقة
                  </p>
                </div>
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold text-purple-600">{confidenceLevel}%</div>
                <div className="text-sm text-purple-700 dark:text-purple-300">مستوى الثقة</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Prediction Tabs */}
      <motion.div variants={itemVariants}>
        <Tabs defaultValue="consumption" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="consumption">توقعات الاستهلاك</TabsTrigger>
            <TabsTrigger value="costs">توقعات التكاليف</TabsTrigger>
            <TabsTrigger value="insights">رؤى الذكاء الاصطناعي</TabsTrigger>
            <TabsTrigger value="risks">تحليل المخاطر</TabsTrigger>
          </TabsList>

          {/* Consumption Predictions */}
          <TabsContent value="consumption" className="space-y-6">
            <div className="grid gap-6 lg:grid-cols-3">
              <motion.div variants={itemVariants}>
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">توقعات الشهر القادم</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="text-center">
                        <div className="text-3xl font-bold text-blue-600">
                          {aiPredictions.nextMonthConsumption.toLocaleString()}
                        </div>
                        <div className="text-sm text-muted-foreground">كيلوواط ساعة</div>
                      </div>
                      
                      <div className="flex items-center justify-center gap-2">
                        <TrendingUp className="h-4 w-4 text-orange-500" />
                        <span className="text-sm">زيادة متوقعة 9.4%</span>
                      </div>
                      
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>مستوى الثقة</span>
                          <span className="font-medium">{aiPredictions.confidenceLevel}%</span>
                        </div>
                        <Progress value={aiPredictions.confidenceLevel} className="h-2" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              <motion.div variants={itemVariants}>
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">التوقعات الأسبوعية</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ResponsiveContainer width="100%" height={200}>
                      <BarChart data={weeklyPredictions}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis 
                          dataKey="week" 
                          tick={{ fontSize: 10 }}
                          angle={-45}
                          textAnchor="end"
                          height={60}
                        />
                        <YAxis tick={{ fontSize: 10 }} />
                        <Tooltip />
                        <Bar dataKey="consumption" fill="#3b82f6" name="الاستهلاك (kWh)" />
                      </BarChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>
              </motion.div>

              <motion.div variants={itemVariants}>
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">مؤشرات الكفاءة</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span>الكفاءة المتوقعة</span>
                          <span>89.2%</span>
                        </div>
                        <Progress value={89.2} className="h-2" />
                      </div>
                      
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span>الطاقة المتجددة</span>
                          <span>38.5%</span>
                        </div>
                        <Progress value={38.5} className="h-2" />
                      </div>
                      
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span>تقليل الهالك</span>
                          <span>91.5%</span>
                        </div>
                        <Progress value={91.5} className="h-2" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </div>

            <motion.div variants={itemVariants}>
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <TrendingUp className="h-5 w-5 text-blue-600" />
                    توقعات الاستهلاك للأشهر القادمة
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={400}>
                    <AreaChart data={futureData}>
                      <defs>
                        <linearGradient id="predictedGradient" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                          <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                        </linearGradient>
                        <linearGradient id="confidenceGradient" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#10b981" stopOpacity={0.2}/>
                          <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip />
                      <Area 
                        type="monotone" 
                        dataKey="predicted" 
                        stroke="#3b82f6" 
                        fill="url(#predictedGradient)"
                        name="الاستهلاك المتوقع (kWh)"
                      />
                      <Line
                        type="monotone"
                        dataKey="confidence"
                        stroke="#10b981"
                        strokeDasharray="5 5"
                        name="مستوى الثقة (%)"
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </motion.div>
          </TabsContent>

          {/* Cost Predictions */}
          <TabsContent value="costs" className="space-y-6">
            <div className="grid gap-6 lg:grid-cols-2">
              <motion.div variants={itemVariants}>
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <DollarSign className="h-5 w-5 text-green-600" />
                      توقعات التكاليف
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="text-center p-4 bg-green-50 dark:bg-green-950/30 rounded-lg">
                        <div className="text-2xl font-bold text-green-600">
                          {aiPredictions.nextMonthCost.toLocaleString()} ج.م
                        </div>
                        <div className="text-sm text-green-700 dark:text-green-300">
                          التكلفة المتوقعة للشهر القادم
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4">
                        <div className="text-center p-3 border rounded-lg">
                          <div className="text-lg font-bold text-blue-600">2,940</div>
                          <div className="text-xs text-muted-foreground">الشهر الحالي</div>
                        </div>
                        <div className="text-center p-3 border rounded-lg">
                          <div className="text-lg font-bold text-orange-600">+276</div>
                          <div className="text-xs text-muted-foreground">الزيادة المتوقعة</div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              <motion.div variants={itemVariants}>
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Target className="h-5 w-5 text-purple-600" />
                      إمكانيات التوفير
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {aiPredictions.recommendations.map((rec, index) => (
                        <motion.div
                          key={index}
                          className="flex items-start gap-3 p-3 border rounded-lg"
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.3, delay: index * 0.1 }}
                        >
                          <Lightbulb className="h-4 w-4 text-yellow-600 mt-0.5" />
                          <div className="flex-1">
                            <p className="text-sm">{rec}</p>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </div>

            <motion.div variants={itemVariants}>
              <Card>
                <CardHeader>
                  <CardTitle>توقعات التكاليف والتوفير</CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={350}>
                    <AreaChart data={futureData}>
                      <defs>
                        <linearGradient id="costGradient" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#f59e0b" stopOpacity={0.3}/>
                          <stop offset="95%" stopColor="#f59e0b" stopOpacity={0}/>
                        </linearGradient>
                        <linearGradient id="savingsGradient" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#10b981" stopOpacity={0.3}/>
                          <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip />
                      <Area 
                        type="monotone" 
                        dataKey="cost" 
                        stroke="#f59e0b" 
                        fill="url(#costGradient)"
                        name="التكلفة المتوقعة (ج.م)"
                      />
                      <Area 
                        type="monotone" 
                        dataKey="savings" 
                        stroke="#10b981" 
                        fill="url(#savingsGradient)"
                        name="التوفير المحتمل (ج.م)"
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </motion.div>
          </TabsContent>

          {/* AI Insights */}
          <TabsContent value="insights" className="space-y-6">
            <div className="grid gap-4">
              {aiInsights.map((insight, index) => (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Card className={`border-l-4 ${
                    insight.impact === 'عالي' ? 'border-l-red-500' :
                    insight.impact === 'متوسط' ? 'border-l-yellow-500' : 'border-l-green-500'
                  }`}>
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-lg flex items-center gap-2">
                          {insight.type === 'optimization' && <Target className="h-5 w-5 text-blue-600" />}
                          {insight.type === 'maintenance' && <AlertTriangle className="h-5 w-5 text-orange-600" />}
                          {insight.type === 'efficiency' && <TrendingUp className="h-5 w-5 text-green-600" />}
                          {insight.type === 'renewable' && <Zap className="h-5 w-5 text-yellow-600" />}
                          {insight.title}
                        </CardTitle>
                        <div className="flex gap-2">
                          <Badge variant={
                            insight.impact === 'عالي' ? 'destructive' :
                            insight.impact === 'متوسط' ? 'default' : 'secondary'
                          }>
                            {insight.impact}
                          </Badge>
                          <Badge variant="outline">{insight.timeframe}</Badge>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center justify-between">
                        <p className="text-muted-foreground flex-1">{insight.description}</p>
                        <div className="text-right">
                          <div className="text-lg font-bold text-green-600">
                            {insight.savings} ج.م
                          </div>
                          <div className="text-sm text-muted-foreground">توفير متوقع</div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </TabsContent>

          {/* Risk Analysis */}
          <TabsContent value="risks" className="space-y-6">
            <div className="grid gap-6 lg:grid-cols-2">
              <motion.div variants={itemVariants}>
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <AlertTriangle className="h-5 w-5 text-red-600" />
                      عوامل المخاطر
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {riskFactors.map((risk, index) => (
                        <motion.div
                          key={index}
                          className="space-y-2"
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.3, delay: index * 0.1 }}
                        >
                          <div className="flex justify-between text-sm">
                            <span>{risk.factor}</span>
                            <div className="flex gap-2">
                              <Badge variant={
                                risk.impact === 'عالي' ? 'destructive' :
                                risk.impact === 'متوسط' ? 'default' : 'secondary'
                              }>
                                {risk.impact}
                              </Badge>
                              <span className="font-medium">{risk.probability}%</span>
                            </div>
                          </div>
                          <Progress value={risk.probability} className="h-2" />
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
                      <CheckCircle className="h-5 w-5 text-green-600" />
                      التوصيات الوقائية
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="p-3 bg-blue-50 dark:bg-blue-950/30 rounded-lg border border-blue-200 dark:border-blue-800">
                        <h4 className="font-medium text-blue-800 dark:text-blue-300 mb-1">
                          مراقبة الطقس
                        </h4>
                        <p className="text-sm text-blue-700 dark:text-blue-400">
                          تفعيل نظام الإنذار المبكر لتقلبات الطقس لتجنب زيادة الأحمال
                        </p>
                      </div>
                      
                      <div className="p-3 bg-green-50 dark:bg-green-950/30 rounded-lg border border-green-200 dark:border-green-800">
                        <h4 className="font-medium text-green-800 dark:text-green-300 mb-1">
                          صيانة وقائية
                        </h4>
                        <p className="text-sm text-green-700 dark:text-green-400">
                          جدولة صيانة دورية للمعدات الحرجة لتجنب الأعطال المفاجئة
                        </p>
                      </div>
                      
                      <div className="p-3 bg-purple-50 dark:bg-purple-950/30 rounded-lg border border-purple-200 dark:border-purple-800">
                        <h4 className="font-medium text-purple-800 dark:text-purple-300 mb-1">
                          مرونة التسعير
                        </h4>
                        <p className="text-sm text-purple-700 dark:text-purple-400">
                          التحضير لتقلبات أسعار الطاقة عبر تحسين جدولة الأحمال
                        </p>
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