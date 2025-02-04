import { Component, OnInit } from '@angular/core';
import { WorkoutService } from '../workout.service';

@Component({
  standalone: false,
  selector: 'app-workout-chart',
  templateUrl: './workout-chart.component.html',
  styleUrls: ['./workout-chart.component.scss']
})
export class WorkoutChartComponent implements OnInit {
  workoutData: { name: string; value: number }[] = [];
  view: [number, number] = [700, 400]; // Chart dimensions

  // Chart options
  showXAxis = true;
  showYAxis = true;
  gradient = false;
  showLegend = true;
  showXAxisLabel = true;
  xAxisLabel = 'Workout Type';
  showYAxisLabel = true;
  yAxisLabel = 'Minutes Spent';

  constructor(private workoutService: WorkoutService) {}

  ngOnInit() {
    this.loadChartData();
  }

  loadChartData() {
    const workouts = this.workoutService.getWorkouts();

    // Ensure workouts is an array
    if (!Array.isArray(workouts)) {
      console.error('Invalid workout data:', workouts);
      return;
    }

    // Group workouts by type and sum the total minutes
    const aggregatedData: { name: string; value: number }[] = workouts.reduce((acc: { name: string; value: number }[], workout: any) => {
      if (!workout.workoutType || typeof workout.workoutMinutes !== 'number') {
        console.warn('Skipping invalid workout:', workout);
        return acc;
      }

      const existing = acc.find(w => w.name === workout.workoutType);
      if (existing) {
        existing.value += workout.workoutMinutes;
      } else {
        acc.push({ name: workout.workoutType, value: workout.workoutMinutes });
      }
      return acc;
    }, []);

    this.workoutData = [...aggregatedData];  // Assign processed data to chart
  }
}
