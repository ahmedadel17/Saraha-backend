import User from "../DB/models/user.model.js";
import { verifyToken } from "../utils/token.js";

export const isAuthenticated = async (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization) {
    return next(new Error("unauthorized", { cause: 401 }));
  }
  const token = authorization.split(" ")[1];
  let userId = false;
  if (verifyToken(token)) {
    const { id } = verifyToken(token);
    userId = id;
  }
  if (!userId) return next(new Error("unauthorized", { cause: 401 }));
  const user = await User.findById(userId).select("-password").lean();
  req.user = user;
  return next();
};
export const haveToken = async (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization) {
    return next(new Error("unauthorized", { cause: 401 }));
  }
  const token = authorization;
  let userId = false;
  if (verifyToken(token)) {
    const { id } = verifyToken(token);
    userId = id;
  }

  if (!userId) return next(new Error("unauthorized", { cause: 401 }));
  const user = await User.findById(userId).select("-password").lean();
  req.user = user;
  return next();
};
export const allowTo =
  (roles = []) =>
  (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(new Error("forbidden", { cause: 500 }));
    }
    return next();
  };
