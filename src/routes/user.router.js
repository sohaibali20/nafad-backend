import { Router } from "express";
import { createUser, getUsers, getUserByEmail, updateUser, deleteUser } from "../controllers/user.controller.js";
import authenticateToken from "../middlewares/authmiddleware.js";


const userRouter = Router();

userRouter.route("/create").post(createUser);

userRouter.route("/",authenticateToken).get(getUsers);

userRouter.route("/:email",authenticateToken).get(getUserByEmail);

userRouter.route("/update/:email",authenticateToken).put(updateUser);

userRouter.route("/delete/:email",authenticateToken).delete(deleteUser);


export default userRouter;