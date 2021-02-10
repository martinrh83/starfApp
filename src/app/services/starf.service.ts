import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse} from '@angular/common/http';
import { Observable, throwError, Subject } from 'rxjs';
import 'rxjs/Rx'
import { URL_STARF } from '../config/url';
import { catchError } from 'rxjs/operators';

@Injectable()
export class StarfService {
  url = URL_STARF + "/"

  constructor(private http:HttpClient) { }

  public get(path: string): Observable<any> {

    return this.http.get(this.url + path);
  }
  
}