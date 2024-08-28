import Navbar from "../Layout/Navbar";
import home from "../../../assets/save.jpg";
const Home = () => {
  return (
    <div>
      <Navbar />

      <img src={home} alt="" className="w-full h-screen bg-cover" />
    </div>
  );
};

export default Home;
