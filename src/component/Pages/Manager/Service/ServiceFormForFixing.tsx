import { useEffect, useState, useRef } from 'react';
import { Service, ServiceDetailType,SkinTypeOptions  } from "../../../types/services";
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { 
 FormControl,
 FormDescription,
 FormItem,
 FormLabel,
} from '@/components/ui/form';
import { Plus, Trash2, ArrowRight, Image, X } from 'lucide-react';
import { useCategory } from '@/hooks/useCategory';
import { useServices } from '@/services/useFormServices';

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

type ServiceFormProps = {
 onSuccess: () => void;
 initialData?: Service;
 
};

export const NewServiceForm = ({ onSuccess, initialData }: ServiceFormProps) => {
 const { categories } = useCategory();
  const {
    createService,
    serviceCategories,
    skinTypes
  } = useServices(); useEffect(() => {
    console.log("Service Categories:", categories);
  }, [categories]);
 const [isSubmitting, setIsSubmitting] = useState(false);
 const [error, setError] = useState<string | null>(null);
 const thumbnailFileInputRef = useRef<HTMLInputElement>(null);
 const galleryFileInputRef = useRef<HTMLInputElement>(null);

 const [formData, setFormData] = useState<Service>({
     serviceCategoryID: initialData?.serviceCategoryID ?? '',
     serviceName: initialData?.serviceName ?? '',
     description: initialData?.description ?? '',
     price: initialData?.price ?? 0,
     skintypeIds: initialData?.skintypeIds ?? [],
     serviceDetails: initialData?.serviceDetails ?? [],
   });
   const [serviceDetails, setServiceDetails] = useState<ServiceDetailType[]>(
     initialData?.serviceDetails ?? []
   );
   

 const [thumbnailFile, setThumbnailFile] = useState<File | null>(null);
 const [thumbnailPreview, setThumbnailPreview] = useState<string>(initialData?.thumbnail || '');
 const [galleryFiles, setGalleryFiles] = useState<File[]>([]);
 const [galleryPreviews, setGalleryPreviews] = useState<string[]>(initialData?.serviceImages || []);

 const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
   setFormData({
     ...formData,
     [name]: name === 'price' || name === 'duration' ? 
       Number(value) : value
   });
 };

 const handleThumbnailSelect = () => {
   thumbnailFileInputRef.current?.click();
 };

 const handleGallerySelect = () => {
   galleryFileInputRef.current?.click();
 };

 const handleThumbnailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
   if (e.target.files && e.target.files[0]) {
     const file = e.target.files[0];
     setThumbnailFile(file);
     
     const previewUrl = URL.createObjectURL(file);
     setThumbnailPreview(previewUrl);
     
     setFormData({
       ...formData,
     //   thumbnail: 'local-file' 
     });
   }
 };

 const handleGalleryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
   if (e.target.files && e.target.files.length > 0) {
     const newFiles = Array.from(e.target.files);
     setGalleryFiles([...galleryFiles, ...newFiles]);
     
     const newPreviews = newFiles.map(file => URL.createObjectURL(file));
     setGalleryPreviews([...galleryPreviews, ...newPreviews]);
     
     setFormData({
       ...formData,
     //   serviceImages: [...(formData.serviceImages || []), ...newFiles.map(() => 'local-file')] 
     });
   }
 };

 const removeGalleryImage = (index: number) => {
   // Remove from previews and files arrays
   const updatedPreviews = [...galleryPreviews];
   updatedPreviews.splice(index, 1);
   setGalleryPreviews(updatedPreviews);
   
   // If it's a new file, also remove from files array
   if (index < galleryFiles.length) {
     const updatedFiles = [...galleryFiles];
     updatedFiles.splice(index, 1);
     setGalleryFiles(updatedFiles);
   }
   
   // Update form data
   const updatedImages = [...(formData.serviceImages || [])];
   updatedImages.splice(index, 1);
   setFormData({
     ...formData,
     // serviceImages: updatedImages
   });
 };

 const clearThumbnail = () => {
   setThumbnailFile(null);
   setThumbnailPreview('');
   setFormData({
     ...formData,
     thumbnail: ''
   });
   if (thumbnailFileInputRef.current) {
     thumbnailFileInputRef.current.value = '';
   }
 };
 const addServiceDetail = () => {
     // Xác định bước (step) mới: nếu chưa có bước nào, bắt đầu từ 1, ngược lại tăng thêm 1
     const newStep = serviceDetails.length > 0 
       ? serviceDetails[serviceDetails.length - 1].step + 1 
       : 1;
     
     const newDetail: ServiceDetailType = {
       name: '',
       description: '',
       step: newStep,
       duration: 0,
       dateToNextStep: 0,
     };
   
     // Cập nhật state cho serviceDetails riêng
     setServiceDetails(prev => [...prev, newDetail]);
   
     // Đồng bộ cập nhật trong formData nếu cần
     setFormData(prev => ({
       ...prev,
       serviceDetails: [...prev.serviceDetails, newDetail],
     }));
   };
