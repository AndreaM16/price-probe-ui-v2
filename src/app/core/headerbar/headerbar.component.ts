import { Component } from '@angular/core';
import { Router } from '@angular/router';

/** rxjs **/
import { Subject } from 'rxjs/Subject';
import { of } from 'rxjs/observable/of';

/** 3rd party **/
import { Store } from '@ngrx/store';

/** ngrx **/
import { AppState } from '../../shared/interfaces/state.interface';
import * as ItemActions from '../../shared/item/item.actions';

/** App Models **/
import { ItemRequest } from '../../shared/item/item.model';

@Component({
  selector: 'app-header-bar',
  templateUrl: './headerbar.component.html',
  styleUrls: ['./headerbar.component.scss']
})

export class HeaderbarComponent {

  search = '';
  searchInputChange$ = new Subject<string>();

  constructor(private router: Router, private store: Store<AppState>) {
    this.searchInputChange$
      .switchMap((text) => of(text))
      .subscribe(text => {
        this.store.dispatch(new ItemActions.LoadCurrentItemAction({item : text} as ItemRequest));
      })
    ;
  }

  goToHomePage() {
    this.router.navigate(['app/home']);
  }

}
