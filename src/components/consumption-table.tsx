import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "./ui/table";
import { FileText, Download } from "lucide-react";
import { Button } from "./ui/button";

const consumptionDetails = [
  {
    date: "2024-09-23",
    type: "كهرباء عامة",
    consumption: 85.2,
    renewable: 12.5,
    efficiency: 89.2,
    cost: 102.24,
    status: "طبيعي"
  },
  {
    date: "2024-09-22",
    type: "تكييف",
    consumption: 145.8,
    renewable: 8.2,
    efficiency: 76.5,
    cost: 174.96,
    status: "مرتفع"
  },
  {
    date: "2024-09-21",
    type: "إضاءة",
    consumption: 42.3,
    renewable: 18.7,
    efficiency: 94.1,
    cost: 50.76,
    status: "طبيعي"
  },
  {
    date: "2024-09-20",
    type: "معدات مكتبية",
    consumption: 38.9,
    renewable: 5.2,
    efficiency: 82.3,
    cost: 46.68,
    status: "طبيعي"
  },
  {
    date: "2024-09-19",
    type: "تكييف",
    consumption: 167.2,
    renewable: 15.8,
    efficiency: 71.2,
    cost: 200.64,
    status: "مرتفع"
  },
  {
    date: "2024-09-18",
    type: "كهرباء عامة",
    consumption: 78.4,
    renewable: 22.1,
    efficiency: 91.7,
    cost: 94.08,
    status: "طبيعي"
  }
];

export function ConsumptionTable() {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "مرتفع":
        return "destructive";
      case "منخفض":
        return "secondary";
      default:
        return "default";
    }
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5 text-blue-600" />
            تفاصيل الاستهلاك اليومي
          </CardTitle>
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            تصدير البيانات
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="text-right">التاريخ</TableHead>
                <TableHead className="text-right">النوع</TableHead>
                <TableHead className="text-right">الاستهلاك (kWh)</TableHead>
                <TableHead className="text-right">متجددة (%)</TableHead>
                <TableHead className="text-right">الكفاءة (%)</TableHead>
                <TableHead className="text-right">التكلفة (ج.م)</TableHead>
                <TableHead className="text-right">الحالة</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {consumptionDetails.map((item, index) => (
                <TableRow key={index}>
                  <TableCell className="text-right">{item.date}</TableCell>
                  <TableCell className="text-right">{item.type}</TableCell>
                  <TableCell className="text-right font-medium">{item.consumption}</TableCell>
                  <TableCell className="text-right">{item.renewable}%</TableCell>
                  <TableCell className="text-right">
                    <span className={item.efficiency > 85 ? "text-green-600" : item.efficiency > 75 ? "text-yellow-600" : "text-red-600"}>
                      {item.efficiency}%
                    </span>
                  </TableCell>
                  <TableCell className="text-right font-medium">{item.cost.toFixed(2)}</TableCell>
                  <TableCell className="text-right">
                    <Badge variant={getStatusColor(item.status)}>
                      {item.status}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
}