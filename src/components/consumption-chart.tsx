import { motion } from "motion/react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, AreaChart, Area } from "recharts";
import { useLanguage } from "../contexts/LanguageContext";

const consumptionData = [
  { month: "يناير", monthEn: "Jan", consumption: 2100, renewable: 350, cost: 2520, efficiency: 85.2 },
  { month: "فبراير", monthEn: "Feb", consumption: 1950, renewable: 420, cost: 2340, efficiency: 87.1 },
  { month: "مارس", monthEn: "Mar", consumption: 2200, renewable: 480, cost: 2640, efficiency: 86.8 },
  { month: "أبريل", monthEn: "Apr", consumption: 2050, renewable: 520, cost: 2460, efficiency: 88.2 },
  { month: "مايو", monthEn: "May", consumption: 2350, renewable: 580, cost: 2820, efficiency: 87.9 },
  { month: "يونيو", monthEn: "Jun", consumption: 2450, renewable: 620, cost: 2940, efficiency: 87.5 }
];

const dailyData = [
  { day: "السبت", dayEn: "Sat", consumption: 78, efficiency: 85, renewable: 15.2 },
  { day: "الأحد", dayEn: "Sun", consumption: 82, efficiency: 88, renewable: 18.5 },
  { day: "الاثنين", dayEn: "Mon", consumption: 95, efficiency: 82, renewable: 12.8 },
  { day: "الثلاثاء", dayEn: "Tue", consumption: 89, efficiency: 87, renewable: 16.9 },
  { day: "الأربعاء", dayEn: "Wed", consumption: 91, efficiency: 89, renewable: 19.2 },
  { day: "الخميس", dayEn: "Thu", consumption: 88, efficiency: 91, renewable: 21.5 },
  { day: "الجمعة", dayEn: "Fri", consumption: 75, efficiency: 93, renewable: 23.8 }
];

const hourlyData = [
  { hour: "00:00", consumption: 45, efficiency: 92 },
  { hour: "02:00", consumption: 42, efficiency: 94 },
  { hour: "04:00", consumption: 40, efficiency: 95 },
  { hour: "06:00", consumption: 65, efficiency: 88 },
  { hour: "08:00", consumption: 85, efficiency: 82 },
  { hour: "10:00", consumption: 92, efficiency: 78 },
  { hour: "12:00", consumption: 98, efficiency: 75 },
  { hour: "14:00", consumption: 95, efficiency: 77 },
  { hour: "16:00", consumption: 88, efficiency: 80 },
  { hour: "18:00", consumption: 82, efficiency: 85 },
  { hour: "20:00", consumption: 75, efficiency: 88 },
  { hour: "22:00", consumption: 58, efficiency: 90 }
];

