import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { Elevator } from '../Interfaces/elevator';


@Injectable({
  providedIn: 'root'
})
export class ElevatorService {

  constructor(private  http:HttpClient) { }

   

  createElevator(elevator: Elevator):Observable<Elevator>{
    const httpOptions = {
      headers: new HttpHeaders({
      'Content-Type': 'application/json',
      })
    };
    return this.http.post<Elevator>(
      "http://localhost:4000/api/elevators",
      elevator,
      httpOptions
    );
  }

  getElevators(id:string|undefined):Observable<Elevator[]>{
    return this.http.get<Elevator[]>(
      "http://localhost:4000/api/elevators/building/"+id,
      {observe: 'body', responseType: 'json'}
    );
  }

  updateElevator(elevator:Elevator):Observable<Elevator>{
    
  }
}
