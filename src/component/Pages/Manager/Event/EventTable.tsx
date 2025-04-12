import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { CalendarDays, Upload, Filter, Search } from "lucide-react";
import { formatCurrency, formatEventDate, formatHour } from "@/lib/utils";
import { useNavigate } from "react-router-dom";
import { useEventStatus } from "@/hooks/useEvent";

export default function EventTable() {
  const [search, setSearch] = useState("");
  const [filterDate, setFilterDate] = useState("All");
  const [filterStatus, setFilterStatus] = useState("All");
  const navigate = useNavigate();
  const {  eventApproved, loadingEventDetail, error } = useEventStatus();
  if(loadingEventDetail) return <p>Loading...</p>;
  if(error) return <p>Error</p>;
  console.log(eventApproved);
  const filteredEvents = eventApproved?.content.filter((event) => {
    const matchesSearch =
      event.title.toLowerCase().includes(search.toLowerCase())

    const matchesDate = filterDate === "All" || formatEventDate(event.date) === filterDate;
//     const matchesStatus = filterStatus === "All" || event.event_status === filterStatus;

    return matchesSearch && matchesDate;
  });
  console.log(filteredEvents);
  return (
    <div className="p-6 bg-white">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-semibold">Danh sách Sự Kiện</h2>
        <Button className="bg-emerald-700 text-white"><Upload className="text-gray-400 text-white" size={18} />Export</Button>
      </div>

      <div className="flex gap-4 mb-4">
        <div className="relative w-full max-w-sm">
          <Search className="absolute left-3 top-3 text-gray-400" size={18} />
          <Input
            type="text"
            placeholder="Tìm kiếm theo tên hoặc người tổ chức..."
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
            {filteredEvents?.map((e) => (
              <DropdownMenuItem key={formatEventDate(e.date)} onClick={() => setFilterDate(formatEventDate(e.date))}>
                {formatEventDate(e.date)}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>

        {/* <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="flex items-center gap-2">
              <Filter size={18} /> {filterStatus === "All" ? "Trạng thái" : filterStatus}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem onClick={() => setFilterStatus("All")}>Tất cả</DropdownMenuItem>
            {["Upcoming", "Ongoing", "Completed"].map((status) => (
              <DropdownMenuItem key={status} onClick={() => setFilterStatus(status)}>
                {status}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu> */}
      </div>

      <Table>
        <TableHeader>
          <TableRow className="bg-emerald-100">
            <TableHead className="text-emerald-700 font-semibold">STT</TableHead>
            <TableHead className="text-emerald-700 font-semibold">Tên Sự Kiện</TableHead>
            <TableHead className="text-emerald-700 font-semibold">Giá</TableHead>
            <TableHead className="text-emerald-700 font-semibold">Địa Điểm</TableHead>
            <TableHead className="text-emerald-700 font-semibold">Ngày</TableHead>
            <TableHead className="text-emerald-700 font-semibold">Giờ</TableHead>
            <TableHead className="text-emerald-700 font-semibold">Trạng Thái</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredEvents?.length > 0 ? (
            filteredEvents.map((event, index) => (
              <TableRow key={event.id} className="hover:bg-gray-50 cursor-pointer" onClick={() => navigate(`/staff/ongoingevent/${event.id}`)}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>{event.title}</TableCell>
                <TableCell>{formatCurrency(event.ticket_price)}</TableCell>
                <TableCell>{event.location}</TableCell>
                <TableCell>{formatEventDate(event.date)}</TableCell>
                <TableCell>{formatHour(event.start_time)}</TableCell>
                <TableCell>{event.event_status}</TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={7} className="text-center py-4">
                Không tìm thấy kết quả nào
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
