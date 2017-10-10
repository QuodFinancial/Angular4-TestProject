import { IAnimal } from "../../../core/src/animal.entity";
import { IAnimalsController } from "./animals.controller.interface";
import { IAnimalGateway } from "./animal.getaway.interface";

export class AnimalsInteractor {
  private _data: IAnimal[];

  constructor(private _gateway: IAnimalGateway, private _controller: IAnimalsController) {
  }

  get items(): IAnimal[] {
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
        console.error(`Animal ${idx} not found`)
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

  public addItem(animal: IAnimal): Promise<any> {
    return new Promise((resolve, reject) => {
      this._gateway.addItem(animal)
        .then(id => {
          this.items.push(animal);

          this._controller.setCollection(this.items);
          resolve();
        })
        .catch(err => {
          console.error(err);
          reject();
        })
    });
  }

  public saveItem(animal: IAnimal, idx: number) {
    return new Promise((resolve, reject) => {
      this._gateway.saveItem(animal, idx)
        .then(() => {
          this.items[idx] = animal;

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