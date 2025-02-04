// src/app/workout.service.ts
import { Injectable } from '@angular/core';

export interface Workout {
  id: number;
  userName: string;
  workoutType: string;
  minutes: number;
}

@Injectable({
  providedIn: 'root',
})
export class WorkoutService {
  private readonly STORAGE_KEY = 'workouts';

  constructor() {}

  getWorkouts(): Workout[] {
    const workouts = localStorage.getItem(this.STORAGE_KEY);
    return workouts ? JSON.parse(workouts) : [];
  }

  addWorkout(workout: Workout): void {
    const workouts = this.getWorkouts();
    workouts.push(workout);
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(workouts));
  }

  filterWorkoutsByName(name: string): Workout[] {
    const workouts = this.getWorkouts();
    return workouts.filter((workout) =>
      workout.userName.toLowerCase().includes(name.toLowerCase())
    );
  }

  filterWorkoutsByType(type: string): Workout[] {
    const workouts = this.getWorkouts();
    return workouts.filter((workout) => workout.workoutType === type);
  }
}