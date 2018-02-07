import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions} from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx'
import { CicloLectivo } from '../interfaces/ciclo-lectivo';


@Injectable()
export class CiclosLectivosService {
  //private clsUrl = 'http://localhost:3000/api/v1/school_years'
  public clsUrl = 'https://railsapidemo.herokuapp.com/api/v1/school_years'
  
  constructor(private http:Http) { }

  getCls(): Observable<CicloLectivo []>{
    return this.http.get(this.clsUrl).map((response: Response)=> response.json())
  }

  getCl(id:number){
    return this.http.get( `${this.clsUrl}/${id}`)
  }

  createCl(cl:CicloLectivo){
    let headers = new Headers({'Content-Type':'application/json'});
    let options = new RequestOptions({headers:headers});
    return this.http.post(this.clsUrl, JSON.stringify(cl), options).map((res:Response) => res.json()) 

  }
}
