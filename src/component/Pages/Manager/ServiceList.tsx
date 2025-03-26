import { useState } from 'react';
import { Service } from "../../../types/services";
import { 
 Card, 
 CardContent, 
 CardDescription, 
 CardFooter, 
 CardHeader, 
 CardTitle 
} from '@/components/ui/card';
import { 
 Dialog, 
 DialogContent, 
 DialogDescription, 
 DialogHeader, 
 DialogTitle,
 DialogTrigger
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Pencil, Plus, Clock, Tag, Info } from 'lucide-react';
import { NewServiceForm } from './NewServiceForm';
import { FormProvider, useForm } from 'react-hook-form';
import { useService, useServiceDetail } from '@/hooks/useService';

const colors = {
    primary: {
      light: 'text-green-400',
      DEFAULT: 'text-green-500',
      dark: 'text-green-600',
      bg: {
        light: 'bg-green-400',
        DEFAULT: 'bg-green-500',
        dark: 'bg-green-600',
      },
      border: {
        light: 'border-green-400',
        DEFAULT: 'border-green-500',
        dark: 'border-green-600',
      },
      hover: {
        light: 'hover:bg-green-400',
        DEFAULT: 'hover:bg-green-500',
        dark: 'hover:bg-green-600',
      }
    },
    white: {
      DEFAULT: 'text-white',
      bg: 'bg-white',
    }
   };

const ServiceDetail = ({ service }: { service: Service }) => {
  // const { serviceDetail } = useServiceDetail("");
  return (
    <DialogContent className="max-w-3xl">
      <DialogHeader>
        <DialogTitle className={`${colors.primary.DEFAULT} font-bold text-2xl`}>
          {service.serviceName}
        </DialogTitle>
        <DialogDescription>
          Chi tiết dịch vụ
        </DialogDescription>
      </DialogHeader>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <img 
            src={service.thumbnail} 
            alt={service.serviceName} 
            className="w-full rounded-lg object-cover h-64" 
          />
          <div className="mt-4">
            <p className="text-gray-600 mb-2">{service.description}</p>
            <div className="flex items-center mt-2">
              <Clock className="h-4 w-4 mr-2 text-gray-500" />
              <span className="text-gray-500">{service.duration} phút</span>
            </div>
            <div className="flex items-center mt-2">
              <Tag className="h-4 w-4 mr-2 text-gray-500" />
              <span className="text-gray-500">{service.price?.toLocaleString('vi-VN')} VNĐ</span>
            </div>
          </div>
        </div>
        
        <div>
          <h3 className="font-semibold text-lg mb-4">Quy trình thực hiện</h3>
          {service.serviceDetails && service.serviceDetails.length > 0 ? (
            <div className="space-y-4">
              {service.serviceDetails.map((detail) => (
                <div key={detail.id} className="border-l-2 border-green-500 pl-4 py-2">
                  <h4 className="font-medium text-gray-800 flex items-center">
                    <span className="w-6 h-6 rounded-full bg-green-500 text-white flex items-center justify-center text-xs mr-2">
                      {detail.step}
                    </span>
                    {detail.name}
                  </h4>
                  <p className="text-gray-600 text-sm mt-1">{detail.description}</p>
                  <div className="flex items-center mt-2 text-xs text-gray-500">
                    <Clock className="h-3 w-3 mr-1" />
                    <span>{detail.duration} phút</span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500 italic">Chưa có thông tin chi tiết</p>
          )}
        </div>
      </div>
    </DialogContent>
   );
}

export const ServiceList = () => {
 const { services, loading, error } = useService();
 const [showNewForm, setShowNewForm] = useState(false);
 const methods = useForm();
 if (loading) return <div className="flex justify-center py-10">Đang tải dữ liệu...</div>;
 if (error) return <div className="text-red-500 p-4">{error}</div>;



 return (
   <div className="container mx-auto px-2 py-8">
     <div className="flex justify-between items-center mb-6">
       <h1 className={`text-2xl font-bold ${colors.primary.DEFAULT}`}>Quản lý dịch vụ chăm sóc da</h1>
       <Button 
         className={`${colors.primary.bg.DEFAULT} ${colors.white.DEFAULT}`} 
         onClick={() => setShowNewForm(true)}
       >
         <Plus className="mr-2 h-4 w-4" /> Thêm dịch vụ mới
       </Button>
     </div>
     
     <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
       {services.map((service) => (
         <Card key={service.id} className="overflow-hidden border border-gray-200 hover:shadow-lg transition-shadow">
           <CardHeader className="p-0">
             <img 
               src={service.thumbnail} 
               alt={service.serviceName}
               className="h-48 w-full object-cover"
             />
           </CardHeader>
           <CardContent className="p-4">
             <CardTitle className={`${colors.primary.DEFAULT} text-xl font-semibold mb-2`}>
               {service.serviceName}
             </CardTitle>
             <CardDescription className="text-gray-600 h-12 overflow-hidden">
               {service.description || "Không có mô tả"}
             </CardDescription>
             <div className="mt-4 flex justify-between items-center">
               <div className="flex items-center">
                 <Clock className="h-4 w-4 mr-2 text-gray-500" />
                 <span className="text-gray-500 text-sm">{service.duration} phút</span>
               </div>
               <div className="font-semibold">
                 {service.price ? `${service.price.toLocaleString('vi-VN')} VNĐ` : 'Liên hệ'}
               </div>
             </div>
           </CardContent>
           <CardFooter className="p-4 pt-0 flex justify-between">
             <Dialog>
               <DialogTrigger asChild>
                 <Button variant="outline" size="sm" className="text-gray-600">
                   <Info className="h-4 w-4 mr-1" /> Chi tiết
                 </Button>
               </DialogTrigger>
               <ServiceDetail service={service} />
             </Dialog>
             
             <div className="flex space-x-2">
               <Button variant="outline" size="sm" className="text-blue-600">
                 <Pencil className="h-4 w-4" />
               </Button>
            
             </div>
           </CardFooter>
         </Card>
       ))}
     </div>
     
     {/* New Service Dialog */}
     <Dialog open={showNewForm} onOpenChange={setShowNewForm}>
       <DialogContent className="max-w-3xl">
         <DialogHeader>
           <DialogTitle className={`${colors.primary.DEFAULT} font-bold text-xl`}>
             Thêm dịch vụ mới
           </DialogTitle>
           <DialogDescription>
             Nhập thông tin chi tiết để tạo dịch vụ mới
           </DialogDescription>
         </DialogHeader>
         <FormProvider {...methods}>
  <NewServiceForm onSuccess={() => setShowNewForm(false)} />
</FormProvider>
       </DialogContent>
     </Dialog>
     
   
   </div>
 );
};