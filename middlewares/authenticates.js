const jwt = require("jsonwebtoken");

const { User } = require("../middlewares/index");

const { HttpError } = require("../helpers");

// const { JWT_SECRET } = process.env;

function auth(req, res, next) {
  const authHeader = req.headers.authorization || "";

  const [bearer, token] = authHeader.split(" ", 2);

  if (bearer !== "Bearer") {
    return res.status(401).send({ message: "Not authorized" });
  }

  jwt.verify(token, process.env.JWT_SECRET, async (err, decode) => {
    if (err) {
      if (err.name === "TokenExpiredError") {
        return res.status(401).send({ message: "Token is expired" });
      }

      next(HttpError(401));
    }

    try {
      const user = await User.findById(decode.id).exec();

      if (user.token !== token) {
        next(HttpError(401));
      }

      req.user = { id: decode.id, name: decode.name };

      next();
    } catch (err) {
      next(HttpError(401));
    }
  });
}

module.exports = auth;
