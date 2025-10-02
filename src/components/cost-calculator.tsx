import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Button } from "./ui/button";
import { Separator } from "./ui/separator";
import { Calculator, Receipt } from "lucide-react";

export function CostCalculator() {
  const [consumption, setConsumption] = useState(2450);
  const [tariff, setTariff] = useState(1.20);
  const [efficiency, setEfficiency] = useState(87.5);
  
  const totalCost = consumption * tariff;
  const usefulEnergy = (consumption * efficiency) / 100;
  const losses = consumption - usefulEnergy;
  const lossesPercentage = (losses / consumption) * 100;
  const costPerUsefulKWh = totalCost / usefulEnergy;
  
  return (
    <div className="grid gap-4 lg:grid-cols-2">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calculator className="h-5 w-5 text-blue-600" />
            حاسبة التكلفة والكفاءة
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4">
            <div className="space-y-2">
              <Label htmlFor="consumption">إجمالي الاستهلاك (kWh)</Label>
              <Input
                id="consumption"
                type="number"
                value={consumption}
                onChange={(e) => setConsumption(Number(e.target.value))}
                className="text-right"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="tariff">التعرفة (ج.م / kWh)</Label>
              <Input
                id="tariff"
                type="number"
                step="0.01"
                value={tariff}
                onChange={(e) => setTariff(Number(e.target.value))}
                className="text-right"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="efficiency">الكفاءة (%)</Label>
              <Input
                id="efficiency"
                type="number"
                value={efficiency}
                onChange={(e) => setEfficiency(Number(e.target.value))}
                className="text-right"
              />
            </div>
            
            <Button className="w-full">
              حساب النتائج
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Receipt className="h-5 w-5 text-green-600" />
            تفاصيل الحسابات
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-3">
            <div className="flex justify-between">
              <span>إجمالي الاستهلاك:</span>
              <span className="font-medium">{consumption.toLocaleString()} kWh</span>
            </div>
            
            <div className="flex justify-between">
              <span>الطاقة المفيدة:</span>
              <span className="font-medium">{usefulEnergy.toFixed(1)} kWh</span>
            </div>
            
            <div className="flex justify-between text-red-600">
              <span>الهالك:</span>
              <span className="font-medium">{losses.toFixed(1)} kWh ({lossesPercentage.toFixed(1)}%)</span>
            </div>
            
            <Separator />
            
            <div className="flex justify-between">
              <span>التعرفة:</span>
              <span className="font-medium">{tariff.toFixed(2)} ج.م / kWh</span>
            </div>
            
            <div className="flex justify-between text-lg font-bold">
              <span>إجمالي التكلفة:</span>
              <span className="text-blue-600">{totalCost.toFixed(2)} ج.م</span>
            </div>
            
            <div className="flex justify-between">
              <span>تكلفة kWh مفيد:</span>
              <span className="font-medium">{costPerUsefulKWh.toFixed(2)} ج.م</span>
            </div>
            
            <Separator />
            
            <div className="bg-yellow-50 p-3 rounded-lg">
              <p className="text-sm">
                <strong>تحليل:</strong> {efficiency > 85 ? "كفاءة ممتازة" : efficiency > 75 ? "كفاءة جيدة" : "تحتاج تحسين"}
                {lossesPercentage > 15 && " - نسبة الهالك مرتفعة"}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}