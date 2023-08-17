import express from "express";
import loginAdmin from "../Controller/adminUsers/loginAdmin.js";
import AuthenticateAdminUser from "../Controller/adminUsers/authenticateAdminUser.controller.js";

const route = express.Router();

// unverified routes
route.post("/login", loginAdmin);
route.get("/authenticate", AuthenticateAdminUser);



export default route;
