import { Bell, Search } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Navbar = () => {

  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <div className="h-20 bg-[#0f172a]/80 backdrop-blur-xl border-b border-slate-800 flex items-center justify-between px-8">

      <div>

        <h1 className="text-2xl font-bold text-white">
          Dashboard
        </h1>

        <p className="text-slate-400 text-sm">
          Welcome back to TaskFlow
        </p>

      </div>

      <div className="flex items-center gap-5">

        <div className="hidden md:flex items-center bg-slate-900 px-4 py-2 rounded-xl border border-slate-800">

          <Search size={18} className="text-slate-400 mr-2" />

          <input
            type="text"
            placeholder="Search..."
            className="bg-transparent outline-none text-white"
          />

        </div>

        <button className="bg-slate-900 p-3 rounded-xl border border-slate-800 text-slate-300 hover:text-white">
          <Bell size={20} />
        </button>

        <button
          onClick={handleLogout}
          className="bg-red-500 hover:bg-red-600 px-5 py-2 rounded-xl text-white font-medium transition"
        >
          Logout
        </button>

      </div>

    </div>
  );
};

export default Navbar;