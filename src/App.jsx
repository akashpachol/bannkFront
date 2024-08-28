
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Routes from "./Routers";

const App= () => (
  <div>
    <Routes />
    <ToastContainer />
  </div>
);

export default App;