import "reflect-metadata";
import express from "express";
import type { Request, Response, NextFunction } from "express";
import { createConnection } from "typeorm";
import cors from "cors";
import workoutRoutes from "./routes/workouts";
import { errorHandler } from "./middleware/errorHandler";

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Database connection
createConnection()
    .then(() => {
        console.log("Database connected successfully!");

        // Routes
        app.use("/api/workouts", workoutRoutes);

        // Error handling middleware
        app.use(errorHandler);

        // Start server
        const PORT = process.env.PORT || 5050;
        app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`);
        });
    })
    .catch((error) => {
        console.error("Error connecting to the database:", error);
        process.exit(1);
    });
