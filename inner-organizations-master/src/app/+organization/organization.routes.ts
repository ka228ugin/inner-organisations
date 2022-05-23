import { OrganizationComponent } from './organization.component';
import {OrganizationDetailComponent} from './+organization-detail/organization-detail.component';

export const routes = [
  { path: '', children: [
    { path: '', component: OrganizationComponent },
    { path: 'organization-detail/:id', component: OrganizationDetailComponent }
  ]},
];
