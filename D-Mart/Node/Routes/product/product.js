import express from "express";
import postProduct from "../../Controller/Product/postProduct.js";
import getProduct from "../../Controller/Product/getProduct.js";
import updateProduct from "../../Controller/Product/putProduct.js";
import deleteProduct from "../../Controller/Product/deleteProduct.js";
const route = express.Router();

route.post("/", postProduct);
route.get("/", getProduct);
route.get("/:productId", getProduct);
route.put("/:productId", updateProduct);
route.delete("/:productId", deleteProduct);


export default route;
