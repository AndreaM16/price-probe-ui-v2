import { Component, Input } from '@angular/core';

/** App Models **/
import { Item } from '../../models/item.model';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.scss']
})

export class ItemComponent {
  @Input() item: Item;
  constructor() {
    if ( this.item !== undefined && (!this.item.image || this.item.image.length === 0)) {
      this.item.image = '../../../../../assets/images/item_not_found.png';
    }
  }
}
