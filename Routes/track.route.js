import express from "express";
import hasAccess from "../Middleware/hasAccess.js";
import postTrack, {
  deleteTrack,
  getTrack,
  updateTrack,
} from "../Controller/track/track.js";

const route = express.Router();

// unauthenticate routes
route.get("/", getTrack);
route.get("/:trackId", getTrack);

// verify user role to access routes
route.use(hasAccess);

// authenticate routes
route.post("/", postTrack);
route.put("/:trackId", updateTrack);
route.delete("/:trackId", deleteTrack);

export default route;
