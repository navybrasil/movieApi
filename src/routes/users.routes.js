const { Router, response } = require("express");

const UsersController = require("../controllers/UsersController");

const usersRouters = Router();

const usersController = new UsersController();

usersRouters.post("/", usersController.create);

module.exports = usersRouters;
