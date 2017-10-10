export interface ICar {
  model: string;
  power: string;
  doors: string;
  prodYear: string;
}

export class CarEntity {
  public model: string;
  public power: string;
  public doors: string;
  public prodYear: string;

  constructor(car: ICar) {
    this.model = car.model;
    this.power = car.power;
    this.doors = car.doors;
    this.prodYear = car.prodYear;
  }
}
