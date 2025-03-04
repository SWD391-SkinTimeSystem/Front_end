import { Service } from '@/types/services';

interface ListServicesProps {
  services: Service[];
}
// testcommitdane
const ListServices = ({ services = [] }: ListServicesProps) => {
  console.log(services)
  return (
    <div className="grid grid-cols-3 gap-4">
      {services.map((service) => (
        <div key={service.id} className="border p-4 rounded-lg">
          <h2 className="text-xl font-bold">{service.serviceName}</h2>
          <p>{service.description}</p>
        </div>
      ))}
    </div>
  );
};

export default ListServices;
