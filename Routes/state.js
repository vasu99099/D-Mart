import express from "express";
import postState from "../Controller/state/postState.js";
import getState from "../Controller/state/getState.js";
import deleteState from "../Controller/state/deleteState.js";
import updateState from "../Controller/state/putState.js";
import hasAccess from "../Middleware/hasAccess.js";

const route = express.Router();

// unauthenticate routes
route.get("/", getState);
route.get("/:stateId", getState);

// verify user role to access routes
route.use(hasAccess);


// authenticate routes
route.put("/:stateId", updateState);
route.delete("/:stateId", deleteState);
route.post("/", postState);

export default route;
