import { Component } from '@angular/core';
import {MatDialogRef} from '@angular/material/dialog';
import { Organization } from '../../+organization/organization.model';
import { FormControl } from '@angular/forms';
import { OrganizationService } from '../../+organization/organization.service';

import 'rxjs/add/operator/startWith';
import 'rxjs/add/operator/map';

console.log('`OrganizationAddComponent` component loaded asynchronously');

@Component({
    selector: 'organization-add',
    templateUrl: './organization-add.component.html',
    styleUrls: ['./organization-add.component.scss'],
})

export class OrganizationAddComponent {
    public organization: Organization;

    organizationCtrl: FormControl;
    filteredOrganizations: any;

    // filterOrganizations(val: string) {
    //     return val ? this.organizations.filter(s => new RegExp(`${val}`, 'gi').test(s.name))
    //         : this.organizations;
    // }

    // filterOrganizations(val: string) {
    //     return val ? this.organizations.filter(s => new RegExp(`${val}`, 'gi').test(s.name))
    //         : this.organizations;
    // }

   private submitted = false;

    private onSubmit() {
        this.submitted = true;
    }

    public closeDialog() {
        this.dialogRef.close();
    }

    public ngOnInit(): void {
        this.organization = this.dialogRef.componentInstance.organization;
        console.log('test', this.dialogRef.componentInstance.organization);
        // this.organizationService.getorganizations()
        //     .subscribe((organizations: Organization[]) => this.organizations = organizations);

        // this.organizationService.getOrganizations()
        //     .subscribe((organizations: Organization[]) => this.organizations = organizations);
    }

    addOrganization() {
        // console.log(this.organization);
        // this.data.organization = this.organization;

        this.dialogRef.close(this.organization);
    }

    constructor(public dialogRef: MatDialogRef<OrganizationAddComponent>,
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
