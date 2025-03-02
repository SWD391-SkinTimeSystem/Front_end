import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// <!-- import Layout from './component/Organisms/Layout';
// import ServiceDetail from './component/Pages/ServiceDetail';
// import { ServiceList } from "./component/Pages/ServiceList";
import UserRoutes from "./routes/UserRoutes";
import AdminRoutes from "./routes/AdminRoutes";
import Login from "./component/Auth/Login";
import Register from "./component/Auth/Register";

const App = () => {
  return (
    <>
      <Router>
        <Routes>
        <Route path="/login" element={<Login/>}/>
        <Route path="/register" element={<Register/>}/>
          <Route path="/*" element={<UserRoutes />} />
          <Route path="/admin/*" element={<AdminRoutes />} />
        </Routes>
      </Router>
    </>
  )
}
export default App