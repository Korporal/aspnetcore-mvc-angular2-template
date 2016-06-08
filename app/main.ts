import { Component, OnInit } from 'angular2/core';
import { RouteConfig, ROUTER_DIRECTIVES, ROUTER_PROVIDERS } from 'angular2/router';
import { COMMON_DIRECTIVES } from 'angular2/common';

import {ComponentOne} from './components/component-one';
import {ComponentTwo} from './components/component-two';
import {TodoComponent} from './components/todo-component';

@Component({
    selector: 'main-component',
    template: `
        <h3>{{title}}</h3>
        <div>
            <nav>
                <a [routerLink]="['One']">One</a>
                <a [routerLink]="['Two']">Two</a>
                <a [routerLink]="['ToDo']">To Do</a>
            </nav>
        </div>
        <div>
            <router-outlet></router-outlet>
        <div>
        `,
    directives: [ROUTER_DIRECTIVES],
    providers: [ROUTER_PROVIDERS]
})


    @RouteConfig([
        { path: '/one', name: 'One', component: ComponentOne, useAsDefault: true },
        { path: '/two', name: 'Two', component: ComponentTwo },
        { path: '/todo', name: 'ToDo', component: TodoComponent }
    ])


export class MainComponent implements OnInit {
    title: string = '';

    ngOnInit() {
        console.log('@ main component oninit');
    }
}

