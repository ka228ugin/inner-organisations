import {Component, OnInit} from '@angular/core';
import {MatDialogRef} from '@angular/material/dialog';
import { AppState } from '../../app.service';
@Component({
    selector: 'filter-dialog',
    templateUrl: 'filter.component.html',
    styleUrls: ['./filter.component.scss']
})
export class FilterComponent {
    filterOptions: any;
    filterMask: number;
    isAllUnchecked: boolean;
    constructor(
        public dialogRef: MatDialogRef<FilterComponent>,
        public appState: AppState
    ) { }

    public onFilterClose() {
        this.dialogRef.close();
    }
}
