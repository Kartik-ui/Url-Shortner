import dotenv from "dotenv";
dotenv.config();

import cors from "cors";
import express from "express";
import { limiter } from "./middlewares/rateLimiter.middleware.js";
import { errorMiddleware } from "./middlewares/error.middleware.js";

const app = express();

app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  }),
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(limiter);

//route imports
import urlRoutes from "./routes/url.route.js";

//routes/
app.use("/", urlRoutes);

app.use(errorMiddleware);

export { app };
