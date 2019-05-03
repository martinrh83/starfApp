import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions} from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx'
import { Comision } from '../interfaces/comision';
import { URL_SERVICIOS } from '../config/url';


@Injectable()
export class ComisionesService {
  private comisionesUrl = URL_SERVICIOS + "/courses"
  
  constructor(private http:Http) { }

  getComision(id):Observable<Comision>{
    return this.http.get(`${this.comisionesUrl}/${id}`).map((response:Response) => response.json())
  }
  getComisiones(): Observable<Comision []>{
    return this.http.get(this.comisionesUrl).map((response: Response)=> response.json())
  }

  createComision(comision:Comision){
    let headers = new Headers({'Content-Type':'application/json'});
    let options = new RequestOptions({headers:headers});
    return this.http.post(this.comisionesUrl, JSON.stringify(comision), options).map((res:Response) => res.json()) 

  }

  deleteComision(comId: number): Observable<number> {
    return this.http.delete(`${this.comisionesUrl}/${comId}`).map(success => success.status);
  }

}
