import express from "express";
import {
    getWorkouts,
    getWorkout,
    createWorkout,
    deleteWorkout,
    updateWorkout,
} from "../controllers/workoutController";
const router = express.Router();

// Get all workouts
router.get("/", getWorkouts as express.RequestHandler);

// Get single workout
router.get("/:id", getWorkout as express.RequestHandler);

// Create new workout
router.post("/", createWorkout as express.RequestHandler);

// Update Workout
router.put("/:id", updateWorkout as express.RequestHandler);

// Delete Workout
router.delete("/:id", deleteWorkout as express.RequestHandler);

export default router;
