import express from "express";
import postStoreProduct from "../../Controller/storeProduct/postStoreProduct.js";
import getStoreProduct from "../../Controller/storeProduct/getStoreProduct.js";
import deletestoreProduct from "../../Controller/storeProduct/deleteStoreProduct.js";
import updateStoreProduct from "../../Controller/storeProduct/putStoreProduct.js";

const route = express.Router();

route.post("/", postStoreProduct);
route.get("/", getStoreProduct);
route.get("/:storeproductId/:categoryID", getStoreProduct);
route.put("/:storeproductId", updateStoreProduct);
route.delete("/:storeproductId", deletestoreProduct);


export default route;
