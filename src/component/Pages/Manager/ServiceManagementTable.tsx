

// import React, { useState, useMemo } from 'react';
// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableHead,
//   TableHeader,
//   TableRow
// } from "@/components/ui/table";
// import {
//   Card,
//   CardContent,
//   CardHeader,
//   CardTitle
// } from "@/components/ui/card";
// import { Input } from "@/components/ui/input";
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue
// } from "@/components/ui/select";
// import { Button } from "@/components/ui/button";
// import {
//   Dialog,
//   DialogContent,
//   DialogHeader,
//   DialogTitle,
//   DialogDescription
// } from "@/components/ui/dialog";
// import {
//   Pencil,
//   Plus,
//   Filter,
//   Eye
// } from "lucide-react";
// import { FormProvider, useForm } from 'react-hook-form';
// import { NewServiceForm } from './NewServiceForm';
// import { useServices } from './useServices';
// import ServiceDetailModal from './ServiceDetailModal';

// const colors = {
//   primary: '#326e51', // Green
//   background: '#f0fdf4', // Light green background
//   text: '#064e3b', // Dark green text
//   accent: '#f1f1f1', // Bright green
// };


// // interface Service {
// //   id: string;
// //   serviceName: string;
// //   description: string;
// //   duration: number;
// //   thumbnail: string;
// //   price: number;
// //   bookingCount?: number;
// //   serviceGroupName?: string;
// // }

// interface Service {
//   id: string;
//   serviceName: string;
//   description: string;
//   duration: number;
//   thumbnail: string;
//   price: number;
//   bookingCount?: number;
//   serviceGroupName?: string;
//   serviceImages: string[];
// serviceDetails: string[];
// }


// export const ServiceManagementTable: React.FC = () => {


//   // const { services, loading, error } = useServices();
//   const [showNewForm, setShowNewForm] = useState(false);
//   const methods = useForm();

//   const [selectedService, setSelectedService] = useState<Service | null>(null);
//   const [isModalOpen, setIsModalOpen] = useState(false);

//   const [services, setServices] = useState<Service[]>([
//     {
//       id: '1',
//       serviceName: 'Dưỡng ẩm sâu',
//       description: 'Cung cấp dưỡng chất và khóa ẩm lâu dài',
//       duration: 60,
//       thumbnail: 'https://example.com/service-image.jpg',
//       price: 800000,
//       // bookingCount: 45,
//       serviceGroupName: 'Chăm sóc da',
//       serviceImages: [],
//       serviceDetails: [],
//     },
//   ]);

//   // Filter states
//   const [nameFilter, setNameFilter] = useState('');
//   const [categoryFilter, setCategoryFilter] = useState('');
//   const [popularityFilter, setPopularityFilter] = useState<'all' | 'high' | 'low'>('all');

//   // Filtered and sorted services
//   const filteredServices = useMemo(() => {
//     return services.filter(service =>
//       service.serviceName.toLowerCase().includes(nameFilter.toLowerCase()) &&
//       (categoryFilter === '' || service.serviceGroupName === categoryFilter) &&
//       (popularityFilter === 'all' ||
//         (popularityFilter === 'high' && (service.bookingCount || 0) > 30) ||
//         (popularityFilter === 'low' && (service.bookingCount || 0) <= 30)
//       )
//     ).sort((a, b) => (b.bookingCount || 0) - (a.bookingCount || 0));
//   }, [services, nameFilter, categoryFilter, popularityFilter]);

//   // Categories (extract from services)
//   const categories = [...new Set(services.map(s => s.serviceGroupName).filter(Boolean))];

//   return (
//     <Card className="w-full" style={{ backgroundColor: colors.background }}>
//       <CardHeader className="flex justify-between items-center">
//         <CardTitle
//           className="text-2xl font-bold"
//           style={{ color: colors.text }}
//         >
//           Quản lý dịch vụ
//         </CardTitle>
//         <Button
//           className="bg-green-800 text-white w-40"
//           onClick={() => setShowNewForm(true)}
//         >
//           + Thêm dịch vụ
//         </Button>
//       </CardHeader>


