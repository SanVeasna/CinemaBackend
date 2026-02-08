import express from "express";
import { addToWatchlist } from "../controllers/watchlistController.js";

const router = express.Router();

// create route
router.post("/", addToWatchlist);

// update route
router.post("/update", login);

// delete route
router.post("/delete", logout);

export default router;
