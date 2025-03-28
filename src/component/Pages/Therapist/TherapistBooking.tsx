import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { CalendarDays, Upload, Filter, Search } from "lucide-react";
import { useBooking } from "@/hooks/useBooking";
import { formatEventDate, formatHour } from "@/lib/utils";
import { useNavigate } from "react-router-dom";

// const bookings = [
//   { id: 1, name: "Facial Therapy", therapist: "Dr. John Doe", date: "2025-03-28", time: "10:00 AM" },
//   { id: 2, name: "Massage", therapist: "Dr. Jane Smith", date: "2025-03-29", time: "02:30 PM" },
//   { id: 3, name: "Skin Treatment", therapist: "Dr. Alice Brown", date: "2025-04-01", time: "11:15 AM" },
// ];

export default function TherapistBookingTable() {
  const { getTherapistBooking, bookingTherapistTable, isLoading, berror } = useBooking();
  const [search, setSearch] = useState("");
  const [filterDate, setFilterDate] = useState("All");
  const [filterStatus, setFilterStatus] = useState("All");
  const navigate = useNavigate();
//   const GoToBookingDetail = (id: string) => {
//     navigate(`/staff/bookings/detail/${id}`);
//   };
  useEffect(() => {
     getTherapistBooking('NotStarted');
  }
    , []);
  if (isLoading) return <div>Loading...</div>;
  if (berror) return <div>Error: {berror.message}</div>;
  const filteredBookings = bookingTherapistTable.filter((booking) => {
    const matchesSearch =
      booking.serviceName.toLowerCase().includes(search.toLowerCase()) ||
      booking.therapistName.toLowerCase().includes(search.toLowerCase());
  
    const matchesDate = filterDate === "All" || formatEventDate(booking.date) === filterDate;
  
    const matchesStatus = filterStatus === "All" || booking.status === filterStatus;
  
    return matchesSearch && matchesDate && matchesStatus;
  });
  return (
    <div className="p-6 bg-white">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-semibold">Danh sách Booking</h2>
        <Button className="bg-emerald-700 text-white"><Upload className="text-gray-400 text-white" size={18} />Export</Button>
      </div>

      <div className="flex gap-4 mb-4">
        <div className="relative w-full max-w-sm">
          <Search className="absolute left-3 top-3 text-gray-400" size={18} />
          <Input
            type="text"
            placeholder="Tìm kiếm theo tên hoặc therapist..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-10"
          />
        </div>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="flex items-center gap-2">
              <CalendarDays size={18} /> {filterDate === "All" ? "Chọn ngày" : filterDate}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem onClick={() => setFilterDate("All")}>Tất cả</DropdownMenuItem>
            {bookingTherapistTable.map((b) => (
              <DropdownMenuItem key={formatEventDate(b.date)} onClick={() => setFilterDate(formatEventDate(b.date))}>
                {formatEventDate(b.date)}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="flex items-center gap-2">
              <Filter size={18} /> {filterStatus === "All" ? "Trạng thái" : filterStatus}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem onClick={() => setFilterStatus("All")}>Tất cả</DropdownMenuItem>
            {["NotStarted", "InProgress", "Completed"].map((status) => (
              <DropdownMenuItem key={status} onClick={() => setFilterStatus(status)}>
                {status}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <Table>
        <TableHeader>
          <TableRow className="bg-emerald-100">
            <TableHead className="text-emerald-700 font-semibold">STT</TableHead>
            <TableHead className="text-emerald-700 font-semibold">Tên Booking</TableHead>
            <TableHead className="text-emerald-700 font-semibold">Tên Therapist</TableHead>
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
                <TableCell>{booking.therapistName}</TableCell>
                <TableCell>{formatEventDate(booking.date)}</TableCell>
                <TableCell>{formatHour(booking.timeStart)}</TableCell>
                <TableCell>{booking.status}</TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={5} className="text-center py-4">
                Không tìm thấy kết quả nào
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
