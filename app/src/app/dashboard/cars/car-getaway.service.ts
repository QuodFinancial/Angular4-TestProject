import { Injectable } from '@angular/core';
import { ICar, CarEntity } from '../../../../../core/src/car.entity';


const DEFAULT_DATA: ICar[] = [
  {model: 'Citroen', power: '100', doors: '4', prodYear: '2015'},
  {model: 'Audi', power: '100', doors: '4', prodYear: '2017'}
];

@Injectable()
export class CarGetawayService {
  private _data: ICar[];
  private _key = 'cars';

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
      .map(data => new CarEntity(data));

    if (this._data.length === 0) {
      this._data = DEFAULT_DATA
    }
  }

  public getData(): Promise<ICar[]> {
    return Promise.resolve(this._data.map(t => new CarEntity(t)))
  }

  public removeItem(idx: number): Promise<void> {
    this._data.splice(idx, 1)

    this._setLocalStorageData();

    return Promise.resolve();
  }

  public addItem(car: ICar): Promise<number> {
    this._data.push(car);

    this._setLocalStorageData();

    return Promise.resolve(this._data.length - 1);
  }

  public saveItem(car: ICar, idx: number): Promise<number> {
    if (!this._data.hasOwnProperty(idx)) {
      return Promise.reject('Now found');
    }

    this._data[idx] = car;

    this._setLocalStorageData();

    return Promise.resolve(this._data.length - 1);
  }

  private _setLocalStorageData() {
    localStorage.setItem(this._key, JSON.stringify(this._data))
  }
}
