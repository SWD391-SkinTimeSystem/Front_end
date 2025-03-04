import { useQuestion } from "@/hooks/useQuestion";
import QuizQuestion from "@/component/Organisms/QuestionSection";

export const DisplayQuestion = () => {
  const { questions, loading, error } = useQuestion();
  if (loading) {
    return <h1>Loading...</h1>;
  }
  if (error) {
    return <h1>{error}</h1>;
  }
  return <QuizQuestion questions={questions} />;
};

