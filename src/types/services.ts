export type Service = {
     id: string;          // Mã dịch vụ
     serviceName: string;        // Tên dịch vụ
     description?: string; // Mô tả dịch vụ (tuỳ chọn)
     duration: number;       // Giá dịch vụ
     thumbnail: string;    // Thời gian thực hiện (phút)
     price?: number;   // Loại dịch vụ (tuỳ chọn)
     serviceDetails?: ServiceDetailType[];   // Ảnh minh họa (tuỳ chọn)
     // serviceImages: [],
     // feedbacks: null

};
// testcommitdane

export type ServiceDetailType = {
     id: string;          // Mã dịch vụ
     name: string;
     description: string;
     step: number;
     duration: number;
     dateToNextStep: number;
};

export type Feedback = {
     review_id: string;
     user_id: string;
     username: string;
     rating: number;
     review: string;
     date: Date;
};