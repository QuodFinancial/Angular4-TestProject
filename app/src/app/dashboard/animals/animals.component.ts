import { Component, OnInit } from '@angular/core';
import { DataSource } from '@angular/cdk/collections';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import { BehaviorSubject } from "rxjs/BehaviorSubject";

import { AnimalGetawayService } from './animal-getaway.service'
import { AnimalEntity, IAnimal } from '../../../../../core/src/animal.entity';
import { AnimalsInteractor } from '../../../../../lib/src/animals/animals.iteractor';


@Component({
  selector: 'app-animals',
  templateUrl: './animals.component.html',
  styleUrls: ['./animals.component.css']
})
export class AnimalsComponent implements OnInit {
  private _interactor: AnimalsInteractor;

  displayedColumns = ['remove', 'edit', 'name', 'age', 'image'];

  collection: IAnimal[];
  dataBehavior$: BehaviorSubject<IAnimal[]> = new BehaviorSubject<IAnimal[]>([]);
  dataSource: AnimalDataSource;

  editedAnimal: IAnimal;
  editedRow: number;

  constructor() {
    this.dataSource = new AnimalDataSource(this.dataBehavior$);

    const gateway = new AnimalGetawayService();
    const controller = {
      setCollection: collection => {
        this.collection = collection;
        this.dataBehavior$.next(collection);
      }
    };

    this._interactor = new AnimalsInteractor(gateway, controller);
  }

  ngOnInit() {
    this._interactor.onPageLoad();
  }

  addRowAction() {
    if (this.editedRow === undefined) {
      const animal = new AnimalEntity({
        name: '',
        age: undefined,
        image: ''
      });

      this._interactor.addItem(animal);
    }
  }

  removeRowAction(i) {
    if (this.editedRow === undefined) {
      this._interactor.deleteItem(i);
    }
  }

  editRowAction(idx: number) {
    if (this.editedRow === undefined) {
      this.editedRow = idx;
      this.editedAnimal = this.collection[idx];
    }
  }

  saveRowAction() {
    this._interactor.saveItem(this.editedAnimal, this.editedRow);
    this.editedRow = undefined;
    this.editedAnimal = undefined;
  }

  cancelRowAction() {
    this.editedRow = undefined;
    this.editedAnimal = undefined;
    this._interactor.onPageLoad();
  }
}

export class AnimalDataSource extends DataSource<any> {
  constructor(private _data: Observable<IAnimal[]>) {
    super();
  }

  connect(): Observable<IAnimal[]> {
    return this._data;
  }

  disconnect() {
  }
}
