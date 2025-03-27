export type Service = {
     serviceGroupId: string,
     serviceName: string;        
     description?: string; 
     price?: number;   
     serviceDetails?: ServiceDetailType[];   
     skinTypeOptions: string[];
};
export type SkinTypeOptions = {
     id: string;
     nameSkinType: string;
};
export type ServiceCategory = {
     serviceGroupId: string,
    serviceGroupName: string

export type ServiceDetailType = {
     id: string;        
     name: string;
     description: string;
     step: number;
     duration: number;
     dateToNextStep: number;
};
export type ServiceImage = {
     thumbnail?: string;
     serviceImages?: string[];
};
export type Feedback = {
     review_id: string;
     user_id: string;
     username: string;
     rating: number;
     review: string;
     date: Date;
};

export type ServiceWithImages = Service & ServiceImage;
