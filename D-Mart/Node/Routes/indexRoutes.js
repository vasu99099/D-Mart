import express, { application } from "express";
import registration from "./profile/profile.js";
import role from "./Role/role.js";
import brand from "./Brand/brand.js";
import store from "./store/store.js";
import category from "./category/category.js";
import product from "./product/product.js";
import storeProduct from "./product/storeProduct.js";
import state from "./state/state.js";
import homepage from "./Homepage/homepage.js";
import cart from "./cart/cart.js";

const route = express.Router();

route.use("/profile", registration);
route.use("/homepage", homepage);
route.use("/role", role);
route.use("/brand", brand);
route.use("/store", store);
route.use("/category", category);
route.use("/product", product);
route.use("/storeproduct", storeProduct);
route.use("/state", state);
route.use("/cart", cart);
export default route;
