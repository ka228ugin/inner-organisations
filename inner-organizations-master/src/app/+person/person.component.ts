import {
  Component,
  OnInit,
} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';

import { Person } from './person.model';
import { PersonService } from './person.service';
import { AppState } from '../app.service';
import { Subscription } from 'rxjs';
import { PersonEditComponent } from '../dialogs/person-edit/person-edit.component';
import {PersonAddComponent} from '../dialogs/person-add/person-add.component';
import {PersonDeleteComponent} from '../dialogs/person-delete/person-delete.component';

/*
 * We're loading this component asynchronously
 * We are using some magic with es6-promise-loader that will wrap the module with a Promise
 * see https://github.com/gdi2290/es6-promise-loader for more info
 */

console.log('`Person` component loaded asynchronously');

@Component({
  selector: 'person',
  templateUrl: './person.component.html',
})

export class PersonComponent implements OnInit {
  public persons: Person[];
  public presentation: string;
  public showPrevButton: boolean;
  private presentationSubscription: Subscription;

  constructor(public dialog: MatDialog, public personService: PersonService,
              public appState: AppState) {
    this.presentationSubscription = appState.presentationChangeEvent.asObservable()
        .subscribe(presentation => {
          this.presentation = presentation;
        });
  }

  public ngOnInit(): void {
    this.appState.prevButtonEvent.subscribe(() => {
      this.showPrevButton = true;
    });

    this.personService.getPersons()
        .subscribe((persons: Person[]) => {
          this.persons = persons;
        });
    this.presentation = this.appState.getState('presentation') || 'card';
    console.log('hello `Person` component');
  }

  public personAddDialog(person) {
    let dialogRef = this.dialog.open(PersonAddComponent, {
      disableClose: true
    });

    dialogRef.componentInstance.person = {};

      dialogRef.afterClosed().subscribe((person) => {
        if (person) {
          this.personService.addPerson(person).subscribe(res => this.persons.push(person));
          this.personService.getPersons()
              .subscribe((persons: Person[]) => {
                this.persons = persons;
              });
        }

      });
  }

  public personEditDialog(person) {
    let dialogRef = this.dialog.open(PersonEditComponent, {
      disableClose: true
    });

    dialogRef.componentInstance.person = person;

      dialogRef.afterClosed().subscribe((person) => {
        if (person) {
          this.personService.updatePerson(person).subscribe(res => console.log(res));
          this.personService.getPersons()
              .subscribe((persons: Person[]) => {
                this.persons = persons;
              });
        }

      });
  }

  public deletePerson(person) {
    const index = this.persons.indexOf(person);
    this.persons.splice(index, 1);
  }

}
