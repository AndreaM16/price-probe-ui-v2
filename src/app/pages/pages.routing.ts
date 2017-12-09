import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

/** App Components **/
import { PagesComponent } from './pages.component';
import { HomeComponent } from './home/home.component';
import { ItemComponent } from './item/item.component';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: '',
        component: PagesComponent,
        children: [
          { path: '', redirectTo: 'home', pathMatch: 'full' },
          { path: 'home', component: HomeComponent },
          { path: 'item', component: ItemComponent },
        ]
      }
    ])
  ], exports: [RouterModule]
})

export class PagesRoutingModule { }
