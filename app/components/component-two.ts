import {Component} from 'angular2/core';

@Component({
    selector: 'component-two',
    template: `
        <h3>{{data}}</h3>
        `
})

export class ComponentTwo {
    data:string = 'component two is here!'
}