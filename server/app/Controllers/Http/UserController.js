"use strict";
const User = use("App/Models/User");
class UserController {
  //##  Login
  async login({ request, auth }) {
    const { email, password } = request.all();
    const token = await auth.attempt(email, password);
    return token;
  }

  async register({ request }) {
    const { email, password } = request.all();
    const user = await User.create({
      email,
      password,
      username: email
    });
    return user;
    return {
      message: email + password
    };
  }
}

module.exports = UserController;
