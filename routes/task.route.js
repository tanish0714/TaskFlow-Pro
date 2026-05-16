import express from "express";

import SecureRoute from "../middlewares/SecureRoute.js";

import {createTask,getTasks,updateTaskStatus,deleteTask,} from "../controller/task.controller.js";
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
export default router;