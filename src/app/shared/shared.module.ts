import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

/** 3rd party **/
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { TranslateModule } from '@ngx-translate/core';

/** App Services **/
import { HttpClientService } from './services/http-client.service';

/** App Components **/
import { HeaderbarComponent } from './components/headerbar/headerbar.component';
import { SearchComponent } from './components/headerbar/search/search.component';
import { FooterComponent } from './components/footer/footer.component';
import { ItemComponent } from './components/item/item.component';

@NgModule({
  declarations: [
    HeaderbarComponent,
    SearchComponent,
    FooterComponent,
    ItemComponent,
  ],
  imports: [
    TranslateModule,
    NgbModule,
    CommonModule,
  ],
  exports: [
    TranslateModule,
    NgbModule,
    CommonModule,
    HeaderbarComponent,
    SearchComponent,
    FooterComponent,
    ItemComponent,
  ],
  providers: [
    HttpClientService
  ]
})
export class SharedModule { }
