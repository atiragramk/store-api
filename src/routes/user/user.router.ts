import express from "express";
import userController from "../../controllers/user.controller"
const router = express.Router();

router.post('/', userController.createUser.bind(userController));


export default router;