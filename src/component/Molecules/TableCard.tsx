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
// interface TableDataProps {
//      Title: string, 
//      Description: string, 
//      header: object,
//      data: object,
// }
const invoices = [
     {
          invoice: "Chăm sóc da mặt",
          paymentStatus: "20",
          totalAmount: "$250.00",
          paymentMethod: "Credit Card",
     },
     {
          invoice: "INV002",
          paymentStatus: "10",
          totalAmount: "$150.00",
          paymentMethod: "PayPal",
     },
     {
          invoice: "INV003",
          paymentStatus: "11",
          totalAmount: "$350.00",
          paymentMethod: "Bank Transfer",
     },
     {
          invoice: "INV004",
          paymentStatus: "8",
          totalAmount: "$450.00",
          paymentMethod: "Credit Card",
     },
     {
          invoice: "INV005",
          paymentStatus: "8",
          totalAmount: "$550.00",
          paymentMethod: "PayPal",
     },
]

export function TableData() {
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
                              {invoices.map((invoice) => (
                                   <TableRow key={invoice.invoice}>
                                        <TableCell colSpan={3} className="font-medium">{invoice.invoice}</TableCell>
                                        <TableCell>{invoice.paymentStatus}</TableCell>
                                        <TableCell className="text-right">{invoice.totalAmount}</TableCell>
                                   </TableRow>
                              ))}
                         </TableBody>
                         <TableFooter>
                              <TableRow>
                                   <TableCell colSpan={3}>Total</TableCell>
                                   <TableCell className="">200</TableCell>
                                   <TableCell className="text-right">$2,500.00</TableCell>
                              </TableRow>
                         </TableFooter>
                    </Table>
               </CardContent>
               
          </Card>

     )
}
