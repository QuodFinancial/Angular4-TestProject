import { IAnimal } from "../../../core/src/animal.entity";

export interface IAnimalsController {
  setCollection(collection: IAnimal[]): void
}
