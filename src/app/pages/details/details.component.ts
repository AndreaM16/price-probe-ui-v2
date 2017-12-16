import { Component } from '@angular/core';
import {ActivatedRoute, Params} from '@angular/router';

/** 3rd party **/
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { Store } from '@ngrx/store';

/** ngrx **/
import { AppState } from '../../shared/interfaces/state.interface';
import { selectCurrentItem } from '../../shared/item/item.reducer';
import * as itemActions from '../../shared/item/item.actions';

/** App Models **/
import { Item } from '../../shared/item/item.model';
import { ChartDataModel } from './chart/chart.model';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss'],
  providers: [NgxChartsModule]
})
export class DetailsComponent {

  item: Item;
  // NGX
  ngxData: ChartDataModel = {
    data: [
      {
        name: 'prices',
        series: []
      }
    ]
  };
  view: any[] = [1000, 600];
  showXAxis = true;
  showYAxis = true;
  gradient = false;
  showLegend = true;
  showXAxisLabel = true;
  xAxisLabel = 'Dates';
  showYAxisLabel = true;
  yAxisLabel = 'Prices';
  colorScheme = {
    domain: ['#f0ad4e', '#337ab7', '#C7B42C', '#AAAAAA']
  };
  autoScale = true;

  constructor(private store: Store<AppState>, private route: ActivatedRoute) {
    if ( this.item === undefined || this.item.id === undefined || this.item.id.length === 0 ) {
      this.store.select(selectCurrentItem).subscribe((item) => {
        if (item !== undefined && item.id !== undefined && item.id.length) {
          this.item = item;
        } else {
          this.route.params.subscribe((params: Params) => {
            if ( params !== undefined && params !== null && params.id !== undefined && params.id.length ) {
              this.store.dispatch(new itemActions.LoadCurrentItemAction(
                params.id
              ));
            }
          });
        }
      });
    }
  }

  goToAmazon(item: Item) {
    if (item !== undefined && item.url && item.url.length) {
      window.open(item.url);
    }
  }

}
