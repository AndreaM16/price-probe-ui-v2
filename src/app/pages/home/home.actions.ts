import { Action } from '@ngrx/store';

/** App Models **/
import { PaginatedItems } from '../../shared/models/item.model';

export const LOAD_ITEMS = '[Item] Load Items';
export const LOAD_ITEMS_SUCCESS = '[Item] Load Item Success';

export class LoadItemsAction implements Action {
  readonly type = LOAD_ITEMS;
}

export class LoadItemsSuccessAction implements Action {
  readonly type = LOAD_ITEMS_SUCCESS;
  constructor(public payload: PaginatedItems) { }
}

export type All
  = LoadItemsAction
  | LoadItemsSuccessAction;
