import {Component} from '@angular/core';
import {DataSource} from '@angular/cdk/collections';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/observable/of';

export interface Element {
	position: number;
	name: string;
	age: number;
	image: string;
}

let data: Element[] = [
	{ position: 1, name: 'Hydrogen', age: 1, image: '' },
	{ position: 2, name: 'Helium', age: 4, image: ''}
];
@Component({
  selector: 'app-animals',
  templateUrl: './animals.component.html',
  styleUrls: ['./../dashboard.component.css']
})
export class AnimalsComponent {
	data;
	name = "";
	age = "";
	image = "";
	displayedColumns = ['remove', 'edit', 'position', 'name', 'age', 'image'];
	dataSource = new ExampleDataSource();

	addRow() {
		this.data.push({name: this.name, age: this.age, image: this.image});
		this.name = '';
		this.age = '';
		this.image = '';
		console.log(this.data);
	}
}



/**
 * Data source to provide what data should be rendered in the table. The observable provided
 * in connect should emit exactly the data that should be rendered by the table. If the data is
 * altered, the observable should emit that new set of data on the stream. In our case here,
 * we return a stream that contains only one set of data that doesn't change.
 */
export class ExampleDataSource extends DataSource<any> {
	/** Connect function called by the table to retrieve one stream containing the data to render. */
	connect(): Observable<Element[]> {
		return Observable.of(data);
	}

	disconnect() {}
}