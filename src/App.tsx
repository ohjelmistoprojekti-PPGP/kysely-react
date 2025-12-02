import "./App.css";
import { Link, Outlet } from "react-router";
import { Menubar } from "./components/ui/menubar";

function App() {
  return (
    <>
      <nav>
        <Link to={"/"}></Link>
        <Link to={"/surveys/:id"}></Link>
        <Link to={"/surveys/:id/responses"}></Link>
      </nav>
      <Menubar />
      <Outlet />
    </>
  );
}

export default App;
