import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions} from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx'
import { Materia } from '../interfaces/materia';

@Injectable()
export class MateriasService {

  private materiasUrl = 'https://railsapidemo.herokuapp.com/api/v1/subjects'
  //private materiasUrl = 'http://localhost:3000/api/v1/subjects'
  constructor(private http:Http) { }

  getMaterias(): Observable<Materia []>{
    return this.http.get(this.materiasUrl).map((response: Response)=> response.json())
  }

  createMateria(materia:Materia){
    let headers = new Headers({'Content-Type':'application/json'});
    let options = new RequestOptions({headers:headers});
    return this.http.post(this.materiasUrl, JSON.stringify(materia), options).map((res:Response) => res.json()) 

  }
}