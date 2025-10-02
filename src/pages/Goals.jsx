import { useState } from "react";
import { motion } from "motion/react";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Badge } from "../components/ui/badge";
import { Progress } from "../components/ui/progress";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Textarea } from "../components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../components/ui/select";
import { Calendar } from "../components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "../components/ui/popover";
import { 
  Target, 
  TrendingUp, 
  Calendar as CalendarIcon,
  Plus,
  Edit,
  CheckCircle,
  Clock,
  AlertTriangle,
  Lightbulb,
  DollarSign,
  Zap,
  Leaf,
  Award,
  BarChart3
} from "lucide-react";
import { useSelector } from 'react-redux';
import { useLanguage } from "../contexts/LanguageContext";
import { format, addDays, addMonths } from "date-fns";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from "recharts";

export function Goals() {
  const { t } = useLanguage();
  const [activeTab, setActiveTab] = useState('current');
  const [newGoal, setNewGoal] = useState({
    title: '',
    description: '',
    targetValue: '',
    currentValue: '',
    unit: 'percentage',
    category: 'efficiency',
    deadline: addMonths(new Date(), 3),
    priority: 'medium'
  });

  const energyData = useSelector((state) => state.app.energyData[0]);

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

  const currentGoals = [
    {
      id: 1,
      title: 'تحسين كفاءة الطاقة',
      description: 'رفع كفاءة الطاقة الإجمالية إلى 90%',
      targetValue: 90,
      currentValue: 87.5,
      unit: '%',
      category: 'efficiency',
      deadline: addDays(new Date(), 45),
      priority: 'high',
      status: 'on-track',
      progress: 97.2,
      milestones: [
        { task: 'تحديث أنظمة الإضاءة', completed: true },
        { task: 'صيانة المعدات', completed: true },
        { task: 'تحسين العزل الحراري', completed: false },
        { task: 'تدريب الفريق', completed: false }
      ]
    },
    {
      id: 2,
      title: 'زيادة الطاقة المتجددة',
      description: 'رفع نسبة استخدام الطاقة المتجددة إلى 40%',
      targetValue: 40,
      currentValue: 35.2,
      unit: '%',
      category: 'renewable',
      deadline: addDays(new Date(), 90),
      priority: 'medium',
      status: 'on-track',
      progress: 88,
      milestones: [
        { task: 'تركيب ألواح شمسية إضافية', completed: true },
        { task: 'تحسين كفاءة البطاريات', completed: false },
        { task: 'ربط مع الشبكة الذكية', completed: false }
      ]
    },
    {
      id: 3,
      title: 'تقليل التكاليف الشهرية',
      description: 'خفض التكلفة الشهرية إلى أقل من 2,800 ج.م',
      targetValue: 2800,
      currentValue: 2940,
      unit: 'ج.م',
      category: 'cost',
      deadline: addDays(new Date(), 60),
      priority: 'high',
      status: 'at-risk',
      progress: 95,
      milestones: [
        { task: 'تحسين جدولة الأحمال', completed: true },
        { task: 'تقليل استهلاك الذروة', completed: false },
        { task: 'التفاوض على تعرفة أفضل', completed: false }
      ]
    },
    {
      id: 4,
      title: 'تقليل انبعاثات الكربون',
      description: 'تقليل انبعاثات CO2 إلى أقل من 1,200 كجم شهرياً',
      targetValue: 1200,
      currentValue: 1470,
      unit: 'كجم CO2',
      category: 'environment',
      deadline: addDays(new Date(), 120),
      priority: 'medium',
      status: 'behind',
      progress: 65,
      milestones: [
        { task: 'زيادة الطاقة النظيفة', completed: false },
        { task: 'تحسين كفاءة المعدات', completed: true },
        { task: 'تقليل الهالك', completed: false }
      ]
    }
  ];

  const goalCategories = [
    { id: 'efficiency', name: 'كفاءة الطاقة', icon: TrendingUp, color: 'blue' },
    { id: 'renewable', name: 'الطاقة المتجددة', icon: Zap, color: 'green' },
    { id: 'cost', name: 'تقليل التكاليف', icon: DollarSign, color: 'orange' },
    { id: 'environment', name: 'البيئة والاستدامة', icon: Leaf, color: 'emerald' }
  ];

  const achievements = [
    {
      id: 1,
      title: 'تحقيق هدف الكفاءة الشهرية',
      description: 'تم تجاوز هدف كفاءة 85% لشهر يونيو',
      date: '2024-06-30',
      category: 'efficiency',
      value: '87.5%'
    },
    {
      id: 2,
      title: 'توفير التكاليف',
      description: 'تم توفير 260 ج.م عن التكلفة المستهدفة',
      date: '2024-06-25',
      category: 'cost',
      value: '260 ج.م'
    },
    {
      id: 3,
      title: 'تحسين الطاقة المتجددة',
      description: 'زيادة استخدام الطاقة الشمسية بنسبة 15%',
      date: '2024-06-20',
      category: 'renewable',
      value: '15%'
    }
  ];

  const progressData = [
    { month: 'يناير', efficiency: 85.2, renewable: 28.5, cost: 3200 },
    { month: 'فبراير', efficiency: 87.1, renewable: 31.2, cost: 3100 },
    { month: 'مارس', efficiency: 86.8, renewable: 32.8, cost: 3050 },
    { month: 'أبريل', efficiency: 88.2, renewable: 34.1, cost: 2980 },
    { month: 'مايو', efficiency: 87.9, renewable: 35.8, cost: 2960 },
    { month: 'يونيو', efficiency: 87.5, renewable: 35.2, cost: 2940 }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'on-track': return 'text-green-600';
      case 'at-risk': return 'text-orange-600';
      case 'behind': return 'text-red-600';
      default: return 'text-gray-600';
    }
  };

  const getStatusBg = (status) => {
    switch (status) {
      case 'on-track': return 'bg-green-100 dark:bg-green-950/30';
      case 'at-risk': return 'bg-orange-100 dark:bg-orange-950/30';
      case 'behind': return 'bg-red-100 dark:bg-red-950/30';
      default: return 'bg-gray-100 dark:bg-gray-950/30';
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'on-track': return 'في المسار الصحيح';
      case 'at-risk': return 'معرض للخطر';
      case 'behind': return 'متأخر عن الجدول';
      default: return 'غير محدد';
    }
  };

  const getCategoryIcon = (category) => {
    const cat = goalCategories.find(c => c.id === category);
    return cat ? cat.icon : Target;
  };

  const getCategoryColor = (category) => {
    const cat = goalCategories.find(c => c.id === category);
    return cat ? cat.color : 'gray';
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
            <Target className="h-8 w-8 text-blue-600" />
            <div>
              <h1 className="text-2xl font-bold">الأهداف والخطط</h1>
              <p className="text-muted-foreground">
                إدارة وتتبع أهداف كفاءة الطاقة والتحسين المستمر
              </p>
            </div>
          </div>
          <div className="flex gap-2">
            <Button variant="outline">
              <BarChart3 className="h-4 w-4 mr-2" />
              تقرير التقدم
            </Button>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              إضافة هدف جديد
            </Button>
          </div>
        </div>
      </motion.div>

      {/* Goals Overview */}
      <motion.div variants={itemVariants}>
        <div className="grid gap-4 md:grid-cols-4">
          <Card className="bg-gradient-to-r from-green-50 to-green-100 dark:from-green-950/30 dark:to-green-900/30">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <CheckCircle className="h-8 w-8 text-green-600" />
                <div>
                  <div className="text-2xl font-bold">
                    {currentGoals.filter(g => g.status === 'on-track').length}
                  </div>
                  <div className="text-sm text-muted-foreground">أهداف في المسار</div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-orange-50 to-orange-100 dark:from-orange-950/30 dark:to-orange-900/30">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <AlertTriangle className="h-8 w-8 text-orange-600" />
                <div>
                  <div className="text-2xl font-bold">
                    {currentGoals.filter(g => g.status === 'at-risk').length}
                  </div>
                  <div className="text-sm text-muted-foreground">أهداف في خطر</div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-red-50 to-red-100 dark:from-red-950/30 dark:to-red-900/30">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <Clock className="h-8 w-8 text-red-600" />
                <div>
                  <div className="text-2xl font-bold">
                    {currentGoals.filter(g => g.status === 'behind').length}
                  </div>
                  <div className="text-sm text-muted-foreground">أهداف متأخرة</div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-blue-50 to-blue-100 dark:from-blue-950/30 dark:to-blue-900/30">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <Award className="h-8 w-8 text-blue-600" />
                <div>
                  <div className="text-2xl font-bold">{achievements.length}</div>
                  <div className="text-sm text-muted-foreground">إنجازات هذا الشهر</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </motion.div>

      {/* Main Content */}
      <motion.div variants={itemVariants}>
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="current">الأهداف الحالية</TabsTrigger>
            <TabsTrigger value="progress">تتبع التقدم</TabsTrigger>
            <TabsTrigger value="achievements">الإنجازات</TabsTrigger>
            <TabsTrigger value="planning">التخطيط</TabsTrigger>
          </TabsList>

          {/* Current Goals */}
          <TabsContent value="current" className="space-y-6">
            <div className="grid gap-6">
              {currentGoals.map((goal, index) => {
                const IconComponent = getCategoryIcon(goal.category);
                const completedMilestones = goal.milestones.filter(m => m.completed).length;
                const totalMilestones = goal.milestones.length;
                
                return (
                  <motion.div
                    key={goal.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    whileHover={{ scale: 1.01 }}
                  >
                    <Card className={`border-l-4 border-l-${getCategoryColor(goal.category)}-500`}>
                      <CardHeader>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <IconComponent className={`h-6 w-6 text-${getCategoryColor(goal.category)}-600`} />
                            <div>
                              <CardTitle className="text-lg">{goal.title}</CardTitle>
                              <p className="text-muted-foreground text-sm">{goal.description}</p>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <Badge 
                              variant="outline" 
                              className={`${getStatusBg(goal.status)} ${getStatusColor(goal.status)}`}
                            >
                              {getStatusText(goal.status)}
                            </Badge>
                            <Badge variant={goal.priority === 'high' ? 'destructive' : 'secondary'}>
                              {goal.priority === 'high' ? 'عالي' : goal.priority === 'medium' ? 'متوسط' : 'منخفض'}
                            </Badge>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="grid gap-6 lg:grid-cols-2">
                          <div className="space-y-4">
                            <div>
                              <div className="flex justify-between text-sm mb-2">
                                <span>التقدم الحالي</span>
                                <span className="font-medium">
                                  {goal.currentValue} / {goal.targetValue} {goal.unit}
                                </span>
                              </div>
                              <Progress value={goal.progress} className="h-3" />
                              <div className="flex justify-between text-xs text-muted-foreground mt-1">
                                <span>{goal.progress.toFixed(1)}% مكتمل</span>
                                <span>
                                  الموعد النهائي: {format(goal.deadline, 'dd MMM yyyy')}
                                </span>
                              </div>
                            </div>
                            
                            <div>
                              <h4 className="font-medium mb-2">المعالم الرئيسية</h4>
                              <div className="space-y-1">
                                {goal.milestones.map((milestone, mIndex) => (
                                  <div key={mIndex} className="flex items-center gap-2 text-sm">
                                    {milestone.completed ? (
                                      <CheckCircle className="h-4 w-4 text-green-600" />
                                    ) : (
                                      <div className="h-4 w-4 border-2 border-gray-300 rounded-full" />
                                    )}
                                    <span className={milestone.completed ? 'line-through text-muted-foreground' : ''}>
                                      {milestone.task}
                                    </span>
                                  </div>
                                ))}
                              </div>
                              <div className="mt-2 text-xs text-muted-foreground">
                                {completedMilestones} من {totalMilestones} مكتمل
                              </div>
                            </div>
                          </div>
                          
                          <div className="space-y-4">
                            <div className="text-center p-4 border rounded-lg">
                              <div className="text-2xl font-bold text-blue-600">
                                {Math.ceil((goal.deadline - new Date()) / (1000 * 60 * 60 * 24))}
                              </div>
                              <div className="text-sm text-muted-foreground">يوم متبقي</div>
                            </div>
                            
                            <div className="space-y-2">
                              <h4 className="font-medium text-sm">الإجراءات المقترحة:</h4>
                              {goal.category === 'efficiency' && (
                                <ul className="text-xs space-y-1 text-muted-foreground">
                                  <li>• تحسين جدولة الأحمال في ساعات الذروة</li>
                                  <li>• صيانة وقائية للمعدات الحرجة</li>
                                  <li>• تدريب الفريق على أفضل الممارسات</li>
                                </ul>
                              )}
                              {goal.category === 'cost' && (
                                <ul className="text-xs space-y-1 text-muted-foreground">
                                  <li>• مراجعة عقود التوريد</li>
                                  <li>• تحسين استخدام الطاقة المتجددة</li>
                                  <li>• تقليل استهلاك ساعات الذروة</li>
                                </ul>
                              )}
                            </div>
                            
                            <Button size="sm" variant="outline" className="w-full">
                              <Edit className="h-4 w-4 mr-2" />
                              تحديث الهدف
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                );
              })}
            </div>
          </TabsContent>

          {/* Progress Tracking */}
          <TabsContent value="progress" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>تطور الأهداف عبر الوقت</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={400}>
                  <LineChart data={progressData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Line 
                      type="monotone" 
                      dataKey="efficiency" 
                      stroke="#3b82f6" 
                      strokeWidth={3}
                      name="كفاءة الطاقة (%)"
                    />
                    <Line 
                      type="monotone" 
                      dataKey="renewable" 
                      stroke="#10b981" 
                      strokeWidth={3}
                      name="الطاقة المتجددة (%)"
                    />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <div className="grid gap-6 lg:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>أداء الأهداف هذا الشهر</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {currentGoals.map((goal, index) => (
                      <div key={goal.id} className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>{goal.title}</span>
                          <span className="font-medium">{goal.progress.toFixed(1)}%</span>
                        </div>
                        <Progress value={goal.progress} className="h-2" />
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>التوقعات للشهر القادم</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="p-3 bg-green-50 dark:bg-green-950/30 rounded-lg border border-green-200 dark:border-green-800">
                      <h4 className="font-medium text-green-800 dark:text-green-300 mb-1">
                        كفاءة الطاقة
                      </h4>
                      <p className="text-sm text-green-700 dark:text-green-400">
                        متوقع الوصول إلى 89.2% بحلول نهاية الشهر
                      </p>
                    </div>
                    
                    <div className="p-3 bg-blue-50 dark:bg-blue-950/30 rounded-lg border border-blue-200 dark:border-blue-800">
                      <h4 className="font-medium text-blue-800 dark:text-blue-300 mb-1">
                        الطاقة المتجددة
                      </h4>
                      <p className="text-sm text-blue-700 dark:text-blue-400">
                        زيادة متوقعة إلى 37.8% مع تركيب الألواح الجديدة
                      </p>
                    </div>
                    
                    <div className="p-3 bg-orange-50 dark:bg-orange-950/30 rounded-lg border border-orange-200 dark:border-orange-800">
                      <h4 className="font-medium text-orange-800 dark:text-orange-300 mb-1">
                        تقليل التكاليف
                      </h4>
                      <p className="text-sm text-orange-700 dark:text-orange-400">
                        هدف صعب - يحتاج جهود إضافية لتحقيقه
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Achievements */}
          <TabsContent value="achievements" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Award className="h-5 w-5 text-yellow-600" />
                  الإنجازات المحققة
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {achievements.map((achievement, index) => {
                    const IconComponent = getCategoryIcon(achievement.category);
                    return (
                      <motion.div
                        key={achievement.id}
                        className="flex items-center gap-4 p-4 border rounded-lg"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.3, delay: index * 0.1 }}
                        whileHover={{ scale: 1.02 }}
                      >
                        <div className={`p-2 rounded-lg bg-${getCategoryColor(achievement.category)}-100 dark:bg-${getCategoryColor(achievement.category)}-950/30`}>
                          <IconComponent className={`h-5 w-5 text-${getCategoryColor(achievement.category)}-600`} />
                        </div>
                        <div className="flex-1">
                          <h3 className="font-semibold">{achievement.title}</h3>
                          <p className="text-sm text-muted-foreground">{achievement.description}</p>
                          <div className="flex items-center gap-4 mt-2">
                            <span className="text-xs text-muted-foreground">
                              {format(new Date(achievement.date), 'dd MMM yyyy')}
                            </span>
                            <Badge variant="secondary">{achievement.value}</Badge>
                          </div>
                        </div>
                        <CheckCircle className="h-6 w-6 text-green-600" />
                      </motion.div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>إحصائيات الإنجازات</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 md:grid-cols-3">
                  <div className="text-center p-4 border rounded-lg">
                    <div className="text-2xl font-bold text-green-600">12</div>
                    <div className="text-sm text-muted-foreground">أهداف محققة هذا العام</div>
                  </div>
                  <div className="text-center p-4 border rounded-lg">
                    <div className="text-2xl font-bold text-blue-600">4.2</div>
                    <div className="text-sm text-muted-foreground">متوسط التقييم (من 5)</div>
                  </div>
                  <div className="text-center p-4 border rounded-lg">
                    <div className="text-2xl font-bold text-orange-600">85%</div>
                    <div className="text-sm text-muted-foreground">معدل نجاح الأهداف</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Planning */}
          <TabsContent value="planning" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Lightbulb className="h-5 w-5 text-yellow-600" />
                  إضافة هدف جديد
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label>عنوان الهدف</Label>
                      <Input
                        value={newGoal.title}
                        onChange={(e) => setNewGoal(prev => ({ ...prev, title: e.target.value }))}
                        placeholder="مثال: تحسين كفاءة الإضاءة"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label>الوصف</Label>
                      <Textarea
                        value={newGoal.description}
                        onChange={(e) => setNewGoal(prev => ({ ...prev, description: e.target.value }))}
                        placeholder="وصف مفصل للهدف والنتائج المتوقعة"
                        rows={3}
                      />
                    </div>
                    
                    <div className="grid gap-4 md:grid-cols-2">
                      <div className="space-y-2">
                        <Label>القيمة المستهدفة</Label>
                        <Input
                          type="number"
                          value={newGoal.targetValue}
                          onChange={(e) => setNewGoal(prev => ({ ...prev, targetValue: e.target.value }))}
                          placeholder="90"
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label>القيمة الحالية</Label>
                        <Input
                          type="number"
                          value={newGoal.currentValue}
                          onChange={(e) => setNewGoal(prev => ({ ...prev, currentValue: e.target.value }))}
                          placeholder="85"
                        />
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label>فئة الهدف</Label>
                      <Select value={newGoal.category} onValueChange={(value) => setNewGoal(prev => ({ ...prev, category: value }))}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {goalCategories.map(category => (
                            <SelectItem key={category.id} value={category.id}>
                              {category.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="space-y-2">
                      <Label>الوحدة</Label>
                      <Select value={newGoal.unit} onValueChange={(value) => setNewGoal(prev => ({ ...prev, unit: value }))}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="percentage">نسبة مئوية (%)</SelectItem>
                          <SelectItem value="currency">جنيه مصري (ج.م)</SelectItem>
                          <SelectItem value="kwh">كيلوواط ساعة (kWh)</SelectItem>
                          <SelectItem value="kg">كيلوجرام (kg)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="space-y-2">
                      <Label>الأولوية</Label>
                      <Select value={newGoal.priority} onValueChange={(value) => setNewGoal(prev => ({ ...prev, priority: value }))}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="high">عالية</SelectItem>
                          <SelectItem value="medium">متوسطة</SelectItem>
                          <SelectItem value="low">منخفضة</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="space-y-2">
                      <Label>الموعد النهائي</Label>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button variant="outline" className="w-full justify-start">
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            {format(newGoal.deadline, 'dd/MM/yyyy')}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0">
                          <Calendar
                            mode="single"
                            selected={newGoal.deadline}
                            onSelect={(date) => setNewGoal(prev => ({ ...prev, deadline: date }))}
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                    </div>
                  </div>
                </div>
                
                <Button className="w-full mt-6">
                  <Plus className="h-4 w-4 mr-2" />
                  إضافة الهدف
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>الخطة الاستراتيجية طويلة المدى</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="grid gap-4 md:grid-cols-3">
                    <div className="p-4 border rounded-lg text-center">
                      <h4 className="font-medium mb-2">2024 - الأساسيات</h4>
                      <ul className="text-sm space-y-1 text-muted-foreground">
                        <li>• تحسين الكفاءة إلى 90%</li>
                        <li>• زيادة الطاقة المتجددة إلى 40%</li>
                        <li>• تقليل التكاليف 15%</li>
                      </ul>
                    </div>
                    
                    <div className="p-4 border rounded-lg text-center">
                      <h4 className="font-medium mb-2">2025 - التوسع</h4>
                      <ul className="text-sm space-y-1 text-muted-foreground">
                        <li>• الوصول لكفاءة 95%</li>
                        <li>• 60% طاقة متجددة</li>
                        <li>• شهادة ISO 50001</li>
                      </ul>
                    </div>
                    
                    <div className="p-4 border rounded-lg text-center">
                      <h4 className="font-medium mb-2">2026 - الريادة</h4>
                      <ul className="text-sm space-y-1 text-muted-foreground">
                        <li>• 100% طاقة نظيفة</li>
                        <li>• محايد الكربون</li>
                        <li>• مصنع ذكي متكامل</li>
                      </ul>
                    </div>
                  </div>
                  
                  <div className="p-4 bg-blue-50 dark:bg-blue-950/30 rounded-lg border border-blue-200 dark:border-blue-800">
                    <h4 className="font-medium text-blue-800 dark:text-blue-300 mb-2">
                      الرؤية المستقبلية
                    </h4>
                    <p className="text-sm text-blue-700 dark:text-blue-400">
                      أن نصبح أحد أكثر المصانع كفاءة في استخدام الطاقة في المنطقة، 
                      مع الالتزام بأعلى معايير الاستدامة البيئية والكفاءة الاقتصادية.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </motion.div>
    </motion.div>
  );
}