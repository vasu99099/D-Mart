import { verifyToken } from "../authentication/jwt.Token.js";
import adminUserModel from "../../Model/adminUser.model.js";

// user login based on token
const AuthenticateAdminUser = async (req, res) => {
  const cookieData = verifyToken(req.cookies.user_id);

  if (cookieData != false) {
    const verify = await adminUserModel
      .findById(cookieData.user_id, { Password: 0 })
      .populate("Role");
    if (verify !== null) {
      if (verify.Role._id.toString() !== "647824eee03df92bf37f5bf5") {
        res.status(200).json(verify);
      } else {
        res.status(401).json({ message: "UnAuthorized User" });
      }
    } else {
      res.status(401).json({ message: "Invalid token" });
    }
  } else {
    res.status(401).json({ message: "Invalid token" });
  }
};

export default AuthenticateAdminUser;
