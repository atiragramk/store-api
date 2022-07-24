import User from "../models/user.model";

class UserService {
  constructor(private user: User = new User()) {}

  createUser(params: Object) {
    const user = new this.user.model(params);
    return user.save();
  }
}

export default UserService;
