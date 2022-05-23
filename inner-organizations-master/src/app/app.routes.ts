import { Routes } from '@angular/router';
import { NoContentComponent } from './no-content';

import { DataResolver } from './app.resolver';

export const ROUTES: Routes = [
  { path: '', loadChildren: './+organization#OrganizationModule'},
  { path: 'person', loadChildren: './+person#PersonModule'},
  { path: 'organization', loadChildren: './+organization#OrganizationModule'},
  { path: '**',    component: NoContentComponent },
];
