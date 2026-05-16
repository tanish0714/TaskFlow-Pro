import { useState } from "react";
import DashboardLayout from "../../components/layout/DashboardLayout";
import { createTaskApi } from "../../api/taskApi";
import { useEffect } from "react";
import { getUsersApi } from "../../api/userApi";

const CreateTask = () => {

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    priority: "medium",
    dueDate: "",
    attachments: [],
    assignedTo: "",
  });
  const [users, setUsers] = useState([]);
  useEffect(() => {

  fetchUsers();

}, []);

  const handleChange = (e) => {

    if (e.target.name === "attachments") {

      setFormData({
        ...formData,
        attachments: e.target.files,
      });

    } else {

      setFormData({
        ...formData,
        [e.target.name]: e.target.value,
      });
    }
  };
  const fetchUsers = async () => {

  try {

    const data = await getUsersApi();

    setUsers(data);

  } catch (error) {

    console.log(error);
  }
};

  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      const taskData = new FormData();

      taskData.append(
        "title",
        formData.title
      );

      taskData.append(
        "description",
        formData.description
      );

      taskData.append(
        "priority",
        formData.priority
      );

      taskData.append(
        "dueDate",
        formData.dueDate
      );
      taskData.append(
  "assignedTo",
  formData.assignedTo
);

      for (
        let i = 0;
        i < formData.attachments.length;
        i++
      ) {

        taskData.append(
          "attachments",
          formData.attachments[i]
        );
      }

      const data = await createTaskApi(
        taskData
      );

      console.log(data);

      alert("Task created successfully");

      setFormData({
        title: "",
        description: "",
        priority: "medium",
        dueDate: "",
        attachments: [],
          assignedTo: "",
      });

    } catch (error) {

      console.log(error);

      alert("Failed to create task");
    }
  };

  return (
    <DashboardLayout>

      <div className="max-w-3xl mx-auto">

        <div className="mb-8">

          <h1 className="text-4xl font-bold text-white mb-2">
            Create Task
          </h1>

          <p className="text-slate-400">
            Add a new task to your workflow
          </p>

        </div>

        <form
          onSubmit={handleSubmit}
          className="bg-slate-900 border border-slate-800 rounded-3xl p-8 space-y-6"
        >

          <div>

            <label className="block text-slate-300 mb-2">
              Task Title
            </label>

            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="Enter task title"
              className="w-full bg-slate-800 border border-slate-700 rounded-2xl px-4 py-3 text-white outline-none focus:border-blue-500"
            />

          </div>

          <div>

            <label className="block text-slate-300 mb-2">
              Description
            </label>

            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows="5"
              placeholder="Enter task description"
              className="w-full bg-slate-800 border border-slate-700 rounded-2xl px-4 py-3 text-white outline-none focus:border-blue-500"
            />

          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

            <div>

              <label className="block text-slate-300 mb-2">
                Priority
              </label>

              <select
                name="priority"
                value={formData.priority}
                onChange={handleChange}
                className="w-full bg-slate-800 border border-slate-700 rounded-2xl px-4 py-3 text-white outline-none focus:border-blue-500"
              >

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
            <div>

  <label className="block text-slate-300 mb-2">
    Assign User
  </label>

  <select
    name="assignedTo"
    value={formData.assignedTo}
    onChange={handleChange}
    className="w-full bg-slate-800 border border-slate-700 rounded-2xl px-4 py-3 text-white outline-none focus:border-blue-500"
  >

    <option value="">
      Select User
    </option>

    {
      users.map((user) => (

        <option
          key={user._id}
          value={user._id}
        >
          {user.fullname}
        </option>
      ))
    }

  </select>

</div>

            <div>

              <label className="block text-slate-300 mb-2">
                Due Date
              </label>
              

              <input
                type="date"
                name="dueDate"
                value={formData.dueDate}
                onChange={handleChange}
                className="w-full bg-slate-800 border border-slate-700 rounded-2xl px-4 py-3 text-white outline-none focus:border-blue-500"
              />

            </div>

          </div>

          <div>

            <label className="block text-slate-300 mb-2">
              Attach PDFs
            </label>

            <div className="bg-slate-800 border border-slate-700 rounded-2xl p-4">

              <label className="flex items-center gap-4 cursor-pointer">

                <div className="bg-blue-600 hover:bg-blue-700 transition px-5 py-2 rounded-xl text-white font-medium">
                  Choose Files
                </div>

                <div className="text-slate-400 text-sm">
                  {
                    formData.attachments.length > 0
                      ? `${formData.attachments.length} file(s) selected`
                      : "No file chosen"
                  }
                </div>

                <input
                  type="file"
                  name="attachments"
                  multiple
                  accept=".pdf"
                  onChange={handleChange}
                  className="hidden"
                />

              </label>

            </div>

          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 transition rounded-2xl py-4 text-white font-semibold"
          >
            Create Task
          </button>

        </form>

      </div>

    </DashboardLayout>
  );
};

export default CreateTask;