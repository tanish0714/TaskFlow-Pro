import { useState } from "react";

import DashboardLayout from "../../components/layout/DashboardLayout";

import { createTaskApi } from "../../api/taskApi";

const CreateTask = () => {

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    priority: "medium",
    dueDate: "",
    attachments: [],
  });

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

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

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

            <input
              type="file"
              name="attachments"
              multiple
              accept=".pdf"
              onChange={handleChange}
              className="w-full bg-slate-800 border border-slate-700 rounded-2xl px-4 py-3 text-white"
            />

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