import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Params} from '@angular/router';

/** rxjs **/
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';

/** 3rd party **/
import { Store } from '@ngrx/store';

/** ngrx **/
import { AppState } from '../../shared/interfaces/state.interface';
import {selectCurrentItem, selectCurrentChartData, selectCurrentForecast} from '../../shared/item/item.reducer';
import * as itemActions from '../../shared/item/item.actions';

/** App Models **/
import {Item, ItemRequest} from '../../shared/item/item.model';
import {ChartDataModel, ForecastResponse} from './price.model';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit {

  item$: Observable<Item>;
  chartData$: Observable<ChartDataModel>;
  currentForecast$: Observable<ForecastResponse>;
  // NGX
  view = [1000, 600];
  xAxisLabel = 'Dates';
  yAxisLabel = 'Prices';
  colorScheme = {
    domain: ['#f0ad4e', '#337ab7', '#C7B42C', '#AAAAAA']
  };

  constructor(private store: Store<AppState>, private route: ActivatedRoute) {
    this.item$ = this.store.select(selectCurrentItem);
    this.currentForecast$ = this.store.select(selectCurrentForecast);
    this.store.select(selectCurrentChartData).subscribe(chartData => {
      if ( chartData.data[0].series.length > 0 && chartData.data[1].series.length ) {
        const pricesSerie = chartData.data[0].series;
        const forecastSerie = chartData.data[1].series;
        let finalPricesSerie = [];
        forecastSerie.forEach(f => {
          for (let i = 0; i <= pricesSerie.length - 1; i++) {
            if ( f.name !== undefined && pricesSerie[i].name !== undefined ) {
              if ( f.name === pricesSerie[i].name || pricesSerie[i].name < f.name ) {
                finalPricesSerie = finalPricesSerie.concat(pricesSerie[i]);
              }
              if ( pricesSerie[i + 1] !== undefined && pricesSerie[i + 1].name !== undefined &&
                   f.name > pricesSerie[i].name && f.name < pricesSerie[i + 1].name ) {
                finalPricesSerie = finalPricesSerie.concat({
                  name: f.name,
                  value: (pricesSerie[i].value + pricesSerie[i + 1].value) / 2
                });
              }
            }
          }
        });

        this.chartData$ = of({
          data: [
            {
              name: 'prices',
              series: finalPricesSerie
            },
            {
              name: 'forecast',
              series: forecastSerie
            }
          ]
        });
      } else if (chartData.data[0].series.length > 0) {
        this.chartData$ = of({
          data: [
            {
              name: 'prices',
              series: chartData.data[0].series
            },
            {
              name: 'forecast',
              series: []
            }
          ]
        });
      }
    });
  }

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      if ( params !== undefined && params !== null && params.id !== undefined && params.id.length ) {
        this.store.dispatch(new itemActions.LoadCurrentItemAction(
          params.id
        ));
        this.store.dispatch(new itemActions.LoadPricesByItemAction({item: params.id} as ItemRequest));
        this.store.dispatch(new itemActions.LoadForecastByItemAction({item: params.id} as ItemRequest));
      }
    });
  }

  goToAmazon(item: Item) {
    if (item !== undefined && item.url && item.url.length) {
      window.open(item.url);
    }
  }

}
