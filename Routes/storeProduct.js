import express from "express";
import postStoreProduct from "../Controller/storeProduct/postStoreProduct.js";
import getStoreProduct, {
  getSearchedStoreProduct,
} from "../Controller/storeProduct/getStoreProduct.js";
import deletestoreProduct from "../Controller/storeProduct/deleteStoreProduct.js";
import updateStoreProduct from "../Controller/storeProduct/putStoreProduct.js";
import hasAccess from "../Middleware/hasAccess.js";

const route = express.Router();

// unauthenticate routes
route.get("/search/:storeproductId", getSearchedStoreProduct);
route.get("/:storeproductId", getStoreProduct);
route.get("/:storeproductId/:categoryID", getStoreProduct);

// verify user role to access routes
route.use(hasAccess);

// authenticate routes
route.post("/", postStoreProduct);
route.put("/:storeproductId", updateStoreProduct);
route.delete("/:storeproductId", deletestoreProduct);

export default route;
