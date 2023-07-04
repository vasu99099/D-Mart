import express from "express";
import postCategory from "../Controller/category/category/postCategory.js";
import getCategory from "../Controller/category/category/getCategory.js";
import getFilteredCategory from "../Controller/category/category/getFilteredCategory.js";
import deleteCategory from "../Controller/category/category/deleteCategory.js";
import updateCategory from "../Controller/category/category/putCategory.js";

const route = express.Router();

route.post("/", postCategory);
route.get("/", getCategory);
route.get("/filter", getFilteredCategory);
route.get("/filter/:categoryId", getFilteredCategory);
route.get("/:categoryId", getCategory);
route.put("/:categoryId", updateCategory);
route.delete("/:categoryId", deleteCategory);

export default route;
