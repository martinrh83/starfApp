import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions} from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx'
import { Nivel } from '../interfaces/nivel';
import { URL_SERVICIOS } from '../config/url';


@Injectable()
export class NivelesService {
  private nivelesUrl = URL_SERVICIOS + "/grades"

  constructor(private http:Http) { }

  getNiveles(): Observable<Nivel []>{
    return this.http.get(this.nivelesUrl).map((response: Response)=> response.json())
  }

  getNivel(id:number){
    return this.http.get( `${this.nivelesUrl}/${id}`)
  }

  createNivel(nivel:Nivel){
    let headers = new Headers({'Content-Type':'application/json'});
    let options = new RequestOptions({headers:headers});
    return this.http.post(this.nivelesUrl, JSON.stringify(nivel), options).map((res:Response) => res.json()) 

  }
}
