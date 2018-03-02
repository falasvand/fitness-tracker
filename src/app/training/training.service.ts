import {Exercise} from './exercise.model';
import {Subject} from 'rxjs/Subject';

export class TrainingService {

  private availableExercises: Exercise[] = [
    { id: 'crunches', name: 'Crunches', duration: 30, calories: 8 },
    { id: 'touch-toes', name: 'Touch Toes', duration: 180, calories: 15 },
    { id: 'side-lunges', name: 'Side Lunges', duration: 120, calories: 18 },
    { id: 'burpees', name: 'Burpees', duration: 60, calories: 8 },
    { id: 'push-ups', name: 'Push Ups', duration: 10, calories: 4 }
  ];
  private runningExercise: Exercise;
  exerciseChanged = new Subject<Exercise>();
  private storedExercises: Exercise[] = [];

  getExercises() {
    return this.availableExercises.slice();
  }

  startExercise(selectedId: string) {
    this.runningExercise = this.availableExercises.find(
      ex => ex.id === selectedId
    );
    this.exerciseChanged.next({...this.runningExercise});
  }

  completeExercise() {
    this.storedExercises.push({
      ...this.runningExercise,
      date: new Date(),
      state: 'completed'}
      );
    this.runningExercise = null;
    this.exerciseChanged.next(null);
  }

  cancelExercise(progress: number) {
    this.storedExercises.push({
      ...this.runningExercise,
      duration: this.runningExercise.duration * (progress / 100),
      calories: this.runningExercise.calories * (progress / 100),
      date: new Date(),
      state: 'cancelled'}
    );
    this.runningExercise = null;
    this.exerciseChanged.next(null);
  }

  getRunningExercise() {
    return {...this.runningExercise};
  }

  getStoredExercises() {
    return this.storedExercises.slice();
  }
}
