import {useState, useEffect} from 'react';
import { serviceService } from '@/services/serviceService';
import { Feedback, Service, ServiceDetailType } from '@/types/services';

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

export const useServiceDetail = (id : string) => {
     const [serviceDetail, setServiceDetail] = useState<ServiceDetailType[]>([]);
     const [loading, setLoading] = useState<boolean>(true);
     const [error, setError] = useState<string | null>(null);

     const fetchServices = async () => {
          try {
               const data = await serviceService.getService(id);
               setServiceDetail(data);
          } catch (error) {
               setError("failed to fetch services detail");
          } finally {
               setLoading(false);
          }
     }

     useEffect(() => {
          fetchServices();
     }, []);

     return { serviceDetail, loading, error };
}

export const useFeedback = (id : string) => {
     const [feedbacks, setFeedback] = useState<Feedback[]>([]);
     const [loading, setLoading] = useState<boolean>(true);
     const [error, setError] = useState<string | null>(null);

     const fetchFeedback = async () => {
          try {
               const data = await serviceService.getFeedback(id);
               setFeedback(data.data);

          } catch (error) {
               setError("failed to fetch feedback");
          } finally {
               setLoading(false);
          }
     }

     useEffect(() => {
          fetchFeedback();
     }, [id]);

     return { feedbacks, loading, error };
}