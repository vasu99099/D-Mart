import verifyToken from "../Authentication/verifyToken.js";
import verifyUser from "../Authentication/verifyUser.js";
import registerationCustomerModel from "../../Model/registration/registerationCustomer.js";

const AuthenticationUser = async (req, res) => {
  const cookieData = verifyToken(req.cookies.user_id);
  console.log(cookieData);
  if (cookieData != false) {
    const verify = verifyUser(cookieData.user_id);
    if (verify) {
      const user = await registerationCustomerModel.findOne({
        _id: cookieData.user_id,
      },{First_name:1,_id:0});
      res.status(200).json(user);
    } else {
      res.status(401).json({ message: "Invalid token" });
    }
  } else {
    res.status(401).json({ message: "Invalid token" });
  }
};

export default AuthenticationUser;
