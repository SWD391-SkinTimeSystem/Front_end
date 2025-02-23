import React from "react";
import { ArrowUp } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

interface ExpenseCardProps {
  title: string;
  amount: string;
  percentage: number;
  icon: React.ReactNode;
  unit: string;
}

const ExpenseCard: React.FC<ExpenseCardProps> = ({ title, amount, percentage,  unit }) => {
  return (
    <Card className="relative border border-purple-200 rounded-2xl shadow-sm p-4">
      <CardContent className="flex flex-col justify-between space-y-2 p-0">
        <div className="flex justify-between items-center">
          <div className="text-sm text-gray-500 font-medium">{title}</div>
          {/* <div className="bg-pink-500 text-white rounded-xl p-2 flex items-center justify-center">
            {icon}
          </div> */}
        </div>
        <div className="flex items-center space-x-2">
          <div className="flex items-center text-pink-500 text-xs font-medium">
            <ArrowUp size={12} className="mr-1" />
            {percentage}%
          </div>
        </div>
        <div className="text-2xl font-bold text-gray-900">{amount}</div>
        <div className="text-sm text-gray-500 font-medium">{unit}</div>

      </CardContent>
    </Card>
  );
};

export default ExpenseCard;
