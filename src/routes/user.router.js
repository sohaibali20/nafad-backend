import { Router } from "express";
import { createUser, getUsers, getUserByEmail, updateUser, deleteUser } from "../controllers/user.controller.js";


const userRouter = Router();

userRouter.route("/create").post(createUser);

userRouter.route("/").get(getUsers);

userRouter.route("/:email").get(getUserByEmail);

userRouter.route("/update/:email").put(updateUser);

userRouter.route("/delete/:email").delete(deleteUser);


export default userRouter;