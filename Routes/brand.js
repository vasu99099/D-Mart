import express from "express";
import postBrand from "../Controller/brand/postBrand.js";
import getBrand from "../Controller/brand/getBrand.js";
import updateBrand from "../Controller/brand/putBrand.js";
import deleteBrand from "../Controller/brand/deleteBrand.js";
import hasAccess from "../Middleware/hasAccess.js";

const route = express.Router();

// unauthenticate routes
route.get("/", getBrand);
route.get("/:brandId", getBrand);

// verify user role to access it
route.use(hasAccess);

// authenticated routes
route.post("/", postBrand);
route.put("/:brandId", updateBrand);
route.delete("/:brandId", deleteBrand);
export default route;
