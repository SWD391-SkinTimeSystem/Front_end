import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

// import { ReloadIcon } from "@radix-ui/react-icons";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { QuestionRecommendation } from "@/types/question";

export default function ResultPage() {
  const navigate = useNavigate();
  const [resultData, setResultData] = useState<QuestionRecommendation>();
  const [selected, setSelected] = useState<string | null>("React");
  
  useEffect(() => {
    const storedResult = localStorage.getItem("questionResult");
    if (storedResult) {
      setResultData(JSON.parse(storedResult));
      console.log("Stored result:", resultData);
    }
  }, []);
  return (
    <div className="container mx-auto p-6">
      <div className="text-center">
        <h2 className="font-bold text-lg text-emerald-700">SKIN TEST</h2>
        <div className="flex flex-col items-center space-y-6 p-6 rounded-lg shadow-md">
          <div className="flex flex-row items-center rounded-lg shadow-md">
            {resultData?.skinTypes.filter((skinType) => skinType.percentage > 0).map((skinType) => (
              <div key={skinType.nameSkinType} className="flex items-center space-x-4 mr-2">
                <div className="w-16 h-16 mr-1">
                  <CircularProgressbar
                    value={skinType.percentage}
                    text={`${skinType.percentage}`}
                    styles={buildStyles({
                      textColor: "#326e51",
                      pathColor: "#326e51",
                      trailColor: "#ddd",
                      textSize: "24px",
                      strokeLinecap: "round",
                    })}
                  />
                </div>
                <span className="text-lg mr-1 font-semibold text-gray-700">{skinType.nameSkinType}</span>
              </div>
            ))}
          </div>
          <div className="flex flex-wrap justify-center gap-4 p-6">
          <p className="text-gray-600 mb-6">Một số dịch vụ phù hợp với tình trạng da của bạn</p>

            {resultData?.services.map((service) => (
              <Button
                key={service.id}
                variant="outline"
                className={cn(
                  "flex items-center gap-2 px-6 py-3 text-lg font-semibold rounded-xl shadow-md transition-all",
                  selected === service.nameService
                    ? "border-orange-500 text-orange-600 bg-white"
                    : "bg-gray-100 hover:bg-white"
                )}
                onClick={() => setSelected(service.nameService)}
              >
                <span className="text-2xl"></span> {service.nameService}
              </Button>
            ))}
          </div>
        </div>
      </div>
      <div className="mt-6 flex justify-center">
        <Button onClick={() => navigate('/questionSection')} className="bg-gradient-to-r from-emerald-500 mx-auto to-emerald-400 text-white px-6 py-3 rounded-lg flex items-center gap-2 font-semibold">
          Xem chi tiết dịch vụ
        </Button>
        <Button onClick={() => navigate('/')} className="bg-gradient-to-r from-emerald-500 mx-auto to-emerald-400 text-white px-6 py-3 rounded-lg flex items-center gap-2 font-semibold">
          Lưu kết quả
        </Button>
      </div>
    </div>
  );
}
