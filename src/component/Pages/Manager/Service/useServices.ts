import { useState, useEffect } from 'react';
import { Service, ServiceCategory, SkinTypeOptions } from "../../../../types/services";
import { getServiceApi } from './serviceApi';

export const useServices = () => {
  const [services, setServices] = useState<Service[]>([]);
  const [serviceCategories, setServiceCategories] = useState<ServiceCategory[]>([]);
  const [skinTypes, setSkinTypes] = useState<SkinTypeOptions[]>([]);
  const [popularServices, setPopularServices] = useState<{
    serviceId: string;
    serviceName: string;
    bookingCount: number;
    totalRevenue: number;
  }[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  
  const serviceApi = getServiceApi();

  

  const fetchServices = async (page = 1, pageSize = 12) => {
    try {
      setLoading(true);
      const response = await serviceApi.getAllServices(page, pageSize);
      if (response.success) {
        setServices(response.data.content);
        setError(null);
      } else {
        setError(response.message || 'Không thể tải danh sách dịch vụ');
      }
    } catch (err) {
      setError('Không thể tải danh sách dịch vụ');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };


  const fetchPopularServices = async (limit = 5) => {
    try {
      setLoading(true);
      const response = await serviceApi.getPopularServices(limit);
      if (response.success) {
        setPopularServices(response.data);
        setError(null);
      } else {
        setError(response.message || 'Không thể tải danh sách dịch vụ phổ biến');
      }
    } catch (err) {
      setError('Không thể tải danh sách dịch vụ phổ biến');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };
  const createService = async (serviceBasicData: any, thumbnailFile?: File, imageFiles?: File[]) => {
    try {
      setLoading(true);
      const basicResponse = await serviceApi.createServiceBasic(serviceBasicData);
      
      if (basicResponse.success && thumbnailFile && imageFiles) {
        const imageUploadResponse = await serviceApi.uploadServiceImages(
          basicResponse.data.id, 
          thumbnailFile, 
          imageFiles
        );
        
        return { 
          success: imageUploadResponse.success, 
          data: basicResponse.data,
          message: imageUploadResponse.message 
        };
      }
      
      return { success: basicResponse.success, data: basicResponse.data };
    } catch (err) {
      setError('Không thể tạo dịch vụ mới');
      console.error(err);
      return { success: false, error: 'Không thể tạo dịch vụ mới' };
    } finally {
      setLoading(false);
    }
  };

  const updateService = async (id: string, serviceUpdate: Partial<Service>) => {
    try {
      setLoading(true);
      const response = await serviceApi.updateService(id, serviceUpdate);
      
      if (response.success) {
        setServices(prev => prev.map(service => 
          service.id === id ? response.data : service
        ));
        return { success: true, data: response.data };
      }
      
      return { success: false, error: response.message || 'Không thể cập nhật dịch vụ' };
    } catch (err) {
      setError('Không thể cập nhật dịch vụ');
      console.error(err);
      return { success: false, error: 'Không thể cập nhật dịch vụ' };
    } finally {
      setLoading(false);
    }
  };

  const getServiceDetails = async (id: string) => {
    try {
      setLoading(true);
      const response = await serviceApi.getServiceDetailsById(id);
      return { 
        success: response.success, 
        data: response.data,
        message: response.message 
      };
    } catch (err) {
      setError('Không thể tải chi tiết dịch vụ');
      console.error(err);
      return { success: false, error: 'Không thể tải chi tiết dịch vụ' };
    } finally {
      setLoading(false);
    }
  };

  const fetchServiceCategories = async () => {
    try {
      setLoading(true);
      const response = await serviceApi.getAllServiceCategories();
      
      console.log("Fetched categories:", response); // Log toàn bộ response để kiểm tra
  
      // Xử lý nhiều trường hợp có thể xảy ra
      if (response && Array.isArray(response)) {
        setServiceCategories(response);
      } else if (response && response.data && Array.isArray(response.data)) {
        setServiceCategories(response.data);
      } else {
        console.error("Unexpected categories response format", response);
        setServiceCategories([]); 
      }
  
      setError(null);
    } catch (err) {
      setError("Không thể tải danh sách danh mục");
      setServiceCategories([]); 
      console.error(err);
    } finally {
      setLoading(false);
    }
  };
  

  const fetchSkinTypes = async () => {
    try {
      setLoading(true);
      const response = await serviceApi.getAllSkinTypes();
      
      console.log("Fetched skin types:", response); // Log toàn bộ response
  
      // Xử lý nhiều trường hợp
      if (response && Array.isArray(response)) {
        setSkinTypes(response);
      } else if (response && response.data && Array.isArray(response.data)) {
        setSkinTypes(response.data);
      } else {
        console.error("Unexpected skin types response format", response);
        setSkinTypes([]); 
      }
  
      setError(null);
    } catch (err) {
      setError('Không thể tải danh sách loại da');
      setSkinTypes([]); 
      console.error(err);
    } finally {
      setLoading(false);
    }
  };
  

  useEffect(() => {
    fetchServices();
    fetchServiceCategories();
    fetchSkinTypes();
    fetchPopularServices();

  }, []);

  return {
    services,
    loading,
    error,
    fetchServices,
    createService,
    updateService,
    getServiceDetails,
    serviceCategories,
    fetchServiceCategories,
    fetchSkinTypes,
    skinTypes,
    popularServices,
    fetchPopularServices
  };
};