import { Request, Response } from "express";
import { getRepository } from "typeorm";
import Workout from "../src/entity/workout.entity";
import Exercise from "../src/entity/exercise.entity";

interface ErrorResponse {
    status: number;
    message: string;
}

export const getWorkouts = async (req: Request, res: Response) => {
    try {
        const workoutRepository = getRepository(Workout);
        const workouts = await workoutRepository.find({
            relations: ["exercises"],
        });
        res.status(200).json(workouts);
    } catch (error: unknown) {
        const err = error as Error;
        res.status(500).json({ error: err.message });
    }
};

export const getWorkout = async (req: Request, res: Response) => {
    try {
        const workoutRepository = getRepository(Workout);
        const workout = await workoutRepository.findOne({
            where: { id: parseInt(req.params.id) },
            relations: ["exercises"],
        });

        if (!workout) {
            return res.status(404).json({ error: "Workout not found" });
        }

        res.status(200).json(workout);
    } catch (error: unknown) {
        const err = error as Error;
        res.status(500).json({ error: err.message });
    }
};

export const createWorkout = async (req: Request, res: Response) => {
    try {
        const { date, exercises } = req.body;

        if (!date || !exercises || !Array.isArray(exercises)) {
            return res.status(400).json({ error: "Invalid workout data" });
        }

        const workoutRepository = getRepository(Workout);
        const exerciseRepository = getRepository(Exercise);

        const workout = new Workout();
        workout.date = date;
        workout.exercises = await Promise.all(
            exercises.map(async (ex) => {
                const exercise = new Exercise();
                exercise.exercise = ex.exercise;
                exercise.sets = ex.sets;
                exercise.reps = ex.reps;
                exercise.weight = ex.weight || 0;
                exercise.distance = ex.distance || 0;
                exercise.speed = ex.speed || 0;
                exercise.incline = ex.incline || 0;
                return await exerciseRepository.save(exercise);
            })
        );

        const savedWorkout = await workoutRepository.save(workout);
        res.status(201).json(savedWorkout);
    } catch (error: unknown) {
        const err = error as Error;
        res.status(500).json({ error: err.message });
    }
};

export const updateWorkout = async (req: Request, res: Response) => {
    try {
        const workoutRepository = getRepository(Workout);
        const workout = await workoutRepository.findOne({
            where: { id: parseInt(req.params.id) },
        });

        if (!workout) {
            return res.status(404).json({ error: "Workout not found" });
        }

        workoutRepository.merge(workout, req.body);
        const updatedWorkout = await workoutRepository.save(workout);
        res.status(200).json(updatedWorkout);
    } catch (error: unknown) {
        const err = error as Error;
        res.status(500).json({ error: err.message });
    }
};

export const deleteWorkout = async (req: Request, res: Response) => {
    try {
        const workoutRepository = getRepository(Workout);
        const result = await workoutRepository.delete(parseInt(req.params.id));

        if (result.affected === 0) {
            return res.status(404).json({ error: "Workout not found" });
        }

        res.status(204).send();
    } catch (error: unknown) {
        const err = error as Error;
        res.status(500).json({ error: err.message });
    }
};
