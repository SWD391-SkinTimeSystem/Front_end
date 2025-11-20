export type Review = {
     review_id: string;
     user_id: string;
     username: string;
     rating: number;
     review: string;
     date: string;
   };
   
   export type Skintherapist = {
     id: string;
     name: string;
     about: string;
     cert_url: string[]; // Mảng đường dẫn chứng nhận
     experience: number;
     avatar: string;
     specialization: string[]; // Mảng chuyên môn
     rating: number;
     reviews: Review[];
   };
   