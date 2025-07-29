import { Outlet } from "react-router-dom";
import Navbar from "./components/Navbar";

function App() {
  return (
    <div>
      <div className="bg-gradient-to-b from-[#1B1B31] via-[#2B1E36] to-[#1B1B31] fixed top-0 left-0 w-full min-h-screen -z-10"></div>

      <div>
        <Navbar/>
        <Outlet></Outlet>
      </div>
    </div>
  );
}

export default App;
