import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { Floor } from '../Interfaces/floor';


@Injectable({
  providedIn: 'root'
})
export class FloorService {

  constructor(private  http:HttpClient) { }

   

  createFloor(floor: Floor):Observable<Floor>{
    const httpOptions = {
      headers: new HttpHeaders({
      'Content-Type': 'application/json',
      })
      };
    return this.http.post<Floor>(
      "http://localhost:4000/api/floors",
      floor,
      httpOptions
      );
  }

  getFloors(id:string|undefined):Observable<Floor[]>{
    return this.http.get<Floor[]>(
      "http://localhost:4000/api/floors/"+id,
      {observe: 'body', responseType: 'json'}
      );
  }

  getFloorsWithConnections(id:string|undefined):Observable<Floor[]>{
    return this.http.get<Floor[]>(
      "http://localhost:4000/api/floors/withConnections/"+id,
      {observe: 'body', responseType: 'json'}
      );
  }

  getFloorsWithElevator(id:string|undefined):Observable<Floor[]>{
    return this.http.get<Floor[]>(
      "http://localhost:4000/api/floors/buildings/elevator/"+id,
      {observe: 'body', responseType: 'json'}
      );
  }

  updateAllFloor(floor:Floor){
    const httpOptions = {
      headers: new HttpHeaders({
      'Content-Type': 'application/json',
      })
      };
    return this.http.put<Floor>(
      "http://localhost:4000/api/floors",
      floor,
      httpOptions
      );
  }

  updateFloor(floor:Floor){
    const httpOptions = {
      headers: new HttpHeaders({
      'Content-Type': 'application/json',
      })
      };
    return this.http.patch<Floor>(
      "http://localhost:4000/api/floors",
      floor,
      httpOptions
      );
  }
}
