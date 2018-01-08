const apiBaseEndpoint = 'http://localhost:4200/api';

/** Item **/
export const apiItemBaseEndpoint = [apiBaseEndpoint, 'item'].join('/');
/** Price **/
export const apiPriceBaseEndpoint = [apiBaseEndpoint, 'price'].join('/');
export const apiForecastBaseEndpoint = [apiBaseEndpoint, 'forecast'].join('/');