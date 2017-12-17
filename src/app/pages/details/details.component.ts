import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Params} from '@angular/router';

/** rxjs **/
import { Observable } from 'rxjs/Observable';

/** 3rd party **/
import { Store } from '@ngrx/store';

/** ngrx **/
import { AppState } from '../../shared/interfaces/state.interface';
import {selectCurrentItem, selectCurrentChartData} from '../../shared/item/item.reducer';
import * as itemActions from '../../shared/item/item.actions';

/** App Models **/
import {Item, ItemRequest} from '../../shared/item/item.model';
import {ChartDataModel} from './price.model';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit {

  item$: Observable<Item>;
  chartData$: Observable<ChartDataModel>;
  // NGX
  view = [1000, 600];
  xAxisLabel = 'Dates';
  yAxisLabel = 'Prices';
  colorScheme = {
    domain: ['#f0ad4e', '#337ab7', '#C7B42C', '#AAAAAA']
  };

  constructor(private store: Store<AppState>, private route: ActivatedRoute) {
    this.item$ = this.store.select(selectCurrentItem);
    this.chartData$ = this.store.select(selectCurrentChartData);
  }

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      if ( params !== undefined && params !== null && params.id !== undefined && params.id.length ) {
        this.store.dispatch(new itemActions.LoadCurrentItemAction(
          params.id
        ));
        this.store.dispatch(new itemActions.LoadPricesByItemAction({item: params.id} as ItemRequest));
      }
    });
  }

  goToAmazon(item: Item) {
    if (item !== undefined && item.url && item.url.length) {
      window.open(item.url);
    }
  }

}
