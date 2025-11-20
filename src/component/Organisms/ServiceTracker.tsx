import { CalendarDays } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";

interface CompletedServiceCardProps {
  time: string;
  date: string;
  service: string;
  customer: string;
  therapist: string;
}

export function ServiceTrackerCard({
  time,
  date,
  service,
  customer,
  therapist,
}: CompletedServiceCardProps) {
  return (
    <Card className="border">
      <CardHeader className="bg-green-200 p-2 rounded-t-lg">
        <Badge className="bg-green-500 text-white text-sm font-semibold px-3 py-1">
          Đã hoàn thành
        </Badge>
      </CardHeader>

      <CardContent className="p-4 space-y-2">
        <div className="flex items-center space-x-2 text-gray-700 text-sm">
          <CalendarDays className="size-4" />
          <span>{time}, {date}</span>
        </div>

        <CardTitle className="text-lg font-bold">{service}</CardTitle>

        <div className="space-y-2">
          <div className="flex items-center space-x-2">
            <span className="font-semibold text-gray-600">Khách hàng:</span>
            <Input value={customer} readOnly className="h-8 text-sm" />
          </div>

          <div className="flex items-center space-x-2">
            <span className="font-semibold text-gray-600">Chuyên viên:</span>
            <Input value={therapist} readOnly className="h-8 text-sm" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
