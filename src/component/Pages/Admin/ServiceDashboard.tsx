import { ChartData } from '@/component/Molecules/BarChart';
import ExpenseCard from '@/component/Molecules/StatisticsCard';
import { TableData } from '@/component/Molecules/TableCard';
import { useDashboard } from '@/hooks/useDashboard';
import { DollarSign } from 'lucide-react';
import React from 'react';

const ServiceDashboard: React.FC = () => {
     const { revenueData, bookingStatus, overviewData, loading, error } = useDashboard("","");
     const newestRevenueData = revenueData ? revenueData.at(-1) : null;
          if (loading) return <p>Loading...</p>;
          if (error ) return <p>Error</p>;
     
     return (
          <div>
               <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
                    <div className="grid auto-rows-min gap-4 md:grid-cols-5">
                         <div className="aspect-video rounded-xl bg-muted/50">
                              <ExpenseCard title="Tổng doanh thu" amount={newestRevenueData?.total_revenue} percentage={0} icon={<DollarSign />} unit='VND' />
                         </div>
                         <div className="aspect-video rounded-xl bg-muted/50" >
                              <ExpenseCard title="Tổng đặt trong ngày" amount={overviewData?.total_booking} percentage={12} icon={<DollarSign />} unit='đơn' />
                         </div>
                         <div className="aspect-video rounded-xl bg-muted/50" >
                              <ExpenseCard title="Dịch vụ đã hoàn thành" amount={bookingStatus?.Completed} percentage={12} icon={<DollarSign />} unit='Dịch vụ' />
                         </div>
                         <div className="aspect-video rounded-xl bg-muted/50" >
                              <ExpenseCard title="Dịch vụ đã hủy" amount={bookingStatus?.Canceled} percentage={12} icon={<DollarSign />} unit='Dịch vụ' />
                         </div>
                         <div className="aspect-video rounded-xl bg-muted/50" >
                              <ExpenseCard title="Khách hàng mới" amount={overviewData?.new_customer} percentage={12} icon={<DollarSign />} unit='Người' />
                         </div>

                    </div>
                    <div className="grid auto-rows-min gap-4 md:grid-cols-2">
                         <div className="aspect-video rounded-xl bg-muted/50">
                              <ChartData />
                         </div>
                         <div className="aspect-video rounded-xl grid  gap-4">
                              {/* <ChartData /> */}
                              <TableData />
                              
                         </div>
                    </div>

               </div>
          </div>
     );
};

export default ServiceDashboard;