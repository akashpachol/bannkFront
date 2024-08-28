import { useSelector } from "react-redux";

import { useNavigate } from "react-router-dom";

const UserAuth  = ({children}) => {
  const user = useSelector((state) => state.user);
  const navigate = useNavigate();

console.log(user.token,'fudfuiui');

  if(user.token)
    return children
  else
  navigate("/");
};

export default UserAuth;