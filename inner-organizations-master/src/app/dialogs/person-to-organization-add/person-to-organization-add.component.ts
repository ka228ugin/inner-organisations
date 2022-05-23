import {Component, Input} from '@angular/core';
import {MatDialogRef} from '@angular/material/dialog';
import { Person } from '../../+person/person.model';
import { FormControl } from '@angular/forms';
import { Organization } from '../../+organization/organization.model';
import { OrganizationService } from '../../+organization/organization.service';
import { PersonService } from '../../+person/person.service';

import 'rxjs/add/operator/startWith';
import 'rxjs/add/operator/map';
import {Observable} from 'rxjs';

console.log('`PersonToOrganizationAddComponent` component loaded asynchronously');

@Component({
    selector: 'person-add',
    templateUrl: './person-to-organization-add.component.html',
    styleUrls: ['./person-to-organization-add.component.scss'],
})

export class PersonToOrganizationAddComponent {
    @Input() test:string;
    public organization: Organization;
    organizationCtrl: FormControl;
    filteredOrganizations: any;
    organizations: Organization[];

    personCtrl: FormControl;
    filteredPersons: any;
    persons: Person[];

    public person: Person;

    private submitted = false;


    displayOrganizationFn(organization: Organization): string {
        return organization ? organization.name : undefined;
    }

    displayPersonFn(person: Person): string {
        return person ? person.fullname : undefined;
    }

    private onSubmit() {
        this.submitted = true;
    }

    public closeDialog() {
        this.dialogRef.close();
    }

    addPerson() {
        if (this.person) {
            this.dialogRef.close(this.person);
        } else {
            alert('manid = 0 or undefined');
        }

    }

    public setOrganizationId(id): void {
        console.log(id);
        this.person.org_id = id;
    }

    public setPersonId(id): void {
        console.log(id);
        this.person.manid = id;
    }

    constructor(public dialogRef: MatDialogRef<PersonToOrganizationAddComponent>,
                private organizationService: OrganizationService,
                private personService: PersonService) {

        this.organizationCtrl = new FormControl();
        this.filteredOrganizations = this.organizationCtrl.valueChanges
            .startWith(null)
            .map(name => this.filterOrganizations(name));

        this.personCtrl = new FormControl();
        this.filteredPersons = this.personCtrl.valueChanges
            .startWith(null)
            .map(fullname => this.filterPersons(fullname));

    }

    ngOnInit() {

        this.organization = this.dialogRef.componentInstance.organization;

        console.log(this.person.org_id);

        this.organizationService.getorganizations()
            .subscribe((organizations: Organization[]) => {
                this.organizations = organizations;
                console.log(this.organizations);
            });

        this.personService.getPersons()
            .subscribe((persons: Person[]) => {
                this.persons = persons;
                console.log(this.persons);
            });
    }

    filterOrganizations(val: string) {
        return val ? this.organizations.filter(s => new RegExp(`${val}`, 'gi').test(s.name))
            : this.organizations;
    }

    filterPersons(val: string) {
        return val ? this.persons.filter(s => new RegExp(`${val}`, 'gi').test(s.fullname))
            : this.persons;
    }


}
