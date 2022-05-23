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

console.log('`PersonEdit` component loaded asynchronously');

@Component({
    selector: 'person-edit',
    templateUrl: './person-edit.component.html',
    styleUrls: ['./person-edit.component.scss'],
})

export class PersonEditComponent {
    organizationCtrl: FormControl;
    filteredOrganizations: any;
    public organizations: Organization[];

    public person: Person;

    private subscription;

    private submitted = false;

    private onSubmit() {
        this.submitted = true;
    }

    constructor(public dialogRef: MatDialogRef<PersonEditComponent>,
                private organizationService: OrganizationService,
                private personService: PersonService) {

        this.organizationCtrl = new FormControl();
        this.filteredOrganizations = this.organizationCtrl.valueChanges
            // .startWith(null)
            .map(name => this.filterOrganizations(name));
    }

    displayOrganizationFn(organization: Organization): string {
        return organization ? organization.name : undefined;
    }

    public closeDialog() {
        this.dialogRef.close(this.person);
    }

    public setOrganizationId(id): void {
        console.log(id);
        this.person.org_id = id;
    }

    public displayFn(organization: Organization): string {
        return organization ? organization.name : undefined;
    }

    public setOrgId(id): void {
        console.log(id);
        this.person.org_id = id;
    }

    public ngOnInit(): void {
        this.person = this.dialogRef.componentInstance.person;
        this.organizationCtrl.setValue(this.person.org_id);

        this.subscription = this.organizationService.getorganizations()
            .subscribe((organizations: Organization[]) => {
                this.organizations = organizations;
                console.log(this.organizations);
            });
    }

    ngOnDestroy() {
        console.log('onDestroy of PersonEditComponent');
        this.subscription.unsubscribe();
    }

    filterOrganizations(val: string) {
        return val ? this.organizations.filter(s => new RegExp(`${val}`, 'gi').test(s.name))
            : this.organizations;
    }
}
