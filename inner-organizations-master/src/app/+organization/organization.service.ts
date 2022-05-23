import { Injectable }    from '@angular/core';
import { Http, Headers } from '@angular/http';

import { Organization } from './organization.model';
import {API_URL} from '../environment';
import {Observable} from 'rxjs';
import {empty} from 'rxjs/observable/empty';
import { toPromise } from 'rxjs/operator/toPromise';
import {AppState} from '../app.service';


@Injectable()

export class OrganizationService {
    public organizations: Organization[];
    public organization: Organization;
    private url: string = API_URL;
    private headers = new Headers({'Content-Type': 'application/json'});

    constructor(private http: Http, private appState: AppState) { }

    public getorganizations(): Observable<Organization[]> {

        return this.http.get(`${this.url}?act=organization&type=all`, this.headers)
            .map(response => response.json().data)
            .catch(err => this.handleError(err));
    }

    public getOrganization(id: number): Observable<any> {
        return this.http.get(`${this.url}?act=organization&type=byId&id=${id}`, this.headers)
            .map(response => response.json().data)
            .catch(err => this.handleError(err));
    }


    // getOrganizationInfo(id: number) {
    //     return this.http.get(`${this.url}?act=organization&type=byId&id=${id}`)
    //         .map(res => res.json().data)
    //         .catch(err => this.handleError(err));
    // }


    public getOrganizationByMember(): Observable<Organization[]> {

        return this.http.get(`${this.url}?act=organization&type=byMember`, this.headers)
            .map(response => response.json().data)
            .catch(err => this.handleError(err));
    }

    public addOrganization(organization: Organization): Observable<any> {

        return this.http.post(`${this.url}?act=organization&method=insert`, JSON.stringify(organization), this.headers)
            .first()
            .map(response => response.json().data)
            .catch(err => this.handleError(err));
    }

    public updateOrganization(organization: Organization): Observable<any> {

        return this.http.post(`${this.url}?act=organization&method=update`, JSON.stringify(organization), this.headers)
            .first()
            .map(response => response.json().data)
            .catch(err => this.handleError(err));
    }

    public deleteOrganization(organization: Organization): Observable<any> {
        return this.http.post(`${this.url}?act=organization&method=delete`, JSON.stringify(organization), this.headers)
            .first()
            .map(response => response.json().success)
            .catch(err => this.handleError(err));
    }

    private handleError(error: any): Promise<any> {
        this.appState.snackBarEvent.emit(true);
        console.error('Error:', error);
        return Promise.reject(error.message || error);
    }
}
