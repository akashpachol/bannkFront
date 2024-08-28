import { useSelector } from "react-redux";

import { useNavigate } from "react-router-dom";

const AdminAuth  = ({children}) => {
  const admin = useSelector((state) => state.admin);
  const navigate = useNavigate();


  if(admin.token)
    return children
  else
  navigate("/admin");
};

export default AdminAuth;