//       <CardContent>

//         {/* Filters */}
//         <div className="flex space-x-4 mb-6">
//           <Input
//             placeholder="Tìm kiếm dịch vụ"
//             value={nameFilter}
//             onChange={(e) => setNameFilter(e.target.value)}
//             className="w-1/3"
//             style={{ borderColor: colors.primary }}
//           />

//           <Select
//             value={categoryFilter}
//             onValueChange={setCategoryFilter}
//           >
//             <SelectTrigger className="w-1/3">
//               <SelectValue placeholder="Chọn danh mục" />
//             </SelectTrigger>
//             <SelectContent>
//               {categories.map(category => (
//                 <SelectItem key={category} value={category || ''}>
//                   {category}
//                 </SelectItem>
//               ))}
//             </SelectContent>
//           </Select>

//           <Select
//             value={popularityFilter}
//             onValueChange={(val: 'all' | 'high' | 'low') => setPopularityFilter(val)}
//           >
//             <SelectTrigger className="w-1/3">
//               <SelectValue placeholder="Độ phổ biến" />
//             </SelectTrigger>
//             <SelectContent>
//               <SelectItem value="all">Tất cả</SelectItem>
//               <SelectItem value="high">Phổ biến</SelectItem>
//               <SelectItem value="low">Ít phổ biến</SelectItem>
//             </SelectContent>
//           </Select>
//         </div>



//         {/* Table */}
//         <Table>
//           <TableHeader style={{ backgroundColor: colors.primary }}>
//             <TableRow>
//               <TableHead style={{ color: colors.accent }}>Tên dịch vụ</TableHead>
//               <TableHead style={{ color: colors.accent }}>Loại dịch vụ</TableHead>
//               <TableHead style={{ color: colors.accent }}>Thời gian</TableHead>
//               <TableHead style={{ color: colors.accent }}>Giá</TableHead>
//               <TableHead style={{ color: colors.accent }}>Số lượng đặt</TableHead>
//               <TableHead style={{ color: colors.accent }}>Thao tác</TableHead>
//             </TableRow>
//           </TableHeader>
//           <TableBody>
//             {filteredServices.map(service => (
//               <TableRow key={service.id}>
//                 <TableCell>{service.serviceName}</TableCell>
//                 <TableCell>{service.serviceGroupName}</TableCell>
//                 <TableCell>{service.duration} phút</TableCell>
//                 <TableCell>{service.price.toLocaleString('vi-VN')} VNĐ</TableCell>
//                 <TableCell>{service.bookingCount || 0}</TableCell>
//                 <TableCell>
//                   <div className="flex space-x-2">
//                     <Button
//                       variant="outline"
//                       size="sm"
//                       style={{
//                         borderColor: colors.primary,
//                         color: colors.text
//                       }}
//                       onClick={() => {
//                         setSelectedService(service); 
//                         setIsModalOpen(true); 
//                       }}
//                     >
//                       <Eye className="mr-2 h-4 w-4" /> Chi tiết
//                     </Button>
//                     <Button
//                       variant="outline"
//                       size="sm"
//                       style={{
//                         borderColor: colors.primary,
//                         color: colors.text
//                       }}
//                     >
//                       <Pencil className="h-4 w-4" /> Sửa
//                     </Button>
//                   </div>
//                 </TableCell>
//               </TableRow>
//             ))}
//           </TableBody>

//           {selectedService && (
//         <ServiceDetailModal
//           service={selectedService}
//           isOpen={isModalOpen}
//           onClose={() => setIsModalOpen(false)}
//         />
//       )}
//         </Table>


