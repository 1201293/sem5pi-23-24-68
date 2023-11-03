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
}
