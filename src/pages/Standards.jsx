import { useState } from "react";
import { motion } from "motion/react";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Badge } from "../components/ui/badge";
import { Progress } from "../components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs";
import { 
  Globe, 
  Award,
  CheckCircle,
  AlertTriangle,
  TrendingUp,
  FileText,
  Target,
  Zap,
  Leaf,
  Shield,
  Star,
  Download
} from "lucide-react";
import { useSelector } from 'react-redux';
import { useLanguage } from "../contexts/LanguageContext";
import { RadialBarChart, RadialBar, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip } from "recharts";

export function Standards() {
  const { t } = useLanguage();
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

  const internationalStandards = [
    {
      id: 'iso50001',
      name: 'ISO 50001',
      title: 'نظم إدارة الطاقة',
      description: 'المعيار الدولي لأنظمة إدارة الطاقة وتحسين الكفاءة',
      currentScore: 78,
      targetScore: 85,
      status: 'in-progress',
      requirements: [
        { name: 'سياسة الطاقة', completed: true, score: 95 },
        { name: 'تخطيط الطاقة', completed: true, score: 88 },
        { name: 'تنفيذ وتشغيل', completed: false, score: 72 },
        { name: 'فحص ومراقبة', completed: false, score: 65 },
        { name: 'مراجعة إدارية', completed: false, score: 58 }
      ],
      nextSteps: [
        'تطوير إجراءات المراقبة والقياس',
        'تدريب الفريق على متطلبات المعيار',
        'تطبيق عمليات التحسين المستمر'
      ]
    },
    {
      id: 'iso14001',
      name: 'ISO 14001',
      title: 'نظم الإدارة البيئية',
      description: 'إدارة الأثر البيئي والاستدامة',
      currentScore: 82,
      targetScore: 90,
      status: 'advanced',
      requirements: [
        { name: 'السياسة البيئية', completed: true, score: 92 },
        { name: 'التخطيط البيئي', completed: true, score: 85 },
        { name: 'التنفيذ', completed: true, score: 78 },
        { name: 'المراقبة والتقييم', completed: false, score: 75 },
        { name: 'التحسين المستمر', completed: false, score: 80 }
      ],
      nextSteps: [
        'تحسين أنظمة المراقبة البيئية',
        'تقليل الانبعاثات بنسبة 15%',
        'تطوير برامج إعادة التدوير'
      ]
    },
    {
      id: 'leed',
      name: 'LEED',
      title: 'الريادة في التصميم البيئي والطاقة',
      description: 'شهادة المباني الخضراء وكفاءة الطاقة',
      currentScore: 65,
      targetScore: 80,
      status: 'planning',
      requirements: [
        { name: 'كفاءة الطاقة', completed: false, score: 68 },
        { name: 'جودة البيئة الداخلية', completed: false, score: 72 },
        { name: 'إدارة المياه', completed: false, score: 58 },
        { name: 'الطاقة المتجددة', completed: false, score: 60 },
        { name: 'الابتكار في التصميم', completed: false, score: 65 }
      ],
      nextSteps: [
        'تحسين كفاءة استخدام الطاقة',
        'تطوير أنظمة إدارة المياه',
        'زيادة استخدام الطاقة المتجددة'
      ]
    },
    {
      id: 'iec61850',
      name: 'IEC 61850',
      title: 'معايير الشبكات الذكية',
      description: 'بروتوكولات الاتصال لأنظمة الطاقة الذكية',
      currentScore: 45,
      targetScore: 75,
      status: 'early',
      requirements: [
        { name: 'نمذجة البيانات', completed: false, score: 40 },
        { name: 'بروتوكولات الاتصال', completed: false, score: 35 },
        { name: 'الأمان السيبراني', completed: false, score: 50 },
        { name: 'التكامل مع الأنظمة', completed: false, score: 45 },
        { name: 'اختبار التوافق', completed: false, score: 55 }
      ],
      nextSteps: [
        'تطوير البنية التحتية للاتصالات',
        'تطبيق معايير الأمان السيبراني',
        'تدريب الفريق على التقنيات الجديدة'
      ]
    }
  ];

  const benchmarkData = [
    { category: 'كفاءة الطاقة', current: 87.5, industry: 82, global: 78, target: 90 },
    { category: 'الطاقة المتجددة', current: 35.2, industry: 28, global: 25, target: 40 },
    { category: 'إدارة الانبعاثات', current: 75, industry: 70, global: 65, target: 85 },
    { category: 'الأمان والجودة', current: 92, industry: 88, global: 85, target: 95 },
    { category: 'الابتكار التقني', current: 68, industry: 65, global: 60, target: 80 }
  ];

  const certificationProgress = [
    { name: 'ISO 50001', value: 78, color: '#3b82f6' },
    { name: 'ISO 14001', value: 82, color: '#10b981' },
    { name: 'LEED', value: 65, color: '#f59e0b' },
    { name: 'IEC 61850', value: 45, color: '#8b5cf6' }
  ];

  const getStatusIcon = (status) => {
    switch (status) {
      case 'advanced': return <CheckCircle className="h-5 w-5 text-green-600" />;
      case 'in-progress': return <TrendingUp className="h-5 w-5 text-blue-600" />;
      case 'planning': return <Target className="h-5 w-5 text-orange-600" />;
      case 'early': return <AlertTriangle className="h-5 w-5 text-red-600" />;
      default: return <Globe className="h-5 w-5 text-gray-600" />;
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'advanced': return 'متقدم';
      case 'in-progress': return 'قيد التطبيق';
      case 'planning': return 'في التخطيط';
      case 'early': return 'مرحلة مبكرة';
      default: return 'غير محدد';
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'advanced': return 'text-green-600';
      case 'in-progress': return 'text-blue-600';
      case 'planning': return 'text-orange-600';
      case 'early': return 'text-red-600';
      default: return 'text-gray-600';
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
            <Globe className="h-8 w-8 text-blue-600" />
            <div>
              <h1 className="text-2xl font-bold">المعايير الدولية</h1>
              <p className="text-muted-foreground">
                مقارنة الأداء مع المعايير الدولية ومؤشرات الصناعة
              </p>
            </div>
          </div>
          <div className="flex gap-2">
            <Button variant="outline">
              <Download className="h-4 w-4 mr-2" />
              تقرير المطابقة
            </Button>
            <Button>
              <Award className="h-4 w-4 mr-2" />
              خطة الشهادات
            </Button>
          </div>
        </div>
      </motion.div>

      {/* Standards Overview */}
      <motion.div variants={itemVariants}>
        <div className="grid gap-4 md:grid-cols-4">
          <Card className="bg-gradient-to-r from-blue-50 to-blue-100 dark:from-blue-950/30 dark:to-blue-900/30">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <Award className="h-8 w-8 text-blue-600" />
                <div>
                  <div className="text-2xl font-bold">4</div>
                  <div className="text-sm text-muted-foreground">معايير قيد التطبيق</div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-green-50 to-green-100 dark:from-green-950/30 dark:to-green-900/30">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <CheckCircle className="h-8 w-8 text-green-600" />
                <div>
                  <div className="text-2xl font-bold">1</div>
                  <div className="text-sm text-muted-foreground">شهادة مكتملة</div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-orange-50 to-orange-100 dark:from-orange-950/30 dark:to-orange-900/30">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <TrendingUp className="h-8 w-8 text-orange-600" />
                <div>
                  <div className="text-2xl font-bold">67.5%</div>
                  <div className="text-sm text-muted-foreground">متوسط المطابقة</div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-purple-50 to-purple-100 dark:from-purple-950/30 dark:to-purple-900/30">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <Star className="h-8 w-8 text-purple-600" />
                <div>
                  <div className="text-2xl font-bold">B+</div>
                  <div className="text-sm text-muted-foreground">التقييم الإجمالي</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </motion.div>

      {/* Main Content */}
      <motion.div variants={itemVariants}>
        <Tabs defaultValue="standards" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="standards">المعايير والشهادات</TabsTrigger>
            <TabsTrigger value="benchmarks">مقارنة الأداء</TabsTrigger>
            <TabsTrigger value="roadmap">خارطة الطريق</TabsTrigger>
          </TabsList>

          {/* Standards and Certifications */}
          <TabsContent value="standards" className="space-y-6">
            <div className="grid gap-6">
              {internationalStandards.map((standard, index) => (
                <motion.div
                  key={standard.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  whileHover={{ scale: 1.01 }}
                >
                  <Card className="border-l-4 border-l-blue-500">
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          {getStatusIcon(standard.status)}
                          <div>
                            <CardTitle className="text-lg flex items-center gap-2">
                              {standard.name}
                              <Badge variant="outline">{standard.title}</Badge>
                            </CardTitle>
                            <p className="text-muted-foreground text-sm">{standard.description}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-2xl font-bold text-blue-600">{standard.currentScore}%</div>
                          <div className="text-sm text-muted-foreground">من {standard.targetScore}%</div>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="grid gap-6 lg:grid-cols-2">
                        <div className="space-y-4">
                          <div>
                            <div className="flex justify-between text-sm mb-2">
                              <span>التقدم الإجمالي</span>
                              <span className={getStatusColor(standard.status)}>
                                {getStatusText(standard.status)}
                              </span>
                            </div>
                            <Progress value={(standard.currentScore / standard.targetScore) * 100} className="h-3" />
                          </div>
                          
                          <div>
                            <h4 className="font-medium mb-3">متطلبات المعيار:</h4>
                            <div className="space-y-2">
                              {standard.requirements.map((req, reqIndex) => (
                                <div key={reqIndex} className="flex items-center justify-between text-sm">
                                  <div className="flex items-center gap-2">
                                    {req.completed ? (
                                      <CheckCircle className="h-4 w-4 text-green-600" />
                                    ) : (
                                      <div className="h-4 w-4 border-2 border-gray-300 rounded-full" />
                                    )}
                                    <span className={req.completed ? 'text-green-600' : ''}>{req.name}</span>
                                  </div>
                                  <Badge variant={req.completed ? 'default' : 'outline'}>
                                    {req.score}%
                                  </Badge>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                        
                        <div className="space-y-4">
                          <div>
                            <h4 className="font-medium mb-3">الخطوات التالية:</h4>
                            <ul className="space-y-2">
                              {standard.nextSteps.map((step, stepIndex) => (
                                <li key={stepIndex} className="flex items-start gap-2 text-sm">
                                  <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-2" />
                                  {step}
                                </li>
                              ))}
                            </ul>
                          </div>
                          
                          <div className="pt-4 border-t">
                            <div className="flex gap-2">
                              <Button size="sm" variant="outline">
                                <FileText className="h-4 w-4 mr-2" />
                                عرض التفاصيل
                              </Button>
                              <Button size="sm">
                                <Target className="h-4 w-4 mr-2" />
                                تحديث الخطة
                              </Button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </TabsContent>

          {/* Benchmarks */}
          <TabsContent value="benchmarks" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>مقارنة الأداء مع المعايير الدولية</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={400}>
                  <BarChart data={benchmarkData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis 
                      dataKey="category" 
                      angle={-45}
                      textAnchor="end"
                      height={80}
                      fontSize={12}
                    />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="current" fill="#3b82f6" name="الأداء الحالي" />
                    <Bar dataKey="industry" fill="#10b981" name="متوسط الصناعة" />
                    <Bar dataKey="global" fill="#f59e0b" name="المتوسط العالمي" />
                    <Bar dataKey="target" fill="#8b5cf6" name="الهدف المحدد" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <div className="grid gap-6 lg:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>تقدم الشهادات</CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <RadialBarChart cx="50%" cy="50%" innerRadius="40%" outerRadius="90%" data={certificationProgress}>
                      <RadialBar 
                        dataKey="value" 
                        cornerRadius={10} 
                        fill={(entry) => entry.color}
                        label={{ position: 'insideStart', fill: '#fff' }}
                      />
                      <Tooltip />
                    </RadialBarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>تقييم المجالات الرئيسية</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[
                      { area: 'إدارة الطاقة', score: 87, icon: Zap, color: 'blue' },
                      { area: 'الاستدامة البيئية', score: 82, icon: Leaf, color: 'green' },
                      { area: 'الأمان والجودة', score: 92, icon: Shield, color: 'purple' },
                      { area: 'الابتكار التقني', score: 68, icon: Star, color: 'orange' }
                    ].map((area, index) => {
                      const IconComponent = area.icon;
                      return (
                        <motion.div
                          key={index}
                          className="flex items-center gap-4"
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.3, delay: index * 0.1 }}
                        >
                          <div className={`p-2 rounded-lg bg-${area.color}-100 dark:bg-${area.color}-950/30`}>
                            <IconComponent className={`h-5 w-5 text-${area.color}-600`} />
                          </div>
                          <div className="flex-1">
                            <div className="flex justify-between items-center mb-1">
                              <span className="font-medium">{area.area}</span>
                              <span className="text-sm font-bold">{area.score}%</span>
                            </div>
                            <Progress value={area.score} className="h-2" />
                          </div>
                        </motion.div>
                      );
                    })}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Roadmap */}
          <TabsContent value="roadmap" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>خارطة طريق الشهادات والمعايير</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {[
                    {
                      period: '2024 Q3-Q4',
                      title: 'المرحلة الأولى - الأساسيات',
                      goals: [
                        'الحصول على شهادة ISO 50001',
                        'تحسين نظام إدارة الطاقة',
                        'تطبيق معايير الكفاءة الأساسية'
                      ],
                      status: 'current'
                    },
                    {
                      period: '2025 Q1-Q2',
                      title: 'المرحلة الثانية - التطوير',
                      goals: [
                        'تحسين شهادة ISO 14001',
                        'بدء تطبيق معايير LEED',
                        'تطوير أنظمة المراقبة الذكية'
                      ],
                      status: 'planned'
                    },
                    {
                      period: '2025 Q3-Q4',
                      title: 'المرحلة الثالثة - التميز',
                      goals: [
                        'الحصول على شهادة LEED',
                        'تطبيق معايير IEC 61850',
                        'تحقيق مستوى عالمي في الكفاءة'
                      ],
                      status: 'future'
                    },
                    {
                      period: '2026',
                      title: 'المرحلة الرابعة - الريادة',
                      goals: [
                        'الحصول على جميع الشهادات المستهدفة',
                        'تطبيق أحدث المعايير التقنية',
                        'أن نصبح مرجعاً في الصناعة'
                      ],
                      status: 'vision'
                    }
                  ].map((phase, index) => (
                    <motion.div
                      key={index}
                      className={`p-6 border rounded-lg ${
                        phase.status === 'current' ? 'bg-blue-50 dark:bg-blue-950/30 border-blue-200 dark:border-blue-800' :
                        phase.status === 'planned' ? 'bg-green-50 dark:bg-green-950/30 border-green-200 dark:border-green-800' :
                        phase.status === 'future' ? 'bg-orange-50 dark:bg-orange-950/30 border-orange-200 dark:border-orange-800' :
                        'bg-purple-50 dark:bg-purple-950/30 border-purple-200 dark:border-purple-800'
                      }`}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      whileHover={{ scale: 1.02 }}
                    >
                      <div className="flex items-center justify-between mb-4">
                        <div>
                          <h3 className="text-lg font-semibold">{phase.title}</h3>
                          <p className="text-sm text-muted-foreground">{phase.period}</p>
                        </div>
                        <Badge variant={
                          phase.status === 'current' ? 'default' :
                          phase.status === 'planned' ? 'secondary' :
                          'outline'
                        }>
                          {phase.status === 'current' ? 'قيد التنفيذ' :
                           phase.status === 'planned' ? 'مخطط' :
                           phase.status === 'future' ? 'مستقبلي' : 'رؤية'}
                        </Badge>
                      </div>
                      
                      <ul className="space-y-2">
                        {phase.goals.map((goal, goalIndex) => (
                          <li key={goalIndex} className="flex items-center gap-2 text-sm">
                            <div className={`w-2 h-2 rounded-full ${
                              phase.status === 'current' ? 'bg-blue-500' :
                              phase.status === 'planned' ? 'bg-green-500' :
                              phase.status === 'future' ? 'bg-orange-500' : 'bg-purple-500'
                            }`} />
                            {goal}
                          </li>
                        ))}
                      </ul>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>الفوائد المتوقعة من تطبيق المعايير</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="p-4 border rounded-lg">
                    <h4 className="font-medium mb-2 text-green-700 dark:text-green-300">الفوائد المالية</h4>
                    <ul className="text-sm space-y-1 text-muted-foreground">
                      <li>• تقليل تكاليف الطاقة بنسبة 20-30%</li>
                      <li>• تحسين كفاءة العمليات وتقليل الهالك</li>
                      <li>• جذب استثمارات واعتمادات أفضل</li>
                      <li>• تقليل تكاليف التأمين والمخاطر</li>
                    </ul>
                  </div>
                  
                  <div className="p-4 border rounded-lg">
                    <h4 className="font-medium mb-2 text-blue-700 dark:text-blue-300">الفوائد التشغيلية</h4>
                    <ul className="text-sm space-y-1 text-muted-foreground">
                      <li>• تحسين الكفاءة التشغيلية</li>
                      <li>• تقليل زمن التوقف والأعطال</li>
                      <li>• تحسين جودة المنتجات والخدمات</li>
                      <li>• زيادة رضا العملاء والموظفين</li>
                    </ul>
                  </div>
                  
                  <div className="p-4 border rounded-lg">
                    <h4 className="font-medium mb-2 text-purple-700 dark:text-purple-300">الفوائد البيئية</h4>
                    <ul className="text-sm space-y-1 text-muted-foreground">
                      <li>• تقليل الانبعاثات الكربونية</li>
                      <li>• تحسين استخدام الموارد الطبيعية</li>
                      <li>• المساهمة في التنمية المستدامة</li>
                      <li>• تحقيق أهداف البيئة الخضراء</li>
                    </ul>
                  </div>
                  
                  <div className="p-4 border rounded-lg">
                    <h4 className="font-medium mb-2 text-orange-700 dark:text-orange-300">الفوائد الاستراتيجية</h4>
                    <ul className="text-sm space-y-1 text-muted-foreground">
                      <li>• تحسين سمعة الشركة وعلامتها التجارية</li>
                      <li>• الامتثال للقوانين واللوائح</li>
                      <li>• الحصول على ميزة تنافسية</li>
                      <li>• تعزيز الثقة مع الشركاء والعملاء</li>
                    </ul>
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