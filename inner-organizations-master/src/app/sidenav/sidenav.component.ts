import {Component} from '@angular/core';
import {AppState} from '../app.service';
import { NavItem, navItems } from './nav-items';
@Component({
    selector: 'sidenav',
    templateUrl: './sidenav.component.html',
    styleUrls: ['./sidenav.component.scss']
 })
export class SidenavComponent {
    private isToggled: boolean = false;
    private name: string = 'Монахова Клавдия Евгеньевна';
    private department: string = 'Отдел несуществующих наук';
    private items: NavItem[] = navItems;
    constructor(private appState: AppState) {
        appState.sidenavEvent.subscribe(() => {
            this.isToggled = !this.isToggled;
        });
    }
}
