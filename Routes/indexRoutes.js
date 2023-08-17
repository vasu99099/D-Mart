import express from "express";
import registration from "./profile.js";
import role from "./role.js";
import brand from "./brand.js";
import store from "./store.js";
import category from "./category.js";
import product from "./product.js";
import storeProduct from "./storeProduct.js";
import state from "./state.js";
import homepage from "./homepage.js";
import cart from "./cart.js";
import { getDataFromToken } from "../Middleware/getDataFormToken.js";
import address from "./address.route.js";
import pickupPoint from "./pickUpPoint.route.js";
import payment from "./payment.route.js";
import order from "./order.route.js";
import orderItem from "./orderItems.route.js";
import city from "./city.js";
import track from "./track.route.js";
import dashboard from "./dashboard.route.js";
import admin from "./adminUser.route.js";
/**
 * index routes file
 */

const route = express.Router();

//  get data from token like user_id
route.use(getDataFromToken);

route.use("/profile", registration);
route.use("/product", product);
route.use("/storeproduct", storeProduct);
route.use("/store", store);
route.use("/category", category);
route.use("/cart", cart);
route.use("/address", address);
route.use("/pickup", pickupPoint);
route.use("/payment", payment);
route.use("/order", order);
route.use("/orderItem", orderItem);
route.use("/track", track);

route.use("/homepage", homepage);
route.use("/role", role);
route.use("/brand", brand);
route.use("/state", state);
route.use("/city", city);
route.use("/dashboard", dashboard);

// admin

route.use("/admin", admin);
export default route;
