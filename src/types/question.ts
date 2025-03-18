export type Question = {
     no: number;
     content: string;
     questionOptions: questionOptions[];
     idQuestion: string;
}

type questionOptions = {
     content: string;
     id: string;
     skin_type: skinTypes;
}

export type QuestionResponse = {
     userId: string;
     resultIds: string[];
}

export type QuestionRecommendation = {
     skinTypes: skinTypes[];
     services: services[];
}

type skinTypes = {
     nameSkinType: string;
}
type services = {
     id: string;
     nameService: string;
}

export type QuestionUpdate = {
     id: string;
     content: string;
     order_no: number;
     choices: Choice[];
}

type Choice = {
     id: string;
     content: string;
     skin_type: string;
   };