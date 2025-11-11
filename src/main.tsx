import "./index.css";
import App from "./App.tsx";
import { BrowserRouter } from "react-router";
import ReactDOM from "react-dom/client";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);
