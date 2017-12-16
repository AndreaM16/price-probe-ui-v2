/** 3rd party **/
import { createFeatureSelector, createSelector } from '@ngrx/store';

/** ngrx **/
import * as itemActions from './item.actions';

/** App Models **/
import { Item } from './item.model';

export type Action = itemActions.All;

export interface ItemState {
  items: Item[];
  itemsByPage: Map<number, Item[]>;
  currentItem: Item;
}

export const initialState: ItemState = {
  items: [],
  itemsByPage: new Map<number, Item[]>(),
  currentItem: {} as Item
};

export const selectItems = createFeatureSelector<ItemState>('item');
export const selectAllItems = createSelector(selectItems, (state: ItemState) => {
  return state.items;
});
export const selectCurrentItem = createSelector(selectItems, (state: ItemState) => {
  return state.currentItem;
});

export function itemReducer(state: ItemState = initialState, action: Action): ItemState {
  switch (action.type) {
    case itemActions.LOAD_ITEMS_SUCCESS:
      const currentItemsByPage = new Map(state.itemsByPage);
      let itemsByPayloadPage = currentItemsByPage.get(action.payload.page);
      if ( itemsByPayloadPage === undefined || !itemsByPayloadPage ) {
        currentItemsByPage.set(action.payload.page, action.payload.items);
        itemsByPayloadPage = state.items.concat(action.payload.items);
      } else {
        itemsByPayloadPage = state.items;
      }
      return {
        ...state,
        items: [...itemsByPayloadPage],
        itemsByPage: new Map(currentItemsByPage)
      };
    case itemActions.LOAD_CURRENT_ITEM_SUCCESS:
      return {
        ...state,
        currentItem: action.payload
      };
    default:
      return {
        ...state
      };
  }
}
