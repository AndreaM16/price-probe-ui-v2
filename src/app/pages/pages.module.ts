import { NgModule } from '@angular/core';

/** App Components **/
import { PagesComponent } from './pages.component';

/** App Routing **/
import { PagesRoutingModule } from './pages.routing';

@NgModule({
  declarations: [
    PagesComponent
  ],
  imports: [
    PagesRoutingModule
  ]
})
export class PagesModule { }
