import React from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";

import VerifyEmail from "./components/emailVerify/VerifyEmail";
import VerifyOtp from "./components/emailVerify/VerifyOtp";
import Register from "./components/register/Register";
const router = createBrowserRouter([
  {
    path: "/",
    element: <VerifyEmail />,
  },
  {
    path:"/verifyOtp",
    element:<VerifyOtp/>
  },
  {
    path:"/register",
    element:<Register/>
  },
]);

const App = () => {
  return (
    <div className="app">
      <RouterProvider router={router} />
    </div>
  );
};

export default App;
