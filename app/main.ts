
import {Component, OnInit} from 'angular2/core';
import {RouteConfig, ROUTER_DIRECTIVES, ROUTER_PROVIDERS} from 'angular2/router';
import {COMMON_DIRECTIVES} from 'angular2/common';

@Component({
    selector: 'main-component',
    template: `
        <h1>{{title}}</h1>
        `,
    directives: [ROUTER_DIRECTIVES],
    providers: [ROUTER_PROVIDERS]
})


@RouteConfig([])


export class MainComponent implements OnInit {
    title: string = '! my new component !';

    ngOnInit() {
        console.log('@ main component oninit');
        
    }
}

