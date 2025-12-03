import "./App.css";
import { Link, Outlet } from "react-router-dom";
// import MenuBar from "./components/MenuBar";
// import SurveyList from "./components/SurveyList";

function App() {
  return (
    <>
      <nav>
        <Link to={"/"}></Link>
        <Link to={"/surveys/:id"}></Link>
        <Link to={"/surveys/:id/responses"}></Link>
        <Link to={"/questions/:id/responses"}></Link>
      </nav>
      <Outlet />

      {/* <MenuBar />
      <main className="p-4">
        <Outlet />
      </main> */}
    </>
  );
}

export default App;
