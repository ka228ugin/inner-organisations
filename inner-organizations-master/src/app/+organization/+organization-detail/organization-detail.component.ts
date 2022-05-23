import {MatDialog} from '@angular/material/dialog';
import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Person} from '../../+person/person.model';
import {PersonService} from '../../+person/person.service';
import {AppState} from '../../app.service';
import {Organization} from '../../+organization/organization.model';
import {OrganizationService} from '../../+organization/organization.service';
// tslint:disable-next-line:max-line-length
import {PersonToOrganizationAddComponent} from '../../dialogs/person-to-organization-add/person-to-organization-add.component';
import {PersonToOrganizationEditComponent} from '../../dialogs/person-to-organization-edit/person-to-organization-edit.component';
import {ActivatedRoute} from '@angular/router';

@Component({
    selector: 'organization-detail',
    templateUrl: './organization-detail.component.html',
    styleUrls: ['./organization-detail.component.scss'],
    providers: [OrganizationService]
})
export class OrganizationDetailComponent {
    public person: Person;
    public persons: Person[];
    public organization: Organization;
    public showPrevButton: boolean;
    public id: number;

    constructor(
        public dialog: MatDialog,
        public organizationService: OrganizationService,
        public personService: PersonService,
        public appState: AppState,
        public activatedRoute: ActivatedRoute)
    {
        this.activatedRoute.params.subscribe(params => {
            this.id = params['id'];
        })
    }

    public ngOnInit() {
        this.appState.prevButtonEvent.subscribe(() => {
            this.showPrevButton = true;
            console.log('OrganizationDetailComponent showPrevButton: ', this.showPrevButton);
        });

        this.organizationService.getOrganization(this.id)
            .subscribe((organization: Organization) => {
                this.organization = organization;
            });

       this.organizationService.getOrganization(this.id)
           .subscribe(res => console.log(res));

        this.personService.getPersonsByOrganization(this.id)
            .subscribe((persons: Person[]) => {
                this.persons = persons;
                console.log(this.organization);
        });
    }

    public personToOrganizationAddDialog(person) {
        let dialogRef = this.dialog.open(PersonToOrganizationAddComponent, {
            disableClose: true
        });

        dialogRef.componentInstance.organization = this.organization;

        dialogRef.componentInstance.person = {};
        dialogRef.componentInstance.person.org_id = this.organization.id;



        dialogRef.afterClosed().subscribe((person) => {
            if (person) {
                this.personService.addPerson(person).subscribe(res => this.persons.push(person));
                this.personService.getPersonsByOrganization(this.organization.id)
                    .subscribe((persons: Person[]) => {
                        this.persons = persons;
                    });
            }

        });
    }

    public personToOrganizationEditDialog(person) {
        let dialogRef = this.dialog.open(PersonToOrganizationEditComponent, {
            disableClose: true
        });

        dialogRef.componentInstance.person = person;

        dialogRef.afterClosed().subscribe((person) => {
            if (person) {
                this.personService.updatePerson(person).subscribe(res => console.log(res));
                this.personService.getPersons()
                    .subscribe((persons: Person[]) => {
                        this.persons = persons;
                    });
            }

        });
    }

    public deletePerson(person) {
        const index = this.persons.indexOf(person);
        this.persons.splice(index, 1);
    }
}
