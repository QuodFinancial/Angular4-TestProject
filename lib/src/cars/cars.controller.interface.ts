import { ICar } from "../../../core/src/car.entity";

export interface ICarsController {
  setCollection(collection: ICar[]): void
}
