import ExpenseCard from '@/component/Molecules/StatisticsCard';
import { TableData } from '@/component/Molecules/TableCard';
import { useEventDashboard } from '@/hooks/useDashboard';
import { DollarSign } from 'lucide-react';
import React from 'react';

const EventDashboard: React.FC = () => {
    //  const { revenueData, bookingStatus, overviewData, loading, error } = useDashboard("","");
    const {eventDashboard, eventStatusDashboard, loading, error} = useEventDashboard("","");
          if (loading) return <p>Loading...</p>;
          if (error ) return <p>Error</p>;
     
     return (
          <div>
               <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
                    <div className="grid auto-rows-min gap-4 md:grid-cols-5">
                         <div className="aspect-video rounded-xl bg-muted/50">
                              <ExpenseCard title="Tổng doanh thu" amount={eventDashboard?.total_revenue} percentage={0} icon={<DollarSign />} unit='VND' />
                         </div>
                         <div className="aspect-video rounded-xl bg-muted/50" >
                              <ExpenseCard title="Tổng số vé đã bán trong ngày" amount={eventDashboard?.total_ticket_sold} percentage={12} icon={<DollarSign />} unit='vé' />
                         </div>
                         <div className="aspect-video rounded-xl bg-muted/50" >
                              <ExpenseCard title="Sự kiện đã hoàn thành" amount={eventStatusDashboard?.Completed} percentage={12} icon={<DollarSign />} unit='Sự kiện' />
                         </div>
                         <div className="aspect-video rounded-xl bg-muted/50" >
                              <ExpenseCard title="Sự kiện đã hủy" amount={eventStatusDashboard?.Canceled} percentage={12} icon={<DollarSign />} unit='Sự kiện' />
                         </div>
                         <div className="aspect-video rounded-xl bg-muted/50" >
                              <ExpenseCard title="Sự kiện sắp tới" amount={eventDashboard?.upcoming_event} percentage={12} icon={<DollarSign />} unit='Sự kiện' />
                         </div>

                    </div>
                    {/* <div className="grid auto-rows-min gap-4 md:grid-cols-2">
                         <div className="aspect-video rounded-xl bg-muted/50">
                              <ChartData />
                         </div>
                         <div className="aspect-video rounded-xl grid  gap-4">
                              <TableData />
                         </div>
                    </div> */}

               </div>
          </div>
     );
};

export default EventDashboard;