export function ConsumptionChart() {
  const { t, language } = useLanguage();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.5,
        staggerChildren: 0.2
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

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <motion.div 
          className="bg-card border border-border rounded-lg shadow-lg p-3"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.2 }}
        >
          <p className="font-medium">{label}</p>
          {payload.map((entry: any, index: number) => (
            <p key={index} style={{ color: entry.color }} className="text-sm">
              {entry.name}: {entry.value} {entry.name.includes('كفاءة') || entry.name.includes('Efficiency') ? '%' : entry.name.includes('تكلفة') || entry.name.includes('Cost') ? t('egp') : t('kwh')}
            </p>
          ))}
        </motion.div>
      );
    }
    return null;
  };

  return (
    <motion.div 
      className="space-y-6"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Monthly Consumption and Cost */}
      <motion.div variants={itemVariants}>
        <Card className="overflow-hidden">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <CardHeader className="bg-gradient-to-r from-blue-50 to-blue-100 dark:from-blue-950/50 dark:to-blue-900/50">
              <CardTitle className="flex items-center gap-2">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                  className="w-2 h-2 bg-blue-600 rounded-full"
                />
                الاستهلاك والتكلفة الشهرية
              </CardTitle>
            </CardHeader>
          </motion.div>
          <CardContent className="p-6">
            <ResponsiveContainer width="100%" height={350}>
              <AreaChart data={consumptionData}>
                <defs>
                  <linearGradient id="consumptionGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="renewableGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis 
                  dataKey={language === 'ar' ? "month" : "monthEn"} 
                  tick={{ fontSize: 12 }}
                  stroke="#6b7280"
                />
                <YAxis tick={{ fontSize: 12 }} stroke="#6b7280" />
                <Tooltip content={<CustomTooltip />} />
                <Area 
                  type="monotone" 
                  dataKey="consumption" 
                  stroke="#3b82f6" 
                  strokeWidth={3}
                  fill="url(#consumptionGradient)"
                  name={`الاستهلاك (${t('kwh')})`}
                />
                <Area 
                  type="monotone" 
                  dataKey="renewable" 
                  stroke="#10b981" 
                  strokeWidth={3}
                  fill="url(#renewableGradient)"
                  name={`الطاقة المتجددة (${t('kwh')})`}
                />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </motion.div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Daily Consumption */}
        <motion.div variants={itemVariants}>
          <Card className="overflow-hidden">
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <CardHeader className="bg-gradient-to-r from-green-50 to-green-100 dark:from-green-950/50 dark:to-green-900/50">
                <CardTitle className="flex items-center gap-2">
                  <motion.div
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="w-2 h-2 bg-green-600 rounded-full"
                  />
                  الاستهلاك اليومي والكفاءة
                </CardTitle>
              </CardHeader>
            </motion.div>
            <CardContent className="p-6">
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={dailyData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                  <XAxis 
                    dataKey={language === 'ar' ? "day" : "dayEn"} 
                    tick={{ fontSize: 11 }}
                    stroke="#6b7280"
                  />
                  <YAxis tick={{ fontSize: 11 }} stroke="#6b7280" />
                  <Tooltip content={<CustomTooltip />} />
                  <Bar 
                    dataKey="consumption" 
                    fill="#3b82f6" 
                    name={`الاستهلاك (${t('kwh')})`}
                    radius={[4, 4, 0, 0]}
                  />
                  <Bar 
                    dataKey="renewable" 
                    fill="#10b981" 
                    name="الطاقة المتجددة (%)"
                    radius={[4, 4, 0, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </motion.div>

        {/* Hourly Efficiency Trend */}
        <motion.div variants={itemVariants}>
          <Card className="overflow-hidden">
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <CardHeader className="bg-gradient-to-r from-purple-50 to-purple-100 dark:from-purple-950/50 dark:to-purple-900/50">
                <CardTitle className="flex items-center gap-2">
                  <motion.div
                    animate={{ 
                      rotate: [0, 180, 360],
                      scale: [1, 1.1, 1]
                    }}
                    transition={{ duration: 3, repeat: Infinity }}
                    className="w-2 h-2 bg-purple-600 rounded-full"
                  />
                  اتجاه الكفاءة خلال اليوم
                </CardTitle>
              </CardHeader>
            </motion.div>
            <CardContent className="p-6">
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={hourlyData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                  <XAxis 
                    dataKey="hour" 
                    tick={{ fontSize: 11 }}
                    stroke="#6b7280"
                  />
                  <YAxis tick={{ fontSize: 11 }} stroke="#6b7280" />
                  <Tooltip content={<CustomTooltip />} />
                  <Line 
                    type="monotone" 
                    dataKey="consumption" 
                    stroke="#f59e0b" 
                    strokeWidth={3}
                    dot={{ fill: '#f59e0b', r: 4 }}
                    activeDot={{ r: 6, stroke: '#f59e0b', strokeWidth: 2 }}
                    name={`الاستهلاك (${t('kwh')})`}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="efficiency" 
                    stroke="#8b5cf6" 
                    strokeWidth={3}
                    dot={{ fill: '#8b5cf6', r: 4 }}
                    activeDot={{ r: 6, stroke: '#8b5cf6', strokeWidth: 2 }}
                    name="الكفاءة (%)"
                  />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Energy Mix Visualization */}
      <motion.div variants={itemVariants}>
        <Card className="overflow-hidden">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            <CardHeader className="bg-gradient-to-r from-orange-50 to-red-100 dark:from-orange-950/50 dark:to-red-900/50">
              <CardTitle className="flex items-center gap-2">
                <motion.div
                  animate={{ 
                    backgroundColor: ['#f59e0b', '#ef4444', '#3b82f6', '#10b981', '#f59e0b']
                  }}
                  transition={{ duration: 4, repeat: Infinity }}
                  className="w-2 h-2 rounded-full"
                />
                تطور مزيج الطاقة عبر الوقت
              </CardTitle>
            </CardHeader>
          </motion.div>
          <CardContent className="p-6">
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={consumptionData}>
                <defs>
                  <linearGradient id="efficiencyGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis 
                  dataKey={language === 'ar' ? "month" : "monthEn"} 
                  tick={{ fontSize: 12 }}
                  stroke="#6b7280"
                />
                <YAxis tick={{ fontSize: 12 }} stroke="#6b7280" />
                <Tooltip content={<CustomTooltip />} />
                <Area 
                  type="monotone" 
                  dataKey="efficiency" 
                  stroke="#8b5cf6" 
                  strokeWidth={3}
                  fill="url(#efficiencyGradient)"
                  name="الكفاءة (%)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  );
}