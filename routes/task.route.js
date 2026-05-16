import express from "express";

import SecureRoute from "../middlewares/SecureRoute.js";

import {createTask,getTasks,updateTaskStatus,deleteTask,updateTask, getTaskStats} from "../controller/task.controller.js";
import upload from "../middlewares/upload.middleware.js";
const router = express.Router();

router.post(
  "/create",
  SecureRoute,
  upload.array("attachments", 3),
  createTask
);
router.get("/", SecureRoute, getTasks);
router.put(
  "/:id/status",
  SecureRoute,
  updateTaskStatus
);
router.delete(
  "/:id",
  SecureRoute,
  deleteTask
);
router.put(
  "/:id",
  SecureRoute,
  updateTask
);
router.get(
  "/stats",
  SecureRoute,
  getTaskStats
);
export default router;