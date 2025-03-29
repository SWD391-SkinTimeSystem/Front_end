import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ServiceManagementTable from './ServiceManagementTable';
// import FeedbackManagement from './FeedbackManagement';
import FeedbackManagement from './Feedback/FeedbackManagement';
const ServiceManagementPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState('services');

  return (
    <div className="container mx-auto p-6 bg-white">
      <Tabs
        value={activeTab}
        onValueChange={setActiveTab}
        className="w-full"
      >
        <TabsList className="relative flex w-full rounded-full bg-green-100 p-1 shadow-md">
          <TabsTrigger
            value="services"
            className={`relative flex-1 text-center rounded-full px-4 py-2 font-medium transition-all duration-300 
      ${activeTab === 'services'
                ? 'bg-[#326e51] text-white shadow-lg'
                : 'text-[#326e51] hover:bg-green-200'}`}
          >
            Quản lý dịch vụ
          </TabsTrigger>

          <TabsTrigger
            value="feedback"
            className={`relative flex-1 text-center rounded-full px-4 py-2 font-medium transition-all duration-300 
      ${activeTab === 'feedback'
                ? 'bg-[#326e51] text-white shadow-lg'
                : 'text-[#326e51] hover:bg-green-200'}`}
          >
            Quản lý feedback
          </TabsTrigger>

         
        </TabsList>


        <TabsContent value="services">
          <ServiceManagementTable />
        </TabsContent>

        <TabsContent value="feedback">
          <FeedbackManagement />
        </TabsContent>

       
      </Tabs>
    </div>
  );
};

export default ServiceManagementPage;