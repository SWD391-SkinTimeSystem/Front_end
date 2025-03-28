
import React, { useState, useRef, useEffect } from 'react';
import { useServices } from './useServices';
import {
  Service,
  ServiceDetailType,
  ServiceWithImages
} from "../../../../types/services";

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

// Add color definitions
const colors = {
  primary: {
    DEFAULT: 'text-blue-600',
    border: { DEFAULT: 'border-blue-600' },
    bg: { DEFAULT: 'bg-blue-600' }
  }
};

type ServiceFormProps = {
  onSuccess: () => void;
  initialData?: ServiceWithImages;
};

export const NewServiceForm = ({ onSuccess, initialData }: ServiceFormProps) => {
  const {
    createService,
    uploadServiceImages,
    serviceCategories,
    skinTypes
  } = useServices();

  // Refs for file inputs
  const thumbnailFileInputRef = useRef<HTMLInputElement>(null);
  const galleryFileInputRef = useRef<HTMLInputElement>(null);

  // State for form data
  const [formData, setFormData] = useState<{
    serviceInfo: Partial<ServiceWithImages>,
    thumbnailFile: File | null,
    thumbnailPreview: string,
    galleryFiles: File[],
    galleryPreviews: string[],
    price: number;
    duration: number;
  }>({
    serviceInfo: {
      serviceGroupId: initialData?.serviceGroupId || '',
      serviceName: initialData?.serviceName || '',
      description: initialData?.description || '',
      skinTypeOptions: initialData?.skinTypeOptions?.map(st => st.id) || [], 
      serviceDetails: initialData?.serviceDetails || [],
    },
    thumbnailFile: null,
    thumbnailPreview: initialData?.thumbnail || '',
    galleryFiles: [],
    galleryPreviews: initialData?.serviceImages || [],
    price: initialData?.price || 0,
    duration: 0,
  });
  


  // const handleSkinTypeChange = (skinTypeId: string) => {
  //   setFormData(prev => {
  //     const currentSelectedTypes = prev.selectedSkinTypes;
  //     const newSelectedTypes = currentSelectedTypes.includes(skinTypeId)
  //       ? currentSelectedTypes.filter(id => id !== skinTypeId)
  //       : [...currentSelectedTypes, skinTypeId];

  //     return {
  //       ...prev,
  //       selectedSkinTypes: newSelectedTypes
  //     };
  //   });
  // };

  const handleSkinTypeChange = (skinTypeId: string) => {
    setFormData(prev => ({
      ...prev,
      serviceInfo: {
        ...prev.serviceInfo,
        skinTypeOptions: Array.isArray(prev.serviceInfo.skinTypeOptions)
          ? prev.serviceInfo.skinTypeOptions.includes(skinTypeId)
            ? prev.serviceInfo.skinTypeOptions.filter(id => id !== skinTypeId) // Bỏ chọn
            : [...prev.serviceInfo.skinTypeOptions, skinTypeId] // Chọn thêm
          : [skinTypeId] // Nếu undefined, tạo mới mảng chứa 1 ID
      }
    }));
  };
  
  
  


  const [serviceDetails, setServiceDetails] = useState<Omit<ServiceDetailType, 'id'>[]>(
    initialData?.serviceDetails?.map(detail => ({
      name: detail.name,
      description: detail.description,
      step: detail.step,
      duration: detail.duration,
      dateToNextStep: detail.dateToNextStep
    })) || []
  );

  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isValid, setIsValid] = useState(false);


  // Validate form step 1
  const validateStep1 = () => {
    const { serviceInfo, price } = formData;
    const errors: Record<string, string> = {};

    // Kiểm tra serviceInfo
    if (!serviceInfo.serviceGroupId) errors.serviceGroupId = 'Vui lòng chọn loại dịch vụ';
    if (!serviceInfo.serviceName?.trim()) errors.serviceName = 'Tên dịch vụ không được để trống';
    if (!serviceInfo.description?.trim()) errors.description = 'Mô tả dịch vụ không được để trống';
    if (!serviceInfo.skinTypeOptions || serviceInfo.skinTypeOptions.length === 0) {
      errors.skinTypeOptions = 'Vui lòng chọn ít nhất một loại da phù hợp';
    }

    // Kiểm tra serviceDetails
    const details = serviceDetails || [];
    if (details.length === 0) {
      errors.serviceDetails = 'Phải có ít nhất một dịch vụ';
    } else {
      details.forEach((detail, index) => {
        if (!detail.name?.trim()) errors[`serviceDetails_${index}_name`] = `Chi tiết ${index + 1}: Tên không được để trống`;
        if (!detail.description?.trim()) errors[`serviceDetails_${index}_description`] = `Chi tiết ${index + 1}: Mô tả không được để trống`;
        // if (detail.step <= 0) errors[`serviceDetails_${index}_step`] = `Chi tiết ${index + 1}: Bước phải lớn hơn 0`;
        if (detail.duration <= 0) errors[`serviceDetails_${index}_duration`] = `Chi tiết ${index + 1}: Thời gian phải lớn hơn 0`;
        if (detail.dateToNextStep <= 0) errors[`serviceDetails_${index}_dateToNextStep`] = `Chi tiết ${index + 1}: Khoảng cách ngày phải lớn hơn 0`;
      });
    }

    // Kiểm tra giá và thời gian
    if (price <= 0) errors.price = 'Giá phải lớn hơn 0';
    // if (duration <= 0) errors.duration = 'Thời gian phải lớn hơn 0';


    return errors;
  };

  useEffect(() => {
    const errors = validateStep1();
    setIsValid(Object.keys(errors).length === 0);
  }, []);

  // Validate form step 2
  const validateStep2 = () => {
    const errors: Record<string, string> = {};

    if (!formData.thumbnailFile && !formData.thumbnailPreview) {
      errors.thumbnail = 'Vui lòng chọn ảnh đại diện';
    }

    return errors;
  };

  // Handlers
  // const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
  //   const { name, value } = e.target;
  //   setFormData(prev => ({
  //     ...prev,
  //     serviceInfo: {
  //       ...prev.serviceInfo,
  //       [name]: name === 'price' ? Number(value) : value
  //     }
  //   }));
  // };

  // const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
  //   const { name, value } = e.target;

  //   setFormData(prev => ({
  //     ...prev,
  //     [name]: name === 'price' || name === 'duration' ? Number(value) : value,  
  //   }));
  // };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;

    setFormData(prev => ({
      ...prev,
      serviceInfo: {
        ...prev.serviceInfo,
        [name]: value
      },
      [name]: name === 'price' || name === 'duration' ? Number(value) : value,

    }));
  };



  const handleNextStep = () => {
    const errors = validateStep1();

    if (Object.keys(errors).length > 0) {
      setError(Object.values(errors)[0]);
      return;
    }

    setCurrentStep(2);
    setError(null);
  };

  const handleThumbnailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setFormData(prev => ({
        ...prev,
        thumbnailFile: file,
        thumbnailPreview: URL.createObjectURL(file)
      }));
    }
  };

  const handleGalleryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const newFiles = Array.from(e.target.files);
      setFormData(prev => ({
        ...prev,
        galleryFiles: [...prev.galleryFiles, ...newFiles],
        galleryPreviews: [
          ...prev.galleryPreviews,
          ...newFiles.map(file => URL.createObjectURL(file))
        ]
      }));
    }
  };

  const removeGalleryImage = (index: number) => {
    setFormData(prev => {
      const updatedPreviews = [...prev.galleryPreviews];
      updatedPreviews.splice(index, 1);

      const updatedFiles = [...prev.galleryFiles];
      if (index < updatedFiles.length) {
        updatedFiles.splice(index, 1);
      }

      return {
        ...prev,
        galleryPreviews: updatedPreviews,
        galleryFiles: updatedFiles
      };
    });
  };

  const clearThumbnail = () => {
    setFormData(prev => ({
      ...prev,
      thumbnailFile: null,
      thumbnailPreview: ''
    }));
    if (thumbnailFileInputRef.current) {
      thumbnailFileInputRef.current.value = '';
    }
  };

  const addServiceDetail = () => {
    setServiceDetails(prev => [
      ...prev,
      {
        name: '',
        description: '',
        step: prev.length + 1,
        duration: 15,
        dateToNextStep: 0
      }
    ]);
  };

  const removeServiceDetail = (index: number) => {
    setServiceDetails(prev => {
      const updatedDetails = [...prev];
      updatedDetails.splice(index, 1);
      return updatedDetails.map((detail, idx) => ({
        ...detail,
        step: idx + 1
      }));
    });
  };

  const handleDetailChange = (index: number, field: keyof Omit<ServiceDetailType, 'id'>, value: string | number) => {
    setServiceDetails(prev => {
      const updatedDetails = [...prev];
      updatedDetails[index] = {
        ...updatedDetails[index],
        [field]: field === 'step' || field === 'duration' || field === 'dateToNextStep' ?
          Number(value) : value
      };
      return updatedDetails;
    });
  };

  const handleSubmit = async () => {
    const step1Errors = validateStep1();
    const step2Errors = validateStep2();
    const allErrors = { ...step1Errors, ...step2Errors };

    if (Object.keys(allErrors).length > 0) {
      setError(Object.values(allErrors)[0]);
      return;
    }

    setIsSubmitting(true);
    setError(null);

    try {
      // Service creation logic (similar to previous implementation)
      const serviceData = {
        serviceName: formData.serviceInfo.serviceName || '',
        description: formData.serviceInfo.description || '',
        price: formData.price || 0,
        serviceCategoryID: formData.serviceInfo.serviceGroupId || '',
        // skintypeIds: formData.serviceInfo.skinTypeOptions?.map(st => st.id) || [],
        skinTypeOptions: formData.serviceInfo.skinTypeOptions, 
        // skintypeIds: formData.selectedSkinTypes,

        serviceDetails: serviceDetails.map((detail, index) => ({
          name: detail.name,
          description: detail.description || '',
          step: index,
          duration: detail.duration,
          dateToNextStep: index < serviceDetails.length - 1 ? 1 : 0
        }))
      };

      const createResponse = await createService(serviceData);

      if (!createResponse.success) {
        throw new Error(createResponse.error || 'Không thể tạo dịch vụ');
      }

      const serviceId = createResponse.serviceId;

      // Image upload logic
      const imageUploadPromises = [];

      if (formData.thumbnailFile) {
        imageUploadPromises.push(
          uploadServiceImages({
            serviceId,
            thumbnail: formData.thumbnailFile,
            serviceImages: []
          })
        );
      }

      if (formData.galleryFiles.length > 0) {
        imageUploadPromises.push(
          uploadServiceImages({
            serviceId,
            thumbnail: null,
            serviceImages: formData.galleryFiles
          })
        );
      }

      const imageResponses = await Promise.all(imageUploadPromises);

      const hasImageUploadError = imageResponses.some(response => !response.success);
      if (hasImageUploadError) {
        throw new Error('Lỗi upload ảnh');
      }

      onSuccess();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Lỗi không xác định');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      {/* <div className="fixed inset-0 flex items-center justify-center p-6 bg-black/50"> */}
      {/* <div className="bg-white rounded-lg shadow-lg w-full max-w-3xl max-h-[90vh] overflow-y-auto p-6"> */}
      {error && (
        <div className="p-3 bg-red-100 border border-red-400 text-red-700 rounded mb-4">
          {error}
        </div>
      )}
      {currentStep === 1 && (
        <div className="mt-2 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            {/* Chọn loại dịch vụ */}
            <FormItem>
              <FormLabel className="text-gray-700 font-medium">Loại dịch vụ *</FormLabel>
              <FormControl>
                <select
                  name="serviceGroupId"
                  value={formData.serviceInfo.serviceGroupId}
                  onChange={handleChange}
                  required
                  className="border border-gray-300 rounded-md p-2 w-full"
                >
                  <option value="" disabled>Chọn loại dịch vụ</option>
                  {serviceCategories.map((category) => (
                    <option key={category.serviceGroupId} value={category.serviceGroupId}>
                      {category.serviceGroupName}
                    </option>
                  ))}
                </select>
              </FormControl>
            </FormItem>

            {/* Chọn loại da phù hợp */}
            <FormItem>
              <FormLabel className="text-gray-700 font-medium">Loại da phù hợp</FormLabel>
              <div className="grid grid-cols-3 gap-2">
                {skinTypes.map((skinType) => (
                  <label key={skinType.id} className="flex items-center space-x-2 cursor-pointer">
                    <input
                      type="checkbox"
                      // checked={formData.selectedSkinTypes.includes(skinType.id)}
                      checked={(formData.serviceInfo.skinTypeOptions || []).includes(skinType.id)}

                      onChange={() => handleSkinTypeChange(skinType.id)}
                      className="form-checkbox h-4 w-4 text-blue-600 rounded"
                    />
                    <span className="text-gray-700">{skinType.nameSkinType}</span>
                  </label>
                ))}
              </div>
              <FormDescription className="text-xs text-gray-500">
                Chọn các loại da phù hợp với dịch vụ
              </FormDescription>
            </FormItem>

            {/* Nhập tên dịch vụ */}
            <FormItem>
              <FormLabel className="text-gray-700 font-medium">Tên dịch vụ *</FormLabel>
              <FormControl>
                <Input
                  name="serviceName"
                  value={formData.serviceInfo.serviceName}
                  onChange={handleChange}
                  required
                  placeholder="Nhập tên dịch vụ"
                />
              </FormControl>
            </FormItem>

            {/* Nhập mô tả */}
            <FormItem>
              <FormLabel className="text-gray-700 font-medium">Mô tả</FormLabel>
              <FormControl>
                <Textarea
                  name="description"
                  value={formData.serviceInfo.description || ''}
                  onChange={handleChange}
                  placeholder="Mô tả chi tiết về dịch vụ"
                  rows={4}
                />
              </FormControl>
            </FormItem>

            {/* Thời gian & Giá dịch vụ */}
            {/* <div className="grid grid-cols-2 gap-4">
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
              </FormItem> */}

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
          {/* </div> */}

          {/* Các bước thực hiện */}
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
                        <Label className="text-xs text-gray-500">Step tiếp theo (ngày)</Label>
                        <Input
                          type="number"
                          value={detail.dateToNextStep}
                          onChange={(e) => handleDetailChange(index, 'dateToNextStep', e.target.value)}
                          min={0}
                          className="h-8 text-sm"
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
            <div className="flex justify-end space-x-3 pt-4 border-t">
            <Button
              type="button"
              variant="outline"
              onClick={handleNextStep}
            >
              Tiếp theo
            </Button>

          </div>
            {/* <div className="flex justify-end space-x-3 pt-4 border-t">
              <Button
                type="button"
                variant="outline"
                onClick={handleNextStep}
                disabled={!isValid}
                className={!isValid ? "opacity-50 cursor-not-allowed" : ""}
              >
                Tiếp theo
              </Button>
            </div> */}
          </div>



        </div>
      )}


      {currentStep === 2 && (
        <div>
          {/* Form upload ảnh */}
          <div className="space-y-4">
            {/* Thumbnail upload */}
            <FormItem>
              <FormLabel className="text-gray-700 font-medium">Ảnh đại diện</FormLabel>
              <div className="mt-1 flex flex-col gap-2">
                {formData.thumbnailPreview ? (
                  <div className="relative w-full h-40 bg-gray-100 rounded-md overflow-hidden">
                    <img
                      src={formData.thumbnailPreview}
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
                    onClick={() => thumbnailFileInputRef.current?.click()}
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
                  {formData.galleryPreviews.map((preview, index) => (
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
                    onClick={() => galleryFileInputRef.current?.click()}
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

          <div className="flex justify-end space-x-3 pt-4 border-t">
            <Button
              type="button"
              variant="outline"
              onClick={() => setCurrentStep(1)}
            >
              Quay lại
            </Button>
            <Button
              type="button"
              disabled={isSubmitting}
              onClick={handleSubmit}
            >
              {isSubmitting ? 'Đang lưu...' : 'Hoàn tất'}
            </Button>
          </div>
        </div>
      )}


      {/* </div> */}
      {/* </div> */}
    </>
  );
};