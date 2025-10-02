import { useState } from "react";
import { motion } from "motion/react";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Badge } from "../components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../components/ui/select";
import { Calendar } from "../components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "../components/ui/popover";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { 
  FileText, 
  Download, 
  Calendar as CalendarIcon,
  Printer,
  Mail,
  Share2,
  BarChart3,
  PieChart,
  TrendingUp,
  DollarSign,
  Zap,
  Leaf,
  Settings,
  Clock
} from "lucide-react";
import { useSelector } from 'react-redux';
import { useLanguage } from "../contexts/LanguageContext";
import { format, addDays, subDays } from "date-fns";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart as RechartsPieChart, Pie, Cell } from "recharts";

export function Reports() {
  const { t, language } = useLanguage();
  const [selectedReport, setSelectedReport] = useState('monthly');
  const [dateRange, setDateRange] = useState({ from: subDays(new Date(), 30), to: new Date() });
  const [isGenerating, setIsGenerating] = useState(false);
  
  const energyData = useSelector((state) => state.app.energyData[0]);
  const factoryZones = useSelector((state) => state.app.factoryZones);
  const currentFactory = useSelector((state) => state.app.currentFactory);

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

  const reportTypes = [
    {
      id: 'monthly',
      title: 'تقرير شهري',
      description: 'تقرير شامل للأداء الشهري',
      icon: BarChart3,
      color: 'blue'
    },
    {
      id: 'sustainability',
      title: 'تقرير الاستدامة',
      description: 'تحليل الأثر البيئي والاستدامة',
      icon: Leaf,
      color: 'green'
    },
    {
      id: 'financial',
      title: 'التقرير المالي',
      description: 'تحليل التكاليف والتوفير',
      icon: DollarSign,
      color: 'orange'
    },
    {
      id: 'efficiency',
      title: 'تقرير الكفاءة',
      description: 'تحليل مفصل لكفاءة الطاقة',
      icon: TrendingUp,
      color: 'purple'
    }
  ];

  const monthlyData = [
    { month: 'يناير', consumption: 2100, cost: 2520, co2: 1260, efficiency: 85.2 },
    { month: 'فبراير', consumption: 1950, cost: 2340, co2: 1170, efficiency: 87.1 },
    { month: 'مارس', consumption: 2200, cost: 2640, co2: 1320, efficiency: 86.8 },
    { month: 'أبريل', consumption: 2050, cost: 2460, co2: 1230, efficiency: 88.2 },
    { month: 'مايو', consumption: 2350, cost: 2820, co2: 1410, efficiency: 87.9 },
    { month: 'يونيو', consumption: 2450, cost: 2940, co2: 1470, efficiency: 87.5 }
  ];

  const zoneData = factoryZones.map(zone => ({
    name: zone.name,
    consumption: zone.consumption,
    efficiency: zone.efficiency,
    cost: (zone.consumption * 1.2).toFixed(0)
  }));

  const COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#8b5cf6'];

  const generateReport = async () => {
    setIsGenerating(true);
    // Simulate report generation
    await new Promise(resolve => setTimeout(resolve, 2000));
    setIsGenerating(false);
    
    // Create report data
    const reportData = {
      type: selectedReport,
      period: `${format(dateRange.from, 'dd/MM/yyyy')} - ${format(dateRange.to, 'dd/MM/yyyy')}`,
      generated: new Date().toISOString(),
      data: {
        consumption: energyData.consumption,
        efficiency: energyData.efficiency,
        cost: energyData.cost,
        renewable: energyData.renewable,
        zones: zoneData,
        monthly: monthlyData
      }
    };

    // Download as JSON
    const blob = new Blob([JSON.stringify(reportData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `energy-report-${selectedReport}-${format(new Date(), 'yyyy-MM-dd')}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const exportToPDF = () => {
    // Simulate PDF export
    alert('سيتم تصدير التقرير كـ PDF - ميزة قريباً');
  };

  const sendByEmail = () => {
    // Simulate email sending
    alert('سيتم إرسال التقرير عبر البريد الإلكتروني - ميزة قريباً');
  };

  const printReport = () => {
    window.print();
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
            <FileText className="h-8 w-8 text-blue-600" />
            <div>
              <h1 className="text-2xl font-bold">التقارير المتقدمة</h1>
              <p className="text-muted-foreground">تقارير شاملة ومفصلة لأداء نظام الطاقة</p>
            </div>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" onClick={printReport}>
              <Printer className="h-4 w-4 mr-2" />
              طباعة
            </Button>
            <Button variant="outline" onClick={sendByEmail}>
              <Mail className="h-4 w-4 mr-2" />
              إرسال
            </Button>
            <Button onClick={generateReport} disabled={isGenerating}>
              {isGenerating ? (
                <Clock className="h-4 w-4 mr-2 animate-spin" />
              ) : (
                <Download className="h-4 w-4 mr-2" />
              )}
              {isGenerating ? 'جاري الإنشاء...' : 'تصدير التقرير'}
            </Button>
          </div>
        </div>
      </motion.div>

      {/* Report Configuration */}
      <motion.div variants={itemVariants}>
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Settings className="h-5 w-5 text-gray-600" />
              إعدادات التقرير
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-3">
              <div className="space-y-2">
                <Label>نوع التقرير</Label>
                <Select value={selectedReport} onValueChange={setSelectedReport}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {reportTypes.map(type => (
                      <SelectItem key={type.id} value={type.id}>
                        {type.title}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label>تاريخ البداية</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="outline" className="w-full justify-start">
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {dateRange.from ? format(dateRange.from, 'dd/MM/yyyy') : 'اختر التاريخ'}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={dateRange.from}
                      onSelect={(date) => setDateRange(prev => ({ ...prev, from: date }))}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>
              
              <div className="space-y-2">
                <Label>تاريخ النهاية</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="outline" className="w-full justify-start">
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {dateRange.to ? format(dateRange.to, 'dd/MM/yyyy') : 'اختر التاريخ'}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={dateRange.to}
                      onSelect={(date) => setDateRange(prev => ({ ...prev, to: date }))}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Report Types Grid */}
      <motion.div variants={itemVariants}>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {reportTypes.map((type, index) => {
            const Icon = type.icon;
            const isSelected = selectedReport === type.id;
            return (
              <motion.div
                key={type.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Card 
                  className={`cursor-pointer transition-all ${
                    isSelected ? 'ring-2 ring-blue-500 bg-blue-50 dark:bg-blue-950/30' : ''
                  }`}
                  onClick={() => setSelectedReport(type.id)}
                >
                  <CardContent className="p-4">
                    <div className="flex items-center gap-3">
                      <div className={`p-2 rounded-lg ${
                        type.color === 'blue' ? 'bg-blue-100 dark:bg-blue-950/50' :
                        type.color === 'green' ? 'bg-green-100 dark:bg-green-950/50' :
                        type.color === 'orange' ? 'bg-orange-100 dark:bg-orange-950/50' :
                        'bg-purple-100 dark:bg-purple-950/50'
                      }`}>
                        <Icon className={`h-5 w-5 ${
                          type.color === 'blue' ? 'text-blue-600' :
                          type.color === 'green' ? 'text-green-600' :
                          type.color === 'orange' ? 'text-orange-600' :
                          'text-purple-600'
                        }`} />
                      </div>
                      <div>
                        <h3 className="font-medium">{type.title}</h3>
                        <p className="text-sm text-muted-foreground">{type.description}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </div>
      </motion.div>

      {/* Report Content */}
      <motion.div variants={itemVariants}>
        <Tabs defaultValue="summary" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="summary">ملخص تنفيذي</TabsTrigger>
            <TabsTrigger value="detailed">تحليل مفصل</TabsTrigger>
            <TabsTrigger value="charts">الرسوم البيانية</TabsTrigger>
            <TabsTrigger value="recommendations">التوصيات</TabsTrigger>
          </TabsList>

          {/* Executive Summary */}
          <TabsContent value="summary" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-center">
                  تقرير الأداء الشهري - {currentFactory.name}
                </CardTitle>
                <p className="text-center text-muted-foreground">
                  {format(dateRange.from, 'dd MMMM yyyy')} - {format(dateRange.to, 'dd MMMM yyyy')}
                </p>
              </CardHeader>
              <CardContent>
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                  <div className="text-center p-4 border rounded-lg">
                    <Zap className="h-8 w-8 mx-auto mb-2 text-blue-600" />
                    <div className="text-2xl font-bold">{energyData.consumption.toLocaleString()}</div>
                    <div className="text-sm text-muted-foreground">كيلوواط ساعة</div>
                    <Badge variant="secondary" className="mt-2">+9.4%</Badge>
                  </div>
                  
                  <div className="text-center p-4 border rounded-lg">
                    <TrendingUp className="h-8 w-8 mx-auto mb-2 text-green-600" />
                    <div className="text-2xl font-bold">{energyData.efficiency}%</div>
                    <div className="text-sm text-muted-foreground">كفاءة الطاقة</div>
                    <Badge variant="default" className="mt-2 bg-green-100 text-green-800">+5.2%</Badge>
                  </div>
                  
                  <div className="text-center p-4 border rounded-lg">
                    <DollarSign className="h-8 w-8 mx-auto mb-2 text-orange-600" />
                    <div className="text-2xl font-bold">{energyData.cost.toLocaleString()}</div>
                    <div className="text-sm text-muted-foreground">جنيه مصري</div>
                    <Badge variant="default" className="mt-2 bg-red-100 text-red-800">-8.1%</Badge>
                  </div>
                  
                  <div className="text-center p-4 border rounded-lg">
                    <Leaf className="h-8 w-8 mx-auto mb-2 text-emerald-600" />
                    <div className="text-2xl font-bold">{currentFactory.co2Emissions}</div>
                    <div className="text-sm text-muted-foreground">كجم CO2</div>
                    <Badge variant="default" className="mt-2 bg-green-100 text-green-800">-12.5%</Badge>
                  </div>
                </div>

                <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-950/30 rounded-lg">
                  <h3 className="font-semibold text-blue-900 dark:text-blue-100 mb-2">
                    النتائج الرئيسية
                  </h3>
                  <ul className="text-sm text-blue-800 dark:text-blue-200 space-y-1">
                    <li>• تحسن في كفاءة الطاقة بنسبة 5.2% مقارنة بالشهر السابق</li>
                    <li>• انخفاض في التكاليف الإجمالية بقيمة 260 جنيه مصري</li>
                    <li>• زيادة استخدام الطاقة المتجددة إلى 35.2%</li>
                    <li>• تقليل انبعاثات الكربون بنسبة 12.5%</li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Detailed Analysis */}
          <TabsContent value="detailed" className="space-y-6">
            <div className="grid gap-6 lg:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>تحليل الاستهلاك بالمناطق</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {zoneData.map((zone, index) => (
                      <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                        <div>
                          <div className="font-medium">{zone.name}</div>
                          <div className="text-sm text-muted-foreground">
                            كفاءة: {zone.efficiency}%
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="font-bold">{zone.consumption} kWh</div>
                          <div className="text-sm text-muted-foreground">
                            {zone.cost} ج.م
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>مؤشرات الأداء</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>تحقيق أهداف الكفاءة</span>
                        <span>97.2%</span>
                      </div>
                      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                        <div className="bg-green-600 h-2 rounded-full" style={{ width: '97.2%' }} />
                      </div>
                    </div>
                    
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>استخدام الطاقة المتجددة</span>
                        <span>88%</span>
                      </div>
                      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                        <div className="bg-blue-600 h-2 rounded-full" style={{ width: '88%' }} />
                      </div>
                    </div>
                    
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>تقليل الانبعاثات</span>
                        <span>112.5%</span>
                      </div>
                      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                        <div className="bg-emerald-600 h-2 rounded-full" style={{ width: '100%' }} />
                      </div>
                    </div>
                    
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>توفير التكاليف</span>
                        <span>108.1%</span>
                      </div>
                      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                        <div className="bg-orange-600 h-2 rounded-full" style={{ width: '100%' }} />
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>تحليل الاتجاهات</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 md:grid-cols-3">
                  <div className="text-center p-4 bg-green-50 dark:bg-green-950/30 rounded-lg">
                    <TrendingUp className="h-6 w-6 mx-auto mb-2 text-green-600" />
                    <div className="font-semibold text-green-700 dark:text-green-300">اتجاه إيجابي</div>
                    <div className="text-sm text-green-600">كفاءة الطاقة</div>
                  </div>
                  
                  <div className="text-center p-4 bg-blue-50 dark:bg-blue-950/30 rounded-lg">
                    <TrendingUp className="h-6 w-6 mx-auto mb-2 text-blue-600" />
                    <div className="font-semibold text-blue-700 dark:text-blue-300">اتجاه إيجابي</div>
                    <div className="text-sm text-blue-600">الطاقة المتجددة</div>
                  </div>
                  
                  <div className="text-center p-4 bg-orange-50 dark:bg-orange-950/30 rounded-lg">
                    <TrendingUp className="h-6 w-6 mx-auto mb-2 text-orange-600" />
                    <div className="font-semibold text-orange-700 dark:text-orange-300">اتجاه إيجابي</div>
                    <div className="text-sm text-orange-600">توفير التكاليف</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Charts */}
          <TabsContent value="charts" className="space-y-6">
            <div className="grid gap-6 lg:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>الاستهلاك الشهري</CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <AreaChart data={monthlyData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip />
                      <Area 
                        type="monotone" 
                        dataKey="consumption" 
                        stroke="#3b82f6" 
                        fill="#3b82f6" 
                        fillOpacity={0.3}
                        name="الاستهلاك (kWh)"
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>توزيع الاستهلاك</CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <RechartsPieChart>
                      <Pie
                        data={zoneData}
                        cx="50%"
                        cy="50%"
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="consumption"
                        label={({ name, value }) => `${name}: ${value}`}
                      >
                        {zoneData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </RechartsPieChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>مقارنة التكاليف والكفاءة</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={400}>
                  <BarChart data={monthlyData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="cost" fill="#f59e0b" name="التكلفة (ج.م)" />
                    <Bar dataKey="efficiency" fill="#10b981" name="الكفاءة (%)" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Recommendations */}
          <TabsContent value="recommendations" className="space-y-6">
            <div className="grid gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-green-700 dark:text-green-300">
                    توصيات قصيرة المدى (0-3 شهور)
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-start gap-3 p-3 bg-green-50 dark:bg-green-950/30 rounded-lg">
                      <div className="w-2 h-2 bg-green-500 rounded-full mt-2" />
                      <div>
                        <h4 className="font-medium">تحسين جدولة الأحمال</h4>
                        <p className="text-sm text-muted-foreground">
                          إعادة توزيع الأحمال لتجنب ساعات الذروة وتوفير 320 ج.م شهرياً
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-3 p-3 bg-green-50 dark:bg-green-950/30 rounded-lg">
                      <div className="w-2 h-2 bg-green-500 rounded-full mt-2" />
                      <div>
                        <h4 className="font-medium">صيانة دورية للمعدات</h4>
                        <p className="text-sm text-muted-foreground">
                          برنامج صيانة وقائية لتحسين الكفاءة بنسبة 5%
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-blue-700 dark:text-blue-300">
                    توصيات متوسطة المدى (3-12 شهر)
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-start gap-3 p-3 bg-blue-50 dark:bg-blue-950/30 rounded-lg">
                      <div className="w-2 h-2 bg-blue-500 rounded-full mt-2" />
                      <div>
                        <h4 className="font-medium">تحديث أنظمة الإضاءة</h4>
                        <p className="text-sm text-muted-foreground">
                          استبدال الإضاءة التقليدية بـ LED لتوفير 25% من استهلاك الإضاءة
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-3 p-3 bg-blue-50 dark:bg-blue-950/30 rounded-lg">
                      <div className="w-2 h-2 bg-blue-500 rounded-full mt-2" />
                      <div>
                        <h4 className="font-medium">تحسين العزل الحراري</h4>
                        <p className="text-sm text-muted-foreground">
                          تحسين عزل المباني لتقليل أحمال التكييف بنسبة 15%
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-purple-700 dark:text-purple-300">
                    توصيات طويلة المدى (1+ سنة)
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-start gap-3 p-3 bg-purple-50 dark:bg-purple-950/30 rounded-lg">
                      <div className="w-2 h-2 bg-purple-500 rounded-full mt-2" />
                      <div>
                        <h4 className="font-medium">زيادة الطاقة المتجددة</h4>
                        <p className="text-sm text-muted-foreground">
                          رفع نسبة الطاقة المتجددة إلى 50% عبر تركيب ألواح شمسية إضافية
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-3 p-3 bg-purple-50 dark:bg-purple-950/30 rounded-lg">
                      <div className="w-2 h-2 bg-purple-500 rounded-full mt-2" />
                      <div>
                        <h4 className="font-medium">تطبيق معايير ISO 50001</h4>
                        <p className="text-sm text-muted-foreground">
                          الحصول على شهادة إدارة الطاقة الدولية لتحسين الأداء الشامل
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </motion.div>
    </motion.div>
  );
}