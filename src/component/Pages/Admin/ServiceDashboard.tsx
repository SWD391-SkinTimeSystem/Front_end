import { ChartData } from '@/component/Molecules/BarChart';
import ExpenseCard from '@/component/Molecules/StatisticsCard';
import { TableData } from '@/component/Molecules/TableCard';
import { DollarSign } from 'lucide-react';
import React from 'react';

const ServiceDashboard: React.FC = () => {
     return (
          <div>
               <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
                    <div className="grid auto-rows-min gap-4 md:grid-cols-5">
                         <div className="aspect-video rounded-xl bg-muted/50">
                              <ExpenseCard title="Tổng doanh thu" amount="1.000.000.000" percentage={12} icon={<DollarSign />} unit='VND' />
                         </div>
                         <div className="aspect-video rounded-xl bg-muted/50" >
                              <ExpenseCard title="Lịch đặt mới trong ngày" amount="100" percentage={12} icon={<DollarSign />} unit='đơn' />
                         </div>
                         <div className="aspect-video rounded-xl bg-muted/50" >
                              <ExpenseCard title="Dịch vụ đã hoàn thành" amount="100" percentage={12} icon={<DollarSign />} unit='Dịch vụ' />
                         </div>
                         <div className="aspect-video rounded-xl bg-muted/50" >
                              <ExpenseCard title="Dịch vụ đã hủy" amount="100" percentage={12} icon={<DollarSign />} unit='Dịch vụ' />
                         </div>
                         <div className="aspect-video rounded-xl bg-muted/50" >
                              <ExpenseCard title="Khách hàng mới" amount="33" percentage={12} icon={<DollarSign />} unit='Người' />
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