import express from "express";
import postCart from "../../Controller/cart/cart.controller.js";
import {getCart,putCart} from "../../Controller/cart/cart.controller.js";

const route = express.Router();

route.post("/", postCart);
route.get("/", getCart);
// route.get("/", getCategory);
// route.get("/filter", getFilteredCategory);
// route.get("/filter/:categoryId", getFilteredCategory);
// route.get("/:categoryId", getCategory);
route.put("/", putCart);
// route.delete("/:categoryId", deleteCategory);

export default route;
