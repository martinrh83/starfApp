import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions} from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx'
import { URL_SERVICIOS } from '../config/url';


@Injectable()
export class AulasService {

  public aulasUrl = URL_SERVICIOS + "/classrooms"
  
  constructor(private http:Http) { }

  getAulas(): Observable< any[]>{
    return this.http.get(this.aulasUrl).map((response: Response)=> response.json())
  }
}