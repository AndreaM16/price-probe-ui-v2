import { NgModule } from '@angular/core';

/** App Components **/
import { DetailsComponent } from './details.component';

/** App Routing **/
import { DetailsRoutingModule } from './details.routing.module';

/** App Modules **/
import { SharedModule } from '../../shared/shared.module';

@NgModule({
  declarations: [
    DetailsComponent
  ],
  imports: [
    DetailsRoutingModule,
    SharedModule
  ]
})
export class DetailsModule { }
