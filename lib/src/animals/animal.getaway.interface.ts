import { IAnimal } from "../../../core/src/animal.entity";

export interface IAnimalGateway {
  getData(): Promise<IAnimal[]>;

  removeItem(id: number): Promise<void>;

  addItem(animal: IAnimal): Promise<number>;

  saveItem(animal: IAnimal, idx: number): Promise<number>;
}
