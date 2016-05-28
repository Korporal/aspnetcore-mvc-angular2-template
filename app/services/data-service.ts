import { Injectable } from 'angular2/core';
import { Http, Request, Response } from 'angular2/http';

import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';


@Injectable()
export class DataService {

    constructor(private http: Http) {

    }

    getAll(uri: string): Observable<any> {

        var result = this.http
            .get(uri)
            .map(response => response.json());
        return result;
    }



}