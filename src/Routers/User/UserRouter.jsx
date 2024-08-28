import UserAuth from "./UserAuth";
import Transaction from "../../page/User/Transaction/Transaction";
import Home from "../../page/User/Home/Home";
import SignUp from "../../page/Auth/SignUp/SignUp";

import Login from "../../page/Auth/Login/Login";

const UserRouters = () => {
  return [
    {
      path: "/",
      element: <Login />,
    },

    {
      path: "/signup",
      element: <SignUp />,
    },
    {
      path: "/home",
      element: (
        <UserAuth>
          <Home />
        </UserAuth>
      ),
    },
    {
      path: "/transaction",
      element: (
        <UserAuth>
          <Transaction />
        </UserAuth>
      ),
    },
  ];
};

export default UserRouters;
