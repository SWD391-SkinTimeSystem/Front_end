import {useState, useEffect} from 'react';
import { serviceService } from '@/services/serviceService';
import { Service } from '@/types/services';

export const useService = () => {
     const [services, setServices] = useState<Service[]>([]);
     const [loading, setLoading] = useState<boolean>(true);
     const [error, setError] = useState<string | null>(null);

     const fetchServices = async () => {
          try {
               const data = await serviceService.getListServices();
               setServices(data);
          } catch (error) {
               setError("failed to fetch services");
          } finally {
               setLoading(false);
          }
     }

     useEffect(() => {
          fetchServices();
     }, []);

     return { services, loading, error };

}