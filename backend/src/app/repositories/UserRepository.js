import User from "../models/User";

class UserRepository {
  findByEmail(email) {
    return User.findOne({ where: { email } });
  }

  create(data) {
    return User.create(data);
  }
}

export default new UserRepository();
