import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Organization} from '../../+organization/organization.model';
import {OrganizationComponent} from '../organization.component';
import {OrganizationService} from '../organization.service';
import {MatDialog} from '@angular/material/dialog';
import {AppState} from '../../app.service';
import {OrganizationEditComponent} from '../../dialogs/organization-edit/organization-edit.component';
import {OrganizationDeleteComponent} from '../../dialogs/organization-delete/organization-delete.component';

@Component({
    selector: 'organization-table',
    templateUrl: './organization-table.component.html',
    styleUrls: ['./organization-table.component.scss'],
})
export class OrganizationTableComponent extends OrganizationComponent {
    @Input()
    public organization: Organization;
    @Output() deleteOrganizationEvent: EventEmitter<Organization> = new EventEmitter();

    constructor(public dialog: MatDialog, public organizationService: OrganizationService, public appState: AppState) {
        super(dialog, organizationService, appState);
    }

    ngOnInit() {
        this.appState.prevButtonEvent.subscribe(() => {
            this.showPrevButton = true;
            console.log('OrganizationTableComponent showPrevButton: ', this.showPrevButton);
        });

    }

    public organizationEditDialog(organization) {
        let dialogRef = this.dialog.open(OrganizationEditComponent, {
            disableClose: true
        });
        dialogRef.componentInstance.organization = Object.assign({}, this.organization);

        // organization = dialogRef.componentInstance.organization = this.organizations;

        dialogRef.afterClosed().subscribe((organization) => {
            if (organization) {
                this.organizationService.updateOrganization(organization).subscribe(res => this.organization = organization);
            }

        });
    }

    public organizationDeleteDialog() {
        let dialogRef = this.dialog.open(OrganizationDeleteComponent, {
            disableClose: true
        });

        dialogRef.afterClosed().subscribe((confirm) => {
            if (confirm) {
                this.organizationService.deleteOrganization(this.organization).subscribe(success => {

                    if (success) {
                        this.deleteOrganizationEvent.emit(this.organization);
                    }

                });
            }
        });
    }

}
