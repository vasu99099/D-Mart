import adminUserModel from "../Model/adminUser.model.js";
import userModel from "../Model/user.js";
import jwt from "jsonwebtoken";

/**
 * The TokenVerify function is used to verify a token and check if the user associated with the token
 * exists in the database.
 */
const TokenVerify = async (req, res, next) => {
  const privateKey = process.env.SECRET_KEY;
  const algorithm = process.env.ALGORITHM;
  try {
    const token = req.cookies.user_id;
    if (token === undefined) {
      throw new Error("Token not found");
    }
    const decode = jwt.verify(token, privateKey, {
      algorithm: algorithm,
    });

    const user = await userModel.findOne({
      _id: decode.user_id,
    });
    if (user !== null) {
      req.body.user_id = user._id;

      next();
    } else {
      const adminUser = await adminUserModel.findOne({
        _id: decode.user_id,
      });
      if (adminUser !== null) {
        req.body.user_id = adminUser._id;
        next();
      } else {
        res.status(401).send({ message: "Invalid token" });
      }
    }
  } catch (e) {
    if (e.message === "Token not found") {
      res.status(401).send({ message: e.message });
    } else {
      res.status(401).send({ message: "Invalid user" });
    }
  }
};

export default TokenVerify;
