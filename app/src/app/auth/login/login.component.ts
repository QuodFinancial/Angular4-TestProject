import { Component } from '@angular/core';
import { LoginEntity, ILogin } from "../../../../../core/src";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./../auth.component.css']
})
export class LoginComponent {

  user = new LoginEntity({userID: '', password: ''});

  constructor() {
  }
}
