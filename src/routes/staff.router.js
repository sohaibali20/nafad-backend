import { Router } from "express";

import { createStaff, getStaff, getStaffByEmail, updateStaff, deleteStaff } from "../controllers/staff.controller.js";

const staffRouter = Router();

staffRouter.route("/create").post(createStaff);

staffRouter.route("/").get(getStaff);

staffRouter.route("/:email").get(getStaffByEmail);

staffRouter.route("/update/:email").put(updateStaff);

staffRouter.route("/delete/:email").delete(deleteStaff);

export default staffRouter;