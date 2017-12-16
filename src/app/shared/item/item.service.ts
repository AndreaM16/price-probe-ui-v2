import { Injectable } from '@angular/core';

/** rxjs **/
import { catchError } from 'rxjs/operators/catchError';
import { map } from 'rxjs/operators/map';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/throw';

/** App Models **/
import { Item } from './item.model';

/** App Services **/
import { HttpClientService } from '../services/http-client.service';
import { apiItemBaseEndpoint } from '../../config/api.config';

/** App Interfaces **/
import { Pagination } from '../interfaces/pagination.interface';

@Injectable()
export class ItemService {

  constructor(private _http: HttpClientService) {}

  public getPaginatedItems(pagination: Pagination): Observable<Item[]> {
    return this._http.get(apiItemBaseEndpoint, pagination)
      .pipe(
        map((response) => {
          return response.items.map((item) => new Item(item));
        }),
        catchError((error) => Observable.throw(error))
      )
    ;
  }

}
