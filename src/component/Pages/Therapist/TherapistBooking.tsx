import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { useBooking } from "@/hooks/useBooking";
import { formatEventDate, formatHour } from "@/lib/utils";

export default function TherapistBookingTable() {
  const { getTherapistBooking, bookingTherapistTable, isLoading, berror } = useBooking();
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState("NotStarted");

  useEffect(() => {
    getTherapistBooking(filterStatus);
  }, [filterStatus]);

  if (isLoading) return <div>Loading...</div>;
  if (berror) return <div>Error: {berror.message}</div>;

  const filteredBookings = bookingTherapistTable.filter((booking) =>
    booking.serviceName.toLowerCase().includes(search.toLowerCase()) ||
    booking.therapistName.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-6 bg-white">
      <h2 className="text-2xl font-semibold mb-4">Danh sách Booking</h2>
      
      <Tabs value={filterStatus} onValueChange={setFilterStatus} className="mb-4">
        <TabsList className="flex gap-4 border-b pb-2">
          {["NotStarted", "Doing", "Completed"].map((status) => (
            <TabsTrigger key={status} value={status}>{status}</TabsTrigger>
          ))}
        </TabsList>
      </Tabs>
      
      <div className="relative w-full max-w-sm mb-4">
        <Input
          type="text"
          placeholder="Tìm kiếm theo tên hoặc therapist..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
      
      <Table>
        <TableHeader>
          <TableRow className="bg-emerald-100">
            <TableHead className="text-emerald-700 font-semibold">STT</TableHead>
            <TableHead className="text-emerald-700 font-semibold">Tên Booking</TableHead>
            {/* <TableHead className="text-emerald-700 font-semibold">Tên Therapist</TableHead> */}
            <TableHead className="text-emerald-700 font-semibold">Tên khách hàng</TableHead>
            <TableHead className="text-emerald-700 font-semibold">Thực hiện dịch vụ</TableHead>
            <TableHead className="text-emerald-700 font-semibold">Giờ bắt đầu</TableHead>
            <TableHead className="text-emerald-700 font-semibold">Trạng thái</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredBookings.length > 0 ? (
            filteredBookings.map((booking, index) => (
              <TableRow key={booking.id} className="hover:bg-gray-50 cursor-pointer">
                <TableCell>{index + 1}</TableCell>
                <TableCell>{booking.serviceName}</TableCell>
                {/* <TableCell>{booking.therapistName}</TableCell> */}
                <TableCell>{booking.customerName}</TableCell>
                <TableCell>{formatEventDate(booking.date)}</TableCell>
                <TableCell>{formatHour(booking.timeStart)}</TableCell>
                <TableCell>{booking.status}</TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={6} className="text-center py-4">
                Không tìm thấy kết quả nào
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
