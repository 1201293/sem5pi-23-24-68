import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { BuildingConnection } from '../Interfaces/buildingconnection';


@Injectable({
  providedIn: 'root'
})
export class BuildingConnectionService {

  constructor(private  http:HttpClient) { }



  createBuildingConnection(buildingconnection: BuildingConnection):Observable<BuildingConnection>{
    const httpOptions = {
      headers: new HttpHeaders({
      'Content-Type': 'application/json',
      })
      };
    return this.http.post<BuildingConnection>(
      "http://localhost:4000/api/buildingConnections",
      buildingconnection,
      httpOptions
      );
  }

  getBuildingConnections(id1:string|undefined, id2:string|undefined):Observable<BuildingConnection[]>{
    return this.http.get<BuildingConnection[]>(
      "http://localhost:4000/api/buildingConnections/"+id1+"/"+id2,
      {observe: 'body', responseType: 'json'}
      );
  }

   getBuildingConnectionsByFloorId( id:string|undefined):Observable<BuildingConnection[]>{
    return this.http.get<BuildingConnection[]>(
      "http://localhost:4000/api/buildingConnections/"+id,
      {observe: 'body', responseType: 'json'}
      );
   }

   updateAllBuildingConnection(buildingconnection:BuildingConnection){
    const httpOptions = {
      headers: new HttpHeaders({
      'Content-Type': 'application/json',
      })
      };
    return this.http.put<BuildingConnection>(
      "http://localhost:4000/api/buildingConnections",
      buildingconnection,
      httpOptions
      );
  }

  updateBuildingConnection(buildingconnection:BuildingConnection){
    const httpOptions = {
      headers: new HttpHeaders({
      'Content-Type': 'application/json',
      })
      };
    return this.http.patch<BuildingConnection>(
      "http://localhost:4000/api/buildingConnections",
      buildingconnection,
      httpOptions
      );
  }

}
