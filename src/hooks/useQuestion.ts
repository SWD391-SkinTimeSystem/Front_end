import {useState, useEffect} from 'react';
import { questionService } from '@/services/questionService';
import { Question, QuestionResponse, QuestionUpdate } from '@/types/question';

export const useQuestion = () => {
     const [question, setQuestions] = useState<Question[]>([]);
     const [loading, setLoading] = useState<boolean>(true);
     const [error, setError] = useState<string | null>(null);

     const fetchQuestions = async () => {
          try {
               const data = await questionService.getListQuestions();
               setQuestions(data.data);
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
      
        return { question, loading, error, fetchQuestions, doQuestion };

}

export const useUpdateQuestion = (updateQuestions : QuestionUpdate[]) => {
     const [updateQuestionData, setUpdateQuestionData] = useState<QuestionUpdate[]>([]);
     const [loading1, setLoading] = useState<boolean>(true);
     const [error1, setError] = useState<string | null>(null);

     const fetchUpdateQuestion = async () => {
          try {
               const data = await questionService.updateQuestion(updateQuestions);
               setUpdateQuestionData(data);
          } catch (error) {
               setError("failed to fetch services");   
          } finally {
               setLoading(false);
          }
     }

     useEffect(() => {
          fetchUpdateQuestion();
     }, []);

     return { updateQuestionData, loading1, error1 };

}


