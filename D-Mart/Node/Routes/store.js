import express from "express";
import postStore from "../Controller/store/postStore.js";
import getStore from "../Controller/store/getStore.js";
import updateStore from "../Controller/store/putStore.js";
import deleteStore from "../Controller/store/deleteStore.js";

const route = express.Router();
route.post("/", postStore);
route.get("/", getStore);
route.get("/:storeId", getStore);
route.put("/:storeId", updateStore);
route.delete("/:storeId", deleteStore);
export default route;
