import { RouterProvider, createBrowserRouter } from "react-router-dom";
import UserRouters from "./User/UserRouter";
import AdminRoutes from "./Admin/AdminRouter";

const Routes = () => {
  const userRoutes = UserRouters();
  const adminRoutes = AdminRoutes();
  const router = createBrowserRouter([...userRoutes, ...adminRoutes]);


  return <RouterProvider router={router} />;
};

export default Routes;
