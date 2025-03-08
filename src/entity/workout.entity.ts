import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import Exercise from "./exercise.entity";

@Entity()
class Workout {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    date!: string;

    @Column()
    category!: string;

    @OneToMany(() => Exercise, (exercise) => exercise.workout, {
        cascade: true,
    })
    exercises!: Exercise[];
}

export default Workout;
