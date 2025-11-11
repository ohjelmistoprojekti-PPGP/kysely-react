import "./App.css";
import { Link, Outlet } from "react-router";

function App() {
  return (
    <>
      <nav>
        <Link to={"/"}>Home</Link>
        <Link to={"/surveys/:id"}>Kysely</Link>
      </nav>
      <Outlet />
    </>
  );
}

export default App;
