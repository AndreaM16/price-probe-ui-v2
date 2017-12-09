import { NgModule } from '@angular/core';

/** App Components **/
import { PagesComponent } from './pages.component';
import { HomeComponent } from './home/home.component';
import { ItemComponent } from './item/item.component';

/** App Routing **/
import { PagesRoutingModule } from './pages.routing';

@NgModule({
  declarations: [
    PagesComponent,
    HomeComponent,
    ItemComponent
  ],
  imports: [
    PagesRoutingModule
  ]
})
export class PagesModule { }
