import { Injectable }    from '@angular/core';
import { Http, Headers } from '@angular/http';

import { Person } from './person.model';
import {API_URL} from '../environment';
import {Observable} from 'rxjs';
import {empty} from 'rxjs/observable/empty';
import {HttpHeaders} from '@angular/common/http';
@Injectable()

export class PersonService {
    public persons: Person[];
    private url: string = API_URL;
    private headers = new Headers({'Content-Type': 'application/json'});
    constructor(private http: Http) { }

    public getPersons(): Observable<Person[]> {

        return this.http.get(`${this.url}?act=staff&type=all`, this.headers)
            .map(response => response.json().data)
            .catch(err => this.handleError(err));
    }

    public getPersonsByOrganization(id: number): Observable<any> {

        return this.http.get(`${this.url}?act=staff&type=byOrganization&org_id=${id}`, this.headers)
            .map(response => response.json().data)
            .catch(err => this.handleError(err));
    }

    public addPerson(person: Person): Observable<any> {

        return this.http.post(`${this.url}?act=staff&method=insert`, JSON.stringify(person), this.headers)
            .first()
            .map(response => response.json().data)
            .catch(err => this.handleError(err));
    }

    public updatePerson(person: Person): Observable<any> {

        return this.http.post(`${this.url}?act=staff&method=update`, JSON.stringify(person), this.headers)
            .first()
            .map(response => response.json().data)
            .catch(err => this.handleError(err));
    }

    public deletePerson(person: Person): Observable<any> {
        return this.http.post(`${this.url}?act=staff&method=delete`, JSON.stringify(person), this.headers)
            .first()
            .map(response => response.json().success)
            .catch(err => this.handleError(err));
    }

    private handleError(err: Error, mssg?: string, duration?: number): Observable<never> {
        console.log(mssg, duration);
        console.error(err);

        return empty();
    }
}
