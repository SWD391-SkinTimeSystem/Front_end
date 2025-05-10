import { useService } from "@/hooks/useService";
import ServiceList from "@/component/Pages/ServiceList";

export const DisplayServiceList = () => {
  const { services, loading, error } = useService();
     if (loading) {
     return <h1>Loading...</h1>;
     }
     if (error) {
     return <h1>{error}</h1>;
     }
     return <ServiceList services={services } />;
    // return <ListServices services={services || []} />;

};
