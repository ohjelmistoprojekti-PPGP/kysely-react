import "./App.css";
import { Link, Outlet } from "react-router";

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
    </>
  );
}

export default App;
