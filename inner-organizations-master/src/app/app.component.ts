/*
 * Angular 2 decorators and services
 */
import {
    Component, Inject, NgModule,
    OnInit,
    ViewEncapsulation
} from '@angular/core';
import { AppState } from './app.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import {NavigationEnd, Router, RoutesRecognized} from '@angular/router';

/*
 * App Component
 * Top Level Component
 */
@Component({
    selector: 'app',
    encapsulation: ViewEncapsulation.None,
    styleUrls: [
        './app.component.css'
    ],
    templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {
    private presentation: string;
    public showPrevButton: boolean;
    location: string;

    constructor(public appState: AppState,
                public snackBar: MatSnackBar,
                private _router: Router)
    {
        this.location = _router.url;

        this._router.events.subscribe(event => {
            if (event instanceof RoutesRecognized) {
                console.log('navigated to:', event.url);
                console.log('route state', event.state);
                console.log('');
            }
            else if (event instanceof NavigationEnd) {
                // if u dont need the state, you could even use this event-type..
            }
        });

        appState.snackBarEvent.subscribe(() => this.openSnackBar());
    }

    public ngOnInit() {
        this.presentation = 'thumb';
        this.appState.prevButtonEvent.subscribe(() => {
            this.showPrevButton = false;
        });
    }

    ngAfterViewInit(){
        this._router.events.subscribe(event => {
            if (event instanceof RoutesRecognized) {
                if (event.url == '/') {
                    this.location = '/';
                    console.log('i am on main page');
                }
            }
        });
    }

    togglePresentation(event) {
        this.appState.setState('presentation', event.value);
        console.log(this.appState.getState('presentation'));
    }

    openSnackBar() {
        this.snackBar.open('Произошла ошибка, повторите попытку позже...', '', {
            duration: 5000
        });
    }
}
