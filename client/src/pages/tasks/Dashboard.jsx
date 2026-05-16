import { useEffect, useState } from "react";

import DashboardLayout from "../../components/layout/DashboardLayout";

import { getTaskStatsApi } from "../../api/taskApi";

const Dashboard = () => {

  const [statsData, setStatsData] = useState({
    totalTasks: 0,
    completedTasks: 0,
    pendingTasks: 0,
    inProgressTasks: 0,
  });

  useEffect(() => {

    fetchStats();

  }, []);

  const fetchStats = async () => {

    try {

      const data = await getTaskStatsApi();

      setStatsData(data);

    } catch (error) {

      console.log(error);
    }
  };

  const user = JSON.parse(
    localStorage.getItem("user")
  );

  const stats = [
    {
      title: "Total Tasks",
      value: statsData.totalTasks,
      color: "from-blue-500 to-cyan-500",
    },
    {
      title: "Completed",
      value: statsData.completedTasks,
      color: "from-green-500 to-emerald-500",
    },
    {
      title: "Pending",
      value: statsData.pendingTasks,
      color: "from-orange-500 to-yellow-500",
    },
    {
      title: "In Progress",
      value: statsData.inProgressTasks,
      color: "from-purple-500 to-pink-500",
    },
  ];

  return (
    <DashboardLayout>

      <div>

        <div className="mb-8">

          <h1 className="text-4xl font-bold text-white mb-2">
            Welcome Back,
            {" "}
            {user?.fullname || "User"}
            {" "}
            👋
          </h1>

          <p className="text-slate-400">
            Here's what's happening with your tasks today.
          </p>

        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">

          {stats.map((item) => (

            <div
              key={item.title}
              className={`bg-gradient-to-br ${item.color} p-[1px] rounded-3xl`}
            >

              <div className="bg-slate-900 rounded-3xl p-6 h-full">

                <p className="text-slate-400 mb-3">
                  {item.title}
                </p>

                <h2 className="text-5xl font-bold text-white">
                  {item.value}
                </h2>

              </div>

            </div>

          ))}

        </div>

        <div className="mt-10 bg-slate-900 border border-slate-800 rounded-3xl p-8">

          <h2 className="text-2xl font-semibold text-white mb-6">
            Productivity Overview
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

            <div className="bg-slate-800 rounded-2xl p-6">

              <p className="text-slate-400 mb-3">
                Completed Rate
              </p>

              <h2 className="text-4xl font-bold text-green-400">
                {
                  statsData.totalTasks > 0
                    ? Math.round(
                        (
                          statsData.completedTasks /
                          statsData.totalTasks
                        ) * 100
                      )
                    : 0
                }
                %
              </h2>

            </div>

            <div className="bg-slate-800 rounded-2xl p-6">

              <p className="text-slate-400 mb-3">
                Pending Tasks
              </p>

              <h2 className="text-4xl font-bold text-orange-400">
                {statsData.pendingTasks}
              </h2>

            </div>

          </div>

        </div>

      </div>

    </DashboardLayout>
  );
};

export default Dashboard;