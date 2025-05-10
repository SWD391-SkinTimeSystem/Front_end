import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import UserRoutes from "./routes/UserRoutes";
import AdminRoutes from "./routes/AdminRoutes";
import Login from "./component/Auth/Login";
import Register from "./component/Auth/Register";
import Quiz from "./component/Organisms/Question";
import ResultPage from "./component/Organisms/QuizResult";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {DisplayQuestion} from "./features/question";
import StaffRoutes from "./routes/StaffRoutes";
import SkinTherapistRoutes from "./routes/SkinTherapistRoutes";
import AdminSystemRoutes from "./routes/SystemAdminRoutes";
import TestPage from "./component/Pages/Staff/TestPage";
import EventCheckInManager from "./component/Pages/Staff/EventCheckInManager";
import EventManagementUI from "./component/Pages/Staff/EventManagementUI";
import UserManagement from "./component/Pages/Admin/UserManagement";
import ServiceManagementTable from "./component/Pages/Manager/ServiceManagementTable";
import EventManagerUI from "./component/Pages/Manager/EventManagerUI";
import ServiceManagementPage from "./component/Pages/Manager/ServiceManagementPage";
const App = () => {
  return ( 
    <>
          <ToastContainer   position="top-right"
        autoClose={3000} // 3s
        hideProgressBar={false}
        newestOnTop={true}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored" // Chọn theme mặc định: "light", "dark", "colored"
        />

      <Router>
        <Routes>
         
          <Route path="/login" element={<Login />} />
          <Route path="/question" element={<Quiz />} />
          <Route path="/questionSection" element={<DisplayQuestion />} />
          <Route path="/register" element={<Register />} />
          <Route path="/Result" element={<ResultPage />} />
          <Route path="/*" element={<UserRoutes />} />
          <Route path="/manager/*" element={<AdminRoutes />} />
          <Route path="/staff/*" element={<StaffRoutes />} />
          <Route path="/therapist/*" element={<SkinTherapistRoutes />} />
          <Route path="/admin/*" element={<AdminSystemRoutes />} />
          <Route path="/manager/serviceManagement" element={<ServiceManagementPage />} />
          {/* <Route path="/admin/*" element={<AdminRoutes />} /> */}
          {/* Test dữ liệu  */}
          <Route path="/eventCheckIn" element={<EventCheckInManager />} />
          <Route path="/eventManager" element={<EventManagerUI />} />
          <Route path="/staff/eventManager" element={<EventManagementUI />} />
          <Route path="/userManagement" element={<UserManagement />} />
        </Routes>
      </Router>

    </>
  );
};
export default App;
