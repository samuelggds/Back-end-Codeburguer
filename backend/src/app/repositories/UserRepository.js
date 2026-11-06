import User from "../models/User";

class UserRepository {
  findByEmail(email) {
    return User.findOne({ where: { email } });
  }

  create(data) {
    return User.create(data);
  }

  findById(id) {
    return User.findByPk(id);
  }
}

export default new UserRepository();
