import { useState } from "react";
import { motion } from "motion/react";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Button } from "../components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../components/ui/select";
import { Separator } from "../components/ui/separator";
import { Progress } from "../components/ui/progress";
import { Badge } from "../components/ui/badge";
import { Calculator, Receipt, Zap, TrendingDown, TrendingUp, Download, Save } from "lucide-react";
import { useLanguage } from "../contexts/LanguageContext";
import { EnergyCalculations, EGYPTIAN_TARIFF } from "../utils/energyCalculations";

export function CalculatorPage() {
  const { t } = useLanguage();
  
  // Calculator state
  const [consumption, setConsumption] = useState(2450);
  const [voltage, setVoltage] = useState(380);
  const [current, setCurrent] = useState(18.5);
  const [powerFactor, setPowerFactor] = useState(0.85);
  const [efficiency, setEfficiency] = useState(87.5);
  const [operatingHours, setOperatingHours] = useState(24);
  const [tariffType, setTariffType] = useState('residential');
  const [customTariff, setCustomTariff] = useState(1.20);
  
  // Calculated values
  const threePhasePower = EnergyCalculations.calculateThreePhasePower(voltage, current, powerFactor);
  const energyConsumption = EnergyCalculations.calculateEnergyConsumption(threePhasePower, operatingHours);
  const usefulEnergy = (energyConsumption * efficiency) / 100;
  const losses = energyConsumption - usefulEnergy;
  const lossesPercentage = (losses / energyConsumption) * 100;
  const reactivePower = EnergyCalculations.calculateReactivePower(voltage, current, powerFactor);
  const apparentPower = EnergyCalculations.calculateApparentPower(voltage, current);
  
  const finalTariff = tariffType === 'custom' ? customTariff : 1.20;
  const totalCost = tariffType === 'egyptian' 
    ? EnergyCalculations.calculateEnergyCost(energyConsumption, EGYPTIAN_TARIFF)
    : energyConsumption * finalTariff;
  
  const costPerUsefulKWh = totalCost / usefulEnergy;
  
  // Power factor correction calculation
  const pfCorrection = EnergyCalculations.calculatePowerFactorCorrection(threePhasePower, powerFactor, 0.95);

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

  const exportResults = () => {
    const results = {
      inputs: { consumption, voltage, current, powerFactor, efficiency, operatingHours, tariffType, customTariff },
      calculations: {
        threePhasePower,
        energyConsumption,
        usefulEnergy,
        losses,
        lossesPercentage,
        reactivePower,
        apparentPower,
        totalCost,
        costPerUsefulKWh,
        pfCorrection
      },
      timestamp: new Date().toISOString()
    };
    
    const blob = new Blob([JSON.stringify(results, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `energy-calculation-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
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
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Calculator className="h-8 w-8 text-blue-600" />
            <div>
              <h1 className="text-2xl font-bold">{t('calculator')}</h1>
              <p className="text-muted-foreground">حاسبة الطاقة المتقدمة مع الحسابات الفيزيائية</p>
            </div>
          </div>
          <div className="flex gap-2">
            <Button onClick={exportResults} variant="outline">
              <Download className="h-4 w-4 mr-2" />
              تصدير النتائج
            </Button>
            <Button>
              <Save className="h-4 w-4 mr-2" />
              حفظ الحسابات
            </Button>
          </div>
        </div>
      </motion.div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Input Parameters */}
        <motion.div variants={itemVariants}>
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Zap className="h-5 w-5 text-blue-600" />
                المعاملات الأساسية
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="voltage">الجهد الكهربائي ({t('voltage')})</Label>
                  <Input
                    id="voltage"
                    type="number"
                    value={voltage}
                    onChange={(e) => setVoltage(Number(e.target.value))}
                    className="text-right"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="current">التيار الكهربائي ({t('current')})</Label>
                  <Input
                    id="current"
                    type="number"
                    step="0.1"
                    value={current}
                    onChange={(e) => setCurrent(Number(e.target.value))}
                    className="text-right"
                  />
                </div>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="powerFactor">معامل القدرة</Label>
                  <Input
                    id="powerFactor"
                    type="number"
                    step="0.01"
                    min="0"
                    max="1"
                    value={powerFactor}
                    onChange={(e) => setPowerFactor(Number(e.target.value))}
                    className="text-right"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="efficiency">الكفاءة (%)</Label>
                  <Input
                    id="efficiency"
                    type="number"
                    min="0"
                    max="100"
                    value={efficiency}
                    onChange={(e) => setEfficiency(Number(e.target.value))}
                    className="text-right"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="operatingHours">ساعات التشغيل اليومية</Label>
                <Input
                  id="operatingHours"
                  type="number"
                  min="0"
                  max="24"
                  value={operatingHours}
                  onChange={(e) => setOperatingHours(Number(e.target.value))}
                  className="text-right"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="tariffType">نوع التعرفة</Label>
                <Select value={tariffType} onValueChange={setTariffType}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="egyptian">التعرفة المصرية المتدرجة</SelectItem>
                    <SelectItem value="flat">تعرفة ثابتة</SelectItem>
                    <SelectItem value="custom">تعرفة مخصصة</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {tariffType === 'custom' && (
                <div className="space-y-2">
                  <Label htmlFor="customTariff">التعرفة المخصصة ({t('egp')}/{t('kwh')})</Label>
                  <Input
                    id="customTariff"
                    type="number"
                    step="0.01"
                    value={customTariff}
                    onChange={(e) => setCustomTariff(Number(e.target.value))}
                    className="text-right"
                  />
                </div>
              )}
            </CardContent>
          </Card>
        </motion.div>

        {/* Results */}
        <motion.div variants={itemVariants}>
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Receipt className="h-5 w-5 text-green-600" />
                النتائج المحسوبة
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4">
                <div className="flex justify-between items-center p-3 bg-blue-50 dark:bg-blue-950/30 rounded-lg">
                  <span>القدرة الفعالة (P):</span>
                  <span className="font-bold text-blue-600">{threePhasePower.toFixed(2)} {t('kw')}</span>
                </div>
                
                <div className="flex justify-between items-center p-3 bg-purple-50 dark:bg-purple-950/30 rounded-lg">
                  <span>القدرة التفاعلية (Q):</span>
                  <span className="font-bold text-purple-600">{reactivePower.toFixed(2)} kVAR</span>
                </div>
                
                <div className="flex justify-between items-center p-3 bg-indigo-50 dark:bg-indigo-950/30 rounded-lg">
                  <span>القدرة الظاهرية (S):</span>
                  <span className="font-bold text-indigo-600">{apparentPower.toFixed(2)} kVA</span>
                </div>
              </div>

              <Separator />

              <div className="space-y-3">
                <div className="flex justify-between">
                  <span>الاستهلاك اليومي:</span>
                  <span className="font-medium">{energyConsumption.toFixed(1)} {t('kwh')}</span>
                </div>
                
                <div className="flex justify-between">
                  <span>الطاقة المفيدة:</span>
                  <span className="font-medium text-green-600">{usefulEnergy.toFixed(1)} {t('kwh')}</span>
                </div>
                
                <div className="flex justify-between">
                  <span>الهالك:</span>
                  <span className="font-medium text-red-600">{losses.toFixed(1)} {t('kwh')} ({lossesPercentage.toFixed(1)}%)</span>
                </div>
                
                <div className="space-y-1">
                  <div className="flex justify-between text-sm">
                    <span>كفاءة الاستخدام</span>
                    <span>{efficiency}%</span>
                  </div>
                  <Progress value={efficiency} className="h-2" />
                </div>
              </div>

              <Separator />
              
              <div className="space-y-3">
                <div className="flex justify-between text-lg font-bold">
                  <span>إجمالي التكلفة اليومية:</span>
                  <span className="text-blue-600">{totalCost.toFixed(2)} {t('egp')}</span>
                </div>
                
                <div className="flex justify-between">
                  <span>تكلفة {t('kwh')} مفيد:</span>
                  <span className="font-medium">{costPerUsefulKWh.toFixed(2)} {t('egp')}</span>
                </div>
                
                <div className="flex justify-between">
                  <span>التكلفة الشهرية:</span>
                  <span className="font-medium">{(totalCost * 30).toFixed(2)} {t('egp')}</span>
                </div>
              </div>

              <div className="bg-yellow-50 dark:bg-yellow-950/30 p-3 rounded-lg">
                <p className="text-sm">
                  <strong>تحليل الأداء:</strong> {efficiency > 85 ? "كفاءة ممتازة" : efficiency > 75 ? "كفاءة جيدة" : "تحتاج تحسين"}
                  {lossesPercentage > 15 && " - نسبة الهالك مرتفعة"}
                  {powerFactor < 0.9 && " - معامل القدرة منخفض"}
                </p>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Power Factor Correction */}
      <motion.div variants={itemVariants}>
        <Card>
          <CardHeader>
            <CardTitle>تصحيح معامل القدرة</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-6 md:grid-cols-2">
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <Badge variant={powerFactor >= 0.9 ? "default" : "destructive"}>
                    معامل القدرة الحالي: {powerFactor}
                  </Badge>
                  {powerFactor < 0.9 && (
                    <TrendingDown className="h-4 w-4 text-red-500" />
                  )}
                  {powerFactor >= 0.9 && (
                    <TrendingUp className="h-4 w-4 text-green-500" />
                  )}
                </div>
                
                <div className="space-y-2">
                  <p className="text-sm text-muted-foreground">
                    {powerFactor < 0.9 
                      ? "معامل القدرة منخفض - يمكن تحسينه لخفض التكاليف"
                      : "معامل القدرة جيد - لا حاجة للتصحيح"
                    }
                  </p>
                  
                  {powerFactor < 0.9 && (
                    <div className="space-y-2 p-3 bg-orange-50 dark:bg-orange-950/30 border border-orange-200 dark:border-orange-800 rounded-lg">
                      <h4 className="font-medium text-orange-800 dark:text-orange-300">توصيات التحسين:</h4>
                      <ul className="text-sm text-orange-700 dark:text-orange-400 space-y-1">
                        <li>• مكثفات مطلوبة: {pfCorrection.capacitanceNeeded.toFixed(0)} µF</li>
                        <li>• تكلفة المكثفات: {pfCorrection.cost.toFixed(0)} {t('egp')}</li>
                        <li>• توفير شهري: {pfCorrection.savings.toFixed(0)} {t('egp')}</li>
                        <li>• مدة الاسترداد: {(pfCorrection.cost / pfCorrection.savings).toFixed(1)} شهر</li>
                      </ul>
                    </div>
                  )}
                </div>
              </div>
              
              <div className="space-y-4">
                <h4 className="font-medium">مقارنة التكاليف</h4>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>التكلفة الحالية (شهرياً)</span>
                    <span>{(totalCost * 30).toFixed(0)} {t('egp')}</span>
                  </div>
                  <div className="flex justify-between text-sm text-green-600">
                    <span>التكلفة بعد التحسين</span>
                    <span>{((totalCost * 30) - pfCorrection.savings).toFixed(0)} {t('egp')}</span>
                  </div>
                  <div className="flex justify-between text-sm font-medium text-blue-600">
                    <span>إجمالي التوفير السنوي</span>
                    <span>{(pfCorrection.savings * 12).toFixed(0)} {t('egp')}</span>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Advanced Calculations */}
      <motion.div variants={itemVariants}>
        <Card>
          <CardHeader>
            <CardTitle>حسابات متقدمة</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-6 md:grid-cols-3">
              <div className="space-y-2">
                <h4 className="font-medium">التحليل الزمني</h4>
                <div className="text-sm space-y-1">
                  <div className="flex justify-between">
                    <span>استهلاك ساعة واحدة:</span>
                    <span>{threePhasePower.toFixed(2)} {t('kwh')}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>استهلاك أسبوعي:</span>
                    <span>{(energyConsumption * 7).toFixed(0)} {t('kwh')}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>استهلاك شهري:</span>
                    <span>{(energyConsumption * 30).toFixed(0)} {t('kwh')}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>استهلاك سنوي:</span>
                    <span>{(energyConsumption * 365).toFixed(0)} {t('kwh')}</span>
                  </div>
                </div>
              </div>
              
              <div className="space-y-2">
                <h4 className="font-medium">التحليل البيئي</h4>
                <div className="text-sm space-y-1">
                  <div className="flex justify-between">
                    <span>انبعاثات CO2 يومية:</span>
                    <span>{(energyConsumption * 0.6).toFixed(1)} {t('kg')}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>انبعاثات CO2 شهرية:</span>
                    <span>{(energyConsumption * 30 * 0.6).toFixed(0)} {t('kg')}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>انبعاثات CO2 سنوية:</span>
                    <span>{(energyConsumption * 365 * 0.6 / 1000).toFixed(1)} طن</span>
                  </div>
                </div>
              </div>
              
              <div className="space-y-2">
                <h4 className="font-medium">مؤشرات الأداء</h4>
                <div className="text-sm space-y-1">
                  <div className="flex justify-between">
                    <span>كثافة الطاقة:</span>
                    <span>{(energyConsumption / 100).toFixed(2)} {t('kwh')}/م²</span>
                  </div>
                  <div className="flex justify-between">
                    <span>كفاءة الطاقة:</span>
                    <span className={efficiency > 85 ? "text-green-600" : "text-orange-600"}>
                      {efficiency > 85 ? "ممتازة" : efficiency > 75 ? "جيدة" : "ضعيفة"}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>تقييم معامل القدرة:</span>
                    <span className={powerFactor >= 0.9 ? "text-green-600" : "text-red-600"}>
                      {powerFactor >= 0.9 ? "جيد" : "يحتاج تحسين"}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  );
}