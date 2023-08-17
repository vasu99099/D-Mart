import verifyUser from "../authentication/verifyUser.js";
import registerationCustomerModel from "../../Model/user.js";
import { verifyToken } from "../authentication/jwt.Token.js";

// user login based on token
const AuthenticationUser = async (req, res) => {
  const cookieData = verifyToken(req.cookies.user_id);

  if (cookieData != false) {
    const verify = verifyUser(cookieData.user_id);
    if (verify) {
      const user = await registerationCustomerModel
        .findOne({
          _id: cookieData.user_id,
        })
        .populate({ path: "preferStore", populate: "city" })
        .populate({ path: "Role" });
      if (user && !user.isLogined) {
        res.status(401).json({ message: "unVerified user" });
      } else {
        res.status(200).json(user);
      }
    } else {
      res.status(401).json({ message: "Invalid token" });
    }
  } else {
    res.status(401).json({ message: "Invalid token" });
  }
};

export default AuthenticationUser;
