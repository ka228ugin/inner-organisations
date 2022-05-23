import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import {MatDialogRef} from '@angular/material/dialog';
import { Organization } from '../../+organization/organization.model';

@Component({
    selector: 'organization-delete-dialog',
    templateUrl: './organization-delete.component.html',
    styleUrls: ['./organization-delete.component.scss'],
    encapsulation: ViewEncapsulation.Emulated
})
export class OrganizationDeleteComponent implements OnInit {
    public organization: Organization;

    constructor(public dialogRef: MatDialogRef<OrganizationDeleteComponent>) {
    }

    ngOnInit() {
    }

    confirm() {
        this.dialogRef.close(true);
    }
}
