import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

/** rxjs **/
import { map } from 'rxjs/operators/map';
import { mergeMap } from 'rxjs/operators/mergeMap';

/** 3rd party **/
import { Actions, Effect } from '@ngrx/effects';
import { Store } from '@ngrx/store';

/** ngrx **/
import * as itemActions from './item.actions';

/** App Models **/
import {Item, ItemRequest, PaginatedItems, PaginatedItemsResponse} from './item.model';
import { PriceResponse, ForecastResponse } from '../../pages/details/price.model';

/** App Services **/
import { ItemService } from './item.service';

/** App Interfaces **/
import { Pagination } from '../interfaces/pagination.interface';
import {AppState} from '../interfaces/state.interface';

@Injectable()
export class ItemEffects {

  pagination = {
    page: 0,
    size: 16
  } as Pagination;

  @Effect() loadItems$ = this._actions$
    .ofType(itemActions.LOAD_ITEMS)
    .pipe(
      mergeMap(() => {
        this.pagination.page++;
        return this._itemService.getPaginatedItems(this.pagination)
          .pipe(
            map((paginatedItemsResponse: PaginatedItemsResponse) => {
              this.store.dispatch(new itemActions.LoadCurrentItemHasNextSuccessAction(paginatedItemsResponse.has_next));
              return new itemActions.LoadItemsSuccessAction({
                page: this.pagination.page,
                items: paginatedItemsResponse.items
              } as PaginatedItems);
            })
          );
      })
    )
  ;

  @Effect() loadCurrentItem$ = this._actions$
    .ofType(itemActions.LOAD_CURRENT_ITEM)
    .pipe(
      mergeMap((action) => {
        const request = (<any>action).payload.item ? (<any>action).payload : {item : (<any>action).payload} as ItemRequest;
        return this._itemService.getItemByPid(request)
          .pipe(
            map((itemJson: any) => {
              const item = new Item(itemJson);
              this.router.navigate(['app/details', item.id]);
              return new itemActions.LoadCurrentItemSuccessAction(item);
            })
          );
      })
    )
  ;

  @Effect() loadPricesByItem$ = this._actions$
    .ofType(itemActions.LOAD_PRICES_BY_ITEM)
    .pipe(
      mergeMap((action) => {
        return this._itemService.getPricesByPid((<any>action).payload)
          .pipe(
            map((priceResponse: PriceResponse) => {
              return new itemActions.LoadPricesByItemSuccessAction(priceResponse);
            })
          );
      })
    )
  ;

  @Effect() loadForecastByItem$ = this._actions$
    .ofType(itemActions.LOAD_FORECAST_BY_ITEM)
    .pipe(
      mergeMap((action) => {
        return this._itemService.getForecastByPid((<any>action).payload)
          .pipe(
            map((forecastResponse: ForecastResponse) => {
              return new itemActions.LoadForecastByItemSuccessAction(forecastResponse);
            })
          );
      })
    )
  ;

  constructor(
    private _itemService: ItemService, private _actions$: Actions,
    private router: Router, private store: Store<AppState>
  ) { }
}
