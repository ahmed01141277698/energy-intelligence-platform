import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Progress } from "./ui/progress";
import { Brain, TrendingUp, AlertTriangle, CheckCircle } from "lucide-react";

const predictions = [
  {
    metric: "الاستهلاك المتوقع",
    current: "2,450 kWh",
    predicted: "2,680 kWh",
    change: "+9.4%",
    confidence: 87,
    risk: "متوسط"
  },
  {
    metric: "التكلفة المتوقعة",
    current: "2,940 ج.م",
    predicted: "3,216 ج.م",
    change: "+9.4%",
    confidence: 91,
    risk: "عالي"
  },
  {
    metric: "الكفاءة المتوقعة",
    current: "87.5%",
    predicted: "89.2%",
    change: "+1.9%",
    confidence: 82,
    risk: "منخفض"
  }
];

const recommendations = [
  {
    title: "تحسين جدولة الأحمال",
    description: "نقل 15% من الأحمال لساعات الذروة المنخفضة",
    impact: "توفير 320 ج.م شهرياً",
    priority: "عالية",
    icon: TrendingUp
  },
  {
    title: "صيانة دورية للمعدات",
    description: "فحص وصيانة أنظمة التكييف والإضاءة",
    impact: "تحسين الكفاءة بنسبة 5%",
    priority: "متوسطة",
    icon: CheckCircle
  },
  {
    title: "تحديث أنظمة الإضاءة",
    description: "استبدال المصابيح التقليدية بـ LED",
    impact: "تقليل الاستهلاك 25%",
    priority: "عالية",
    icon: AlertTriangle
  }
];

export function AIPredictions() {
  return (
    <div className="grid gap-4 lg:grid-cols-2">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Brain className="h-5 w-5 text-purple-600" />
            التنبؤات الذكية للشهر القادم
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {predictions.map((prediction, index) => (
            <div key={index} className="space-y-2">
              <div className="flex justify-between items-start">
                <div className="space-y-1">
                  <p className="font-medium">{prediction.metric}</p>
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-muted-foreground">الحالي: {prediction.current}</span>
                    <span className="text-sm">→ {prediction.predicted}</span>
                  </div>
                </div>
                <Badge 
                  variant={prediction.risk === "عالي" ? "destructive" : prediction.risk === "متوسط" ? "secondary" : "default"}
                >
                  {prediction.change}
                </Badge>
              </div>
              <div className="space-y-1">
                <div className="flex justify-between text-sm">
                  <span>دقة التنبؤ</span>
                  <span>{prediction.confidence}%</span>
                </div>
                <Progress value={prediction.confidence} className="h-2" />
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>التوصيات الذكية</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {recommendations.map((rec, index) => {
            const Icon = rec.icon;
            return (
              <div key={index} className="space-y-2 p-3 border rounded-lg">
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-2">
                    <Icon className="h-4 w-4 mt-1 text-blue-600" />
                    <div className="space-y-1">
                      <h4 className="font-medium">{rec.title}</h4>
                      <p className="text-sm text-muted-foreground">{rec.description}</p>
                      <p className="text-sm font-medium text-green-600">{rec.impact}</p>
                    </div>
                  </div>
                  <Badge variant={rec.priority === "عالية" ? "destructive" : "secondary"}>
                    {rec.priority}
                  </Badge>
                </div>
                <Button size="sm" className="w-full">
                  تطبيق التوصية
                </Button>
              </div>
            );
          })}
        </CardContent>
      </Card>
    </div>
  );
}