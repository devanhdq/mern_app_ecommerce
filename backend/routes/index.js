import express from "express";
import authRoutes from "./auth.route.js";
import userRoutes from "./user.routes.js";

const router = express.Router();

export function routes(app) {

    app.use("/api/auth", authRoutes);

    app.use("/api/user", userRoutes);
}

export default router;