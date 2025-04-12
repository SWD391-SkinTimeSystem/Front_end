import React, { useState, useEffect, useRef, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardFooter, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { PlusCircle, Calendar, MapPin, Clock, Users, Tag, Edit, CheckCircle, XCircle, ArrowRight } from 'lucide-react';
import { X, Image as ImageIcon } from "lucide-react";

// import { CKEditor } from '@ckeditor/ckeditor5-react';
// import { ClassicEditor, Essentials, Paragraph, Bold, Italic } from 'ckeditor5';
// import { FormatPainter } from 'ckeditor5-premium-features';

// import 'ckeditor5/ckeditor5.css';
// import 'ckeditor5-premium-features/ckeditor5-premium-features.css';
import { useEventStatus } from '@/hooks/useEvent';
import { CreateEvent, EventDetail } from '@/types/event';
import { eventService } from '@/services/eventService';


// Form step 1: Event basic info
type EventForm = {
  eventName: string;
  description: string;
  date: string;
  start_time: string;
  end_time: string;
  location: string;
  ticket_price: number;
  capycity: number;
  image_url: File;
};



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

const EventCard = ({ event, onEdit }: { event: EventDetail, onEdit: (event: EventForm) => void }) => {
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
        <Badge className={`absolute top-2 right-2 ${event.event_status === 'approved' ? 'bg-green-500' :
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

      </CardContent>
      {/* <CardFooter className="pt-0 flex justify-between">
        <Button variant="outline" size="sm" className="text-green-700 border-green-200 hover:bg-green-50" onClick={() => onEdit(event)}>
          <Edit className="h-4 w-4 mr-1" />
          Sửa
        </Button>
      </CardFooter> */}
    </Card>
  );
};

const EventManagementUI = () => {
  const [events, setEvents] = useState<EventDetail[]>([]);
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<EventForm | null>(null);
  const [notification, setNotification] = useState<{ message: string, type: 'success' | 'error' } | null>(null);
  const [loading, setLoading] = useState(true);
  const {eventPendingApproval, eventApproved, eventDeclined} = useEventStatus();
  const emptyFile = new File([], 'empty_file', { type: 'application/octet-stream' });

  const [eventForm, setEventForm] = useState<EventForm>({
    eventName: '',
    description: '',
    date: '',
    start_time: '',
    end_time: '',
    location: '',
    ticket_price: 0,
    capycity: 0,
    image_url: emptyFile,
  });
    const merge = useMemo(() => {
      if (eventPendingApproval?.content || eventApproved?.content || eventDeclined?.content) {
        return [...(eventPendingApproval?.content ?? []), ...(eventApproved?.content ?? []), ...(eventDeclined?.content ?? [])];
      }
      return [];
    }, [eventPendingApproval, eventApproved, eventDeclined]);

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

  useEffect(() => {
    console.log('Updated eventForm:', eventForm);
  }, [eventForm]);

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

  const resetCreateForms = () => {
    setEventForm({
      eventName: '',
      description: '',
      date: '',
      start_time: '',
      end_time: '',
      location: '',
      ticket_price: 0,
      capycity: 0,
      image_url: emptyFile,
    });

  };

  // Check if step 1 form is valid
  const isStep1Valid = () => {
    // return eventForm.date && eventForm.start_time && eventForm.end_time && eventForm.ticket_price > 0 && eventForm.location && eventForm.image_url && eventForm.eventName && eventForm.description;
    return eventForm.date && eventForm.start_time && eventForm.end_time && eventForm.ticket_price > 0 && eventForm.location && eventForm.image_url && eventForm.eventName ;

  };


  // Handle step 1 completion and proceed to step 2
  const handleStep1Submit = async () => {
    try {
      if (!isStep1Valid()) {
        showNotification("Vui lòng nhập đầy đủ thông tin sự kiện!", "error");
        return;
      }
      const createdEvent: CreateEvent = {
        EventName: eventForm.eventName,
        Description: eventForm.description,
        Date: eventForm.date,
        StartTime: eventForm.start_time,
        EndTime: eventForm.end_time,
        Location: eventForm.location,
        Price: eventForm.ticket_price,
        Capacity: eventForm.capycity,
      };
      await new Promise(resolve => setTimeout(resolve, 800));
      console.log(createdEvent);
      const result = await eventService.createEvent(createdEvent, eventForm.image_url);
      const add = merge.concat(result);
      setEvents(add);
      setIsCreateDialogOpen(false);
      resetCreateForms();
      showNotification("Sự kiện đã được tạo và đang chờ duyệt!", "success");
    } catch (error) {
      console.error("Error creating event:", error);
      showNotification("Không thể tạo sự kiện. Vui lòng thử lại sau.", "error");
    }
  };


  // const handleEditEvent = () => {
  //   if (!selectedEvent) return;

  //   try {
  //     // Update the event in the events array
  //     const updatedEvents = events.map(event =>
  //       event.id === selectedEvent.event_id ? selectedEvent : event
  //     );

  //     setEvents(updatedEvents);
  //     setIsEditDialogOpen(false);
  //     setSelectedEvent(null);

  //     showNotification("Sự kiện đã được cập nhật thành công!", "success");
  //   } catch (error) {
  //     console.error("Error updating event:", error);
  //     showNotification("Không thể cập nhật sự kiện. Vui lòng thử lại sau.", "error");
  //   }
  // };

  const openEditDialog = (event: EventForm) => {
    setSelectedEvent(event);
    setIsEditDialogOpen(true);
  };

  const handleCreateDialogClose = (open: boolean) => {
    if (!open) {
      resetCreateForms();
    }
    setIsCreateDialogOpen(open);
  };


  const fileInputRef = useRef<HTMLInputElement>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]; // Lấy file đầu tiên
    if (!file) return;

    if (file) {
      // const arrayBuffer = await file.arrayBuffer();
      const base64String = await fileToBase64(file);
      setImagePreview(base64String);
      setEventForm({
        ...eventForm,
        image_url: file,
      });
    }
  };
  // Xử lý khi nhấn nút chọn ảnh
  const handleSelectImage = async () => {
    fileInputRef.current?.click();
  };

  const fileToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = (error) => reject(error);
    });
  };

  // Xóa ảnh đã chọn
  const clearImage = () => {
    setSelectedFile(null);
    setImagePreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = ""; // Reset input file
    }
  };

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
        <h1 className="text-2xl font-bold text-green-800">Quản Lý Sự Kiện</h1>
        <p className="text-gray-600">Tạo, chỉnh sửa và quản lý các sự kiện của bạn</p>
      </div>

      <div className="mb-6 flex justify-between items-center">
        <div className="flex gap-2">
          <Button
            onClick={() => setIsCreateDialogOpen(true)}
            className="bg-green-600 hover:bg-green-700 text-white"
          >
            <PlusCircle className="h-4 w-4 mr-2" />
            Tạo Sự Kiện Mới
          </Button>
        </div>
      </div>

      <Tabs defaultValue="all" className="mb-6">
        <TabsList className="border-b border-gray-200 w-full flex justify-start mb-4">
          <TabsTrigger value="all" className="text-green-700 data-[state=active]:border-b-2 data-[state=active]:border-green-500">
            Tất cả
          </TabsTrigger>
          <TabsTrigger value="approved" className="text-green-700 data-[state=active]:border-b-2 data-[state=active]:border-green-500">
            Đã duyệt
          </TabsTrigger>
          <TabsTrigger value="pending_approval" className="text-green-700 data-[state=active]:border-b-2 data-[state=active]:border-green-500">
            Chờ duyệt
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
          ) : events.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {events.map(event => (
                <EventCard
                  key={event.id}
                  event={event}
                  onEdit={openEditDialog}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-12 bg-gray-50 rounded-lg">
              <Calendar className="h-12 w-12 text-gray-300 mx-auto mb-4" />
              <h3 className="text-xl font-medium text-gray-700 mb-2">Không có sự kiện nào</h3>
              <p className="text-gray-500 mb-4">Bạn chưa tạo sự kiện nào. Hãy tạo sự kiện mới!</p>
              <Button
                onClick={() => setIsCreateDialogOpen(true)}
                className="bg-green-600 hover:bg-green-700 text-white"
              >
                <PlusCircle className="h-4 w-4 mr-2" />
                Tạo Sự Kiện Mới
              </Button>
            </div>
          )}
        </TabsContent>

        <TabsContent value="approved" className="mt-0">
          {loading ? (
            <div className="flex items-center justify-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-500"></div>
            </div>
          ) : events.filter(event => event.event_status === "approved").length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {events
                .filter(event => event.event_status === "approved")
                .map(event => (
                  <EventCard
                    key={event.id}
                    event={event}
                    onEdit={openEditDialog}
                  />
                ))}
            </div>
          ) : (
            <div className="text-center py-12 bg-gray-50 rounded-lg">
              <CheckCircle className="h-12 w-12 text-gray-300 mx-auto mb-4" />
              <h3 className="text-xl font-medium text-gray-700">Không có sự kiện đã duyệt</h3>
              <p className="text-gray-500">Các sự kiện của bạn đang chờ được duyệt.</p>
            </div>
          )}
        </TabsContent>

        <TabsContent value="pending_approval" className="mt-0">
          {loading ? (
            <div className="flex items-center justify-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-500"></div>
            </div>
          ) : events.filter(event => event.event_status === "pending_approval").length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {events
                .filter(event => event.event_status === "pending_approval")
                .map(event => (
                  <EventCard
                    key={event.id}
                    event={event}
                    onEdit={openEditDialog}
                  />
                ))}
            </div>
          ) : (
            <div className="text-center py-12 bg-gray-50 rounded-lg">
              <Clock className="h-12 w-12 text-gray-300 mx-auto mb-4" />
              <h3 className="text-xl font-medium text-gray-700">Không có sự kiện chờ duyệt</h3>
              <p className="text-gray-500">Tất cả các sự kiện của bạn đã được xử lý.</p>
            </div>
          )}
        </TabsContent>

        <TabsContent value="declined" className="mt-0">
          {loading ? (
            <div className="flex items-center justify-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-500"></div>
            </div>
          ) : events.filter(event => event.event_status === "declined").length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {events
                .filter(event => event.event_status === "declined")
                .map(event => (
                  <EventCard
                    key={event.id}
                    event={event}
                    onEdit={openEditDialog}
                  />
                ))}
            </div>
          ) : (
            <div className="text-center py-12 bg-gray-50 rounded-lg">
              <XCircle className="h-12 w-12 text-gray-300 mx-auto mb-4" />
              <h3 className="text-xl font-medium text-gray-700">Không có sự kiện bị từ chối</h3>
              <p className="text-gray-500">Tất cả các sự kiện của bạn đã được duyệt hoặc đang chờ duyệt.</p>
            </div>
          )}
        </TabsContent>
      </Tabs>

      {/* Multi-step Create Event Dialog */}
      <Dialog open={isCreateDialogOpen} onOpenChange={handleCreateDialogClose}>
        <DialogContent className="w-[90vw] max-w-4xl">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold text-green-800">
              Tạo Sự Kiện Mới - Thông Tin Sự Kiện
            </DialogTitle>
            <DialogDescription>
              Hoàn thiện thông tin chi tiết của sự kiện. Sự kiện sẽ được gửi đến quản lý để duyệt
            </DialogDescription>
          </DialogHeader>


          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

            <div className="grid grid-cols-1 gap-2">
              <Label htmlFor="detail-title" className="text-green-700">Tiêu đề chi tiết <span className="text-red-500">*</span></Label>
              <Textarea
                id="detail-title"
                value={eventForm.eventName}
                onChange={(e) => setEventForm({ ...eventForm, eventName: e.target.value })}
                placeholder="Nhập tiêu đề chi tiết"
                className="border-green-200 focus:border-green-500"
              />
            </div>

            {/* <div className="grid grid-cols-1 gap-2">
              <Label htmlFor="description" className="text-green-700">Mô tả sự kiện <span className="text-red-500">*</span></Label>
              <Textarea
                id="description"
                value={eventForm.description}
                onChange={(e) => setEventForm({ ...eventForm, description: e.target.value })}
                placeholder="Mô tả chi tiết về sự kiện."
                className="border-green-200 focus:border-green-500 min-h-32"
              />
            </div> */}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="grid grid-cols-1 gap-2">
                <Label htmlFor="detail-date" className="text-green-700">Ngày diễn ra <span className="text-red-500">*</span></Label>
                <Input
                  id="detail-date"
                  type="date"
                  value={eventForm.date}
                  onChange={(e) => setEventForm({ ...eventForm, date: e.target.value })}
                  className="border-green-200 focus:border-green-500"
                />
              </div>

              <div className="grid grid-cols-1 gap-2">
                <Label htmlFor="detail-location" className="text-green-700">Địa điểm <span className="text-red-500">*</span></Label>
                <Input
                  id="detail-location"
                  value={eventForm.location}
                  onChange={(e) => setEventForm({ ...eventForm, location: e.target.value })}
                  placeholder="Nhập địa điểm chi tiết"
                  className="border-green-200 focus:border-green-500"
                />
              </div>
            </div>

            
            {/* <div className="grid grid-cols-1 gap-2">
              <CKEditor
                editor={ClassicEditor}
                config={{
                  licenseKey: 'eyJhbGciOiJFUzI1NiJ9.eyJleHAiOjE3NDQyNDMxOTksImp0aSI6ImZkMjQzMzhkLWNlZWUtNGQ2NC1iYzhjLWEzYTkxNmU2OTZhZCIsInVzYWdlRW5kcG9pbnQiOiJodHRwczovL3Byb3h5LWV2ZW50LmNrZWRpdG9yLmNvbSIsImRpc3RyaWJ1dGlvbkNoYW5uZWwiOlsiY2xvdWQiLCJkcnVwYWwiLCJzaCJdLCJ3aGl0ZUxhYmVsIjp0cnVlLCJsaWNlbnNlVHlwZSI6InRyaWFsIiwiZmVhdHVyZXMiOlsiKiJdLCJ2YyI6IjZiYmNiOGU0In0.QcLgrDFHFA1UWj8U107zQXWZo_sUjKbz0DzrPW37IOWwPicAvvspKLmBPAXfPYj0wn21kc7AQqfzSO3AOZZDsg', // Thay bằng license key của bạn
                  plugins: [ Essentials, Paragraph, Bold, Italic, FormatPainter ],
                  toolbar: [ 'undo', 'redo', '|', 'bold', 'italic', '|', 'formatPainter' ],
                }}
                onChange={(event, editor) => {
                  const data = editor.getData();
                  setEventForm((prevForm) => ({ ...prevForm, description: data }));
                }}
              />
            </div> */}

         

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="grid grid-cols-1 gap-2">
                <Label htmlFor="start-time" className="text-green-700">Giờ bắt đầu <span className="text-red-500">*</span></Label>
                <Input
                  id="start-time"
                  type="time"
                  value={eventForm.start_time}
                  onChange={(e) => setEventForm({ ...eventForm, start_time: e.target.value })}
                  step="1"
                  className="border-green-200 focus:border-green-500"
                />
              </div>

              <div className="grid grid-cols-1 gap-2">
                <Label htmlFor="end-time" className="text-green-700">Giờ kết thúc <span className="text-red-500">*</span></Label>
                <Input
                  id="end-time"
                  type="time"
                  value={eventForm.end_time}
                  onChange={(e) => setEventForm({ ...eventForm, end_time: e.target.value })}
                  step="1"
                  className="border-green-200 focus:border-green-500"
                />
              </div>
            </div>


            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

              <div className="grid grid-cols-1 gap-2">
                <Label htmlFor="total-tickets" className="text-green-700">Tổng số vé <span className="text-red-500">*</span></Label>
                <Input
                  id="total-tickets"
                  type="number"
                  value={eventForm.capycity}
                  onChange={(e) => setEventForm({
                    ...eventForm,
                    capycity: Number(e.target.value),
                  })}
                  min="1"
                  className="border-green-200 focus:border-green-500"
                />
              </div>



              <div className="grid grid-cols-1 gap-2">
                <Label htmlFor="ticket-price" className="text-green-700">Giá vé (VNĐ) <span className="text-red-500">*</span></Label>
                <Input
                  id="ticket-price"
                  type="number"
                  value={eventForm.ticket_price}
                  onChange={(e) => setEventForm({ ...eventForm, ticket_price: Number(e.target.value) })}
                  min="0"
                  className="border-green-200 focus:border-green-500"
                />
              </div>

            </div>

            <div className="flex flex-col gap-2">
              <label className="text-gray-700 font-medium">Chọn ảnh</label>
              <div className="mt-1 flex flex-col gap-2">
                {imagePreview ? (
                  <div className="relative w-full h-40 bg-gray-100 rounded-md overflow-hidden">
                    <img
                      src={imagePreview}
                      alt="Preview"
                      className="w-full h-full object-cover"
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="absolute top-1 right-1 bg-white/80 text-gray-700 rounded-full p-1 hover:bg-white"
                      onClick={clearImage}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                ) : (
                  <Button
                    type="button"
                    variant="outline"
                    className="h-40 w-full border-dashed flex flex-col items-center justify-center gap-2"
                    onClick={handleSelectImage}
                  >
                    <ImageIcon className="h-8 w-8 text-gray-400" />
                    <span className="text-sm text-gray-500">Chọn ảnh từ máy</span>
                  </Button>
                )}
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleFileChange}
                  accept="image/*"
                  className="hidden"
                />
              </div>
            </div>


          </div>

          {/* Dialog Footer with navigation buttons */}
          <DialogFooter className="flex justify-between">
            <Button
              type="button"
              onClick={handleStep1Submit}
              className="bg-green-600 hover:bg-green-700 text-white"
            >
              Tạo Sự Kiện
            </Button>

          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Event Dialog
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold text-green-800">Chỉnh Sửa Sự Kiện</DialogTitle>
            <DialogDescription>
              Chỉnh sửa thông tin sự kiện của bạn. Những thay đổi sẽ được gửi lại để xét duyệt.
            </DialogDescription>
          </DialogHeader>

          {selectedEvent && (
            <div className="grid grid-cols-1 gap-4 py-4">
              <div className="grid grid-cols-1 gap-2">
                <Label htmlFor="edit-title" className="text-green-700">Tên sự kiện</Label>
                <Input
                  id="edit-title"
                  value={selectedEvent.title}
                  onChange={(e) => setSelectedEvent({ ...selectedEvent, title: e.target.value })}
                  className="border-green-200 focus:border-green-500"
                />
              </div>

              <div className="grid grid-cols-1 gap-2">
                <Label htmlFor="edit-description" className="text-green-700">Mô tả</Label>
                <Textarea
                  id="edit-description"
                  value={selectedEvent.description}
                  onChange={(e) => setSelectedEvent({ ...selectedEvent, description: e.target.value })}
                  className="border-green-200 focus:border-green-500 min-h-32"
                />
              </div>
              <div className="grid grid-cols-1 gap-2">
                <Label htmlFor="edit-content" className="text-green-700">Nội dung</Label>
                <Textarea
                  id="edit-content"
                  value={selectedEvent.content}
                  onChange={(e) => setSelectedEvent({ ...selectedEvent, content: e.target.value })}
                  className="border-green-200 focus:border-green-500 min-h-32"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="grid grid-cols-1 gap-2">
                  <Label htmlFor="edit-start-date" className="text-green-700">Ngày diễn ra</Label>
                  <Input
                    id="edit-start-date"
                    type="date"
                    value={selectedEvent.start_date}
                    onChange={(e) => setSelectedEvent({ ...selectedEvent, start_date: e.target.value })}
                    className="border-green-200 focus:border-green-500"
                  />
                </div>

                <div className="grid grid-cols-1 gap-2">
                  <Label htmlFor="edit-location" className="text-green-700">Địa điểm</Label>
                  <Input
                    id="edit-location"
                    value={selectedEvent.location}
                    onChange={(e) => setSelectedEvent({ ...selectedEvent, location: e.target.value })}
                    className="border-green-200 focus:border-green-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="grid grid-cols-1 gap-2">
                  <Label htmlFor="edit-start-time" className="text-green-700">Giờ bắt đầu</Label>
                  <Input
                    id="edit-start-time"
                    type="time"
                    value={selectedEvent.start_time}
                    onChange={(e) => setSelectedEvent({ ...selectedEvent, start_time: e.target.value })}
                    className="border-green-200 focus:border-green-500"
                  />
                </div>
                <div className="grid grid-cols-1 gap-2">
                  <Label htmlFor="edit-end-time" className="text-green-700">Giờ kết thúc <span className="text-red-500">*</span></Label>
                  <Input
                    id="edit-end-time"
                    type="time"
                    value={eventForm.end_time}
                    onChange={(e) => setEventForm({ ...eventForm, end_time: e.target.value })}
                    className="border-green-200 focus:border-green-500"
                  />
                </div>
                <div className="grid grid-cols-1 gap-2">
                  <Label htmlFor="edit-ticket_price" className="text-green-700">Giá vé (VNĐ)</Label>
                  <Input
                    id="edit-ticket_price"
                    type="number"
                    value={selectedEvent.ticket_price}
                    onChange={(e) => setSelectedEvent({ ...selectedEvent, ticket_price: Number(e.target.value) })}
                    min="0"
                    className="border-green-200 focus:border-green-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 gap-2">
                <Label htmlFor="edit-image-url" className="text-green-700">URL Hình ảnh</Label>
                <Input
                  id="edit-image-url"
                  value={selectedEvent.image_url}
                  onChange={(e) => setSelectedEvent({ ...selectedEvent, image_url: e.target.value })}
                  className="border-green-200 focus:border-green-500"
                />
              </div>
            </div>
          )}

          <DialogFooter>
            <Button
              type="button"
              onClick={handleEditEvent}
              className="bg-green-600 hover:bg-green-700 text-white"
            >
              Lưu Thay Đổi
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog> */}
    </div>
  );
};

export default EventManagementUI;
