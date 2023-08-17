import express from "express";
import {
  getCategoryChartData,
  getSaleCustomer,
  getStoreProgress,
  getWeekSaleDiffrence,
} from "../Controller/dashboard/dashboard.js";

import hasAccess from "../Middleware/hasAccess.js";

const route = express.Router();

// verify user role to access it
route.use(hasAccess);

// authenticate routes
route.get("/categoryChart", getCategoryChartData);
route.get("/saleCustmer", getSaleCustomer);
route.get("/storeprogress", getStoreProgress);
route.get("/weekDiffrence", getWeekSaleDiffrence);

export default route;
