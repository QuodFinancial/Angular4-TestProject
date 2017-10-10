import { Injectable } from '@angular/core';
import { IUser, UserEntity } from '../../../../../core/src/user.entity';


const DEFAULT_DATA: IUser[] = [
  {firstName: 'Tod', lastName: 'Red', address: 'London', birthDay: '05.05.1990'},
  {firstName: 'Eduard', lastName: 'Brown', address: 'Paris', birthDay: '06.06.1980'}
];

@Injectable()
export class UserGetawayService {
  private _data: IUser[];
  private _key = 'users';

  constructor() {
    this._checkLocalStorageData();
  }

  private _checkLocalStorageData() {
    let data = localStorage.getItem(this._key);

    if (data == null) {
      localStorage.setItem(this._key, JSON.stringify([]));
    } else {
      try {
        if (!Array.isArray(JSON.parse(data))) {
          localStorage.setItem(this._key, JSON.stringify([]));
        }
      } catch (e) {
        console.error(this._key + ' from local storage parsing error', e);
        localStorage.setItem(this._key, JSON.stringify([]));
      }
    }

    this._data = JSON.parse(localStorage.getItem(this._key))
      .map(data => new UserEntity(data));

    if (this._data.length === 0) {
      this._data = DEFAULT_DATA
    }
  }

  public getData(): Promise<IUser[]> {
    return Promise.resolve(this._data.map(t => new UserEntity(t)))
  }

  public removeItem(idx: number): Promise<void> {
    this._data.splice(idx, 1)

    this._setLocalStorageData();

    return Promise.resolve();
  }

  public addItem(user: IUser): Promise<number> {
    this._data.push(user);

    this._setLocalStorageData();

    return Promise.resolve(this._data.length - 1);
  }

  public saveItem(user: IUser, idx: number): Promise<number> {
    if (!this._data.hasOwnProperty(idx)) {
      return Promise.reject('Now found');
    }

    this._data[idx] = user;

    this._setLocalStorageData();

    return Promise.resolve(this._data.length - 1);
  }

  private _setLocalStorageData() {
    localStorage.setItem(this._key, JSON.stringify(this._data))
  }
}
