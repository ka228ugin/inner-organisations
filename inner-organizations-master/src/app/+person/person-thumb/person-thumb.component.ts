import {MatDialog} from '@angular/material/dialog';
import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Person} from '../../+person/person.model';
import {PersonComponent} from '../person.component';
import {PersonService} from '../person.service';
import {AppState} from '../../app.service';
import {PersonEditComponent} from '../../dialogs/person-edit/person-edit.component';
import {Organization} from '../../+organization/organization.model';
import {PersonDeleteComponent} from '../../dialogs/person-delete/person-delete.component';

import { OrganizationService } from '../../+organization/organization.service';


@Component({
    selector: 'person-thumb',
    templateUrl: './person-thumb.component.html',
    styleUrls: ['./person-thumb.component.scss'],
})
export class PersonThumbComponent extends PersonComponent {
    @Input()
    public person: Person;
    public organization: Organization;
    @Output() deletePersonEvent: EventEmitter<Person> = new EventEmitter();

    constructor(
        public dialog: MatDialog,
        public personService: PersonService,
        public appState: AppState,
        private organizationService: OrganizationService) {
            super(dialog, personService, appState);
    }

    ngOnInit() {

        this.person.fullname = this.person.fullname.toLowerCase();

        this.organizationService.getOrganization(this.person.org_id)
            .subscribe((organization: Organization) => {
                this.organization = organization;
                console.log(this.organization.name);
            });
    }

    public personEditDialog() {
        let dialogRef = this.dialog.open(PersonEditComponent, {
            disableClose: true
        });
        dialogRef.componentInstance.person = Object.assign({}, this.person);
        dialogRef.afterClosed().subscribe((person) => {
            if (person) {
                this.personService.updatePerson(person).subscribe(res => this.person = person);
            }

        });
    }

    public personDeleteDialog() {
        let dialogRef = this.dialog.open(PersonDeleteComponent, {
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
