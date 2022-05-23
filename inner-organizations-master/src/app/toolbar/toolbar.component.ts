import { Component, OnInit } from '@angular/core';
import { AppState } from '../app.service';
import { Router } from '@angular/router';
@Component({
    selector: 'toolbar',
    templateUrl: './toolbar.component.html',
    styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent implements OnInit {
    private showPrevButton: boolean;
    private presentation: string;
    private toggleGroup: boolean;
    public presentationChangeEvent: string;
    constructor(public appState: AppState,
                private router: Router) {


    }
    clickSidenav(): void {
        this.appState.sidenavEvent.emit(true);
    }
    public ngOnInit() {
        this.toggleGroup = true;
        this.appState.prevButtonEvent.subscribe(() => {
            this.showPrevButton = true;
        });
    }
    togglePresentation(event) {
        this.appState.setState('presentation', event.value);
        console.log(this.appState.getState('presentation'));
    }
}