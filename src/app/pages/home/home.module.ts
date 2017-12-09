import { NgModule } from '@angular/core';

/** 3rd party **/
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

/** ngrx **/
import { homeReducer } from './home.reducer';
import { HomeEffects } from './home.effects';

/** App Components **/
import { HomeComponent } from './home.component';

/** App Routing **/
import { HomeRoutingModule } from './home.routing.module';

/** App Modules **/
import { SharedModule } from '../../shared/shared.module';

/** App Services **/
import { HomeService } from './home.service';

@NgModule({
  declarations: [
    HomeComponent
  ],
  imports: [
    HomeRoutingModule,
    SharedModule,
    StoreModule.forFeature('home', homeReducer),
    EffectsModule.forFeature([HomeEffects]),
  ],
  providers: [
    HomeService
  ]
})
export class HomeModule { }
