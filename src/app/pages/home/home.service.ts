import { Injectable } from '@angular/core';

/** rxjs **/
import { catchError } from 'rxjs/operators/catchError';
import { map } from 'rxjs/operators/map';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/throw';

/** App Models **/
import { Item } from '../../shared/models/item.model';

/** App Services **/
import { HttpClientService } from '../../shared/services/http-client.service';
import { apiItemBaseEndpoint } from '../../config/api.config';

/** App Interfaces **/
import { Pagination } from '../../shared/interfaces/pagination.interface';

@Injectable()
export class HomeService {

  constructor(private _http: HttpClientService) {}

  public getPaginatedItems(pagination: Pagination): Observable<Item[]> {
    return this._http.get(apiItemBaseEndpoint, pagination)
      .pipe(
        map((item) => new Item(item)),
        catchError((error) => Observable.throw(error))
      )
    ;
  }

}
