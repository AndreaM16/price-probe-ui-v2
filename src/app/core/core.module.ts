import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

/** 3rd party **/
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { TranslateModule } from '@ngx-translate/core';

/** App Components **/
import { FooterComponent } from './footer/footer.component';
import { HeaderbarComponent } from './headerbar/headerbar.component';

@NgModule({
  declarations: [
    FooterComponent,
    HeaderbarComponent
  ],
  imports: [
    CommonModule,
    NgbModule,
    FormsModule,
    TranslateModule,
  ],
  exports: [
    FooterComponent,
    HeaderbarComponent
  ]
})
export class CoreModule { }
