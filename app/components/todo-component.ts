import { Component, OnInit } from 'angular2/core';
import { DataService } from '../services/data-service';

@Component({
    selector: 'todo',
    template: `
        <div>
            <div *ngFor='let item of _data; #i = index'>
                {{item}} <span>({{i}})</span>
            </div>
        <div>
    `,
    providers:[DataService]

})


export class TodoComponent implements OnInit {

    private _data: Array<string>;

    constructor(private service: DataService) {

    }

    ngOnInit() {
        this.service
            .getAll('api\\todo')
            .subscribe(x => { this._data = x; console.log(this._data); });

    }

}

