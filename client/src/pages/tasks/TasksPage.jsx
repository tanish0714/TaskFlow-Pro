import { useEffect, useState } from "react";

import DashboardLayout from "../../components/layout/DashboardLayout";

import { getTasksApi,updateTaskStatusApi,deleteTaskApi, } from "../../api/taskApi";

const TasksPage = () => {

  const [tasks, setTasks] = useState([]);
    const [statusFilter, setStatusFilter] =
  useState("");

const [priorityFilter, setPriorityFilter] =
  useState("");

const [search, setSearch] =
  useState("");

 useEffect(() => {

  fetchTasks();

}, [
  statusFilter,
  priorityFilter,
  search,
]);

const fetchTasks = async () => {

  try {

    const data = await getTasksApi({
      status: statusFilter,
      priority: priorityFilter,
      search,
    });

    setTasks(data);

  } catch (error) {

    console.log(error);
  }
};
  const handleStatusChange = async (
  taskId,
  status
) => {

  try {

    await updateTaskStatusApi(
      taskId,
      status
    );

    fetchTasks();

  } catch (error) {

    console.log(error);
  }
};
const handleDelete = async (taskId) => {

  try {

    await deleteTaskApi(taskId);

    fetchTasks();

  } catch (error) {

    console.log(error);
  }
};

  return (
    <DashboardLayout>

      <div>

        <div className="mb-8">

          <h1 className="text-4xl font-bold text-white mb-2">
            Tasks
          </h1>

          <p className="text-slate-400">
            Manage and track all your tasks
          </p>
          <div className="flex flex-col md:flex-row gap-4 mt-6">

  <input
    type="text"
    placeholder="Search tasks..."
    value={search}
    onChange={(e) =>
      setSearch(e.target.value)
    }
    className="bg-slate-900 border border-slate-800 rounded-2xl px-4 py-3 text-white outline-none"
  />

  <select
    value={statusFilter}
    onChange={(e) =>
      setStatusFilter(e.target.value)
    }
    className="bg-slate-900 border border-slate-800 rounded-2xl px-4 py-3 text-white"
  >

    <option value="">
      All Status
    </option>

    <option value="pending">
      Pending
    </option>

    <option value="in-progress">
      In Progress
    </option>

    <option value="completed">
      Completed
    </option>

  </select>

  <select
    value={priorityFilter}
    onChange={(e) =>
      setPriorityFilter(e.target.value)
    }
    className="bg-slate-900 border border-slate-800 rounded-2xl px-4 py-3 text-white"
  >

    <option value="">
      All Priority
    </option>

    <option value="low">
      Low
    </option>

    <option value="medium">
      Medium
    </option>

    <option value="high">
      High
    </option>

  </select>

</div>

        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">

          {tasks.map((task) => (

            <div
              key={task._id}
              className="bg-slate-900 border border-slate-800 rounded-3xl p-6"
            >

              <div className="flex items-center justify-between mb-4">

                <span
                  className={`px-3 py-1 rounded-full text-sm
                  
                  ${
                    task.priority === "high"
                      ? "bg-red-500/20 text-red-400"
                      : task.priority === "medium"
                      ? "bg-yellow-500/20 text-yellow-400"
                      : "bg-green-500/20 text-green-400"
                  }
                  `}
                >
                  {task.priority}
                </span>

                <select
  value={task.status}
  onChange={(e) =>
    handleStatusChange(
      task._id,
      e.target.value
    )
  }
  className="bg-slate-800 text-white text-sm rounded-lg px-2 py-1 border border-slate-700"
>

  <option value="pending">
    Pending
  </option>

  <option value="in-progress">
    In Progress
  </option>

  <option value="completed">
    Completed
  </option>

</select>

              </div>

              <h2 className="text-2xl font-semibold text-white mb-3">
                {task.title}
              </h2>

              <p className="text-slate-400 mb-5 line-clamp-3">
                {task.description}
              </p>

              <div className="flex items-center justify-between">

                <p className="text-slate-500 text-sm">
                  Due:
                  {" "}
                  {task.dueDate
                    ? new Date(task.dueDate).toLocaleDateString()
                    : "N/A"}
                </p>

                <div className="flex gap-3">

  <button
    className="bg-blue-600 hover:bg-blue-700 transition px-4 py-2 rounded-xl text-white text-sm"
  >
    View
  </button>

  <button
    onClick={() =>
      handleDelete(task._id)
    }
    className="bg-red-500 hover:bg-red-600 transition px-4 py-2 rounded-xl text-white text-sm"
  >
    Delete
  </button>

</div>

              </div>

            </div>

          ))}

        </div>

      </div>

    </DashboardLayout>
  );
};

export default TasksPage;