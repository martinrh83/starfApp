import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions} from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx'
import { Materia } from '../interfaces/materia';
import { URL_SERVICIOS } from '../config/url';

@Injectable()
export class MateriasService {
  private materiasUrl = URL_SERVICIOS + "/subjects"

  constructor(private http:Http) { }

  getMaterias(): Observable<Materia []>{
    return this.http.get(this.materiasUrl).map((response: Response)=> response.json())
  }

  createMateria(materia:Materia){
    let headers = new Headers({'Content-Type':'application/json'});
    let options = new RequestOptions({headers:headers});
    return this.http.post(this.materiasUrl, JSON.stringify(materia), options).map((res:Response) => res.json()) 
  }

  deleteMateria(matId: number): Observable<number> {
    return this.http.delete(`${this.materiasUrl}/${matId}`).map(success => success.status);
  }
}
