import { Router } from "express";
import { registerUser } from "../controllers/user.controller.js";
import { upload } from "../middlewares/multer.middleware.js";

// routes declaration
const userRouter = Router();

userRouter.post(
    "/register",
    upload.none(),
    registerUser
);
// localhost: 8001 / api / v1 / users / register
// userRouter.route("/login").post(loginUser);

export { userRouter };