//         <Dialog open={showNewForm} onOpenChange={setShowNewForm}>
//           <DialogContent className="max-w-3xl">
//             <DialogHeader style={{ backgroundColor: colors.primary, color: 'white' }}>
//               <DialogTitle>Thêm dịch vụ mới</DialogTitle>
//               <DialogDescription>
//                 Nhập thông tin chi tiết để tạo dịch vụ mới
//               </DialogDescription>
//             </DialogHeader>
//             <FormProvider {...methods}>
//               <NewServiceForm onSuccess={() => setShowNewForm(false)} />
//             </FormProvider>
//           </DialogContent>
//         </Dialog>
//         {/* </div> */}
//       </CardContent>
//     </Card>
//   );
// };

// export default ServiceManagementTable;


import React, { useState, useMemo, useEffect } from 'react';
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
  DialogDescription
} from "@/components/ui/dialog";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious
} from "@/components/ui/carousel";
import {
  Pencil,
  Plus,
  Eye,
  Clock,
  Tag,
  Image as ImageIcon
} from "lucide-react";
import { FormProvider, useForm } from 'react-hook-form';
import { ServiceDetailModal } from './ServiceDetailModal';
import { sampleServices, samplePopularServices } from './sampleServices ';
import { NewServiceForm } from './NewServiceForm';
import { ServiceWithImages } from '@/types/serviceImage';
import { useService } from '@/hooks/useService';
import { aw } from 'node_modules/framer-motion/dist/types.d-6pKw1mTI';
import { useCategory } from '@/hooks/useCategory';
import { Service } from '@/types/services';


interface ServiceDetailType {
  id: string;
  name: string;
  description: string;
  step: number;
  duration: number;
}

interface PopularService {
  serviceId: string;
  serviceName: string;
  bookingCount: number;
}

const colors = {
  primary: '#326e51', // Deep green
  secondary: '#4CAF50', // Bright green
  background: '#f0fdf4', // Light mint green
  text: '#064e3b', // Dark forest green
  accent: '#e6f3e6', // Very light green
};


// import React, { useState, useEffect } from 'react';
// import { ServiceManagementTable } from './ServiceManagementTable';
// import { sampleServices, samplePopularServices } from './sampleServiceData';

// export const ServiceManagementPage: React.FC = () => {
//   const [services, setServices] = useState([]);
//   const [popularServices, setPopularServices] = useState([]);

//   useEffect(() => {
//     // Simulate API call with sample data
//     setServices(sampleServices);
//     setPopularServices(samplePopularServices);
//   }, []);

//   return <ServiceManagementTable 
//     initialServices={services} 
//     initialPopularServices={popularServices} 
//   />;
// };
// export const ServiceManagementTable: React.FC<{
//   initialServices?: Service[];
//   initialPopularServices?: PopularService[];
// }> = ({ 
//   initialServices = [], 
//   initialPopularServices = [] 
// }) => {
//   const [services, setServices] = useState(initialServices);
//   const [popularServices, setPopularServices] = useState(initialPopularServices);

