import React, { useState, useMemo } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Pencil,
  Plus,
  Eye,
  Clock,
  Tag,
  TrendingUp,
} from "lucide-react";
import { FormProvider, useForm } from 'react-hook-form';
import { ServiceDetailModal } from './ServiceDetailModal';
import { NewServiceForm } from './NewServiceForm';
import { useServices } from './useServices'; // Adjust import path as needed
import { ServiceWithImages } from '@/types/services';

const colors = {
  primary: '#326e51', // Deep green
  secondary: '#4CAF50', // Bright green
  background: '#f0fdf4', // Light mint green
  text: '#064e3b', // Dark forest green
  accent: '#e6f3e6', // Very light green
};

export const ServiceManagementTable: React.FC = () => {
  const { 
    services, 
    loading, 
    error, 
    fetchServices, 
    popularServices
  } = useServices();

  const [nameFilter, setNameFilter] = useState('');
  const [popularityFilter, setPopularityFilter] = useState<'all' | 'high' | 'low'>('all');
  const [selectedService, setSelectedService] = useState<any | null>(null);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [showNewServiceDialog, setShowNewServiceDialog] = useState(false);
  const [editingService, setEditingService] = useState<ServiceWithImages | null>(null);
  const methods = useForm(); 


  const servicesWithBookingCount = useMemo(() => {
    return services.map(service => {
      const popularService = popularServices.find(ps => ps.serviceId === service.id);
      return {
        ...service,
        bookingCount: popularService?.bookingCount || 0,
        totalRevenue: popularService?.totalRevenue || 0
      };
    });
  }, [services, popularServices]);
  const filteredServices = useMemo(() => {
    if (!Array.isArray(services)) return []; 
  
    return services
      .filter(service =>
        service.serviceName?.toLowerCase().includes(nameFilter.toLowerCase()) &&
        (popularityFilter === 'all')
      )
      .sort((a, b) => (b.bookingCount || 0) - (a.bookingCount || 0));
  }, [services, nameFilter, popularityFilter]);
  // Open service detail modal
  const openServiceDetail = (service: any) => {
    setSelectedService(service);
    setIsDetailModalOpen(true);
  };

  // Handler to open edit service dialog
  const handleEditService = (service: any) => {
    setEditingService(service);
    setShowNewServiceDialog(true);
  };

  // Handler to close dialog and refresh list
  const handleServiceSuccess = () => {
    setShowNewServiceDialog(false);
    fetchServices(); // Refresh services list
  };

  // Render loading state
  if (loading) {
    return (
      <Card className="w-full">
        <CardContent className="flex justify-center items-center h-64">
          Đang tải dữ liệu...
        </CardContent>
      </Card>
    );
  }

  // Render error state
  if (error) {
    return (
      <Card className="w-full">
        <CardContent className="flex justify-center items-center h-64 text-red-500">
          {error}
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full" style={{ backgroundColor: colors.background }}>
      <CardHeader className="flex justify-between items-center">
        <CardTitle
          className="text-2xl font-bold"
          style={{ color: colors.text }}
        >
          Quản lý dịch vụ
        </CardTitle>
        <Button
          className="flex items-center gap-2"
          style={{
            backgroundColor: colors.primary,
            color: 'white'
          }}
          onClick={() => setShowNewServiceDialog(true)}
        >
          <Plus className="h-5 w-5" /> Thêm dịch vụ
        </Button>
      </CardHeader>

      <CardContent>
        {/* Filters */}
        <div className="flex space-x-4 mb-6">
          <Input
            placeholder="Tìm kiếm dịch vụ"
            value={nameFilter}
            onChange={(e) => setNameFilter(e.target.value)}
            className="flex-grow"
            style={{
              borderColor: colors.primary,
              backgroundColor: 'white'
            }}
          />
          <Select
            value={popularityFilter}
            onValueChange={(val: 'all' | 'high' | 'low') => setPopularityFilter(val)}
          >
            <SelectTrigger className="w-1/3">
              <SelectValue placeholder="Độ phổ biến" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Tất cả</SelectItem>
              <SelectItem value="high">Phổ biến</SelectItem>
              <SelectItem value="low">Ít phổ biến</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Services Table */}
        <Table>
          <TableHeader style={{ backgroundColor: colors.primary }}>
            <TableRow>
              <TableHead style={{ color: 'white' }}>Dịch vụ</TableHead>
              <TableHead style={{ color: 'white' }}>Nhóm dịch vụ</TableHead>
              <TableHead style={{ color: 'white' }}>Thời gian</TableHead>
              <TableHead style={{ color: 'white' }}>Giá</TableHead>
              <TableHead style={{ color: 'white' }}>
                <div className="flex items-center">
                  <TrendingUp className="mr-2 h-4 w-4" /> Số lượng đặt
                </div>
              </TableHead>
              <TableHead style={{ color: 'white' }}>Thao tác</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredServices.map(service => (
              <TableRow key={service.id}>
                <TableCell className="font-medium">
                  {service.serviceName}
                  {service.bookingCount > 30 && (
                    <Badge variant="secondary" className="ml-2">Hot</Badge>
                  )}
                </TableCell>
                <TableCell>{service.serviceCategoryId || 'Chưa phân loại'}</TableCell>
                <TableCell>
                  <div className="flex items-center">
                    <Clock className="h-4 w-4 mr-2 text-green-600" />
                    {service.duration} phút
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center">
                    <Tag className="h-4 w-4 mr-2 text-green-600" />
                    {service.price.toLocaleString('vi-VN')} VNĐ
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center">
                    <TrendingUp className="h-4 w-4 mr-2 text-blue-600" />
                    {service.bookingCount}
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      style={{
                        borderColor: colors.primary,
                        color: colors.text
                      }}
                      onClick={() => openServiceDetail(service)}
                    >
                      <Eye className="mr-2 h-4 w-4" /> Chi tiết
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      style={{
                        borderColor: colors.secondary,
                        color: colors.text
                      }}
                      onClick={() => handleEditService(service)}
                    >
                      <Pencil className="mr-2 h-4 w-4" /> Chỉnh sửa
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        {/* Service Detail Modal */}
        {selectedService && (
          <ServiceDetailModal
            service={selectedService}
            isOpen={isDetailModalOpen}
            onClose={() => setIsDetailModalOpen(false)}
          />
        )}

        {/* New Service Dialog */}
        <Dialog open={showNewServiceDialog} onOpenChange={setShowNewServiceDialog}>
          <DialogContent className="sm:max-w-[800px]">
            <DialogHeader>
              <DialogTitle>
                {editingService ? 'Chỉnh sửa dịch vụ' : 'Thêm dịch vụ mới'}
              </DialogTitle>
            </DialogHeader>
            <FormProvider {...methods}>
              <NewServiceForm 
                onSuccess={handleServiceSuccess}
                initialData={editingService || undefined}
              />
            </FormProvider>
          </DialogContent>
        </Dialog>
      </CardContent>
    </Card>
  );
};

export default ServiceManagementTable;