import { Component } from '@angular/core';

/** rxjs **/
import { Observable } from 'rxjs/Observable';

/** 3rd party **/
import { Store } from '@ngrx/store';

/** ngrx **/
import { AppState } from '../../shared/interfaces/state.interface';
import { selectCurrentItem } from '../../shared/item/item.reducer';

/** App Models **/
import { Item } from '../../shared/item/item.model';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html'
})
export class DetailsComponent {

  item$: Observable<Item>;

  constructor(private store: Store<AppState>) {
    this.item$ = this.store.select(selectCurrentItem);
  }

}
