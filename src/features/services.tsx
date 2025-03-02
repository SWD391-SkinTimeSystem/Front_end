import { useService } from "@/hooks/useService";
import ListServices from "@/component/Pages/ListService";

export const DisplayServiceList = () => {
  const { services, loading, error } = useService();
     if (loading) {
     return <h1>Loading...</h1>;
     }
     if (error) {
     return <h1>{error}</h1>;
     }
     return <ListServices services={services} />;
};