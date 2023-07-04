import userModel from "../../Model/user.js";
import jwt from "jsonwebtoken";

const TokenVerify = async (req, res, next) => {
  const privateKey = process.env.SECRET_KEY;
  const algorithm = process.env.ALGORITHM;
  try {
    const token = req.cookies.user_id;
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
      res.status(401).send({ message: "Invalid username" });
    }
  } catch (e) {
    res.status(401).send({ message: "Invalid username" });
  }
};

export default TokenVerify;
