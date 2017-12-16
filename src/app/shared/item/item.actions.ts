import { Action } from '@ngrx/store';

/** App Models **/
import {Item, ItemRequest, PaginatedItems} from './item.model';

export const LOAD_ITEMS = '[Item] Load Items';
export const LOAD_ITEMS_SUCCESS = '[Item] Load Item Success';
export const LOAD_CURRENT_ITEM = '[Item] Load Current Item';
export const LOAD_CURRENT_ITEM_SUCCESS = '[Item] Load Current Item Success';

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

export type All
  = LoadItemsAction
  | LoadItemsSuccessAction
  | LoadCurrentItemAction
  | LoadCurrentItemSuccessAction;
