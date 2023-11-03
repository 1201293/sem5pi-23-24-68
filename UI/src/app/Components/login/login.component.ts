import { Component } from '@angular/core';
import { User } from 'src/app/Interfaces/user';
import { AuthService } from 'src/app/Services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  user = {
    email: '',
    password: ''
  };

  constructor(private authService:AuthService){
  }

  login(){
    if(!!this.user.email===false){
      alert("Error: Failed to sign in.\nReason: Email is empty.");
    }else if(!!this.user.password===false){
      alert("Error: Failed to sign in.\nReason: Password is empty.");
    }else{
    this.authService.sign_in(this.user as User).subscribe(
      (response) => {
      this.authService.setToken(response.token);
      alert("Success: Signed in successfully");
    },
    (error) => {
      alert("Error: Failed to sign in.\nReason: "+error.error.errors.message);
    })
    }
  }
}
