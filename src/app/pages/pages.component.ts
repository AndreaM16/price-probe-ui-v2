import { Component, OnInit } from '@angular/core';

/** 3rd party **/
import { Store } from '@ngrx/store';

/** ngrx **/
import { AppState } from '../shared/interfaces/state.interface';
import * as itemActions from '../shared/item/item.actions';

@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html'
})

export class PagesComponent implements OnInit {

  constructor(private _store: Store<AppState>) { }

  ngOnInit() {
    this._store.dispatch(new itemActions.LoadItemsAction);
  }

}
