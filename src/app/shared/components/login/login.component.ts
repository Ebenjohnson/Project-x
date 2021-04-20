import { Component } from '@angular/core';
import { AuthClient, LoginRequest } from 'src/app/core/network/auth.client';
import { AuthenticationService } from 'src/app/core/services/authentication.service';

declare var $ : any;

@Component({
  selector: 'app-login',
  templateUrl: `./login.component.html`,
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent{
  loginRequest: LoginRequest = new LoginRequest();
  loginError = null;

  constructor(private authClient: AuthClient, private authenticationService: AuthenticationService) {}

  login() {
    this.loginError =  null;
    this.loginRequest.role = 'customer';
    this.authClient.login(this.loginRequest).subscribe(res => {
      this.loginRequest = new LoginRequest();
      $('#login_model').modal('hide');
      
      this.authenticationService.login(res);
    }, 
    err => {
      this.loginError = 'Invalid credentials';
    });
  }
}
