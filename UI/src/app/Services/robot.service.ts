import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import  {Robot} from '../Interfaces/robot';

@Injectable({
  providedIn: 'root'
})
export class RobotService {

  constructor(private  http:HttpClient) { }

  createRobot(robot: Robot):Observable<Robot>{
    const httpOptions = {
      headers : new HttpHeaders({
          'Content-Type': 'application/json',
      })
    };
    return this.http.post<Robot>(
      "http://localhost:4000/api/robots",
      robot,
      httpOptions
    );
  }

  disableRobot(robot:Robot):Observable<Robot>{
    const httpOptions = {
      headers: new HttpHeaders({
      'Content-Type': 'application/json',
      })
    };
    return this.http.patch<Robot>(
      "http://localhost:4000/api/robots/disable",
      robot,
      httpOptions
    );
  }

  getRobots():Observable<Robot[]>{
    return this.http.get<Robot[]>(
      "http://localhost:4000/api/robots",
      {observe: 'body', responseType: 'json'}
      );
  }

  getRobotsByTaskOrDesignation(taskOrDesignation:String):Observable<Robot[]>{
    return this.http.get<Robot[]>(
      "http://localhost:4000/api/robots/"+taskOrDesignation,
      {observe: 'body', responseType: 'json'}
      );
  }
}
