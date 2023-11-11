import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { Room } from '../Interfaces/room';


@Injectable({
  providedIn: 'root'
})
export class RoomService {

  constructor(private  http:HttpClient) { }



  createRoom(room: Room):Observable<Room>{
    const httpOptions = {
      headers: new HttpHeaders({
      'Content-Type': 'application/json',
      })
      };
    return this.http.post<Room>(
      "http://localhost:4000/api/rooms",
      room,
      httpOptions
      );
  }

  listRoomsByFloorId(floorId:string | undefined):Observable<Room[]>{
    return this.http.get<Room[]>(
      "http://localhost:4000/api/rooms/"+floorId,
      {observe: 'body', responseType: 'json'}
      );
  }

}