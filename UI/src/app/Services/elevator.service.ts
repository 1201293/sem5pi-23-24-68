import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Elevator } from '../Interfaces/elevator';
import { Observable } from 'rxjs';

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

  updateAllElevator(elevator:Elevator){
    const httpOptions = {
      headers: new HttpHeaders({
      'Content-Type': 'application/json',
      })
      };
    return this.http.put<Elevator>(
      "http://localhost:4000/api/elevators",
      elevator,
      httpOptions
      );
  }

  updateElevator(elevator:Elevator){
    const httpOptions = {
      headers: new HttpHeaders({
      'Content-Type': 'application/json',
      })
      };
    return this.http.patch<Elevator>(
      "http://localhost:4000/api/elevators",
      elevator,
      httpOptions
      );
  }
}
