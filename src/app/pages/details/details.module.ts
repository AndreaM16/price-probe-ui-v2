import { NgModule } from '@angular/core';

/** App Components **/
import { DetailsComponent } from './details.component';

/** App Routing **/
import { DetailsRoutingModule } from './details.routing.module';

@NgModule({
  declarations: [
    DetailsComponent
  ],
  imports: [
    DetailsRoutingModule
  ]
})
export class DetailsModule { }
