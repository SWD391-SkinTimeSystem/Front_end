import React, { lazy, Suspense } from "react";
import { Navigate, Route, Routes } from "react-router-dom";

const ServiceDashboard = lazy(() => import("@/component/Pages/Admin/ServiceDashboard"));
import Page from '@/component/Templates/Admin/page';
import CalendarApp from "@/component/Pages/Staff/Calendar";
import QuizManagement from "@/component/Question/QuizManagement";

const isStaff = true;
const StaffRoutes: React.FC = () => {
    //  return isStaff ? (
    //       <Page role = "staff">
    //       <Suspense fallback={<h1>Đang tải...</h1>}>
    //         <Routes>
    //           <Route path="so-lieu/dich-vu" element={<ServiceDashboard />} />
    //           <Route path="calendar" element={<CalendarApp />} />
    //           {/* <Route path="users" element={<AdminUsers />} /> */}
    //           {/* <Route path="*" element={<Navigate to="/admin/so-lieu/dich-vu" replace />} /> */}
    //         </Routes>
    //       </Suspense>
    //     </Page>
    //  ):(
    //       <Navigate to="/login" />
    //  )

    // Không đăng nhập được nên dùng cách này để test trc ui, có gì cứ mở comment cái trên ra xong thêm cái path quiz-management vô rồi xóa cái phần return này đi nha
    return (
      <Routes>
        <Route path="quiz-management" element={<QuizManagement />} />
      </Routes>
    )
};

export default StaffRoutes;