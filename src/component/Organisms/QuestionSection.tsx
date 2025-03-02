import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { useState, useEffect } from "react";

const questions = [
  {
    question: "What is JSX in React?",
    options: [
      "A syntax extension for JavaScript that allows writing HTML-like code in JavaScript",
      "A state management library for React applications",
      "A build tool for bundling React applications",
      "A testing framework for React components",
    ],
  },
  {
    question: "React components must always return a single JSX element.",
    options: ["True", "False"],
  },
  {
    question: "What is the purpose of React components?",
    options: [
      "To structure and organize UI elements",
      "To manage backend logic",
      "To replace the need for HTML and CSS",
      "To directly manipulate the DOM",
    ],
  },
  {
    question: "What is the purpose of React components?",
    options: [
      "To structure and organize UI elements",
      "To manage backend logic",
      "To replace the need for HTML and CSS",
      "To directly manipulate the DOM",
    ],
  },
  {
    question: "What is the purpose of React components?",
    options: [
      "To structure and organize UI elements",
      "To manage backend logic",
      "To replace the need for HTML and CSS",
      "To directly manipulate the DOM",
    ],
  },
  {
    question: "What is the purpose of React components?",
    options: [
      "To structure and organize UI elements",
      "To manage backend logic",
      "To replace the need for HTML and CSS",
      "To directly manipulate the DOM",
    ],
  },

  {
    question: "What is JSX in React?",
    options: [
      "A syntax extension for JavaScript that allows writing HTML-like code in JavaScript",
      "A state management library for React applications",
      "A build tool for bundling React applications",
      "A testing framework for React components",
    ],
  },
];

export default function QuizQuestion() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [timeLeft, setTimeLeft] = useState(180);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);

    return () => clearInterval(timer);
  }, [currentQuestion]);

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion((prev) => prev + 1);
      setTimeLeft(180);
      setSelectedOption(null);
    }
  };

  const handleQuestionSelect = (index:number) => {
    setCurrentQuestion(index);
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
              className={
                index === currentQuestion
                  ? "text-emerald-700 font-bold cursor-pointer"
                  : "text-gray-600 cursor-pointer"
              }
              onClick={() => handleQuestionSelect(index)}
            >
              {index + 1}. {q.question}
            </li>
          ))}
        </ul>
      </aside>

      {/* Question Section */}
      <main className="w-3/4 p-10 mx-auto">
        <div className="p-10 w-[80%] my-[100px] mx-auto">
          <h1 className="text-[30px] font-bold text-gray-800">
            {questions[currentQuestion].question}
          </h1>
          <div className="mt-6 space-y-4">
            {questions[currentQuestion].options.map((option, index) => (
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
                    selectedOption === index
                      ? "border-emerald-700 bg-emerald-700"
                      : "border-gray-400"
                  }`}
                >
                  {selectedOption === index && <div className="w-3 h-3 bg-white rounded-full"></div>}
                </div>
                <span>{option}</span>
              </label>
            ))}
          </div>
         
            {
              currentQuestion === questions.length - 1 ? (
                <Button
                  onClick={() => alert("Quiz completed!")}
                  className="mt-6 px-6 py-3 rounded-lg flex items-center gap-2 font-semibold bg-emerald-700 text-white"
                >
                  Submit
                </Button>
              ) : (
                <Button
                onClick={handleNext}
                disabled={selectedOption === null || currentQuestion === questions.length - 1}
                className={`mt-6 px-6 py-3 rounded-lg flex items-center gap-2 font-semibold ${
                  selectedOption === null || currentQuestion === questions.length - 1
                    ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                    : "bg-emerald-700 text-white"
                }`}
              >
                Next <ArrowRight size={18} />
              </Button>
              )
            }
        </div>
      </main>
    </div>
  );
}
