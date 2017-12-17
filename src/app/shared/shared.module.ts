import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

/** 3rd party **/
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { TranslateModule } from '@ngx-translate/core';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { NgxChartsModule } from '@swimlane/ngx-charts';

/** ngrx **/
import { ItemEffects } from './item/item.effects';
import { itemReducer } from './item/item.reducer';

/** App Services **/
import { HttpClientService } from './services/http-client.service';
import { ItemService } from './item/item.service';

@NgModule({
  imports: [
    NgbModule.forRoot(),
    StoreModule.forFeature('item', itemReducer),
    EffectsModule.forFeature([ItemEffects]),
    TranslateModule,
    CommonModule,
    NgxChartsModule,
  ],
  exports: [
    TranslateModule,
    NgbModule,
    CommonModule,
    NgxChartsModule
  ],
  providers: [
    HttpClientService,
    ItemService
  ]
})
export class SharedModule { }
