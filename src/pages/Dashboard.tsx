import { motion } from "motion/react";
import { EnergyStats } from "../components/energy-stats";
import { ConsumptionChart } from "../components/consumption-chart";
import { AIPredictions } from "../components/ai-predictions";
import { ConsumptionTable } from "../components/consumption-table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs";
import { useLanguage } from "../contexts/LanguageContext";

export function Dashboard() {
  const { t } = useLanguage();

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

  return (
    <motion.div
      className="space-y-6"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Main Stats */}
      <motion.div variants={itemVariants}>
        <EnergyStats />
      </motion.div>
      
      {/* Main Content Tabs */}
      <motion.div variants={itemVariants}>
        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">{t('overview')}</TabsTrigger>
            <TabsTrigger value="analysis">{t('analysis')}</TabsTrigger>
            <TabsTrigger value="predictions">{t('predictions')}</TabsTrigger>
            <TabsTrigger value="calculator">{t('calculator')}</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <ConsumptionChart />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <ConsumptionTable />
            </motion.div>
          </TabsContent>

          <TabsContent value="analysis" className="space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <ConsumptionChart />
            </motion.div>
            <motion.div 
              className="grid gap-4 lg:grid-cols-2"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <motion.div 
                className="space-y-4"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.2 }}
              >
                <h3 className="text-lg font-semibold">تحليل الأداء</h3>
                <div className="grid gap-4">
                  <motion.div 
                    className="bg-green-50 dark:bg-green-950/30 p-4 rounded-lg border border-green-200 dark:border-green-800"
                    whileHover={{ scale: 1.02 }}
                    transition={{ duration: 0.2 }}
                  >
                    <h4 className="font-medium text-green-800 dark:text-green-300">نقاط القوة</h4>
                    <ul className="text-sm text-green-700 dark:text-green-400 mt-2 space-y-1">
                      <li>• كفاءة عالية في استخدام الطاقة المتجددة</li>
                      <li>• تحسن مستمر في الكفاءة العامة</li>
                      <li>• انخفاض في التكاليف الشهرية</li>
                    </ul>
                  </motion.div>
                  
                  <motion.div 
                    className="bg-yellow-50 dark:bg-yellow-950/30 p-4 rounded-lg border border-yellow-200 dark:border-yellow-800"
                    whileHover={{ scale: 1.02 }}
                    transition={{ duration: 0.2 }}
                  >
                    <h4 className="font-medium text-yellow-800 dark:text-yellow-300">مجالات التحسين</h4>
                    <ul className="text-sm text-yellow-700 dark:text-yellow-400 mt-2 space-y-1">
                      <li>• تقليل نسبة الهالك في ساعات الذروة</li>
                      <li>• تحسين جدولة الأحمال</li>
                      <li>• زيادة الاعتماد على الطاقة المتجددة</li>
                    </ul>
                  </motion.div>
                </div>
              </motion.div>
              
              <motion.div 
                className="space-y-4"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.2 }}
              >
                <h3 className="text-lg font-semibold">مقارنة بالأهداف</h3>
                <div className="space-y-3">
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    transition={{ duration: 0.2 }}
                  >
                    <div className="flex justify-between text-sm mb-1">
                      <span>هدف الكفاءة (90%)</span>
                      <span>87.5% / 90%</span>
                    </div>
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                      <motion.div 
                        className="bg-blue-600 h-2 rounded-full" 
                        initial={{ width: 0 }}
                        animate={{ width: '97.2%' }}
                        transition={{ duration: 1, delay: 0.5 }}
                      />
                    </div>
                  </motion.div>
                  
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    transition={{ duration: 0.2 }}
                  >
                    <div className="flex justify-between text-sm mb-1">
                      <span>هدف الطاقة المتجددة (40%)</span>
                      <span>35.2% / 40%</span>
                    </div>
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                      <motion.div 
                        className="bg-green-600 h-2 rounded-full" 
                        initial={{ width: 0 }}
                        animate={{ width: '88%' }}
                        transition={{ duration: 1, delay: 0.7 }}
                      />
                    </div>
                  </motion.div>
                  
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    transition={{ duration: 0.2 }}
                  >
                    <div className="flex justify-between text-sm mb-1">
                      <span>هدف تقليل الهالك (أقل من 10%)</span>
                      <span>12.5% / 10%</span>
                    </div>
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                      <motion.div 
                        className="bg-red-600 h-2 rounded-full" 
                        initial={{ width: 0 }}
                        animate={{ width: '125%' }}
                        transition={{ duration: 1, delay: 0.9 }}
                      />
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            </motion.div>
          </TabsContent>

          <TabsContent value="predictions" className="space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <AIPredictions />
            </motion.div>
          </TabsContent>

          <TabsContent value="calculator" className="space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <div className="text-center p-8">
                <h3 className="text-lg font-semibold mb-2">حاسبة التكلفة متاحة في القسم المخصص</h3>
                <p className="text-muted-foreground">استخدم التنقل للوصول إلى حاسبة التكلفة المتقدمة</p>
              </div>
            </motion.div>
          </TabsContent>
        </Tabs>
      </motion.div>
    </motion.div>
  );
}