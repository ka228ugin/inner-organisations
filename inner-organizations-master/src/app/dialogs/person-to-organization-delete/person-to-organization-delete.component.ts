import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import {MatDialogRef} from '@angular/material/dialog';
import {Person} from '../../+person/person.model';

@Component({
    selector: 'person-delete-dialog',
    templateUrl: './person-to-organization-delete.component.html',
    styleUrls: ['./person-to-organization-delete.component.scss'],
    encapsulation: ViewEncapsulation.Emulated
})
export class PersonToOrganizationDeleteComponent implements OnInit {
    public person: Person;

    constructor(public dialogRef: MatDialogRef<PersonToOrganizationDeleteComponent>) {
    }

    ngOnInit() {
    }

    confirm() {
        this.dialogRef.close(true);
    }
}
