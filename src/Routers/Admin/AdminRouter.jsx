import DashBoard from "../../page/Admin/DashBoard/DashBoard";
import Login from "../../page/Admin/Login";
import UserAuth from "./AdminAuth";


const AdminRoutes = () => {
  return [
    {
      path: "/admin",
      element: <Login />,
    },

 
    {
      path: "/admin/dashBoard",
      element: (
        <UserAuth>
          <DashBoard />
        </UserAuth>
      ),
    },
    // {
    //   path: "/transaction",
    //   element: (
    //     <UserAuth>
    //       <Transaction />
    //     </UserAuth>
    //   ),
    // },
  ];
};

export default AdminRoutes;
