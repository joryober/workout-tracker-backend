import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import Workout from "./workout.entity";

@Entity()
class Exercise {
    @PrimaryGeneratedColumn()
    id!: number;

    @ManyToOne(() => Workout, (workout) => workout.exercises, {
        onDelete: "CASCADE",
    })
    workout!: Workout;

    @Column()
    exercise!: string;

    @Column({ nullable: true })
    sets?: number;

    @Column({ nullable: true })
    reps?: number;

    @Column({ nullable: true })
    weight?: number;

    @Column({ nullable: true })
    distance?: number;

    @Column({ nullable: true })
    speed?: number;

    @Column({ nullable: true })
    incline?: number;
}

export default Exercise;
