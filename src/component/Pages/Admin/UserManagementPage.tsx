import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import UserManagement from './UserManagement';
import PendingUserApproval from './PendingUserApproval';

const UserManagementPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState('users');

  return (
    <div className="container mx-auto p-6 bg-white">
      <Tabs
        value={activeTab}
        onValueChange={setActiveTab}
        className="w-full"
      >
        <TabsList className="relative flex w-full rounded-full bg-green-100 p-1 shadow-md">
          <TabsTrigger
            value="users"
            className={`relative flex-1 text-center rounded-full px-4 py-2 font-medium transition-all duration-300 
      ${activeTab === 'users'
                ? 'bg-[#326e51] text-white shadow-lg'
                : 'text-[#326e51] hover:bg-green-200'}`}
          >
            Danh Sách Người Dùng
          </TabsTrigger>

          <TabsTrigger
            value="pending"
            className={`relative flex-1 text-center rounded-full px-4 py-2 font-medium transition-all duration-300 
      ${activeTab === 'pending'
                ? 'bg-[#326e51] text-white shadow-lg'
                : 'text-[#326e51] hover:bg-green-200'}`}
          >
            Người Dùng Chờ Duyệt
          </TabsTrigger>
        </TabsList>


        <TabsContent value="users">
          {/* <UserManagement /> */}
        </TabsContent>

        <TabsContent value="pending">
          <PendingUserApproval />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default UserManagementPage;