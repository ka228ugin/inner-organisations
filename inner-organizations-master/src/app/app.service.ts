import { Injectable, EventEmitter } from '@angular/core';

export type InternalStateType = {
  [key: string]: any
};

@Injectable()
export class AppState {

  public _state: InternalStateType = { };
  public snackBarEvent: EventEmitter<boolean>;
  public sidenavEvent: EventEmitter<boolean>;
  public menuEvent: EventEmitter<boolean>;
  public prevButtonEvent: EventEmitter<boolean>;
  public presentationChangeEvent: EventEmitter<string>;
  // public titleChangeEvent: EventEmitter<string>;

  // already return a clone of the current state
  public get state() {
    return this._state = this._clone(this._state);
  }
  // never allow mutation
  public set state(value) {
    throw new Error('do not mutate the `.state` directly');
  }

  public get(prop?: any) {
    // use our state getter for the clone
    const state = this.state;

    return state.hasOwnProperty(prop) ? state[prop] : state;
  }

  public set(prop: string, value: any) {
    // internally mutate our state
    return this._state[prop] = value;
  }

  private _clone(object: InternalStateType) {
    // simple object clone
    return JSON.parse(JSON.stringify( object ));
  }

  constructor() {
    this.sidenavEvent = new EventEmitter();
    this.menuEvent = new EventEmitter();
    this.prevButtonEvent = new EventEmitter();
    this.snackBarEvent = new EventEmitter();
    this.presentationChangeEvent = new EventEmitter();
  }

  setState(prop: string, val: any): void {
    this.state[prop] = val;
    if (val === 'card' || val === 'table') {
      console.log(this.presentationChangeEvent);
      this.presentationChangeEvent.emit(val);
    } else { // TODO PROPER TITLE EMITTING
      // this.titleChangeEvent.emit(val);
    }
  }
  getState(prop: string) {
    return this.state[prop];
  }

}
