import express from "express";
import postCategory from "../Controller/category/category/postCategory.js";
import getCategory, {
  getBreadcampCategory,
} from "../Controller/category/category/getCategory.js";
import getFilteredCategory from "../Controller/category/category/getFilteredCategory.js";
import deleteCategory from "../Controller/category/category/deleteCategory.js";
import updateCategory from "../Controller/category/category/putCategory.js";
import hasAccess from "../Middleware/hasAccess.js";

const route = express.Router();

// unauthenticated routes
route.get("/", getCategory);
route.get("/breadcrumb/:categoryId", getBreadcampCategory);
route.get("/filter", getFilteredCategory);
route.get("/filter/:categoryId", getFilteredCategory);
route.get("/:categoryId", getCategory);

// verify user role to access it
route.use(hasAccess);

// authenticate routes
route.post("/", postCategory);
route.put("/:categoryId", updateCategory);
route.delete("/:categoryId", deleteCategory);

export default route;
