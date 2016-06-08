import { Component, OnInit } from 'angular2/core';
import { DataService } from '../services/data-service';
import 'rxjs/add/operator/map';

@Component({
    selector: 'todo',
    template: `
        <div class='col-sm-12'>
            <div class='row'>
                <div class='col-sm-12'>Add item:</div>  
                <div class='col-sm-6'><input type='text' [(ngModel)]='_newTodoItem' class='form-control' (keyup)="onEnter($event)"></div>  
            </div>
            <div class='row'>
                <div *ngFor='let item of _data; let i = index'>
                
                    <div>  
                        <span (click)='onDeatcivate($event, item, i)'>  <i 
                                                                        [ngClass]='{"icon-active":item.isActive, disabled:!item.isActive}'
                                                                        class="fa fa-check" aria-hidden="true"></i> </span>

                        <span [class.disabled]='!item.isActive'>{{item.name}}</span>
                        <span (click)='onDelete($event,i)' ><i class="fa fa-times-circle color-delete" aria-hidden="true"></i></span>                
                    </div>
                
                </div>
            </div>
        </div>
        
    `,
    providers: [DataService],
    styles: [`
        .disabled { text-decoration: line-through; color: #ccc;}
        .icon-active { color:DarkOliveGreen;}
        .color-delete { color:firebrick;}
    `]
})

export class TodoComponent implements OnInit {

    private _data: Array<TodoItem>;
    private _newTodoItem: string;


    constructor(private service: DataService) {
        this._data = new Array<TodoItem>();
    }

    ngOnInit() {
        this.service
            .getAll('api\\todo')
            .subscribe(x => { this.addItems(x);});
    }

    addItems(items: Array<string>) {

        let fx = (x) => new TodoItem(x, true);

        items.map(x => this._data.push(fx(x)) );
    }

    onDeactivate($event:Event, item:TodoItem, index:number ) {
        item.isActive = !item.isActive;
    }

    onEnter($event) {
        if ($event.keyCode == 13) {
            var item = this._newTodoItem;
            this._newTodoItem = null;

            this._data.push(new TodoItem(item, true));
        }
        
    }

    onDelete($event: Event, index: number) {
        this._data.splice(index, 1);
    }

}

class TodoItem {
    public name: string;
    public isActive: boolean;


    constructor(name: string, isActive: boolean) {
        this.name = name;
        this.isActive = isActive;
    }

}


