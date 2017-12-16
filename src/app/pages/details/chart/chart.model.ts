/** App Models **/
import {PriceEntry} from '../price.model';

export class ChartDataModel {
  public data: SerieModel[];
  constructor(data:  SerieModel[]) {
    this.data = data;
  }
}

export class SerieModel {
  public name: string;
  public series: PriceEntry[];
  constructor(name:  string, series: PriceEntry[]) {
    this.name = name;
    this.series = series;
  }
}
