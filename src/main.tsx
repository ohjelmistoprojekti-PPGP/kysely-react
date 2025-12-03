import "./index.css";
import App from "./App.tsx";
import { createBrowserRouter, RouterProvider } from "react-router";
import ReactDOM from "react-dom/client";
import SurveyList from "./components/SurveyList.tsx";
import SurveyDetailPage from "./components/SurveyDetailPage.tsx";
import SurveyResultsPage from "./components/SurveyResultsPage.tsx";
import React from "react";
import QuestionResultPage from "./components/QuestionResultPage.tsx";

const router = createBrowserRouter([
  // Import components that are used in routes
  {
    path: "/",
    element: <App />,
    children: [
      // children are nested routes with a route
      {
        element: <SurveyList />,
        index: true, // index route does not need any path
      },
      {
        path: "surveys/:id", // path can be defined relative to the parent path
        element: <SurveyDetailPage />,
      },
      {
        path: "surveys/:id/responses",
        element: <SurveyResultsPage />,
      },
      {
        path: "questions/:id/responses",
        element: <QuestionResultPage />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
