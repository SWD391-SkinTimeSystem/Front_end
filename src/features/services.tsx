import { useService } from "@/hooks/useService";
import ServiceList from "@/component/Pages/ServiceList";
import ServiceListHome from "@/component/Pages/ServiceListHome";


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

export const DisplayServiceListHome = () => {
  const { services, loading, error } = useService();
     if (loading) {
     return <h1>Loading...</h1>;
     }
     if (error) {
     return <h1>{error}</h1>;
     }
     return <ServiceListHome services={services } />;

};
