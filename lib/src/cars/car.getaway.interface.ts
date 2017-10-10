import { ICar } from "../../../core/src/car.entity";

export interface ICarGateway {
  getData(): Promise<ICar[]>;

  removeItem(id: number): Promise<void>;

  addItem(animal: ICar): Promise<number>;

  saveItem(animal: ICar, idx: number): Promise<number>;
}
