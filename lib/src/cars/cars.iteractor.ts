import { ICar } from "../../../core/src/car.entity";
import { ICarsController } from "./cars.controller.interface";
import { ICarGateway } from "./car.getaway.interface";

export class CarsInteractor {
  private _data: ICar[];

  constructor(private _gateway: ICarGateway, private _controller: ICarsController) {
  }

  get items(): ICar[] {
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
        console.error(`Car ${idx} not found`)
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

  public addItem(car: ICar): Promise<any> {
    return new Promise((resolve, reject) => {
      this._gateway.addItem(car)
        .then(id => {
          this.items.push(car);

          this._controller.setCollection(this.items);
          resolve();
        })
        .catch(err => {
          console.error(err);
          reject();
        })
    });
  }

  public saveItem(car: ICar, idx: number) {
    return new Promise((resolve, reject) => {
      this._gateway.saveItem(car, idx)
        .then(() => {
          this.items[idx] = car;

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