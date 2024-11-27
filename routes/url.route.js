import express from "express";
import {
  shortenUrl,
  redirectToUrl,
  getUrlStats,
} from "../controllers/url.controller.js";
import { validateUrl } from "../middlewares/validate.middleware.js";

const router = express.Router();

router.post("/shorten", validateUrl, shortenUrl);
router.get("/:shortId", redirectToUrl);
router.get("/stats/:shortId", getUrlStats);

export default router;
