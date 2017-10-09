import { Component } from '@angular/core';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./../auth.component.css']
})
export class LoginComponent  {

    user = {userId: '', password: ''};

  constructor(
     /* public name: string,
      public alterEgo: string*/
  ) {

  }

}
