import { Action } from '@ngrx/store';

/** App Models **/
import {Item, ItemRequest, PaginatedItems} from './item.model';
import { PriceResponse } from '../../pages/details/price.model';

export const LOAD_ITEMS = '[Item] Load Items';
export const LOAD_ITEMS_SUCCESS = '[Item] Load Item Success';
export const LOAD_CURRENT_ITEM = '[Item] Load Current Item';
export const LOAD_CURRENT_ITEM_SUCCESS = '[Item] Load Current Item Success';
export const LOAD_PRICES_BY_ITEM = '[Item] Load Prices By Item';
export const LOAD_PRICES_BY_ITEM_SUCCESS = '[Item] Load Prices By Item Success';
export const LOAD_FORECAST_BY_ITEM = '[Item] Load Forecast By Item';
export const LOAD_FORECAST_BY_ITEM_SUCCESS = '[Item] Load Forecast By Item Success';

export class LoadItemsAction implements Action {
  readonly type = LOAD_ITEMS;
}

export class LoadItemsSuccessAction implements Action {
  readonly type = LOAD_ITEMS_SUCCESS;
  constructor(public payload: PaginatedItems) { }
}

export class LoadCurrentItemAction implements Action {
  readonly type = LOAD_CURRENT_ITEM;
  constructor(public payload: ItemRequest) { }
}

export class LoadCurrentItemSuccessAction implements Action {
  readonly type = LOAD_CURRENT_ITEM_SUCCESS;
  constructor(public payload: Item) { }
}

export class LoadPricesByItemAction implements Action {
  readonly type = LOAD_PRICES_BY_ITEM;
  constructor(public payload: ItemRequest) { }
}

export class LoadPricesByItemSuccessAction implements Action {
  readonly type = LOAD_PRICES_BY_ITEM_SUCCESS;
  constructor(public payload: PriceResponse) { }
}

export class LoadForecastByItemAction implements Action {
  readonly type = LOAD_FORECAST_BY_ITEM;
  constructor(public payload: ItemRequest) { }
}

export class LoadForecastByItemSuccessAction implements Action {
  readonly type = LOAD_FORECAST_BY_ITEM_SUCCESS;
  constructor(public payload: PriceResponse) { }
}

export type All
  = LoadItemsAction
  | LoadItemsSuccessAction
  | LoadCurrentItemAction
  | LoadCurrentItemSuccessAction
  | LoadPricesByItemAction
  | LoadPricesByItemSuccessAction
  | LoadForecastByItemAction
  | LoadForecastByItemSuccessAction;
