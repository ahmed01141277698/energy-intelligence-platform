import { motion } from "motion/react";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { Progress } from "../components/ui/progress";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from "recharts";
import { Trophy, TrendingUp, TrendingDown, Factory, Zap, DollarSign, Leaf } from "lucide-react";
import { useSelector } from 'react-redux';
import { RootState } from '../store/store';
import { useLanguage } from "../contexts/LanguageContext";

const COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6'];

export function Comparison() {
  const { t } = useLanguage();
  const comparisonData = useSelector((state: RootState) => state.app.comparisonData);
  const currentFactory = useSelector((state: RootState) => state.app.currentFactory);

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

  const getRankIcon = (ranking: number) => {
    if (ranking === 1) return <Trophy className="h-5 w-5 text-yellow-500" />;
    if (ranking <= 3) return <TrendingUp className="h-5 w-5 text-green-500" />;
    return <TrendingDown className="h-5 w-5 text-red-500" />;
  };

  const getBadgeVariant = (ranking: number) => {
    if (ranking === 1) return "default";
    if (ranking <= 3) return "secondary";
    return "destructive";
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
            <h1 className="text-2xl font-bold">{t('comparison')}</h1>
            <p className="text-muted-foreground">مقارنة أداء المصنع مع المصانع المشابهة في الصناعة</p>
          </div>
        </div>
      </motion.div>

      {/* Overall Performance Cards */}
      <motion.div variants={itemVariants}>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <motion.div whileHover={{ scale: 1.02 }} transition={{ duration: 0.2 }}>
            <Card className="relative overflow-hidden">
              <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-br from-blue-500/20 to-transparent rounded-bl-full" />
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">ترتيب عام</CardTitle>
                <Trophy className="h-4 w-4 text-blue-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-blue-600">#1</div>
                <p className="text-xs text-muted-foreground">من أصل 4 مصانع</p>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div whileHover={{ scale: 1.02 }} transition={{ duration: 0.2 }}>
            <Card className="relative overflow-hidden">
              <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-br from-green-500/20 to-transparent rounded-bl-full" />
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">الكفاءة</CardTitle>
                <Zap className="h-4 w-4 text-green-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-green-600">87.5%</div>
                <p className="text-xs text-muted-foreground">+5.3% من المتوسط</p>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div whileHover={{ scale: 1.02 }} transition={{ duration: 0.2 }}>
            <Card className="relative overflow-hidden">
              <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-br from-orange-500/20 to-transparent rounded-bl-full" />
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">التكلفة</CardTitle>
                <DollarSign className="h-4 w-4 text-orange-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-orange-600">2,940 {t('egp')}</div>
                <p className="text-xs text-muted-foreground">-12% من المتوسط</p>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div whileHover={{ scale: 1.02 }} transition={{ duration: 0.2 }}>
            <Card className="relative overflow-hidden">
              <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-br from-emerald-500/20 to-transparent rounded-bl-full" />
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">الطاقة المتجددة</CardTitle>
                <Leaf className="h-4 w-4 text-emerald-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-emerald-600">35.2%</div>
                <p className="text-xs text-muted-foreground">+7% من المتوسط</p>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </motion.div>

      {/* Detailed Comparison Charts */}
      <motion.div variants={itemVariants}>
        <div className="grid gap-6 lg:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>مقارنة الاستهلاك والكفاءة</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={comparisonData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="factoryName" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="consumption" fill="#3b82f6" name="الاستهلاك (kWh)" />
                  <Bar dataKey="efficiency" fill="#10b981" name="الكفاءة (%)" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>مقارنة التكلفة وانبعاثات CO2</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={comparisonData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="factoryName" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="cost" stroke="#f59e0b" strokeWidth={2} name="التكلفة (ج.م)" />
                  <Line type="monotone" dataKey="co2Emissions" stroke="#ef4444" strokeWidth={2} name="انبعاثات CO2 (كجم)" />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>
      </motion.div>

      {/* Renewable Energy Distribution */}
      <motion.div variants={itemVariants}>
        <Card>
          <CardHeader>
            <CardTitle>توزيع الطاقة المتجددة بين المصانع</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-6 lg:grid-cols-2">
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={comparisonData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, value }) => `${name}: ${value}%`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="renewablePercentage"
                  >
                    {comparisonData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
              
              <div className="space-y-4">
                <h4 className="font-semibold">تفاصيل الأداء</h4>
                {comparisonData.map((factory, index) => (
                  <motion.div 
                    key={factory.factoryName}
                    className="flex items-center justify-between p-3 border rounded-lg"
                    whileHover={{ scale: 1.02 }}
                    transition={{ duration: 0.2 }}
                  >
                    <div className="flex items-center gap-3">
                      {getRankIcon(factory.ranking)}
                      <div>
                        <p className="font-medium">{factory.factoryName}</p>
                        <p className="text-sm text-muted-foreground">
                          {factory.renewablePercentage}% طاقة متجددة
                        </p>
                      </div>
                    </div>
                    <Badge variant={getBadgeVariant(factory.ranking)}>
                      #{factory.ranking}
                    </Badge>
                  </motion.div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Performance Metrics Table */}
      <motion.div variants={itemVariants}>
        <Card>
          <CardHeader>
            <CardTitle>جدول الأداء التفصيلي</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="border-b">
                    <th className="text-right p-3">المصنع</th>
                    <th className="text-right p-3">الترتيب</th>
                    <th className="text-right p-3">الاستهلاك (kWh)</th>
                    <th className="text-right p-3">الكفاءة (%)</th>
                    <th className="text-right p-3">التكلفة ({t('egp')})</th>
                    <th className="text-right p-3">طاقة متجددة (%)</th>
                    <th className="text-right p-3">انبعاثات CO2 (كجم)</th>
                  </tr>
                </thead>
                <tbody>
                  {comparisonData.map((factory, index) => (
                    <motion.tr 
                      key={factory.factoryName}
                      className={`border-b hover:bg-muted/50 ${factory.factoryName === 'مصنعنا' ? 'bg-blue-50 dark:bg-blue-950/20' : ''}`}
                      whileHover={{ scale: 1.01 }}
                      transition={{ duration: 0.2 }}
                    >
                      <td className="p-3 font-medium">{factory.factoryName}</td>
                      <td className="p-3">
                        <div className="flex items-center gap-2">
                          {getRankIcon(factory.ranking)}
                          <Badge variant={getBadgeVariant(factory.ranking)}>
                            #{factory.ranking}
                          </Badge>
                        </div>
                      </td>
                      <td className="p-3">{factory.consumption.toLocaleString()}</td>
                      <td className="p-3">
                        <div className="flex items-center gap-2">
                          <span>{factory.efficiency}%</span>
                          <div className="w-16 bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                            <div 
                              className="h-2 rounded-full bg-green-600" 
                              style={{ width: `${factory.efficiency}%` }}
                            />
                          </div>
                        </div>
                      </td>
                      <td className="p-3">{factory.cost.toLocaleString()}</td>
                      <td className="p-3">
                        <div className="flex items-center gap-2">
                          <span>{factory.renewablePercentage}%</span>
                          <div className="w-16 bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                            <div 
                              className="h-2 rounded-full bg-emerald-600" 
                              style={{ width: `${factory.renewablePercentage}%` }}
                            />
                          </div>
                        </div>
                      </td>
                      <td className="p-3 text-red-600">{factory.co2Emissions.toLocaleString()}</td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  );
}