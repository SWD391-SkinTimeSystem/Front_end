import { Service, ServiceCategory, SkinTypeOptions } from '../../../../types/services';

export interface ServiceApiInterface {
  getAllServices: (page?: number, pageSize?: number) => Promise<any>;
  getServiceDetailsById: (id: string) => Promise<any>;
  createServiceBasic: (serviceData: any) => Promise<any>;
  uploadServiceImages: (serviceId: string, thumbnailFile: File, imageFiles: File[]) => Promise<any>;
  updateService: (id: string, service: Partial<Service>) => Promise<any>;
  getAllServiceCategories: () => Promise<ServiceCategory[]>;
  getAllSkinTypes: () => Promise<SkinTypeOptions[]>;

  getPopularServices: (limit?: number) => Promise<{
    success: boolean;
    data: {
      serviceId: string;
      serviceName: string;
      bookingCount: number;
      totalRevenue: number;
    }[];
  }>;
}

export class RealServiceApi implements ServiceApiInterface {
  private baseUrl = 'http://localhost:5062/api';

  async getAllServices(page = 1, pageSize = 12): Promise<any> {
    const response = await fetch(`${this.baseUrl}/service?page=${page}&pageSize=${pageSize}`);
    console.log(response);
    return response.json();
  }

  async getServiceDetailsById(id: string): Promise<any> {
    const response = await fetch(`${this.baseUrl}/service/${id}`);
    return response.json();
  }

  async createServiceBasic(serviceData: {
    serviceName: string;
    description: string;
    price: number;
    serviceCategoryID: string;
    skintypeIds: string[];
    serviceDetails: { 
      name: string;
      description: string;
      step: number;
      duration: number;
      dateToNextStep: number;
    }[];
  }): Promise<any> {
    try {
      const response = await fetch(`${this.baseUrl}/service/basic`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(serviceData), // Truyền trực tiếp không thay đổi
      });
  
      if (!response.ok) {
        const errorData = await response.text();
        console.error('Error response:', errorData);
        throw new Error(errorData || 'Failed to create service');
      }
  
      return await response.json();
    } catch (error) {
      console.error('Create service error:', error);
      throw error;
    }
  }
  async uploadServiceImages(serviceId: string, thumbnailFile: File, imageFiles: File[]): Promise<any> {
    const formData = new FormData();
    
    // Thêm serviceId vào form data
    formData.append('IdService', serviceId);
    
    // Thêm thumbnail
    if (thumbnailFile) {
      formData.append('Thumbnail', thumbnailFile);
    }
    
    // Thêm gallery images
    if (imageFiles && imageFiles.length > 0) {
      imageFiles.forEach((file, index) => {
        formData.append('ServiceImages', file);
      });
    }
  
    try {
      const response = await fetch(`${this.baseUrl}/service/advand`, {
        method: 'POST',
        body: formData,
      });
  
      if (!response.ok) {
        throw new Error('Lỗi upload ảnh');
      }
  
      return await response.json();
    } catch (error) {
      console.error('Upload image error:', error);
      throw error;
    }
  }

  async updateService(id: string, service: Partial<Service>): Promise<any> {
    const response = await fetch(`${this.baseUrl}/service/availibe-edit`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ ...service, id }),
    });
    return response.json();
  }

  async getAllServiceCategories(): Promise<ServiceCategory[]> {
    try {
      const response = await fetch(`${this.baseUrl}/category`);
      
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
  
      const data = await response.json();
      
      console.log("API Response for categories:", data);
    
      // Nhiều cách xử lý có thể xảy ra
      if (Array.isArray(data)) return data;
      if (data && Array.isArray(data.data)) return data.data;
      if (data && data.content && Array.isArray(data.content)) return data.content;
    
      console.error('Unexpected data format:', data);
      return []; 
    } catch (error) {
      console.error('Error fetching service categories:', error);
      return [];
    }
  }
  

  async getAllSkinTypes(): Promise<SkinTypeOptions[]> {
    const response = await fetch(`${this.baseUrl}/skinType`);
    return response.json();
  }
  async getPopularServices(limit = 5): Promise<{
    success: boolean;
    data: {
      serviceId: string;
      serviceName: string;
      bookingCount: number;
      totalRevenue: number;
    }[];
  }> {
    const response = await fetch(`${this.baseUrl}/statistic/popular/service?limit=${limit}`);
    return response.json();
  }
}

export const getServiceApi = (): ServiceApiInterface => {
  return new RealServiceApi();
};