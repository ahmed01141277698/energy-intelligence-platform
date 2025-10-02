import { useState } from "react";
import { motion } from "motion/react";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Badge } from "../components/ui/badge";
import { Progress } from "../components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs";
import { Calendar } from "../components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "../components/ui/popover";
import { 
  Wrench, 
  Calendar as CalendarIcon,
  AlertTriangle,
  CheckCircle,
  Clock,
  Settings,
  TrendingUp,
  Zap,
  Plus,
  Filter,
  Download
} from "lucide-react";
import { useLanguage } from "../contexts/LanguageContext";
import { format, addDays, addWeeks } from "date-fns";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from "recharts";

export function Maintenance() {
  const { t } = useLanguage();
  const [selectedDate, setSelectedDate] = useState(new Date());

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

  const maintenanceSchedule = [
    {
      id: 1,
      equipment: 'محرك التبريد الرئيسي',
      type: 'صيانة دورية',
      priority: 'high',
      dueDate: addDays(new Date(), 3),
      lastMaintenance: new Date('2024-05-15'),
      status: 'urgent',
      estimatedTime: '4 ساعات',
      technician: 'أحمد محمد',
      location: 'قسم التكييف'
    },
    {
      id: 2,
      equipment: 'نظام الإضاءة LED',
      type: 'فحص دوري',
      priority: 'medium',
      dueDate: addDays(new Date(), 7),
      lastMaintenance: new Date('2024-06-01'),
      status: 'scheduled',
      estimatedTime: '2 ساعة',
      technician: 'محمود علي',
      location: 'جميع الأقسام'
    },
    {
      id: 3,
      equipment: 'ألواح الطاقة الشمسية',
      type: 'تنظيف وفحص',
      priority: 'medium',
      dueDate: addDays(new Date(), 10),
      lastMaintenance: new Date('2024-05-20'),
      status: 'scheduled',
      estimatedTime: '3 ساعات',
      technician: 'سامي حسن',
      location: 'السطح'
    },
    {
      id: 4,
      equipment: 'محولات الكهرباء',
      type: 'صيانة وقائية',
      priority: 'high',
      dueDate: addDays(new Date(), 14),
      lastMaintenance: new Date('2024-04-10'),
      status: 'planned',
      estimatedTime: '6 ساعات',
      technician: 'خالد أحمد',
      location: 'غرفة المحولات'
    },
    {
      id: 5,
      equipment: 'أنظمة العزل الحراري',
      type: 'فحص شامل',
      priority: 'low',
      dueDate: addDays(new Date(), 21),
      lastMaintenance: new Date('2024-03-15'),
      status: 'planned',
      estimatedTime: '8 ساعات',
      technician: 'عمر محمود',
      location: 'المبنى بالكامل'
    }
  ];

  const maintenanceHistory = [
    { month: 'يناير', completed: 8, planned: 10, cost: 4500, efficiency: 95 },
    { month: 'فبراير', completed: 12, planned: 12, cost: 5200, efficiency: 97 },
    { month: 'مارس', completed: 9, planned: 11, cost: 4800, efficiency: 94 },
    { month: 'أبريل', completed: 14, planned: 15, cost: 6100, efficiency: 98 },
    { month: 'مايو', completed: 11, planned: 13, cost: 5500, efficiency: 96 },
    { month: 'يونيو', completed: 7, planned: 9, cost: 3900, efficiency: 93 }
  ];

  const equipmentStatus = [
    { name: 'ممتاز', count: 15, color: '#10b981' },
    { name: 'جيد', count: 8, color: '#3b82f6' },
    { name: 'يحتاج صيانة', count: 3, color: '#f59e0b' },
    { name: 'عطل', count: 1, color: '#ef4444' }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'urgent': return 'text-red-600';
      case 'scheduled': return 'text-orange-600';
      case 'planned': return 'text-blue-600';
      case 'completed': return 'text-green-600';
      default: return 'text-gray-600';
    }
  };

  const getStatusBg = (status) => {
    switch (status) {
      case 'urgent': return 'bg-red-100 dark:bg-red-950/30';
      case 'scheduled': return 'bg-orange-100 dark:bg-orange-950/30';
      case 'planned': return 'bg-blue-100 dark:bg-blue-950/30';
      case 'completed': return 'bg-green-100 dark:bg-green-950/30';
      default: return 'bg-gray-100 dark:bg-gray-950/30';
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'urgent': return 'عاجل';
      case 'scheduled': return 'مجدولة';
      case 'planned': return 'مخططة';
      case 'completed': return 'مكتملة';
      default: return 'غير محدد';
    }
  };

  const getPriorityBadge = (priority) => {
    switch (priority) {
      case 'high': return 'destructive';
      case 'medium': return 'default';
      case 'low': return 'secondary';
      default: return 'outline';
    }
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
            <Wrench className="h-8 w-8 text-blue-600" />
            <div>
              <h1 className="text-2xl font-bold">الصيانة الذكية</h1>
              <p className="text-muted-foreground">
                إدارة وجدولة الصيانة الوقائية والطارئة للمعدات
              </p>
            </div>
          </div>
          <div className="flex gap-2">
            <Button variant="outline">
              <Download className="h-4 w-4 mr-2" />
              تصدير الجدول
            </Button>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              إضافة مهمة صيانة
            </Button>
          </div>
        </div>
      </motion.div>

      {/* Status Overview */}
      <motion.div variants={itemVariants}>
        <div className="grid gap-4 md:grid-cols-4">
          <Card className="bg-gradient-to-r from-red-50 to-red-100 dark:from-red-950/30 dark:to-red-900/30">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <AlertTriangle className="h-8 w-8 text-red-600" />
                <div>
                  <div className="text-2xl font-bold">
                    {maintenanceSchedule.filter(m => m.status === 'urgent').length}
                  </div>
                  <div className="text-sm text-muted-foreground">مهام عاجلة</div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-orange-50 to-orange-100 dark:from-orange-950/30 dark:to-orange-900/30">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <Clock className="h-8 w-8 text-orange-600" />
                <div>
                  <div className="text-2xl font-bold">
                    {maintenanceSchedule.filter(m => m.status === 'scheduled').length}
                  </div>
                  <div className="text-sm text-muted-foreground">مجدولة هذا الأسبوع</div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-blue-50 to-blue-100 dark:from-blue-950/30 dark:to-blue-900/30">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <Settings className="h-8 w-8 text-blue-600" />
                <div>
                  <div className="text-2xl font-bold">
                    {maintenanceSchedule.filter(m => m.status === 'planned').length}
                  </div>
                  <div className="text-sm text-muted-foreground">مخططة للشهر</div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-green-50 to-green-100 dark:from-green-950/30 dark:to-green-900/30">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <CheckCircle className="h-8 w-8 text-green-600" />
                <div>
                  <div className="text-2xl font-bold">96%</div>
                  <div className="text-sm text-muted-foreground">معدل إتمام المهام</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </motion.div>

      {/* Main Content */}
      <motion.div variants={itemVariants}>
        <Tabs defaultValue="schedule" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="schedule">جدول الصيانة</TabsTrigger>
            <TabsTrigger value="equipment">حالة المعدات</TabsTrigger>
            <TabsTrigger value="analytics">التحليلات</TabsTrigger>
            <TabsTrigger value="history">السجل</TabsTrigger>
          </TabsList>

          {/* Maintenance Schedule */}
          <TabsContent value="schedule" className="space-y-6">
            <div className="grid gap-6 lg:grid-cols-3">
              <div className="lg:col-span-2 space-y-4">
                {maintenanceSchedule.map((task, index) => (
                  <motion.div
                    key={task.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    whileHover={{ scale: 1.01 }}
                  >
                    <Card className={`border-l-4 ${
                      task.priority === 'high' ? 'border-l-red-500' :
                      task.priority === 'medium' ? 'border-l-orange-500' : 'border-l-blue-500'
                    }`}>
                      <CardHeader>
                        <div className="flex items-center justify-between">
                          <div>
                            <CardTitle className="text-lg">{task.equipment}</CardTitle>
                            <p className="text-muted-foreground">{task.type}</p>
                          </div>
                          <div className="flex items-center gap-2">
                            <Badge variant={getPriorityBadge(task.priority)}>
                              {task.priority === 'high' ? 'عالي' : task.priority === 'medium' ? 'متوسط' : 'منخفض'}
                            </Badge>
                            <Badge 
                              variant="outline" 
                              className={`${getStatusBg(task.status)} ${getStatusColor(task.status)}`}
                            >
                              {getStatusText(task.status)}
                            </Badge>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="grid gap-4 md:grid-cols-2">
                          <div className="space-y-2">
                            <div className="flex justify-between text-sm">
                              <span className="text-muted-foreground">الموعد المحدد:</span>
                              <span className="font-medium">
                                {format(task.dueDate, 'dd MMM yyyy')}
                              </span>
                            </div>
                            <div className="flex justify-between text-sm">
                              <span className="text-muted-foreground">آخر صيانة:</span>
                              <span>{format(task.lastMaintenance, 'dd MMM yyyy')}</span>
                            </div>
                            <div className="flex justify-between text-sm">
                              <span className="text-muted-foreground">الوقت المقدر:</span>
                              <span>{task.estimatedTime}</span>
                            </div>
                          </div>
                          
                          <div className="space-y-2">
                            <div className="flex justify-between text-sm">
                              <span className="text-muted-foreground">الفني المسؤول:</span>
                              <span className="font-medium">{task.technician}</span>
                            </div>
                            <div className="flex justify-between text-sm">
                              <span className="text-muted-foreground">الموقع:</span>
                              <span>{task.location}</span>
                            </div>
                            <div className="flex justify-between text-sm">
                              <span className="text-muted-foreground">الأيام المتبقية:</span>
                              <span className={`font-medium ${
                                Math.ceil((task.dueDate - new Date()) / (1000 * 60 * 60 * 24)) <= 3 ? 'text-red-600' : ''
                              }`}>
                                {Math.ceil((task.dueDate - new Date()) / (1000 * 60 * 60 * 24))} يوم
                              </span>
                            </div>
                          </div>
                        </div>
                        
                        <div className="flex gap-2 mt-4">
                          <Button size="sm" variant="outline">
                            <Settings className="h-4 w-4 mr-2" />
                            تعديل
                          </Button>
                          <Button size="sm">
                            <CheckCircle className="h-4 w-4 mr-2" />
                            بدء المهمة
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>

              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>التقويم</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Calendar
                      mode="single"
                      selected={selectedDate}
                      onSelect={setSelectedDate}
                      className="rounded-md border"
                    />
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>إحصائيات سريعة</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="text-center p-3 border rounded-lg">
                        <div className="text-lg font-bold text-blue-600">27</div>
                        <div className="text-sm text-muted-foreground">إجمالي المعدات</div>
                      </div>
                      
                      <div className="text-center p-3 border rounded-lg">
                        <div className="text-lg font-bold text-green-600">5,400</div>
                        <div className="text-sm text-muted-foreground">تكلفة الصيانة (ج.م)</div>
                      </div>
                      
                      <div className="text-center p-3 border rounded-lg">
                        <div className="text-lg font-bold text-orange-600">12.5</div>
                        <div className="text-sm text-muted-foreground">ساعات صيانة هذا الشهر</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          {/* Equipment Status */}
          <TabsContent value="equipment" className="space-y-6">
            <div className="grid gap-6 lg:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>حالة المعدات</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {equipmentStatus.map((status, index) => (
                      <div key={index} className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div 
                            className="w-4 h-4 rounded-full" 
                            style={{ backgroundColor: status.color }}
                          />
                          <span>{status.name}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="font-medium">{status.count}</span>
                          <div className="w-20">
                            <Progress 
                              value={(status.count / 27) * 100} 
                              className="h-2"
                              style={{ '--progress-foreground': status.color }}
                            />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>معدات تحتاج انتباه</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="p-3 border rounded-lg border-red-200 bg-red-50 dark:bg-red-950/30">
                      <div className="flex items-center gap-2">
                        <AlertTriangle className="h-4 w-4 text-red-600" />
                        <span className="font-medium text-red-800 dark:text-red-300">
                          مضخة المياه الرئيسية
                        </span>
                      </div>
                      <p className="text-sm text-red-700 dark:text-red-400 mt-1">
                        انخفاض في الضغط - يحتاج فحص فوري
                      </p>
                    </div>
                    
                    <div className="p-3 border rounded-lg border-orange-200 bg-orange-50 dark:bg-orange-950/30">
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4 text-orange-600" />
                        <span className="font-medium text-orange-800 dark:text-orange-300">
                          أنظمة التهوية
                        </span>
                      </div>
                      <p className="text-sm text-orange-700 dark:text-orange-400 mt-1">
                        صيانة دورية مستحقة منذ أسبوع
                      </p>
                    </div>
                    
                    <div className="p-3 border rounded-lg border-blue-200 bg-blue-50 dark:bg-blue-950/30">
                      <div className="flex items-center gap-2">
                        <Zap className="h-4 w-4 text-blue-600" />
                        <span className="font-medium text-blue-800 dark:text-blue-300">
                          البطاريات الاحتياطية
                        </span>
                      </div>
                      <p className="text-sm text-blue-700 dark:text-blue-400 mt-1">
                        فحص الشحن والأداء مجدول غداً
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Analytics */}
          <TabsContent value="analytics" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>تحليل أداء الصيانة</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={400}>
                  <BarChart data={maintenanceHistory}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="completed" fill="#10b981" name="المكتملة" />
                    <Bar dataKey="planned" fill="#3b82f6" name="المخططة" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <div className="grid gap-6 lg:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>تكاليف الصيانة</CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <AreaChart data={maintenanceHistory}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip />
                      <Area 
                        type="monotone" 
                        dataKey="cost" 
                        stroke="#f59e0b" 
                        fill="#f59e0b" 
                        fillOpacity={0.3}
                        name="التكلفة (ج.م)"
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>تأثير الصيانة على الكفاءة</CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <AreaChart data={maintenanceHistory}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip />
                      <Area 
                        type="monotone" 
                        dataKey="efficiency" 
                        stroke="#10b981" 
                        fill="#10b981" 
                        fillOpacity={0.3}
                        name="الكفاءة (%)"
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* History */}
          <TabsContent value="history" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>سجل الصيانة المكتملة</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { equipment: 'نظام التكييف المركزي', date: '2024-06-25', technician: 'أحمد محمد', duration: '3 ساعات', cost: 850 },
                    { equipment: 'ألواح الطاقة الشمسية', date: '2024-06-20', technician: 'سامي حسن', duration: '2 ساعة', cost: 400 },
                    { equipment: 'محرك الضاغط', date: '2024-06-18', technician: 'محمود علي', duration: '4 ساعات', cost: 1200 },
                    { equipment: 'نظام الإضاءة الذكية', date: '2024-06-15', technician: 'خالد أحمد', duration: '1.5 ساعة', cost: 300 },
                    { equipment: 'المولد الاحتياطي', date: '2024-06-10', technician: 'عمر محمود', duration: '5 ساعات', cost: 1500 }
                  ].map((record, index) => (
                    <motion.div
                      key={index}
                      className="flex items-center justify-between p-4 border rounded-lg"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                    >
                      <div className="flex items-center gap-4">
                        <CheckCircle className="h-5 w-5 text-green-600" />
                        <div>
                          <h4 className="font-medium">{record.equipment}</h4>
                          <p className="text-sm text-muted-foreground">
                            بواسطة {record.technician} - {record.date}
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-medium">{record.cost} ج.م</div>
                        <div className="text-sm text-muted-foreground">{record.duration}</div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </motion.div>
    </motion.div>
  );
}