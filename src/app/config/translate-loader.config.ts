import { HttpClient } from '@angular/common/http';

/** 3rd party **/
import { TranslatePoHttpLoader } from '@biesbjerg/ngx-translate-po-http-loader';

export function createTranslateLoader(http: HttpClient) {
  return new TranslatePoHttpLoader(http, 'assets/i18n', '.po');
}
