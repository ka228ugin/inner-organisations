import { Component, OnInit } from '@angular/core';
import { AppState } from '../app.service';
import {MatDialog} from '@angular/material/dialog';
import { FilterComponent } from './filter/filter.component';
import { Router } from '@angular/router';
import { FilterService } from './filter/filter.service';
import {MatDialogRef} from '@angular/material/dialog';
@Component({
    selector: 'search',
    templateUrl: './search.component.html',
    styleUrls: ['./search.component.scss'],
    providers: [FilterService]
})
export class SearchComponent implements OnInit {
    options: any;
    filter: number;
    filterState: any;

    dialogRef: MatDialogRef<FilterComponent>;

    constructor(public dialog: MatDialog) {}
    ngOnInit(): void {

    }

    public onFilterClick() {
        let dialogRef = this.dialog.open(FilterComponent, {
            disableClose: true
        });
        dialogRef.afterClosed().subscribe((res) => {
            console.log(res);
        });
    }

    onSearchChange(event) {
    }

    getCheckedOptions(): void {
    }
}
