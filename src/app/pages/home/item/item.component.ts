import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

/** 3rd party **/
import { Store } from '@ngrx/store';
import { TranslateService } from '@ngx-translate/core';

/** ngrx **/
import { AppState } from '../../../shared/interfaces/state.interface';
import * as itemActions from '../../../shared/item/item.actions';

/** App Models **/
import { Item } from '../../../shared/item/item.model';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.scss']
})

export class ItemComponent implements OnInit {
  @Input() item: Item;
  notFoundPath = '../../../../assets/images/item_not_found.png';

  constructor(private router: Router, private store: Store<AppState>, private translateService: TranslateService) {}

  ngOnInit() {
    if ( this.item !== undefined &&
         (!this.item.image || this.item.image == null || this.item.image === undefined || this.item.image.length === 0)) {
        this.item.image = this.notFoundPath;
    }
    if ( this.item !== undefined &&
      (!this.item.title || this.item.title == null || this.item.title === undefined || this.item.title.length === 0)) {
      this.item.title = this.translateService.instant('No title available');
    }
  }

  goToAmazon(item: Item) {
    if (item !== undefined && item.url && item.url.length) {
      window.open(item.url);
    }
  }

  goToDetails(item: Item) {
    this.store.dispatch(new itemActions.LoadCurrentItemSuccessAction(item));
    this.router.navigate(['app/details', item.id]);
  }

}
