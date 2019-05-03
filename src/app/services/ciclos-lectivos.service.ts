import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions} from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx'
import { CicloLectivo } from '../interfaces/ciclo-lectivo';
import { URL_SERVICIOS } from '../config/url';


@Injectable()
export class CiclosLectivosService {

  public clsUrl = URL_SERVICIOS + "/school_years"
  
  constructor(private http:Http) { }

  getCls(): Observable<CicloLectivo []>{
    return this.http.get(this.clsUrl).map((response: Response)=> response.json());
  }

  getCl(id:number){
    return this.http.get( `${this.clsUrl}/${id}`);
  }

  createCl(cl:CicloLectivo){
    let headers = new Headers({'Content-Type':'application/json'});
    let options = new RequestOptions({headers:headers});
    return this.http.post(this.clsUrl, JSON.stringify(cl), options).map((res:Response) =>{
      console.log(res.json());
      return res.json();
    } );
  }

  deleteCl(clId: number): Observable<number> {
    return this.http.delete(`${this.clsUrl}/${clId}`).map(success => success.status);
  }
}
