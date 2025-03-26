import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// <!-- import Layout from './component/Organisms/Layout';
// import ServiceDetail from './component/Pages/ServiceDetail';
// import ServiceList  from "./component/Pages/ServiceList";
import UserRoutes from "./routes/UserRoutes";
import AdminRoutes from "./routes/AdminRoutes";
import Login from "./component/Auth/Login";
import Register from "./component/Auth/Register";
import Quiz from "./component/Organisms/Question";
import ResultPage from "./component/Organisms/QuizResult";
import {DisplayQuestion} from "./features/question";
import TestPage from "./component/Pages/Staff/TestPage";
import EventCheckInManager from "./component/Pages/Staff/EventCheckInManager";
import { ServiceList } from "./component/Pages/Manager/ServiceList";
import EventManagerUI from "./component/Pages/Manager/EventManagerUI";
const App = () => {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/question" element={<Quiz />} />
          <Route path="/questionSection" element={<DisplayQuestion />} />
          <Route path="/register" element={<Register />} />
          <Route path="/Result" element={<ResultPage />} />
          <Route path="/*" element={<UserRoutes />} />
          <Route path="/admin/*" element={<AdminRoutes />} />
          <Route path="/bookingDetail" element={<TestPage />} />
          <Route path="/eventCheckIn" element={<EventCheckInManager />} />
          <Route path="/serviceManager" element={<ServiceList />} />
          <Route path="/eventManager" element={<EventManagerUI />} />
        </Routes>
      </Router>
    </>
  )
}
export default App