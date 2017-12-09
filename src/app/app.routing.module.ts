import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    RouterModule.forRoot([
      {
        path: '',
        redirectTo: '/app/home',
        pathMatch: 'full'
      },
      {
        path: 'app',
        loadChildren: './pages/pages.module#PagesModule'
      }
    ], { useHash : true })
  ], exports: [RouterModule]
})

export class AppRoutingModule { }
