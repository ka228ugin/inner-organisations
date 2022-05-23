import {
    Component,
    OnInit,
} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { Organization } from './organization.model';
import { OrganizationService } from './organization.service';
import { AppState } from '../app.service';
import { OrganizationEditComponent } from '../dialogs/organization-edit/organization-edit.component';
import {OrganizationAddComponent} from '../dialogs/organization-add/organization-add.component';
import {OrganizationDeleteComponent} from '../dialogs/organization-delete/organization-delete.component';
import {Person} from '../+person/person.model';

/*
 * We're loading this component asynchronously
 * We are using some magic with es6-promise-loader that will wrap the module with a Promise
 * see https://github.com/gdi2290/es6-promise-loader for more info
 */

console.log('`Organization` component loaded asynchronously');

@Component({
    selector: 'organization',
    templateUrl: './organization.component.html',
})

export class OrganizationComponent implements OnInit {
    public person: Person[];
    public organizations: Organization[];
    public presentation: string;
    public showPrevButton: boolean;
    public presentationSubscription: Subscription;

    constructor(public dialog: MatDialog, public organizationService: OrganizationService,
                public appState: AppState) {
        this.presentationSubscription = appState.presentationChangeEvent.asObservable()
            .subscribe(presentation => {
                this.presentation = presentation;
            });
    }

    public ngOnInit(): void {
        this.organizationService.getorganizations()
            .subscribe((organizations: Organization[]) => {
                this.organizations = organizations;
            });
        this.presentation = this.appState.getState('presentation') || 'card';
    }

    public organizationAddDialog() {

        let dialogRef = this.dialog.open(OrganizationAddComponent, {
            disableClose: true
        });

        dialogRef.componentInstance.organization = {name: '', phone: ''};

        dialogRef.afterClosed().subscribe((organization) => {
            if (organization) {
                this.organizationService.addOrganization(organization).subscribe(res => this.organizations.push(organization));
                this.organizationService.getorganizations()
                    .subscribe((organizations: Organization[]) => {
                        this.organizations = organizations;
                    });
            }

        });
    }

    public organizationEditDialog(organization) {
        let dialogRef = this.dialog.open(OrganizationEditComponent, {
            disableClose: true
        });
        dialogRef.componentInstance.organization = organization;

        dialogRef.afterClosed().subscribe((organization) => {
            if (organization) {
                this.organizationService.updateOrganization(organization).subscribe(res => console.log(res));
                this.organizationService.getorganizations()
                    .subscribe((organizations: Organization[]) => {
                        this.organizations = organizations;
                    });
            }

        });
    }

    public deleteOrganization(organization) {
        const index = this.organizations.indexOf(organization);
        this.organizations.splice(index, 1);
    }
}
