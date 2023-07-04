import express from "express";
import signIn, {
  updateuserProfile,
} from "../Controller/registraionAndLogin/userProfile.js";
import sendOTP from "../Controller/registraionAndLogin/sendOTP.js";
import AuthenticationUser from "../Controller/registraionAndLogin/AuthenticateUser.js";
import TokenVerify from "../Controller/middleware/TokenVerify.js";
const route = express.Router();

route.post("/OTP", sendOTP);
route.post("/signIn", signIn);

route.use(TokenVerify);

route.get("/", AuthenticationUser);
route.put("/user", updateuserProfile);

export default route;
