/** 3rd party **/
import { createFeatureSelector, createSelector } from '@ngrx/store';

/** ngrx **/
import * as itemActions from './item.actions';

/** App Models **/
import { Item } from './item.model';
import {ChartDataModel, SerieEntry} from '../../pages/details/price.model';

export type Action = itemActions.All;

export interface ItemState {
  items: Item[];
  itemsByPage: Map<number, Item[]>;
  currentItem: Item;
  chartData: ChartDataModel;]
  hasNext: boolean;
}

export const initialState: ItemState = {
  items: [],
  itemsByPage: new Map<number, Item[]>(),
  currentItem: {} as Item,
  chartData: new ChartDataModel([
      {
        name: 'prices',
        series: []
      },
      {
        name: 'forecast',
        series: []
      }
  ]),
  hasNext: true
};

export const selectItems = createFeatureSelector<ItemState>('item');
export const selectAllItems = createSelector(selectItems, (state: ItemState) => {
  return state.items;
});
export const selectCurrentItem = createSelector(selectItems, (state: ItemState) => {
  return state.currentItem;
});
export const selectCurrentChartData = createSelector(selectItems, (state: ItemState) => {
  return state.chartData;
});
export const selectHasNextPaginatedItems = createSelector(selectItems, (state: ItemState) => {
  return state.hasNext;
});

export const uniqueByPriceInConsecutiveDays = (arr: Array<any>, tmp: Array<any>, index: number) => {
  if ( tmp.indexOf(0) === undefined) {
    tmp = tmp.concat(arr[index]);
  }
  if ( arr.length === index + 1 ) {
    return tmp.concat(arr[index]);
  }
  if ( arr[index] !== undefined && arr[index].price !== arr[index + 1].price ) {
    tmp = tmp.concat(arr[index]);
  }
  return uniqueByPriceInConsecutiveDays(arr, tmp, index + 1);
};

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
    case itemActions.LOAD_PRICES_BY_ITEM_SUCCESS:
      const uniquePrices = uniqueByPriceInConsecutiveDays(action.payload.prices, [],  0);
      const tmpPricesChartData = new ChartDataModel([
        {
          name: 'prices',
          series: uniquePrices.map((price) => new SerieEntry(price))
        },
        {
          name: 'forecast',
          series: [...state.chartData.data[1].series]
        },
      ]);
      return {
        ...state,
        chartData: tmpPricesChartData
      };
    case itemActions.LOAD_FORECAST_BY_ITEM_SUCCESS:
      const tmpForecastChartData = new ChartDataModel([
        {
          name: 'prices',
          series: [...state.chartData.data[0].series]
        },
        {
          name: 'forecast',
          series: action.payload.prices.map((price) => new SerieEntry(price))
        }
      ]);
      return {
        ...state,
        chartData: tmpForecastChartData
      };
    case itemActions.LOAD_CURRENT_ITEM_HAS_NEXT_SUCCESS:
      return {
        ...state,
        hasNext: action.payload
      };
    default:
      return {
        ...state
      };
  }
}
