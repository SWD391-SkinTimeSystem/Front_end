import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import Checkbox from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Search, RefreshCcw, UserCheck, CheckCircle, XCircle } from 'lucide-react';
import { EventDetail } from "../../../types/event";
import { TicketHistory } from "../../../types/ticket";


const Notification = ({ message, type, onClose }: { message: string, type: 'success' | 'error', onClose: () => void }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 3000);

    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className={`fixed top-4 right-4 p-4 rounded-md shadow-md flex items-center gap-2 z-50 ${type === 'success' ? 'bg-green-100 text-green-800 border border-green-200' : 'bg-red-100 text-red-800 border border-red-200'
      }`}>
      {type === 'success' ? (
        <CheckCircle className="h-5 w-5 text-green-500" />
      ) : (
        <XCircle className="h-5 w-5 text-red-500" />
      )}
      <span>{message}</span>
      <button onClick={onClose} className="ml-2 text-gray-500 hover:text-gray-700">
        ×
      </button>
    </div>
  );
};

const mockEvent: EventDetail = {
  id: "ev001",
  title: "Workshop Chăm Sóc Da Mùa Thu",
  image: "https://example.com/event-image.jpg",
  content: "Workshop chia sẻ kiến thức chăm sóc da trong mùa thu.",
  date: "2025-03-21",
  start_time: "12:00",
  end_time: "23:00",
  location: "299 Đường Cầu Giấy, Hà Nội",
  available_ticket: 50,
  total_ticket_amount: 100,
  ticket_price: 200000,
  event_status: "active"
};

const mockTickets: TicketHistory[] = [
  {
    ticket_id: "T001",
    total_amount: 200000,
    event_name: "Workshop Chăm Sóc Da Mùa Thu",
    event_id: "ev001",
    purchase_date: "2025-03-15",
    status: "active",
    otp_code: "ABC123",
  },
  {
    ticket_id: "T002",
    total_amount: 200000,
    event_name: "Workshop Chăm Sóc Da Mùa Thu",
    event_id: "ev001",
    purchase_date: "2025-03-16",
    status: "active",
    otp_code: "DEF456",
  },
  {
    ticket_id: "T003",
    total_amount: 200000,
    event_name: "Workshop Chăm Sóc Da Mùa Thu",
    event_id: "ev001",
    purchase_date: "2025-03-17",
    status: "active",
    otp_code: "GHI789",
  },
  {
    ticket_id: "T004",
    total_amount: 200000,
    event_name: "Workshop Chăm Sóc Da Mùa Thu",
    event_id: "ev001",
    purchase_date: "2025-03-18",
    status: "active",
    otp_code: "JKL012",
  },
  {
    ticket_id: "T005",
    total_amount: 200000,
    event_name: "Workshop Chăm Sóc Da Mùa Thu",
    event_id: "ev001",
    purchase_date: "2025-03-19",
    status: "active",
    otp_code: "MNO345",
  }
];

