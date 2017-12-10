import { Component } from '@angular/core';

/** rxjs **/
import { Observable } from 'rxjs/Observable';

/** 3rd party **/
import { Store } from '@ngrx/store';

/** ngrx **/
import { AppState } from '../../shared/interfaces/state.interface';
import { selectAllItems } from './home.reducer';

/** App Models **/
import { Item } from '../../shared/models/item.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html'
})
export class HomeComponent {

  items$: Observable<Item[]>;

  constructor(private _store: Store<AppState>) {
    this.items$ = this._store.select(selectAllItems);
  }

}
