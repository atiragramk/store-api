import { Request, Response } from "express";
import UserModel from "../models/user.model";
import { BasicController } from "./basic.controller";

class UserController extends BasicController {

  async createUser(req: Request, res: Response) {
    try {
      const user = new UserModel(req.body);
      await user.save();
      return this.successResponse(res, user);
    } catch (error) {
      return this.errorResponse(res, error);
    }
  }
}

export default new UserController();
