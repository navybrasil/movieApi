const express = require("express");
const routes = require("./routes");
const notFoundHandler = require("./middlewares/notFoundHandler");
const migrationsRun = require("./database/knex/migrationsRun");
const { sendErrorResponse } = require("./utils/responseHelper");
const AppError = require("./utils/AppError");

require("dotenv").config();

migrationsRun();

const app = express();

app.use(express.json());

app.use(routes);

app.use((error, request, response, next) => {
  if (error instanceof AppError) {
    return sendErrorResponse(response, 400, error.message);
  }

  return sendErrorResponse(response, 500, "Internal Server Error");
});

app.use(notFoundHandler);

const PORT = process.env.PORT;

if (!PORT) {
  throw Error("PORT is not defined");
}

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
