import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TaskStateService } from './task-state.service';


@Injectable({
  providedIn: 'root'
})
export class TaskService {

  url = 'http://localhost:3000/tasks'
  constructor(private http: HttpClient, private taskStateService: TaskStateService) { }


    addTask(data: any): Observable<any> {
      return this.http.post(this.url, data);
    }
  
    updateTask(id: number, data: any): Observable<any> {
      return this.http.put(`${this.url}/${id}`, data);
    }
  
    getTasks(): Observable<any[]> {
      return this.http.get<any[]>(this.url);
    }
  
    getTaskById(id: number): Observable<any> {
      return this.http.get(`${this.url}/${id}`);
    }
  
    deleteTask(id: number): Observable<any> {
      return this.http.delete(`${this.url}/${id}`);
    }
  
}
