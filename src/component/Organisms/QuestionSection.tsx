import { Button } from "@/components/ui/button";
import { Question } from "@/types/question";
import { ArrowRight } from "lucide-react";
import { useState, useEffect } from "react";
import { questionService } from "@/services/questionService";
import { useNavigate } from "react-router-dom";

interface ListQuestionProps {
  questions: Question[];
}

export default function QuizQuestion({ questions }: ListQuestionProps): JSX.Element {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [timeLeft, setTimeLeft] = useState(180);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [userAnswers, setUserAnswers] = useState<string[]>(new Array(questions.length).fill(""));
  const [userId, setUserId] = useState<string | null>(null);
  const navigate  = useNavigate();
  useEffect(() => {
    // Lấy userId từ localStorage
    const storedUser = localStorage.getItem("user");
    console.log("Stored user ID:", storedUser);
    // if (storedUser) setUserId(storedUser);
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser); // Chuyển chuỗi JSON thành object
        setUserId(parsedUser.id); // Lưu userId
      } catch (error) {
        console.error("Error parsing user data:", error);
      }
    }
    const timer = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);

    return () => clearInterval(timer);
  }, [currentQuestion]);

  const handleNext = () => {
    if (selectedOption !== null) {
      const selectedOptionId = questions[currentQuestion].questionOptions[selectedOption].id;
      setUserAnswers((prevAnswers) => {
        const newAnswers = [...prevAnswers];
        newAnswers[currentQuestion] = selectedOptionId;
        return newAnswers;
      });
    }

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion((prev) => prev + 1);
      setTimeLeft(180);
      setSelectedOption(null);
    }
  };

  const handleSubmit = async () => {
    if (!userId) {
      alert("User ID không tồn tại!");
      return;
    }

    const questionResponse = {
      userId,
      resultIds: userAnswers.filter((id) => id !== ""), // Lọc bỏ câu chưa trả lời
    };
    console.log(questionResponse);
    console.log("Question Response JSON:", JSON.stringify(questionResponse, null, 2));

    try {
      console.log("📤 Sending JSON to API:", JSON.stringify(questionResponse, null, 2));
      const response = await questionService.doQuestion(questionResponse);
      console.log("Response from API:", response);
      console.log("✅ API Response:", response.data);
      localStorage.setItem("questionResult", JSON.stringify(response));
      navigate("/Result");
      // alert("Quiz submitted successfully!");
    } catch (error) {
      console.error("Error submitting quiz:", error);
      // alert("Failed to submit quiz.");
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <aside className="w-1/4 bg-white p-6 shadow-lg">
        <div className="flex items-center gap-2 mb-6">
          <div className="text-white p-2 rounded-lg font-bold">
            <img
              src="https://images.sftcdn.net/images/t_app-icon-m/p/be5530a1-9186-4276-8da9-7018f4a4af4b/1853612941/hasaki-chat-logo"
              alt="logo"
              className="w-20 h-20 rounded-lg inline-block"
            />
          </div>
          <h2 className="font-bold text-lg text-emerald-700">SKIN TEST</h2>
        </div>
        <div className="flex flex-col items-center">
          <div className="relative w-24 h-24 flex items-center justify-center border-4 border-emerald-700 rounded-full">
            <span className="text-xl font-bold">
              {Math.floor(timeLeft / 60)}:{(timeLeft % 60).toString().padStart(2, "0")}
            </span>
          </div>
          <p className="text-gray-500 mt-2">{`${currentQuestion + 1}/${questions.length}`}</p>
        </div>
        <ul className="mt-6 text-sm space-y-5">
          {questions.map((q, index) => (
            <li
              key={index}
              className={index === currentQuestion ? "text-emerald-700 font-bold cursor-pointer" : "text-gray-600 cursor-pointer"}
              onClick={() => setCurrentQuestion(index)}
            >
              {index + 1}. {q.content}
            </li>
          ))}
        </ul>
      </aside>

      {/* Question Section */}
      <main className="w-3/4 p-10 mx-auto">
        <div className="p-10 w-[80%] my-[100px] mx-auto">
          <h1 className="text-[30px] font-bold text-gray-800">
            {questions[currentQuestion].content}
          </h1>
          <div className="mt-6 space-y-4">
            {questions[currentQuestion].questionOptions.map((option, index) => (
              <label key={index} className="flex text-[18px] items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="question"
                  className="hidden"
                  checked={selectedOption === index}
                  onChange={() => setSelectedOption(index)}
                />
                <div
                  className={`w-6 h-6 flex items-center justify-center border-2 rounded-full transition-colors ${
                    selectedOption === index ? "border-emerald-700 bg-emerald-700" : "border-gray-400"
                  }`}
                >
                  {selectedOption === index && <div className="w-3 h-3 bg-white rounded-full"></div>}
                </div>
                <span>{option.content}</span>
              </label>
            ))}
          </div>

          {currentQuestion === questions.length - 1 ? (
            <Button
              onClick={handleSubmit}
              className="mt-6 px-6 py-3 rounded-lg flex items-center gap-2 font-semibold bg-emerald-700 text-white"
            >
              Submit
            </Button>
          ) : (
            <Button
              onClick={handleNext}
              disabled={selectedOption === null}
              className={`mt-6 px-6 py-3 rounded-lg flex items-center gap-2 font-semibold ${
                selectedOption === null ? "bg-gray-300 text-gray-500 cursor-not-allowed" : "bg-emerald-700 text-white"
              }`}
            >
              Next <ArrowRight size={18} />
            </Button>
          )}
        </div>
      </main>
    </div>
  );
}
