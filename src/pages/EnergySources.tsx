import { motion } from "motion/react";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { Progress } from "../components/ui/progress";
import { Button } from "../components/ui/button";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line } from "recharts";
import { Sun, Wind, Zap, Factory, TrendingUp, TrendingDown, DollarSign, Leaf, AlertCircle } from "lucide-react";
import { useSelector, useDispatch } from 'react-redux';
import { RootState, updateEnergySource } from '../store/store';
import { useLanguage } from "../contexts/LanguageContext";
import { EnergyCalculations } from "../utils/energyCalculations";

const COLORS = ['#f59e0b', '#10b981', '#ef4444', '#3b82f6'];

const historicalData = [
  { month: 'يناير', solar: 280, wind: 120, generator: 380, grid: 1420 },
  { month: 'فبراير', solar: 320, wind: 140, generator: 350, grid: 1380 },
  { month: 'مارس', solar: 380, wind: 160, generator: 320, grid: 1340 },
  { month: 'أبريل', solar: 420, wind: 180, generator: 280, grid: 1320 },
  { month: 'مايو', solar: 480, wind: 190, generator: 260, grid: 1280 },
  { month: 'يونيو', solar: 520, wind: 200, generator: 240, grid: 1240 }
];

export function EnergySources() {
  const { t } = useLanguage();
  const energySources = useSelector((state: RootState) => state.app.energySources);
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

  const getSourceIcon = (type: string) => {
    switch (type) {
      case 'solar': return <Sun className="h-8 w-8 text-yellow-500" />;
      case 'wind': return <Wind className="h-8 w-8 text-blue-500" />;
      case 'generator': return <Factory className="h-8 w-8 text-red-500" />;
      case 'grid': return <Zap className="h-8 w-8 text-purple-500" />;
      default: return <Zap className="h-8 w-8" />;
    }
  };

  const getSourceColor = (type: string) => {
    switch (type) {
      case 'solar': return 'from-yellow-500 to-orange-500';
      case 'wind': return 'from-blue-500 to-cyan-500';
      case 'generator': return 'from-red-500 to-pink-500';
      case 'grid': return 'from-purple-500 to-indigo-500';
      default: return 'from-gray-500 to-gray-600';
    }
  };

  const calculateTotalOutput = () => {
    return energySources.reduce((total, source) => total + source.currentOutput, 0);
  };

  const calculateTotalCapacity = () => {
    return energySources.reduce((total, source) => total + source.capacity, 0);
  };

  const calculateWeightedEfficiency = () => {
    const totalOutput = calculateTotalOutput();
    if (totalOutput === 0) return 0;
    
    return energySources.reduce((weighted, source) => {
      return weighted + (source.efficiency * source.currentOutput);
    }, 0) / totalOutput;
  };

  const calculateTotalCO2 = () => {
    return energySources.reduce((total, source) => {
      return total + (source.currentOutput * source.co2Factor);
    }, 0);
  };

  const optimizeEnergyMix = () => {
    // AI-based optimization to maximize efficiency and minimize cost/CO2
    const optimizedSources = [...energySources].sort((a, b) => {
      const scoreA = a.efficiency / (a.cost + a.co2Factor * 10);
      const scoreB = b.efficiency / (b.cost + b.co2Factor * 10);
      return scoreB - scoreA;
    });

    optimizedSources.forEach((source, index) => {
      dispatch(updateEnergySource({
        index: energySources.findIndex(s => s.type === source.type),
        data: { currentOutput: Math.min(source.capacity, source.currentOutput * 1.1) }
      }));
    });
  };

  const pieData = energySources.map(source => ({
    name: t(source.type),
    value: source.currentOutput,
    fill: COLORS[energySources.indexOf(source)]
  }));

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
            <Zap className="h-8 w-8 text-blue-600" />
            <div>
              <h1 className="text-2xl font-bold">{t('energySources')}</h1>
              <p className="text-muted-foreground">مراقبة وتحليل مصادر الطاقة المختلفة</p>
            </div>
          </div>
          <Button onClick={optimizeEnergyMix} className="bg-gradient-to-r from-blue-600 to-blue-700">
            <TrendingUp className="h-4 w-4 mr-2" />
            تحسين المزيج
          </Button>
        </div>
      </motion.div>

      {/* Summary Cards */}
      <motion.div variants={itemVariants}>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <motion.div whileHover={{ scale: 1.02 }} transition={{ duration: 0.2 }}>
            <Card className="relative overflow-hidden">
              <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-blue-500/20 to-transparent rounded-bl-full" />
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">إجمالي الإنتاج</CardTitle>
                <Zap className="h-4 w-4 text-blue-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-blue-600">{calculateTotalOutput().toLocaleString()}</div>
                <p className="text-xs text-muted-foreground">{t('kw')} من {calculateTotalCapacity().toLocaleString()} {t('kw')}</p>
                <div className="mt-2">
                  <Progress value={(calculateTotalOutput() / calculateTotalCapacity()) * 100} className="h-2" />
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div whileHover={{ scale: 1.02 }} transition={{ duration: 0.2 }}>
            <Card className="relative overflow-hidden">
              <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-green-500/20 to-transparent rounded-bl-full" />
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">الكفاءة المرجحة</CardTitle>
                <TrendingUp className="h-4 w-4 text-green-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-green-600">{calculateWeightedEfficiency().toFixed(1)}%</div>
                <p className="text-xs text-muted-foreground">متوسط مرجح بالإنتاج</p>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div whileHover={{ scale: 1.02 }} transition={{ duration: 0.2 }}>
            <Card className="relative overflow-hidden">
              <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-orange-500/20 to-transparent rounded-bl-full" />
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">التكلفة الإجمالية</CardTitle>
                <DollarSign className="h-4 w-4 text-orange-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-orange-600">
                  {energySources.reduce((total, source) => total + (source.currentOutput * source.cost), 0).toFixed(0)}
                </div>
                <p className="text-xs text-muted-foreground">{t('egp')} / ساعة</p>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div whileHover={{ scale: 1.02 }} transition={{ duration: 0.2 }}>
            <Card className="relative overflow-hidden">
              <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-red-500/20 to-transparent rounded-bl-full" />
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">انبعاثات CO2</CardTitle>
                <Leaf className="h-4 w-4 text-red-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-red-600">{calculateTotalCO2().toFixed(1)}</div>
                <p className="text-xs text-muted-foreground">{t('kg')} / ساعة</p>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </motion.div>

      {/* Energy Sources Grid */}
      <motion.div variants={itemVariants}>
        <div className="grid gap-4 md:grid-cols-2">
          {energySources.map((source, index) => (
            <motion.div
              key={source.type}
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.2 }}
            >
              <Card className="relative overflow-hidden">
                <div className={`absolute top-0 right-0 w-24 h-24 bg-gradient-to-br ${getSourceColor(source.type)}/20 to-transparent rounded-bl-full`} />
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
                  <div className="flex items-center gap-3">
                    {getSourceIcon(source.type)}
                    <div>
                      <CardTitle className="text-lg">{t(source.type)}</CardTitle>
                      <p className="text-sm text-muted-foreground">
                        {source.currentOutput} / {source.capacity} {t('kw')}
                      </p>
                    </div>
                  </div>
                  <Badge variant={source.currentOutput > source.capacity * 0.8 ? "default" : "secondary"}>
                    {((source.currentOutput / source.capacity) * 100).toFixed(0)}%
                  </Badge>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>الإنتاج الحالي</span>
                      <span>{source.currentOutput} {t('kw')}</span>
                    </div>
                    <Progress value={(source.currentOutput / source.capacity) * 100} className="h-3" />
                  </div>
                  
                  <div className="grid grid-cols-3 gap-4 text-sm">
                    <div>
                      <p className="text-muted-foreground">الكفاءة</p>
                      <p className="font-semibold text-green-600">{source.efficiency}%</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">التكلفة</p>
                      <p className="font-semibold text-orange-600">{source.cost} {t('egp')}/{t('kwh')}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">CO2</p>
                      <p className="font-semibold text-red-600">{source.co2Factor} {t('kg')}/{t('kwh')}</p>
                    </div>
                  </div>

                  {source.co2Factor === 0 && (
                    <Badge variant="outline" className="w-full justify-center border-green-200 bg-green-50 text-green-700 dark:border-green-800 dark:bg-green-950/30 dark:text-green-300">
                      <Leaf className="h-3 w-3 mr-1" />
                      طاقة نظيفة
                    </Badge>
                  )}
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Charts Section */}
      <motion.div variants={itemVariants}>
        <div className="grid gap-6 lg:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>توزيع الإنتاج الحالي</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={pieData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, value, percent }) => `${name}: ${value}kW (${(percent * 100).toFixed(0)}%)`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {pieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.fill} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>الاتجاه التاريخي للمصادر</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={historicalData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="solar" stroke="#f59e0b" strokeWidth={2} name="طاقة شمسية" />
                  <Line type="monotone" dataKey="wind" stroke="#10b981" strokeWidth={2} name="طاقة رياح" />
                  <Line type="monotone" dataKey="generator" stroke="#ef4444" strokeWidth={2} name="مولدات" />
                  <Line type="monotone" dataKey="grid" stroke="#3b82f6" strokeWidth={2} name="الشبكة" />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>
      </motion.div>

      {/* AI Recommendations */}
      <motion.div variants={itemVariants}>
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertCircle className="h-5 w-5 text-blue-600" />
              توصيات التحسين الذكية
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              <motion.div 
                className="p-4 border rounded-lg bg-yellow-50 dark:bg-yellow-950/30 border-yellow-200 dark:border-yellow-800"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.2 }}
              >
                <h4 className="font-semibold text-yellow-800 dark:text-yellow-300 mb-2">زيادة الطاقة الشمسية</h4>
                <p className="text-sm text-yellow-700 dark:text-yellow-400">
                  توسيع نظام الطاقة الشمسية بـ 200kW إضافية لتوفير 480 ج.م يومياً
                </p>
              </motion.div>

              <motion.div 
                className="p-4 border rounded-lg bg-green-50 dark:bg-green-950/30 border-green-200 dark:border-green-800"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.2 }}
              >
                <h4 className="font-semibold text-green-800 dark:text-green-300 mb-2">تحسين كفاءة المولدات</h4>
                <p className="text-sm text-green-700 dark:text-green-400">
                  صيانة وتحديث المولدات لتحسين الكفاءة من 42.8% إلى 48%
                </p>
              </motion.div>

              <motion.div 
                className="p-4 border rounded-lg bg-blue-50 dark:bg-blue-950/30 border-blue-200 dark:border-blue-800"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.2 }}
              >
                <h4 className="font-semibold text-blue-800 dark:text-blue-300 mb-2">نظام تخزين الطاقة</h4>
                <p className="text-sm text-blue-700 dark:text-blue-400">
                  إضافة بطاريات 500kWh لتخزين الطاقة المتجددة الفائضة
                </p>
              </motion.div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  );
}