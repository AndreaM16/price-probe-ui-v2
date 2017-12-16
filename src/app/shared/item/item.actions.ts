import { Action } from '@ngrx/store';

/** App Models **/
import { Item, PaginatedItems } from './item.model';

export const LOAD_ITEMS = '[Item] Load Items';
export const LOAD_ITEMS_SUCCESS = '[Item] Load Item Success';
export const SET_CURRENT_ITEM = '[Item] Set Current Item';

export class LoadItemsAction implements Action {
  readonly type = LOAD_ITEMS;
}

export class LoadItemsSuccessAction implements Action {
  readonly type = LOAD_ITEMS_SUCCESS;
  constructor(public payload: PaginatedItems) { }
}

export class SetCurrentItemAction implements Action {
  readonly type = SET_CURRENT_ITEM;
  constructor(public payload: Item) { }
}

export type All
  = LoadItemsAction
  | LoadItemsSuccessAction
  | SetCurrentItemAction;
