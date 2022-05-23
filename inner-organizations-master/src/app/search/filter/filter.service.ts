import {Injectable} from "@angular/core";
import {API_URL} from "../../environment";
import {Headers, Http} from "@angular/http";
import {AppState} from "../../app.service";

@Injectable()
export class FilterService {

    private phonesUrl = API_URL + '?act=filter';
    private headers = new Headers({'Content-Type': 'application/json'});

    constructor(private http: Http, private appState: AppState) { }

    getFilter(): Promise<any> {
        return this.http.get(`${this.phonesUrl}`)
            .toPromise()
            .then(response => response.json().data)
            .catch(this.handleError.bind(this));
    }

    saveFilter(filter: number): void {
        this.http.post(`${this.phonesUrl}`, JSON.stringify({bit_mask: filter}), {headers: this.headers})
            .toPromise()
            .then(() => null)
            .catch(this.handleError.bind(this));
    }

    private handleError(error: any): Promise<any> {
        console.error('An error occured', error);
        return Promise.reject(error.message || error);
    }
}