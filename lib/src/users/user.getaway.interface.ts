import { IUser } from "../../../core/src/user.entity";

export interface IUserGateway {
  getData(): Promise<IUser[]>;

  removeItem(id: number): Promise<void>;

  addItem(user: IUser): Promise<number>;

  saveItem(user: IUser, idx: number): Promise<number>;
}
