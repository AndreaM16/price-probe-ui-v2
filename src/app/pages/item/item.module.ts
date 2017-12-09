import { NgModule } from '@angular/core';

/** App Components **/
import { ItemComponent } from './item.component';

/** App Routing **/
import { ItemRoutingModule } from './item.routing.module';

@NgModule({
  declarations: [
    ItemComponent
  ],
  imports: [
    ItemRoutingModule
  ]
})
export class ItemModule { }
