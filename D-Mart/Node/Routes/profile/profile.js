import express from "express";
import registerCustomer from "../../Controller/registraionAndLogin/registrationCustomer.js";
import sendOTP from "../../Controller/registraionAndLogin/sendOTP.js";
import updateuserProfile from "../../Controller/registraionAndLogin/updateProfile.js";
import AuthenticationUser from "../../Controller/registraionAndLogin/AuthenticateUser.js";
const route = express.Router();

route.get("/", AuthenticationUser);
route.post("/OTP", sendOTP);
route.post("/signIn", registerCustomer);
route.put("/signIn/:customerId", updateuserProfile);

export default route;
