import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// <!-- import Layout from './component/Organisms/Layout';
// import ServiceDetail from './component/Pages/ServiceDetail';
// import { ServiceList } from "./component/Pages/ServiceList";
import UserRoutes from "./routes/UserRoutes";
import AdminRoutes from "./routes/AdminRoutes";
import Login from "./component/Auth/Login";
import Register from "./component/Auth/Register";
import Quiz from "./component/Organisms/Question";
import QuizQuestion from "./component/Organisms/QuestionSection";
import ResultPage from "./component/Organisms/QuizResult";

const App = () => {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/question" element={<Quiz />} />
          <Route path="/questionSection" element={<QuizQuestion />} />
          <Route path="/register" element={<Register />} />
          <Route path="/Result" element={<ResultPage />} />
          <Route path="/*" element={<UserRoutes />} />
          <Route path="/admin/*" element={<AdminRoutes />} />
        </Routes>
      </Router>
    </>
  )
}
export default App