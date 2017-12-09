import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

/** rxjs **/
import {Observable} from 'rxjs/Observable';

@Injectable()
export class HttpClientService {

  constructor(private _http: HttpClient) { }

  private createHeaders(): HttpHeaders {
    return new HttpHeaders()
      .set('Content-Type', 'application/json; charset=utf-8');
  }

  private objectToQuerystring(obj: Object): string {
    const params = new URLSearchParams();
    Object.keys(obj).forEach(key => {
      params.set(key, obj[key]);
    });
    return params.toString();
  }

  get(url?: string, data?: Object): Observable<any> {
    let finalUrl = url;
    if ( data !== undefined ) {
      finalUrl += '?' + this.objectToQuerystring(data);
    }
    console.log(finalUrl);
    return this._http.get(finalUrl, { headers : this.createHeaders()});
  }

}
