import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { CalendarDays, Upload, Filter, Search } from "lucide-react";
import { formatEventDate, formatHour } from "@/lib/utils";
import { useNavigate } from "react-router-dom";

const mockEvents = [
  {
    scheduleID: "6b6158cc-88c4-4be1-8e65-1ab81a5a9304",
    step: 1,
    serviceDetailsName: "Xông hơi thảo dược",
    status: "NotStarted",
    checkInCode: "180154",
    startTime: "12:00:00",
    startEnd: "12:30:00",
    reservedDate: "2025-03-26T00:00:00",
    description: "Giúp mở lỗ chân lông và đào thải độc tố trong da."
  },
  {
    scheduleID: "2a9f8b34-5c42-4d87-b9c1-4a9b91d8a812",
    step: 2,
    serviceDetailsName: "Massage thư giãn",
    status: "InProgress",
    checkInCode: "245678",
    startTime: "14:00:00",
    startEnd: "14:45:00",
    reservedDate: "2025-03-26T00:00:00",
    description: "Massage nhẹ nhàng giúp thư giãn cơ thể và tinh thần."
  }
];

export default function StaffReschedule() {
  const [search, setSearch] = useState("");
  const [filterDate, setFilterDate] = useState("All");
  const [filterStatus, setFilterStatus] = useState("All");
  const navigate = useNavigate();

  const filteredEvents = mockEvents.filter((event) => {
    const matchesSearch = event.serviceDetailsName.toLowerCase().includes(search.toLowerCase());
    const matchesDate = filterDate === "All" || formatEventDate(event.reservedDate) === filterDate;
    const matchesStatus = filterStatus === "All" || event.status === filterStatus;
    return matchesSearch && matchesDate && matchesStatus;
  });

  return (
    <div className="p-6 bg-white">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-semibold">Danh sách Sự Kiện</h2>
        <Button className="bg-emerald-700 text-white"><Upload size={18} />Export</Button>
      </div>

      <div className="flex gap-4 mb-4">
        <div className="relative w-full max-w-sm">
          <Search className="absolute left-3 top-3 text-gray-400" size={18} />
          <Input
            type="text"
            placeholder="Tìm kiếm theo dịch vụ..."
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
            {mockEvents.map((event) => (
              <DropdownMenuItem key={event.scheduleID} onClick={() => setFilterDate(formatEventDate(event.reservedDate))}>
                {formatEventDate(event.reservedDate)}
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
            <TableHead>#</TableHead>
            <TableHead>Dịch vụ</TableHead>
            <TableHead>Trạng thái</TableHead>
            <TableHead>Mã Check-in</TableHead>
            <TableHead>Thời gian bắt đầu</TableHead>
            <TableHead>Thời gian kết thúc</TableHead>
            <TableHead>Ngày đặt</TableHead>
            <TableHead>Mô tả</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredEvents.length > 0 ? (
            filteredEvents.map((event, index) => (
              <TableRow key={event.scheduleID}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>{event.serviceDetailsName}</TableCell>
                <TableCell>{event.status}</TableCell>
                <TableCell>{event.checkInCode}</TableCell>
                <TableCell>{formatHour(event.startTime)}</TableCell>
                <TableCell>{formatHour(event.startEnd)}</TableCell>
                <TableCell>{formatEventDate(event.reservedDate)}</TableCell>
                <TableCell>{event.description}</TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={8} className="text-center py-4">Không tìm thấy kết quả nào</TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
