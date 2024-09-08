const { Router, response } = require("express");

const usersRouters = Router();

usersRouters.post("/", (request, response) => {
  const { name, email, password } = request.body;

  response.json({ name, email, password });
});

module.exports = usersRouters;
