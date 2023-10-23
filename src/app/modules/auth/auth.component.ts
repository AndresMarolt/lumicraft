import { Component } from '@angular/core';

enum authTypes {
  LOGIN,
  SIGNUP,
}

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss'],
})
export class AuthComponent {
  authTypes = authTypes;
  authType = authTypes.LOGIN;

  constructor() {}

  changeAuthType() {
    this.authType =
      this.authType === this.authTypes.LOGIN
        ? this.authTypes.SIGNUP
        : this.authTypes.LOGIN;
  }
}
