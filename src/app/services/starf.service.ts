import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse} from '@angular/common/http';
import { Observable, throwError, Subject } from 'rxjs';
import 'rxjs/Rx'
import { URL_STARF, URL_SERVICIOS } from '../config/url';
import { catchError } from 'rxjs/operators';

@Injectable()
export class StarfService {
  //url = URL_SERVICIOS + "/" 
  url = URL_STARF + "/"

  constructor(private http:HttpClient) { }

  public get(path: string): Observable<any> {

    return this.http.get(this.url + path);
  }
  
  public post(path: string, body:any): Observable<any> {

    return this.http.post(this.url + path, body);
  }
}