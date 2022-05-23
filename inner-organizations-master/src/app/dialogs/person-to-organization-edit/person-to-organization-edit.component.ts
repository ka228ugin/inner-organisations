import {Component, Inject} from '@angular/core';
//import {MatDialogRef, MatSelectModule} from '@angular/material';
import {MatDialogRef} from '@angular/material/dialog';
import {MatSelectModule} from '@angular/material/select';
import { Person } from '../../+person/person.model';
import { FormControl } from '@angular/forms';

import { Organization } from '../../+organization/organization.model';
import { OrganizationService } from '../../+organization/organization.service';
import { PersonService } from '../../+person/person.service';

import 'rxjs/add/operator/startWith';
import 'rxjs/add/operator/map';
import {PersonComponent} from '../../+person/person.component';
import {isNullOrUndefined} from 'util';

console.log('`PersonToOrganizationEdit` component loaded asynchronously');

@Component({
    selector: 'person-edit',
    templateUrl: './person-to-organization-edit.component.html',
    styleUrls: ['./person-to-organization-edit.component.scss'],
})

export class PersonToOrganizationEditComponent {
    public organizationCtrl: FormControl;
    public filteredOrganizations: any;

    public organization: Organization;
    public organizations: Organization[];
    public person: Person;

    private submitted = false;

    private onSubmit() {
        this.submitted = true;
    }

    public closeDialog() {
        this.dialogRef.close(this.person);
    }

    public filterOrganizations(val: string) {
        return val ? this.organizations.filter(s => new RegExp(`${val}`, 'gi').test(name))
            : this.organizations;
    }

    public displayFn(organization: Organization): string {
        return organization ? organization.name : undefined;
    }

    public setOrgId(id): void {
        console.log(id);
        this.person.org_id = id;
    }

    public ngOnInit(): void {
        this.dialogRef.componentInstance.person = Object.assign({}, this.person);
        this.organizationService.getorganizations()
            .subscribe((organizations: Organization[]) =>
                this.organizations = organizations);
    }

    constructor(public dialogRef: MatDialogRef<PersonToOrganizationEditComponent>,
                private organizationService: OrganizationService,
                private personService: PersonService) {

        this.organizationCtrl = new FormControl();
        this.filteredOrganizations = this.organizationCtrl.valueChanges
            .startWith(null)
            .map(organizationName => this.filterOrganizations(name));

    }
}
