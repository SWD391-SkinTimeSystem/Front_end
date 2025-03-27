


import { useState, useEffect } from 'react';
import { Service, ServiceCategory, SkinTypeOptions  } from "../../../../types/services";
import { getServiceApi } from './serviceApi';

export const useServices = () => {
  const [services, setServices] = useState<Service[]>([]);
  const [serviceCategories, setServiceCategories] = useState<ServiceCategory[]>([]);
  const [skinTypes, setSkinTypes] = useState<SkinTypeOptions[]>([]);

  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  
  const serviceApi = getServiceApi();


 const fetchServices = async () => {
   try {
     setLoading(true);
     const data = await serviceApi.getAllServices();
     setServices(data);
     setError(null);
   } catch (err) {
     setError('Không thể tải danh sách dịch vụ');
     console.error(err);
   } finally {
     setLoading(false);
   }
 };

 const createService = async (service: Omit<Service, 'id'>) => {
   try {
     setLoading(true);
     const newService = await serviceApi.createService(service);
     setServices(prev => [...prev, newService]);
     return { success: true, data: newService };
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
     const updatedService = await serviceApi.updateService(id, serviceUpdate);
     if (updatedService) {
       setServices(prev => prev.map(service => service.id === id ? updatedService : service));
       return { success: true, data: updatedService };
     }
     return { success: false, error: 'Không tìm thấy dịch vụ' };
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
    const details = await serviceApi.getServiceDetailsById(id);
    return { success: true, data: details };
  } catch (err) {
    setError('Không thể tải chi tiết dịch vụ');
    console.error(err);
    return { success: false, error: 'Không thể tải chi tiết dịch vụ' };
  } finally {
    setLoading(false);
  }
};

// Lấy danh sách danh mục dịch vụ
const fetchServiceCategories = async () => {
  try {
    setLoading(true);
    const categories = await serviceApi.getAllServiceCategories();
    console.log("Fetched categories:", categories); 
    setServiceCategories([...categories]);    console.log("Updated state:", serviceCategories);
    
    setError(null);
  } catch (err) {
    setError('Không thể tải danh sách danh mục');
    console.error(err);
  } finally {
    setLoading(false);
  }
};

// Thêm danh mục mới
const createServiceCategory = async (category: Omit<ServiceCategory, 'id'>) => {
  try {
    setLoading(true);
    const newCategory = await serviceApi.createServiceCategory(category);
    setServiceCategories(prev => [...prev, newCategory]);
    return { success: true, data: newCategory };
  } catch (err) {
    setError('Không thể tạo danh mục mới');
    console.error(err);
    return { success: false, error: 'Không thể tạo danh mục mới' };
  } finally {
    setLoading(false);
  }
};

// Cập nhật danh mục
const updateServiceCategory = async (id: string, categoryUpdate: Partial<ServiceCategory>) => {
  try {
    setLoading(true);
    const updatedCategory = await serviceApi.updateServiceCategory(id, categoryUpdate);
    if (updatedCategory) {
      setServiceCategories(prev => prev.map(c => c.id === id ? updatedCategory : c));
      return { success: true, data: updatedCategory };
    }
    return { success: false, error: 'Không tìm thấy danh mục' };
  } catch (err) {
    setError('Không thể cập nhật danh mục');
    console.error(err);
    return { success: false, error: 'Không thể cập nhật danh mục' };
  } finally {
    setLoading(false);
  }
};

const fetchSkinTypes = async () => {
  try {
    setLoading(true);
    const skinTypes = await serviceApi.getAllSkinTypes();
    console.log("Fetched skinTypes:", skinTypes); 
    setSkinTypes([...skinTypes]);    console.log("Updated state:", skinTypes);
    
    setError(null);
  } catch (err) {
    setError('Không thể tải danh sách loại da');
    console.error(err);
  } finally {
    setLoading(false);
  }
};


 useEffect(() => {
   fetchServices();
   fetchServiceCategories();
   fetchSkinTypes();
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
   createServiceCategory,
   updateServiceCategory,
   fetchSkinTypes,
   skinTypes
    };
};