const EventCheckInManager = () => {
  const [event, setEvent] = useState<EventDetail | null>(null);
  const [tickets, setTickets] = useState<TicketHistory[]>([]);
  const [filteredTickets, setFilteredTickets] = useState<TicketHistory[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [isCheckInAvailable, setIsCheckInAvailable] = useState(false);
  const [loading, setLoading] = useState(true);
  const [checkedInCount, setCheckedInCount] = useState(0);
  const [notification, setNotification] = useState<{ message: string, type: 'success' | 'error' } | null>(null);



  const showNotification = (message: string, type: 'success' | 'error') => {
    setNotification({ message, type });
  };

  const hideNotification = () => {
    setNotification(null);
  };

  const fetchEventData = async (eventId: string) => {
    setLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 800));
      setEvent(mockEvent);
      setTickets(mockTickets);
      setFilteredTickets(mockTickets);

      const checkedIn = mockTickets.filter(ticket =>ticket.status === "checked-in").length;

      setCheckedInCount(checkedIn);

      setLoading(false);
    } catch (error) {
      console.error("Error fetching event data:", error);
      showNotification("Không thể tải dữ liệu sự kiện. Vui lòng thử lại sau.", "error");
      setLoading(false);
    }
  };


  const checkCheckInAvailability = () => {
    if (!event) return { status: "unknown", message: "Không có thông tin sự kiện" };

    const now = new Date();
    const eventDate = new Date(`${event.date}T${event.start_time}`);
    const checkinEndTime = new Date(`${event.date}T${event.end_time}`);

    const oneHourBeforeStart = new Date(eventDate.getTime() - 60 * 60 * 1000);
    // const oneHourAfterStart = new Date(eventDate.getTime() + 60 * 60 * 1000);

    if (now < oneHourBeforeStart) {
      return { status: "not_yet", message: "Chưa tới giờ check-in" };
    }
    if (now > checkinEndTime) {
      return { status: "closed", message: "Đã đóng check-in" };
    }

    return { status: "open", message: "Check-in đang mở" };
  };
  const checkInStatus = checkCheckInAvailability();


  const handleCheckInChange = (ticketId: string, checked: boolean) => {
    const updatedTickets = tickets.map(ticket => {
      if (ticket.ticket_id === ticketId) {
        const updatedTicket = {
          ...ticket,
          status: checked ? "checked-in" : "paid"
        };
  
        showNotification(
          `${checked ? "Check-in thành công" : "Hủy check-in"}: Mã vé ${ticket.otp_code}`,
          checked ? "success" : "error"
        );
  
        return updatedTicket;
      }
      return ticket;
    });
  
    setTickets(updatedTickets);
    setFilteredTickets(updatedTickets.filter(ticket =>
      ticket.otp_code?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ticket.ticket_id.toLowerCase().includes(searchQuery.toLowerCase())
    ));
  
    const checkedIn = updatedTickets.filter(ticket => ticket.status === "checked-in").length;
    setCheckedInCount(checkedIn);
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    if (query.trim() === '') {
      setFilteredTickets(tickets);
    } else {
      const filtered = tickets.filter(ticket =>
        ticket.otp_code?.toLowerCase().includes(query.toLowerCase()) ||
        ticket.ticket_id.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredTickets(filtered);
    }
  };

  const refreshData = () => {
    if (event) {
      fetchEventData(event.id);
      showNotification("Dữ liệu đã được làm mới", "success");
    }
  };

  useEffect(() => {
    fetchEventData("ev001");


    const intervalId = setInterval(() => {
      setIsCheckInAvailable(checkCheckInAvailability());
    }, 60000);

    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    if (event) {
      // setIsCheckInAvailable(checkCheckInAvailability());
      const checkInStatus = checkCheckInAvailability();
      setIsCheckInAvailable(checkInStatus.status === "open");

    }
  }, [event]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-500"></div>
      </div>
    );
  }

  if (!event) {
    return (
      <div className="p-4 text-center">
        <h2 className="text-xl font-bold text-red-500">Không tìm thấy sự kiện</h2>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4">
      {notification && (
        <Notification
          message={notification.message}
          type={notification.type}
          onClose={hideNotification}
        />
      )}

      <Card className="border border-green-200 shadow-lg">
        <CardHeader className="bg-green-50">
          <div className="flex justify-between items-center">
            <CardTitle className="text-green-800 text-xl">{event.title}</CardTitle>
            <Button
              variant="outline"
              size="sm"
              className="border-green-500 text-green-700"
              onClick={refreshData}
            >
              <RefreshCcw className="w-4 h-4 mr-2" /> Làm mới
            </Button>
          </div>
          <div className="text-sm text-gray-600">
            <div>Ngày: {new Date(event.date).toLocaleDateString('vi-VN')}</div>
            <div>Thời gian: {event.start_time} - {event.end_time}</div>
            <div>Địa điểm: {event.location}</div>
          </div>
        </CardHeader>

        <CardContent className="pt-4">
          {/* Check-in Progress */}
          <div className="mb-6">
            <div className="flex justify-between items-center mb-2">

              <Badge
                variant={isCheckInAvailable ? "default" : "outline"}
                className={isCheckInAvailable ? "bg-green-500" : "text-red-500 border-red-500"}
              >
                <span className={isCheckInAvailable ? "text-green-600" : "text-red-600"}>
                  {checkCheckInAvailability().message}
                </span>
              </Badge>
            </div>

            {/* Chỉ hiển thị progress bar nếu check-in đang mở hoặc đã đóng */}
            {isCheckInAvailable && (
              <div className="flex justify-between items-center mb-2">
                <span className="font-medium text-green-700">
                  Trạng thái check-in: {checkedInCount}/{tickets.length} ({Math.round((checkedInCount / tickets.length) * 100)}%)
                </span>
                <Progress
                  value={(checkedInCount / tickets.length) * 100}
                  className="h-2 bg-gray-200"
                />
              </div>


            )}
          </div>


          {isCheckInAvailable ? (
            <>
              {/* Search */}
              <div className="relative mb-4">
                <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Tìm kiếm theo mã OTP hoặc mã vé..."
                  value={searchQuery}
                  onChange={(e) => handleSearch(e.target.value)}
                  className="pl-10 border-green-200 focus:border-green-500 focus:ring-green-500"
                />
              </div>

              {/* Tickets List */}
              <div className="border rounded-md overflow-hidden">
                <table className="min-w-full bg-white">
                  <thead className="bg-green-50">
                    <tr>
                      <th className="px-4 py-2 text-left text-sm font-medium text-green-800">Mã OTP</th>
                      <th className="px-4 py-2 text-left text-sm font-medium text-green-800">Mã vé</th>
                      <th className="px-4 py-2 text-left text-sm font-medium text-green-800">Ngày mua</th>
                      <th className="px-4 py-2 text-center text-sm font-medium text-green-800">Trạng thái</th>
                      <th className="px-4 py-2 text-center text-sm font-medium text-green-800">Check-in</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {filteredTickets.length > 0 ? (
                      filteredTickets.map((ticket) => (
                        <tr key={ticket.ticket_id} className={ticket.status === "checked-in" ? "bg-green-50" : ""}>
                          <td className="px-4 py-3 text-sm font-medium">{ticket.otp_code}</td>
                          <td className="px-4 py-3 text-sm">{ticket.ticket_id}</td>
                          <td className="px-4 py-3 text-sm">{new Date(ticket.purchase_date).toLocaleDateString('vi-VN')}</td>
                          <td className="px-4 py-3 text-sm text-center">
                            <Badge
                              variant={ticket.status === "checked-in" ? "default" : "outline"}
                              className={ticket.status === "checked-in" ? "bg-green-500" : "text-gray-500 border-gray-300"}
                            >
                              {ticket.status === "checked-in" ? "Đã check-in" : "Chưa check-in"}
                            </Badge>
                          </td>
                          <td className="px-4 py-3 text-center">
                            <Checkbox
                              checked={ticket.status === "checked-in"}
                              onCheckedChange={(checked) =>
                                handleCheckInChange(ticket.ticket_id, checked as boolean)
                              }
                              className="border-green-500 text-green-500 focus:ring-green-500"
                            />
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan={5} className="px-4 py-3 text-center text-gray-500">
                          Không tìm thấy vé phù hợp
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </>
          ) : (
            <div className="flex flex-col items-center justify-center p-8 border rounded-md bg-gray-50">
              <UserCheck className="h-12 w-12 text-gray-400 mb-2" />
              {checkInStatus.status === "not_yet" && (
                <>
                  <h3 className="text-xl font-medium text-gray-700">Chưa tới giờ check-in</h3>
                  <p className="text-gray-500 text-center mt-2">
                    Chức năng check-in chỉ khả dụng trong khoảng thời gian từ 1 giờ trước khi sự kiện bắt đầu đến sau khi sự kiện kết thúc.
                  </p>
                </>
              )}
              {checkInStatus.status === "closed" && (
                <>
                  <h3 className="text-xl font-medium text-gray-700">Check-in đã đóng</h3>
                  <p className="text-gray-500 text-center mt-2">
                    Chức năng check-in chỉ khả dụng trong khoảng thời gian từ 1 giờ trước khi sự kiện bắt đầu đến sau khi sự kiện kết thúc.
                  </p>
                </>
              )}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default EventCheckInManager;