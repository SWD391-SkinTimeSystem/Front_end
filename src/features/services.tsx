import { useService, useServiceDetail } from "@/hooks/useService";
import ServiceList from "@/component/Pages/ServiceList";
import ServiceDetail from "@/component/Pages/ServiceDetail";
import { useParams } from "react-router-dom";

export const DisplayServiceList = () => {
  const { services, loading, error } = useService();
     if (loading) {
     return <h1>Loading...</h1>;
     }
     if (error) {
     return <h1>{error}</h1>;
     }
     return <ServiceList services={services} />;
    // return <ListServices services={services || []} />;

};

export const DisplayServiceDetail = () => {
  const { serviceId } = useParams();
  console.log(serviceId)
  const { service, loading, error } = useServiceDetail(serviceId);

  if (loading) return <h1>Loading...</h1>;
  if (error) return <h1>{error}</h1>;


  return <ServiceDetail service={service} />;
};
