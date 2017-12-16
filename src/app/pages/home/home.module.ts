import { NgModule } from '@angular/core';

/** App Components **/
import { HomeComponent } from './home.component';
import { ItemComponent } from './item/item.component';

/** App Routing **/
import { HomeRoutingModule } from './home.routing.module';

/** App Modules **/
import { SharedModule } from '../../shared/shared.module';

@NgModule({
  declarations: [
    HomeComponent,
    ItemComponent
  ],
  imports: [
    HomeRoutingModule,
    SharedModule,
  ],
  exports: [
    ItemComponent
  ]
})
export class HomeModule { }
