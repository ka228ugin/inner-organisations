import { PersonComponent } from './person.component';

export const routes = [
  { path: '', children: [
    { path: '', component: PersonComponent }
  ]},
];
