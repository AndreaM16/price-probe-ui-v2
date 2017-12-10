import { NgModule } from '@angular/core';

/** 3rd party **/
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { TranslateModule } from '@ngx-translate/core';

/** App Services **/
import { HttpClientService } from './services/http-client.service';

/** App Components **/
import { HeaderbarComponent } from './components/headerbar/headerbar.component';
import { SearchComponent } from './components/headerbar/search/search.component';
import { FooterComponent } from './components/footer/footer.component';

@NgModule({
  declarations: [
    HeaderbarComponent,
    SearchComponent,
    FooterComponent,
  ],
  imports: [
    TranslateModule,
    NgbModule
  ],
  exports: [
    TranslateModule,
    NgbModule,
    HeaderbarComponent,
    SearchComponent,
    FooterComponent,
  ],
  providers: [
    HttpClientService
  ]
})
export class SharedModule { }
