import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
// import { ReloadIcon } from "@radix-ui/react-icons";
import { RotateCcw } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function ResultPage() {
     const navigate = useNavigate();
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50">
      <Card className="w-full max-w-md p-6 shadow-lg">
        <div className="text-center">
        <h2 className="font-bold text-lg text-emerald-700">SKIN TEST</h2>
        <p className="mt-4 text-gray-600">You attempted questions: <span className="text-orange-500">0 / 11</span></p>
          <p className="text-gray-600">Score secured: <span className="text-orange-500">0 / 95</span></p>
          <p className="text-gray-600">Time Spent: <span className="text-orange-500">10 minutes</span></p>
          <p className="text-gray-600">Status: <span className="text-orange-500 font-semibold">Failed</span></p>
        </div>
        <CardContent className="mt-6 flex justify-center">
        <Button onClick={() => navigate('/questionSection')} className="bg-gradient-to-r from-emerald-500 mx-auto to-emerald-400 text-white px-6 py-3 rounded-lg flex items-center gap-2 font-semibold">
          Continue <RotateCcw size={18} />
        </Button>
        </CardContent>
      </Card>
    </div>
  );
}
