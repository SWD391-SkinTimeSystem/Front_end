export type Service = {
     serviceGroupId: string,
     id: string;          // Mã dịch vụ
     serviceName: string;        // Tên dịch vụ
     description?: string; // Mô tả dịch vụ (tuỳ chọn)
     duration: number;       // Giá dịch vụ
     thumbnail: string;    // Thời gian thực hiện (phút)
     price?: number;   // Loại dịch vụ (tuỳ chọn)
     serviceDetails?: ServiceDetailType[];   // Ảnh minh họa (tuỳ chọn)
     serviceImages: string[],
     // feedbacks: null
};

export type ServiceCategory = {
     serviceGroupId: string,
    serviceGroupName: string

};
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
     fullname: string;
     rating: number;
     review: string;
     date: Date;
};