import { verifyToken } from "../Authentication/jwt.Token.js";

export const getDataFromToken = (req, res, next) => {
  const token = req.cookies.user_id;
  const valid = verifyToken(token);
  if (valid) {
    req.body.user_id = valid.user_id;
  }
  console.log("in middleware");
  next();
};
