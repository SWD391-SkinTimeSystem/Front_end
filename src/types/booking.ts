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
 export type BookingDetail = {
     id: string,
     checkInCode: string,
     therapistName: string,
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
       }[]
       
 };