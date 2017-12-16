import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

/** App Models **/
import { Item } from '../../models/item.model';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.scss']
})

export class ItemComponent implements OnInit {
  @Input() item: Item;
  notFoundPath = '../../../../assets/images/item_not_found.png';

  constructor(private router: Router) {}

  ngOnInit() {
    if ( this.item !== undefined &&
         (!this.item.image || this.item.image == null || this.item.image === undefined || this.item.image.length === 0)) {
        this.item.image = this.notFoundPath;
    }
    if ( this.item !== undefined &&
      (!this.item.title || this.item.title == null || this.item.title === undefined || this.item.title.length === 0)) {
      this.item.title = 'No title available';
    }
  }

  goToAmazon(item: Item) {
    if (item !== undefined && item.url && item.url.length) {
      window.open(item.url);
    }
  }

  goToDetails(item: Item) {
    this.router.navigate(['app/details', item.id]);
  }

}
