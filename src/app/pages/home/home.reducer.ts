/** 3rd party **/
import { createFeatureSelector, createSelector } from '@ngrx/store';

/** ngrx **/
import * as homeActions from './home.actions';

/** App Models **/
import { Item } from '../../shared/models/item.model';

export type Action = homeActions.All;

export interface HomeState {
  items: Item[];
  itemsByPage: Map<number, Item[]>;
}

export const initialState: HomeState = {
  items: [],
  itemsByPage: new Map<number, Item[]>(),
};

export const selectItems = createFeatureSelector<HomeState>('home');
export const selectAllItems = createSelector(selectItems, (state: HomeState) => {
  return state.items;
});

export function homeReducer(state: HomeState = initialState, action: Action): HomeState {
  switch (action.type) {
    case homeActions.LOAD_ITEMS_SUCCESS:
      let itemsByPayloadPage = this.itemsByPage.get(action.payload.page);
      if ( itemsByPayloadPage === undefined || !itemsByPayloadPage ) {
        this.itemsByPage.set(action.payload.page, action.payload.items);
        itemsByPayloadPage = state.items.concat(itemsByPayloadPage);
      } else {
        itemsByPayloadPage = state.items;
      }
      return {
        ...state,
        items: [...itemsByPayloadPage],
        itemsByPage: new Map(this.itemsByPage)
      };
    default:
      return {
        ...state
      };
  }
}
