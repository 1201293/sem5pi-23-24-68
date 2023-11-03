import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import  {User} from '../Interfaces/user';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  token: any|unknown;

  constructor(private  http:HttpClient) {};

  getToken():unknown{
    return this.token;
  }

  setToken(token: any){
    this.token=token;
  }

  sign_in(user:User):Observable<User>{
    const httpOptions = {
      headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'my-auth-token'
      })
      };
      return this.http.post<User>(
        "http://localhost:4000/api/auth/signin",
        user,
        httpOptions
      )
  }
  
}
