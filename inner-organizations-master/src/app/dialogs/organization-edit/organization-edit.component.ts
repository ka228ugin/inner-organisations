import {Component, Inject} from '@angular/core';
import {MatDialogRef} from '@angular/material/dialog';
import { Organization } from '../../+organization/organization.model';
import { FormControl } from '@angular/forms';

import { OrganizationService } from '../../+organization/organization.service';

import 'rxjs/add/operator/startWith';
import 'rxjs/add/operator/map';
import {OrganizationComponent} from '../../+organization/organization.component';

console.log('`OrganizationEdit` component loaded asynchronously');

@Component({
    selector: 'organization-edit',
    templateUrl: './organization-edit.component.html',
    styleUrls: ['./organization-edit.component.scss'],
})

export class OrganizationEditComponent {
    public organizationCtrl: FormControl;
    public filteredOrganizations: any;

    public organization: Organization;

    // filterOrganizations(val: string) {
    //     return val ? this.organizations.filter(s => new RegExp(`${val}`, 'gi').test(s.name))
    //         : this.organizations;
    // }
    //
    // filterOrganizations(val: string) {
    //     return val ? this.organizations.filter(s => new RegExp(`${val}`, 'gi').test(s.name))
    //         : this.organizations;
    // }

    private submitted = false;

    private onSubmit() {
        this.submitted = true;
    }

    public closeDialog() {
        this.dialogRef.close(this.organization);
    }

    public ngOnInit(): void {
        console.log('Start `OrganizationEditComponent`');
        this.organization = this.dialogRef.componentInstance.organization;

        // this.organizationService.getorganizations()
        //     .subscribe((organizations: Organization[]) => this.organizations = organizations);

        // this.organizationService.getOrganizations()
        //     .subscribe((organizations: Organization[]) => this.organizations = organizations);
    }

    constructor(public dialogRef: MatDialogRef<OrganizationEditComponent>,
                //     private organizationService: OrganizationService,
                private organizationService: OrganizationService) {

        // this.organizationCtrl = new FormControl();
        // this.organizationCtrl = new FormControl();

        // this.filteredOrganizations = this.organizationCtrl.valueChanges
        //    .startWith(null)
        //    .map(organizationName => this.filterOrganizations(name));

        // this.filteredOrganizations = this.organizationCtrl.valueChanges
        //     .startWith(null)
        //     .map(organizationName => this.filterOrganizations(name));
    }
}
