import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { routes } from './person.routes';
import {PersonComponent} from './person.component';

/*import {
  MatButtonModule,
  MatButtonToggleModule,
  MatIconModule,
  MatListModule,
  MatCardModule,
  MatDialogModule,
  MatInputModule,
  MatAutocompleteModule
}
from '@angular/material';*/
import {MatButtonModule} from '@angular/material/button';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import {MatIconModule} from '@angular/material/icon';
import {MatListModule} from '@angular/material/list';
import {MatCardModule} from '@angular/material/card';
import {MatDialogModule} from '@angular/material/dialog';
import {MatInputModule} from '@angular/material/input';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {PersonEditComponent} from '../dialogs/person-edit/person-edit.component';
import {PersonThumbComponent} from './person-thumb/person-thumb.component';
import {PersonTableComponent} from './person-table/person-table.component';
import {PersonAddComponent} from '../dialogs/person-add/person-add.component';
import {PersonDeleteComponent} from '../dialogs/person-delete/person-delete.component';

console.log('`Organization` bundle loaded asynchronously');

@NgModule({
  declarations: [
    // Components / Directives/ Pipes
    PersonComponent,
    PersonThumbComponent,
    PersonTableComponent,
    PersonEditComponent,
    PersonAddComponent,
    PersonDeleteComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatIconModule,
    MatListModule,
    MatCardModule,
    MatDialogModule,
    MatInputModule,
      MatAutocompleteModule,
    RouterModule.forChild(routes),
  ],
  entryComponents: [
    PersonEditComponent,
    PersonAddComponent,
    PersonDeleteComponent
  ]
})
export class PersonModule {
  public static routes = routes;
}
