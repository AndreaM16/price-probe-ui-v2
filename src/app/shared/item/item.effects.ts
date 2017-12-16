import { Injectable } from '@angular/core';

/** rxjs **/
import { map } from 'rxjs/operators/map';
import { mergeMap } from 'rxjs/operators/mergeMap';

/** 3rd party **/
import { Actions, Effect } from '@ngrx/effects';

/** ngrx **/
import * as homeActions from './item.actions';

/** App Models **/
import { Item, PaginatedItems } from './item.model';

/** App Services **/
import { ItemService } from './item.service';

/** App Interfaces **/
import { Pagination } from '../interfaces/pagination.interface';

@Injectable()
export class ItemEffects {

  pagination = {
    page: 0,
    size: 16
  } as Pagination;

  @Effect() loadItems$ = this._actions$
    .ofType(homeActions.LOAD_ITEMS)
    .pipe(
      mergeMap(() => {
        this.pagination.page++;
        return this._itemService.getPaginatedItems(this.pagination)
          .pipe(
            map((items: Item[]) => {
              return new homeActions.LoadItemsSuccessAction({
                page: this.pagination.page,
                items: items
              } as PaginatedItems);
            })
          );
      })
    )
  ;

  constructor(private _itemService: ItemService, private _actions$: Actions) { }
}
