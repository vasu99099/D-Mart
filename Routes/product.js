import express from "express";
import postProduct from "../Controller/product/postProduct.js";
import getProduct from "../Controller/product/getProduct.js";
import updateProduct from "../Controller/product/putProduct.js";
import deleteProduct from "../Controller/product/deleteProduct.js";
import hasAccess from "../Middleware/hasAccess.js";
const route = express.Router();


// unauthenticate routes
route.get("/", getProduct);
route.get("/:productId", getProduct);

// verify user role to access routes
route.use(hasAccess);

// authenticate routes
route.post("/", postProduct);
route.put("/:productId", updateProduct);
route.delete("/:productId", deleteProduct);

export default route;
