import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

/** 3rd party **/
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { TranslateModule } from '@ngx-translate/core';

/** App Services **/
import { HttpClientService } from './services/http-client.service';

/** App Components **/
import { HeaderbarComponent } from './components/headerbar/headerbar.component';
import { FooterComponent } from './components/footer/footer.component';
import { ItemComponent } from './components/item/item.component';

@NgModule({
  declarations: [
    HeaderbarComponent,
    FooterComponent,
    ItemComponent,
  ],
  imports: [
    NgbModule.forRoot(),
    TranslateModule,
    CommonModule,
  ],
  exports: [
    TranslateModule,
    NgbModule,
    CommonModule,
    HeaderbarComponent,
    FooterComponent,
    ItemComponent,
  ],
  providers: [
    HttpClientService
  ]
})
export class SharedModule { }
