import "./App.css";
import { BrowserRouter as Router, Routes, Route, Link, Outlet } from 'react-router-dom';
import { Menubar } from "./components/ui/menubar";
import SurveyList from "./components/SurveyList";

function App() {
  return (
    <>
      <nav>
        <Link to={"/"}></Link>
        <Link to={"/surveys/:id"}></Link>
        <Link to={"/surveys/:id/responses"}></Link>
      </nav>
      <Menubar />
          <Routes>
          <Route path="/" element={<SurveyList />} />
        </Routes>
      <Outlet />
    </>
  );
}

export default App;
