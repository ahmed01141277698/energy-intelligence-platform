import { motion } from "motion/react";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { Progress } from "../components/ui/progress";
import { Button } from "../components/ui/button";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Treemap, Cell } from "recharts";
import { Factory, Settings, AlertTriangle, CheckCircle, TrendingUp, Lightbulb, Brain } from "lucide-react";
import { useSelector, useDispatch } from 'react-redux';
import { RootState, updateFactoryZone } from '../store/store';
import { useLanguage } from "../contexts/LanguageContext";

const COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444'];

export function FactoryZones() {
  const { t } = useLanguage();
  const factoryZones = useSelector((state: RootState) => state.app.factoryZones);
  const dispatch = useDispatch();

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

  const getPriorityIcon = (priority: string) => {
    switch (priority) {
      case 'high': return <AlertTriangle className="h-4 w-4 text-red-500" />;
      case 'medium': return <Settings className="h-4 w-4 text-yellow-500" />;
      case 'low': return <CheckCircle className="h-4 w-4 text-green-500" />;
      default: return <Settings className="h-4 w-4" />;
    }
  };

  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case 'high': return 'destructive';
      case 'medium': return 'secondary';
      case 'low': return 'default';
      default: return 'outline';
    }
  };

  const getZoneColor = (zoneId: string) => {
    const index = factoryZones.findIndex(z => z.id === zoneId);
    return COLORS[index % COLORS.length];
  };

  const totalConsumption = factoryZones.reduce((total, zone) => total + zone.consumption, 0);
  const averageEfficiency = factoryZones.reduce((total, zone) => total + zone.efficiency, 0) / factoryZones.length;
  const highPriorityZones = factoryZones.filter(zone => zone.priority === 'high').length;

  const treemapData = factoryZones.map(zone => ({
    name: zone.name,
    size: zone.consumption,
    efficiency: zone.efficiency,
    priority: zone.priority
  }));

  const applyAIOptimization = (zoneId: string) => {
    const zone = factoryZones.find(z => z.id === zoneId);
    if (!zone) return;

    // AI-based recommendations based on zone type and current efficiency
    let newEfficiency = zone.efficiency;
    let newRecommendations = [...zone.recommendations];

    if (zone.id === 'production') {
      newEfficiency = Math.min(85, zone.efficiency + 3.5);
      newRecommendations.push('تم تطبيق نظام مراقبة ذكي للأحمال');
    } else if (zone.id === 'hvac') {
      newEfficiency = Math.min(90, zone.efficiency + 4.2);
      newRecommendations.push('تم تحديث نظام التحكم الذكي في درجة الحرارة');
    } else if (zone.id === 'lighting') {
      newEfficiency = Math.min(95, zone.efficiency + 2.1);
      newRecommendations.push('تم تحسين نظام الإضاءة التكيفية');
    } else if (zone.id === 'utilities') {
      newEfficiency = Math.min(92, zone.efficiency + 2.8);
      newRecommendations.push('تم تحسين جدولة تشغيل المرافق');
    }

    dispatch(updateFactoryZone({
      id: zoneId,
      data: { 
        efficiency: newEfficiency,
        recommendations: newRecommendations.slice(-5) // Keep only last 5 recommendations
      }
    }));
  };

  return (
    <motion.div
      className="space-y-6"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Header */}
      <motion.div variants={itemVariants}>
        <div className="flex items-center gap-3 mb-6">
          <Factory className="h-8 w-8 text-blue-600" />
          <div>
            <h1 className="text-2xl font-bold">{t('factoryZones')}</h1>
            <p className="text-muted-foreground">تحليل استهلاك الطاقة في مناطق المصنع المختلفة</p>
          </div>
        </div>
      </motion.div>

      {/* Summary Cards */}
      <motion.div variants={itemVariants}>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <motion.div whileHover={{ scale: 1.02 }} transition={{ duration: 0.2 }}>
            <Card className="relative overflow-hidden">
              <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-blue-500/20 to-transparent rounded-bl-full" />
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">إجمالي الاستهلاك</CardTitle>
                <Factory className="h-4 w-4 text-blue-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-blue-600">{totalConsumption.toLocaleString()}</div>
                <p className="text-xs text-muted-foreground">{t('kwh')} يومياً</p>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div whileHover={{ scale: 1.02 }} transition={{ duration: 0.2 }}>
            <Card className="relative overflow-hidden">
              <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-green-500/20 to-transparent rounded-bl-full" />
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">متوسط الكفاءة</CardTitle>
                <TrendingUp className="h-4 w-4 text-green-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-green-600">{averageEfficiency.toFixed(1)}%</div>
                <p className="text-xs text-muted-foreground">عبر جميع المناطق</p>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div whileHover={{ scale: 1.02 }} transition={{ duration: 0.2 }}>
            <Card className="relative overflow-hidden">
              <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-red-500/20 to-transparent rounded-bl-full" />
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">مناطق عالية الأولوية</CardTitle>
                <AlertTriangle className="h-4 w-4 text-red-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-red-600">{highPriorityZones}</div>
                <p className="text-xs text-muted-foreground">تحتاج تحسين فوري</p>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div whileHover={{ scale: 1.02 }} transition={{ duration: 0.2 }}>
            <Card className="relative overflow-hidden">
              <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-purple-500/20 to-transparent rounded-bl-full" />
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">إمكانية التوفير</CardTitle>
                <Lightbulb className="h-4 w-4 text-purple-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-purple-600">18.5%</div>
                <p className="text-xs text-muted-foreground">توفير محتمل بالتحسين</p>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </motion.div>

      {/* Zone Details Cards */}
      <motion.div variants={itemVariants}>
        <div className="grid gap-4 md:grid-cols-2">
          {factoryZones.map((zone, index) => (
            <motion.div
              key={zone.id}
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.2 }}
            >
              <Card className="relative overflow-hidden">
                <div 
                  className="absolute top-0 right-0 w-24 h-24 opacity-20 rounded-bl-full"
                  style={{ backgroundColor: getZoneColor(zone.id) }}
                />
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
                  <div>
                    <CardTitle className="text-lg">{zone.name}</CardTitle>
                    <p className="text-sm text-muted-foreground">{zone.consumption} {t('kwh')} يومياً</p>
                  </div>
                  <div className="flex items-center gap-2">
                    {getPriorityIcon(zone.priority)}
                    <Badge variant={getPriorityBadge(zone.priority)}>
                      {t(`${zone.priority}Priority`)}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>الكفاءة</span>
                      <span className={zone.efficiency > 85 ? "text-green-600" : zone.efficiency > 75 ? "text-yellow-600" : "text-red-600"}>
                        {zone.efficiency}%
                      </span>
                    </div>
                    <Progress value={zone.efficiency} className="h-3" />
                  </div>

                  <div className="space-y-2">
                    <h4 className="font-medium text-sm">المعدات الرئيسية:</h4>
                    <div className="flex flex-wrap gap-1">
                      {zone.equipment.map((item, idx) => (
                        <Badge key={idx} variant="outline" className="text-xs">
                          {item}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <h4 className="font-medium text-sm">أحدث التوصيات:</h4>
                    <div className="space-y-1">
                      {zone.recommendations.slice(-2).map((rec, idx) => (
                        <p key={idx} className="text-xs text-muted-foreground">• {rec}</p>
                      ))}
                    </div>
                  </div>

                  <Button 
                    onClick={() => applyAIOptimization(zone.id)}
                    className="w-full"
                    size="sm"
                  >
                    <Brain className="h-3 w-3 mr-2" />
                    تطبيق تحسين ذكي
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Consumption Distribution Chart */}
      <motion.div variants={itemVariants}>
        <div className="grid gap-6 lg:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>توزيع الاستهلاك بين المناطق</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={factoryZones}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" tick={{ fontSize: 12 }} />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="consumption" fill="#3b82f6" name="الاستهلاك (kWh)" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>كفاءة المناطق</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={factoryZones}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" tick={{ fontSize: 12 }} />
                  <YAxis domain={[0, 100]} />
                  <Tooltip />
                  <Bar dataKey="efficiency" fill="#10b981" name="الكفاءة (%)" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>
      </motion.div>

      {/* AI Insights */}
      <motion.div variants={itemVariants}>
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Brain className="h-5 w-5 text-purple-600" />
              تحليل ذكي للمناطق
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              <motion.div 
                className="p-4 border rounded-lg bg-red-50 dark:bg-red-950/30 border-red-200 dark:border-red-800"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.2 }}
              >
                <h4 className="font-semibold text-red-800 dark:text-red-300 mb-2">خط الإنتاج الرئيسي</h4>
                <p className="text-sm text-red-700 dark:text-red-400 mb-2">
                  أعلى استهلاك (49% من الإجمالي) - كفاءة منخفضة نسبياً
                </p>
                <div className="space-y-1 text-xs">
                  <p>• تحسين عزل الأفران: توفير 8%</p>
                  <p>• نظام استرداد الحرارة: توفير 12%</p>
                  <p>• محركات عالية الكفاءة: توفير 6%</p>
                </div>
              </motion.div>

              <motion.div 
                className="p-4 border rounded-lg bg-yellow-50 dark:bg-yellow-950/30 border-yellow-200 dark:border-yellow-800"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.2 }}
              >
                <h4 className="font-semibold text-yellow-800 dark:text-yellow-300 mb-2">نظام التكييف</h4>
                <p className="text-sm text-yellow-700 dark:text-yellow-400 mb-2">
                  ثاني أعلى استهلاك (28% من الإجمالي) - كفاءة جيدة
                </p>
                <div className="space-y-1 text-xs">
                  <p>• تحكم ذكي بالمناطق: توفير 15%</p>
                  <p>• استخدام الهواء الخارجي: توفير 8%</p>
                  <p>• صيانة دورية محسنة: توفير 5%</p>
                </div>
              </motion.div>

              <motion.div 
                className="p-4 border rounded-lg bg-green-50 dark:bg-green-950/30 border-green-200 dark:border-green-800"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.2 }}
              >
                <h4 className="font-semibold text-green-800 dark:text-green-300 mb-2">الإضاءة والمرافق</h4>
                <p className="text-sm text-green-700 dark:text-green-400 mb-2">
                  كفاءة عالية جداً - تحسينات طفيفة ممكنة
                </p>
                <div className="space-y-1 text-xs">
                  <p>• حساسات ذكية للحركة: توفير 3%</p>
                  <p>• إضاءة طبيعية محسنة: توفير 2%</p>
                  <p>• جدولة ذكية للمرافق: توفير 4%</p>
                </div>
              </motion.div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Zone Heatmap Visualization */}
      <motion.div variants={itemVariants}>
        <Card>
          <CardHeader>
            <CardTitle>خريطة حرارية لاستهلاك المناطق</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-4 gap-2 h-32">
              {factoryZones.map((zone, index) => (
                <motion.div
                  key={zone.id}
                  className="relative p-3 rounded-lg border flex flex-col justify-center items-center text-center"
                  style={{ 
                    backgroundColor: `${getZoneColor(zone.id)}20`,
                    borderColor: getZoneColor(zone.id)
                  }}
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.2 }}
                >
                  <div className="text-lg font-bold" style={{ color: getZoneColor(zone.id) }}>
                    {zone.consumption}
                  </div>
                  <div className="text-xs opacity-75">{zone.name.split(' ')[0]}</div>
                  <div className="text-xs opacity-60">{zone.efficiency}%</div>
                </motion.div>
              ))}
            </div>
            <div className="mt-4 text-sm text-muted-foreground text-center">
              حجم المربع يمثل الاستهلاك، اللون يمثل الكفاءة
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  );
}