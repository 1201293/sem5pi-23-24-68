import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { Task } from '../Interfaces/task';


@Injectable({
  providedIn: 'root'
})
export class TaskService {

  constructor(private  http:HttpClient) { }

  createTask(task: Task):Observable<Task>{
    const httpOptions = {
      headers: new HttpHeaders({
      'Content-Type': 'application/json',
      })
      };
    return this.http.post<Task>(
      "http://localhost:4000/api/tasks",
      task,
      httpOptions
      );
  }

  getTasks():Observable<Task[]>{
    return this.http.get<Task[]>(
      "http://localhost:4000/api/tasks",
      {observe: 'body', responseType: 'json'}
      );
  }

  getTask(id:string):Observable<Task>{
    return this.http.get<Task>(
      "http://localhost:4000/api/tasks/"+id,
      {observe: 'body', responseType: 'json'}
      );
  }

}