//  const addServiceDetail = () => {
//    setServiceDetails([
//      ...serviceDetails,
//      {
//        name: '',
//        description: '',
//        step: serviceDetails.length + 1,
//        duration: 15,
//        dateToNextStep: 0
//      }
//    ]);
//  };
const handleDetailChange = (
     index: number,
     field: keyof Omit<ServiceDetailType, 'id'>,
     value: string | number
   ) => {
     setServiceDetails(prevDetails =>
       prevDetails.map((detail, i) =>
         i === index
           ? {
               ...detail,
               [field]:
                 field === 'step' || field === 'duration' || field === 'dateToNextStep'
                   ? Number(value)
                   : value,
             }
           : detail
       )
     );
   };
   
 const handleSkinTypeChange = (skinTypeId: string) => {
     setFormData(prev => {
       const currentSkinTypes = Array.isArray(prev.skintypeIds) ? prev.skintypeIds : [];
   
       return {
         ...prev,
         skintypeIds: currentSkinTypes.includes(skinTypeId)
           ? currentSkinTypes.filter(id => id !== skinTypeId) // Bỏ chọn
           : [...currentSkinTypes, skinTypeId] // Chọn thêm
       };
     });
   };

 const removeServiceDetail = (index: number) => {
   const updatedDetails = [...serviceDetails];
   updatedDetails.splice(index, 1);
   updatedDetails.forEach((detail, idx) => {
     detail.step = idx + 1;
   });
   setServiceDetails(updatedDetails);
 };



 const handleSubmit = async (e: React.FormEvent) => {
   e.preventDefault();
   setIsSubmitting(true);
   setError(null);
   try {
   
     const uploadImage = async (file: File): Promise<string> => {
       console.log(`Uploading file: ${file.name}`);
       return URL.createObjectURL(file); 
     };
     
     let thumbnailUrl = formData.thumbnail;
     if (thumbnailFile) {
       thumbnailUrl = await uploadImage(thumbnailFile);
     }
     
     const imageUrls = await Promise.all(
        (formData.serviceImages || []).map(async (img, i) => {
          if (img === 'local-file' && galleryFiles[i]) {
            return await uploadImage(galleryFiles[i]);
          }
          return img;
        })
      );
     const detailsWithIds = serviceDetails.map((detail, index) => ({
       ...detail,
       id: `temp-${index}` 
     }));

     const serviceData = {
       ...formData,
     //   thumbnail: thumbnailUrl,
     //   images: imageUrls,
       serviceDetails: detailsWithIds
     };
     console.log('Service Data:', JSON.stringify(serviceData));
     // let result;
     // if (initialData?.id) {
     //   result = await updateService(initialData.id, serviceData);
     // } else {
     //   result = await createService(serviceData);
     // }
     
     // if (result.success) {
     //   onSuccess();
     // } else {
     //   setError(result.error || 'Có lỗi xảy ra');
     // }
   } catch (err) {
     setError('Không thể lưu dịch vụ');
     console.error(err);
   } finally {
     setIsSubmitting(false);
   }
 };

 return (
<div className="fixed inset-0 flex items-center justify-center p-6 bg-black/50">
  <div className="bg-white rounded-lg shadow-lg w-full max-w-3xl max-h-[90vh] overflow-y-auto p-6">
    <form onSubmit={handleSubmit} className="space-y-6">     {error && (
       <div className="p-3 bg-red-100 border border-red-400 text-red-700 rounded">
         {error}
       </div>
     )}
     
     <div className="mt-2 grid grid-cols-1 md:grid-cols-2 gap-6">
  <div className="space-y-2">

         <FormItem>
           <FormLabel className="text-gray-700 font-medium">Loại dịch vụ *</FormLabel>
           <FormControl>
             <select
               name="serviceCategoryID"
               value={formData.serviceCategoryID}
               onChange={handleChange}
               required
               className="border border-gray-300 rounded-md p-2 w-full"
             >
               <option value="" disabled>Chọn loại dịch vụ</option>
               {categories.map((category) => (
                 <option key={category.id} value={category.id}>
                   {category.name}
                 </option>
               ))}
             </select>
           </FormControl>
         </FormItem>
          
          <FormItem>
<FormLabel className="text-gray-700 font-medium">Loại da phù hợp</FormLabel>
                        <div className="grid grid-cols-3 gap-2">
    {skinTypes && skinTypes.map((skinType) => (
      <label key={skinType.id} className="flex items-center space-x-2 cursor-pointer">
        <input
          type="checkbox"
          checked={formData.skintypeIds?.includes(skinType.id)} // Đúng key
          onChange={() => handleSkinTypeChange(skinType.id)}
          className="form-checkbox h-4 w-4 text-blue-600 rounded"
        />
        <span className="text-gray-700">
          {skinType.nameSkinType || skinType.name || 'Không xác định'}
        </span>
      </label>
    ))}
  </div>
                      </FormItem>

         <FormItem>
           <FormLabel className="text-gray-700 font-medium">Tên dịch vụ *</FormLabel>
           <FormControl>
             <Input 
               name="serviceName" 
               value={formData.serviceName} 
               onChange={handleChange} 
               required
               placeholder="Nhập tên dịch vụ" 
             />
           </FormControl>
         </FormItem>
         
         <FormItem>
           <FormLabel className="text-gray-700 font-medium">Mô tả</FormLabel>
           <FormControl>
             <Textarea 
               name="description" 
               value={formData.description || ''} 
               onChange={handleChange} 
               placeholder="Mô tả chi tiết về dịch vụ"
               rows={4}
             />
           </FormControl>
         </FormItem>
         
         <div className="grid grid-cols-2 gap-4">
           <FormItem>
             <FormLabel className="text-gray-700 font-medium">Thời gian (phút) *</FormLabel>
             <FormControl>
               <Input 
                 type="number" 
                 name="duration" 
                 value={formData.duration} 
                 onChange={handleChange} 
                 required
                 min={1}
               />
             </FormControl>
           </FormItem>
           
           <FormItem>
             <FormLabel className="text-gray-700 font-medium">Giá dịch vụ (VNĐ)</FormLabel>
             <FormControl>
               <Input 
                 type="number" 
                 name="price" 
                 value={formData.price || ''} 
                 onChange={handleChange} 
                 min={0}
                 step={1000}
               />
             </FormControl>
           </FormItem>
         </div>
         
         {/* Thumbnail Upload Section */}
         <FormItem>
           <FormLabel className="text-gray-700 font-medium">Ảnh đại diện</FormLabel>
           <div className="mt-1 flex flex-col gap-2">
             {thumbnailPreview ? (
               <div className="relative w-full h-40 bg-gray-100 rounded-md overflow-hidden">
                 <img 
                   src={thumbnailPreview} 
                   alt="Thumbnail preview" 
                   className="w-full h-full object-cover"
                 />
                 <Button
                   type="button"
                   variant="ghost"
                   size="sm"
                   className="absolute top-1 right-1 bg-white/80 text-gray-700 rounded-full p-1 hover:bg-white"
                   onClick={clearThumbnail}
                 >
                   <X className="h-4 w-4" />
                 </Button>
               </div>
             ) : (
               <Button
                 type="button"
                 variant="outline"
                 className="h-40 w-full border-dashed flex flex-col items-center justify-center gap-2"
                 onClick={handleThumbnailSelect}
               >
                 <Image className="h-8 w-8 text-gray-400" />
                 <span className="text-sm text-gray-500">Chọn ảnh đại diện</span>
               </Button>
             )}
             <input
               type="file"
               ref={thumbnailFileInputRef}
               onChange={handleThumbnailChange}
               accept="image/*"
               className="hidden"
             />
           </div>
           <FormDescription className="text-xs text-gray-500">
             Chọn thumbnail dịch vụ
           </FormDescription>
         </FormItem>
         
         {/* Gallery Images Upload Section */}
         <FormItem>
           <FormLabel className="text-gray-700 font-medium">Thư viện ảnh</FormLabel>
           <div className="mt-1">
             <div className="grid grid-cols-3 gap-2 mb-2">
               {galleryPreviews.map((preview, index) => (
                 <div key={index} className="relative h-24 bg-gray-100 rounded-md overflow-hidden">
                   <img 
                     src={preview} 
                     alt={`Gallery image ${index + 1}`} 
                     className="w-full h-full object-cover"
                   />
                   <Button
                     type="button"
                     variant="ghost"
                     size="sm"
                     className="absolute top-1 right-1 bg-white/80 text-gray-700 rounded-full p-1 hover:bg-white"
                     onClick={() => removeGalleryImage(index)}
                   >
                     <X className="h-3 w-3" />
                   </Button>
                 </div>
               ))}
               <Button
                 type="button"
                 variant="outline"
                 className="h-24 border-dashed flex flex-col items-center justify-center gap-1"
                 onClick={handleGallerySelect}
               >
                 <Plus className="h-6 w-6 text-gray-400" />
                 <span className="text-xs text-gray-500">Thêm ảnh</span>
               </Button>
             </div>
             <input
               type="file"
               multiple
               ref={galleryFileInputRef}
               onChange={handleGalleryChange}
               accept="image/*"
               className="hidden"
             />
           </div>
           <FormDescription className="text-xs text-gray-500">
             Thêm nhiều ảnh để hiển thị chi tiết dịch vụ
           </FormDescription>
         </FormItem>
       </div>
       
       <div>
         <div className="flex justify-between items-center mb-4">
           <h3 className="font-medium text-gray-700">Các bước thực hiện</h3>
           <Button 
             type="button" 
             variant="outline" 
             size="sm"
             className={`${colors.primary.border.DEFAULT} ${colors.primary.DEFAULT}`}
             onClick={addServiceDetail}
           >
             <Plus className="h-4 w-4 mr-1" /> Thêm bước
           </Button>
         </div>
         
         {serviceDetails.length === 0 ? (
           <div className="text-center p-6 border border-dashed rounded-lg">
             <p className="text-gray-500">Chưa có bước thực hiện</p>
             <Button 
               type="button" 
               variant="outline" 
               className={`${colors.primary.DEFAULT} mt-2`}
               onClick={addServiceDetail}
             >
               <Plus className="h-4 w-4 mr-1" /> Thêm bước đầu tiên
             </Button>
           </div>
         ) : (
           <div className="space-y-6 max-h-96 overflow-y-auto pr-2">
             {serviceDetails.map((detail, index) => (
               <div key={index} className={`p-4 border rounded-lg relative ${index % 2 === 0 ? 'bg-green-50' : 'bg-white'}`}>
                 <Button 
                   type="button" 
                   variant="ghost" 
                   size="sm"
                   className="absolute top-2 right-2 text-red-500 hover:text-red-700 hover:bg-red-50"
                   onClick={() => removeServiceDetail(index)}
                 >
                   <Trash2 className="h-4 w-4" />
                 </Button>
                 
                 <div className="flex items-center mb-2">
                   <div className={`w-6 h-6 rounded-full ${colors.primary.bg.DEFAULT} text-white flex items-center justify-center text-xs mr-2`}>
                     {detail.step}
                   </div>
                   <Input 
                     value={detail.name} 
                     onChange={(e) => handleDetailChange(index, 'name', e.target.value)}
                     placeholder="Tên bước thực hiện"
                     className="border-0 border-b focus-visible:ring-0 px-0"
                   />
                 </div>
                 
                 <div className="mb-2">
                   <Textarea 
                     value={detail.description} 
                     onChange={(e) => handleDetailChange(index, 'description', e.target.value)}
                     placeholder="Mô tả chi tiết bước thực hiện"
                     rows={2}
                     className="text-sm resize-none"
                   />
                 </div>
                 
                 <div className="grid grid-cols-2 gap-2">
                   <div>
                     <Label className="text-xs text-gray-500">Thời gian (phút)</Label>
                     <Input 
                       type="number" 
                       value={detail.duration} 
                       onChange={(e) => handleDetailChange(index, 'duration', e.target.value)}
                       min={1}
                       className="h-8 text-sm"
                     />
                   </div>
                   <div>
                     <Label className="text-xs text-gray-500">Step tiếp theo(ngày)</Label>
                     <Input 
                       type="number" 
                       value={detail.dateToNextStep} 
                       onChange={(e) => handleDetailChange(index, 'dateToNextStep', e.target.value)}
                       min={0}
                       className="h-8 text-sm"
                     />
                   </div>
                 </div>
                  
                  {index < serviceDetails.length - 1 && (
                    <div className="flex justify-center mt-2">
                      <ArrowRight className={`h-5 w-5 ${colors.primary.DEFAULT}`} />
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      
      <div className="flex justify-end space-x-3 pt-4 border-t">
        <Button 
          type="button" 
          variant="outline" 
          onClick={onSuccess}
          disabled={isSubmitting}
        >
          Hủy
        </Button>
        <Button 
          type="submit" 
          className={`${colors.primary.bg.DEFAULT} ${colors.white.DEFAULT}`}
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Đang lưu...' : initialData?.id ? 'Cập nhật' : 'Tạo dịch vụ'}
        </Button>
      </div>
    </form>
    </div>

    </div>
);
};