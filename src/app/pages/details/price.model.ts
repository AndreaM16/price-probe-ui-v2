export class ForecastResponse {
  item: string;
  name: string;
  score: number;
  test_size: string;
  prices: ForecastEntry[];
  constructor(priceJson: any) {
    this.item = priceJson.item ? priceJson.item : '';
    this.name = priceJson.name ? priceJson.name : '';
    this.score = priceJson.score ? priceJson.score : 0.0;
    this.score = priceJson.test_size ? priceJson.test_size : '';
    this.prices = priceJson.forecast_entries ? priceJson.forecast_entries.map((price) => new ForecastEntry(price)) : [];
  }
}

export class ForecastEntry {
  date: string;
  price: number;
  constructor(priceEntryJson: any) {
    this.date = priceEntryJson.date;
    this.price = priceEntryJson.price;
  }
}

export class PriceResponse {
  item: string;
  prices: PriceEntry[];
  constructor(priceJson: any) {
    this.item = priceJson.item;
    this.prices = priceJson.prices.map((price) => new PriceEntry(price));
  }
}

export class PriceEntry {
  date: string;
  price: number;
  constructor(priceEntryJson: any) {
    this.date = priceEntryJson.date;
    this.price = priceEntryJson.price;
  }
}

export class ChartDataModel {
  public data: Serie[];
  constructor(data: Serie[]) {
    this.data = data;
  }
}

export class Serie {
  public name: string;
  public series: SerieEntry[];
}

export class SerieEntry {
  public name: string;
  public value: number;
  constructor(price: PriceEntry) {
    this.name = price.date;
    this.value = price.price;
  }
}