export const ServiceManagementTable: React.FC = () => {
  const [popularServices, setPopularServices] = useState<PopularService[]>([]);

  const [nameFilter, setNameFilter] = useState('');
  const [popularityFilter, setPopularityFilter] = useState<'all' | 'high' | 'low'>('all');
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [showNewServiceDialog, setShowNewServiceDialog] = useState(false);
  const [editingService, setEditingService] = useState<ServiceWithImages | null>(null);
  const methods = useForm(); 
  const servicesList = useService();
  // const {categories, fetchServiceByCategory} = useCategory();
  // const methods = useForm();
    // const [showNewForm, setShowNewForm] = useState(false);

  const [services, setServices] = useState<Service[]>([]);

  useEffect(() => {
    if (servicesList.services.length > 0) {
      fetchServices();
    }
  }, [servicesList.services]);

  const fetchServices = async () => {
    try {
      // const [servicesResponse, popularResponse] = await Promise.all([
      //   fetch('/api/services'),
      //   fetch('/api/services/popular')
      // ]);
      // const servicesData = await servicesResponse.json();
      // const popularData = await popularResponse.json();

      // setServices(servicesData);
      // setPopularServices(popularData);
      await new Promise(resolve => setTimeout(resolve, 800));
      setServices(servicesList.services);
      setPopularServices(samplePopularServices);
    } catch (error) {
      console.error('Error fetching services:', error);
    }
  };


  // Filtered and sorted services with popularity
  const filteredServices = useMemo(() => {
    return services.map(service => {
      const popularityData = popularServices.find(ps => ps.serviceId === service.id);

      return {
        ...service,
        bookingCount: popularityData?.bookingCount || 0
      };
    }).filter(service =>
      service.serviceName.toLowerCase().includes(nameFilter.toLowerCase()) &&
      (popularityFilter === 'all' ||
        (popularityFilter === 'high' && service.bookingCount > 30) ||
        (popularityFilter === 'low' && service.bookingCount <= 30)
      )
    ).sort((a, b) => b.bookingCount - a.bookingCount);
  }, [services, popularServices, nameFilter, popularityFilter]);

  // Open service detail modal
  const openServiceDetail = (service: Service) => {
    setSelectedService(service);
    setIsDetailModalOpen(true);
  };

  // Handler to open new service dialog
  const handleOpenNewServiceDialog = () => {
    setEditingService(null);
    setShowNewServiceDialog(true);
  };

  // Handler to close dialog and refresh list
  const handleServiceSuccess = () => {
    setShowNewServiceDialog(false);
    // fetchServices();
  };

  const handleEditService = (service: ServiceWithImages) => {
    setEditingService(service);
    setShowNewServiceDialog(true);
  };

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
              <TableHead style={{ color: 'white' }}>Thời gian</TableHead>
              <TableHead style={{ color: 'white' }}>Giá</TableHead>
              <TableHead style={{ color: 'white' }}>Số lượng đặt</TableHead>
              <TableHead style={{ color: 'white' }}>Thao tác</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredServices.map(service => (
              <TableRow key={service.id}>
                <TableCell className="font-medium">{service.serviceName}</TableCell>
                <TableCell>
                  <div className="flex items-center">
                    <Clock className="h-4 w-4 mr-2 text-green-600" />
                    {service.duration} phút
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center">
                    <Tag className="h-4 w-4 mr-2 text-green-600" />
                    {service.price?.toLocaleString('vi-VN')} VNĐ
                  </div>
                </TableCell>
                <TableCell className="flex items-center">{service.bookingCount}</TableCell>
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

        {/* New Service Dialog - Placeholder */}
        {/* <Dialog open={showNewServiceDialog} onOpenChange={setShowNewServiceDialog}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Thêm dịch vụ mới</DialogTitle>
            </DialogHeader>
            <FormProvider {...methods}>
              <NewServiceForm onSuccess={() => setShowNewServiceDialog(false)} />
            </FormProvider>         
             </DialogContent>
        </Dialog> */}

{/* <Dialog open={showNewForm} onOpenChange={setShowNewForm}>
           <DialogContent className="max-w-3xl">
             <DialogHeader style={{ backgroundColor: colors.primary, color: 'white' }}>
               <DialogTitle>Thêm dịch vụ mới</DialogTitle>
               <DialogDescription>
                 Nhập thông tin chi tiết để tạo dịch vụ mới
              </DialogDescription>
             </DialogHeader>
             <FormProvider {...methods}>
               <NewServiceForm onSuccess={() => setShowNewForm(false)} />
             </FormProvider>
           </DialogContent>
         </Dialog> */}


      {/* Button to open new service dialog */}
      <Button onClick={handleOpenNewServiceDialog}>
        Thêm dịch vụ mới
      </Button>

      {/* New Service Dialog */}
      <Dialog open={showNewServiceDialog} onOpenChange={setShowNewServiceDialog}>
        <DialogContent className="sm:max-w-[800px]">
          <DialogHeader>
            <DialogTitle>
              {editingService ? 'Chỉnh sửa dịch vụ' : 'Thêm dịch vụ mới'}
            </DialogTitle>
          </DialogHeader>
          <FormProvider {...methods}>
               {/* <NewServiceForm onSuccess={() => setShowNewForm(false)} /> */}
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

