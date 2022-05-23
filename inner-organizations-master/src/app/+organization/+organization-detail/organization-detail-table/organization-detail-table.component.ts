import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Person} from '../../../+person/person.model';
import {PersonComponent} from '../../person.component';
import {PersonService} from '../../../+person/person.service';
import {MatDialog} from '@angular/material/dialog';
import {AppState} from '../../../app.service';
// tslint:disable-next-line:max-line-length
import {PersonToOrganizationEditComponent} from '../../../dialogs/person-to-organization-edit/person-to-organization-edit.component';
import {PersonToOrganizationDeleteComponent} from '../../../dialogs/person-to-organization-delete/person-to-organization-delete.component';

@Component({
    selector: 'organization-detail-table',
    templateUrl: './organization-detail-table.component.html',
    styleUrls: ['./organization-detail-table.component.scss'],
})
export class OrganizationDetailTableComponent {
    @Input()
    public person: Person;
    public showPrevButton: boolean;
    @Output() deletePersonEvent: EventEmitter<Person> = new EventEmitter();

    constructor(public dialog: MatDialog, public personService: PersonService, public appState: AppState) {
    }

    ngOnInit() {
        this.appState.prevButtonEvent.emit(false);
        this.person.fullname = this.person.fullname.toLowerCase();
        this.appState.prevButtonEvent.subscribe(() => {
            this.showPrevButton = true;
            console.log('OrganizationDetailTableComponent showPrevButton: ', this.showPrevButton);
        });
    }

    public personToOrganizationEditDialog() {
        let dialogRef = this.dialog.open(PersonToOrganizationEditComponent, {
            disableClose: true
        });
        dialogRef.componentInstance.person = Object.assign({}, this.person);
        dialogRef.afterClosed().subscribe((person) => {
            if (person) {
                this.personService.updatePerson(person).subscribe(res => this.person = person);
            }

        });
    }

    public personToOrganizationDeleteDialog() {
        let dialogRef = this.dialog.open(PersonToOrganizationDeleteComponent, {
            disableClose: true
        });

        dialogRef.afterClosed().subscribe((confirm) => {
            if (confirm) {
                this.personService.deletePerson(this.person).subscribe(success => {

                    if (success) {
                        this.deletePersonEvent.emit(this.person);
                    }

                });
            }
        });
    }

}
