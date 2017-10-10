export interface IUser {
  firstName: string;
  lastName: string;
  address: string;
  birthDay: string;
}

export class UserEntity {
  public firstName: string;
  public lastName: string;
  public address: string;
  public birthDay: string;

  constructor(user: IUser) {
    this.firstName = user.firstName;
    this.lastName = user.lastName;
    this.address = user.address;
    this.birthDay = user.birthDay;
  }
}
