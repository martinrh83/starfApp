import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions} from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx'
import { Nivel } from '../interfaces/nivel';


@Injectable()
export class NivelesService {
  private nivelesUrl = 'http://localhost:3000/api/v1/grades'
  public clsUrl = 'http://localhost:3000/api/v1/school_years'

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
