import "./App.css";
import { Link, Outlet } from "react-router";

function App() {
  return (
    <>
      <nav>
        <Link to={"/"}></Link>
        <Link to={"/surveys/:id"}></Link>
      </nav>
      <Outlet />
    </>
  );
}

export default App;
