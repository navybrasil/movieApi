const knex = require("../database/knex");

class UserService {
  static async createUser({ name, email, password }) {
    const hashedPassword = password;
    return knex("users").insert({
      name,
      email,
      password: hashedPassword,
    });
  }

  static async getUserByEmail(email) {
    return knex("users").where({ email }).first();
  }

  static async getUserById(id) {
    return knex("users").where({ id }).first();
  }

  static async updateUser(id, data) {
    return knex("users").update(data).where({ id });
  }
}

module.exports = UserService;
