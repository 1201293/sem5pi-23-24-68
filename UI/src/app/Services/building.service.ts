import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import  {Building} from '../Interfaces/building';

@Injectable({
  providedIn: 'root'
})
export class BuildingService {

  constructor(private  http:HttpClient) { }

  createBuilding(building: Building):Observable<Building>{
    const httpOptions = {
      headers : new HttpHeaders({
          'Content-Type': 'application/json',
      })
    };
    return this.http.post<Building>(
      "http://localhost:4000/api/buildings",
      building,
      httpOptions
    );
  }

  getBuildings():Observable<Building[]>{
    return this.http.get<Building[]>(
      "http://localhost:4000/api/buildings",
      {observe: 'body', responseType: 'json'}
      );
  }
}
