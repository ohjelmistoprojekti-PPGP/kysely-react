import "./App.css";
import { Outlet } from "react-router-dom";
import MenuBar from "./components/MenuBar";
import SurveyList from "./components/SurveyList";

function App() {
  return (
    <>
      <MenuBar />
      <main className="p-4">
        <Outlet />
      </main>
    </>
  );
}

export default App;