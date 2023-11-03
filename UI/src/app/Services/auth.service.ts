import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private token: string|null;

  constructor(private  http:HttpClient) {this.token=null};

  getToken():string|null{
    return this.token;
  }

  setToken(token: string){
    this.token=token;
  }
  
}
