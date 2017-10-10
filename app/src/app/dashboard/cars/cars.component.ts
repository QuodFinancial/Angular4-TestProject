import { Component, OnInit } from '@angular/core';
import { DataSource } from '@angular/cdk/collections';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import { BehaviorSubject } from "rxjs/BehaviorSubject";

import { CarGetawayService } from './car-getaway.service'
import { CarEntity, ICar } from '../../../../../core/src/car.entity';
import { CarsInteractor } from '../../../../../lib/src/cars/cars.iteractor';


@Component({
	selector: 'app-cars',
	templateUrl: './cars.component.html',
	styleUrls: ['./cars.component.css']
})
export class CarsComponent implements OnInit {
	private _interactor: CarsInteractor;

	displayedColumns = ['remove', 'edit', 'model', 'power', 'doors', 'prodYear'];

	collection: ICar[];
	dataBehavior$: BehaviorSubject<ICar[]> = new BehaviorSubject<ICar[]>([]);
	dataSource: CarDataSource;

	editedCar: ICar;
	editedRow: number;

	constructor() {
		this.dataSource = new CarDataSource(this.dataBehavior$);

		const gateway = new CarGetawayService();
		const controller = {
			setCollection: collection => {
				this.collection = collection;
				this.dataBehavior$.next(collection);
			}
		};

		this._interactor = new CarsInteractor(gateway, controller);
	}

	ngOnInit() {
		this._interactor.onPageLoad();
	}

	addRowAction() {
		if (this.editedRow === undefined) {
			const car = new CarEntity({
				model: '',
				power: '',
				doors: '',
        prodYear: ''
			});

			this._interactor.addItem(car);
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
			this.editedCar = this.collection[idx];
		}
	}

	saveRowAction() {
		this._interactor.saveItem(this.editedCar, this.editedRow);
		this.editedRow = undefined;
		this.editedCar = undefined;
	}

	cancelRowAction() {
		this.editedRow = undefined;
		this.editedCar = undefined;
		this._interactor.onPageLoad();
	}
}

export class CarDataSource extends DataSource<any> {
	constructor(private _data: Observable<ICar[]>) {
		super();
	}

	connect(): Observable<ICar[]> {
		return this._data;
	}

	disconnect() {
	}
}
