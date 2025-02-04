
  
  // src/app/add-workout/add-workout.component.ts
import { Component } from '@angular/core';
import { WorkoutService, Workout } from '../workout.service';

@Component({
  standalone: false,
  selector: 'app-add-workout',
  templateUrl: './add-workout.component.html',
  styleUrls:['D:/project/workout-tracker/src/app/add-workout/add-workout.component.css']
})
export class AddWorkoutComponent {
  userName: string = '';
  workoutType: string = '';
  minutes: number = 0;
  workoutTypes: string[] = ['Running', 'Cycling', 'Swimming', 'Weightlifting'];
  constructor(private workoutService: WorkoutService) {}

  onSubmit(): void {
    const newWorkout: Workout = {
      id: Date.now(),
      userName: this.userName,
      workoutType: this.workoutType,
      minutes: this.minutes,
    };
    this.workoutService.addWorkout(newWorkout);
    this.resetForm();
  }

  resetForm(): void {
    this.userName = '';
    this.workoutType = '';
    this.minutes = 0;
  }
}