const { Router } = require("express");
const UsersController = require("../controllers/UsersController");
const { validateUser } = require("../middlewares/validateRequest");
const {
  adminAuthorizationMiddleware,
} = require("../middlewares/authMiddleware");

const usersRoutes = Router();
const usersController = new UsersController();

usersRoutes.post(
  "/",
  adminAuthorizationMiddleware,
  validateUser,
  usersController.create
);

usersRoutes.put("/:id", validateUser, usersController.update);

module.exports = usersRoutes;
