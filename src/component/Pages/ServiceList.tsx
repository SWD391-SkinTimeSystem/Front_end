import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { CalendarDays, ChevronLeft, ChevronRight, LucideSearch } from "lucide-react";
import ServiceCard from "../Molecules/ServiceCard";
import { Service } from "@/types/services";
import { useNavigate } from "react-router-dom";
import { useEvent } from "@/hooks/useEvent";
import { useState } from "react";

interface ListServicesProps {
     services: Service[];
}

export default function ServiceList({ services = [] }: ListServicesProps) {
     const { events, loading, error } = useEvent(1, 5);
     console.log(events);
     const navigate = useNavigate()
     


     // Pagination state
     const [currentPage, setCurrentPage] = useState(1);
     const servicesPerPage = 9;

     // Calculate pagination
     const indexOfLastService = currentPage * servicesPerPage;
     const indexOfFirstService = indexOfLastService - servicesPerPage;
     const currentServices = services.slice(indexOfFirstService, indexOfLastService);

     // Calculate total pages
     const totalPages = Math.ceil(services.length / servicesPerPage);

     // Pagination handlers
     const nextPage = () => {
          if (currentPage < totalPages) {
               setCurrentPage(currentPage + 1);
          }
     };

     const prevPage = () => {
          if (currentPage > 1) {
               setCurrentPage(currentPage - 1);
          }
     };

     return (
          <>
               <div>
                    <img src="https://media.hcdn.vn/catalog/category/1320x250-2.jpg" alt="service" />
               </div>
               <div className="flex flex-row">

                    <div className="w-[20%]">
                         <div className="p-4 bg-white border w-full">
                              {/* Tiêu đề */}
                              <h2 className="text-sm font-bold text-gray-900"></h2>

                              {/* Danh sách dịch vụ */}
                              <ul className="mt-2 space-y-1 text-gray-700">
                                   <li className="cursor-pointer hover:text-orange-500">Điều Trị Nám Công Nghệ Cao</li>
                                   <li className="cursor-pointer hover:text-orange-500">Điều Trị Tàn Nhang Công Nghệ Cao</li>
                              </ul>

                              {/* Tiêu đề khoảng giá */}
                              <h3 className="mt-4 text-sm font-bold text-gray-900 mb-2">KHOẢNG GIÁ</h3>

                              {/* Input giá */}
                              <div className="relative w-full max-w-md">
                                   <Input type="text" placeholder="Loại da ..." className="pl-5 rounded-2xl bg-white" />
                                   <LucideSearch className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                              </div>
                              {/* Button áp dụng */}
                         </div>
                         <div className="mx-auto p-4 border w-full mt-4">
                              <h2 className="text-lg font-bold text-gray-900 border-b-2 border-orange-500 pb-1">SỰ KIỆN</h2>

                              {/* Danh sách bài viết */}
                              <div className="mt-3 space-y-4">
                                   {
                                        events.map((event) => (
                                             <Card key={event.event_id} className="shadow-none border-none">
                                                  <CardContent className="p-0 relative">
                                                       <img
                                                            src={event.image_url}
                                                            alt={event.title}
                                                            className="rounded-md w-full h-[177.5px] object-cover"
                                                       />
                                                       <div className="absolute top-0 left-0 bg-black bg-opacity-50 text-white p-2 rounded-br-md">
                                                            <CalendarDays className="w-4 h-4" />
                                                            <span className="text-xs">{event.start_date}</span>
                                                       </div>
                                                       <p className="mt-2 text-sm text-gray-700 hover:text-orange-500 cursor-pointer">{event.title}</p>
                                                       <Button
                                                            variant="ghost"
                                                            className="text-xs text-orange-500"
                                                            onClick={() => navigate(`/event-detail/${event.event_id}`)}
                                                       >Xem chi tiết</Button>
                                                  </CardContent>
                                             </Card>
                                        ))
                                   }
                                   {/* <Card key="" className="shadow-none border-none">
                                             <CardContent className="p-0 relative">
                                                  <img
                                                       src=""
                                                       alt=""

                                                       className="rounded-md w-full object-cover"
                                                  />
                                                  <div className="absolute top-0 left-0 bg-black bg-opacity-50 text-white p-2 rounded-br-md">
                                                       <CalendarDays className="w-4 h-4" />
                                                       <span className="text-xs">21/12/2025</span>
                                                  </div>
                                                  <p className="mt-2 text-sm text-gray-700 hover:text-orange-500 cursor-pointer">Mục này hiển thị danh sách sự kiện</p>
                                                  <Button 
                                                       variant="ghost" 
                                                       className="text-xs text-orange-500"
                                                       // onClick={() => navigate(`/service-detail/${service.id}`)}
                                                  >Xem chi tiết</Button>
                                             </CardContent>
                                        </Card> */}
                              </div>
                         </div>

                    </div>

                    {/* <div className="w-[80%] mb-5 pl-5 pt-5">
                         <div className="flex flex-wrap justify-center gap-4">
                              {services.map((service) => (
                                   <ServiceCard key={service.id} services={service} />
                              ))}
                         </div>
                    </div> */}



                    <div className="w-[80%] mb-5 pl-5 pt-5 min-h-[500px] flex flex-col justify-between">
                         <div className={`
                              ${currentServices.length === 1
                                   ? 'flex justify-start'
                                   : 'grid grid-cols-3 gap-4'
                              }`}
                         >
                              {currentServices.map((service) => (
                                   <div
                                        key={service.id}
                                        className={currentServices.length === 1
                                             ? 'w-full max-w-[400px]'
                                             : 'w-full'
                                        }
                                   >
                                        <ServiceCard services={service} />
                                   </div>
                              ))}
                         </div>

                         {/* Pagination Controls */}
                         <div className="flex justify-center items-center mt-6 space-x-4">
                              <Button
                                   variant="outline"
                                   onClick={prevPage}
                                   disabled={currentPage === 1}
                                   className="flex items-center"
                              >
                                   <ChevronLeft className="mr-2" /> Trước
                              </Button>
                              <span className="text-gray-600">
                                   Trang {currentPage} / {totalPages}
                              </span>
                              <Button
                                   variant="outline"
                                   onClick={nextPage}
                                   disabled={currentPage === totalPages}
                                   className="flex items-center"
                              >
                                   Sau <ChevronRight className="ml-2" />
                              </Button>
                         </div>
                    </div>
               </div>
          </>
     );
};
