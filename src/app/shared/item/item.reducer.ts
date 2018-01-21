/** 3rd party **/
import { createFeatureSelector, createSelector } from '@ngrx/store';

/** ngrx **/
import * as itemActions from './item.actions';

/** App Models **/
import { Item } from './item.model';
import {ChartDataModel, ForecastResponse, SerieEntry} from '../../pages/details/price.model';

export type Action = itemActions.All;

export interface ItemState {
  items: Item[];
  itemsByPage: Map<number, Item[]>;
  currentItem: Item;
  flattenChartData: ChartDataModel;
  fullChartData: ChartDataModel;
  currentForecast: ForecastResponse;
  hasNext: boolean;
}

export const initialState: ItemState = {
  items: [],
  itemsByPage: new Map<number, Item[]>(),
  currentItem: {} as Item,
  flattenChartData: new ChartDataModel([
      {
        name: 'prices',
        series: []
      },
      {
        name: 'forecast',
        series: []
      }
  ]),
  fullChartData: new ChartDataModel([
    {
      name: 'prices',
      series: []
    },
    {
      name: 'forecast',
      series: []
    }
  ]),
  currentForecast: new ForecastResponse({}),
  hasNext: true
};

export const selectItems = createFeatureSelector<ItemState>('item');
export const selectAllItems = createSelector(selectItems, (state: ItemState) => {
  return state.items;
});
export const selectCurrentItem = createSelector(selectItems, (state: ItemState) => {
  return state.currentItem;
});
export const selectCurrentFlattenChartData = createSelector(selectItems, (state: ItemState) => {
  return state.flattenChartData;
});
export const selectCurrentFullChartData = createSelector(selectItems, (state: ItemState) => {
  return state.fullChartData;
});
export const selectHasNextPaginatedItems = createSelector(selectItems, (state: ItemState) => {
  return state.hasNext;
});
export const selectCurrentForecast = createSelector(selectItems, (state: ItemState) => {
  return state.currentForecast;
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
      const tmpFlattenPricesChartData = new ChartDataModel([
        {
          name: 'prices',
          series: uniquePrices.map((price) => new SerieEntry(price))
        },
        {
          name: 'forecast',
          series: [...state.flattenChartData.data[1].series]
        },
      ]);
      const tmpFullPricesChartData = new ChartDataModel([
        {
          name: 'prices',
          series: action.payload.prices.map((price) => new SerieEntry(price))
        },
        {
          name: 'forecast',
          series: [...state.flattenChartData.data[1].series]
        },
      ]);
      return {
        ...state,
        fullChartData: tmpFullPricesChartData,
        flattenChartData: tmpFlattenPricesChartData
      };
    case itemActions.LOAD_FORECAST_BY_ITEM_SUCCESS:
      const tmpFlattenForecastChartData = new ChartDataModel([
        {
          name: 'prices',
          series: [...state.flattenChartData.data[0].series]
        },
        {
          name: 'forecast',
          series: action.payload.prices.map((price) => new SerieEntry(price))
        }
      ]);
      const tmpFullForecastChartData = new ChartDataModel([
        {
          name: 'prices',
          series: [...state.fullChartData.data[0].series]
        },
        {
          name: 'forecast',
          series: action.payload.prices.map((price) => new SerieEntry(price))
        }
      ]);
      return {
        ...state,
        flattenChartData: tmpFlattenForecastChartData,
        fullChartData: tmpFullForecastChartData,
        currentForecast: action.payload
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
