import { IUser } from "../../../core/src/user.entity";

export interface IUsersController {
  setCollection(collection: IUser[]): void
}
