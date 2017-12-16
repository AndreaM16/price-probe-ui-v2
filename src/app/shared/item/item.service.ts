import { Injectable } from '@angular/core';

/** rxjs **/
import { catchError } from 'rxjs/operators/catchError';
import { map } from 'rxjs/operators/map';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/throw';

/** App Models **/
import { Item, ItemRequest } from './item.model';

/** App Services **/
import { HttpClientService } from '../services/http-client.service';
import { apiItemBaseEndpoint, apiPriceBaseEndpoint } from '../../config/api.config';

/** App Interfaces **/
import { Pagination } from '../interfaces/pagination.interface';
import { PriceResponse } from '../../pages/details/price.model';

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

  public getItemByPid(itemRequest: ItemRequest): Observable<Item> {
    return this._http.get(apiItemBaseEndpoint, itemRequest)
      .pipe(
        map((response) => {
          return new PriceResponse(response);
        }),
        catchError((error) => Observable.throw(error))
      )
      ;
  }

  public getPricesByPid(itemRequest: ItemRequest): Observable<PriceResponse> {
    return this._http.get(apiPriceBaseEndpoint, itemRequest)
      .pipe(
        map((response) => {
          return response.items.map((item) => new Item(item));
        }),
        catchError((error) => Observable.throw(error))
      )
      ;
  }

}
