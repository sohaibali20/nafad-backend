import { Router } from "express";

import { createAttendance, getAttendance, getAttendanceByEmail, updateAttendance, deleteAttendance } from "../controllers/attendance.controller.js";

const attendanceRouter = Router();

attendanceRouter.route("/create").post(createAttendance);

attendanceRouter.route("/").get(getAttendance);

attendanceRouter.route("/:email").get(getAttendanceByEmail);

attendanceRouter.route("/update/:email").put(updateAttendance);

attendanceRouter.route("/delete/:email").delete(deleteAttendance);

export default attendanceRouter;

