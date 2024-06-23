import express from "express";
import {deleteUserById, getAllUsers, getUserById, updateUserById} from "../controllers/user.controller.js";

const userRouter = express.Router();

userRouter.get("/all-user", getAllUsers);
userRouter.get("/:id", getUserById);
userRouter.delete("/:id", deleteUserById);
userRouter.put("/:id", updateUserById);

export default userRouter;