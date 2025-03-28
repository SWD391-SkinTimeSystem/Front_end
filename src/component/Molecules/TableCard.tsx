import {
     Table,
     TableBody,
     TableCell,
     TableFooter,
     TableHead,
     TableHeader,
     TableRow,
} from "@/components/ui/table"
import {
     Card,
     CardContent,
     CardDescription,
     CardHeader,
     CardTitle,
} from "@/components/ui/card"
import { usePopularService } from "@/hooks/useDashboard";
import { useEvent } from "@/hooks/useEvent";
// interface TableDataProps {
//      Title: string, 
//      Description: string, 
//      header: object,
//      data: object,
// }

export function TableData() {
     const { popularServiceData, loading1, error1 } = usePopularService(5);
     const totalBookingCount = popularServiceData.reduce((total, service) => total + service.bookingCount, 0);
     const totalRevenue = popularServiceData.reduce((total, service) => total + service.totalRevenue, 0);
     const formatCurrency = (amount: number): string => {
          return new Intl.NumberFormat("vi-VN", {
            style: "currency",
            currency: "VND",
          }).format(amount);
        };
     if (loading1) return <div>Loading...</div>
     if (error1) return <div>Error</div>
     console.log(popularServiceData);
     console.log(totalBookingCount);
     console.log(totalRevenue);

     return (
          <Card>
               <CardHeader>
                    <CardTitle>Top dịch vụ phổ biến nhất</CardTitle>
                    <CardDescription>Trong tháng</CardDescription>
               </CardHeader>
               <CardContent>
                    <Table className="w-full text-left text-gray-700 text-sm">
                         <TableHeader>
                              <TableRow>
                                   <TableHead colSpan={3} className="">Dịch vụ</TableHead>
                                   <TableHead>Lượt đặt</TableHead>
                                   <TableHead className="text-right">Tổng tiền</TableHead>
                              </TableRow>
                         </TableHeader>
                         <TableBody>
                              {popularServiceData.map((popularServiceData) => (
                                   <TableRow key={popularServiceData.serviceId}>
                                        <TableCell colSpan={3} className="font-medium">{popularServiceData.serviceName}</TableCell>
                                        <TableCell>{popularServiceData.bookingCount}</TableCell>
                                        <TableCell className="text-right">{formatCurrency(popularServiceData.totalRevenue)}</TableCell>
                                   </TableRow>
                              ))}
                         </TableBody>
                         <TableFooter>
                              <TableRow>
                                   <TableCell colSpan={3}>Total</TableCell>
                                   <TableCell className="">{totalBookingCount}</TableCell>
                                   <TableCell className="text-right">{formatCurrency(totalRevenue)}</TableCell>
                              </TableRow>
                         </TableFooter>
                    </Table>
               </CardContent>
               
          </Card>

     )
}

export function TableEventData() {
     // const { popularServiceData, loading1, error1 } = usePopularService(5);
     // const totalBookingCount = popularServiceData.reduce((total, service) => total + service.bookingCount, 0);
     // const totalRevenue = popularServiceData.reduce((total, service) => total + service.totalRevenue, 0);
     // if (loading1) return <div>Loading...</div>
     // if (error1) return <div>Error</div>
     // console.log(popularServiceData);
     // console.log(totalBookingCount);
     // console.log(totalRevenue);
     const { events, loading, error } = useEvent();
     if (loading) return <div>Loading...</div>
     if (error) return <div>Error</div>

     return (
          <Card>
               <CardHeader>
                    <CardTitle>Những sự kiện sắp tới</CardTitle>
                    <CardDescription>Trong tháng</CardDescription>
               </CardHeader>
               <CardContent>
                    <Table className="w-full text-left text-gray-700 text-sm">
                         <TableHeader>
                              <TableRow>
                                   <TableHead colSpan={3} className="">Dịch vụ</TableHead>
                                   <TableHead>Lượt đặt</TableHead>
                                   <TableHead className="text-right">Tổng tiền</TableHead>
                              </TableRow>
                         </TableHeader>
                         <TableBody>
                              {events.map((event) => (
                                   <TableRow key={event.event_id}>
                                        <TableCell colSpan={3} className="font-medium">{event.title}</TableCell>
                                        {/* <TableCell>{event.price}</TableCell> */}
                                        <TableCell className="text-right">{event.price}</TableCell>
                                   </TableRow>
                              ))}
                         </TableBody>
                         <TableFooter>
                              <TableRow>
                                   {/* <TableCell colSpan={3}>Total</TableCell> */}
                                   {/* <TableCell className="">{totalBookingCount}</TableCell> */}
                                   {/* <TableCell className="text-right">{totalRevenue}</TableCell> */}
                              </TableRow>
                         </TableFooter>
                    </Table>
               </CardContent>
               
          </Card>

     )
}
