import {Exercise} from './exercise.model';
import {Subject} from 'rxjs/Subject';
import {Injectable} from '@angular/core';
import {AngularFirestore} from 'angularfire2/firestore';


@Injectable()
export class TrainingService {

  private availableExercises: Exercise[] = [];
  private runningExercise: Exercise;
  exerciseChanged = new Subject<Exercise>();
  exercisesChanged = new Subject<Exercise[]>();
  private storedExercises: Exercise[] = [];

  constructor(private db: AngularFirestore) {}

  fetchExercises() {
    this.db.collection('availableExercises')
      .snapshotChanges()
      .map(docArray => {
        return docArray.map(doc => {
          return {
            id: doc.payload.doc.id,
            ...doc.payload.doc.data()
          };
        });
      })
      .subscribe(
        (exercises: Exercise[]) => {
          this.availableExercises = exercises;
          this.exercisesChanged.next([...this.availableExercises]);
      });
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
