 // src/app/workout-list/workout-list.component.ts
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { WorkoutService, Workout } from '../workout.service';

@Component({
  standalone: false,
  selector: 'app-workout-list',
  templateUrl: './workout-list.component.html',
})
export class WorkoutListComponent implements OnInit {
  displayedColumns: string[] = ['userName', 'workoutType', 'minutes'];
  dataSource = new MatTableDataSource<Workout>();
  searchName: string = '';
  selectedWorkoutType: string = '';
  workoutTypes: string[] = ['Running', 'Cycling', 'Swimming', 'Weightlifting']; // Example types

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private workoutService: WorkoutService) {}

  ngOnInit(): void {
    this.applyFilters();
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }

  applyFilters(): void {
    let workouts = this.workoutService.getWorkouts();

    if (this.searchName) {
      workouts = this.workoutService.filterWorkoutsByName(this.searchName);
    }

    if (this.selectedWorkoutType) {
      workouts = this.workoutService.filterWorkoutsByType(this.selectedWorkoutType);
    }

    this.dataSource.data = workouts;
  }
}