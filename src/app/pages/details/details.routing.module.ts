import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

/** App Components **/
import { ItemComponent } from './item.component';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: '',
        component: ItemComponent
      }
    ])
  ], exports: [RouterModule]
})

export class ItemRoutingModule { }
