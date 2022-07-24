import express from "express";
import UserController from "../controllers/user.controller";
const router = express.Router();
import UserService from "../services/user.service";
import User from "../models/user.model";

const userController = new UserController(new UserService(new User()));

router.post("/", userController.createUser.bind(userController));

export default router;
