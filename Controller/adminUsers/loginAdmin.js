import adminUserModel from "../../Model/adminUser.model.js";
import { verifyBcrypt } from "../authentication/bcrypt.js";
import generateToken from "../authentication/jwt.Token.js";

const loginAdmin = async (req, res) => {
  try {
    const user = await adminUserModel
      .findOne({ Email: req.body.Email })
      .populate("Role");
    if (user === null) {
      res.status(400).send({ message: "Invalid Username" });
    } else {
      const verify = await verifyBcrypt(req.body.Password, user.Password);
      if (verify) {
        res.cookie("user_id", generateToken({ user_id: user._id }, "24h"), {
          maxAge: 86400000,
          httpOnly: false,
        });
        res.status(200).json(user);
      } else {
        res.status(404).send({ message: "Invalid Password" });
      }
    }
  } catch (e) {
    res.status(404).send({ message: e.message });
  }
};

export default loginAdmin;
