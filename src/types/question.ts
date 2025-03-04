export type Question = {
     no: number;
     content: string;
     questionOptions: questionOptions[];
     idQuestion: string;
}

type questionOptions = {
     content: string;
     id: string;
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
     percentage: number;
}
type services = {
     id: string;
     nameService: string;
}