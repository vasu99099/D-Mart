import { verifyToken } from "../Controller/authentication/jwt.Token.js";

export const getDataFromToken = (req, res, next) => {
  /** get token from cookie */
  const token = req.cookies.user_id;

  /* The `verifyToken` function is responsible for verifying the authenticity
 and validity of the token. */
  const valid = verifyToken(token);

  /* The code block `if (valid) { req.body.user_id = valid.user_id; }` is checking if the `valid`
  variable is truthy. If it is, it means that the token has been successfully verified and is valid.
  In that case, it assigns the `user_id` property from the `valid` object to `req.body.user_id`.
  This allows the `user_id` to be accessed and used in subsequent middleware or route handlers. */
  if (valid) {
    req.body.user_id = valid.user_id;
  }
  next();
};
