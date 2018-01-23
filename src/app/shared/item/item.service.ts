import { Injectable } from '@angular/core';

/** rxjs **/
import { catchError } from 'rxjs/operators/catchError';
import { map } from 'rxjs/operators/map';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/throw';

/** App Models **/
import {Item, ItemRequest, PaginatedItemsResponse} from './item.model';

/** App Services **/
import { HttpClientService } from '../services/http-client.service';
import { apiItemBaseEndpoint, apiPriceBaseEndpoint, apiForecastBaseEndpoint } from '../../config/api.config';

/** App Interfaces **/
import { Pagination } from '../interfaces/pagination.interface';
import { PriceResponse, ForecastResponse } from '../../pages/details/price.model';
import {ForecastByItemAndTestSize} from './item.model';

@Injectable()
export class ItemService {

  constructor(private _http: HttpClientService) {}

  public getPaginatedItems(pagination: Pagination): Observable<PaginatedItemsResponse> {
    return this._http.get(apiItemBaseEndpoint, pagination)
      .pipe(
        map((response) => {
          return {items: response.items.map((item) => new Item(item)), has_next: response.has_next} as PaginatedItemsResponse;
        }),
        catchError((error) => Observable.throw(error))
      )
    ;
  }

  public getItemByPid(itemRequest: ItemRequest): Observable<any> {
    return this._http.get(apiItemBaseEndpoint, itemRequest)
      .pipe(
        catchError((error) => Observable.throw(error))
      )
    ;
  }

  public getPricesByPid(itemRequest: ItemRequest): Observable<PriceResponse> {
    return this._http.get(apiPriceBaseEndpoint, itemRequest)
      .pipe(
        map((response) => {
          return new PriceResponse(response);
        }),
        catchError((error) => Observable.throw(error))
      )
    ;
  }

  public getForecastByPid(itemRequest: ItemRequest): Observable<ForecastResponse> {
    return this._http.get(apiForecastBaseEndpoint, {
      item: itemRequest.item,
      test_size: '10%'
    } as ForecastByItemAndTestSize)
      .pipe(
        map((response) => {
          return new ForecastResponse(response);
        }),
        catchError((error) => Observable.throw(error))
      )
    ;
  }

}
