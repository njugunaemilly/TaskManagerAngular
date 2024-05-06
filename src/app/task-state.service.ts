import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Task } from './task';

@Injectable({
  providedIn: 'root'
})
export class TaskStateService {
  
  private _tasks$ = new BehaviorSubject<Task[]>([]);

  constructor( private http: HttpClient ) { }

  get tasks$() {
    return this._tasks$.asObservable(); 
  }

  updateTasks(tasks: Task[]) {
    this._tasks$.next(tasks);
  }

  addTask(task: Task) {
    const currentTasks = this._tasks$.getValue(); 
    const updatedTasks = [...currentTasks, task];
    this.updateTasks(updatedTasks);
  }

  deleteTask(id: number) {
    const currentTasks = this._tasks$.getValue(); 
    const updatedTasks = currentTasks.filter(task => task.id !== id);
    this.updateTasks(updatedTasks);
  }

  updateTask(updatedTask: Task) {
    const currentTasks = this._tasks$.getValue(); 
    const updatedTasks = currentTasks.map(task => task.id === updatedTask.id ? updatedTask : task); 
    this.updateTasks(updatedTasks); 
  }
 
}
