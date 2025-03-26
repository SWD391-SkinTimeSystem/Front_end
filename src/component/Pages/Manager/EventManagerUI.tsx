import React, { useState, useEffect, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardFooter, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Calendar, MapPin, Clock, Users, Tag, CheckCircle, XCircle, Eye, Search, Filter } from 'lucide-react';
import {Event, EventDetail} from "../../../types/event";
import { Textarea } from '@/components/ui/textarea';
import { useEventStatus } from '@/hooks/useEvent';
import { set } from 'date-fns';

const Notification = ({ message, type, onClose }: { message: string, type: 'success' | 'error', onClose: () => void }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 3000);
    
    return () => clearTimeout(timer);
  }, [onClose]);
  
  return (
    <div className={`fixed top-4 right-4 p-4 rounded-md shadow-md flex items-center gap-2 z-50 ${
      type === 'success' ? 'bg-green-100 text-green-800 border border-green-200' : 'bg-red-100 text-red-800 border border-red-200'
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

const EventCard = ({ 
  event, 
  isManager = false, 
  onView, 
  onApprove, 
  onReject 
}: { 
  event: EventDetail, 
  isManager?: boolean,
  onView: (event: EventDetail) => void,
  onApprove?: (event: EventDetail) => void,
  onReject?: (event: EventDetail) => void
}) => {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('vi-VN');
  };

  return (
    <Card className="overflow-hidden h-full border border-green-100 hover:border-green-300 transition-all duration-300">
      <div className="relative h-40 overflow-hidden bg-gray-100">
        {event.image ? (
          <img src={event.image} alt={event.title} className="object-cover w-full h-full" />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-green-50">
            <Calendar className="h-12 w-12 text-green-300" />
          </div>
        )}
        <Badge className={`absolute top-2 right-2 ${
          event.event_status === 'approved' ? 'bg-green-500' : 
          event.event_status === 'pending_approval' ? 'bg-yellow-500' : 
          event.event_status === 'declined' ? 'bg-red-500' : 'bg-gray-500'
        }`}>
          {event.event_status === 'approved' ? 'Đã duyệt' : 
           event.event_status === 'pending_approval' ? 'Chờ duyệt' : 
           event.event_status === 'declined' ? 'Từ chối' : 'Đã hủy'}
        </Badge>
      </div>
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-bold text-green-800 truncate">{event.title}</CardTitle>
        <CardDescription className="flex items-center text-sm text-gray-600 mt-1">
          <Calendar className="h-4 w-4 mr-1" />
          {formatDate(event.date)} · {event.start_time}
        </CardDescription>
        <CardDescription className="flex items-center text-sm text-gray-600">
          <MapPin className="h-4 w-4 mr-1" />
          {event.location}
        </CardDescription>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="text-sm text-gray-600 h-12 overflow-hidden">
          {event.content}
        </div>
        <div className="mt-2 flex items-center">
          <Tag className="h-4 w-4 mr-1 text-green-700" />
          <span className="font-medium text-green-700">
            {event.ticket_price.toLocaleString('vi-VN')} VNĐ
          </span>
        </div>
        {event.available_ticket !== undefined && event.total_ticket_amount !== undefined && (
          <div className="mt-2 flex items-center">
            <Users className="h-4 w-4 mr-1 text-green-700" />
            <span className="text-sm text-gray-600">
              còn lại {event.available_ticket}/{event.total_ticket_amount} vé
            </span>
          </div>
        )}
      </CardContent>
      <CardFooter className="pt-0 flex justify-between">
        <Button variant="outline" size="sm" className="text-blue-700 border-blue-200 hover:bg-blue-50" onClick={() => onView(event)}>
          <Eye className="h-4 w-4 mr-1" />
          Xem chi tiết
        </Button>
        
        {isManager && event.event_status === 'pending_approval' && (
          <div className="flex gap-2">
            <Button 
              variant="outline" 
              size="sm" 
              className="text-red-700 border-red-200 hover:bg-red-50"
              onClick={() => onReject && onReject(event)}
            >
              <XCircle className="h-4 w-4 mr-1" />
              Từ chối
            </Button>
            <Button 
              variant="outline" 
              size="sm" 
              className="text-green-700 border-green-200 hover:bg-green-50"
              onClick={() => onApprove && onApprove(event)}
            >
              <CheckCircle className="h-4 w-4 mr-1" />
              Duyệt
            </Button>
          </div>
        )}
      </CardFooter>
    </Card>
  );
};

const EventManagerUI = () => {
  const [events, setEvents] = useState<EventDetail[]>([]);
  const [selectedEvent, setSelectedEvent] = useState<EventDetail | null>(null);
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);
  const [isRejectDialogOpen, setIsRejectDialogOpen] = useState(false);
  const [rejectionReason, setRejectionReason] = useState('');
  const [notification, setNotification] = useState<{message: string, type: 'success' | 'error'} | null>(null);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const {eventPendingApproval, eventApproved, eventDeclined, fetchUpdateStatus} = useEventStatus();

  const merge = useMemo(() => {
    if (eventPendingApproval?.content || eventApproved?.content || eventDeclined?.content) {
      return [...(eventPendingApproval?.content ?? []), ...(eventApproved?.content ?? []), ...(eventDeclined?.content ?? [])];
    }
    return [];
  }, [eventPendingApproval, eventApproved, eventDeclined]);
  console.log(merge);

  const showNotification = (message: string, type: 'success' | 'error') => {
    setNotification({ message, type });
  };

  const hideNotification = () => {
    setNotification(null);
  };

  useEffect(() => {
    if (merge.length > 0) {
      fetchEvents();
    }
  }, [merge]);
  

  const fetchEvents = async () => {
    setLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 800));
      setEvents(merge);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching events:", error);
      showNotification("Không thể tải danh sách sự kiện. Vui lòng thử lại sau.", "error");
      setLoading(false);
    }
  };

  const handleViewEvent = (event: EventDetail) => {
    setSelectedEvent(event);
    setIsViewDialogOpen(true);
  };

  const handleApproveEvent = async (event: EventDetail) => {
    try {
      await new Promise(resolve => setTimeout(resolve, 500));
      await fetchUpdateStatus(event.id, 1);

      const updatedEvents = events.map(e => 
        e.id === event.id ? { ...e, event_status: 'approved' } : e
      );
      setEvents(updatedEvents);
      showNotification(`Sự kiện "${event.title}" đã được duyệt thành công!`, "success");
    } catch (error) {
      console.error("Error approving event:", error);
      showNotification("Không thể duyệt sự kiện. Vui lòng thử lại sau.", "error");
    }
  };

  const handleRejectDialogOpen = (event: EventDetail) => {
    setSelectedEvent(event);
    setRejectionReason('');
    setIsRejectDialogOpen(true);
  };

  const handleRejectEvent = async () => {
    if (!selectedEvent) return;
    
    try {
      await new Promise(resolve => setTimeout(resolve, 500));
      await fetchUpdateStatus(selectedEvent.id, 2);

      const updatedEvents = events.map(e => 
        e.id === selectedEvent.id ? { ...e, event_status: 'declined' } : e
      );
      
      setEvents(updatedEvents);
      setIsRejectDialogOpen(false);
      showNotification(`Sự kiện "${selectedEvent.title}" đã bị từ chối.`, "success");
    } catch (error) {
      console.error("Error rejecting event:", error);
      showNotification("Không thể từ chối sự kiện. Vui lòng thử lại sau.", "error");
    }
  };

  const filteredEvents = events.filter(event => {
    const matchesSearch = event.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          event.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'all' || event.event_status === filterStatus;
    
    return matchesSearch && matchesStatus;
  });


  return (
    <div className="container mx-auto p-4">
      {notification && (
        <Notification 
          message={notification.message} 
          type={notification.type} 
          onClose={hideNotification} 
        />
      )}
      
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-green-800">Quản Lý Phê Duyệt Sự Kiện</h1>
        <p className="text-gray-600">Duyệt, từ chối và quản lý yêu cầu tạo sự kiện từ nhân viên</p>
      </div>
      
      <div className="mb-6 grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
          <Input
            placeholder="Tìm kiếm theo tên hoặc địa điểm..."
            className="pl-10 border-green-200 focus:border-green-500"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        {/* <div className="flex gap-4 items-center">
          <Filter className="text-gray-400" size={18} />
          <Select value={filterStatus} onValueChange={setFilterStatus}>
            <SelectTrigger className="w-full border-green-200 focus:border-green-500">
              <SelectValue placeholder="Lọc theo trạng thái" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Tất cả trạng thái</SelectItem>
              <SelectItem value="pending">Chờ duyệt</SelectItem>
              <SelectItem value="approved">Đã duyệt</SelectItem>
              <SelectItem value="rejected">Từ chối</SelectItem>
            </SelectContent>
          </Select>
        </div> */}
      </div>

      <Tabs defaultValue="pending_approval" className="mb-6">
        <TabsList className="border-b border-gray-200 w-full flex justify-start mb-4">
          <TabsTrigger value="all" className="text-green-700 data-[state=active]:border-b-2 data-[state=active]:border-green-500">
            Tất cả
          </TabsTrigger>
          <TabsTrigger value="pending_approval" className="text-green-700 data-[state=active]:border-b-2 data-[state=active]:border-green-500">
            Chờ duyệt
          </TabsTrigger>
          <TabsTrigger value="approved" className="text-green-700 data-[state=active]:border-b-2 data-[state=active]:border-green-500">
            Đã duyệt
          </TabsTrigger>
          <TabsTrigger value="declined" className="text-green-700 data-[state=active]:border-b-2 data-[state=active]:border-green-500">
            Từ chối
          </TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="mt-0">
          {loading ? (
            <div className="flex items-center justify-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-500"></div>
            </div>
          ) : filteredEvents.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredEvents.map(event => (
                <EventCard 
                  key={event.id} 
                  event={event} 
                  isManager={true}
                  onView={handleViewEvent}
                  onApprove={handleApproveEvent}
                  onReject={handleRejectDialogOpen}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-12 bg-gray-50 rounded-lg">
              <Calendar className="h-12 w-12 text-gray-300 mx-auto mb-4" />
              <h3 className="text-xl font-medium text-gray-700 mb-2">Không tìm thấy sự kiện nào</h3>
              <p className="text-gray-500 mb-4">Không có sự kiện nào khớp với tiêu chí tìm kiếm của bạn.</p>
            </div>
          )}
        </TabsContent>

        <TabsContent value="pending_approval" className="mt-0">
          {loading ? (
            <div className="flex items-center justify-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-500"></div>
            </div>
          ) : filteredEvents.filter(event => event.event_status === "pending_approval").length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredEvents
                .filter(event => event.event_status === "pending_approval")
                .map(event => (
                  <EventCard 
                    key={event.id} 
                    event={event}
                    isManager={true}
                    onView={handleViewEvent}
                    onApprove={handleApproveEvent}
                    onReject={handleRejectDialogOpen}
                  />
                ))}
            </div>
          ) : (
            <div className="text-center py-12 bg-gray-50 rounded-lg">
              <Clock className="h-12 w-12 text-gray-300 mx-auto mb-4" />
              <h3 className="text-xl font-medium text-gray-700">Không có sự kiện chờ duyệt</h3>
              <p className="text-gray-500">Tất cả các sự kiện đã được xử lý.</p>
            </div>
          )}
        </TabsContent>

        <TabsContent value="approved" className="mt-0">
          {loading ? (
            <div className="flex items-center justify-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-500"></div>
            </div>
          ) : filteredEvents.filter(event => event.event_status === "approved").length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredEvents
                .filter(event => event.event_status === "approved")
                .map(event => (
                  <EventCard 
                    key={event.id} 
                    event={event}
                    isManager={true}
                    onView={handleViewEvent}
                    onApprove={handleApproveEvent}
                    onReject={handleRejectDialogOpen}
                  />
                ))}
            </div>
          ) : (
            <div className="text-center py-12 bg-gray-50 rounded-lg">
              <CheckCircle className="h-12 w-12 text-gray-300 mx-auto mb-4" />
              <h3 className="text-xl font-medium text-gray-700">Không có sự kiện đã duyệt</h3>
              <p className="text-gray-500">Chưa có sự kiện nào được phê duyệt.</p>
            </div>
          )}
        </TabsContent>

        <TabsContent value="declined" className="mt-0">
          {loading ? (
            <div className="flex items-center justify-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-500"></div>
            </div>
          ) : filteredEvents.filter(event => event.event_status === "declined").length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredEvents
                .filter(event => event.event_status === "declined")
                .map(event => (
                  <EventCard 
                    key={event.id} 
                    event={event}
                    isManager={true}
                    onView={handleViewEvent}
                  />
                ))}
            </div>
          ) : (
            <div className="text-center py-12 bg-gray-50 rounded-lg">
              <XCircle className="h-12 w-12 text-gray-300 mx-auto mb-4" />
              <h3 className="text-xl font-medium text-gray-700">Không có sự kiện bị từ chối</h3>
              <p className="text-gray-500">Chưa có sự kiện nào bị từ chối.</p>
            </div>
          )}
        </TabsContent>
      </Tabs>

      {/* View Event Detail Dialog */}
      <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
        <DialogContent className="max-w-2xl">
          {selectedEvent && (
            <>
              <DialogHeader>
                <DialogTitle className="text-xl font-bold text-green-800">{selectedEvent.title}</DialogTitle>
                <div className="flex items-center gap-2 mt-2">
                  <Badge className={`${
                    selectedEvent.event_status === 'approved' ? 'bg-green-500' : 
                    selectedEvent.event_status === 'pending_approval' ? 'bg-yellow-500' : 
                    selectedEvent.event_status === 'declined' ? 'bg-red-500' : 'bg-gray-500'
                  }`}>
                    {selectedEvent.event_status === 'approved' ? 'Đã duyệt' : 
                    selectedEvent.event_status === 'pending_approval' ? 'Chờ duyệt' : 
                    selectedEvent.event_status === 'declined' ? 'Từ chối' : 'Đã hủy'}
                  </Badge>
                  <span className="text-sm text-gray-500">Ngày tạo: {new Date(selectedEvent.date).toLocaleDateString('vi-VN')}</span>
                </div>
              </DialogHeader>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 py-4">
                <div>
                  <div className="h-48 bg-gray-100 rounded-lg mb-4 overflow-hidden">
                    {selectedEvent.image ? (
                      <img src={selectedEvent.image} alt={selectedEvent.title} className="w-full h-full object-cover" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-green-50">
                        <Calendar className="h-16 w-16 text-green-300" />
                      </div>
                    )}
                  </div>
                  
                  <div className="grid grid-cols-1 gap-3">
                    <div className="flex items-start gap-2">
                      <Calendar className="h-5 w-5 mt-0.5 text-green-700" />
                      <div>
                        <p className="font-medium">Thời gian</p>
                        <p className="text-gray-600">
                          {new Date(selectedEvent.date).toLocaleDateString('vi-VN')} · {selectedEvent.start_time}
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-2">
                      <MapPin className="h-5 w-5 mt-0.5 text-green-700" />
                      <div>
                        <p className="font-medium">Địa điểm</p>
                        <p className="text-gray-600">{selectedEvent.location}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-2">
                      <Tag className="h-5 w-5 mt-0.5 text-green-700" />
                      <div>
                        <p className="font-medium">Giá vé</p>
                        <p className="text-gray-600">{selectedEvent.ticket_price.toLocaleString('vi-VN')} VNĐ</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-2">
                      <Users className="h-5 w-5 mt-0.5 text-green-700" />
                      <div>
                        <p className="font-medium">Vé</p>
                        <p className="text-gray-600">
                          {selectedEvent.available_ticket}/{selectedEvent.total_ticket_amount} vé đã bán
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div>
                  <div className="mb-4">
                    <h3 className="font-medium text-lg mb-2">Mô tả sự kiện</h3>
                    <p className="text-gray-600 whitespace-pre-line">{selectedEvent.content}</p>
                  </div>
                </div>
              </div>
              
              <DialogFooter>
                <Button 
                  variant="outline" 
                  onClick={() => setIsViewDialogOpen(false)} 
                  className="border-green-200 text-green-700"
                >
                  Đóng
                </Button>
                
                {selectedEvent.event_status === 'pending_approval' && (
                  <div className="flex gap-2">
                    <Button 
                      variant="outline" 
                      className="border-red-200 text-red-700 hover:bg-red-50"
                      onClick={() => {
                        setIsViewDialogOpen(false);
                        handleRejectDialogOpen(selectedEvent);
                      }}
                    >
                      <XCircle className="h-4 w-4 mr-1" />
                      Từ chối
                    </Button>
                    <Button 
                      onClick={() => {
                        setIsViewDialogOpen(false);
                        handleApproveEvent(selectedEvent);
                      }} 
                      className="bg-green-600 hover:bg-green-700 text-white"
                    >
                      <CheckCircle className="h-4 w-4 mr-1" />
                      Duyệt
                    </Button>
                  </div>
                )}
              </DialogFooter>
            </>
          )}
        </DialogContent>
      </Dialog>

      {/* Reject Event Dialog */}
      <Dialog open={isRejectDialogOpen} onOpenChange={setIsRejectDialogOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold text-red-800">Từ chối sự kiện</DialogTitle>
            <DialogDescription>
              Vui lòng cung cấp lý do từ chối sự kiện này. Thông tin này sẽ được gửi cho người tạo sự kiện.
            </DialogDescription>
          </DialogHeader>
          
          <div className="py-4">
            <Label htmlFor="rejection-reason" className="text-gray-700 mb-2 block">Lý do từ chối</Label>
            <Textarea
              id="rejection-reason"
              value={rejectionReason}
              onChange={(e) => setRejectionReason(e.target.value)}
              placeholder="Nhập lý do từ chối sự kiện này..."
              className="border-gray-200 focus:border-red-500 min-h-32"
            />
          </div>
          
          <DialogFooter>
            <Button 
              variant="outline" 
              onClick={() => setIsRejectDialogOpen(false)} 
              className="border-gray-200 text-gray-700"
            >
              Hủy
            </Button>
            <Button 
              onClick={handleRejectEvent}
              className="bg-red-600 hover:bg-red-700 text-white"
              disabled={!rejectionReason.trim()}
            >
              Xác nhận từ chối
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

    </div>
  );
};

export default EventManagerUI;