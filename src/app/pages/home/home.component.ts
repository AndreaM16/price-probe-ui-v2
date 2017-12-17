import { Component } from '@angular/core';

/** rxjs **/
import { Observable } from 'rxjs/Observable';

/** 3rd party **/
import { Store } from '@ngrx/store';

/** ngrx **/
import { AppState } from '../../shared/interfaces/state.interface';
import { selectAllItems } from '../../shared/item/item.reducer';

/** App Models **/
import { Item } from '../../shared/item/item.model';
import * as itemActions from '../../shared/item/item.actions';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html'
})
export class HomeComponent {

  items$: Observable<Item[]>;

  constructor(private _store: Store<AppState>) {
    this.items$ = this._store.select(selectAllItems);
  }

  loadMore() {
    this._store.dispatch(new itemActions.LoadItemsAction);
  }


}
