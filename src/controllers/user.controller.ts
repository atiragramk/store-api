import { Request, Response } from "express";
import { BasicController } from "./basic.controller";
import * as yup from "yup";

class UserController extends BasicController {
  userCreateSchema: any;
  constructor(private userService: any = userService) {
    super();
    this.userCreateSchema = yup.object().shape({
      name: yup.string().required(),
      email: yup.string().email().required(),
    });
  }
  async createUser(req: Request, res: Response) {
    try {
      await this.userCreateSchema.validate(req.body);
      const user = await this.userService.createUser(req.body);
      return this.successResponse(res, user);
    } catch (error) {
      return this.errorResponse(res, error);
    }
  }
}

export default UserController;
