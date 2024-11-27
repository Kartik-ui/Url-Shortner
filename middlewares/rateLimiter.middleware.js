import rateLimit from "express-rate-limit";
import { ApiError } from "../utils/apiError.js";

const limiter = rateLimit({
  windowMs: 60 * 1000, // 1 min
  max: 10,
  handler: () => {
    throw new ApiError(429, "Too many requests, please try again later.");
  },
});

export { limiter };
