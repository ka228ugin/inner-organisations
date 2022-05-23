import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { routes } from './organization.routes';
import { OrganizationComponent } from './organization.component';

/*import {
  MatButtonModule,
  MatButtonToggleModule,
  MatIconModule,
  MatListModule,
  MatCardModule,
  MatDialogModule,
  MatInputModule,
  MatAutocompleteModule
} from '@angular/material';
 */
import {MatButtonModule} from '@angular/material/button';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import {MatInputModule} from '@angular/material/input';
import {MatIconModule} from '@angular/material/icon';
import {MatListModule} from '@angular/material/list';
import {MatCardModule} from '@angular/material/card';
import {MatDialogModule} from '@angular/material/dialog';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {OrganizationEditComponent} from '../dialogs/organization-edit/organization-edit.component';
import {OrganizationTableComponent} from '../+organization/organization-table/organization-table.component';
import {OrganizationThumbComponent} from '../+organization/organization-thumb/organization-thumb.component';
import {OrganizationAddComponent} from '../dialogs/organization-add/organization-add.component';
import {OrganizationDeleteComponent} from '../dialogs/organization-delete/organization-delete.component';
import {OrganizationDetailComponent} from './+organization-detail/organization-detail.component';
// tslint:disable-next-line:max-line-length
import {OrganizationDetailTableComponent} from './+organization-detail/organization-detail-table/organization-detail-table.component';
import {OrganizationDetailThumbComponent} from './+organization-detail/organization-detail-thumb/organization-detail-thumb.component';
// tslint:disable-next-line:max-line-length
import {PersonToOrganizationAddComponent} from '../dialogs/person-to-organization-add/person-to-organization-add.component';
import {PersonToOrganizationEditComponent} from '../dialogs/person-to-organization-edit/person-to-organization-edit.component';
// tslint:disable-next-line:max-line-length
import {PersonToOrganizationDeleteComponent} from '../dialogs/person-to-organization-delete/person-to-organization-delete.component';

console.log('`Organization` bundle loaded asynchronously');

@NgModule({
  declarations: [
    // Components / Directives/ Pipes
      OrganizationComponent,
      OrganizationEditComponent,
      OrganizationThumbComponent,
      OrganizationTableComponent,
      OrganizationDetailTableComponent,
      OrganizationDetailThumbComponent,
      OrganizationAddComponent,
      OrganizationDeleteComponent,
      OrganizationDetailComponent,
      PersonToOrganizationAddComponent,
      PersonToOrganizationEditComponent,
      PersonToOrganizationDeleteComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatIconModule,
    MatListModule,
    MatCardModule,
    MatDialogModule,
    MatInputModule,
    MatAutocompleteModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes),
  ],
    entryComponents: [
      OrganizationEditComponent,
      OrganizationAddComponent,
      OrganizationDeleteComponent,
      OrganizationDetailComponent,
      PersonToOrganizationAddComponent,
      PersonToOrganizationEditComponent,
      PersonToOrganizationDeleteComponent
  ]
})
export class OrganizationModule {
  public static routes = routes;
}
