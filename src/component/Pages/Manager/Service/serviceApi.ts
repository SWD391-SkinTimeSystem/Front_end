import { Service, ServiceCategory, SkinTypeOptions } from '../../../types/services';
import {mockServices, mockServiceCategories, mockSkinTypes} from "./services";

export interface ServiceApiInterface {
 getAllServices: () => Promise<Service[]>;
 getServiceById: (id: string) => Promise<Service | undefined>;
 createService: (service: Omit<Service, 'id'>) => Promise<Service>;
 updateService: (id: string, service: Partial<Service>) => Promise<Service | undefined>;
 getAllServiceCategories(): Promise<ServiceCategory[]>;
 createServiceCategory: (category: Omit<ServiceCategory, 'id'>) => Promise<ServiceCategory>;
 updateServiceCategory: (id: string, categoryUpdate: Partial<ServiceCategory>) => Promise<ServiceCategory | undefined>
 getAllSkinTypes(): Promise<SkinTypeOptions[]>;
}


export class MockServiceApi {
  private services: Service[] = [...mockServices];
  private serviceCategories: ServiceCategory[] = [...mockServiceCategories];
  private skinTypes: SkinTypeOptions[] = [...mockSkinTypes];


  // Lấy danh sách dịch vụ
  async getAllServices(): Promise<Service[]> {
    return [...this.services];
  }

  // Lấy chi tiết dịch vụ
  async getServiceById(id: string): Promise<Service | undefined> {
    return this.services.find(service => service.id === id);
  }

  // Thêm dịch vụ mới
  async createService(service: Omit<Service, 'id'>): Promise<Service> {
    const newService = { ...service, id: Date.now().toString() };
    this.services.push(newService);
    return newService;
  }

  // Cập nhật dịch vụ
  async updateService(id: string, serviceUpdate: Partial<Service>): Promise<Service | undefined> {
    const index = this.services.findIndex(service => service.id === id);
    if (index === -1) return undefined;

    this.services[index] = { ...this.services[index], ...serviceUpdate };
    return this.services[index];
  }


  //CRUD cho Service Category
  // Lấy danh sách danh mục dịch vụ
  async getAllServiceCategories(): Promise<ServiceCategory[]> {
    return [...this.serviceCategories];
  }

// Thêm danh mục dịch vụ mới
async createServiceCategory(category: Omit<ServiceCategory, 'id'>): Promise<ServiceCategory> {
  const newCategory = { ...category, id: Date.now().toString() };
  this.serviceCategories.push(newCategory);
  return newCategory;
}

// Cập nhật danh mục dịch vụ
async updateServiceCategory(id: string, categoryUpdate: Partial<ServiceCategory>): Promise<ServiceCategory | undefined> {
  const index = this.serviceCategories.findIndex(category => category.id === id);
  if (index === -1) return undefined;

  this.serviceCategories[index] = { ...this.serviceCategories[index], ...categoryUpdate };
  return this.serviceCategories[index];
}

async getAllSkinTypes(): Promise<SkinTypeOptions[]> {
  return [...this.skinTypes];
}

}
export class RealServiceApi implements ServiceApiInterface {
 async getAllServices(): Promise<Service[]> {
   const response = await fetch('/api/services');
   return response.json();
 }

 async getServiceById(id: string): Promise<Service | undefined> {
   const response = await fetch(`/api/services/${id}`);
   if (!response.ok) return undefined;
   return response.json();
 }

 async createService(service: Omit<Service, 'id'>): Promise<Service> {
   const response = await fetch('/api/services', {
     method: 'POST',
     headers: {
       'Content-Type': 'application/json',
     },
     body: JSON.stringify(service),
   });
   return response.json();
 }

 async updateService(id: string, service: Partial<Service>): Promise<Service | undefined> {
   const response = await fetch(`/api/services/${id}`, {
     method: 'PUT',
     headers: {
       'Content-Type': 'application/json',
     },
     body: JSON.stringify(service),
   });
   if (!response.ok) return undefined;
   return response.json();
 }



 async getAllServiceCategories(): Promise<ServiceCategory[]> {
  const response = await fetch('/api/service-categories');
  return response.json();
}

async createServiceCategory(category: Omit<ServiceCategory, 'id'>): Promise<ServiceCategory> {
  const response = await fetch('/api/service-categories', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(category),
  });
  return response.json();
}

async updateServiceCategory(id: string, categoryUpdate: Partial<ServiceCategory>): Promise<ServiceCategory | undefined> {
  const response = await fetch(`/api/service-categories/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(categoryUpdate),
  });
  if (!response.ok) return undefined;
  return response.json();
}
async getAllSkinTypes(): Promise<SkinTypeOptions[]> {
  const response = await fetch('/api/service-categories');
  return response.json();
}

}

export const getServiceApi = (): ServiceApiInterface => {
 const useRealApi = false; 
 return useRealApi ? new RealServiceApi() : new MockServiceApi();

};