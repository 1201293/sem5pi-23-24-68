import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { RobotType } from '../Interfaces/robotType';

@Injectable({
  providedIn: 'root'
})
export class RobotTypeService {

  constructor(private  http:HttpClient) { }

  createRobotType(robotType: RobotType):Observable<RobotType>{
    const httpOptions = {
      headers : new HttpHeaders({
          'Content-Type': 'application/json',
      })
    };
    return this.http.post<RobotType>(
      "http://localhost:4000/api/robotType",
      robotType,
      httpOptions
    );
  }

  getRobotTypes():Observable<RobotType[]>{
    return this.http.get<RobotType[]>(
      "http://localhost:4000/api/robotTypes",
      {observe: 'body', responseType: 'json'}
      );
  }
}
