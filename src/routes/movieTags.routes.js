const { Router } = require("express");

const MoviesTagsController = require("../controllers/MoviesTagsController");

const movieTagsRoutes = Router();

const moviesTagsController = new MoviesTagsController();

movieTagsRoutes.get("/:user_id", moviesTagsController.index);

module.exports = movieTagsRoutes;
