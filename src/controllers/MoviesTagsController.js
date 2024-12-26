const knex = require("../database/knex");
const { sendResponse, sendErrorResponse } = require("../utils/responseHelper");

class MovieTagsController {
  async index(request, response) {
    const { user_id } = request.params;

    const tags = await knex("movie_tags").where({ user_id });

    return sendResponse(response, 200, tags);
  }
}

module.exports = MovieTagsController;
