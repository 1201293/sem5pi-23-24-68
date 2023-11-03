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

   httpOptions = {
    headers: new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': 'my-auth-token'
    })
    };

  createFloor(floor: Floor):Observable<Floor>{
    return this.http.post<Floor>(
      "http://localhost:4000/api/floors",
      floor,
      this.httpOptions
      );
  }
}
