import express from "express";
import signIn, {
  createProfile,
  deleteUser,
  getUsers,
  updateuserProfile,
} from "../Controller/registraionAndLogin/userProfile.js";
import sendOTP from "../Controller/registraionAndLogin/sendOTP.js";
import AuthenticationUser from "../Controller/registraionAndLogin/AuthenticateUser.js";
import TokenVerify from "../Middleware/tokenVerify.js";
import hasAccess from "../Middleware/hasAccess.js";

const route = express.Router();

// unauthenticate routes
route.post("/OTP", sendOTP);
route.post("/signIn", signIn);

// verify user token
route.use(TokenVerify);

// verified user routes
route.get("/", AuthenticationUser);
route.put("/user", updateuserProfile);

// verify user role to access routes
route.use(hasAccess);

// authenticate routes
route.post("/createUser", createProfile);
route.get("/getusers", getUsers);
route.get("/getusers/:userId", getUsers);
route.delete("/user/:userId", deleteUser);

export default route;
