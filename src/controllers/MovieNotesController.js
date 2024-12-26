const knex = require("../database/knex");
const AppError = require("../utils/AppError");
const { validateRating } = require("../utils/movieValidations.js");
const { sendResponse, sendErrorResponse } = require("../utils/responseHelper");

class MovieNotesController {
  async create(request, response, next) {
    try {
      const { title, description, tags, rating } = request.body;
      const { user_id } = request.params;

      validateRating(rating);

      const [note_id] = await knex("movie_notes").insert({
        title,
        description,
        rating,
        user_id,
      });

      const movieTagsInsert = tags
        .flatMap((tag) => tag.split(",").map((t) => t.trim()))
        .map((tag) => ({
          note_id,
          user_id,
          name: tag,
        }));

      await knex("movie_tags").insert(movieTagsInsert);

      return sendResponse(response, 201, {
        message: "Movie note created successfully",
      });
    } catch (error) {
      if (error instanceof AppError) {
        return sendErrorResponse(response, error.statusCode, error.message);
      }
      next(error);
    }
  }

  async show(request, response, next) {
    try {
      const { id } = request.params;

      const movieNotes = await knex("movie_notes").where({ id }).first();
      const movieTags = await knex("movie_tags")
        .where({ note_id: id })
        .orderBy("name");

      return sendResponse(response, 200, {
        ...movieNotes,
        movieTags,
      });
    } catch (error) {
      if (error instanceof AppError) {
        return sendErrorResponse(response, 400, error.message);
      }
      next(error);
    }
  }

  async delete(request, response, next) {
    try {
      const { id } = request.params;

      await knex("movie_notes").where({ id }).delete();

      return sendResponse(response, 200, {
        message: "Movie note deleted successfully",
      });
    } catch (error) {
      if (error instanceof AppError) {
        return sendErrorResponse(response, 400, error.message);
      }
      next(error);
    }
  }

  async index(request, response, next) {
    try {
      const { title, user_id, tags } = request.query;

      let notes;

      if (tags) {
        const filterTags = tags.split(",").map((tag) => tag.trim());

        notes = await knex("movie_tags")
          .innerJoin("movie_notes", "movie_notes.id", "movie_tags.note_id")
          .select([
            "movie_notes.id",
            "movie_notes.title",
            "movie_notes.user_id",
            "movie_tags.name",
          ])
          .where("movie_notes.user_id", user_id)
          .whereLike("movie_notes.title", `%${title}%`)
          .whereLike("movie_tags.name", `%${filterTags}%`)
          .orderBy("movie_notes.title");
      } else {
        notes = await knex("movie_notes")
          .select([
            "movie_notes.id",
            "movie_notes.title",
            "movie_notes.user_id",
          ])
          .where({ user_id })
          .whereLike("title", `%${title}%`)
          .orderBy("title");
      }

      const userTags = await knex("movie_tags").where({ user_id });
      const noteWithTags = notes.map((movie_note) => {
        const noteTags = userTags.filter(
          (tag) => tag.note_id === movie_note.id
        );

        return {
          ...movie_note,
          movie_tags: noteTags,
        };
      });

      return sendResponse(response, 200, noteWithTags);
    } catch (error) {
      if (error instanceof AppError) {
        return sendErrorResponse(response, 400, error.message);
      }
      next(error);
    }
  }
}

module.exports = MovieNotesController;
