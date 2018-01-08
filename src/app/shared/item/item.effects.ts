import { Injectable } from '@angular/core';

/** rxjs **/
import { map } from 'rxjs/operators/map';
import { mergeMap } from 'rxjs/operators/mergeMap';

/** 3rd party **/
import { Actions, Effect } from '@ngrx/effects';

/** ngrx **/
import * as itemActions from './item.actions';

/** App Models **/
import {Item, ItemRequest, PaginatedItems} from './item.model';
import { PriceResponse, ForecastResponse } from '../../pages/details/price.model';

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
    .ofType(itemActions.LOAD_ITEMS)
    .pipe(
      mergeMap(() => {
        this.pagination.page++;
        return this._itemService.getPaginatedItems(this.pagination)
          .pipe(
            map((items: Item[]) => {
              return new itemActions.LoadItemsSuccessAction({
                page: this.pagination.page,
                items: items
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
        return this._itemService.getItemByPid({item : (<any>action).payload} as ItemRequest)
          .pipe(
            map((itemJson: any) => {
              return new itemActions.LoadCurrentItemSuccessAction(new Item(itemJson));
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

  constructor(private _itemService: ItemService, private _actions$: Actions) { }
}
