import {useState, useEffect} from 'react';
import { questionService } from '@/services/questionService';
import { Question, QuestionResponse } from '@/types/question';

export const useQuestion = () => {
     const [questions, setQuestions] = useState<Question[]>([]);
     const [loading, setLoading] = useState<boolean>(true);
     const [error, setError] = useState<string | null>(null);

     const fetchQuestions = async () => {
          try {
               const data = await questionService.getListQuestions();
               setQuestions(data);
          } catch (error) {
               setError("failed to fetch questions");
          } finally {
               setLoading(false);
          }
     }

     useEffect(() => {
          fetchQuestions();
     }, []);


     const doQuestion = async (data: QuestionResponse) => {
          setLoading(true);
          try {
            const response = await questionService.doQuestion(data);
            return response.data;
          } catch (err: any) {
            setError(err.message || "Failed to submit question");
            throw err;
          } finally {
            setLoading(false);
          }
        };
      
        return { questions, loading, error, fetchQuestions, doQuestion };

}


