import Task from "../models/task.model.js";

export const createTask = async (req, res) => {

  try {

    const {
      title,
      description,
      priority,
      dueDate,
      assignedTo,
    } = req.body;
    const attachments = req.files
  ? req.files.map(
      (file) => file.path
    )
  : [];
   const newTask = new Task({
  title,
  description,
  priority,
  dueDate,
  attachments,
  createdBy: req.user._id,

  ...(assignedTo && {
    assignedTo,
  }),
});

    await newTask.save();

    res.status(201).json({
      message: "Task created successfully",
      task: newTask,
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      error: "Internal server error",
    });
  }
};
export const getTasks = async (req, res) => {

  try {

    const {
      status,
      priority,
      search,
    } = req.query;

    let filter = {};

    if (status) {
      filter.status = status;
    }

    if (priority) {
      filter.priority = priority;
    }

    if (search) {
      filter.title = {
        $regex: search,
        $options: "i",
      };
    }

    const tasks = await Task.find(filter)
      .populate("assignedTo", "fullname email")
      .populate("createdBy", "fullname email")
      .sort({ createdAt: -1 });

    res.status(200).json(tasks);

  } catch (error) {

    console.log(error);

    res.status(500).json({
      error: "Internal server error",
    });
  }
};
export const updateTaskStatus = async (req, res) => {

  try {

    const { status } = req.body;

    const task = await Task.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );

    res.status(200).json({
      message: "Task status updated",
      task,
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      error: "Internal server error",
    });
  }
};
export const deleteTask = async (req, res) => {

  try {

    await Task.findByIdAndDelete(req.params.id);

    res.status(200).json({
      message: "Task deleted successfully",
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      error: "Internal server error",
    });
  }
};
export const updateTask = async (req, res) => {

  try {

    const {
      title,
      description,
      priority,
      dueDate,
    } = req.body;

    const updatedTask =
      await Task.findByIdAndUpdate(
        req.params.id,
        {
          title,
          description,
          priority,
          dueDate,
        },
        {
          new: true,
        }
      );

    res.status(200).json({
      message: "Task updated successfully",
      task: updatedTask,
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      error: "Internal server error",
    });
  }
};
export const getTaskStats = async (
  req,
  res
) => {

  try {

    const totalTasks =
      await Task.countDocuments();

    const completedTasks =
      await Task.countDocuments({
        status: "completed",
      });

    const pendingTasks =
      await Task.countDocuments({
        status: "pending",
      });

    const inProgressTasks =
      await Task.countDocuments({
        status: "in-progress",
      });

    res.status(200).json({
      totalTasks,
      completedTasks,
      pendingTasks,
      inProgressTasks,
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      error: "Internal server error",
    });
  }
};