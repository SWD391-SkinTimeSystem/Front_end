import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import FeedbackManagement from './FeedbackManagement';
import SingleServiceFeedbackManagement from './SingleServiceFeedback';
import TherapistFeedbackManagement from './TherapistFeedbackManagement';

const FeedbackManagementPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState('feedback');

  return (
    <div className="container mx-auto p-6 bg-white">
      <Tabs
        value={activeTab}
        onValueChange={setActiveTab}
        className="w-full"
      >
        <TabsList className="relative flex w-full rounded-full bg-green-100 p-1 shadow-md">
          <TabsTrigger
            value="feedback"
            className={`relative flex-1 text-center rounded-full px-4 py-2 font-medium transition-all duration-300 
              ${activeTab === 'feedback'
                ? 'bg-[#326e51] text-white shadow-lg'
                : 'text-[#326e51] hover:bg-green-200'}`}
          >
            Quản lý feedback system
          </TabsTrigger>
          
          <TabsTrigger
            value="feedbackthera"
            className={`relative flex-1 text-center rounded-full px-4 py-2 font-medium transition-all duration-300 
              ${activeTab === 'feedbackthera'
                ? 'bg-[#326e51] text-white shadow-lg'
                : 'text-[#326e51] hover:bg-green-200'}`}
          >
            Quản lý feedback therapist
          </TabsTrigger>

          <TabsTrigger
            value="feedbackservice"
            className={`relative flex-1 text-center rounded-full px-4 py-2 font-medium transition-all duration-300 
              ${activeTab === 'feedbackservice'
                ? 'bg-[#326e51] text-white shadow-lg'
                : 'text-[#326e51] hover:bg-green-200'}`}
          >
            Quản lý feedback service
          </TabsTrigger>
        </TabsList>

        <TabsContent value="feedback">
          <FeedbackManagement />
        </TabsContent>

        <TabsContent value="feedbackthera">
          <TherapistFeedbackManagement />

        </TabsContent>

        <TabsContent value="feedbackservice">
          <SingleServiceFeedbackManagement/>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default FeedbackManagementPage;