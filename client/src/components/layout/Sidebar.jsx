import {
  LayoutDashboard,
  SquareKanban,
  PlusSquare,
} from "lucide-react";

import { Link, useLocation } from "react-router-dom";

const Sidebar = () => {

  const location = useLocation();

  const menuItems = [
    {
      name: "Dashboard",
      icon: <LayoutDashboard size={20} />,
      path: "/",
    },
    {
      name: "Tasks",
      icon: <SquareKanban size={20} />,
      path: "/tasks",
    },
    {
      name: "Create Task",
      icon: <PlusSquare size={20} />,
      path: "/tasks/create",
    },
  ];

  return (
    <div className="w-72 bg-[#0f172a]/90 backdrop-blur-xl border-r border-slate-800 min-h-screen p-6">

      <div className="mb-12">

        <h1 className="text-3xl font-bold text-white tracking-wide">
          TaskFlow
        </h1>

        <p className="text-slate-400 text-sm mt-2">
          Manage your workflow
        </p>

      </div>

      <div className="flex flex-col gap-3">

        {menuItems.map((item) => (

          <Link
            key={item.name}
            to={item.path}
            className={`flex items-center gap-3 px-4 py-3 rounded-2xl transition-all duration-300
              
              ${
                location.pathname === item.path
                  ? "bg-blue-600 text-white shadow-lg shadow-blue-600/20"
                  : "text-slate-300 hover:bg-slate-800 hover:text-white"
              }
            `}
          >
            {item.icon}

            <span className="font-medium">
              {item.name}
            </span>

          </Link>

        ))}

      </div>

    </div>
  );
};

export default Sidebar;