import DashboardLayout from "../../components/layout/DashboardLayout";

const Dashboard = () => {

  const stats = [
    {
      title: "Total Tasks",
      value: "24",
      color: "from-blue-500 to-cyan-500",
    },
    {
      title: "Completed",
      value: "18",
      color: "from-green-500 to-emerald-500",
    },
    {
      title: "Pending",
      value: "6",
      color: "from-orange-500 to-yellow-500",
    },
  ];

  return (
    <DashboardLayout>

      <div>

        <div className="mb-8">

          <h1 className="text-4xl font-bold text-white mb-2">
            Welcome Back 👋
          </h1>

          <p className="text-slate-400">
            Here's what's happening with your tasks today.
          </p>

        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

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
            Recent Activity
          </h2>

          <div className="space-y-5">

            <div className="flex items-center justify-between bg-slate-800 p-4 rounded-2xl">

              <div>
                <p className="text-white font-medium">
                  New task assigned
                </p>

                <p className="text-slate-400 text-sm">
                  Landing page redesign
                </p>
              </div>

              <span className="text-blue-400 text-sm">
                2 min ago
              </span>

            </div>

            <div className="flex items-center justify-between bg-slate-800 p-4 rounded-2xl">

              <div>
                <p className="text-white font-medium">
                  Task completed
                </p>

                <p className="text-slate-400 text-sm">
                  API integration
                </p>
              </div>

              <span className="text-green-400 text-sm">
                1 hour ago
              </span>

            </div>

          </div>

        </div>

      </div>

    </DashboardLayout>
  );
};

export default Dashboard;