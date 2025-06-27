import { Router } from "express";
import { getUsers, signup, login } from "../controllers/user.controllers.js";
import fileUpload from "../middleware/fileUpload.js";
const userRouter = Router();

userRouter.get("/", getUsers);
userRouter.post("/signup",fileUpload.single('image'), signup);
userRouter.post("/signin", login);

export default userRouter;
