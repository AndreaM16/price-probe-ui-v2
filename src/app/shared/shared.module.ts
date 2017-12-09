import { NgModule } from '@angular/core';

/** App Services **/
import { HttpClientService } from './services/http-client.service';

@NgModule({
  providers: [
    HttpClientService
  ]
})
export class SharedModule { }
