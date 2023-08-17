import express from "express";
import postStore from "../Controller/store/postStore.js";
import getStore from "../Controller/store/getStore.js";
import updateStore from "../Controller/store/putStore.js";
import deleteStore from "../Controller/store/deleteStore.js";
import hasAccess from "../Middleware/hasAccess.js";

const route = express.Router();

// unauthenticate routes
route.get("/", getStore);
route.get("/:storeId", getStore);

// verify user role to access routes
route.use(hasAccess);

// authenticate routes
route.post("/", postStore);
route.put("/:storeId", updateStore);
route.delete("/:storeId", deleteStore);
export default route;
