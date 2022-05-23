import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import {MatDialogRef} from '@angular/material/dialog';
import {Person} from '../../+person/person.model';

@Component({
    selector: 'person-delete-dialog',
    templateUrl: './person-delete.component.html',
    styleUrls: ['./person-delete.component.scss'],
    encapsulation: ViewEncapsulation.Emulated
})
export class PersonDeleteComponent implements OnInit {
    public person: Person;

    constructor(public dialogRef: MatDialogRef<PersonDeleteComponent>) {
    }

    ngOnInit() {
    }

    confirm() {
        this.dialogRef.close(true);
    }
}
