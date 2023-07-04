import express from "express";
import postBrand from "../Controller/Brand/postBrand.js";
import getBrand from "../Controller/Brand/getBrand.js";
import updateBrand from "../Controller/Brand/putBrand.js";
import deleteBrand from "../Controller/Brand/deleteBrand.js";
const route = express.Router();

route.post("/", postBrand);
route.get("/", getBrand);
route.get("/:brandId", getBrand);
route.put("/:brandId", updateBrand);
route.delete("/:brandId", deleteBrand);
export default route;
