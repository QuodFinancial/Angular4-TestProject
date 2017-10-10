import { Component, OnInit } from '@angular/core';
import { DataSource } from '@angular/cdk/collections';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import { BehaviorSubject } from "rxjs/BehaviorSubject";

import { UserGetawayService } from './user-getaway.service'
import { UserEntity, IUser } from '../../../../../core/src/user.entity';
import { UsersInteractor } from '../../../../../lib/src/users/users.iteractor';


@Component({
	selector: 'app-users',
	templateUrl: './users.component.html',
	styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
	private _interactor: UsersInteractor;

	displayedColumns = ['remove', 'edit', 'firstName', 'lastName', 'address', 'birthDay'];

	collection: IUser[];
	dataBehavior$: BehaviorSubject<IUser[]> = new BehaviorSubject<IUser[]>([]);
	dataSource: UserDataSource;

	editedUser: IUser;
	editedRow: number;

	constructor() {
		this.dataSource = new UserDataSource(this.dataBehavior$);

		const gateway = new UserGetawayService();
		const controller = {
			setCollection: collection => {
				this.collection = collection;
				this.dataBehavior$.next(collection);
			}
		};

		this._interactor = new UsersInteractor(gateway, controller);
	}

	ngOnInit() {
		this._interactor.onPageLoad();
	}

	addRowAction() {
		if (this.editedRow === undefined) {
			const user = new UserEntity({
				firstName: '',
				lastName: '',
				address: '',
        birthDay: ''
			});

			this._interactor.addItem(user);
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
			this.editedUser = this.collection[idx];
		}
	}

	saveRowAction() {
		this._interactor.saveItem(this.editedUser, this.editedRow);
		this.editedRow = undefined;
		this.editedUser = undefined;
	}

	cancelRowAction() {
		this.editedRow = undefined;
		this.editedUser = undefined;
		this._interactor.onPageLoad();
	}
}

export class UserDataSource extends DataSource<any> {
	constructor(private _data: Observable<IUser[]>) {
		super();
	}

	connect(): Observable<IUser[]> {
		return this._data;
	}

	disconnect() {
	}
}
