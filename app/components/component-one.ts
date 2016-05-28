import {Component} from 'angular2/core';

@Component({
    selector: 'component-one',
    template: `
        <h2>{{data}}</h2>
    `
})



export class ComponentOne {
    data: string = 'this is component one!';

}



