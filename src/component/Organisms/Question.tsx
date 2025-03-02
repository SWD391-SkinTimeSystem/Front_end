import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
export default function Quiz() {
  const navigate = useNavigate();
  return (
    <div className="flex w-[1000px] mx-auto items-center justify-center min-h-screen">
      <div className="bg-white p-10 rounded-2xl shadow-lg w-[100%] text-center max-w-md">
        <div className="flex justify-center mb-4">
          <div className="text-white p-3 rounded-lg font-bold text-lg">
            <img src="https://images.sftcdn.net/images/t_app-icon-m/p/be5530a1-9186-4276-8da9-7018f4a4af4b/1853612941/hasaki-chat-logo" alt="logo" className="w-20 h-20 rounded-lg inline-block" />
          </div>
        </div>
        <h1 className="text-2xl font-bold text-black mb-2">
          WELCOME TO <span className="text-emerald-700">HASAKI QUIZ</span>
        </h1>
        <p className="text-gray-600 mb-6">Select topic below to start your Quiz</p>
        <Button onClick={() => navigate('/questionSection')} className="bg-gradient-to-r from-emerald-500 mx-auto to-emerald-400 text-white px-6 py-3 rounded-lg flex items-center gap-2 font-semibold">
          Continue <ArrowRight size={18} />
        </Button>
      </div>
    </div>
  );
}
