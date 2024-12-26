const adminAuthorizationMiddleware = (request, response, next) => {
  if (!request.body.isAdmin) {
    return response.status(403).json({ message: "User unauthorized" });
  }
  next();
};

module.exports = { adminAuthorizationMiddleware };
