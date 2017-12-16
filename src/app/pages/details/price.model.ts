export class PriceResponse {
  item: string;
  prices: PriceEntry[];
  constructor(priceJson: any) {
    this.item = priceJson.item;
    this.prices = priceJson.prices;
  }
}

export class PriceEntry {
  date: string;
  price: number;
}
