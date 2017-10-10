export interface ILogin {
  userID: string;
  password: string;
}

export class LoginEntity {
  public userID: string;
  public password: string;

  constructor(login: ILogin) {
    this.userID = login.userID;
    this.password = login.password;
  }
}
