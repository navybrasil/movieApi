const bcrypt = require("bcryptjs");
const AppError = require("../utils/AppError");
const knex = require("../database/knex");
const { sendResponse } = require("../utils/responseHelper");

class UsersController {
  async create(request, response, next) {
    const { name, email, password } = request.body;

    const userExists = await knex("users").where({ email }).first();
    if (userExists) {
      return sendResponse(response, 400, "This email is already in use.");
    }

    const SALT = await bcrypt.genSalt(Number(process.env.CRYPT_SALT));

    if (!SALT) {
      throw Error("Salt is not defined");
    }

    const hashedPassword = await bcrypt.hash(password, SALT);

    const newUser = await knex("users")
      .insert({
        name,
        email,
        password: hashedPassword,
      })
      .returning("*");

    return sendResponse(response, 201, newUser[0]);
  }

  async update(request, response, next) {
    const { id } = request.params;
    const { name, email, password } = request.body;

    let updatedData = { name, email };
    if (password) {
      updatedData.password = await bcrypt.hash(password, 10);
    }

    const updatedUser = await knex("users")
      .where({ id })
      .update(updatedData)
      .returning("*");

    if (!updatedUser.length) {
      return sendResponse(response, 404, "User not found.");
    }

    return sendResponse(response, 200, updatedUser[0]);
  }
}

module.exports = UsersController;
