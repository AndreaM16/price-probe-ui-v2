import { environment } from '../../environments/environment';

/** Base **/
export const apiBaseEndpoint = [['http://', environment.production ? '54.194.199.230' : 'localhost'].join('/'), '8080'].join(':');

/** Items **/
export const apiItemBaseEndpoint = 'item';

