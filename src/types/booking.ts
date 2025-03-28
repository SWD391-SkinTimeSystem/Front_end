export interface BookingType {
     serviceId: string;
     serviceDate: string;
     serviceHour: string;
     therapistId: string;
     returnURL: string;
     voucherCode: string;
     failureURL: string;
     paymentMethod: string;
}
export type Booking = {
     id: string,
     status: string,
     date: Date,
     therapistName: string,
     serviceName: string,
     thumbnail: string,
     isTretmentPlan: boolean,
     timeStart: string,
     description: string
 };

 export type BookingTable = {
    id: string;
    therapistName: string;
    customerName: string;
    timeStart: string;
    serviceName: string;
    status: string;
    bookingDate: string;
    bookingTime: string;
  };

  export type BookingTherapist = {
    id: string;
    status: string; // Nếu có nhiều trạng thái, có thể liệt kê hết
    date: string; // Format: YYYY-MM-DD
    therapistName: string;
    serviceName: string;
    thumbnail: string;
    isTreatmentPlan: boolean; // Fix lỗi chính tả từ "isTretmentPlan"
    timeStart: string; // Format: HH:MM:SS
    description: string;
  };
 export type BookingDetail = {
     id: string,

    //  checkInCode: string,
     therapistName: string,
     therapistId: string,
     transactionId: string,
     thumbnail: string,
     serviceName: string,
     status: string,
     totalStep: number,
     description: string,
     details: {
         serviceDetailsName: string,
         startTime: string,
         startEnd: string,

         reservedDate: Date
         checkInCode: string,
        status: string,
        scheduleID: string,
        step: number
        description: string

       }[]
       
 };