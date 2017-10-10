export interface IAnimal {
  name: string;
  age: number;
  image: string;
}

export class AnimalEntity {
  public name: string;
  public age: number;
  public image: string;

  constructor(animal: IAnimal) {
    this.name = animal.name;
    this.age = animal.age;
    this.image = animal.image;
  }
}
