import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

/** App Components **/
import { PagesComponent } from './pages.component';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: '',
        component: PagesComponent,
        children: [
          { path: '', redirectTo: 'home', pathMatch: 'full' },
          { path: 'home', loadChildren: './home/home.module#HomeModule' },
          { path: 'item', loadChildren: './item/item.module#ItemModule' },
        ]
      }
    ])
  ], exports: [RouterModule]
})

export class PagesRoutingModule { }
