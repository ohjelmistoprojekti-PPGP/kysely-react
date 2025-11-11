import "./App.css";
import SurveyList from "./components/SurveyList";
import SurveyDetailPage from "./components/SurveyDetailPage";
import { Routes, Route, Navigate } from "react-router";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/surveys" replace />} />
      <Route path="/surveys" element={<SurveyList />} />
      <Route path="/surveys:id" element={<SurveyDetailPage />} />
    </Routes>
  );
}

export default App;
