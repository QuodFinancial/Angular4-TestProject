import { Injectable } from '@angular/core';
import { IAnimal, AnimalEntity } from '../../../../../core/src/animal.entity';


const DEFAULT_DATA: IAnimal[] = [
  {name: 'Tod', age: 11, image: ''},
  {name: 'Eduard', age: 2, image: ''}
];

@Injectable()
export class AnimalGetawayService {
  private _data: IAnimal[];
  private _key = 'animals';

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
      .map(data => new AnimalEntity(data));

    if (this._data.length === 0) {
      this._data = DEFAULT_DATA
    }
  }

  public getData(): Promise<IAnimal[]> {
    return Promise.resolve(this._data.map(t => new AnimalEntity(t)))
  }

  public removeItem(idx: number): Promise<void> {
    this._data.splice(idx, 1)

    this._setLocalStorageData();

    return Promise.resolve();
  }

  public addItem(animal: IAnimal): Promise<number> {
    this._data.push(animal);

    this._setLocalStorageData();

    return Promise.resolve(this._data.length - 1);
  }

  public saveItem(animal: IAnimal, idx: number): Promise<number> {
    if (!this._data.hasOwnProperty(idx)) {
      return Promise.reject('Now found');
    }

    this._data[idx] = animal;

    this._setLocalStorageData();

    return Promise.resolve(this._data.length - 1);
  }

  private _setLocalStorageData() {
    localStorage.setItem(this._key, JSON.stringify(this._data))
  }
}
