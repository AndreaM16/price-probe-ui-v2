import { NgModule } from '@angular/core';

/** App Components **/
import { PagesComponent } from './pages.component';

/** App Routing **/
import { PagesRoutingModule } from './pages.routing';

/** App Modules **/
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [
    PagesComponent
  ],
  imports: [
    PagesRoutingModule,
    SharedModule,
  ]
})
export class PagesModule { }
