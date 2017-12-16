export class Item {
  id: string;
  manufacturer: string;
  image: string;
  url: string;
  description: string;
  title: string;
  hasReviews: boolean;
  constructor(itemJsonEntry: any) {
    this.id = itemJsonEntry.item ? itemJsonEntry.item : '';
    this.manufacturer = itemJsonEntry.manufacturer ? itemJsonEntry.manufacturer : 'no_manufacturer';
    this.image = itemJsonEntry.image ? itemJsonEntry.image : '';
    this.url = itemJsonEntry.url ? itemJsonEntry.url : '';
    this.description = itemJsonEntry.description ? itemJsonEntry.description : '';
    this.title = itemJsonEntry.title ? itemJsonEntry.title : '';
    this.hasReviews = itemJsonEntry.hasReviews ? itemJsonEntry.hasReviews : false;
  }
}

export class PaginatedItems {
  page: number;
  items: Item[];
}

export interface ItemRequest {
  item: string;
}
