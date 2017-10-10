import { IUser } from "../../../core/src/user.entity";
import { IUsersController } from "./users.controller.interface";
import { IUserGateway } from "./user.getaway.interface";

export class UsersInteractor {
  private _data: IUser[];

  constructor(private _gateway: IUserGateway, private _controller: IUsersController) {
  }

  get items(): IUser[] {
    return this._data;
  }

  public onPageLoad(): Promise<any> {
    return new Promise((resolve, reject) => {
      this._gateway.getData()
        .then(res => {
          this._data = res;

          this._controller.setCollection(this._data);
          resolve();
        })
        .catch(err => {
          console.error(err);
          reject();
        });
    })
  }

  public deleteItem(idx: number): Promise<any> {
    return new Promise((resolve, reject) => {
      if (idx < 0) {
        console.error(`User ${idx} not found`)
        reject();
        return
      }

      this._gateway.removeItem(idx)
        .then(() => {
          this.items.splice(idx, 1);

          this._controller.setCollection(this.items);
          resolve()
        })
        .catch(err => {
          console.error(err)
          reject()
        })
    })
  }

  public addItem(user: IUser): Promise<any> {
    return new Promise((resolve, reject) => {
      this._gateway.addItem(user)
        .then(id => {
          this.items.push(user);

          this._controller.setCollection(this.items);
          resolve();
        })
        .catch(err => {
          console.error(err);
          reject();
        })
    });
  }

  public saveItem(user: IUser, idx: number) {
    return new Promise((resolve, reject) => {
      this._gateway.saveItem(user, idx)
        .then(() => {
          this.items[idx] = user;

          this._controller.setCollection(this.items);
          resolve();
        })
        .catch(err => {
          console.error(err);
          reject();
        });
    });
  }
}